const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let segs = [];

function init() {
  segs = [];
  // Stone texture
  ctx.fillStyle = '#1e1c18';
  ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 12000; i++) {
    const v = 0.04 + Math.random() * 0.06;
    ctx.fillStyle = `rgba(${Math.floor(v*255)},${Math.floor(v*235)},${Math.floor(v*200)},0.2)`;
    ctx.fillRect(Math.random() * W, Math.random() * H, 2 + Math.random() * 4, 1);
  }
  // Many vein walkers
  for (let v = 0; v < 20; v++) {
    let x = Math.random() * W, y = Math.random() * H;
    let a = Math.random() * Math.PI * 2;
    const hue = [30, 50, 200, 40][Math.floor(Math.random() * 4)];
    const steps = 40 + Math.floor(Math.random() * 60);
    for (let s = 0; s < steps; s++) {
      a += (Math.random() - 0.5) * 0.4;
      const nx = x + Math.cos(a) * (5 + Math.random() * 5);
      const ny = y + Math.sin(a) * (5 + Math.random() * 5);
      segs.push({ x1: x, y1: y, x2: nx, y2: ny, t: 0.5 + Math.random() * 1.5, hue });
      x = nx; y = ny;
    }
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(30,28,24,0.06)';
  ctx.fillRect(0, 0, W, H);
  for (const s of segs) drawShinyVeinStroke(ctx, s.x1, s.y1, s.x2, s.y2, s.t, s.hue);
  requestAnimationFrame(frame);
}
frame();
