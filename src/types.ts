export type ConfigFormat = "v1" | "v2"

export type ProviderFlavor = "openai" | "responses" | "anthropic"

export interface ModelCost {
  input: number
  output: number
  cacheRead?: number
  cacheWrite?: number
}

export interface ModelSpec {
  id: string
  name: string
  context?: number
  output?: number
  tools?: boolean
  vision?: boolean
  reasoning?: boolean
  cost?: ModelCost
  mode?: string
  legacy?: boolean
}

export interface ProviderEntry {
  id: string
  name: string
  baseURL: string
  package: string
  flavor: ProviderFlavor
  hasKey: boolean
  models: ModelSpec[]
}

export interface ConfigInfo {
  path: string
  exists: boolean
  format: ConfigFormat
}

export interface DiscoverResult {
  ok: boolean
  models?: ModelSpec[]
  error?: string
  endpoint?: string
}

export interface SaveInput {
  id: string
  name: string
  baseURL: string
  apiKey?: string
  flavor: ProviderFlavor
  models: ModelSpec[]
  previousID?: string
}

export interface SaveResult {
  ok: boolean
  error?: string
  path?: string
}

export interface RemoveResult {
  ok: boolean
  error?: string
  path?: string
}
