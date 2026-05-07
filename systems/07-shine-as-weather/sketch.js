/* System 07 – Shine-As-Weather / Contour Systems
   Principle: shine is a changing field condition */

const canvas = document.getElementById('c');
const ctx    = canvas.getContext('2d');
let W, H, time = 0;

// Glitter precipitation particles
let precip = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  precip = [];
}

function spawnPrecip() {
  // Only spawn in high-pressure zones
  for (let attempt = 0; attempt < 4; attempt++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const v = heightAt(x, y, time);
    if (v > 0.55) {
      precip.push({ x, y, vx: (Math.random() - 0.5) * 0.8, vy: 0.4 + Math.random() * 0.6,
                    life: 60 + Math.random() * 60, hue: 160 + v * 200 });
    }
  }
  if (precip.length > 600) precip.splice(0, 100);
}

function drawShinyContours() {
  const step = 2;
  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      const v = heightAt(x + Math.sin(time) * 20, y, time);
      const c = contourAmount(v + time * 0.04, 13);
      if (c > 0.15) {
        const hue   = 180 + 160 * v + 70 * Math.sin(time + v * 8);
        const alpha = c * 0.65;
        ctx.fillStyle = `hsla(${hue},100%,70%,${alpha})`;
        ctx.fillRect(x, y, step, step);
        if (c > 0.88) {
          ctx.fillStyle = `rgba(255,255,255,${c * 0.5})`;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  }
}

function loop() {
  time += 0.008;

  ctx.fillStyle = 'rgba(10,8,15,0.55)';
  ctx.fillRect(0, 0, W, H);

  drawShinyContours();

  // Precipitation in storm zones
  spawnPrecip();
  for (let i = precip.length - 1; i >= 0; i--) {
    const p = precip[i];
    p.x += p.vx; p.y += p.vy; p.life -= 1;
    if (p.life <= 0 || p.y > H) { precip.splice(i, 1); continue; }
    const alpha = Math.min(1, p.life / 30);
    ctx.fillStyle = `hsla(${p.hue},100%,75%,${alpha * 0.7})`;
    ctx.fillRect(p.x, p.y, 1, 1);
    if (Math.random() < 0.04) drawMiniGlint(ctx, p.x, p.y, 3);
  }

  requestAnimationFrame(loop);
}

window.addEventListener('resize', resize);
resize();
ctx.fillStyle = '#0a080f';
ctx.fillRect(0, 0, W, H);
requestAnimationFrame(loop);
