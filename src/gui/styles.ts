export const styles = `
.cp-page {
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 100%;
  max-width: 720px;
  min-height: 100%;
  box-sizing: border-box;
  padding: 48px 0 40px;
  font-size: 13px;
  line-height: var(--line-height-compact, 1.45);
  color: var(--v2-text-text-base, currentColor);
}
.cp-credit {
  margin-top: auto;
  padding-top: 32px;
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 0.01em;
  text-align: center;
  color: var(--v2-text-text-faint, color-mix(in srgb, currentColor 45%, transparent));
}
.cp-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}
.cp-header h2 {
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 530;
  line-height: 20px;
  letter-spacing: -0.13px;
  color: var(--v2-text-text-base, currentColor);
}
.cp-header p {
  margin: 0;
  max-width: 560px;
  font-size: 13px;
  font-weight: 440;
  line-height: 20px;
  letter-spacing: -0.04px;
  color: var(--v2-text-text-muted, color-mix(in srgb, currentColor 65%, transparent));
}
.cp-header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
.cp-config {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 8px;
  background: var(--v2-background-bg-layer-01, color-mix(in srgb, currentColor 4%, transparent));
  box-shadow: inset 0 0 0 0.5px var(--v2-border-border-muted, color-mix(in srgb, currentColor 12%, transparent));
}
.cp-config-main {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}
.cp-label {
  font-size: 13px;
  font-weight: 530;
  line-height: var(--line-height-compact, 1.45);
  color: var(--v2-text-text-base, currentColor);
}
.cp-path {
  font-family: var(--v2-font-family-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  font-size: 12px;
  color: var(--v2-text-text-muted, color-mix(in srgb, currentColor 65%, transparent));
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cp-config-side {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.cp-format {
  font-size: 11px;
  font-weight: 530;
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--v2-background-bg-layer-03, color-mix(in srgb, currentColor 9%, transparent));
  color: var(--v2-text-text-muted, color-mix(in srgb, currentColor 70%, transparent));
}
.cp-banner {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 8px;
  line-height: 1.45;
}
.cp-banner-error {
  background: color-mix(in srgb, var(--v2-state-fg-danger, #e5484d) 10%, transparent);
  box-shadow: inset 0 0 0 0.5px color-mix(in srgb, var(--v2-state-fg-danger, #e5484d) 40%, transparent);
  color: var(--v2-state-fg-danger, #e5484d);
}
.cp-banner-info {
  background: var(--v2-background-bg-layer-01, color-mix(in srgb, currentColor 4%, transparent));
  box-shadow: inset 0 0 0 0.5px var(--v2-border-border-muted, color-mix(in srgb, currentColor 12%, transparent));
  color: var(--v2-text-text-muted, color-mix(in srgb, currentColor 70%, transparent));
}
.cp-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 44px 20px;
  text-align: center;
  border-radius: 8px;
  background: var(--v2-background-bg-layer-01, transparent);
  box-shadow: inset 0 0 0 0.5px var(--v2-border-border-muted, color-mix(in srgb, currentColor 18%, transparent));
  color: var(--v2-text-text-muted, color-mix(in srgb, currentColor 65%, transparent));
}
.cp-empty strong {
  color: var(--v2-text-text-base, currentColor);
  font-size: 13px;
  font-weight: 530;
}
.cp-list {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: var(--v2-background-bg-layer-01, transparent);
  box-shadow: inset 0 0 0 0.5px var(--v2-border-border-muted, color-mix(in srgb, currentColor 12%, transparent));
  overflow: hidden;
}
.cp-provider {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-top: 0.5px solid var(--v2-border-border-base, color-mix(in srgb, currentColor 10%, transparent));
}
.cp-provider:first-child {
  border-top: none;
}
.cp-provider-main {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  flex: 1;
}
.cp-provider-name {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 530;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.04px;
}
.cp-provider-id {
  font-family: var(--v2-font-family-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  font-size: 11px;
  padding: 0 5px;
  border-radius: 4px;
  font-weight: 400;
  background: var(--v2-background-bg-layer-03, color-mix(in srgb, currentColor 8%, transparent));
  color: var(--v2-text-text-muted, color-mix(in srgb, currentColor 65%, transparent));
}
.cp-provider-url {
  font-family: var(--v2-font-family-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  font-size: 11px;
  color: var(--v2-text-text-muted, color-mix(in srgb, currentColor 60%, transparent));
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cp-provider-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  font-size: 11px;
  color: var(--v2-text-text-faint, color-mix(in srgb, currentColor 55%, transparent));
}
.cp-dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.4;
}
.cp-provider-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}
.cp-badge {
  font-size: 11px;
  line-height: 18px;
  padding: 0 6px;
  border-radius: 4px;
  background: var(--v2-background-bg-layer-02, transparent);
  box-shadow: inset 0 0 0 0.5px var(--v2-border-border-muted, color-mix(in srgb, currentColor 14%, transparent));
  color: var(--v2-text-text-muted, color-mix(in srgb, currentColor 65%, transparent));
}
.cp-badge-warn {
  background: color-mix(in srgb, var(--v2-state-fg-warning, #e5a54b) 10%, transparent);
  box-shadow: inset 0 0 0 0.5px color-mix(in srgb, var(--v2-state-fg-warning, #e5a54b) 40%, transparent);
  color: var(--v2-state-fg-warning, #e5a54b);
}
.cp-badge-ok {
  background: color-mix(in srgb, var(--v2-state-fg-success, #46a758) 10%, transparent);
  box-shadow: inset 0 0 0 0.5px color-mix(in srgb, var(--v2-state-fg-success, #46a758) 40%, transparent);
  color: var(--v2-state-fg-success, #46a758);
}
.cp-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.cp-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.cp-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}
.cp-field > .cp-field-label {
  font-size: 12px;
  font-weight: 530;
  line-height: 16px;
  color: var(--v2-text-text-muted, color-mix(in srgb, currentColor 75%, transparent));
}
.cp-hint {
  font-size: 11px;
  line-height: 1.4;
  color: var(--v2-text-text-faint, color-mix(in srgb, currentColor 55%, transparent));
}
.cp-field-error {
  font-size: 11px;
  line-height: 1.4;
  color: var(--v2-state-fg-danger, #e5484d);
}
.cp-flavor-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.cp-input-row {
  display: flex;
  align-items: center;
  gap: 4px;
}
.cp-input-row > :first-child {
  flex: 1;
  min-width: 0;
}
.cp-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 14px;
  border-top: 0.5px solid var(--v2-border-border-base, color-mix(in srgb, currentColor 10%, transparent));
}
.cp-section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}
.cp-section-title {
  font-size: 13px;
  font-weight: 530;
  line-height: var(--line-height-compact, 1.45);
  color: var(--v2-text-text-base, currentColor);
}
.cp-section-sub {
  font-size: 11px;
  line-height: 1.45;
  color: var(--v2-text-text-faint, color-mix(in srgb, currentColor 55%, transparent));
}
.cp-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.cp-search {
  flex: 1;
  min-width: 180px;
}
.cp-switch-row {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--v2-text-text-muted, color-mix(in srgb, currentColor 70%, transparent));
}
.cp-model-list {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: var(--v2-background-bg-layer-01, transparent);
  box-shadow: inset 0 0 0 0.5px var(--v2-border-border-muted, color-mix(in srgb, currentColor 12%, transparent));
  max-height: clamp(240px, 44vh, 520px);
  overflow-y: auto;
  overscroll-behavior: contain;
}
.cp-model {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-top: 0.5px solid var(--v2-border-border-base, color-mix(in srgb, currentColor 8%, transparent));
}
.cp-model:first-child {
  border-top: none;
}
.cp-model-main {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.cp-model-name {
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cp-model-id {
  font-family: var(--v2-font-family-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  font-size: 11px;
  color: var(--v2-text-text-faint, color-mix(in srgb, currentColor 55%, transparent));
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cp-model-meta {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
  font-size: 10px;
  color: var(--v2-text-text-faint, color-mix(in srgb, currentColor 50%, transparent));
}
.cp-limits {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 10px 12px 14px 48px;
  background: var(--v2-background-bg-layer-02, color-mix(in srgb, currentColor 3%, transparent));
  border-top: 0.5px solid var(--v2-border-border-base, color-mix(in srgb, currentColor 8%, transparent));
}
.cp-manual {
  display: flex;
  align-items: flex-end;
  gap: 8px;
}
.cp-manual > .cp-field {
  flex: 1;
}
.cp-dialog-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  width: 100%;
}
.cp-dialog-note {
  margin-inline-end: auto;
  font-size: 11px;
  color: var(--v2-text-text-faint, color-mix(in srgb, currentColor 55%, transparent));
}
.cp-inline-code {
  font-family: var(--v2-font-family-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  font-size: 11px;
  padding: 0 4px;
  border-radius: 4px;
  background: var(--v2-background-bg-layer-03, color-mix(in srgb, currentColor 8%, transparent));
}
/* The provider editor is narrower and taller than the host's x-large dialog. */
[data-component="dialog-v2"]:has(.cp-form) [data-slot="dialog-container"] {
  width: min(100vw - 32px, 640px) !important;
  height: min(100vh - 72px, 840px) !important;
}
@media (max-width: 640px) {
  .cp-page {
    padding-top: 32px;
  }
  .cp-header {
    flex-direction: column;
  }
  .cp-grid,
  .cp-limits {
    grid-template-columns: 1fr;
  }
  .cp-limits {
    padding-inline-start: 12px;
  }
  .cp-config {
    flex-direction: column;
    align-items: stretch;
  }
  .cp-config-side {
    justify-content: space-between;
  }
}
`
