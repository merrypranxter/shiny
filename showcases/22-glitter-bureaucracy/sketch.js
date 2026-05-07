const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let glyphs = [], rhinestones = [];

function init() {
  glyphs = []; rhinestones = [];
  const cellW = 120, cellH = 90;
  const cols = Math.floor(W / cellW), rows = Math.floor(H / cellH);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x0 = c * cellW + 10, y0 = r * cellH + 10;
      const x1 = x0 + cellW - 20, y1 = y0 + cellH - 20;
      const hue = (c * 37 + r * 53) % 360;
      // Outer rect
      glyphs.push({ x1: x0, y1: y0, x2: x1, y2: y0, hue });
      glyphs.push({ x1: x1, y1: y0, x2: x1, y2: y1, hue });
      glyphs.push({ x1: x1, y1: y1, x2: x0, y2: y1, hue });
      glyphs.push({ x1: x0, y1: y1, x2: x0, y2: y0, hue });
      // Inner detail
      const mx = (x0 + x1) / 2, my = (y0 + y1) / 2;
      glyphs.push({ x1: x0 + 10, y1: my, x2: x1 - 10, y2: my, hue: (hue + 60) % 360 });
      rhinestones.push({ x: x0, y: y0, hue }); rhinestones.push({ x: x1, y: y0, hue });
      rhinestones.push({ x: x0, y: y1, hue }); rhinestones.push({ x: x1, y: y1, hue });
    }
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(14,12,9,0.22)';
  ctx.fillRect(0, 0, W, H);
  for (const g of glyphs) drawGlitterGlyphStroke(ctx, g.x1, g.y1, g.x2, g.y2, time, g.hue);
  for (const n of rhinestones) drawRhinestoneNode(ctx, n.x, n.y, 3, n.hue, time);
  requestAnimationFrame(frame);
}
frame();
