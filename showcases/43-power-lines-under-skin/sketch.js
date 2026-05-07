const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let lines = [];

function init() {
  lines = [];
  // Horizontal lines
  for (let y = 30; y < H; y += 35) {
    lines.push({ x1: 0, y1: y, x2: W, y2: y, hue: 210 + Math.random() * 30 });
  }
  // Diagonal lines
  for (let i = 0; i < 20; i++) {
    const x0 = Math.random() * W;
    const y0 = 0;
    lines.push({ x1: x0, y1: y0, x2: x0 + W * 0.4 * (Math.random() - 0.5), y2: H, hue: 200 + Math.random() * 40 });
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(26,18,8,0.22)';
  ctx.fillRect(0, 0, W, H);
  for (const l of lines) drawBuriedLightLine(ctx, l.x1, l.y1, l.x2, l.y2, l.hue);
  // Cloudy veil to bury them
  drawCloudyVeil(ctx, W, H);
  drawCloudyVeil(ctx, W, H);
  requestAnimationFrame(frame);
}
frame();
