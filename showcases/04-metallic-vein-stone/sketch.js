const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let segs = [];

function init() {
  segs = [];
  ctx.fillStyle = '#2a2520';
  ctx.fillRect(0, 0, W, H);
  // Stone texture
  for (let i = 0; i < 8000; i++) {
    const tx = Math.random() * W, ty = Math.random() * H;
    const v = 0.06 + Math.random() * 0.08;
    ctx.fillStyle = `rgba(${Math.floor(v*255)},${Math.floor(v*230)},${Math.floor(v*200)},0.25)`;
    ctx.fillRect(tx, ty, 2 + Math.random() * 3, 1);
  }
  // Vein walkers
  for (let v = 0; v < 12; v++) {
    let x = Math.random() * W, y = Math.random() * H;
    let a = Math.random() * Math.PI * 2;
    const hue = 35 + Math.random() * 25;
    const steps = 60 + Math.random() * 80;
    for (let s = 0; s < steps; s++) {
      a += (Math.random() - 0.5) * 0.38;
      const nx = x + Math.cos(a) * (6 + Math.random() * 6);
      const ny = y + Math.sin(a) * (6 + Math.random() * 6);
      segs.push({ x1: x, y1: y, x2: nx, y2: ny, hue, w: 2 + Math.random() * 2 });
      x = nx; y = ny;
    }
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(42,37,32,0.04)';
  ctx.fillRect(0, 0, W, H);
  for (const s of segs) drawSeamGlow(ctx, s.x1, s.y1, s.x2, s.y2, s.w);
  requestAnimationFrame(frame);
}
frame();
