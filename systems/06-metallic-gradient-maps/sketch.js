/* System 06 – Metallic Gradient Structure Maps
   Principle: metallic color is information */

const canvas = document.getElementById('c');
const ctx    = canvas.getContext('2d');
let W, H, time = 0;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

const STEP = 3;

function drawMetallicMap() {
  for (let y = 0; y < H; y += STEP) {
    for (let x = 0; x < W; x += STEP) {
      const z  = heightAt(x, y, time);
      const zx = heightAt(x + 4, y, time) - heightAt(x - 4, y, time);
      const zy = heightAt(x, y + 4, time) - heightAt(x, y - 4, time);
      const lightX = Math.cos(time * 0.35);
      const lightY = Math.sin(time * 0.25);
      const facing = zx * lightX + zy * lightY;
      const band   = z * 0.55 + facing * 1.8;
      ctx.fillStyle = metallicPalette(band, time * 25);
      ctx.fillRect(x, y, STEP, STEP);
    }
  }
}

function loop() {
  time += 0.009;
  drawMetallicMap();
  requestAnimationFrame(loop);
}

window.addEventListener('resize', resize);
resize();
requestAnimationFrame(loop);
