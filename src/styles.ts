import { css } from "lit";

export const cardStyles = css`
  :host {
    --fcc-primary: var(--primary-color, #03a9f4);
    --fcc-positive: var(--success-color, #4caf50);
    --fcc-negative: var(--error-color, #f44336);
    --fcc-idle: var(--disabled-color, #9e9e9e);
    --fcc-bg: var(--card-background-color, #fff);
    --fcc-text: var(--primary-text-color, #212121);
    --fcc-node-size: 80px;
    --fcc-arrow-gap: 36px;
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
    display: flex;
    flex-direction: column;
    align-items: center;
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
    transition: border-color 0.4s;
  }

  .node-box.active {
    border-color: var(--node-color, var(--fcc-primary));
    box-shadow: 0 0 8px 0 color-mix(in srgb, var(--node-color, var(--fcc-primary)) 30%, transparent);
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
  }

  .node-label {
    font-size: 0.85em;
    opacity: 0.7;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .node-power {
    font-size: 1.2em;
    font-weight: 600;
    color: var(--node-color, var(--fcc-primary));
  }

  .node-power.unavailable {
    color: var(--fcc-idle);
    font-size: 0.9em;
  }

  /* ── LINK (arrow segment) ── */
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
    height: 12px;
    background: linear-gradient(
      to var(--flow-dir, bottom),
      transparent,
      rgba(255, 255, 255, 0.8) 50%,
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
    100% { transform: translateY(600%); }
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
`;
