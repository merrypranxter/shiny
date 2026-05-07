const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let edges = [];

function init() {
  edges = [];
  const cx = W / 2, cy = H / 2;
  const size = Math.min(W, H) * 0.55;
  // Rhombus grid at 36/72 degree angles
  for (let angle = 0; angle < 360; angle += 36) {
    const rad = angle * Math.PI / 180;
    const rad2 = (angle + 72) * Math.PI / 180;
    for (let i = -8; i <= 8; i++) {
      for (let j = -8; j <= 8; j++) {
        const x1 = cx + (i * Math.cos(rad) + j * Math.cos(rad2)) * 45;
        const y1 = cy + (i * Math.sin(rad) + j * Math.sin(rad2)) * 45;
        const x2 = x1 + Math.cos(rad) * 45;
        const y2 = y1 + Math.sin(rad) * 45;
        const x3 = x1 + Math.cos(rad2) * 45;
        const y3 = y1 + Math.sin(rad2) * 45;
        const d = Math.hypot(x1 - cx, y1 - cy);
        if (d < size) {
          const hue = (angle * 4 + i * 20 + j * 17) % 360;
          edges.push({ a: { x: x1, y: y1 }, b: { x: x2, y: y2 }, hueA: hue, hueB: (hue + 60) % 360 });
          edges.push({ a: { x: x1, y: y1 }, b: { x: x3, y: y3 }, hueA: hue, hueB: (hue + 90) % 360 });
        }
      }
    }
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(9,8,14,0.25)';
  ctx.fillRect(0, 0, W, H);
  for (const e of edges) {
    drawLightRibbon(ctx, e.a, e.b, (e.hueA + time * 20) % 360, (e.hueB + time * 20) % 360);
  }
  requestAnimationFrame(frame);
}
frame();
