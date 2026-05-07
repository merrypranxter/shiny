const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(9,10,12,0.25)';
  ctx.fillRect(0, 0, W, H);
  // Draw sparkle field (naturally clusters where pseudoFbm > 0.58)
  drawSparkleField(ctx, W, H, time);
  // Contour lines at field band edges
  const step = 5;
  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      const v = pseudoFbm(x * 0.009, y * 0.009);
      const c = contourAmount(v, 12);
      if (c > 0.1) {
        const hue = (v * 280 + time * 20) % 360;
        ctx.fillStyle = `hsla(${hue},80%,60%,${c * 0.5})`;
        ctx.fillRect(x, y, step, step);
      }
    }
  }
  requestAnimationFrame(frame);
}
frame();
