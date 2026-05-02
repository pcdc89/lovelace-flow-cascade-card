import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { FlowCascadeCardConfig, HomeAssistant } from "./types.js";

@customElement("flow-cascade-card-editor")
export class FlowCascadeCardEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config?: FlowCascadeCardConfig;
  @state() private _yamlError = "";

  static override styles = css`
    .editor-wrap {
      padding: 4px 0;
    }
    label {
      display: block;
      font-size: 0.85em;
      font-weight: 500;
      margin-bottom: 6px;
      opacity: 0.75;
    }
    textarea {
      width: 100%;
      min-height: 320px;
      font-family: monospace;
      font-size: 0.82em;
      padding: 8px;
      box-sizing: border-box;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
      background: var(--code-editor-background-color, #f5f5f5);
      color: var(--primary-text-color, #212121);
      resize: vertical;
    }
    textarea.error {
      border-color: var(--error-color, #f44336);
    }
    .error-msg {
      color: var(--error-color, #f44336);
      font-size: 0.8em;
      margin-top: 4px;
    }
    .hint {
      font-size: 0.78em;
      opacity: 0.6;
      margin-top: 6px;
    }
  `;

  setConfig(config: FlowCascadeCardConfig): void {
    this._config = config;
  }

  private _configToYaml(config: FlowCascadeCardConfig): string {
    const { type: _type, ...rest } = config;
    return this._objToYaml(rest, 0);
  }

  private _objToYaml(obj: unknown, indent: number): string {
    const pad = "  ".repeat(indent);
    if (obj === null || obj === undefined) return "null";
    if (typeof obj === "boolean") return obj ? "true" : "false";
    if (typeof obj === "number") return String(obj);
    if (typeof obj === "string") {
      return obj.includes(":") || obj.includes("#") || obj.includes("\n")
        ? `"${obj.replace(/"/g, '\\"')}"`
        : obj;
    }
    if (Array.isArray(obj)) {
      if (obj.length === 0) return "[]";
      return obj
        .map((item) => {
          if (typeof item === "object" && item !== null) {
            const entries = Object.entries(item as Record<string, unknown>);
            const first = entries[0];
            const rest = entries.slice(1);
            const firstLine = `${pad}- ${first[0]}: ${this._objToYaml(first[1], indent + 1)}`;
            const restLines = rest
              .map(([k, v]) => `${pad}  ${k}: ${this._objToYaml(v, indent + 1)}`)
              .join("\n");
            return restLines ? `${firstLine}\n${restLines}` : firstLine;
          }
          return `${pad}- ${this._objToYaml(item, indent)}`;
        })
        .join("\n");
    }
    if (typeof obj === "object") {
      const entries = Object.entries(obj as Record<string, unknown>);
      if (entries.length === 0) return "{}";
      return entries
        .map(([k, v]) => {
          if (Array.isArray(v)) {
            return `${pad}${k}:\n${this._objToYaml(v, indent + 1)}`;
          }
          if (typeof v === "object" && v !== null) {
            return `${pad}${k}:\n${this._objToYaml(v, indent + 1)}`;
          }
          return `${pad}${k}: ${this._objToYaml(v, indent + 1)}`;
        })
        .join("\n");
    }
    return String(obj);
  }

  private _onInput(e: Event): void {
    const textarea = e.target as HTMLTextAreaElement;
    const raw = textarea.value;
    try {
      const parsed = this._parseSimpleYaml(raw);
      this._yamlError = "";
      const newConfig = {
        type: "custom:flow-cascade-card",
        ...parsed,
      } as FlowCascadeCardConfig;
      this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: newConfig },
          bubbles: true,
          composed: true,
        })
      );
    } catch (err) {
      this._yamlError = err instanceof Error ? err.message : "YAML-Fehler";
    }
  }

  /** Minimal YAML parser for flat HA card configs — delegates to JSON via js-yaml shim if available */
  private _parseSimpleYaml(yaml: string): Record<string, unknown> {
    // Try HA's built-in js-yaml if available
    const win = window as unknown as Record<string, unknown>;
    if (typeof win["jsyaml"] === "object" && win["jsyaml"] !== null) {
      const jsyaml = win["jsyaml"] as { load: (s: string) => unknown };
      return jsyaml.load(yaml) as Record<string, unknown>;
    }
    // Fallback: try JSON5-style (just JSON with trailing commas stripped)
    try {
      return JSON.parse(yaml) as Record<string, unknown>;
    } catch {
      throw new Error("Kein YAML-Parser verfügbar — bitte als JSON eingeben");
    }
  }

  override render() {
    if (!this._config) return html``;
    const yaml = this._configToYaml(this._config);

    return html`
      <div class="editor-wrap">
        <label>Konfiguration (YAML)</label>
        <textarea
          class="${this._yamlError ? "error" : ""}"
          .value=${yaml}
          @change=${this._onInput}
          spellcheck="false"
          autocomplete="off"
        ></textarea>
        ${this._yamlError
          ? html`<div class="error-msg">⚠ ${this._yamlError}</div>`
          : ""}
        <div class="hint">
          Änderungen werden beim Verlassen des Feldes übernommen.
          Dokumentation: github.com/pcdc89/lovelace-flow-cascade-card
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "flow-cascade-card-editor": FlowCascadeCardEditor;
  }
}
