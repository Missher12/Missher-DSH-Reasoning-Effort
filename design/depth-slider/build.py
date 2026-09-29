from pathlib import Path

root = Path(__file__).resolve().parent
source = root / 'src'
html = (source / 'index.template.html').read_text(encoding='utf-8')
for marker, filename in (
    ('__THEMES__', 'themes.js'),
    ('__PIXEL_ENGINE__', 'pixel-engine.js'),
    ('__CONTROLLER__', 'controller.js'),
):
    html = html.replace(marker, (source / filename).read_text(encoding='utf-8'))
(root / 'index.html').write_text(html, encoding='utf-8')
print('Built index.html')
