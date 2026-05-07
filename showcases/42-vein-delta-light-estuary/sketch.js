const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let mainSegs = [], tributarySegs = [];

function flow(x, y, angle, steps, hue, thick, isMain) {
  let cx = x, cy = y, a = angle;
  for (let s = 0; s < steps; s++) {
    const noise = pseudoFbm(cx * 0.005, cy * 0.005);
    a += (noise - 0.5) * 0.5;
    const nx = cx + Math.cos(a) * (8 + Math.random() * 6);
    const ny = cy + Math.sin(a) * (10 + Math.random() * 5);
    const seg = { x1: cx, y1: cy, x2: nx, y2: ny, hue, thick };
    if (isMain) mainSegs.push(seg); else tributarySegs.push(seg);
    if (isMain && s % 10 === 0 && Math.random() < 0.7) {
      flow(nx, ny, a + (Math.random() - 0.5) * 1.2, Math.floor(steps * 0.5), hue + 15, thick * 0.5, false);
    }
    cx = nx; cy = ny;
    if (cy > H + 20) break;
  }
}

function init() {
  mainSegs = []; tributarySegs = [];
  const channels = 5;
  for (let i = 0; i < channels; i++) {
    const angle = Math.PI / 2 + (i - (channels - 1) / 2) * 0.18;
    flow(W / 2 + (i - channels / 2) * 30, 0, angle, 55, 120 + i * 20, 2.5 + (channels - i) * 0.4, true);
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(16,18,10,0.2)';
  ctx.fillRect(0, 0, W, H);
  for (const s of tributarySegs) drawLivingShineTube(ctx, s.x1, s.y1, s.x2, s.y2, s.thick, s.hue, time, 1);
  for (const s of mainSegs) drawLivingShineTube(ctx, s.x1, s.y1, s.x2, s.y2, s.thick, s.hue, time, 0);
  // Glitter at estuary bottom
  for (let i = 0; i < 20; i++) {
    if (Math.random() < 0.5) drawDryGlitterDust(ctx, W * Math.random(), H - Math.random() * 80, 25, 8, time, 140 + Math.random() * 40);
  }
  requestAnimationFrame(frame);
}
frame();
