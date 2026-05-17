export interface NodeConfig {
    id: string;
    label: string;
    icon?: string;
    power_entity: string;
    energy_entity?: string;
    /** For battery: entity with state 0-100 */
    soc_entity?: string;
    /** SOC threshold (%) below which a "Min. erreicht" label is shown */
    soc_min?: number;
    color?: string;
    /** "source" | "sink" | "bidirectional" */
    type?: "source" | "sink" | "bidirectional";
    /** Invert green/red for bidirectional nodes where negative = good (e.g. Netz: negative = Einspeisung) */
    invert_color?: boolean;
    /** Place nodes with same layout_row side-by-side; links within the same row render horizontally */
    layout_row?: number;
    /** Render this node as a compact half-width box in the link-zone above it (bypass on the left, node on the right) */
    layout_bypass?: boolean;
    /** Render this node at half-width on the right, vertically between its source and the next main node */
    layout_interstitial?: boolean;
}
export interface LinkConfig {
    from: string;
    to: string;
    /** entity whose value drives flow direction & magnitude; falls back to from-node power_entity */
    power_entity?: string;
    /** positive value = flow from→to, negative = flow to→from */
    positive_direction?: "from_to" | "to_from";
    /** if true, reverse direction is shown as idle (link only flows one way) */
    one_way?: boolean;
}
export interface FlowCascadeCardConfig {
    type: string;
    title?: string;
    nodes: NodeConfig[];
    links: LinkConfig[];
    /** animation speed in ms, default 1200 */
    animation_speed?: number;
    /** watt threshold below which a link is considered idle */
    idle_threshold?: number;
    /** decimal places for power display, default 1 */
    decimals?: number;
    /** unit override, default "W" (auto-switches to kW above 1000) */
    unit?: "W" | "kW" | "auto";
}
export interface HomeAssistant {
    states: Record<string, HassEntity>;
    themes: Record<string, unknown>;
    language: string;
    locale: HassLocale;
}
export interface HassEntity {
    entity_id: string;
    state: string;
    attributes: Record<string, unknown>;
    last_changed: string;
    last_updated: string;
}
export interface HassLocale {
    language: string;
    number_format: string;
}
/** Resolved runtime data for one link */
export interface ResolvedLink {
    from: string;
    to: string;
    watts: number;
    direction: "forward" | "reverse" | "idle";
}
//# sourceMappingURL=types.d.ts.map