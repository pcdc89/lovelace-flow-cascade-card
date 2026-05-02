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
        { id: "pv",      label: "PV",        icon: "☀️",  power_entity: "sensor.pv_power",       type: "source" },
        { id: "haus",    label: "Haus",       icon: "🏠",  power_entity: "sensor.house_power",    type: "sink" },
        { id: "battery", label: "Batterie",   icon: "🔋",  power_entity: "sensor.battery_power",  type: "bidirectional", soc_entity: "sensor.battery_soc" },
        { id: "ev",      label: "E-Auto",     icon: "🚗",  power_entity: "sensor.wallbox_power",  type: "sink" },
        { id: "wp",      label: "Wärmepumpe", icon: "♨️",  power_entity: "sensor.heatpump_power", type: "sink" },
        { id: "netz",    label: "Netz",       icon: "⚡",  power_entity: "sensor.grid_power",     type: "bidirectional" },
      ],
      links: [
        { from: "pv",      to: "haus",    positive_direction: "from_to" },
        { from: "pv",      to: "battery", positive_direction: "from_to" },
        { from: "battery", to: "ev",      positive_direction: "from_to" },
        { from: "ev",      to: "wp",      positive_direction: "from_to" },
        { from: "wp",      to: "netz",    positive_direction: "from_to" },
      ],
    };
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
        <div class="link-line ${isFlowing ? "flowing" : ""}"></div>
        <div class="link-label">
          ${isFlowing ? formatWatts(Math.abs(rl.watts), decimals, unit) : ""}
        </div>
        <div class="link-arrow ${arrowPos}">${arrowChar}</div>
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
              <div class="split-branch-line ${isFlowing ? "flowing" : ""}"></div>
              <div class="split-branch-arrow">▼</div>
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

    // Pre-group links by source node (to detect splits)
    const linksBySource = new Map<string, ResolvedLink[]>();
    for (const rl of resolvedLinks) {
      if (!linksBySource.has(rl.from)) linksBySource.set(rl.from, []);
      linksBySource.get(rl.from)!.push(rl);
    }

    // Track which nodes have already been "consumed" as split targets
    // so we skip rendering their inline link segment
    const splitTargets = new Set<string>();
    for (const [, rls] of linksBySource) {
      if (rls.length > 1) {
        for (const rl of rls) splitTargets.add(rl.to);
      }
    }

    const idleThreshold = this._config.idle_threshold ?? 5;

    return html`
      <ha-card>
        ${title ? html`<div class="card-header">${title}</div>` : nothing}
        <div class="cascade">
          ${nodes.map((node) => {
            const watts = this._getNodeWatts(node.id);
            const color = watts !== null ? nodeColor(node, watts) : "var(--fcc-idle)";
            const icon = node.icon ?? guessIcon(node.id);
            const isActive = watts !== null && Math.abs(watts) > idleThreshold;
            const soc = this._getNodeSoc(node);

            const outgoingLinks = linksBySource.get(node.id) ?? [];
            const isSplit = outgoingLinks.length > 1;

            // For single-link nodes, find the one outgoing link
            // But skip if this node is a split target that already got a header
            const singleLink = !isSplit && outgoingLinks.length === 1 ? outgoingLinks[0] : null;

            return html`
              <div class="node">
                <div
                  class="node-box ${isActive ? "active" : ""}"
                  style=${styleMap({ "--node-color": color })}
                >
                  <div class="node-icon">${icon}</div>
                  <div class="node-info">
                    <div class="node-label">${node.label}</div>
                    <div class="node-power ${watts === null ? "unavailable" : ""}">
                      ${watts === null ? "–" : formatWatts(watts, decimals, unit)}
                    </div>
                    ${soc !== null ? html`
                      <div class="soc-bar-wrap">
                        <div class="soc-bar" style=${styleMap({ width: `${soc}%` })}></div>
                      </div>
                      <div class="soc-label">${soc.toFixed(0)} %</div>
                    ` : nothing}
                  </div>
                </div>
              </div>

              ${isSplit
                ? this._renderSplitLinks(outgoingLinks, nodeMap, animation_speed, decimals, unit)
                : singleLink && !splitTargets.has(node.id)
                  ? this._renderSingleLink(singleLink, animation_speed, decimals, unit)
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
