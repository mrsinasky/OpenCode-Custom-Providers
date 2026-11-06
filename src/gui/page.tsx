import { For, Show, createMemo, createSignal, onMount } from "solid-js"
import { usePlugin } from "@opencode/plugin/gui"
import type { ConfigInfo, ProviderEntry } from "../types"
import { CustomProviders, type CustomProvidersClient } from "../rpc"
import type { definition } from "./definition"
import { ProviderEditor } from "./editor"

export function CustomProvidersPage() {
  const ctx = usePlugin<typeof definition>()
  const rpc = () => ctx.client.rpc(CustomProviders) as unknown as CustomProvidersClient
  const [info, setInfo] = createSignal<ConfigInfo>()
  const [providers, setProviders] = createSignal<ProviderEntry[]>([])
  const [loading, setLoading] = createSignal(true)
  const [error, setError] = createSignal<string>()

  const load = async () => {
    setLoading(true)
    setError(undefined)
    try {
      const result = await rpc().list({})
      setInfo(result.info)
      setProviders(result.providers)
      if (result.error) setError(result.error)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause))
    } finally {
      setLoading(false)
    }
  }

  onMount(() => void load())

  const existingIDs = createMemo(() => new Set(providers().map((provider) => provider.id)))

  const open = (provider?: ProviderEntry) => {
    ctx.dialogs.open((dialog) => (
      <ProviderEditor
        dialog={dialog}
        provider={provider}
        existingIDs={existingIDs()}
        onSaved={() => void load()}
      />
    ))
  }

  const remove = async (provider: ProviderEntry) => {
    const confirmed = await ctx.dialogs.confirm({
      title: ctx.t("deleteTitle"),
      description: ctx.t("deleteDescription", { name: provider.name || provider.id }),
      confirm: ctx.t("deleteConfirm"),
      cancel: ctx.t("cancel"),
      danger: true,
    })
    if (!confirmed) return

    try {
      const result = await rpc().remove({ id: provider.id })
      if (!result.ok) {
        setError(result.error ?? ctx.t("configError"))
        return
      }
      ctx.toast.show({ title: ctx.t("deleted"), variant: "success" })
      await load()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause))
    }
  }

  const copyPath = async (path: string | undefined) => {
    if (!path) return
    await ctx.system.copy(path)
    ctx.toast.show({ title: ctx.t("copied"), variant: "success", duration: 2000 })
  }

  const revealPath = async (path: string | undefined) => {
    if (!path) return
    if (ctx.desktop) {
      const shown = await ctx.desktop.reveal(path)
      if (shown) return
    }
    await copyPath(path)
  }

  const packageLabel = (provider: ProviderEntry) => {
    if (provider.flavor === "anthropic") return ctx.t("packageAnthropic")
    if (provider.flavor === "responses") return ctx.t("packageResponses")
    return ctx.t("packageOpenAI")
  }

  return (
    <div class="cp-page">
      <div class="cp-header">
        <div>
          <h2>{ctx.t("title")}</h2>
          <p>{ctx.t("description")}</p>
        </div>
        <div class="cp-header-actions">
          <ctx.ui.Tooltip value={ctx.t("refresh")}>
            <ctx.ui.IconButton
              icon="refresh"
              label={ctx.t("refresh")}
              busy={loading()}
              onClick={() => void load()}
            />
          </ctx.ui.Tooltip>
          <ctx.ui.Button variant="contrast" icon="plus" onClick={() => open()}>
            {ctx.t("add")}
          </ctx.ui.Button>
        </div>
      </div>

      <Show when={info()}>
        {(current) => (
          <div class="cp-config">
            <div class="cp-config-main">
              <span class="cp-label">{ctx.t("configPath")}</span>
              <span class="cp-path" title={current().path}>
                {current().path}
              </span>
              <Show when={!current().exists}>
                <span class="cp-hint">{ctx.t("configMissing")}</span>
              </Show>
            </div>
            <div class="cp-config-side">
              <span class="cp-format">{current().format.toUpperCase()}</span>
              <ctx.ui.Tooltip value={ctx.t("copyPath")}>
                <ctx.ui.IconButton
                  icon="copy"
                  label={ctx.t("copyPath")}
                  onClick={() => void copyPath(current().path)}
                />
              </ctx.ui.Tooltip>
              <ctx.ui.Tooltip value={ctx.t("reveal")}>
                <ctx.ui.IconButton
                  icon="folder"
                  label={ctx.t("reveal")}
                  onClick={() => void revealPath(current().path)}
                />
              </ctx.ui.Tooltip>
            </div>
          </div>
        )}
      </Show>

      <Show when={error()}>
        {(message) => (
          <div class="cp-banner cp-banner-error">
            <ctx.ui.Icon name="warning" size="small" />
            <span>{message()}</span>
            <ctx.ui.Button size="small" variant="ghost" icon="refresh" onClick={() => void load()}>
              {ctx.t("retry")}
            </ctx.ui.Button>
          </div>
        )}
      </Show>

      <Show
        when={!loading()}
        fallback={
          <div class="cp-empty">
            <ctx.ui.Loader />
            <span>{ctx.t("loading")}</span>
          </div>
        }
      >
        <Show
          when={providers().length > 0}
          fallback={
            <div class="cp-empty">
              <ctx.ui.Icon name="providers" size="large" />
              <strong>{ctx.t("noProviders")}</strong>
              <span>{ctx.t("noProvidersHint")}</span>
              <ctx.ui.Button variant="contrast" icon="plus" onClick={() => open()}>
                {ctx.t("add")}
              </ctx.ui.Button>
            </div>
          }
        >
          <div class="cp-list">
            <For each={providers()}>
              {(provider) => (
                <div class="cp-provider">
                  <div class="cp-provider-main">
                    <div class="cp-provider-name">
                      <span>{provider.name || provider.id}</span>
                      <span class="cp-provider-id">{provider.id}</span>
                    </div>
                    <div class="cp-provider-url" title={provider.baseURL}>
                      {provider.baseURL || "—"}
                    </div>
                    <div class="cp-provider-meta">
                      <span>{ctx.t("modelCount", { count: provider.models.length })}</span>
                      <span class="cp-dot" />
                      <span class={provider.hasKey ? "cp-badge cp-badge-ok" : "cp-badge cp-badge-warn"}>
                        {provider.hasKey ? ctx.t("keyStored") : ctx.t("keyMissing")}
                      </span>
                      <span class="cp-badge">{packageLabel(provider)}</span>
                    </div>
                  </div>
                  <div class="cp-provider-actions">
                    <ctx.ui.Tooltip value={ctx.t("edit")}>
                      <ctx.ui.IconButton
                        icon="edit"
                        label={ctx.t("edit")}
                        onClick={() => open(provider)}
                      />
                    </ctx.ui.Tooltip>
                    <ctx.ui.Tooltip value={ctx.t("delete")}>
                      <ctx.ui.IconButton
                        icon="trash"
                        label={ctx.t("delete")}
                        onClick={() => void remove(provider)}
                      />
                    </ctx.ui.Tooltip>
                  </div>
                </div>
              )}
            </For>
          </div>
        </Show>
      </Show>

      <div class="cp-credit">By Sina Asemani</div>
    </div>
  )
}
