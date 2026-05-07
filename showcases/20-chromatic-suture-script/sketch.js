const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let paths = [];

function init() {
  paths = [];
  for (let r = 0; r < 18; r++) {
    const pts = [];
    const y0 = H * (0.05 + 0.9 * (r / 18));
    for (let x = 20; x < W - 20; x += 14) {
      pts.push({ x, y: y0 + 30 * Math.sin(x * 0.03 + r * 1.1) + 20 * Math.sin(x * 0.07 + r * 0.7) });
    }
    paths.push({ pts, hue: (r * 22) % 360 });
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(30,21,16,0.22)';
  ctx.fillRect(0, 0, W, H);
  for (const p of paths) {
    for (let i = 0; i < p.pts.length - 1; i++) {
      const a = p.pts[i], b = p.pts[i + 1];
      drawStitchedLine(ctx, a.x, a.y, b.x, b.y, time, (p.hue + i * 3) % 360);
    }
  }
  requestAnimationFrame(frame);
}
frame();
