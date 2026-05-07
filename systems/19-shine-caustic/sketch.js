/* System 19 – Shine-As-Caustic Projection
   Principle: shine as bent and focused light */

const canvas = document.getElementById('c');
const ctx    = canvas.getContext('2d');
let W, H, time = 0;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

// Sine-wave lens displacement function
function lensDisplace(x, y, t) {
  const fx = x / W, fy = y / H;
  const dx = Math.sin(fx * Math.PI * 3 + t * 0.7) * Math.cos(fy * Math.PI * 2 + t * 0.5) * 0.18;
  const dy = Math.cos(fx * Math.PI * 2 + t * 0.6) * Math.sin(fy * Math.PI * 3 + t * 0.8) * 0.18;
  return { dx, dy };
}

function drawCausticGrid() {
  const cellW = 70, cellH = 70;
  const cols  = Math.ceil(W / cellW) + 1;
  const rows  = Math.ceil(H / cellH) + 1;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cx = col * cellW;
      const cy = row * cellH;

      const { dx, dy } = lensDisplace(cx, cy, time);
      const focusX = cx + dx * W;
      const focusY = cy + dy * H;

      // Warped radial gradient
      const r       = 30 + 18 * Math.abs(dx + dy);
      const hue     = (col * 29 + row * 41 + time * 35) % 360;
      const bright  = 0.4 + 0.6 * Math.abs(dx * dy * 20);

      const g = ctx.createRadialGradient(
        focusX - r * 0.2, focusY - r * 0.2, 0,
        focusX, focusY, r
      );
      g.addColorStop(0.0, `hsla(${hue},100%,90%,${0.55 * bright})`);
      g.addColorStop(0.2, `hsla(${(hue + 60) % 360},100%,65%,${0.35 * bright})`);
      g.addColorStop(0.5, `hsla(${(hue + 140) % 360},100%,40%,${0.12 * bright})`);
      g.addColorStop(1.0, 'rgba(0,0,0,0)');

      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(focusX, focusY, r, 0, Math.PI * 2); ctx.fill();

      // Intense hot core
      if (bright > 0.7) {
        const core = ctx.createRadialGradient(focusX, focusY, 0, focusX, focusY, 6);
        core.addColorStop(0,   'rgba(255,255,255,0.85)');
        core.addColorStop(0.4, `hsla(${hue},100%,80%,0.4)`);
        core.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = core;
        ctx.beginPath(); ctx.arc(focusX, focusY, 6, 0, Math.PI * 2); ctx.fill();
      }
    }
  }
}

function loop() {
  time += 0.009;

  ctx.fillStyle = 'rgba(8,6,14,0.48)';
  ctx.fillRect(0, 0, W, H);

  drawCausticGrid();

  requestAnimationFrame(loop);
}

window.addEventListener('resize', resize);
resize();
ctx.fillStyle = '#08060e';
ctx.fillRect(0, 0, W, H);
requestAnimationFrame(loop);
