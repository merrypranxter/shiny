const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let grid = null;

function init() {
  grid = makeLightCityGrid(W, H, 12, 8);
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(8,9,12,0.28)';
  ctx.fillRect(0, 0, W, H);
  for (const e of grid.edges) {
    const a = grid.nodes[e[0]], b = grid.nodes[e[1]];
    if (e[2] === 'street') {
      drawLightRibbon(ctx, a, b, (190 + time * 15) % 360, (210 + time * 15) % 360);
    } else {
      drawLightRibbon(ctx, a, b, (310 + time * 20) % 360, (330 + time * 20) % 360);
    }
  }
  for (const n of grid.nodes) {
    const r = n.hub ? 6 : 3;
    drawRhinestoneNode(ctx, n.x, n.y, r, n.hub ? 60 : 200, time);
  }
  requestAnimationFrame(frame);
}
frame();
