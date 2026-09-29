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
import type { ReasoningEffortLocaleKey } from './locales.js';
/** One selectable particle palette. */
export interface Palette {
    readonly id: string;
    /** Locale key for the swatch's accessible name. */
    readonly labelKey: ReasoningEffortLocaleKey;
    /** CSS background for the settings swatch. */
    readonly swatch: string;
    /**
     * Target hue for the canvas composite, or `null` for the upstream default.
     * `null` disables both the composite and every CSS override.
     */
    readonly hue: string | null;
    /** Dark-theme track gradient stops. */
    readonly dark: readonly string[];
    /** Light-theme track fill. */
    readonly lightBg: string;
    /** Light-theme progress-fill gradient stops. */
    readonly lightFill: readonly string[];
    /** Light-theme gradient stops for the topmost stop. */
    readonly topFill: readonly string[];
    /** Degrees to rotate the glow's hue, measured from upstream's blue-violet. */
    readonly rot: number;
    /** Thumb glow colour in dark theme, as `r, g, b`. */
    readonly glow: string;
    /**
     * Saturated accent for the places outside the slider that should follow the
     * palette: the level text on the composer trigger and the settings swatch
     * ring, so a choice is visible without opening the popover.
     */
    readonly accent: string;
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
export declare const DEFAULT_PALETTE_ID = "upstream";
export declare const PALETTES: readonly Palette[];
/** Resolve a stored palette id, tolerating anything unknown. */
export declare function paletteById(id: string): Palette | undefined;
/** The palette for `id`, falling back to the upstream default. */
export declare function paletteOrDefault(id: string): Palette;
/**
 * CSS overriding the track, flare, thumb glow and top-stop breathe for every
 * non-default palette.
 *
 * Every selector outranks its upstream counterpart on specificity alone (the
 * `[data-palette]` attribute plus the explicit `body` element), so this sheet
 * wins wherever it is injected and upstream's own rules stay readable.
 */
export declare function paletteCss(): string;
/**
 * Draw one radiation frame, recoloured for `palette`.
 *
 * @param context - Visible canvas context, already scaled by `ratio`.
 * @param offscreen - Scratch canvas sized like the visible one.
 * @param offContext - The scratch canvas's context.
 * @param ratio - Device pixel ratio the visible context is scaled by.
 * @param render - Draws one verbatim upstream frame into the context it is given.
 */
export declare function drawPaletted(context: CanvasRenderingContext2D, offscreen: HTMLCanvasElement, offContext: CanvasRenderingContext2D, ratio: number, palette: Palette, render: (target: CanvasRenderingContext2D) => void): void;
