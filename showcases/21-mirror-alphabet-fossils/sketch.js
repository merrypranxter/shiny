const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let letterSegs = [];

function init() {
  letterSegs = [];
  ctx.fillStyle = '#e8dfc4';
  ctx.fillRect(0, 0, W, H);
  // Simple letter-like stick shapes on a grid
  const cols = Math.floor(W / 80), rows = Math.floor(H / 100);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = 40 + c * 80, cy = 50 + r * 100;
      const shape = (r * cols + c) % 6;
      if (shape === 0) {
        letterSegs.push({ x1: cx - 20, y1: cy - 30, x2: cx + 20, y2: cy - 30 });
        letterSegs.push({ x1: cx, y1: cy - 30, x2: cx, y2: cy + 30 });
      } else if (shape === 1) {
        letterSegs.push({ x1: cx - 20, y1: cy - 30, x2: cx - 20, y2: cy + 30 });
        letterSegs.push({ x1: cx - 20, y1: cy, x2: cx + 20, y2: cy });
      } else if (shape === 2) {
        letterSegs.push({ x1: cx - 20, y1: cy - 30, x2: cx + 20, y2: cy + 30 });
        letterSegs.push({ x1: cx + 20, y1: cy - 30, x2: cx - 20, y2: cy + 30 });
      } else if (shape === 3) {
        letterSegs.push({ x1: cx - 20, y1: cy - 30, x2: cx + 20, y2: cy - 30 });
        letterSegs.push({ x1: cx + 20, y1: cy - 30, x2: cx + 20, y2: cy + 30 });
        letterSegs.push({ x1: cx - 20, y1: cy + 30, x2: cx + 20, y2: cy + 30 });
      } else if (shape === 4) {
        letterSegs.push({ x1: cx - 20, y1: cy - 30, x2: cx + 20, y2: cy });
        letterSegs.push({ x1: cx + 20, y1: cy, x2: cx - 20, y2: cy + 30 });
      } else {
        letterSegs.push({ x1: cx - 20, y1: cy - 30, x2: cx + 20, y2: cy - 30 });
        letterSegs.push({ x1: cx - 20, y1: cy - 30, x2: cx - 20, y2: cy });
        letterSegs.push({ x1: cx - 20, y1: cy, x2: cx + 20, y2: cy });
        letterSegs.push({ x1: cx + 20, y1: cy, x2: cx + 20, y2: cy + 30 });
        letterSegs.push({ x1: cx - 20, y1: cy + 30, x2: cx + 20, y2: cy + 30 });
      }
    }
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(232,223,196,0.07)';
  ctx.fillRect(0, 0, W, H);
  // Draw letter structures with glitter
  for (const s of letterSegs) {
    const hue = (s.x1 * 0.5 + s.y1 * 0.3 + time * 8) % 360;
    drawGlitterGlyphStroke(ctx, s.x1, s.y1, s.x2, s.y2, time, hue);
  }
  // Cloudy veil over them
  drawCloudyVeil(ctx, W, H);
  requestAnimationFrame(frame);
}
frame();
