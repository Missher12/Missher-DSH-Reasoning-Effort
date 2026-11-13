/** Desktop-supplied slider geometry, using the host surface and settings colour. */
export const PIXEL_CSS = `
.re-effort.re-depth.has-readout {
  display: block;
  box-sizing: border-box;
  width: 216px;
  max-width: 100%;
  min-height: 92px;
  height: auto;
  margin: 0 auto;
  padding: 10px 8px 7px 6px;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: var(--dsw-alias-label-secondary);
}
.re-depth-header { display: flex; align-items: center; gap: 6px; height: 20px; font-size: 13px; line-height: 20px; }
.re-depth-label { flex: none; color: var(--dsw-alias-label-tertiary); }
.re-depth-value { min-width: 0; height: 20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 400; color: var(--re-accent); }
.re-depth-mapping { min-width: 0; margin-inline-start: auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 11px; color: var(--dsw-alias-label-secondary); }
.re-depth-speed { display: flex; justify-content: space-between; margin-top: 10px; font-size: 12px; line-height: 15px; color: var(--dsw-alias-label-tertiary); }
.re-depth-slider { position: relative; height: 20px; margin-top: 8px; border-radius: 7px; isolation: isolate; }
.re-depth-track { position: absolute; inset: 0; border-radius: inherit; background: linear-gradient(90deg, color-mix(in srgb, var(--re-accent) 30%, white), color-mix(in srgb, var(--re-accent) 85%, black)); }
.re-depth-canvas { position: absolute; inset: 0; width: 100%; height: 100%; border-radius: inherit; pointer-events: none; }
.re-depth-canvas[hidden] { display: none; }
.re-depth-thumb { position: absolute; z-index: 2; top: 0; left: var(--re-progress); width: 17px; height: 20px; transform: translateX(calc(-1 * var(--re-progress))); border: .5px solid var(--dsw-alias-border-l2); border-radius: 6px; background: var(--dsw-alias-label-on-primary, white); box-shadow: 0 1px 2px color-mix(in srgb, var(--re-accent) 12%, transparent); pointer-events: none; transition: left 260ms cubic-bezier(.2,.8,.2,1), transform 260ms cubic-bezier(.2,.8,.2,1); }
.re-depth.is-dragging .re-depth-thumb { transition: none; }
.re-depth-input { appearance: none; position: absolute; z-index: 3; inset: -6px 0; width: 100%; height: 32px; padding: 0; margin: 0; opacity: 0; cursor: grab; touch-action: pan-y; }
.re-depth-input:active { cursor: grabbing; }
.re-depth-input:disabled { cursor: wait; }
.re-depth-input::-webkit-slider-thumb { appearance: none; width: 17px; height: 20px; border: 0; }
.re-depth-input::-moz-range-thumb { width: 17px; height: 20px; border: 0; }
.re-depth-slider:has(.re-depth-input:focus-visible) { outline: 2px solid var(--re-accent); outline-offset: 3px; }
.re-depth[data-top] .re-depth-value { background: linear-gradient(100deg, var(--re-accent), color-mix(in srgb, var(--re-accent) 55%, var(--dsw-alias-label-primary)), var(--re-accent)); background-size: 250% 100%; background-clip: text; -webkit-background-clip: text; color: transparent; animation: re-depth-flow 2.8s linear infinite; }
.re-model-root .re-model-effort, .re-model-root .re-model-row-effort { color: var(--re-accent); }
.re-palette-picker { flex-wrap: wrap; }
.re-custom-palette { display: inline-flex; align-items: center; gap: 6px; color: var(--dsw-alias-label-secondary); font-size: 12px; }
.re-custom-palette input { appearance: none; width: 22px; height: 22px; padding: 0; border: 0; border-radius: 50%; corner-shape: round; background: transparent; cursor: pointer; }
.re-custom-palette input::-webkit-color-swatch-wrapper { padding: 0; }
.re-custom-palette input::-webkit-color-swatch { border: 1px solid var(--dsw-alias-border-l3); border-radius: 50%; corner-shape: round; }
.re-custom-palette input::-moz-color-swatch { border: 1px solid var(--dsw-alias-border-l3); border-radius: 50%; }
@keyframes re-depth-flow { to { background-position: 250% center; } }
@keyframes re-depth-enter { from { opacity: .3; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
@media (prefers-reduced-motion: reduce) {
  .re-depth .re-depth-value, .re-depth[data-top] .re-depth-value { animation: none; }
  .re-depth .re-depth-thumb { transition: none; }
}
`
