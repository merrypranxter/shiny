const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let segs = [], jewels = [];

function walk(x, y, angle, steps, hue, depth) {
  let cx = x, cy = y, a = angle;
  for (let s = 0; s < steps; s++) {
    a += (Math.random() - 0.5) * 0.5;
    const nx = cx + Math.cos(a) * (8 + Math.random() * 7);
    const ny = cy + Math.sin(a) * (8 + Math.random() * 7);
    segs.push({ x1: cx, y1: cy, x2: nx, y2: ny, hue, thick: Math.max(0.5, 2 - s * 0.04) });
    if (s % 8 === 0) {
      jewels.push({ x: nx, y: ny, hue, r: 3 + Math.random() * 3 });
      if (depth < 3 && Math.random() < 0.45) {
        walk(nx, ny, a + (Math.random() - 0.5) * 1.6, Math.floor(steps * 0.5), (hue + 30) % 360, depth + 1);
      }
    }
    cx = nx; cy = ny;
  }
}

function init() {
  segs = []; jewels = [];
  const centers = 4;
  for (let c = 0; c < centers; c++) {
    const x = W * (0.2 + 0.6 * (c / (centers - 1)));
    for (let a = 0; a < 6; a++) {
      walk(x, H / 2, (a / 6) * Math.PI * 2, 30, 260 + c * 20 + a * 10, 0);
    }
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(13,11,16,0.22)';
  ctx.fillRect(0, 0, W, H);
  for (const s of segs) drawLivingShineTube(ctx, s.x1, s.y1, s.x2, s.y2, s.thick, s.hue, time, 0);
  for (const j of jewels) drawRhinestoneNode(ctx, j.x, j.y, j.r, j.hue, time);
  requestAnimationFrame(frame);
}
frame();
