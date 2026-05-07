const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let lenses = [];

function init() {
  lenses = [];
  for (let i = 0; i < 20; i++) {
    lenses.push({
      x: W * (0.05 + 0.9 * Math.random()),
      y: H * (0.05 + 0.9 * Math.random()),
      r: 40 + Math.random() * 80,
      hue: Math.random() * 360
    });
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  // Animated iridescent background
  ctx.fillStyle = 'rgba(10,8,20,0.3)';
  ctx.fillRect(0, 0, W, H);
  const step = 8;
  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      const v = pseudoFbm(x * 0.012 + time * 0.02, y * 0.012);
      if (v > 0.45) {
        ctx.fillStyle = `hsla(${(v * 360 + time * 40) % 360},80%,30%,0.2)`;
        ctx.fillRect(x, y, step, step);
      }
    }
  }
  // Draw lens overlays
  for (const l of lenses) {
    const hShift = (time * 25 + l.hue) % 360;
    const g = ctx.createRadialGradient(l.x - l.r * 0.3, l.y - l.r * 0.35, 0, l.x, l.y, l.r);
    g.addColorStop(0, `hsla(${hShift},100%,90%,0.35)`);
    g.addColorStop(0.3, `hsla(${(hShift + 90) % 360},100%,55%,0.18)`);
    g.addColorStop(0.7, `hsla(${(hShift + 180) % 360},100%,30%,0.1)`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(l.x, l.y, l.r, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = `hsla(${hShift},100%,80%,0.4)`;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(l.x, l.y, l.r, 0, Math.PI * 2); ctx.stroke();
  }
  requestAnimationFrame(frame);
}
frame();
