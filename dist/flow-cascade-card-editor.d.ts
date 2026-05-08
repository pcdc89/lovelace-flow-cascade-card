import { LitElement } from "lit";
import type { FlowCascadeCardConfig, HomeAssistant } from "./types.js";
export declare class FlowCascadeCardEditor extends LitElement {
    hass?: HomeAssistant;
    private _config?;
    private _yamlError;
    static styles: import("lit").CSSResult;
    setConfig(config: FlowCascadeCardConfig): void;
    private _configToYaml;
    private _objToYaml;
    private _onInput;
    /** Minimal YAML parser for flat HA card configs — delegates to JSON via js-yaml shim if available */
    private _parseSimpleYaml;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "flow-cascade-card-editor": FlowCascadeCardEditor;
    }
}
//# sourceMappingURL=flow-cascade-card-editor.d.ts.map