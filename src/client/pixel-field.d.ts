/** Pixel renderer adapted from the user-provided desktop design. */
export class PixelField {
  constructor(canvas: HTMLCanvasElement, reducedMotion: MediaQueryList)
  resize(): void
  setColor(hex: string): void
  setActive(active: boolean): void
  sync(): void
}
