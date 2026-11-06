import { Rpc } from "@opencode/plugin/rpc"
import type {
  ConfigInfo,
  DiscoverResult,
  ProviderEntry,
  ProviderFlavor,
  RemoveResult,
  SaveInput,
  SaveResult,
} from "./types"

export interface CustomProvidersList {
  info: ConfigInfo
  providers: ProviderEntry[]
  error?: string
}

export interface DiscoverInput {
  baseURL: string
  apiKey?: string
  providerID?: string
  flavor: ProviderFlavor
}

export interface RemoveInput {
  id: string
}

export interface CustomProvidersClient {
  info(input?: Record<string, never>): Promise<ConfigInfo>
  list(input?: Record<string, never>): Promise<CustomProvidersList>
  discover(input: DiscoverInput): Promise<DiscoverResult>
  save(input: SaveInput): Promise<SaveResult>
  remove(input: RemoveInput): Promise<RemoveResult>
}

const Empty = {
  type: "object",
  properties: {},
  required: [],
  additionalProperties: false,
} as const

const Model = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    context: { type: "number" },
    output: { type: "number" },
    tools: { type: "boolean" },
    vision: { type: "boolean" },
    reasoning: { type: "boolean" },
    cost: {
      type: "object",
      properties: {
        input: { type: "number" },
        output: { type: "number" },
        cacheRead: { type: "number" },
        cacheWrite: { type: "number" },
      },
      required: ["input", "output"],
      additionalProperties: false,
    },
    mode: { type: "string" },
    legacy: { type: "boolean" },
  },
  required: ["id", "name"],
  additionalProperties: false,
} as const

const Provider = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    baseURL: { type: "string" },
    package: { type: "string" },
    flavor: { type: "string", enum: ["openai", "responses", "anthropic"] },
    hasKey: { type: "boolean" },
    models: { type: "array", items: Model },
  },
  required: ["id", "name", "baseURL", "package", "flavor", "hasKey", "models"],
  additionalProperties: false,
} as const

const Format = {
  type: "object",
  properties: {
    path: { type: "string" },
    exists: { type: "boolean" },
    format: { type: "string", enum: ["v1", "v2"] },
  },
  required: ["path", "exists", "format"],
  additionalProperties: false,
} as const

const ListOutput = {
  type: "object",
  properties: {
    info: Format,
    providers: { type: "array", items: Provider },
    error: { type: "string" },
  },
  required: ["info", "providers"],
  additionalProperties: false,
} as const

const DiscoverInput = {
  type: "object",
  properties: {
    baseURL: { type: "string" },
    apiKey: { type: "string" },
    providerID: { type: "string" },
    flavor: { type: "string", enum: ["openai", "responses", "anthropic"] },
  },
  required: ["baseURL", "flavor"],
  additionalProperties: false,
} as const

const DiscoverOutput = {
  type: "object",
  properties: {
    ok: { type: "boolean" },
    models: { type: "array", items: Model },
    error: { type: "string" },
    endpoint: { type: "string" },
  },
  required: ["ok"],
  additionalProperties: false,
} as const

const SaveInput = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    baseURL: { type: "string" },
    apiKey: { type: "string" },
    flavor: { type: "string", enum: ["openai", "responses", "anthropic"] },
    models: { type: "array", items: Model },
    previousID: { type: "string" },
  },
  required: ["id", "name", "baseURL", "flavor", "models"],
  additionalProperties: false,
} as const

const SaveOutput = {
  type: "object",
  properties: {
    ok: { type: "boolean" },
    error: { type: "string" },
    path: { type: "string" },
  },
  required: ["ok"],
  additionalProperties: false,
} as const

const RemoveInput = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
} as const

const RemoveOutput = {
  type: "object",
  properties: {
    ok: { type: "boolean" },
    error: { type: "string" },
    path: { type: "string" },
  },
  required: ["ok"],
  additionalProperties: false,
} as const

export const CustomProviders = Rpc.define({
  id: "custom-providers",
  methods: {
    info: { input: Empty, output: Format },
    list: { input: Empty, output: ListOutput },
    discover: { input: DiscoverInput, output: DiscoverOutput },
    save: { input: SaveInput, output: SaveOutput },
    remove: { input: RemoveInput, output: RemoveOutput },
  },
  events: {},
})
