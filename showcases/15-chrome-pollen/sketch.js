const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let clusters = [];

function init() {
  clusters = [];
  const count = 10 + Math.floor(Math.random() * 5);
  for (let i = 0; i < count; i++) {
    clusters.push({
      x: W * (0.05 + 0.9 * Math.random()),
      y: H * (0.05 + 0.9 * Math.random()),
      r: 40 + Math.random() * 70,
      hue: 185 + Math.random() * 35,
      central: Math.random() < 0.4
    });
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(26,24,14,0.22)';
  ctx.fillRect(0, 0, W, H);
  for (const cl of clusters) {
    drawDryGlitterDust(ctx, cl.x, cl.y, cl.r, 60, time, cl.hue);
    if (cl.central) drawMiniGlint(ctx, cl.x, cl.y, 6);
    drawRhinestoneNode(ctx, cl.x, cl.y, 4, cl.hue + 20, time);
  }
  requestAnimationFrame(frame);
}
frame();
