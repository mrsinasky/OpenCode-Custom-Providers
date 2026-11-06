import { Plugin } from "@opencode/plugin"
import { CustomProviders } from "./rpc"
import { configInfo, listProviders, removeProvider, saveProvider } from "./config"
import { discoverModels } from "./discovery"
import type { ProviderFlavor, SaveInput } from "./types"

function compact<T>(value: T): T {
  if (Array.isArray(value)) return value.map((item) => compact(item)) as T
  if (value !== null && typeof value === "object") {
    const result: Record<string, unknown> = {}
    for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
      if (item !== undefined) result[key] = compact(item)
    }
    return result as T
  }
  return value
}

export default Plugin.define({
  id: "custom-providers",
  async setup(ctx) {
    await ctx.rpc.register(CustomProviders, {
      info: async () => compact(await configInfo()),
      list: async () => compact(await listProviders()),
      discover: async (input, context) => {
        const value = input as {
          baseURL: string
          apiKey?: string
          providerID?: string
          flavor: ProviderFlavor
        }
        return compact(await discoverModels({ ...value, signal: context.signal }))
      },
      save: async (input) => {
        const value = input as SaveInput
        return compact(
          await saveProvider({
            id: value.id,
            name: value.name,
            baseURL: value.baseURL,
            apiKey: value.apiKey,
            flavor: value.flavor,
            models: value.models ?? [],
            previousID: value.previousID,
          }),
        )
      },
      remove: async (input) => compact(await removeProvider((input as { id: string }).id)),
    })
  },
})
