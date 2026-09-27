/**
 * Particle palettes for the radiation slider.
 *
 * LOCAL ADDITION — not part of upstream dsh-reasoning-effort 0.7.3. Upstream's
 * `drawRadiation()` hard-codes its blues behind `isDark ? … : …`; this module
 * leaves that function completely untouched and recolours the *finished* canvas
 * instead:
 *
 *   1. draw the verbatim output into an offscreen canvas;
 *   2. paint a flat hue over it with `globalCompositeOperation = 'hue'`, which
 *      takes the hue from the paint and saturation/luminosity from the drawing,
 *      so the wave texture survives;
 *   3. `destination-in` the offscreen back on, restoring the original alpha —
 *      "where there are particles" is byte-identical to upstream.
 *
 * The DOM chrome (track gradient, flare, thumb glow) is recoloured with
 * generated CSS scoped to `.re-effort[data-palette="…"]`, so no upstream rule
 * has to be edited either. The default palette emits no CSS and skips step 1-3
 * entirely, which makes it bit-for-bit upstream.
 *
 * @module dsh-reasoning-effort/palettes
 */
import type { ReasoningEffortLocaleKey } from './locales.js'

/** One selectable particle palette. */
export interface Palette {
  readonly id: string
  /** Locale key for the swatch's accessible name. */
  readonly labelKey: ReasoningEffortLocaleKey
  /** CSS background for the settings swatch. */
  readonly swatch: string
  /**
   * Target hue for the canvas composite, or `null` for the upstream default.
   * `null` disables both the composite and every CSS override.
   */
  readonly hue: string | null
  /** Dark-theme track gradient stops. */
  readonly dark: readonly string[]
  /** Light-theme track fill. */
  readonly lightBg: string
  /** Light-theme progress-fill gradient stops. */
  readonly lightFill: readonly string[]
  /** Light-theme gradient stops for the topmost stop. */
  readonly topFill: readonly string[]
  /** Degrees to rotate the glow's hue, measured from upstream's blue-violet. */
  readonly rot: number
  /** Thumb glow colour in dark theme, as `r, g, b`. */
  readonly glow: string
  /**
   * Saturated accent for the places outside the slider that should follow the
   * palette: the level text on the composer trigger and the settings swatch
   * ring, so a choice is visible without opening the popover.
   */
  readonly accent: string
}

/**
 * Palette applied when the user has never chosen one.
 *
 * `upstream` is the verbatim one — it emits no CSS and skips the canvas
 * recolour, so the slider is bit-for-bit upstream's. It used to be called
 * `violet`, which made the violet swatch look broken: picking it changed
 * nothing, because it *was* the default. Violet is now a real purple palette
 * like the rest, and the untouched upstream look has its own honest name.
 */
export const DEFAULT_PALETTE_ID = 'upstream'

export const PALETTES: readonly Palette[] = [
  {
    id: 'upstream',
    labelKey: 'palette.upstream',
    /* Shows what it actually renders in dark theme: upstream's own track. */
    swatch: 'linear-gradient(100deg, #071126, #302262 70%, #5d35a0)',
    hue: null,
    dark: [],
    lightBg: '',
    lightFill: [],
    topFill: [],
    rot: 0,
    glow: '',
    accent: '#4d70ff',
  },
  {
    id: 'violet',
    labelKey: 'palette.violet',
    swatch: 'linear-gradient(100deg, #160a2b, #4a1c86 70%, #7a2ec4)',
    hue: 'hsl(275 100% 55%)',
    dark: ['#0a0514', '#160a2b', '#2c1152', '#4a1c86', '#7a2ec4'],
    lightBg: '#f3e8ff',
    lightFill: ['#ffffff', '#f0e4ff', '#c9a3f5', '#8b46d9'],
    topFill: ['#ffffff', '#e6d4ff', '#a877e8', '#5c1fa8'],
    rot: 40,
    glow: '122, 46, 196',
    accent: '#7a2ec4',
  },
  {
    id: 'ice',
    labelKey: 'palette.ice',
    swatch: 'linear-gradient(100deg, #06182b, #155a91 70%, #1f8fc7)',
    hue: 'hsl(202 100% 50%)',
    dark: ['#02080f', '#06182b', '#0b2f56', '#155a91', '#1f8fc7'],
    lightBg: '#e5f2ff',
    lightFill: ['#ffffff', '#e4f4ff', '#a9d8f7', '#3f97d6'],
    topFill: ['#ffffff', '#d9efff', '#79c0ea', '#0760ad'],
    rot: -33,
    glow: '31, 143, 199',
    accent: '#1f8fc7',
  },
  {
    id: 'cyan',
    labelKey: 'palette.cyan',
    swatch: 'linear-gradient(100deg, #06201f, #137066 70%, #1aa392)',
    hue: 'hsl(172 100% 45%)',
    dark: ['#020c0b', '#06201f', '#0b3d3a', '#137066', '#1aa392'],
    lightBg: '#e2fbf7',
    lightFill: ['#ffffff', '#e2fbf7', '#a4ecdf', '#38b8a6'],
    topFill: ['#ffffff', '#d6f7f1', '#6fd3c4', '#057a6b'],
    rot: -63,
    glow: '26, 163, 146',
    accent: '#1aa392',
  },
  {
    id: 'green',
    labelKey: 'palette.green',
    swatch: 'linear-gradient(100deg, #071a0e, #146b3a 70%, #1fa055)',
    hue: 'hsl(140 100% 45%)',
    dark: ['#030a05', '#071a0e', '#0c3a20', '#146b3a', '#1fa055'],
    lightBg: '#e4fbea',
    lightFill: ['#ffffff', '#e4fbea', '#a8f0c1', '#3fbe76'],
    topFill: ['#ffffff', '#d8f7e2', '#77d69c', '#087a41'],
    rot: -95,
    glow: '31, 160, 85',
    accent: '#1fa055',
  },
  {
    id: 'amber',
    labelKey: 'palette.amber',
    swatch: 'linear-gradient(100deg, #241405, #8f5212 70%, #cc8420)',
    hue: 'hsl(38 100% 52%)',
    dark: ['#0d0702', '#241405', '#4d2a0a', '#8f5212', '#cc8420'],
    lightBg: '#fff4e2',
    lightFill: ['#ffffff', '#fff4e2', '#f7dba9', '#d69a3f'],
    topFill: ['#ffffff', '#fff0d4', '#eac179', '#ad6a07'],
    rot: 163,
    glow: '204, 132, 32',
    accent: '#cc8420',
  },
  {
    id: 'rose',
    labelKey: 'palette.rose',
    swatch: 'linear-gradient(100deg, #240618, #911456 70%, #cc1f78)',
    hue: 'hsl(325 100% 50%)',
    dark: ['#0d0209', '#240618', '#4d0b30', '#911456', '#cc1f78'],
    lightBg: '#ffe4f1',
    lightFill: ['#ffffff', '#ffe4f1', '#f7a9d0', '#d63f8f'],
    topFill: ['#ffffff', '#ffd9ea', '#ea79b3', '#ad0763'],
    rot: 90,
    glow: '204, 31, 120',
    accent: '#cc1f78',
  },
]

const BY_ID = new Map(PALETTES.map((palette) => [palette.id, palette]))

/** Resolve a stored palette id, tolerating anything unknown. */
export function paletteById(id: string): Palette | undefined {
  return BY_ID.get(id)
}

/** The palette for `id`, falling back to the upstream default. */
export function paletteOrDefault(id: string): Palette {
  return BY_ID.get(id) ?? BY_ID.get(DEFAULT_PALETTE_ID) as Palette
}

function stops(colors: readonly string[], percentages: readonly number[]): string {
  return colors.map((color, index) => `${color} ${percentages[index]}%`).join(', ')
}

/**
 * CSS overriding the track, flare, thumb glow and top-stop breathe for every
 * non-default palette.
 *
 * Every selector outranks its upstream counterpart on specificity alone (the
 * `[data-palette]` attribute plus the explicit `body` element), so this sheet
 * wins wherever it is injected and upstream's own rules stay readable.
 */
export function paletteCss(): string {
  const blocks = PALETTES.filter((palette) => palette.hue !== null).map((palette) => {
    const scope = `.re-effort[data-palette="${palette.id}"]`
    const light = `body:not([data-ds-dark-theme]) ${scope}`
    const rot = ` hue-rotate(${palette.rot}deg)`
    const glow = palette.glow
    /* The top-stop "breathe" is two keyframe sets upstream, both hard-coded to
       blue-violet. Keyframes cannot be recoloured by a filter (they animate
       box-shadow), so each palette gets its own pair built from its own colour. */
    const darkBreathe = `re-effort-dark-breathe-${palette.id}`
    const lightBreathe = `re-effort-light-breathe-${palette.id}`
    return [
      /* The trigger sits outside the slider, so `:has` is what ties it to the
         palette actually in force — no global attribute, no extra state. */
      `.re-model-root:has(.re-effort[data-palette="${palette.id}"]) .re-model-effort { color: ${palette.accent}; }`,
      `${scope} .re-effort-track { background: linear-gradient(100deg, ${stops(palette.dark, [0, 22, 45, 70, 100])}); }`,
      `${light} .re-effort-track { background: ${palette.lightBg}; }`,
      `${light} .re-effort-track::before { background: linear-gradient(90deg, ${stops(palette.lightFill, [0, 20, 57, 100])}); }`,
      `${light} .re-effort-slider[data-top] .re-effort-track::before { background: linear-gradient(90deg, ${stops(palette.topFill, [0, 18, 54, 100])}); }`,
      `${scope} .re-effort-flare { filter: blur(2px) saturate(1.25)${rot}; }`,
      `${light} .re-effort-flare { filter: blur(2px) saturate(1.12)${rot}; }`,
      `${scope}.is-dragging .re-effort-flare { filter: blur(1.5px) saturate(1.4) brightness(1.1)${rot}; }`,
      /* The chibi sprite is artwork: rotating its hue would recolour the
         character, so its drop-shadow is rewritten in the palette's own colour
         instead of filtered. */
      `${scope}.is-chibi .re-effort-knob { filter: drop-shadow(0 1px 1px rgba(0, 0, 0, .28)) drop-shadow(0 0 5px rgba(${glow}, .34)); }`,
      `${scope}.is-chibi.is-dragging .re-effort-knob { filter: drop-shadow(0 2px 1px rgba(0, 0, 0, .28)) drop-shadow(0 0 8px rgba(${glow}, .68)); }`,
      `${scope} .re-effort-slider[data-top] .re-effort-track { animation-name: ${darkBreathe}; }`,
      `${light} .re-effort-slider[data-top] .re-effort-track { animation-name: ${lightBreathe}; }`,
      `@keyframes ${darkBreathe} {`
      + ` 0%, 100% { box-shadow: inset 0 1px 0 rgba(${glow}, .16), 0 3px 10px rgba(18, 25, 72, .4); }`
      + ` 50% { box-shadow: inset 0 1px 0 rgba(${glow}, .24), 0 0 21px rgba(${glow}, .5); } }`,
      `@keyframes ${lightBreathe} {`
      + ` 0%, 100% { box-shadow: inset 0 1px 0 rgba(255, 255, 255, .9), inset 0 0 0 1px rgba(${glow}, .16), 0 3px 10px rgba(48, 101, 165, .13); }`
      + ` 50% { box-shadow: inset 0 1px 0 rgba(255, 255, 255, .96), inset 0 0 0 1px rgba(${glow}, .22), 0 0 19px rgba(${glow}, .24); } }`,
    ].join('\n')
  }).join('\n')

  /* The per-palette animation-name rules outrank upstream's
     `@media (prefers-reduced-motion: reduce) { … animation: none }`, so the
     opt-out has to be restated at a higher specificity than they carry. */
  const calm = [
    '@media (prefers-reduced-motion: reduce) {',
    '  body .re-effort[data-palette] .re-effort-slider[data-top] .re-effort-track { animation: none; }',
    '}',
  ].join('\n')

  return blocks === '' ? '' : `${blocks}\n${calm}`
}

/**
 * Draw one radiation frame, recoloured for `palette`.
 *
 * @param context - Visible canvas context, already scaled by `ratio`.
 * @param offscreen - Scratch canvas sized like the visible one.
 * @param offContext - The scratch canvas's context.
 * @param ratio - Device pixel ratio the visible context is scaled by.
 * @param render - Draws one verbatim upstream frame into the context it is given.
 */
export function drawPaletted(
  context: CanvasRenderingContext2D,
  offscreen: HTMLCanvasElement,
  offContext: CanvasRenderingContext2D,
  ratio: number,
  palette: Palette,
  render: (target: CanvasRenderingContext2D) => void,
): void {
  if (palette.hue === null) {
    /* Upstream path: no scratch canvas, no composite — literally the original call. */
    render(context)
    return
  }

  offContext.setTransform(ratio, 0, 0, ratio, 0, 0)
  offContext.clearRect(0, 0, offscreen.width / ratio, offscreen.height / ratio)
  render(offContext)

  /* Composite in device pixels: identity transform, so the full backing store is covered. */
  context.setTransform(1, 0, 0, 1, 0, 0)
  context.globalCompositeOperation = 'source-over'
  context.clearRect(0, 0, offscreen.width, offscreen.height)
  context.drawImage(offscreen, 0, 0)
  context.globalCompositeOperation = 'hue'
  context.fillStyle = palette.hue
  context.fillRect(0, 0, offscreen.width, offscreen.height)
  context.globalCompositeOperation = 'destination-in'
  context.drawImage(offscreen, 0, 0)
  context.globalCompositeOperation = 'source-over'
  context.setTransform(ratio, 0, 0, ratio, 0, 0)
}
