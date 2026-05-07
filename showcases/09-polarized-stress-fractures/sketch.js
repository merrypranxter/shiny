const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let segs = [];

function init() {
  segs = [];
  ctx.fillStyle = '#c8d4e0';
  ctx.fillRect(0, 0, W, H);
  for (let o = 0; o < 4; o++) {
    const ox = W * (0.1 + 0.8 * Math.random());
    const oy = H * (0.1 + 0.8 * Math.random());
    for (let a = 0; a < 8; a++) {
      let x = ox, y = oy, angle = (a / 8) * Math.PI * 2;
      for (let s = 0; s < 40; s++) {
        angle += (Math.random() - 0.5) * 0.4;
        const nx = x + Math.cos(angle) * (5 + Math.random() * 5);
        const ny = y + Math.sin(angle) * (5 + Math.random() * 5);
        segs.push({ x1: x, y1: y, x2: nx, y2: ny, ox, oy });
        x = nx; y = ny;
      }
    }
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(200,212,224,0.08)';
  ctx.fillRect(0, 0, W, H);
  for (const s of segs) {
    // Draw crack
    ctx.strokeStyle = 'rgba(40,30,60,0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(s.x1, s.y1); ctx.lineTo(s.x2, s.y2); ctx.stroke();
    // Rainbow halos
    const dist = Math.hypot(s.x1 - s.ox, s.y1 - s.oy);
    for (let ring = 1; ring <= 3; ring++) {
      const hue = (dist * 0.8 + ring * 40 + time * 60) % 360;
      ctx.strokeStyle = `hsla(${hue},100%,50%,${0.06 - ring * 0.015})`;
      ctx.lineWidth = ring * 2.5;
      ctx.beginPath(); ctx.moveTo(s.x1, s.y1); ctx.lineTo(s.x2, s.y2); ctx.stroke();
    }
  }
  requestAnimationFrame(frame);
}
frame();
