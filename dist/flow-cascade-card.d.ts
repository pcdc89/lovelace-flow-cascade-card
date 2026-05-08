import "./flow-cascade-card-editor.js";
import { LitElement, nothing } from "lit";
import type { FlowCascadeCardConfig, HomeAssistant } from "./types.js";
export declare class FlowCascadeCard extends LitElement {
    static styles: import("lit").CSSResult[];
    hass?: HomeAssistant;
    private _config?;
    setConfig(config: FlowCascadeCardConfig): void;
    getCardSize(): number;
    static getConfigElement(): HTMLElement;
    static getStubConfig(): FlowCascadeCardConfig;
    private _buildRows;
    private _resolveLinks;
    private _getNodeWatts;
    private _getNodeSoc;
    private _resolvedNodeColor;
    private _renderNodeBox;
    private _renderNodeWithSide;
    private _renderHorizLink;
    private _renderNodeRow;
    private _renderFanOutZone;
    private _renderInterRowZone;
    private _renderSingleLink;
    private _renderBypassZone;
    private _renderInterstitialZone;
    private _renderSplitLinks;
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
}
declare global {
    interface HTMLElementTagNameMap {
        "flow-cascade-card": FlowCascadeCard;
    }
}
//# sourceMappingURL=flow-cascade-card.d.ts.map