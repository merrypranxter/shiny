/* System 20 – Shine-As-Metallic Gradient Sculpture
   Principle: fake volumetric form through metallic gradients */

const canvas = document.getElementById('c');
const ctx    = canvas.getContext('2d');
let W, H, time = 0;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function drawMetallicField(t) {
  const step = 3;
  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      const z  = heightAt(x, y, t);
      const zx = heightAt(x + 4, y, t) - heightAt(x - 4, y, t);
      const zy = heightAt(x, y + 4, t) - heightAt(x, y - 4, t);
      const lightX = Math.cos(t * 0.4);
      const lightY = Math.sin(t * 0.3);
      const facing = zx * lightX + zy * lightY;
      const band   = z * 0.55 + facing * 1.8;
      ctx.fillStyle = metallicPalette(band, t * 25);
      ctx.fillRect(x, y, step, step);
    }
  }
}

function loop() {
  time += 0.008;
  drawMetallicField(time);
  requestAnimationFrame(loop);
}

window.addEventListener('resize', resize);
resize();
requestAnimationFrame(loop);
