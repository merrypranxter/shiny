const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(14,11,5,0.28)';
  ctx.fillRect(0, 0, W, H);
  // Find mold zones using cheapField and scatter glitter there
  const step = 40;
  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      const v = cheapField(x * 0.008, y * 0.008, time * 0.1);
      if (v > 0.55) {
        const hue = 60 + v * 80;
        drawDryGlitterDust(ctx, x + step / 2, y + step / 2, step * 0.7, 8, time, hue);
        if (v > 0.7 && Math.random() < 0.3) drawMiniGlint(ctx, x + Math.random() * step, y + Math.random() * step, 3);
      }
    }
  }
  requestAnimationFrame(frame);
}
frame();
