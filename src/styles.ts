import { css } from "lit";

export const cardStyles = css`
  :host {
    --fcc-positive: var(--success-color, #4caf50);
    --fcc-negative: var(--error-color, #f44336);
    --fcc-idle: var(--disabled-color, #9e9e9e);
    --fcc-bg: var(--card-background-color, #fff);
    --fcc-text: var(--primary-text-color, #212121);
    --fcc-arrow-gap: 40px;
    display: block;
  }

  ha-card {
    padding: 16px;
    background: var(--fcc-bg);
    color: var(--fcc-text);
    font-family: var(--paper-font-body1_-_font-family, sans-serif);
  }

  .card-header {
    font-size: 1.1em;
    font-weight: 500;
    margin-bottom: 12px;
    color: var(--fcc-text);
  }

  .cascade {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
  }

  /* ── NODE ── */
  .node {
    width: 100%;
    max-width: 320px;
  }

  .node-box {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 18px;
    border-radius: 12px;
    border: 2px solid var(--divider-color, #e0e0e0);
    background: var(--fcc-bg);
    width: 100%;
    box-sizing: border-box;
    min-height: 56px;
    transition: border-color 0.4s, box-shadow 0.4s;
  }

  .node-box.active {
    border-color: var(--node-color, var(--fcc-positive));
    box-shadow: 0 0 8px 0 color-mix(in srgb, var(--node-color, var(--fcc-positive)) 30%, transparent);
  }

  .node-icon {
    font-size: 1.6em;
    width: 32px;
    text-align: center;
    flex-shrink: 0;
  }

  .node-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    min-width: 0;
  }

  .node-label {
    font-size: 0.82em;
    opacity: 0.65;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .node-power {
    font-size: 1.15em;
    font-weight: 600;
    color: var(--node-color, var(--fcc-positive));
    white-space: nowrap;
  }

  .node-power.unavailable {
    color: var(--fcc-idle);
    font-size: 0.9em;
    font-weight: 400;
  }

  /* SOC bar */
  .soc-bar-wrap {
    margin-top: 4px;
    height: 5px;
    border-radius: 3px;
    background: color-mix(in srgb, var(--node-color, var(--fcc-idle)) 20%, transparent);
    overflow: hidden;
  }

  .soc-bar {
    height: 100%;
    border-radius: 3px;
    background: var(--node-color, var(--fcc-positive));
    transition: width 0.6s ease;
  }

  .soc-label {
    font-size: 0.75em;
    opacity: 0.75;
    margin-top: 1px;
  }

  /* ── SINGLE LINK ── */
  .link {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 320px;
    position: relative;
    height: var(--fcc-arrow-gap);
    margin: 2px 0;
  }

  .link-line {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 3px;
    transform: translateX(-50%);
    background: var(--link-color, var(--fcc-idle));
    border-radius: 2px;
    overflow: hidden;
  }

  .link-line::after {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 14px;
    background: linear-gradient(
      to var(--flow-dir, bottom),
      transparent,
      rgba(255, 255, 255, 0.85) 50%,
      transparent
    );
    animation: flow-pulse var(--anim-speed, 1.2s) linear infinite;
    opacity: 0;
    transition: opacity 0.4s;
  }

  .link-line.flowing::after {
    opacity: 1;
  }

  @keyframes flow-pulse {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(700%); }
  }

  .link-label {
    position: absolute;
    right: calc(50% + 10px);
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.78em;
    font-weight: 600;
    color: var(--link-color, var(--fcc-idle));
    white-space: nowrap;
    background: var(--fcc-bg);
    padding: 1px 4px;
    border-radius: 4px;
  }

  .link-arrow {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1em;
    color: var(--link-color, var(--fcc-idle));
    line-height: 1;
    transition: color 0.4s;
  }

  .link-arrow.tip-bottom { bottom: 0; }
  .link-arrow.tip-top    { top: 0; }

  /* ── SPLIT ROW (2+ outgoing links) ── */
  .split-row {
    width: 100%;
    max-width: 320px;
    display: flex;
    align-items: stretch;
    position: relative;
    margin: 2px 0;
    min-height: var(--fcc-arrow-gap);
  }

  /* horizontal top bar connecting branches */
  .split-row::before {
    content: "";
    position: absolute;
    top: 0;
    left: calc(100% / var(--branch-count, 2) / 2);
    right: calc(100% / var(--branch-count, 2) / 2);
    height: 2px;
    background: var(--fcc-idle);
  }

  .split-branch {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding-top: 2px;
  }

  .split-branch-line {
    width: 3px;
    flex: 1;
    background: var(--link-color, var(--fcc-idle));
    border-radius: 2px;
    overflow: hidden;
    position: relative;
    min-height: 18px;
  }

  .split-branch-line::after {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 14px;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(255, 255, 255, 0.85) 50%,
      transparent
    );
    animation: flow-pulse var(--anim-speed, 1.2s) linear infinite;
    opacity: 0;
    transition: opacity 0.4s;
  }

  .split-branch-line.flowing::after {
    opacity: 1;
  }

  .split-branch-arrow {
    font-size: 0.85em;
    color: var(--link-color, var(--fcc-idle));
    line-height: 1;
    margin-bottom: 1px;
  }

  .split-branch-label {
    font-size: 0.72em;
    font-weight: 600;
    color: var(--link-color, var(--fcc-idle));
    text-align: center;
    white-space: nowrap;
    background: var(--fcc-bg);
    padding: 0 3px;
    border-radius: 3px;
  }
`;
