/* System 18 – Shine-As-Map / Topography
   Principle: shine as terrain reading */

const canvas = document.getElementById('c');
const ctx    = canvas.getContext('2d');
let W, H, time = 0;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

const STEP = 2;

function drawChromoTopoMap() {
  for (let y = 0; y < H; y += STEP) {
    for (let x = 0; x < W; x += STEP) {
      const v = heightAt(x, y, time);
      const c = contourAmount(v + time * 0.03, 16);

      if (c < 0.12) continue;

      // Metallic palette driven by height + contour band
      const zx     = heightAt(x + 4, y, time) - heightAt(x - 4, y, time);
      const zy     = heightAt(x, y + 4, time) - heightAt(x, y - 4, time);
      const lx     = Math.cos(time * 0.3);
      const ly     = Math.sin(time * 0.22);
      const facing = zx * lx + zy * ly;
      const band   = v * 0.6 + facing * 1.4 + c * 0.3;

      const hueShift = time * 22 + v * 80;
      const color    = metallicPalette(clamp(band, 0, 1), hueShift);

      ctx.fillStyle = color;
      ctx.globalAlpha = clamp(c * 0.9, 0, 1);
      ctx.fillRect(x, y, STEP, STEP);

      // Hot specular on tight contours
      if (c > 0.85) {
        ctx.fillStyle   = 'rgba(255,255,255,0.55)';
        ctx.globalAlpha = c * 0.5;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
  ctx.globalAlpha = 1;
}

function loop() {
  time += 0.007;

  ctx.fillStyle = 'rgba(10,8,15,0.55)';
  ctx.fillRect(0, 0, W, H);

  drawChromoTopoMap();

  requestAnimationFrame(loop);
}

window.addEventListener('resize', resize);
resize();
ctx.fillStyle = '#0a080f';
ctx.fillRect(0, 0, W, H);
requestAnimationFrame(loop);
