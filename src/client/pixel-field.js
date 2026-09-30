import { DEFAULT_COLOR, makePixelPalette } from './pixel-theme.js';
// Pixel field adapted from MEMZ-JZY/DSH-Claude-Style-Reasoning-Slider.
/*
MIT License

Copyright (c) 2026 MEMZ-鱼子酱

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const smoothstep = (edge0, edge1, value) => {
  const x = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return x * x * (3 - 2 * x);
};
const mix = (from, to, amount) => from + (to - from) * amount;
const mixColor = (from, to, amount) =>
  `rgb(${Math.round(mix(from[0], to[0], amount))} ${Math.round(mix(from[1], to[1], amount))} ${Math.round(mix(from[2], to[2], amount))})`;

export class PixelField {
  constructor(canvas, reducedMotion) {
    this._canvas = canvas;
    this._reducedMotion = reducedMotion;
    this._palette = makePixelPalette(DEFAULT_COLOR);
    this._isMax = false;
    this._frame = null;
    this._reveal = 0;
    this._maxStartedAt = 0;
    this._lastFrame = 0;
    this._seed = Math.random() * 10000;
    this._tick = (time) => {
      this._frame = null;
      if (!this._isMax || document.hidden || this._reducedMotion.matches) return;
      this._lastFrame = time;
      this._reveal = smoothstep(0, 1, (Date.now() - this._maxStartedAt) / 1000);
      this._drawPixelField(Date.now());
      this._frame = requestAnimationFrame(this._tick);
    };
    this.resize();
  }

  resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    this._canvas.width = Math.round((this._canvas.parentElement?.clientWidth || 0) * ratio);
    this._canvas.height = Math.round((this._canvas.parentElement?.clientHeight || 0) * ratio);
    this._buildPixelGrid();
    this._drawPixelField(Date.now());
  }

  setColor(hex) {
    this._palette = makePixelPalette(hex);
    this._drawPixelField(Date.now());
  }

  setActive(active) {
    if (active === this._isMax) return;
    this._isMax = active;
    this._maxStartedAt = Date.now();
    this._reveal = this._reducedMotion.matches ? 1 : 0;
    this.sync();
  }

  sync() {
    if (this._frame !== null) cancelAnimationFrame(this._frame);
    this._frame = null;
    this._canvas.hidden = !this._isMax;
    this._canvas.dataset.animation = 'stopped';
    this._drawPixelField(Date.now());
    if (!this._isMax || document.hidden) return;
    if (this._reducedMotion.matches) {
      this._reveal = 1;
      this._drawPixelField(Date.now());
      this._canvas.dataset.animation = 'reduced-motion';
      return;
    }
    this._canvas.dataset.animation = 'running';
    this._frame = requestAnimationFrame(this._tick);
  }

  _buildPixelGrid() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = this._canvas.width / ratio;
    const height = this._canvas.height / ratio;
    if (width <= 0 || height <= 0) { this._pixelGrid = []; return; }
    const rows = 8; // Eight pixels per column, matching the supplied design.
    const cell = height / rows;
    const gap = 0.18;
    const columns = Math.ceil(width / cell);
    const cells = [];
    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const x = column * cell;
        const y = row * cell;
        const nX = (x + cell * 0.5) / width;
        cells.push({
          x,
          y,
          row,
          column,
          nX,
          base: Math.abs(Math.sin(column * 12.9898 + row * 78.233 + this._seed) * 43758.5453) % 1,
          tempo: Math.abs(Math.sin(column * 7.13 + row * 19.41 + this._seed) * 19341.731) % 1,
          phase: Math.abs(Math.sin(column * 31.17 + row * 11.93 + this._seed) * 28437.123) % 1,
          chroma: Math.abs(Math.sin(column * 9.47 + row * 67.13 + this._seed) * 15823.917) % 1,
          purple: 0.28 + smoothstep(0, 1, nX) * 0.72,
          intensity: 0.65 + smoothstep(0, 1, nX) * 0.35,
          depth: smoothstep(0.25, 0.88, nX),
        });
      }
    }
    this._pixelGrid = cells;
    this._pixelCell = cell;
    this._pixelGap = gap;
    this._pixelRows = rows;
  }


  _drawPixelField(time) {
    const context = this._canvas.getContext("2d");
    if (!context || !this._canvas.width || !this._canvas.height) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = this._canvas.width / ratio;
    const height = this._canvas.height / ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);
    if (!this._isMax) return;

    const reveal = this._reducedMotion.matches ? 1 : this._reveal;
    const frontier = 1 - reveal;
    const cells = this._pixelGrid || [];
    const cell = this._pixelCell || (height / 8);
    const gap = this._pixelGap ?? 0.18;
    const elapsed = this._reducedMotion.matches ? 1600 : Math.max(0, time - this._maxStartedAt);

    // Max track palette (share-weighted).
    const leftColor = this._palette.leftColor;
    const deepViolet = this._palette.deepViolet;
    const deepMid = this._palette.deepMid;
    const midPurple = this._palette.midPurple;
    const softMid = this._palette.softMid;
    const softLilac = this._palette.softLilac;
    const paleCool = this._palette.paleCool;
    const highlightColor = this._palette.highlightColor;
    const peakColor = this._palette.peakColor;
    const tones = [
      deepViolet, deepViolet, deepMid, deepMid,
      midPurple, midPurple, midPurple,
      softMid, softMid, softLilac, paleCool,
    ];

    const flowDuration = 4000;
    const rawFlow = elapsed / flowDuration;
    const flowCycle = Math.floor(rawFlow);
    const easedFlow = flowCycle + smoothstep(0, 1, rawFlow - flowCycle);

    context.save();
    context.beginPath();
    if (typeof context.roundRect === "function") {
      context.roundRect(0, 0, width, height, 7);
    } else {
      context.rect(0, 0, width, height);
    }
    context.clip();
    // Opaque colour under the cells prevents the dark Host surface leaking through gaps.
    const backdrop = context.createLinearGradient(0, 0, width, 0);
    backdrop.addColorStop(0, mixColor(leftColor, leftColor, 0));
    backdrop.addColorStop(1, mixColor(deepViolet, deepViolet, 0));
    context.fillStyle = backdrop;
    context.fillRect(0, 0, width, height);

    for (const c of cells) {
      const { x, y, row, nX, base, tempo, phase, chroma, purple, intensity, depth } = c;
      const revealAlpha = smoothstep(frontier - 0.1, frontier + 0.07, nX);
      if (revealAlpha <= 0.002) continue;

      const period = 650 + tempo * 1150;
      const localTime = elapsed + phase * period;
      const cycle = Math.floor(localTime / period);
      const cycleProgress = (localTime % period) / period;
      const cycleHash = Math.abs(
        Math.sin(c.column * 17.17 + row * 41.73 + cycle * 13.11 + this._seed) * 24634.6345,
      ) % 1;
      const widthHash = Math.abs(
        Math.sin(c.column * 5.37 + row * 29.11 + cycle * 7.43 + this._seed) * 17391.443,
      ) % 1;

      const pulseCenter = 0.2 + cycleHash * 0.55;
      const pulseWidth = 0.12 + widthHash * 0.11;
      const pulseDistance = (cycleProgress - pulseCenter) / pulseWidth;
      const pulseEnvelope = Math.exp(-pulseDistance * pulseDistance * 1.45);
      const activeCycle = cycleHash > 0.04 ? 1 : 0.5;
      const irregularFlicker = pulseEnvelope * activeCycle;

      const flowCoordinate = (nX + easedFlow) * 9;
      const flowIndex = Math.floor(flowCoordinate);
      const flowProgress = smoothstep(0, 1, flowCoordinate - flowIndex);
      const flowHashA = Math.abs(
        Math.sin(flowIndex * 18.31 + row * 37.17) * 19283.173,
      ) % 1;
      const flowHashB = Math.abs(
        Math.sin((flowIndex + 1) * 18.31 + row * 37.17) * 19283.173,
      ) % 1;
      const clusterGate = smoothstep(0.46, 0.84, mix(flowHashA, flowHashB, flowProgress));
      const wavePhase = (nX + easedFlow + row * 0.06 + base * 0.02) * Math.PI * 2;
      const directionalWave = Math.pow(0.5 + 0.5 * Math.cos(wavePhase), 5);
      const directionalFlow = Math.max(clusterGate, directionalWave * 0.62);
      const flowingFlicker = Math.max(
        irregularFlicker * (0.72 + directionalFlow * 0.38),
        directionalFlow * (0.38 + base * 0.28),
      );

      let lightAmount = flowingFlicker;
      const revealGlow = reveal < 0.995
        ? Math.exp(-((nX - frontier) ** 2) / 0.012) * (1 - smoothstep(0.7, 1, reveal))
        : 0;
      lightAmount = Math.max(lightAmount, revealGlow * (0.4 + base * 0.4));

      const peakHighlight =
        lightAmount > 0.32
        && irregularFlicker > 0.12
        && cycleHash > 0.26;
      const hottestHighlight =
        lightAmount > 0.68
        && irregularFlicker > 0.3
        && cycleHash > 0.48;
      const highlightAmount = peakHighlight
        ? 0.74
        : clamp(lightAmount * (0.44 + cycleHash * 0.3), 0, 0.64);

      const toneDrift =
        base * 0.28
        + depth * 0.28
        + cycleProgress * 0.38
        + easedFlow * 0.18
        + cycleHash * 0.2
        + Math.sin(elapsed * 0.00135 + phase * Math.PI * 2) * 0.14;
      const tonePosition = (((toneDrift % 1) + 1) % 1) * tones.length;
      const toneIndex = Math.floor(tonePosition);
      const toneMix = tonePosition - toneIndex;
      const toneA = tones[toneIndex];
      const toneB = tones[(toneIndex + 1) % tones.length];
      const cellTone = [
        mix(toneA[0], toneB[0], toneMix),
        mix(toneA[1], toneB[1], toneMix),
        mix(toneA[2], toneB[2], toneMix),
      ];

      const variedPurple = cellTone.map((channel, index) =>
        mix(deepViolet[index], channel, .18 + (1 - depth) * .42));
      const colourWeight = clamp(purple + (base - .5) * .14, .14, 1);
      const baseColor = [
        mix(leftColor[0], variedPurple[0], colourWeight),
        mix(leftColor[1], variedPurple[1], colourWeight),
        mix(leftColor[2], variedPurple[2], colourWeight),
      ];
      const localHighlight = leftColor.map((channel, index) => mix(channel, highlightColor[index], nX));
      const color = hottestHighlight
        ? mixColor(baseColor, peakColor, .8)
        : mixColor(baseColor, localHighlight, highlightAmount);

      const baseOpacity = 0.86 + base * 0.12;
      context.globalAlpha = peakHighlight || hottestHighlight
        ? revealAlpha * intensity
        : revealAlpha * intensity * clamp(baseOpacity + flowingFlicker * 0.12, 0, 1);
      context.fillStyle = color;
      context.fillRect(x + gap * 0.5, y + gap * 0.5, cell - gap, cell - gap);
    }

    context.restore();
    context.globalAlpha = 1;
  }


}
