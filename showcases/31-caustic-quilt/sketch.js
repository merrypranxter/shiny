const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let edges = [];

function init() {
  edges = [];
  const pts = makeRandomPoints(60, W, H);
  nearestNeighbors(pts, 3).forEach((pair, i) => {
    edges.push({ x1: pair[0].x, y1: pair[0].y, x2: pair[1].x, y2: pair[1].y, idx: i });
  });
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(14,12,10,0.22)';
  ctx.fillRect(0, 0, W, H);
  for (const e of edges) {
    const flash = 0.4 + 0.6 * Math.sin(time * 3 + e.x1 * 0.02 + e.y1 * 0.015);
    // Caustic halo
    ctx.strokeStyle = `rgba(255,250,200,${flash * 0.08})`;
    ctx.lineWidth = 8;
    ctx.beginPath(); ctx.moveTo(e.x1, e.y1); ctx.lineTo(e.x2, e.y2); ctx.stroke();
    // Core bright line
    ctx.strokeStyle = `rgba(255,255,230,${0.5 + flash * 0.4})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(e.x1, e.y1); ctx.lineTo(e.x2, e.y2); ctx.stroke();
    if (flash > 0.88) drawMiniGlint(ctx, (e.x1 + e.x2) / 2, (e.y1 + e.y2) / 2, 4);
  }
  requestAnimationFrame(frame);
}
frame();
