/* System 13 – Shine-As-Woven Structure
   Principle: shine becomes textile geometry */

const canvas = document.getElementById('c');
const ctx    = canvas.getContext('2d');
let W, H, time = 0;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

// Basket-weave: horizontal ribbons and vertical ribbons with over/under logic
function drawHoloBasketWeave() {
  const ribbonW = 18;
  const gap     = 6;
  const pitch   = ribbonW + gap;
  const cols    = Math.ceil(W / pitch) + 1;
  const rows    = Math.ceil(H / pitch) + 1;

  // Draw horizontal ribbons first (under-pass only)
  for (let r = 0; r < rows; r++) {
    const y    = r * pitch - (time * 14 % pitch);
    const hue  = (r * 29 + time * 18) % 360;
    // Draw under segments (between vertical ribbon positions)
    for (let c = 0; c < cols; c++) {
      const x  = c * pitch;
      const over = (r + c) % 2 === 0;
      if (!over) {
        drawRibbonSegment(ctx, x, y, x + pitch, y, ribbonW * 0.5, hue, time, false);
      }
    }
    // Draw full ribbon (over segments rendered on top)
    for (let c = 0; c < cols; c++) {
      const x  = c * pitch;
      const over = (r + c) % 2 === 0;
      if (over) {
        drawRibbonSegment(ctx, x, y, x + pitch, y, ribbonW * 0.5, hue, time, true);
      }
    }
  }

  // Draw vertical ribbons
  for (let c = 0; c < cols; c++) {
    const x   = c * pitch - (time * 10 % pitch);
    const hue = (c * 41 + 180 + time * 22) % 360;
    for (let r = 0; r < rows; r++) {
      const y    = r * pitch;
      const over = (r + c) % 2 !== 0;
      drawRibbonSegment(ctx, x, y, x, y + pitch, ribbonW * 0.5, hue, time, over);
    }
  }
}

function loop() {
  time += 0.007;

  ctx.fillStyle = 'rgba(10,8,15,0.35)';
  ctx.fillRect(0, 0, W, H);

  drawHoloBasketWeave();

  requestAnimationFrame(loop);
}

window.addEventListener('resize', resize);
resize();
ctx.fillStyle = '#0a080f';
ctx.fillRect(0, 0, W, H);
requestAnimationFrame(loop);
