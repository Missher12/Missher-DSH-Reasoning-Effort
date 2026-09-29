const control = document.querySelector('.thinking-control');
const range = document.querySelector('.depth-range');
const output = document.querySelector('.thinking-mode');
const outgoing = document.querySelector('.outgoing-mode');
const colorButton = document.querySelector('.color-button');
const colorPanel = document.querySelector('.color-panel');
const customColor = document.querySelector('#custom-color');
const colorOptions = [...document.querySelectorAll('.color-option')];
const canvas = document.querySelector('.particles');
const slider = document.querySelector('.slider');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const pixels = new PixelField(canvas, reducedMotion);

// 客户端档位；真实集成时需按所选模型过滤。Ultra 不是通用 API 参数。
const levels = [
  { effort: 'low', label: 'Low' },
  { effort: 'medium', label: 'Medium' },
  { effort: 'high', label: 'High' },
  { effort: 'xhigh', label: 'Extra High' },
  { effort: 'max', label: 'Max' },
  { effort: 'ultra', label: 'Ultra' }
];
let selectedIndex = -1;
let dragging = false;
let labelAnimations = [];
let themeColor = DEFAULT_COLOR;
try {
  const savedColor = localStorage.getItem('thinking-slider-color');
  if (/^#[0-9a-f]{6}$/i.test(savedColor || '')) themeColor = savedColor;
} catch { /* 本地文件或禁用存储时仍可正常切换颜色。 */ }

function paintTheme(index) {
  const base = parseHex(themeColor);
  const [h,s,l] = rgbToHsl(base);
  const start = blendRgb([216, 213, 220], base, .22);
  const end = blendRgb([200, 195, 208], base, .25 + index / 5 * .75);
  control.style.setProperty('--accent', themeColor);
  control.style.setProperty('--accent-cool', cssRgb(hslToRgb([h - 28, s, l])));
  control.style.setProperty('--accent-warm', cssRgb(hslToRgb([h + 28, s, l])));
  control.style.setProperty('--track-start', cssRgb(start));
  control.style.setProperty('--track-mid', cssRgb(blendRgb(start, end, .4)));
  control.style.setProperty('--track-end', cssRgb(end));
  output.style.color = cssRgb(blendRgb([137, 137, 137], base, index / 5));
}

function setTheme(hex, remember = true) {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) return;
  themeColor = hex.toLowerCase();
  control.dataset.color = themeColor;
  customColor.value = themeColor;
  colorOptions.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.color === themeColor)));
  paintTheme(Math.max(0, selectedIndex));
  pixels.setColor(themeColor);
  if (remember) {
    try { localStorage.setItem('thinking-slider-color', themeColor); } catch { /* 可选的本地记忆。 */ }
  }
}

function swapLabel(label, forward, animate) {
  labelAnimations.forEach(animation => animation.cancel());
  labelAnimations = [];
  outgoing.textContent = '';
  if (!animate || reducedMotion.matches) {
    output.value = label;
    return;
  }
  outgoing.textContent = output.value;
  output.value = label;
  const direction = forward ? 1 : -1;
  const timing = { duration: 240, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'both' };
  labelAnimations = [
    output.animate([
      { opacity: 0, transform: `translateY(${direction * 7}px)`, filter: 'blur(2px)' },
      { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' }
    ], timing),
    outgoing.animate([
      { opacity: .7, transform: 'translateY(0)', filter: 'blur(0)' },
      { opacity: 0, transform: `translateY(${-direction * 7}px)`, filter: 'blur(2px)' }
    ], timing)
  ];
}

function updateDepth() {
  const value = Number(range.value);
  const index = Math.round(value);
  const level = levels[index];
  const previousIndex = selectedIndex;
  control.style.setProperty('--position', `${value / 5 * 100}%`);
  control.dataset.effort = level.effort;
  paintTheme(index);
  range.setAttribute('aria-valuetext', `${level.label}，第 ${index + 1} 档，共 6 档`);
  if (index !== previousIndex) {
    swapLabel(level.label, index > previousIndex, previousIndex !== -1);
    selectedIndex = index;
    control.dispatchEvent(new CustomEvent('thinkingchange', {
      bubbles: true,
      detail: { index, effort: level.effort, label: level.label, highest: index === 5 }
    }));
  }
  // 按选中的档位判断；拖动到最高档时展开像素场，退出立即清空。
  pixels.setActive(index === levels.length - 1);
}

function finishDrag() {
  if (!dragging) return;
  dragging = false;
  control.removeAttribute('data-dragging');
  range.value = String(Math.round(Number(range.value)));
  updateDepth();
}

range.addEventListener('pointerdown', () => {
  dragging = true;
  control.setAttribute('data-dragging', '');
});
range.addEventListener('input', updateDepth);
document.addEventListener('pointerup', finishDrag);
document.addEventListener('pointercancel', finishDrag);
range.addEventListener('blur', finishDrag);
window.addEventListener('blur', finishDrag);
range.addEventListener('keydown', event => {
  const current = Math.round(Number(range.value));
  const keys = {
    ArrowRight: current + 1, ArrowUp: current + 1,
    ArrowLeft: current - 1, ArrowDown: current - 1,
    PageUp: current + 2, PageDown: current - 2, Home: 0, End: 5
  };
  if (!(event.key in keys)) return;
  event.preventDefault();
  range.value = String(clamp(keys[event.key], 0, 5));
  updateDepth();
  range.dispatchEvent(new Event('change', { bubbles: true }));
});
slider.addEventListener('pointermove', event => {
  const bounds = slider.getBoundingClientRect();
  slider.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
});

function closeColors() {
  colorPanel.hidden = true;
  colorButton.setAttribute('aria-expanded', 'false');
}
function positionColors() {
  if (colorPanel.hidden) return;
  const rect = control.getBoundingClientRect();
  const width = colorPanel.offsetWidth, height = colorPanel.offsetHeight;
  const left = Math.max(8, Math.min(rect.right - width, window.innerWidth - width - 8));
  const below = rect.bottom + 8;
  const top = below + height <= window.innerHeight - 8 ? below : Math.max(8, rect.top - height - 8);
  colorPanel.style.left = `${left}px`;
  colorPanel.style.top = `${top}px`;
}
colorButton.addEventListener('click', () => {
  colorPanel.hidden = !colorPanel.hidden;
  colorButton.setAttribute('aria-expanded', String(!colorPanel.hidden));
  positionColors();
});
window.addEventListener('resize', positionColors);
colorOptions.forEach(button => button.addEventListener('click', () => {
  setTheme(button.dataset.color);
  closeColors();
  colorButton.focus();
}));
customColor.addEventListener('input', () => setTheme(customColor.value));
document.addEventListener('pointerdown', event => {
  if (!colorButton.contains(event.target) && !colorPanel.contains(event.target)) closeColors();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !colorPanel.hidden) {
    closeColors();
    colorButton.focus();
  }
});
document.addEventListener('visibilitychange', () => pixels.sync());
reducedMotion.addEventListener('change', () => {
  labelAnimations.forEach(animation => animation.cancel());
  outgoing.textContent = '';
  pixels.sync();
});
new ResizeObserver(() => pixels.resize()).observe(slider);
setTheme(themeColor, false);
updateDepth();
