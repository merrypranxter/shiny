const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let segs = [], nodes = [];

function grow(x, y, angle, steps, hue, thick, depth) {
  let cx = x, cy = y, a = angle;
  for (let s = 0; s < steps; s++) {
    a += (Math.random() - 0.5) * 0.35;
    const step = 8 + Math.random() * 7;
    const nx = cx + Math.cos(a) * step;
    const ny = cy + Math.sin(a) * step;
    segs.push({ x1: cx, y1: cy, x2: nx, y2: ny, hue, thick: Math.max(0.8, thick - s * 0.05) });
    if (s % 8 === 0 && depth < 3 && Math.random() < 0.5) {
      const side = Math.random() < 0.5 ? 1 : -1;
      grow(nx, ny, a + side * (0.5 + Math.random() * 0.8), Math.floor(steps * 0.55),
        hue + side * 10, thick * 0.65, depth + 1);
    }
    cx = nx; cy = ny;
  }
  nodes.push({ x: cx, y: cy, hue, r: 2 + thick });
}

function init() {
  segs = []; nodes = [];
  for (let i = 0; i < 8; i++) {
    grow(W * (0.1 + 0.8 * (i / 8)), H, -Math.PI / 2 + (Math.random() - 0.5) * 0.6,
      35 + Math.floor(Math.random() * 20), 195 + i * 5, 3, 0);
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(8,9,14,0.2)';
  ctx.fillRect(0, 0, W, H);
  for (const s of segs) drawLivingShineTube(ctx, s.x1, s.y1, s.x2, s.y2, s.thick, s.hue, time, 0);
  for (const n of nodes) drawRhinestoneNode(ctx, n.x, n.y, n.r, n.hue, time);
  requestAnimationFrame(frame);
}
frame();
