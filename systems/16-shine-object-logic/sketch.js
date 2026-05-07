/* System 16 – Shine-As-Object Logic (Gumball Armor)
   Principle: shine is the object's reason for existing */

const canvas = document.getElementById('c');
const ctx    = canvas.getContext('2d');
let W, H, time = 0;

let domes = [];

function buildDomes() {
  domes = [];
  // Grid cluster of glossy domes, circle-packed
  const cols = 10, rows = 8;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const baseR = 30 + 30 * hash2(c, r);
      domes.push({
        x:   W * 0.1 + (W * 0.8 / (cols - 1)) * c,
        y:   H * 0.1 + (H * 0.8 / (rows - 1)) * r,
        r:   baseR,
        hue: (c * 37 + r * 53) % 360,
      });
    }
  }
}

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  buildDomes();
}

function loop() {
  time += 0.014;

  ctx.fillStyle = 'rgba(8,6,14,0.55)';
  ctx.fillRect(0, 0, W, H);

  // Sort back-to-front by y for natural overlap
  const sorted = [...domes].sort((a, b) => a.y - b.y);

  for (const d of sorted) {
    const hue = (d.hue + time * 18) % 360;
    const ox  = 5 * Math.sin(time * 0.6 + d.hue * 0.02);
    const oy  = 4 * Math.cos(time * 0.5 + d.hue * 0.015);
    const pulse = 1 + 0.06 * Math.sin(time * 2.5 + d.hue * 0.03);
    drawWetBlob(ctx, d.x + ox, d.y + oy, d.r * pulse, time, hue);
  }

  // Sparse glitter dust over the whole armor
  for (let i = 0; i < 15; i++) {
    const d   = domes[Math.floor(Math.random() * domes.length)];
    const hue = (d.hue + 60) % 360;
    drawDryGlitterDust(ctx, d.x, d.y, d.r * 0.9, 6, time, hue);
  }

  requestAnimationFrame(loop);
}

window.addEventListener('resize', resize);
resize();
ctx.fillStyle = '#08060e';
ctx.fillRect(0, 0, W, H);
requestAnimationFrame(loop);
