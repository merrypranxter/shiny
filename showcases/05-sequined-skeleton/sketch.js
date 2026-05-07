const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let bones = [];

function init() {
  bones = [];
  const cx = W / 2, cy = H / 2;
  // Spine
  for (let i = -10; i <= 10; i++) {
    bones.push({ type: 'seg', x1: cx, y1: cy + i * 28, x2: cx, y2: cy + (i + 1) * 28, hue: 215 });
  }
  // Ribs
  for (let r = -7; r <= 7; r++) {
    if (r === 0) continue;
    const ry = cy + r * 24;
    for (let side = -1; side <= 1; side += 2) {
      const pts = [];
      for (let t = 0; t <= 20; t++) {
        const tt = t / 20;
        pts.push({
          x: cx + side * (40 + 70 * Math.sin(tt * Math.PI)),
          y: ry + 12 * Math.sin(tt * Math.PI * 2)
        });
      }
      for (let p = 0; p < pts.length - 1; p++) {
        bones.push({ type: 'seg', x1: pts[p].x, y1: pts[p].y, x2: pts[p+1].x, y2: pts[p+1].y, hue: 200 + Math.random() * 40 });
      }
    }
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(24,20,13,0.22)';
  ctx.fillRect(0, 0, W, H);
  for (const b of bones) {
    const flash = 0.5 + 0.5 * Math.sin(time * 3 + b.x1 * 0.02);
    const steps = Math.ceil(Math.hypot(b.x2 - b.x1, b.y2 - b.y1) / 6);
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = b.x1 + (b.x2 - b.x1) * t;
      const y = b.y1 + (b.y2 - b.y1) * t;
      const r = 1.5 + flash * 1.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${b.hue + flash * 30},90%,${55 + flash * 35}%,${0.5 + flash * 0.4})`;
      ctx.fill();
    }
  }
  requestAnimationFrame(frame);
}
frame();
