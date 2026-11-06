import { For, Show, createMemo, createSignal } from "solid-js"
import { usePlugin, type DialogHandle } from "@opencode/plugin/gui"
import { CustomProviders, type CustomProvidersClient } from "../rpc"
import type { ModelSpec, ProviderEntry, ProviderFlavor } from "../types"
import type { definition } from "./definition"
import { formatLimit, isChatModel } from "./models"

const FLAVORS: { value: ProviderFlavor; label: string }[] = [
  { value: "openai", label: "packageOpenAI" },
  { value: "responses", label: "packageResponses" },
  { value: "anthropic", label: "packageAnthropic" },
]

const ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]*$/

interface ProviderEditorProps {
  dialog: DialogHandle
  provider?: ProviderEntry
  existingIDs: Set<string>
  onSaved(): void
}

export function ProviderEditor(props: ProviderEditorProps) {
  const ctx = usePlugin<typeof definition>()
  const rpc = () => ctx.client.rpc(CustomProviders) as unknown as CustomProvidersClient
  const stored = (props.provider?.models ?? []).map((model) => ({ ...model, legacy: true }))

  const [name, setName] = createSignal(props.provider?.name ?? "")
  const [id, setId] = createSignal(props.provider?.id ?? "")
  const [baseURL, setBaseURL] = createSignal(props.provider?.baseURL ?? "")
  const [apiKey, setApiKey] = createSignal("")
  const [showKey, setShowKey] = createSignal(false)
  const [flavor, setFlavor] = createSignal<ProviderFlavor>(props.provider?.flavor ?? "openai")
  const [models, setModels] = createSignal<ModelSpec[]>(stored)
  const [selected, setSelected] = createSignal<Set<string>>(new Set(stored.map((model) => model.id)))
  const [search, setSearch] = createSignal("")
  const [hideNonChat, setHideNonChat] = createSignal(true)
  const [expanded, setExpanded] = createSignal<Set<string>>(new Set())
  const [manual, setManual] = createSignal("")
  const [endpoint, setEndpoint] = createSignal<string>()
  const [fetching, setFetching] = createSignal(false)
  const [saving, setSaving] = createSignal(false)
  const [touched, setTouched] = createSignal(false)
  const [error, setError] = createSignal<string>()

  const idValid = () => ID_PATTERN.test(id().trim())
  const urlValid = () => {
    try {
      const parsed = new URL(baseURL().trim())
      return parsed.protocol === "http:" || parsed.protocol === "https:"
    } catch {
      return false
    }
  }
  const nameValid = () => name().trim().length > 0
  const overwrite = () => props.existingIDs.has(id().trim()) && props.provider?.id !== id().trim()

  const onIdInput = (value: string) => {
    setId(value)
    if (!name().trim()) setName(value)
  }

  const filtered = createMemo(() => {
    const query = search().trim().toLowerCase()
    return models().filter((model) => {
      if (hideNonChat() && !isChatModel(model)) return false
      if (!query) return true
      return model.id.toLowerCase().includes(query) || (model.name ?? "").toLowerCase().includes(query)
    })
  })

  const toggle = (modelID: string) => {
    setSelected((previous) => {
      const next = new Set(previous)
      if (next.has(modelID)) next.delete(modelID)
      else next.add(modelID)
      return next
    })
  }

  const selectVisible = () => {
    setSelected((previous) => {
      const next = new Set(previous)
      for (const model of filtered()) next.add(model.id)
      return next
    })
  }

  const clear = () => setSelected(new Set<string>())

  const updateModel = (modelID: string, patch: Partial<ModelSpec>) => {
    setModels((previous) => previous.map((model) => (model.id === modelID ? { ...model, ...patch } : model)))
  }

  const setLimit = (modelID: string, key: "context" | "output", value: string) => {
    const digits = value.replace(/[^\d]/g, "")
    updateModel(modelID, key === "context" ? { context: digits ? Number(digits) : undefined } : { output: digits ? Number(digits) : undefined })
  }

  const expand = (modelID: string) => {
    setExpanded((previous) => {
      const next = new Set(previous)
      if (next.has(modelID)) next.delete(modelID)
      else next.add(modelID)
      return next
    })
  }

  const addManual = () => {
    const value = manual().trim()
    if (!value) return
    setModels((previous) => (previous.some((model) => model.id === value) ? previous : [...previous, { id: value, name: value, legacy: true }]))
    setSelected((previous) => new Set(previous).add(value))
    setManual("")
  }

  const fetchModels = async () => {
    setTouched(true)
    if (!urlValid()) {
      setError(ctx.t("invalidURL"))
      return
    }

    setFetching(true)
    setError(undefined)
    try {
      const result = await rpc().discover({
        baseURL: baseURL().trim(),
        apiKey: apiKey().trim() || undefined,
        providerID: props.provider?.id,
        flavor: flavor(),
      })
      if (!result.ok) {
        setError(result.error ?? ctx.t("discoverFailed"))
        return
      }

      const fetched = result.models ?? []
      const fetchedIDs = new Set(fetched.map((model) => model.id))
      const keep = models().filter((model) => !fetchedIDs.has(model.id) && (model.legacy || selected().has(model.id)))
      const next = [...fetched.map((model) => ({ ...model, legacy: false })), ...keep]

      setModels(next)
      setEndpoint(result.endpoint)
      setSelected((previous) => {
        const validIDs = new Set(next.map((model) => model.id))
        const updated = new Set<string>()
        for (const modelID of previous) {
          if (validIDs.has(modelID)) updated.add(modelID)
        }
        return updated
      })
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause))
    } finally {
      setFetching(false)
    }
  }

  const save = async () => {
    setTouched(true)
    setError(undefined)
    if (!nameValid() || !idValid() || !urlValid()) return

    setSaving(true)
    try {
      const specs = models()
        .filter((model) => selected().has(model.id))
        .map((model) => ({
          id: model.id,
          name: model.name || model.id,
          context: model.context,
          output: model.output,
          tools: model.tools,
          vision: model.vision,
          reasoning: model.reasoning,
          cost: model.cost,
        }))

      const result = await rpc().save({
        id: id().trim(),
        name: name().trim(),
        baseURL: baseURL().trim(),
        apiKey: apiKey().trim() || undefined,
        flavor: flavor(),
        models: specs,
        previousID: props.provider?.id,
      })
      if (!result.ok) {
        setError(result.error ?? ctx.t("saveFailed"))
        return
      }

      ctx.toast.show({ title: ctx.t("saved"), description: ctx.t("savedHint"), variant: "success" })
      props.onSaved()
      props.dialog.close()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause))
    } finally {
      setSaving(false)
    }
  }

  const limitText = (value: number | undefined) => (value === undefined ? "" : String(value))

  return (
    <ctx.ui.Dialog
      title={props.provider ? ctx.t("editProvider") : ctx.t("newProvider")}
      size="large"
      footer={
        <div class="cp-dialog-footer">
          <span class="cp-dialog-note">
            {selected().size > 0 ? ctx.t("selectedCount", { count: selected().size }) : ctx.t("noModelsSelected")}
          </span>
          <ctx.ui.Button variant="ghost" onClick={props.dialog.close}>
            {ctx.t("cancel")}
          </ctx.ui.Button>
          <ctx.ui.Button variant="contrast" busy={saving()} onClick={() => void save()}>
            {saving() ? ctx.t("saving") : ctx.t("save")}
          </ctx.ui.Button>
        </div>
      }
    >
      <div class="cp-form">
        <div class="cp-grid">
          <div class="cp-field">
            <span class="cp-field-label">{ctx.t("name")}</span>
            <ctx.ui.TextInput
              label={ctx.t("name")}
              placeholder={ctx.t("namePlaceholder")}
              value={name()}
              onInput={setName}
              autofocus
            />
            <Show when={touched() && !nameValid()}>
              <span class="cp-field-error">{ctx.t("invalidName")}</span>
            </Show>
          </div>
          <div class="cp-field">
            <span class="cp-field-label">{ctx.t("id")}</span>
            <ctx.ui.TextInput
              label={ctx.t("id")}
              placeholder={ctx.t("idPlaceholder")}
              value={id()}
              onInput={onIdInput}
              invalid={touched() && !idValid()}
            />
            <Show when={touched() && !idValid()} fallback={<span class="cp-hint">{ctx.t("idHint")}</span>}>
              <span class="cp-field-error">{ctx.t("invalidId")}</span>
            </Show>
            <Show when={overwrite()}>
              <span class="cp-hint">{ctx.t("idTaken")}</span>
            </Show>
          </div>
        </div>

        <div class="cp-grid">
          <div class="cp-field">
            <span class="cp-field-label">{ctx.t("baseURL")}</span>
            <ctx.ui.TextInput
              label={ctx.t("baseURL")}
              placeholder={ctx.t("baseURLPlaceholder")}
              type="url"
              value={baseURL()}
              onInput={setBaseURL}
              invalid={touched() && !urlValid()}
            />
            <Show when={touched() && !urlValid()} fallback={<span class="cp-hint">{ctx.t("baseURLHint")}</span>}>
              <span class="cp-field-error">{ctx.t("invalidURL")}</span>
            </Show>
          </div>
          <div class="cp-field">
            <span class="cp-field-label">
              {ctx.t("apiKey")} <span class="cp-hint">({ctx.t("optional")})</span>
            </span>
            <div class="cp-input-row">
              <ctx.ui.TextInput
                label={ctx.t("apiKey")}
                placeholder={ctx.t("apiKeyPlaceholder")}
                type={showKey() ? "text" : "password"}
                value={apiKey()}
                onInput={setApiKey}
              />
              <ctx.ui.IconButton
                icon={showKey() ? "outline-eye-slash" : "eye"}
                label={showKey() ? ctx.t("hideKey") : ctx.t("showKey")}
                onClick={() => setShowKey((value) => !value)}
              />
            </div>
            <span class="cp-hint">{props.provider ? ctx.t("apiKeyKeep") : ctx.t("apiKeyOptional")}</span>
          </div>
        </div>

        <div class="cp-section">
          <div class="cp-section-head">
            <span class="cp-section-title">{ctx.t("flavor")}</span>
            <span class="cp-section-sub">{ctx.t("packageHint")}</span>
          </div>
          <div class="cp-flavor-row">
            <For each={FLAVORS}>
              {(item) => (
                <ctx.ui.Button
                  size="small"
                  variant={flavor() === item.value ? "contrast" : "neutral"}
                  onClick={() => setFlavor(item.value)}
                >
                  {ctx.t(item.label)}
                </ctx.ui.Button>
              )}
            </For>
          </div>
        </div>

        <Show when={error()}>
          {(message) => (
            <div class="cp-banner cp-banner-error">
              <ctx.ui.Icon name="warning" size="small" />
              <span>{message()}</span>
            </div>
          )}
        </Show>

        <div class="cp-section">
          <div class="cp-section-head">
            <div>
              <div class="cp-section-title">{ctx.t("models")}</div>
              <div class="cp-section-sub">
                {ctx.t("modelsHelp")}
                <Show when={endpoint()}>{(url) => <span class="cp-inline-code">{url()}</span>}</Show>
              </div>
            </div>
            <ctx.ui.Button size="small" icon="refresh" busy={fetching()} onClick={() => void fetchModels()}>
              {fetching() ? ctx.t("fetching") : ctx.t("fetch")}
            </ctx.ui.Button>
          </div>

          <div class="cp-toolbar">
            <div class="cp-search">
              <ctx.ui.TextInput
                label={ctx.t("searchModels")}
                placeholder={ctx.t("searchModels")}
                type="search"
                value={search()}
                onInput={setSearch}
              />
            </div>
            <ctx.ui.Button size="small" variant="ghost" onClick={selectVisible}>
              {ctx.t("selectAll")}
            </ctx.ui.Button>
            <ctx.ui.Button size="small" variant="ghost" onClick={clear}>
              {ctx.t("clear")}
            </ctx.ui.Button>
            <span class="cp-switch-row">
              <ctx.ui.Switch
                label={ctx.t("hideNonChat")}
                hideLabel
                checked={hideNonChat()}
                onChange={setHideNonChat}
              />
              {ctx.t("hideNonChat")}
            </span>
          </div>

          <Show
            when={models().length > 0}
            fallback={<div class="cp-banner cp-banner-info">{ctx.t("noModels")}</div>}
          >
            <Show
              when={filtered().length > 0}
              fallback={<div class="cp-banner cp-banner-info">{ctx.t("noMatches")}</div>}
            >
              <div class="cp-model-list">
                <For each={filtered()}>
                  {(model) => (
                    <>
                      <div class="cp-model">
                        <ctx.ui.Switch
                          label={model.name || model.id}
                          hideLabel
                          checked={selected().has(model.id)}
                          onChange={() => toggle(model.id)}
                        />
                        <div class="cp-model-main">
                          <div class="cp-model-name">{model.name || model.id}</div>
                          <div class="cp-model-id">{model.id}</div>
                          <div class="cp-model-meta">
                            <Show when={formatLimit(model.context)}>
                              {(limit) => <span>{`${limit()} ${ctx.t("contextHint")}`}</span>}
                            </Show>
                            <Show when={model.tools}>
                              <span class="cp-badge">{ctx.t("tools")}</span>
                            </Show>
                            <Show when={model.vision}>
                              <span class="cp-badge">{ctx.t("vision")}</span>
                            </Show>
                            <Show when={model.reasoning}>
                              <span class="cp-badge">{ctx.t("reasoning")}</span>
                            </Show>
                            <Show when={model.legacy}>
                              <span class="cp-badge">{ctx.t("legacy")}</span>
                            </Show>
                          </div>
                        </div>
                        <ctx.ui.Tooltip value={ctx.t("advanced")}>
                          <ctx.ui.IconButton
                            icon={expanded().has(model.id) ? "chevron-down" : "chevron-right"}
                            label={ctx.t("advanced")}
                            pressed={expanded().has(model.id)}
                            onClick={() => expand(model.id)}
                          />
                        </ctx.ui.Tooltip>
                      </div>
                      <Show when={expanded().has(model.id)}>
                        <div class="cp-limits">
                          <div class="cp-field">
                            <span class="cp-field-label">{ctx.t("context")}</span>
                            <ctx.ui.TextInput
                              label={ctx.t("context")}
                              placeholder={ctx.t("contextHint")}
                              value={limitText(model.context)}
                              onInput={(value) => setLimit(model.id, "context", value)}
                            />
                          </div>
                          <div class="cp-field">
                            <span class="cp-field-label">{ctx.t("output")}</span>
                            <ctx.ui.TextInput
                              label={ctx.t("output")}
                              placeholder={ctx.t("outputHint")}
                              value={limitText(model.output)}
                              onInput={(value) => setLimit(model.id, "output", value)}
                            />
                          </div>
                        </div>
                      </Show>
                    </>
                  )}
                </For>
              </div>
            </Show>
          </Show>

          <div class="cp-manual">
            <div class="cp-field">
              <span class="cp-field-label">{ctx.t("manual")}</span>
              <ctx.ui.TextInput
                label={ctx.t("manual")}
                placeholder={ctx.t("manualPlaceholder")}
                value={manual()}
                onInput={setManual}
                onSubmit={addManual}
              />
              <span class="cp-hint">{ctx.t("modelIdHint")}</span>
            </div>
            <ctx.ui.Button icon="plus" onClick={addManual}>
              {ctx.t("addManual")}
            </ctx.ui.Button>
          </div>
        </div>
      </div>
    </ctx.ui.Dialog>
  )
}
