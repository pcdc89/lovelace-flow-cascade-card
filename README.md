# Flow Cascade Card

A Home Assistant Lovelace card for **linear top-to-bottom cascade energy flow visualization**.

```
☀️  PV          → 3.2 kW
        ↓ 1.8 kW
🔋  Batterie     charging
        ↓ 1.4 kW
🏠  Haus         1.2 kW
        ↓
🚗  E-Auto       0 W
        ↓ 0.2 kW
♨️  Wärmepumpe   0.2 kW
        ↓
⚡  Netz         ← 1.0 kW Einspeisung
```

## Features

- Vertical cascade layout (PV → Batterie → Haus → E-Auto → WP → Netz)
- Animated directional arrows with watt values
- Bidirectional nodes (battery charge/discharge, grid import/export)
- Configurable via YAML (nodes + links)
- HACS compatible

## Installation

### HACS (recommended)

1. Add as custom repository: `pcdc89/lovelace-flow-cascade-card`
2. Install via HACS → Frontend
3. Add resource (if not auto-added): `/hacsfiles/lovelace-flow-cascade-card/flow-cascade-card.js`

### Manual

Copy `dist/flow-cascade-card.js` to `/config/www/` and add as resource:

```yaml
resources:
  - url: /local/flow-cascade-card.js
    type: module
```

## Configuration

```yaml
type: custom:flow-cascade-card
title: Energiefluss
animation_speed: 1200   # ms per animation cycle
idle_threshold: 5       # W below which link is shown as idle
decimals: 1
unit: auto              # W | kW | auto

nodes:
  - id: pv
    label: PV
    icon: ☀️
    power_entity: sensor.pv_power
    type: source          # source | sink | bidirectional

  - id: battery
    label: Batterie
    icon: 🔋
    power_entity: sensor.battery_power
    type: bidirectional

  - id: haus
    label: Haus
    icon: 🏠
    power_entity: sensor.house_power
    type: sink

  - id: ev
    label: E-Auto
    icon: 🚗
    power_entity: sensor.wallbox_power
    type: sink

  - id: wp
    label: Wärmepumpe
    icon: ♨️
    power_entity: sensor.heatpump_power
    type: sink

  - id: netz
    label: Netz
    icon: ⚡
    power_entity: sensor.grid_power
    type: bidirectional   # positive = Bezug, negative = Einspeisung

links:
  - from: pv
    to: battery
    positive_direction: from_to

  - from: pv
    to: haus
    positive_direction: from_to

  - from: battery
    to: ev
    positive_direction: from_to

  - from: ev
    to: wp
    positive_direction: from_to

  - from: wp
    to: netz
    positive_direction: from_to   # positive = Einspeisung
```

## Roadmap

- [ ] Split-node visualization (PV → Batterie + Haus gleichzeitig)
- [ ] Energy (kWh) display per node
- [ ] Color theming per node
- [ ] Visual editor (Lovelace UI)
- [ ] Battery SOC display
