import type { ModelSpec } from "../types"

const NON_CHAT = /(^|[-_./:])(embed|embedding|embeddings|whisper|tts|audio|image|dall-e|dalle|moderation|rerank|transcribe|transcription|speech|voice|sora|ocr)([-_./:]|$)/i
const NON_CHAT_MODE = /embed|image|audio|video|moderation|rerank|tts|speech|transcri/i

/** Whether a discovered model looks like a chat model. */
export function isChatModel(model: ModelSpec): boolean {
  const mode = model.mode?.trim().toLowerCase()
  if (mode && NON_CHAT_MODE.test(mode)) return false
  if (mode === "completion" || mode === "chat" || mode === "responses") return true
  return !NON_CHAT.test(model.id) && !NON_CHAT.test(model.name)
}

/** Format a token limit compactly, e.g. 128K or 1M. */
export function formatLimit(value: number | undefined): string | undefined {
  if (value === undefined || !Number.isFinite(value) || value <= 0) return undefined
  if (value >= 1_000_000) {
    const millions = value / 1_000_000
    return `${Number.isInteger(millions) ? millions : millions.toFixed(1)}M`
  }
  if (value >= 1_000) {
    const thousands = value / 1_000
    return `${Number.isInteger(thousands) ? thousands : thousands.toFixed(1)}K`
  }
  return String(value)
}
