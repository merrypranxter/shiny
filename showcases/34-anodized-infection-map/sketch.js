const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(8,12,10,0.3)';
  ctx.fillRect(0, 0, W, H);
  const step = 5;
  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      const v = cheapField(x * 0.01, y * 0.01, time * 0.06);
      if (v > 0.52) {
        const col = metallicPalette((v - 0.52) * 2, -60);
        ctx.fillStyle = col;
        ctx.globalAlpha = 0.6;
        ctx.fillRect(x, y, step, step);
        ctx.globalAlpha = 1;
      }
      // Edge glints
      if (v > 0.515 && v < 0.525 && Math.random() < 0.04) {
        drawMiniGlint(ctx, x, y, 3);
      }
    }
  }
  requestAnimationFrame(frame);
}
frame();
