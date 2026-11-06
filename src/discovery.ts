import type { DiscoverResult, ModelSpec, ProviderFlavor } from "./types"
import { resolveStoredKey } from "./config"

type JsonRecord = Record<string, unknown>

const TIMEOUT_MS = 20_000

function record(value: unknown): JsonRecord | undefined {
  return value !== null && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : undefined
}

function read(value: unknown, path: string): unknown {
  let current: unknown = value
  for (const part of path.split(".")) {
    const item = record(current)
    if (!item) return undefined
    current = item[part]
  }
  return current
}

function number(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : undefined
}

function bool(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined
}

function firstNumber(value: JsonRecord, paths: string[]): number | undefined {
  for (const path of paths) {
    const found = number(read(value, path))
    if (found !== undefined) return found
  }
  return undefined
}

function firstBool(value: JsonRecord, paths: string[]): boolean | undefined {
  for (const path of paths) {
    const found = bool(read(value, path))
    if (found !== undefined) return found
  }
  return undefined
}

function firstString(value: JsonRecord, paths: string[]): string | undefined {
  for (const path of paths) {
    const found = read(value, path)
    if (typeof found === "string" && found.trim()) return found.trim()
  }
  return undefined
}

function includes(value: unknown, needle: string): boolean {
  return Array.isArray(value) && value.some((item) => typeof item === "string" && item.toLowerCase() === needle)
}

function normalizeModel(raw: JsonRecord): ModelSpec | undefined {
  const id = firstString(raw, ["id", "model", "name", "slug"])
  if (!id) return undefined

  const input = read(raw, "capabilities.input") ?? read(raw, "architecture.input_modalities") ?? read(raw, "modalities.input") ?? read(raw, "input_modalities")
  const vision =
    firstBool(raw, ["supports_vision", "capabilities.vision", "vision"]) ??
    (includes(input, "image") || includes(input, "image_url") ? true : undefined)

  const pricing = record(raw.pricing)
  const priceInput = number(pricing?.input)
  const priceOutput = number(pricing?.output)
  const cacheRead =
    number(pricing?.cached_input) ?? number(pricing?.cache_read) ?? number(read(raw, "cost.cache_read"))
  const cacheWrite =
    number(pricing?.cache_creation_input) ?? number(pricing?.cache_write) ?? number(read(raw, "cost.cache_write"))
  const cost =
    priceInput !== undefined && priceOutput !== undefined && priceInput >= 0.001 && priceOutput >= 0.001
      ? { input: priceInput, output: priceOutput, cacheRead, cacheWrite }
      : undefined

  return {
    id,
    name: firstString(raw, ["name", "display_name", "label"]) ?? id,
    context: firstNumber(raw, [
      "max_input_tokens",
      "context_length",
      "context_window",
      "max_context_length",
      "input_token_limit",
      "limits.context",
      "top_provider.context_length",
    ]),
    output: firstNumber(raw, [
      "max_output_tokens",
      "max_completion_tokens",
      "output_token_limit",
      "limits.output",
      "top_provider.max_completion_tokens",
    ]),
    tools: firstBool(raw, [
      "supports_function_calling",
      "supports_tool_choice",
      "capabilities.tools",
      "tool_call",
      "function_calling",
    ]),
    vision,
    reasoning: firstBool(raw, ["supports_reasoning", "capabilities.reasoning", "reasoning"]),
    cost,
    mode: firstString(raw, ["mode", "type", "model_type"]),
  }
}

function candidates(baseURL: string): string[] {
  let base = baseURL.trim().replace(/\/+$/, "")
  base = base.replace(/\/(chat\/completions|responses)$/i, "")
  base = base.replace(/\/models$/i, "")

  const urls = [`${base}/models`]
  if (!/\/v\d+$/i.test(base)) urls.push(`${base}/v1/models`)
  return [...new Set(urls)]
}

function headersFor(flavor: ProviderFlavor, apiKey: string | undefined): Record<string, string> {
  const headers: Record<string, string> = { accept: "application/json" }
  if (!apiKey) return headers
  if (flavor === "anthropic") {
    headers["x-api-key"] = apiKey
    headers["anthropic-version"] = "2023-06-01"
    headers["authorization"] = `Bearer ${apiKey}`
  } else {
    headers["authorization"] = `Bearer ${apiKey}`
  }
  return headers
}

function message(status: number, body: string): string {
  const snippet = body.replace(/\s+/g, " ").trim().slice(0, 300)
  if (status === 401 || status === 403) return `Authentication failed (HTTP ${status}). Check the API key.`
  if (status === 404) return "No model list endpoint was found. Check the Base URL."
  if (status === 429) return "The provider is rate limiting requests (HTTP 429). Try again shortly."
  return `The provider returned HTTP ${status}${snippet ? `: ${snippet}` : "."}`
}

async function request(url: string, headers: Record<string, string>, signal: AbortSignal) {
  const controller = new AbortController()
  const abort = () => controller.abort()
  signal.addEventListener("abort", abort, { once: true })
  const timer = setTimeout(abort, TIMEOUT_MS)
  try {
    return await fetch(url, { headers, signal: controller.signal })
  } finally {
    clearTimeout(timer)
    signal.removeEventListener("abort", abort)
  }
}

export async function discoverModels(input: {
  baseURL: string
  apiKey?: string
  providerID?: string
  flavor: ProviderFlavor
  signal: AbortSignal
}): Promise<DiscoverResult> {
  const baseURL = input.baseURL?.trim()
  if (!baseURL) return { ok: false, error: "Base URL is required." }

  let apiKey = input.apiKey?.trim()
  if (!apiKey && input.providerID) {
    apiKey = await resolveStoredKey(input.providerID)
  }

  let lastError: string | undefined
  for (const endpoint of candidates(baseURL)) {
    let response: Response
    try {
      response = await request(endpoint, headersFor(input.flavor, apiKey), input.signal)
    } catch (error) {
      const messageText = error instanceof Error ? error.message : String(error)
      return {
        ok: false,
        error: messageText.toLowerCase().includes("abort")
          ? "The provider did not respond in time."
          : `Could not reach the provider: ${messageText}`,
      }
    }

    const body = await response.text().catch(() => "")
    if (!response.ok) {
      lastError = message(response.status, body)
      if (response.status === 404) continue
      return { ok: false, error: lastError }
    }

    let payload: unknown
    try {
      payload = body ? JSON.parse(body) : undefined
    } catch {
      return { ok: false, endpoint, error: "The model list was not valid JSON." }
    }

    const list =
      Array.isArray(payload) ? payload
      : Array.isArray(record(payload)?.data) ? (record(payload)!.data as unknown[])
      : Array.isArray(record(payload)?.models) ? (record(payload)!.models as unknown[])
      : undefined

    if (!list) {
      return { ok: false, endpoint, error: "The response did not contain a model list." }
    }

    const models: ModelSpec[] = []
    const seen = new Set<string>()
    for (const item of list) {
      const raw = record(item)
      if (!raw) continue
      const model = normalizeModel(raw)
      if (!model || seen.has(model.id)) continue
      seen.add(model.id)
      models.push(model)
    }

    models.sort((a, b) => a.id.localeCompare(b.id))
    return { ok: true, endpoint, models }
  }

  return { ok: false, error: lastError ?? "No model list endpoint was found." }
}
