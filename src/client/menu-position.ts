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

/** Frames of unchanged geometry that end a chase (≈330 ms at 60 Hz). */
const SETTLE_FRAMES = 20
/** Absolute ceiling on one chase (≈10 s at 60 Hz), so a page that never settles cannot hold a frame loop. */
const MAX_CHASE_FRAMES = 600

/** `overflow` values that clip a descendant's painted box. `visible` never does. */
const CLIPPING_OVERFLOW = new Set(['hidden', 'auto', 'scroll', 'clip'])

/** An axis-aligned rectangle in viewport coordinates. */
interface Box {
  left: number
  top: number
  right: number
  bottom: number
}

/** One ancestor that clips, and the axes on which it does. */
interface ClipAncestor {
  readonly el: Element
  readonly x: boolean
  readonly y: boolean
}

/**
 * The element's client box in viewport coordinates: its padding box minus its
 * borders and scrollbars, which is exactly the region that clips descendants
 * under `overflow: hidden|auto|scroll|clip`.
 *
 * `getBoundingClientRect` already accounts for the element's own scroll offset,
 * so no scroll arithmetic is needed here.
 */
function clientBox(el: Element): Box {
  const rect = el.getBoundingClientRect()
  const left = rect.left + el.clientLeft
  const top = rect.top + el.clientTop
  return { left, top, right: left + el.clientWidth, bottom: top + el.clientHeight }
}

/**
 * Ancestors that can clip the menu, each with the axes it clips on.
 *
 * Resolved from computed styles on every layout trigger rather than per frame:
 * the chain is stable while the popover is open, and re-reading a computed style
 * per ancestor per frame would cost far more than the box reads the chase needs.
 *
 * Wrappers that produce no box of their own are skipped — `display: contents`,
 * and anything with a zero client area. Their rect is empty, so intersecting
 * with it would collapse the menu instead of describing a boundary. Nothing here
 * knows a host class name: only `overflow` and the element's own client box.
 */
function collectClipAncestors(menu: HTMLElement): ClipAncestor[] {
  const ancestors: ClipAncestor[] = []
  for (let el: Element | null = menu.parentElement; el !== null; el = el.parentElement) {
    const style = getComputedStyle(el)
    if (style.display === 'contents') continue
    const x = CLIPPING_OVERFLOW.has(style.overflowX)
    const y = CLIPPING_OVERFLOW.has(style.overflowY)
    if (x || y) ancestors.push({ el, x, y })
  }
  return ancestors
}

/** Include provider headings in the space for five models around the selection. */
function modelWindow(list: HTMLElement): { top: number; height: number } | undefined {
  const options = [...list.querySelectorAll<HTMLElement>('.re-model-option')]
  if (!options.length) return
  const selected = Math.max(0, options.findIndex(option => option.getAttribute('aria-checked') === 'true'))
  const start = Math.min(Math.max(0, selected - 2), Math.max(0, options.length - 5))
  const first = options[start]
  const last = options[Math.min(start + 4, options.length - 1)]
  const group = first.closest('section') as HTMLElement | null
  const top = group?.querySelector('.re-model-option') === first ? group.offsetTop : first.offsetTop
  return { top, height: last.offsetTop + last.offsetHeight - top }
}

export function positionModelMenu(root: HTMLElement, menu: HTMLElement): () => void {
  const viewport = window.visualViewport

  let frame = 0
  let chaseFrames = 0
  let stableFrames = 0
  let modelScrollInitialized = false
  /** Geometry key the last applied clamp was derived from; the chase compares against it. */
  let appliedKey = ''
  /** Clipping ancestors resolved by the last layout trigger. */
  let clips: ClipAncestor[] = []

  /** The browser viewport's own box; the clamp never leaves it. */
  const viewportBox = (): Box => {
    const left = viewport?.offsetLeft ?? 0
    const top = viewport?.offsetTop ?? 0
    const width = viewport?.width ?? document.documentElement.clientWidth
    const height = viewport?.height ?? window.innerHeight
    return { left, top, right: left + width, bottom: top + height }
  }

  /**
   * The rectangle the popover is actually allowed to occupy: the viewport
   * narrowed by every clipping ancestor, axis by axis, so e.g. a container with
   * `overflow-x: hidden; overflow-y: visible` narrows the width only.
   */
  const visibleBox = (): Box => {
    const box = viewportBox()
    for (const { el, x, y } of clips) {
      const client = clientBox(el)
      // A zero-width/height client area is no boundary on that axis.
      if (x && client.right > client.left) {
        box.left = Math.max(box.left, client.left)
        box.right = Math.min(box.right, client.right)
      }
      if (y && client.bottom > client.top) {
        box.top = Math.max(box.top, client.top)
        box.bottom = Math.min(box.bottom, client.bottom)
      }
    }
    return box
  }

  /** Read the clamp's inputs once: anchor geometry plus the live visible box. */
  const geometry = () => {
    const anchor = root.getBoundingClientRect()
    const box = visibleBox()
    // Rounded to whole pixels: the sub-pixel noise of a running transition must
    // not count as movement, or the chase would rewrite identical values forever.
    const key = `${Math.round(anchor.left)},${Math.round(anchor.top)},${Math.round(anchor.right)},${Math.round(anchor.bottom)},`
      + `${Math.round(box.left)},${Math.round(box.top)},${Math.round(box.right)},${Math.round(box.bottom)}`
    return { anchor, box, key }
  }

  const apply = ({ anchor, box, key }: ReturnType<typeof geometry>) => {
    const margin = 12
    const left = box.left + margin
    const top = box.top + margin
    const usableWidth = Math.max(0, box.right - box.left - margin * 2)
    const usableHeight = Math.max(0, box.bottom - box.top - margin * 2)
    const bottom = anchor.top - 8
    const above = bottom - top
    menu.style.setProperty('--re-menu-width', `${usableWidth}px`)
    const list = menu.querySelector<HTMLElement>('.re-model-list')
    const modelSlice = list && modelWindow(list)
    let placeBelow = false
    let maxHeight = Math.min(480, above >= 120 ? Math.min(above, usableHeight) : usableHeight)
    if (list && modelSlice) {
      const preferredHeight = modelSlice.height + menu.offsetHeight - list.offsetHeight
      const below = Math.max(0, top + usableHeight - anchor.bottom - 8)
      placeBelow = preferredHeight > above && (below >= preferredHeight || below > above)
      maxHeight = Math.min(480, usableHeight, Math.max(0, placeBelow ? below : above))
      list.style.height = `${modelSlice.height}px`
    }
    menu.style.setProperty('--re-menu-height', `${maxHeight}px`)
    // In a short popover, scroll the body and actions together below the heading.
    menu.toggleAttribute('data-short-menu', maxHeight < 240)

    // offsetWidth/Height exclude transforms, so repeated updates cannot accumulate
    // an animated scale or an earlier correction into the next position.
    const baseLeft = anchor.right - menu.offsetWidth
    const baseTop = bottom - menu.offsetHeight
    const x = Math.max(left, Math.min(baseLeft, left + usableWidth - menu.offsetWidth))
    const desiredTop = placeBelow ? anchor.bottom + 8 : baseTop
    const y = Math.max(top, Math.min(desiredTop, top + usableHeight - menu.offsetHeight))
    menu.style.setProperty('--re-menu-x', `${x - baseLeft}px`)
    menu.style.setProperty('--re-menu-y', `${y - baseTop}px`)
    if (list && modelSlice && !modelScrollInitialized) {
      list.scrollTop = modelSlice.top
      modelScrollInitialized = true
    }
    appliedKey = key
  }

  /** Re-apply the clamp from freshly read geometry. */
  const update = () => {
    apply(geometry())
  }

  /** Follow the visible box while it is still moving, then stop. */
  const chase = () => {
    frame = 0
    const current = geometry()
    if (current.key !== appliedKey) {
      // Only a real geometry change writes styles; a still popover writes none.
      apply(current)
      stableFrames = 0
    } else {
      stableFrames += 1
    }
    chaseFrames += 1
    if (stableFrames >= SETTLE_FRAMES || chaseFrames >= MAX_CHASE_FRAMES) return
    frame = requestAnimationFrame(chase)
  }

  /** Extend or start a chase after a trigger has already re-applied the clamp. */
  const startChase = () => {
    stableFrames = 0
    if (frame !== 0) return
    chaseFrames = 0
    frame = requestAnimationFrame(chase)
  }

  /* `observe` reports the current size once per element. Re-observing the whole
     chain on every refresh would therefore feed the observer its own callback;
     only newly discovered ancestors are added, and the chain is finite. */
  const observed = new Set<Element>()
  const observeOnce = (el: Element) => {
    if (observed.has(el)) return
    observed.add(el)
    observer.observe(el)
  }

  /**
   * Re-resolve the clip chain, then re-apply and chase. Runs on every layout
   * trigger, so a host that introduces or resizes a clipping container during
   * the reflow is picked up on the next resize rather than at open time only.
   */
  function onLayoutChange(): void {
    clips = collectClipAncestors(menu)
    observeOnce(root)
    observeOnce(menu)
    for (const { el } of clips) observeOnce(el)
    update()
    startChase()
  }

  const observer = new ResizeObserver(onLayoutChange)

  onLayoutChange()

  window.addEventListener('resize', onLayoutChange)
  window.addEventListener('scroll', update, true)
  viewport?.addEventListener('resize', onLayoutChange)
  viewport?.addEventListener('scroll', update)
  return () => {
    if (frame !== 0) cancelAnimationFrame(frame)
    frame = 0
    observer.disconnect()
    observed.clear()
    window.removeEventListener('resize', onLayoutChange)
    window.removeEventListener('scroll', update, true)
    viewport?.removeEventListener('resize', onLayoutChange)
    viewport?.removeEventListener('scroll', update)
  }
}
