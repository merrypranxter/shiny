const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let grid = null;

function init() {
  grid = makeLightCityGrid(W, H, 14, 10);
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(8,9,9,0.28)';
  ctx.fillRect(0, 0, W, H);
  for (const e of grid.edges) {
    const a = grid.nodes[e[0]], b = grid.nodes[e[1]];
    const hue = e[2] === 'street' ? (190 + time * 12) % 360 : (310 + time * 18) % 360;
    drawStitchedLine(ctx, a.x, a.y, b.x, b.y, time, hue);
  }
  for (const n of grid.nodes) {
    const r = n.hub ? 7 : 4;
    drawRhinestoneNode(ctx, n.x, n.y, r, n.hub ? 50 : 205, time);
  }
  requestAnimationFrame(frame);
}
frame();
