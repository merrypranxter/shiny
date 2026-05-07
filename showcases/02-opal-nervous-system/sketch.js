const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let segs = [], nodes = [];

function walk(x, y, angle, steps, hue, thick, depth) {
  const out = [];
  let cx = x, cy = y, a = angle;
  for (let s = 0; s < steps; s++) {
    a += (Math.random() - 0.5) * 0.42;
    const nx = cx + Math.cos(a) * (10 + Math.random() * 8);
    const ny = cy + Math.sin(a) * (10 + Math.random() * 8);
    out.push({ x1: cx, y1: cy, x2: nx, y2: ny, hue, thick: Math.max(0.6, thick - s * 0.04) });
    if (s % 6 === 0) {
      nodes.push({ x: nx, y: ny, hue, r: 5 + Math.random() * 9, id: nodes.length });
      if (depth < 3 && s > 3 && Math.random() < 0.5) {
        walk(nx, ny, a + (Math.random() - 0.5) * 1.6, Math.floor(steps * 0.5), (hue + 30) % 90 + 180, thick * 0.55, depth + 1)
          .forEach(r => out.push(r));
      }
    }
    cx = nx; cy = ny;
  }
  return out;
}

function init() {
  segs = []; nodes = [];
  for (let a = 0; a < 6; a++) {
    const angle = (a / 6) * Math.PI * 2;
    walk(W / 2, H / 2, angle, 45, 180 + (a / 6) * 90, 2.8, 0).forEach(s => segs.push(s));
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(8,6,16,0.18)';
  ctx.fillRect(0, 0, W, H);
  for (const s of segs) drawLivingShineTube(ctx, s.x1, s.y1, s.x2, s.y2, s.thick, s.hue, time, 0);
  for (const n of nodes) {
    const flash = Math.sin(time * 9 + n.id * 1.3);
    const r = n.r * (0.85 + 0.15 * flash);
    drawRhinestoneNode(ctx, n.x, n.y, r, n.hue, time);
  }
  requestAnimationFrame(frame);
}
frame();
