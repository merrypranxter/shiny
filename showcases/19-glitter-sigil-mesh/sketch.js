const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let sigilPts = [];

function init() {
  sigilPts = [];
  const count = 6 + Math.floor(Math.random() * 3);
  for (let i = 0; i < count; i++) {
    sigilPts.push({
      x: W * (0.1 + 0.8 * Math.random()),
      y: H * (0.1 + 0.8 * Math.random()),
      r: 50 + Math.random() * 70,
      seed: Math.random() * 100
    });
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(6,4,8,0.22)';
  ctx.fillRect(0, 0, W, H);
  // Draw connecting glyph strokes between sigil centers
  for (let i = 0; i < sigilPts.length; i++) {
    for (let j = i + 1; j < sigilPts.length; j++) {
      const hue = (i * 43 + j * 79 + time * 15) % 360;
      drawGlitterGlyphStroke(ctx, sigilPts[i].x, sigilPts[i].y, sigilPts[j].x, sigilPts[j].y, time, hue);
    }
  }
  // Draw sigils
  for (const s of sigilPts) drawSigil(ctx, s.x, s.y, s.r, time, s.seed);
  requestAnimationFrame(frame);
}
frame();
