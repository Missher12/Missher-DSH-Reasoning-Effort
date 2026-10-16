/**
 * Keep the composer popover inside the area that can actually show it, without
 * measuring its entrance animation.
 *
 * Two host behaviours defeat a plain viewport clamp:
 *
 * 1. DSH collapses its sidebar and reflows the composer asynchronously, so the
 *    anchor keeps its size and only moves. `resize` fires before that reflow
 *    finishes, and a size-only `ResizeObserver` never fires again — the popover
 *    stays clamped to geometry read mid-transition.
 * 2. The composer sits inside host containers with `overflow: auto/hidden`
 *    (`centerCol`, `scrollBody`). Those clip the popover even once it is inside
 *    the viewport: at 390x700 the content column starts at x=56, so a menu
 *    clamped to x=12 loses its heading and left buttons to the clip.
 *
 * The open period therefore runs a bounded animation-frame chase over the
 * *visible* box — the viewport intersected with the client bounds of every
 * clipping ancestor, resolved per axis — and re-applies the clamp only when that
 * geometry actually changed.
 *
 * Deliberate non-choices: the menu's own `getBoundingClientRect()` is never
 * read, because it already carries the transform this function writes and
 * feeding it back would oscillate; `offsetWidth`/`offsetHeight` stay the
 * measurement basis since they exclude the entrance transform; and no frame
 * writes styles whose geometry is unchanged.
 */
export declare function positionModelMenu(root: HTMLElement, menu: HTMLElement): () => void;
