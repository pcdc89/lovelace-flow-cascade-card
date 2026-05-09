import { css } from "lit";

export const cardStyles = css`
  :host {
    --fcc-positive: var(--success-color, #4caf50);
    --fcc-negative: var(--error-color, #f44336);
    --fcc-idle: var(--disabled-color, #9e9e9e);
    --fcc-bg: var(--card-background-color, #fff);
    --fcc-text: var(--primary-text-color, #212121);
    --fcc-arrow-gap: 40px;
    --fcc-side-connector-w: 36px;
    --fcc-side-col-w: 82px;
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
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0;
    padding: 12px 18px 10px;
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
    font-size: 1.8em;
    line-height: 1.2;
    margin-bottom: 4px;
  }

  .node-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    width: 100%;
  }

  .node-label {
    font-size: 0.78em;
    opacity: 0.6;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .node-power {
    font-size: 1.2em;
    font-weight: 700;
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
    margin-top: 8px;
    height: 10px;
    border-radius: 5px;
    background: color-mix(in srgb, var(--node-color, var(--fcc-idle)) 18%, var(--fcc-bg) 82%);
    overflow: hidden;
    width: 100%;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.12);
  }

  .soc-bar {
    height: 100%;
    border-radius: 5px;
    background: var(--node-color, var(--fcc-positive));
    transition: width 0.6s ease;
  }

  .soc-label {
    font-size: 0.85em;
    font-weight: 600;
    color: var(--node-color, var(--fcc-positive));
    margin-top: 4px;
  }

  .soc-min-label {
    font-size: 0.75em;
    font-weight: 700;
    color: #ff9800;
    margin-top: 2px;
    letter-spacing: 0.03em;
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

  /* ── NODE WITH SIDE BRANCH ── */
  .node-with-side {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    max-width: 320px;
    gap: 0;
  }

  .main-col {
    flex: 1;
    min-width: 0;
  }

  .side-connector {
    flex: 0 0 var(--fcc-side-connector-w);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 2px 0;
  }

  .side-conn-line {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 3px;
    transform: translateY(-50%);
    background: var(--link-color, var(--fcc-idle));
    border-radius: 2px;
    overflow: hidden;
  }

  .side-conn-line::after {
    content: "";
    position: absolute;
    left: -14px;
    top: 0;
    width: 14px;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.85) 50%, transparent);
    animation: flow-horiz var(--anim-speed, 1.2s) linear infinite;
    opacity: 0;
    transition: opacity 0.4s;
  }

  .side-conn-line.flowing::after { opacity: 1; }

  .side-conn-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--fcc-bg);
    padding: 0 2px;
    gap: 1px;
  }

  .side-conn-arrow {
    font-size: 0.8em;
    color: var(--link-color, var(--fcc-idle));
    line-height: 1;
  }

  .side-conn-label {
    font-size: 0.62em;
    font-weight: 600;
    color: var(--link-color, var(--fcc-idle));
    white-space: nowrap;
    min-height: 0.8em;
  }

  .side-col {
    flex: 0 0 var(--fcc-side-col-w);
  }

  /* ── INTER-ROW SIDE SPACER (aligns arrows with main-col when next row has a side node) ── */
  .inter-row-side-spacer {
    flex: 0 0 calc(var(--fcc-side-connector-w) + var(--fcc-side-col-w));
  }

  /* ── BYPASS ZONE (compact node in vertical link zone) ── */
  .bypass-zone {
    width: 100%;
    max-width: 320px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    margin: 2px 0;
  }

  .bypass-main {
    flex: 1;
    min-width: 0;
    position: relative;
  }

  .bypass-main-line {
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

  .bypass-main-line::after {
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

  .bypass-main-line.flowing::after { opacity: 1; }

  .bypass-main-label {
    position: absolute;
    right: calc(50% + 6px);
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.72em;
    font-weight: 600;
    color: var(--link-color, var(--fcc-idle));
    white-space: nowrap;
    background: var(--fcc-bg);
    padding: 1px 3px;
    border-radius: 3px;
  }

  .bypass-main-arrow {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    font-size: 1em;
    color: var(--link-color, var(--fcc-idle));
    line-height: 1;
  }

  .bypass-connector {
    flex: 0 0 72px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 2px 0;
  }

  .bypass-conn-line {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 3px;
    transform: translateY(-50%);
    background: var(--bypass-link-color, var(--fcc-idle));
    border-radius: 2px;
    overflow: hidden;
  }

  .bypass-conn-line::after {
    content: "";
    position: absolute;
    left: -14px;
    top: 0;
    width: 14px;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.85) 50%, transparent);
    animation: flow-horiz var(--anim-speed, 1.2s) linear infinite;
    opacity: 0;
    transition: opacity 0.4s;
  }

  .bypass-conn-line.flowing::after { opacity: 1; }

  .bypass-conn-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--fcc-bg);
    padding: 0 2px;
    gap: 1px;
  }

  .bypass-conn-arrow {
    font-size: 1.1em;
    color: var(--bypass-link-color, var(--fcc-idle));
    line-height: 1;
  }

  .bypass-conn-label {
    font-size: 0.80em;
    font-weight: 700;
    color: var(--bypass-link-color, var(--fcc-idle));
    white-space: nowrap;
    min-height: 0.9em;
  }

  .bypass-side {
    flex: 0 0 96px;
  }

  /* ── INTERSTITIAL ZONE (half-width node between two vertical links) ── */
  .interstitial-zone {
    width: 100%;
    max-width: 320px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    margin: 2px 0;
  }

  .interstitial-main {
    flex: 1;
    min-width: 0;
    position: relative;
  }

  .interstitial-main-line {
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

  .interstitial-main-line::after {
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

  .interstitial-main-line.flowing::after { opacity: 1; }

  .interstitial-main-label {
    position: absolute;
    right: calc(50% + 6px);
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

  .interstitial-main-arrow {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1em;
    color: var(--link-color, var(--fcc-idle));
    line-height: 1;
  }

  .interstitial-main-arrow.tip-bottom { bottom: 0; }
  .interstitial-main-arrow.tip-top    { top: 0; }

  .interstitial-branch {
    flex: 0 0 50%;
    display: flex;
    flex-direction: column;
  }

  .interstitial-branch-arrow {
    height: var(--fcc-arrow-gap);
    flex-shrink: 0;
    position: relative;
  }

  .interstitial-branch-line {
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

  .interstitial-branch-line::after {
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

  .interstitial-branch-line.flowing::after { opacity: 1; }

  .interstitial-branch-label {
    position: absolute;
    left: calc(50% + 6px);
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

  .interstitial-branch-arrowhead {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    font-size: 1em;
    color: var(--link-color, var(--fcc-idle));
    line-height: 1;
  }

  .interstitial-branch-arrowhead.bottom {
    bottom: auto;
    top: 0;
  }

  .interstitial-branch-node {
    flex: 1;
    min-height: 0;
  }

  /* Compact node box for side nodes */
  .node-box--compact {
    padding: 8px 10px 6px;
  }

  .node-box--compact .node-icon { font-size: 1.4em; }
  .node-box--compact .node-label { font-size: 0.72em; }
  .node-box--compact .node-power { font-size: 1.0em; }

  /* ── NODE ROW (side-by-side nodes) ── */
  .node-row {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    width: 100%;
    max-width: 320px;
    gap: 0;
  }

  .node-col {
    flex: 1;
    min-width: 0;
  }

  .node-col .node-box {
    height: 100%;
  }

  /* ── HORIZONTAL LINK (within row) ── */
  .horiz-link {
    flex: 0 0 44px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 4px 0;
  }

  .horiz-link-line {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 3px;
    transform: translateY(-50%);
    background: var(--link-color, var(--fcc-idle));
    border-radius: 2px;
    overflow: hidden;
  }

  .horiz-link-line::after {
    content: "";
    position: absolute;
    left: -14px;
    top: 0;
    width: 14px;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.85) 50%, transparent);
    animation: flow-horiz var(--anim-speed, 1.2s) linear infinite;
    opacity: 0;
    transition: opacity 0.4s;
  }

  .horiz-link-line.flowing::after { opacity: 1; }

  @keyframes flow-horiz {
    0%   { left: -14px; }
    100% { left: calc(100% + 14px); }
  }

  .horiz-link-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--fcc-bg);
    padding: 0 2px;
    gap: 1px;
  }

  .horiz-link-arrow {
    font-size: 0.85em;
    color: var(--link-color, var(--fcc-idle));
    line-height: 1;
  }

  .horiz-link-label {
    font-size: 0.68em;
    font-weight: 600;
    color: var(--link-color, var(--fcc-idle));
    white-space: nowrap;
    min-height: 0.9em;
  }

  /* ── INTER-ROW ZONE (parallel descent from multi-node row) ── */
  .inter-row-zone {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 320px;
    height: var(--fcc-arrow-gap);
    margin: 2px 0;
  }

  .inter-row-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .inter-row-line {
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

  .inter-row-line::after {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 14px;
    background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.85) 50%, transparent);
    animation: flow-pulse var(--anim-speed, 1.2s) linear infinite;
    opacity: 0;
    transition: opacity 0.4s;
  }

  .inter-row-line.flowing::after { opacity: 1; }

  .inter-row-label {
    position: absolute;
    right: calc(50% + 6px);
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.72em;
    font-weight: 600;
    color: var(--link-color, var(--fcc-idle));
    white-space: nowrap;
    background: var(--fcc-bg);
    padding: 1px 3px;
    border-radius: 3px;
    min-width: 0;
  }

  .inter-row-arrow {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    font-size: 1em;
    color: var(--link-color, var(--fcc-idle));
    line-height: 1;
  }

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

  .link-line.flow-up::after,
  .bypass-main-line.flow-up::after,
  .interstitial-main-line.flow-up::after,
  .interstitial-branch-line.flow-up::after,
  .inter-row-line.flow-up::after,
  .split-branch-line.flow-up::after {
    animation-direction: reverse;
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
