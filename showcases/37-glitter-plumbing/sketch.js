const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let pipes = [], valves = [];

function init() {
  pipes = []; valves = [];
  const hStep = W / 8, vStep = H / 6;
  for (let r = 1; r < 6; r++) {
    const y = r * vStep;
    for (let c = 0; c < 8; c++) {
      pipes.push({ a: { x: c * hStep, y }, b: { x: (c + 1) * hStep, y }, id: r * 10 + c });
    }
  }
  for (let c = 1; c < 8; c++) {
    const x = c * hStep;
    for (let r = 0; r < 6; r++) {
      pipes.push({ a: { x, y: r * vStep }, b: { x, y: (r + 1) * vStep }, id: c * 100 + r });
    }
  }
  for (let c = 1; c < 8; c++) {
    for (let r = 1; r < 6; r++) {
      if (Math.random() < 0.35) {
        valves.push({ x: c * hStep, y: r * vStep, hue: (c * 40 + r * 60) % 360 });
      }
    }
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(12,12,14,0.28)';
  ctx.fillRect(0, 0, W, H);
  for (const p of pipes) drawChromeConduit(ctx, p.a, p.b, time, p.id);
  for (const p of pipes) drawPulseOnEdge(ctx, p.a, p.b, time, p.id);
  for (const v of valves) drawRhinestoneNode(ctx, v.x, v.y, 6, v.hue, time);
  requestAnimationFrame(frame);
}
frame();
