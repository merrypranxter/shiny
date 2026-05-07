/* System 10 – Wet Shine vs Dry Shine
   Principle: not all shine behaves the same */

const canvas = document.getElementById('c');
const ctx    = canvas.getContext('2d');
let W, H, time = 0;

const WET_COUNT = 7;
let wetBlobs = [];

function buildBlobs() {
  wetBlobs = [];
  for (let i = 0; i < WET_COUNT; i++) {
    wetBlobs.push({
      x:   (0.1 + 0.8 * hash2(i, 0)) * W,
      y:   (0.1 + 0.8 * hash2(0, i)) * H,
      r:   40 + 80 * hash2(i, 1),
      hue: hash2(i, 2) * 360,
    });
  }
}

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  buildBlobs();
}

function loop() {
  time += 0.012;

  ctx.fillStyle = 'rgba(10,8,15,0.35)';
  ctx.fillRect(0, 0, W, H);

  for (let i = 0; i < wetBlobs.length; i++) {
    const b = wetBlobs[i];
    // Slow drift
    const ox = 18 * Math.sin(time * 0.4 + i * 1.3);
    const oy = 14 * Math.cos(time * 0.3 + i * 0.9);
    const hue = (b.hue + time * 12) % 360;

    // Wet glossy blob
    drawWetBlob(ctx, b.x + ox, b.y + oy, b.r, time, hue);

    // Dry glitter dust ring around blob edges
    drawDryGlitterDust(ctx, b.x + ox, b.y + oy, b.r * 1.4, 80, time, (hue + 60) % 360);

    // Tight dry ring just outside blob
    drawDryGlitterDust(ctx, b.x + ox, b.y + oy, b.r * 1.1, 30, time, (hue + 120) % 360);
  }

  requestAnimationFrame(loop);
}

window.addEventListener('resize', resize);
resize();
ctx.fillStyle = '#0a080f';
ctx.fillRect(0, 0, W, H);
requestAnimationFrame(loop);
