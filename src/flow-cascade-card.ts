import "./flow-cascade-card-editor.js";
import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import type {
  FlowCascadeCardConfig,
  HomeAssistant,
  NodeConfig,
  ResolvedLink,
} from "./types.js";
import { cardStyles } from "./styles.js";

const DEFAULT_ICONS: Record<string, string> = {
  pv: "☀️",
  solar: "☀️",
  battery: "🔋",
  batterie: "🔋",
  haus: "🏠",
  house: "🏠",
  home: "🏠",
  car: "🚗",
  ev: "🚗",
  auto: "🚗",
  wallbox: "🔌",
  wp: "♨️",
  waermepumpe: "♨️",
  heatpump: "♨️",
  netz: "⚡",
  grid: "⚡",
};

function guessIcon(id: string): string {
  const key = id.toLowerCase();
  for (const [k, v] of Object.entries(DEFAULT_ICONS)) {
    if (key.includes(k)) return v;
  }
  return "🔷";
}

function formatWatts(
  w: number,
  decimals: number,
  unit: "W" | "kW" | "auto"
): string {
  const abs = Math.abs(w);
  if (unit === "kW" || (unit === "auto" && abs >= 1000)) {
    return `${(w / 1000).toFixed(decimals)} kW`;
  }
  return `${w.toFixed(0)} W`;
}

function nodeColor(node: NodeConfig, watts: number): string {
  if (node.color) return node.color;
  const type = node.type ?? "bidirectional";
  if (type === "source") return "var(--fcc-positive)";
  if (type === "sink") return "#03a9f4";
  const isPositive = node.invert_color ? watts <= 0 : watts >= 0;
  return isPositive ? "var(--fcc-positive)" : "var(--fcc-negative)";
}

function linkColor(direction: ResolvedLink["direction"]): string {
  if (direction === "forward") return "var(--fcc-positive)";
  if (direction === "reverse") return "var(--fcc-negative)";
  return "var(--fcc-idle)";
}

@customElement("flow-cascade-card")
export class FlowCascadeCard extends LitElement {
  static override styles = [cardStyles, css``];

  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config?: FlowCascadeCardConfig;

  setConfig(config: FlowCascadeCardConfig): void {
    if (!config.nodes?.length) throw new Error("flow-cascade-card: 'nodes' required");
    if (!config.links?.length) throw new Error("flow-cascade-card: 'links' required");
    this._config = {
      animation_speed: 1200,
      idle_threshold: 5,
      decimals: 1,
      unit: "auto",
      ...config,
    };
  }

  getCardSize(): number {
    const n = this._config?.nodes.length ?? 3;
    return Math.ceil(n * 1.5);
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("flow-cascade-card-editor");
  }

  static getStubConfig(): FlowCascadeCardConfig {
    return {
      type: "custom:flow-cascade-card",
      title: "Energiefluss",
      nodes: [
        { id: "pv",      label: "PV",        icon: "☀️",  power_entity: "sensor.pv_power",       type: "source",        layout_row: 0 },
        { id: "battery", label: "Batterie",   icon: "🔋",  power_entity: "sensor.battery_power",  type: "bidirectional", soc_entity: "sensor.battery_soc", layout_row: 0 },
        { id: "haus",    label: "Haus",       icon: "🏠",  power_entity: "sensor.house_power",    type: "sink",          layout_row: 1 },
        { id: "ev",      label: "E-Auto",     icon: "🚗",  power_entity: "sensor.wallbox_power",  type: "sink" },
        { id: "wp",      label: "Wärmepumpe", icon: "♨️",  power_entity: "sensor.heatpump_power", type: "sink" },
        { id: "netz",    label: "Netz",       icon: "⚡",  power_entity: "sensor.grid_power",     type: "bidirectional", invert_color: true },
      ],
      links: [
        { from: "pv",      to: "battery", positive_direction: "from_to" },
        { from: "pv",      to: "haus",    positive_direction: "from_to" },
        { from: "battery", to: "haus",    positive_direction: "to_from" },
        { from: "haus",    to: "wp",      positive_direction: "from_to" },
        { from: "haus",    to: "ev",      positive_direction: "from_to" },
        { from: "haus",    to: "netz",    positive_direction: "from_to" },
      ],
    };
  }

  // Groups nodes into rows by layout_row. Side nodes (layout_side) are skipped — they render
  // inline next to their source node, not as standalone rows.
  private _buildRows(nodes: NodeConfig[]): NodeConfig[][] {
    const map = new Map<number, NodeConfig[]>();
    let maxExplicit = -1;
    for (const n of nodes) {
      if (n.layout_row !== undefined) maxExplicit = Math.max(maxExplicit, n.layout_row);
    }
    let autoKey = maxExplicit + 1;
    for (const n of nodes) {
      if (n.layout_side || n.layout_bypass || n.layout_interstitial) continue;
      const key = n.layout_row ?? autoKey++;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(n);
    }
    return [...map.entries()].sort(([a], [b]) => a - b).map(([, ns]) => ns);
  }

  private _resolveLinks(): ResolvedLink[] {
    if (!this._config || !this.hass) return [];
    const { links, nodes, idle_threshold = 5 } = this._config;
    const nodeMap = new Map(nodes.map((n) => [n.id, n]));

    return links.map((link) => {
      const entityId = link.power_entity ?? nodeMap.get(link.from)?.power_entity ?? "";
      const raw = parseFloat(this.hass!.states[entityId]?.state ?? "0");
      const watts = isNaN(raw) ? 0 : raw;
      const positive = link.positive_direction ?? "from_to";
      const effectiveWatts = positive === "from_to" ? watts : -watts;

      let direction: ResolvedLink["direction"] = "idle";
      if (Math.abs(effectiveWatts) > idle_threshold) {
        direction = effectiveWatts >= 0 ? "forward" : "reverse";
      }
      if (link.one_way && direction === "reverse") direction = "idle";

      return { from: link.from, to: link.to, watts: effectiveWatts, direction };
    });
  }

  private _getNodeWatts(nodeId: string): number | null {
    if (!this._config || !this.hass) return null;
    const node = this._config.nodes.find((n) => n.id === nodeId);
    if (!node) return null;
    const raw = this.hass.states[node.power_entity]?.state;
    if (raw === undefined || raw === "unavailable" || raw === "unknown") return null;
    const v = parseFloat(raw);
    return isNaN(v) ? null : v;
  }

  private _getNodeSoc(node: NodeConfig): number | null {
    if (!node.soc_entity || !this.hass) return null;
    const raw = this.hass.states[node.soc_entity]?.state;
    if (!raw || raw === "unavailable" || raw === "unknown") return null;
    const v = parseFloat(raw);
    return isNaN(v) ? null : Math.min(100, Math.max(0, v));
  }

  private _resolvedNodeColor(node: NodeConfig, watts: number | null, soc: number | null): string {
    if (node.color) return node.color;
    if (soc !== null && soc >= 100 && watts !== null && watts > 0) return "#00bcd4";
    return nodeColor(node, watts ?? 0);
  }

  private _renderNodeBox(
    node: NodeConfig,
    watts: number | null,
    soc: number | null,
    decimals: number,
    unit: "W" | "kW" | "auto",
    idleThreshold: number,
    compact = false
  ) {
    const color = watts !== null ? this._resolvedNodeColor(node, watts, soc) : "var(--fcc-idle)";
    const icon = node.icon ?? guessIcon(node.id);
    const isActive = watts !== null && Math.abs(watts) > idleThreshold;
    return html`
      <div class="node-box ${isActive ? "active" : ""} ${compact ? "node-box--compact" : ""}"
           style=${styleMap({ "--node-color": color })}>
        <div class="node-icon">${icon}</div>
        <div class="node-info">
          <div class="node-label">${node.label}</div>
          <div class="node-power ${watts === null ? "unavailable" : ""}">
            ${watts === null ? "–" : formatWatts(watts, decimals, unit)}
          </div>
          ${node.soc_entity ? html`
            <div class="soc-bar-wrap">
              <div class="soc-bar" style=${styleMap({ width: `${soc ?? 0}%` })}></div>
            </div>
            <div class="soc-label">${soc !== null ? soc.toFixed(0) + " %" : "– %"}</div>
            ${soc !== null && node.soc_min !== undefined && soc <= node.soc_min ? html`
              <div class="soc-min-label">Min. erreicht</div>
            ` : nothing}
          ` : nothing}
        </div>
      </div>
    `;
  }

  private _renderNodeWithSide(
    node: NodeConfig,
    watts: number | null,
    soc: number | null,
    sideLinks: ResolvedLink[],
    decimals: number,
    unit: "W" | "kW" | "auto",
    idleThreshold: number,
    animSpeed: number
  ) {
    return html`
      <div class="node-with-side">
        <div class="main-col">
          ${this._renderNodeBox(node, watts, soc, decimals, unit, idleThreshold)}
        </div>
        ${sideLinks.map(rl => {
          const sideNode = this._config!.nodes.find(n => n.id === rl.to)!;
          const sideWatts = this._getNodeWatts(rl.to);
          const sideSoc = this._getNodeSoc(sideNode);
          const color = linkColor(rl.direction);
          const isFlowing = rl.direction !== "idle";
          const arrowChar = rl.direction === "reverse" ? "◀" : "▶";
          return html`
            <div class="side-connector" style=${styleMap({ "--link-color": color, "--anim-speed": `${animSpeed}ms` })}>
              <div class="side-conn-line ${isFlowing ? "flowing" : ""}"></div>
              <div class="side-conn-content">
                <span class="side-conn-arrow">${arrowChar}</span>
                <span class="side-conn-label">${isFlowing ? formatWatts(Math.abs(rl.watts), decimals, unit) : ""}</span>
              </div>
            </div>
            <div class="side-col">
              ${this._renderNodeBox(sideNode, sideWatts, sideSoc, decimals, unit, idleThreshold, true)}
            </div>
          `;
        })}
      </div>
    `;
  }

  private _renderHorizLink(
    rl: ResolvedLink,
    animSpeed: number,
    decimals: number,
    unit: "W" | "kW" | "auto"
  ) {
    const color = linkColor(rl.direction);
    const isFlowing = rl.direction !== "idle";
    const arrowChar = rl.direction === "reverse" ? "◀" : "▶";

    return html`
      <div class="horiz-link" style=${styleMap({ "--link-color": color, "--anim-speed": `${animSpeed}ms` })}>
        <div class="horiz-link-line ${isFlowing ? "flowing" : ""}"></div>
        <div class="horiz-link-content">
          <span class="horiz-link-arrow">${arrowChar}</span>
          <span class="horiz-link-label">${isFlowing ? formatWatts(Math.abs(rl.watts), decimals, unit) : ""}</span>
        </div>
      </div>
    `;
  }

  private _renderNodeRow(
    rowNodes: NodeConfig[],
    horizLinks: Map<string, ResolvedLink>,
    animSpeed: number,
    decimals: number,
    unit: "W" | "kW" | "auto",
    idleThreshold: number
  ) {
    return html`
      <div class="node-row">
        ${rowNodes.map((node, i) => {
          const watts = this._getNodeWatts(node.id);
          const soc = this._getNodeSoc(node);
          const horizLink = horizLinks.get(node.id);

          return html`
            <div class="node-col">
              ${this._renderNodeBox(node, watts, soc, decimals, unit, idleThreshold)}
            </div>
            ${horizLink && i < rowNodes.length - 1
              ? this._renderHorizLink(horizLink, animSpeed, decimals, unit)
              : nothing}
          `;
        })}
      </div>
    `;
  }

  // Fan-out zone: one source fans out to multiple nodes in the same target row.
  // Columns are aligned with TARGET row node positions (not source positions).
  private _renderFanOutZone(
    targetRow: NodeConfig[],
    outLinks: ResolvedLink[],
    animSpeed: number,
    decimals: number,
    unit: "W" | "kW" | "auto"
  ) {
    const cols = targetRow.map(n => outLinks.find(rl => rl.to === n.id) ?? null);
    return html`
      <div class="inter-row-zone">
        ${cols.map(rl => {
          if (!rl) return html`<div class="inter-row-col"></div>`;
          const color = linkColor(rl.direction);
          const isFlowing = rl.direction !== "idle";
          return html`
            <div class="inter-row-col" style=${styleMap({ "--link-color": color, "--anim-speed": `${animSpeed}ms` })}>
              <div class="inter-row-line ${isFlowing ? "flowing" : ""} ${rl.direction === "reverse" ? "flow-up" : ""}"></div>
              <div class="inter-row-label">
                ${isFlowing ? formatWatts(Math.abs(rl.watts), decimals, unit) : ""}
              </div>
              <div class="inter-row-arrow">${rl.direction === "reverse" ? "▲" : "▼"}</div>
            </div>
          `;
        })}
      </div>
    `;
  }

  private _renderInterRowZone(
    rowNodes: NodeConfig[],
    outLinks: ResolvedLink[],
    animSpeed: number,
    decimals: number,
    unit: "W" | "kW" | "auto",
    hasSideSpacer = false
  ) {
    // One column per node in the row; each column shows the outgoing vertical link from that node.
    const cols = rowNodes.map(n => outLinks.find(rl => rl.from === n.id) ?? null);

    return html`
      <div class="inter-row-zone">
        ${cols.map(rl => {
          if (!rl) return html`<div class="inter-row-col"></div>`;
          const color = linkColor(rl.direction);
          const isFlowing = rl.direction !== "idle";
          return html`
            <div class="inter-row-col" style=${styleMap({ "--link-color": color, "--anim-speed": `${animSpeed}ms` })}>
              <div class="inter-row-line ${isFlowing ? "flowing" : ""} ${rl.direction === "reverse" ? "flow-up" : ""}"></div>
              <div class="inter-row-label">
                ${isFlowing ? formatWatts(Math.abs(rl.watts), decimals, unit) : ""}
              </div>
              <div class="inter-row-arrow">${rl.direction === "reverse" ? "▲" : "▼"}</div>
            </div>
          `;
        })}
        ${hasSideSpacer ? html`<div class="inter-row-side-spacer"></div>` : nothing}
      </div>
    `;
  }

  private _renderSingleLink(
    rl: ResolvedLink,
    animSpeed: number,
    decimals: number,
    unit: "W" | "kW" | "auto"
  ) {
    const color = linkColor(rl.direction);
    const isFlowing = rl.direction !== "idle";
    const arrowChar = rl.direction === "reverse" ? "▲" : "▼";
    const arrowPos = rl.direction === "reverse" ? "tip-top" : "tip-bottom";
    const flowDir = rl.direction === "reverse" ? "top" : "bottom";

    return html`
      <div
        class="link"
        style=${styleMap({
          "--link-color": color,
          "--anim-speed": `${animSpeed}ms`,
          "--flow-dir": flowDir,
        })}
      >
        <div class="link-line ${isFlowing ? "flowing" : ""} ${rl.direction === "reverse" ? "flow-up" : ""}"></div>
        <div class="link-label">
          ${isFlowing ? formatWatts(Math.abs(rl.watts), decimals, unit) : ""}
        </div>
        <div class="link-arrow ${arrowPos}">${arrowChar}</div>
      </div>
    `;
  }

  private _renderBypassZone(
    mainLink: ResolvedLink,
    bypassLinks: ResolvedLink[],
    animSpeed: number,
    decimals: number,
    unit: "W" | "kW" | "auto",
    idleThreshold: number
  ) {
    const mainColor = linkColor(mainLink.direction);
    const isMainFlowing = mainLink.direction !== "idle";
    const flowDir = mainLink.direction === "reverse" ? "top" : "bottom";
    const arrowChar = mainLink.direction === "reverse" ? "▲" : "▼";
    const arrowPos = mainLink.direction === "reverse" ? "tip-top" : "tip-bottom";

    return html`
      <div class="bypass-zone">
        <div class="bypass-main"
             style=${styleMap({ "--link-color": mainColor, "--anim-speed": `${animSpeed}ms`, "--flow-dir": flowDir })}>
          <div class="bypass-main-line ${isMainFlowing ? "flowing" : ""} ${mainLink.direction === "reverse" ? "flow-up" : ""}"></div>
          <div class="bypass-main-label">
            ${isMainFlowing ? formatWatts(Math.abs(mainLink.watts), decimals, unit) : ""}
          </div>
          <div class="bypass-main-arrow ${arrowPos}">${arrowChar}</div>
        </div>
        ${bypassLinks.map(bl => {
          const bypassNode = this._config!.nodes.find(n => n.id === bl.to)!;
          const bypassWatts = this._getNodeWatts(bl.to);
          const bypassSoc = this._getNodeSoc(bypassNode);
          const connColor = linkColor(bl.direction);
          const isFlowing = bl.direction !== "idle";
          const connArrow = bl.direction === "reverse" ? "◀" : "▶";
          return html`
            <div class="bypass-connector"
                 style=${styleMap({ "--bypass-link-color": connColor, "--anim-speed": `${animSpeed}ms` })}>
              <div class="bypass-conn-line ${isFlowing ? "flowing" : ""}"></div>
              <div class="bypass-conn-content">
                <span class="bypass-conn-arrow">${connArrow}</span>
                <span class="bypass-conn-label">
                  ${isFlowing ? formatWatts(Math.abs(bl.watts), decimals, unit) : ""}
                </span>
              </div>
            </div>
            <div class="bypass-side">
              ${this._renderNodeBox(bypassNode, bypassWatts, bypassSoc, decimals, unit, idleThreshold, true)}
            </div>
          `;
        })}
      </div>
    `;
  }

  private _renderInterstitialZone(
    mainLink: ResolvedLink,
    interstitialLinks: ResolvedLink[],
    animSpeed: number,
    decimals: number,
    unit: "W" | "kW" | "auto",
    idleThreshold: number
  ) {
    const mainColor = linkColor(mainLink.direction);
    const isMainFlowing = mainLink.direction !== "idle";
    const flowDir = mainLink.direction === "reverse" ? "top" : "bottom";
    const mainArrow = mainLink.direction === "reverse" ? "▲" : "▼";
    const arrowPos = mainLink.direction === "reverse" ? "tip-top" : "tip-bottom";

    const interstitialWattsSum = interstitialLinks
      .filter(il => il.direction !== "idle")
      .reduce((sum, il) => sum + Math.abs(il.watts), 0);
    const mainDisplayWatts = Math.max(0, Math.abs(mainLink.watts) - interstitialWattsSum);

    return html`
      <div class="interstitial-zone">
        <div class="interstitial-main"
             style=${styleMap({ "--link-color": mainColor, "--anim-speed": `${animSpeed}ms`, "--flow-dir": flowDir })}>
          <div class="interstitial-main-line ${isMainFlowing ? "flowing" : ""} ${mainLink.direction === "reverse" ? "flow-up" : ""}"></div>
          <div class="interstitial-main-label">
            ${isMainFlowing && mainDisplayWatts > idleThreshold ? formatWatts(mainDisplayWatts, decimals, unit) : ""}
          </div>
          <div class="interstitial-main-arrow ${arrowPos}">${mainArrow}</div>
        </div>
        ${interstitialLinks.map(il => {
          const iNode = this._config!.nodes.find(n => n.id === il.to)!;
          const iWatts = this._getNodeWatts(il.to);
          const iSoc = this._getNodeSoc(iNode);
          const isFlowing = il.direction !== "idle";
          const isSink = (iNode.type ?? "sink") === "sink";
          // When the main link is idle but the branch flows, power comes from
          // below (grid import) → treat as reverse so colour/arrow are correct.
          const effectiveDir = isFlowing
            ? (mainLink.direction === "forward" ? "forward" : "reverse")
            : "idle";
          const iColor = linkColor(effectiveDir);
          const iFlowDir = effectiveDir === "reverse" ? "top" : "bottom";
          const iArrow = effectiveDir === "reverse" ? "▲" : "▼";
          // Both arrows always visible. Only the entry arrow is colored; the other stays idle/gray.
          // PV/forward: top arrow colored + label, bottom arrow idle.
          // Grid/reverse: bottom arrow colored + label, top arrow idle.
          const topActive   = effectiveDir !== "reverse";
          const bottomActive = effectiveDir === "reverse";
          const topColor    = topActive    ? iColor : linkColor("idle");
          const botColor    = bottomActive ? iColor : linkColor("idle");
          const topFlowing  = isFlowing && topActive;
          const botFlowing  = isFlowing && bottomActive;
          // For sinks the structural direction is fixed: top connector always flows ▼ (from above),
          // bottom connector always flows ▲ (from below). Non-sinks follow effectiveDir like before.
          const topArrowChar = isSink ? "▼" : iArrow;
          const botArrowChar = isSink ? "▲" : iArrow;
          const topFlowDir   = isSink ? "bottom" : iFlowDir;
          const botFlowDir   = isSink ? "top"    : iFlowDir;
          return html`
            <div class="interstitial-branch">
              <div class="interstitial-branch-arrow"
                   style=${styleMap({ "--link-color": topColor, "--anim-speed": `${animSpeed}ms`, "--flow-dir": topFlowDir })}>
                <div class="interstitial-branch-line ${topFlowing ? "flowing" : ""}"></div>
                <div class="interstitial-branch-label">
                  ${topFlowing ? formatWatts(Math.abs(il.watts), decimals, unit) : ""}
                </div>
                <div class="interstitial-branch-arrowhead">${topArrowChar}</div>
              </div>
              <div class="interstitial-branch-node">
                ${this._renderNodeBox(iNode, iWatts, iSoc, decimals, unit, idleThreshold, true)}
              </div>
              <div class="interstitial-branch-arrow"
                   style=${styleMap({ "--link-color": botColor, "--anim-speed": `${animSpeed}ms`, "--flow-dir": botFlowDir })}>
                <div class="interstitial-branch-line ${botFlowing ? "flowing" : ""} ${isSink ? "flow-up" : effectiveDir === "reverse" ? "flow-up" : ""}"></div>
                <div class="interstitial-branch-label">
                  ${botFlowing ? formatWatts(Math.abs(il.watts), decimals, unit) : ""}
                </div>
                <div class="interstitial-branch-arrowhead bottom">${botArrowChar}</div>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  private _renderSplitLinks(
    links: ResolvedLink[],
    nodeMap: Map<string, NodeConfig>,
    animSpeed: number,
    decimals: number,
    unit: "W" | "kW" | "auto"
  ) {
    return html`
      <div
        class="split-row"
        style=${styleMap({ "--branch-count": String(links.length) })}
      >
        ${links.map((rl) => {
          const color = linkColor(rl.direction);
          const isFlowing = rl.direction !== "idle";
          const targetNode = nodeMap.get(rl.to);
          const targetIcon = targetNode?.icon ?? guessIcon(rl.to);
          const targetLabel = targetNode?.label ?? rl.to;

          return html`
            <div class="split-branch" style=${styleMap({ "--link-color": color, "--anim-speed": `${animSpeed}ms` })}>
              <div class="split-branch-line ${isFlowing ? "flowing" : ""} ${rl.direction === "reverse" ? "flow-up" : ""}"></div>
              <div class="split-branch-arrow">${rl.direction === "reverse" ? "▲" : "▼"}</div>
              <div class="split-branch-label">
                ${targetIcon} ${isFlowing ? formatWatts(Math.abs(rl.watts), decimals, unit) : targetLabel}
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  override render() {
    if (!this._config) return nothing;
    const { nodes, title, animation_speed = 1200, decimals = 1, unit = "auto" } = this._config;
    const resolvedLinks = this._resolveLinks();
    const nodeMap = new Map(nodes.map((n) => [n.id, n]));
    const idleThreshold = this._config.idle_threshold ?? 5;

    const rows = this._buildRows(nodes);

    // nodeId → row array index
    const nodeRowIdx = new Map<string, number>();
    for (let i = 0; i < rows.length; i++) {
      for (const n of rows[i]) nodeRowIdx.set(n.id, i);
    }

    // Classify links: horizontal (same row) vs vertical (different rows)
    // Side links (target has layout_side) and bypass links (target has layout_bypass) are separated.
    const horizLinks = new Map<string, ResolvedLink>();
    const vertLinks: ResolvedLink[] = [];
    const sideLinks: ResolvedLink[] = [];
    const bypassLinks: ResolvedLink[] = [];
    for (const rl of resolvedLinks) {
      const fr = nodeRowIdx.get(rl.from) ?? -1;
      const tr = nodeRowIdx.get(rl.to) ?? -1;
      if (nodeMap.get(rl.to)?.layout_interstitial) {
        bypassLinks.push(rl); // reuse bypassLinks array — interstitial links render via _renderBypassZone replacement
      } else if (nodeMap.get(rl.to)?.layout_bypass) {
        bypassLinks.push(rl);
      } else if (nodeMap.get(rl.to)?.layout_side) {
        sideLinks.push(rl);
      } else if (fr >= 0 && fr === tr) {
        horizLinks.set(rl.from, rl);
      } else {
        vertLinks.push(rl);
      }
    }

    // Vertical links grouped by source row index (main links only)
    const vertByRow = new Map<number, ResolvedLink[]>();
    for (const rl of vertLinks) {
      const fr = nodeRowIdx.get(rl.from) ?? -1;
      if (fr < 0) continue;
      if (!vertByRow.has(fr)) vertByRow.set(fr, []);
      vertByRow.get(fr)!.push(rl);
    }

    // Main vertical links by source node
    const linksBySource = new Map<string, ResolvedLink[]>();
    for (const rl of vertLinks) {
      if (!linksBySource.has(rl.from)) linksBySource.set(rl.from, []);
      linksBySource.get(rl.from)!.push(rl);
    }

    // Side links by source node
    const sidesBySource = new Map<string, ResolvedLink[]>();
    for (const rl of sideLinks) {
      if (!sidesBySource.has(rl.from)) sidesBySource.set(rl.from, []);
      sidesBySource.get(rl.from)!.push(rl);
    }

    // Bypass links by source node
    const bypasesBySource = new Map<string, ResolvedLink[]>();
    for (const rl of bypassLinks) {
      if (!bypasesBySource.has(rl.from)) bypasesBySource.set(rl.from, []);
      bypasesBySource.get(rl.from)!.push(rl);
    }

    // Fan-out: a single source with 2+ main links ALL targeting the same multi-node row.
    const splitTargets = new Set<string>();
    for (const [, rls] of linksBySource) {
      if (rls.length > 1) {
        const targetRowSet = new Set(rls.map(rl => nodeRowIdx.get(rl.to) ?? -1).filter(r => r >= 0));
        const tRowIdx = [...targetRowSet][0];
        const isFanOut = targetRowSet.size === 1 && (rows[tRowIdx]?.length ?? 0) > 1;
        if (!isFanOut) {
          for (const rl of rls) splitTargets.add(rl.to);
        }
      }
    }

    return html`
      <ha-card>
        ${title ? html`<div class="card-header">${title}</div>` : nothing}
        <div class="cascade">
          ${rows.map((rowNodes, rowIdx) => {
            const outLinks = vertByRow.get(rowIdx) ?? [];

            if (rowNodes.length > 1) {
              // Add spacer when all outgoing links target the same single node that has a side branch,
              // so the arrows stay aligned over that node's main-col (not the side area).
              let sideSpacerForInterRow = false;
              if (outLinks.length > 0) {
                const uniqueTargets = new Set(outLinks.map(rl => rl.to));
                if (uniqueTargets.size === 1) {
                  const targetId = [...uniqueTargets][0];
                  sideSpacerForInterRow = (sidesBySource.get(targetId)?.length ?? 0) > 0;
                }
              }
              return html`
                ${this._renderNodeRow(rowNodes, horizLinks, animation_speed, decimals, unit, idleThreshold)}
                ${outLinks.length > 0
                  ? this._renderInterRowZone(rowNodes, outLinks, animation_speed, decimals, unit, sideSpacerForInterRow)
                  : nothing}
              `;
            }

            // Single-node row
            const node = rowNodes[0];
            const watts = this._getNodeWatts(node.id);
            const soc = this._getNodeSoc(node);
            const nodeSideLinks = sidesBySource.get(node.id) ?? [];
            const nodeOutLinks = linksBySource.get(node.id) ?? [];

            // Fan-out: all main outgoing links target the same multi-node row
            const outTargetRowSet = new Set(
              nodeOutLinks.map(rl => nodeRowIdx.get(rl.to) ?? -1).filter(r => r >= 0)
            );
            const outTargetRowIdx = outTargetRowSet.size === 1 ? [...outTargetRowSet][0] : -1;
            const isFanOut = nodeOutLinks.length > 1
              && outTargetRowIdx > rowIdx
              && (rows[outTargetRowIdx]?.length ?? 0) > 1;

            const isSplit = nodeOutLinks.length > 1 && !isFanOut;
            const singleLink = !isSplit && !isFanOut && nodeOutLinks.length === 1 ? nodeOutLinks[0] : null;
            const hasSide = nodeSideLinks.length > 0;
            const nodeBypassLinks = bypasesBySource.get(node.id) ?? [];
            const hasBypass = nodeBypassLinks.length > 0;

            return html`
              ${hasSide
                ? this._renderNodeWithSide(node, watts, soc, nodeSideLinks, decimals, unit, idleThreshold, animation_speed)
                : html`<div class="node">${this._renderNodeBox(node, watts, soc, decimals, unit, idleThreshold)}</div>`}
              ${isFanOut
                ? this._renderFanOutZone(rows[outTargetRowIdx], nodeOutLinks, animation_speed, decimals, unit)
                : isSplit
                  ? this._renderSplitLinks(nodeOutLinks, nodeMap, animation_speed, decimals, unit)
                  : singleLink && !splitTargets.has(node.id)
                    ? hasBypass
                      ? nodeBypassLinks.some(bl => nodeMap.get(bl.to)?.layout_interstitial)
                        ? this._renderInterstitialZone(singleLink, nodeBypassLinks, animation_speed, decimals, unit, idleThreshold)
                        : this._renderBypassZone(singleLink, nodeBypassLinks, animation_speed, decimals, unit, idleThreshold)
                      : this._renderSingleLink(singleLink, animation_speed, decimals, unit)
                    : nothing}
            `;
          })}
        </div>
      </ha-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "flow-cascade-card": FlowCascadeCard;
  }
}
