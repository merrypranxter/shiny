const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(8,8,16,0.35)';
  ctx.fillRect(0, 0, W, H);
  const step = 6;
  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      const v = heightAt(x, y, time);
      const c = contourAmount(v, 20);
      if (c > 0.05) {
        const col = metallicPalette(v, 0);
        ctx.fillStyle = col;
        ctx.globalAlpha = c * 0.85;
        ctx.fillRect(x, y, step, step);
        ctx.globalAlpha = 1;
      }
    }
  }
  requestAnimationFrame(frame);
}
frame();
