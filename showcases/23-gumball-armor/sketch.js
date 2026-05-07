const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let domes = [];

function init() {
  domes = [];
  const count = 50 + Math.floor(Math.random() * 20);
  let tries = 0;
  while (domes.length < count && tries < 3000) {
    tries++;
    const r = 25 + Math.random() * 30;
    const x = r + Math.random() * (W - r * 2);
    const y = r + Math.random() * (H - r * 2);
    let ok = true;
    for (const d of domes) {
      if (Math.hypot(d.x - x, d.y - y) < d.r + r + 3) { ok = false; break; }
    }
    if (ok) domes.push({ x, y, r, hue: Math.random() * 360 });
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(8,6,8,0.25)';
  ctx.fillRect(0, 0, W, H);
  for (const d of domes) {
    drawWetBlob(ctx, d.x, d.y, d.r, time, d.hue);
  }
  // Glitter dust between domes
  for (let i = 0; i < domes.length - 1; i++) {
    const a = domes[i], b = domes[i + 1];
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    drawDryGlitterDust(ctx, mx, my, 10, 6, time, (a.hue + b.hue) / 2);
  }
  requestAnimationFrame(frame);
}
frame();
