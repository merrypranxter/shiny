const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(26,21,16,0.3)';
  ctx.fillRect(0, 0, W, H);
  const step = 5;
  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      const v = pseudoFbm(x * 0.007, y * 0.007);
      const blob = pseudoFbm((x - W / 2) * 0.003, (y - H / 2) * 0.003);
      if (blob > 0.42) {
        // Rust reds or interference blues
        const hueShift = v > 0.55 ? -220 : 170;
        const col = metallicPalette(v, hueShift);
        ctx.fillStyle = col;
        ctx.globalAlpha = 0.45 + 0.3 * v;
        ctx.fillRect(x, y, step, step);
        ctx.globalAlpha = 1;
      }
    }
  }
  requestAnimationFrame(frame);
}
frame();
