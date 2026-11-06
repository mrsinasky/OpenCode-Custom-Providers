import { copyFile, mkdir, readFile, rename, unlink, writeFile } from "node:fs/promises"
import { homedir } from "node:os"
import path from "node:path"
import { applyEdits, modify, parse, printParseErrorCode, type ParseError } from "jsonc-parser/lib/esm/main.js"
import type {
  ConfigFormat,
  ConfigInfo,
  ModelSpec,
  ProviderEntry,
  ProviderFlavor,
  RemoveResult,
  SaveInput,
  SaveResult,
} from "./types"

type JsonRecord = Record<string, unknown>

interface ConfigDocument {
  path: string
  exists: boolean
  text: string
  value: JsonRecord
  format: ConfigFormat
}

interface ListResult {
  info: ConfigInfo
  providers: ProviderEntry[]
  error?: string
}

const CONFIG_NAMES = ["opencode.json", "opencode.jsonc"] as const

export function configDirectory(): string {
  const xdg = process.env.XDG_CONFIG_HOME?.trim()
  const base = xdg ? xdg : path.join(homedir(), ".config")
  return path.join(base, "opencode")
}

function record(value: unknown): JsonRecord | undefined {
  return value !== null && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : undefined
}

function text(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined
}

function number(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : undefined
}

function bool(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined
}

async function exists(file: string): Promise<boolean> {
  try {
    await readFile(file)
    return true
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return false
    throw error
  }
}

export async function locateConfig(): Promise<{ path: string; exists: boolean }> {
  const dir = configDirectory()
  for (const name of CONFIG_NAMES) {
    const file = path.join(dir, name)
    if (await exists(file)) return { path: file, exists: true }
  }
  return { path: path.join(dir, "opencode.json"), exists: false }
}

function parseDocument(file: string, exists: boolean, raw: string): ConfigDocument {
  const text = raw.replace(/^\uFEFF/, "")
  if (!text.trim()) {
    return { path: file, exists, text: "", value: {}, format: "v2" }
  }

  const errors: ParseError[] = []
  const value = parse(text, errors, { allowTrailingComma: true, disallowComments: false })
  if (errors.length > 0) {
    const first = errors[0]!
    throw new Error(`Cannot parse ${path.basename(file)} at offset ${first.offset}: ${printParseErrorCode(first.error)}`)
  }
  if (!record(value)) {
    throw new Error(`${path.basename(file)} does not contain a JSON object`)
  }

  const format: ConfigFormat = record(value.providers) ? "v2" : record(value.provider) ? "v1" : "v2"
  return { path: file, exists, text, value: value as JsonRecord, format }
}

async function readDocument(): Promise<ConfigDocument> {
  const located = await locateConfig()
  if (!located.exists) return { path: located.path, exists: false, text: "", value: {}, format: "v2" }
  return parseDocument(located.path, true, await readFile(located.path, "utf8"))
}

function providerMap(document: ConfigDocument): JsonRecord {
  const value = document.format === "v1" ? document.value.provider : document.value.providers
  return record(value) ?? {}
}

function packageFor(format: ConfigFormat, flavor: ProviderFlavor): string {
  if (format === "v1") {
    return flavor === "anthropic" ? "@ai-sdk/anthropic" : "@ai-sdk/openai-compatible"
  }
  if (flavor === "anthropic") return "@opencode/ai/providers/anthropic-compatible"
  if (flavor === "responses") return "@opencode/ai/providers/openai-compatible/responses"
  return "@opencode/ai/providers/openai-compatible"
}

function flavorFromPackage(pkg: string | undefined): ProviderFlavor {
  if (pkg && /anthropic/i.test(pkg)) return "anthropic"
  if (pkg && /responses/i.test(pkg)) return "responses"
  return "openai"
}

function rawOption(entry: JsonRecord, format: ConfigFormat, key: string): unknown {
  if (format === "v1") {
    const options = record(entry.options)
    if (options && key in options) return options[key]
    return entry[key]
  }
  const settings = record(entry.settings)
  return settings ? settings[key] : undefined
}

function modelFromConfig(id: string, value: unknown, format: ConfigFormat): ModelSpec {
  const model = record(value) ?? {}
  const limit = record(model.limit)
  const capabilities = record(model.capabilities)
  const input = Array.isArray(capabilities?.input) ? capabilities.input : []
  const reasoning = record(capabilities?.reasoning)
  const cost = record(model.cost)
  const cache = record(cost?.cache)

  const cacheRead =
    number(cache?.read) ?? number(model.cache_read) ?? number(model.cacheRead) ?? undefined
  const cacheWrite =
    number(cache?.write) ?? number(model.cache_write) ?? number(model.cacheWrite) ?? undefined

  return {
    id,
    name: text(model.name) ?? id,
    context: number(limit?.context),
    output: number(limit?.output),
    tools: bool(capabilities?.tools) ?? bool(model.tool_call),
    vision: input.includes("image") || bool(model.attachment),
    reasoning: bool(reasoning?.supported) ?? bool(model.reasoning),
    cost:
      number(cost?.input) !== undefined && number(cost?.output) !== undefined
        ? {
            input: number(cost?.input)!,
            output: number(cost?.output)!,
            cacheRead,
            cacheWrite,
          }
        : undefined,
  }
}

function readProviders(document: ConfigDocument): ProviderEntry[] {
  const map = providerMap(document)
  const result: ProviderEntry[] = []

  for (const [id, raw] of Object.entries(map)) {
    const entry = record(raw)
    if (!entry) continue
    const pkg = text(document.format === "v1" ? entry.npm : entry.package) ?? ""
    const models = record(entry.models) ?? {}
    const key = text(rawOption(entry, document.format, "apiKey"))
    const baseURL = text(rawOption(entry, document.format, "baseURL")) ?? text(entry.api) ?? ""

    result.push({
      id,
      name: text(entry.name) ?? id,
      baseURL,
      package: pkg,
      flavor: flavorFromPackage(pkg),
      hasKey: !!key,
      models: Object.entries(models)
        .filter(([, value]) => record(value) !== undefined)
        .map(([modelID, value]) => modelFromConfig(modelID, value, document.format)),
    })
  }

  result.sort((a, b) => a.name.localeCompare(b.name) || a.id.localeCompare(b.id))
  return result
}

export async function listProviders(): Promise<ListResult> {
  const located = await locateConfig()
  try {
    const document = located.exists
      ? parseDocument(located.path, true, await readFile(located.path, "utf8"))
      : ({ path: located.path, exists: false, text: "", value: {}, format: "v2" } as ConfigDocument)
    return {
      info: { path: document.path, exists: document.exists, format: document.format },
      providers: readProviders(document),
    }
  } catch (error) {
    return {
      info: { path: located.path, exists: located.exists, format: "v2" },
      providers: [],
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

export async function configInfo(): Promise<ConfigInfo> {
  return (await listProviders()).info
}

function modelEntry(spec: ModelSpec, existing: unknown, format: ConfigFormat): JsonRecord {
  const base: JsonRecord = record(existing) ? { ...(existing as JsonRecord) } : {}
  const limit: JsonRecord = record(base.limit) ? { ...(base.limit as JsonRecord) } : {}
  const capabilities: JsonRecord = record(base.capabilities) ? { ...(base.capabilities as JsonRecord) } : {}

  base.name = spec.name || spec.id

  if (spec.context !== undefined) limit.context = spec.context
  if (spec.output !== undefined) limit.output = spec.output
  if (Object.keys(limit).length > 0) base.limit = limit

  if (format === "v2") {
    if (spec.tools !== undefined) capabilities.tools = spec.tools
    if (spec.vision !== undefined) {
      const inputs = Array.isArray(capabilities.input) ? capabilities.input.filter((item) => typeof item === "string") : []
      const next = new Set([...inputs, "text"])
      if (spec.vision) next.add("image")
      else next.delete("image")
      capabilities.input = [...next]
    }
    if (spec.reasoning !== undefined) {
      const reasoning: JsonRecord = record(capabilities.reasoning)
        ? { ...(capabilities.reasoning as JsonRecord) }
        : {}
      reasoning.supported = spec.reasoning
      capabilities.reasoning = reasoning
    }
    if (Object.keys(capabilities).length > 0) base.capabilities = capabilities
    if (spec.cost) {
      base.cost = {
        input: spec.cost.input,
        output: spec.cost.output,
        ...(spec.cost.cacheRead !== undefined || spec.cost.cacheWrite !== undefined
          ? {
              cache: {
                ...(spec.cost.cacheRead !== undefined ? { read: spec.cost.cacheRead } : {}),
                ...(spec.cost.cacheWrite !== undefined ? { write: spec.cost.cacheWrite } : {}),
              },
            }
          : {}),
      }
    }
  } else {
    if (spec.tools !== undefined) base.tool_call = spec.tools
    // The V1 compatibility layer rejects these legacy fields with a warning and omits them.
    delete base.attachment
    delete base.reasoning
  }

  return base
}

function buildModels(specs: ModelSpec[], existingModels: unknown, format: ConfigFormat): JsonRecord {
  const existing = record(existingModels) ?? {}
  const models: JsonRecord = {}
  for (const spec of specs) {
    if (!spec || typeof spec.id !== "string" || !spec.id.trim()) continue
    models[spec.id] = modelEntry(spec, existing[spec.id], format)
  }
  return models
}

async function backup(file: string): Promise<void> {
  try {
    await copyFile(file, `${file}.bak`)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error
  }
}

async function writeAtomic(file: string, content: string): Promise<void> {
  const temporary = `${file}.tmp-${process.pid}-${Date.now()}`
  await writeFile(temporary, content, "utf8")
  try {
    await rename(temporary, file)
  } catch {
    await writeFile(file, content, "utf8")
    await unlink(temporary).catch(() => {})
  }
}

function editedDocument(document: ConfigDocument, pathParts: (string | number)[], value: unknown): string {
  const source = document.text.trim() ? document.text : "{}"
  return editedSource(source, pathParts, value)
}

function editedSource(source: string, pathParts: (string | number)[], value: unknown): string {
  const edits = modify(source, pathParts, value, {
    formattingOptions: { insertSpaces: true, tabSize: 2 },
  })
  return applyEdits(source, edits)
}

export async function saveProvider(input: SaveInput): Promise<SaveResult> {
  const id = input.id.trim()
  if (!id) return { ok: false, error: "Provider ID is required." }
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(id) || id.includes("/") || id.includes("#")) {
    return { ok: false, error: "Provider ID may only contain letters, numbers, dots, dashes and underscores." }
  }

  const baseURL = input.baseURL.trim()
  let parsed: URL
  try {
    parsed = new URL(baseURL)
  } catch {
    return { ok: false, error: "Base URL is not a valid URL." }
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { ok: false, error: "Base URL must start with http:// or https://." }
  }

  let document: ConfigDocument
  try {
    document = await readDocument()
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) }
  }

  const format = document.format
  const map = providerMap(document)
  const previousID = input.previousID?.trim()
  const renaming = !!previousID && previousID !== id
  const existing = record(map[id])
  const previous = renaming && previousID ? record(map[previousID]) : undefined
  const source = existing ?? previous
  const existingKey = source ? text(rawOption(source, format, "apiKey")) : undefined
  const key = input.apiKey?.trim() ? input.apiKey.trim() : existingKey
  const pkg = packageFor(format, input.flavor)
  const models = buildModels(input.models, source?.models, format)

  const entry: JsonRecord =
    format === "v1"
      ? {
          ...(source ?? {}),
          name: input.name.trim() || id,
          npm: pkg,
          options: {
            ...(record(source?.options) ?? {}),
            baseURL,
            ...(key ? { apiKey: key } : {}),
          },
          models,
        }
      : {
          ...(source ?? {}),
          name: input.name.trim() || id,
          package: pkg,
          settings: {
            ...(record(source?.settings) ?? {}),
            baseURL,
            ...(key ? { apiKey: key } : {}),
          },
          models,
        }

  const pathParts = format === "v1" ? ["provider", id] : ["providers", id]

  try {
    if (!document.exists) {
      const mapKey = format === "v1" ? "provider" : "providers"
      const root: JsonRecord = {
        $schema: "https://opencode.ai/config.json",
        [mapKey]: { [id]: entry },
      }
      await mkdir(path.dirname(document.path), { recursive: true })
      await writeFile(document.path, JSON.stringify(root, null, 2) + "\n", "utf8")
    } else {
      let next = editedDocument(document, pathParts, entry)
      if (renaming && previousID) {
        next = editedSource(next, format === "v1" ? ["provider", previousID] : ["providers", previousID], undefined)
      }
      await backup(document.path)
      await mkdir(path.dirname(document.path), { recursive: true })
      await writeAtomic(document.path, next)
    }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) }
  }

  return { ok: true, path: document.path }
}

export async function removeProvider(id: string): Promise<RemoveResult> {
  let document: ConfigDocument
  try {
    document = await readDocument()
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) }
  }

  if (!document.exists) return { ok: true, path: document.path }

  const pathParts = document.format === "v1" ? ["provider", id] : ["providers", id]
  try {
    const next = editedDocument(document, pathParts, undefined)
    await backup(document.path)
    await writeAtomic(document.path, next)
    return { ok: true, path: document.path }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function storedApiKey(id: string): Promise<string | undefined> {
  const located = await locateConfig()
  if (!located.exists) return undefined
  const document = parseDocument(located.path, true, await readFile(located.path, "utf8"))
  const entry = record(providerMap(document)[id])
  if (!entry) return undefined
  return text(rawOption(entry, document.format, "apiKey"))
}

export async function resolveStoredKey(id: string): Promise<string | undefined> {
  const raw = await storedApiKey(id)
  if (!raw) return undefined
  const env = raw.match(/^\{env:([A-Za-z_][A-Za-z0-9_]*)\}$/)
  if (env) return process.env[env[1]!]?.trim() || undefined
  const file = raw.match(/^\{file:(.+)\}$/)
  if (file) {
    const target = file[1]!.startsWith("~/")
      ? path.join(homedir(), file[1]!.slice(2))
      : path.isAbsolute(file[1]!) 
        ? file[1]!
        : path.join(configDirectory(), file[1]!)
    try {
      return (await readFile(target, "utf8")).trim() || undefined
    } catch {
      return undefined
    }
  }
  return raw
}
