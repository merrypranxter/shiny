const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(13,12,16,0.3)';
  ctx.fillRect(0, 0, W, H);
  const step = 5;
  const pulse = Math.sin(time * 1.5) * 0.5 + 0.5;
  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      const v = pseudoFbm(x * 0.007 + time * 0.015, y * 0.007);
      const c = contourAmount(v + pulse * 0.04, 15);
      if (c > 0.06) {
        const hue = 160 + v * 60;
        ctx.fillStyle = `hsla(${hue},85%,${55 + c * 25}%,${c * 0.8})`;
        ctx.fillRect(x, y, step, step);
      }
    }
  }
  requestAnimationFrame(frame);
}
frame();
