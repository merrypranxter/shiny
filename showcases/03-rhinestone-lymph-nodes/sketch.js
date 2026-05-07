const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let segs = [], bigNodes = [];

function walk(x, y, angle, steps, hue, thick, depth) {
  let cx = x, cy = y, a = angle;
  for (let s = 0; s < steps; s++) {
    a += (Math.random() - 0.5) * 0.5;
    const nx = cx + Math.cos(a) * (9 + Math.random() * 7);
    const ny = cy + Math.sin(a) * (9 + Math.random() * 7);
    segs.push({ x1: cx, y1: cy, x2: nx, y2: ny, hue, thick });
    if (s % 15 === 0) {
      bigNodes.push({ x: nx, y: ny, hue, r: 8 + Math.random() * 12 });
      if (depth < 2 && Math.random() < 0.5) {
        walk(nx, ny, a + (Math.random() - 0.5) * 1.8, Math.floor(steps * 0.5), (hue + 40) % 360, thick * 0.6, depth + 1);
      }
    }
    cx = nx; cy = ny;
  }
}

function init() {
  segs = []; bigNodes = [];
  for (let a = 0; a < 7; a++) {
    walk(W / 2, H / 2, (a / 7) * Math.PI * 2, 50, 290 + a * 10, 1.2, 0);
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(13,9,21,0.2)';
  ctx.fillRect(0, 0, W, H);
  for (const s of segs) drawLivingShineTube(ctx, s.x1, s.y1, s.x2, s.y2, s.thick, s.hue, time, 1);
  for (const n of bigNodes) drawRhinestoneNode(ctx, n.x, n.y, n.r, n.hue, time);
  requestAnimationFrame(frame);
}
frame();
