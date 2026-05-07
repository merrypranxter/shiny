const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let edges = [];

function init() {
  edges = [];
  const pts = makeRandomPoints(55, W, H);
  const nn = nearestNeighbors(pts, 4);
  nn.forEach((pair, i) => {
    edges.push({ x1: pair[0].x, y1: pair[0].y, x2: pair[1].x, y2: pair[1].y, hue: (i * 47) % 360 });
  });
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(20,18,26,0.22)';
  ctx.fillRect(0, 0, W, H);
  for (const e of edges) drawStitchedLine(ctx, e.x1, e.y1, e.x2, e.y2, time, e.hue);
  requestAnimationFrame(frame);
}
frame();
