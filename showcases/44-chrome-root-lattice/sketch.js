const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let roots = [], horizontals = [];

function grow(x, y, angle, steps, id, depth) {
  let cx = x, cy = y, a = angle;
  for (let s = 0; s < steps; s++) {
    a += (Math.random() - 0.5) * 0.4;
    const nx = cx + Math.cos(a) * (7 + Math.random() * 7);
    const ny = cy + Math.sin(a) * (9 + Math.random() * 6);
    roots.push({ a: { x: cx, y: cy }, b: { x: nx, y: ny }, id: id + s });
    // Occasional horizontal run
    if (s % 10 === 0 && Math.random() < 0.5) {
      const side = Math.random() < 0.5 ? 1 : -1;
      const hlen = 40 + Math.random() * 80;
      horizontals.push({ a: { x: nx, y: ny }, b: { x: nx + side * hlen, y: ny }, id: id + s + 500 });
    }
    if (depth < 3 && s % 12 === 0 && Math.random() < 0.4) {
      grow(nx, ny, a + (Math.random() - 0.5) * 0.9, Math.floor(steps * 0.5), id + s * 10, depth + 1);
    }
    cx = nx; cy = ny;
    if (cy > H + 20) break;
  }
}

function init() {
  roots = []; horizontals = [];
  for (let i = 0; i < 8; i++) {
    grow(W * (0.1 + 0.8 * (i / 8)), 0, Math.PI / 2 + (Math.random() - 0.5) * 0.5, 40, i * 1000, 0);
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(12,10,8,0.25)';
  ctx.fillRect(0, 0, W, H);
  for (const r of roots) drawChromeConduit(ctx, r.a, r.b, time, r.id);
  for (const h of horizontals) drawChromeConduit(ctx, h.a, h.b, time, h.id);
  for (const r of roots) if (Math.random() < 0.02) drawPulseOnEdge(ctx, r.a, r.b, time, r.id);
  requestAnimationFrame(frame);
}
frame();
