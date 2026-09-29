const DEFAULT_COLOR = '#9864db';
const parseHex = hex => [1, 3, 5].map(offset => parseInt(hex.slice(offset, offset + 2), 16));
const blendRgb = (a, b, weight) => a.map((value, index) => Math.round(value + (b[index] - value) * weight));
const cssRgb = color => `rgb(${color.join(' ')})`;

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

function makePixelPalette(hex) {
  const base = parseHex(hex);
  const selected = rgbToHsl(base), original = rgbToHsl(parseHex(DEFAULT_COLOR));
  const tint = rgb => {
    const [h,s,l] = rgbToHsl(rgb);
    return hslToRgb([
      h + selected[0] - original[0],
      Math.min(1, s * selected[1] / original[1]),
      Math.max(.06, Math.min(.97, l + (selected[2] - original[2]) * .65))
    ]);
  };
  return {
    leftColor: blendRgb([216, 213, 220], base, .22),
    deepViolet: tint([139, 77, 207]), deepMid: tint([146, 94, 205]),
    midPurple: tint([155, 115, 216]), softMid: tint([167, 136, 218]),
    softLilac: tint([179, 151, 222]), paleCool: tint([191, 174, 225]),
    highlightColor: tint([205, 184, 235]), peakColor: tint([238, 223, 255])
  };
}
