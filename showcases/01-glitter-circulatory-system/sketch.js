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
    a += (Math.random() - 0.5) * 0.5;
    const nx = cx + Math.cos(a) * (11 + Math.random() * 9);
    const ny = cy + Math.sin(a) * (11 + Math.random() * 9);
    out.push({ x1: cx, y1: cy, x2: nx, y2: ny, hue, thick: Math.max(0.7, thick - s * 0.05) });
    if (s % 7 === 0) {
      nodes.push({ x: nx, y: ny, hue: hue + 20, r: 3 + Math.random() * 6 });
      if (depth < 2 && s > 4 && Math.random() < 0.45) {
        walk(nx, ny, a + (Math.random() - 0.5) * 1.5, Math.floor(steps * 0.55), hue + 28, thick * 0.6, depth + 1)
          .forEach(r => out.push(r));
      }
    }
    cx = nx; cy = ny;
  }
  return out;
}

function init() {
  segs = []; nodes = [];
  for (let a = 0; a < 8; a++) {
    const angle = (a / 8) * Math.PI * 2;
    walk(W / 2, H / 2, angle, 42, 280 + (a / 8) * 58, 3.5, 0).forEach(s => segs.push(s));
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(26,16,34,0.18)';
  ctx.fillRect(0, 0, W, H);
  for (const s of segs) drawLivingShineTube(ctx, s.x1, s.y1, s.x2, s.y2, s.thick, s.hue, time, 0);
  for (const n of nodes) drawRhinestoneNode(ctx, n.x, n.y, n.r, n.hue, time);
  for (let i = 0; i < segs.length; i += 3) {
    const s = segs[i], ph = fract(time * 0.38 + i * 0.073);
    drawMiniGlint(ctx, s.x1 + (s.x2 - s.x1) * ph, s.y1 + (s.y2 - s.y1) * ph, 2);
  }
  requestAnimationFrame(frame);
}
frame();
