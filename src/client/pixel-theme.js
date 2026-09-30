export const DEFAULT_COLOR = '#9864db';
const parseHex = hex => [1, 3, 5].map(offset => parseInt(hex.slice(offset, offset + 2), 16));

function rgbToHsl(rgb) {
  const [r, g, b] = rgb.map(value => value / 255);
  const high = Math.max(r, g, b), low = Math.min(r, g, b);
  const delta = high - low, lightness = (high + low) / 2;
  if (!delta) return [0, 0, lightness];
  const saturation = delta / (1 - Math.abs(2 * lightness - 1));
  const hue = high === r ? ((g - b) / delta + 6) % 6 : high === g ? (b - r) / delta + 2 : (r - g) / delta + 4;
  return [hue * 60, saturation, lightness];
}

function hslToRgb([h, s, l]) {
  const hue = ((h % 360) + 360) % 360 / 60;
  const chroma = (1 - Math.abs(2 * l - 1)) * s;
  const x = chroma * (1 - Math.abs(hue % 2 - 1));
  const m = l - chroma / 2;
  const components = hue < 1 ? [chroma,x,0] : hue < 2 ? [x,chroma,0] : hue < 3 ? [0,chroma,x] : hue < 4 ? [0,x,chroma] : hue < 5 ? [x,0,chroma] : [chroma,0,x];
  return components.map(value => Math.round((value + m) * 255));
}

// All track tones share the selected hue, including the lightest left edge.
export function makePixelPalette(hex) {
  const [hue, saturation, lightness] = rgbToHsl(parseHex(hex));
  const chroma = Math.min(.9, saturation * 1.08);
  const deep = Math.max(.3, Math.min(.48, lightness * .86));
  const tone = (light, strength = 1) => hslToRgb([hue, chroma * strength, light]);
  return {
    leftColor: tone(.83, .84),
    deepViolet: tone(deep), deepMid: tone(deep + .055),
    midPurple: tone(deep + .11), softMid: tone(deep + .16),
    softLilac: tone(.71, .9), paleCool: tone(.77, .86),
    highlightColor: tone(.82, .8), peakColor: tone(.91, .76),
  };
}
