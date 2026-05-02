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
  if (type === "sink") return "var(--fcc-negative)";
  return watts >= 0 ? "var(--fcc-positive)" : "var(--fcc-negative)";
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
        { id: "battery", label: "Batterie",   icon: "🔋",  power_entity: "sensor.battery_power",  type: "bidirectional" },
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

  override render() {
    if (!this._config) return nothing;
    const { nodes, title, animation_speed = 1200, decimals = 1, unit = "auto" } = this._config;
    const resolvedLinks = this._resolveLinks();

    const linksByPair = new Map<string, ResolvedLink>();
    for (const rl of resolvedLinks) {
      linksByPair.set(`${rl.from}:${rl.to}`, rl);
    }

    return html`
      <ha-card>
        ${title ? html`<div class="card-header">${title}</div>` : nothing}
        <div class="cascade">
          ${nodes.map((node) => {
            const watts = this._getNodeWatts(node.id);
            const color = watts !== null ? nodeColor(node, watts) : "var(--fcc-idle)";
            const icon = node.icon ?? guessIcon(node.id);
            const isActive = watts !== null && Math.abs(watts) > (this._config!.idle_threshold ?? 5);

            const linksBelow = resolvedLinks.filter((rl) => rl.from === node.id);

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
                      ${watts === null
                        ? "–"
                        : formatWatts(watts, decimals, unit)}
                    </div>
                  </div>
                </div>
              </div>

              ${linksBelow.map((rl) => {
                const linkColor =
                  rl.direction === "forward"
                    ? "var(--fcc-positive)"
                    : rl.direction === "reverse"
                    ? "var(--fcc-negative)"
                    : "var(--fcc-idle)";
                const isFlowing = rl.direction !== "idle";
                const arrowChar = rl.direction === "reverse" ? "▲" : "▼";
                const arrowPos = rl.direction === "reverse" ? "tip-top" : "tip-bottom";
                const flowDir = rl.direction === "reverse" ? "top" : "bottom";

                return html`
                  <div
                    class="link"
                    style=${styleMap({
                      "--link-color": linkColor,
                      "--anim-speed": `${animation_speed}ms`,
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
              })}
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
