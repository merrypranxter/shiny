/* System 14 – Shine-As-Residue / Contamination
   Principle: shine is what the material leaves behind */

const canvas = document.getElementById('c');
const ctx    = canvas.getContext('2d');
let W, H, time = 0;

// Hot-spot cache — recomputed on resize
let hotSpots = [];

function buildHotSpots() {
  hotSpots = [];
  for (let i = 0; i < 18; i++) {
    hotSpots.push({
      x:   Math.random() * W,
      y:   Math.random() * H,
      hue: Math.random() * 360
    });
  }
}

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  buildHotSpots();
}

function drawGlitterResidue() {
  const step = 3;
  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      const density = cheapField(x * 0.012, y * 0.012, time * 0.5);
      if (density < 0.42) continue;

      const bloom   = Math.pow(Math.max(0, density - 0.42) / 0.58, 1.5);
      const shimmer = 0.3 + 0.7 * Math.sin(time * 4 + x * 0.03 + y * 0.02);

      if (bloom * shimmer < 0.12) continue;

      const hue   = 40 + 280 * Math.sin(x * 0.006 + y * 0.008 + time * 0.3);
      const alpha = clamp(bloom * shimmer * 0.75, 0, 0.9);
      const size  = density > 0.72 ? 2 : 1;
      ctx.fillStyle = `hsla(${hue},100%,${55 + bloom * 35}%,${alpha})`;
      ctx.fillRect(x, y, size, size);
    }
  }
}

function loop() {
  time += 0.011;

  ctx.fillStyle = 'rgba(10,8,15,0.42)';
  ctx.fillRect(0, 0, W, H);

  drawGlitterResidue();

  // Mini glints at hot spots
  for (let i = 0; i < hotSpots.length; i++) {
    const h   = hotSpots[i];
    const ox  = 30 * Math.sin(time * 0.5 + i * 0.8);
    const oy  = 22 * Math.cos(time * 0.4 + i * 0.6);
    const v   = cheapField((h.x + ox) * 0.012, (h.y + oy) * 0.012, time * 0.5);
    if (v > 0.55) {
      drawMiniGlint(ctx, h.x + ox, h.y + oy, 5 + 3 * Math.sin(time * 3 + i));
      // Glow halo
      const hue = (h.hue + time * 20) % 360;
      const r   = 18 + 8 * Math.sin(time * 2 + i);
      const g   = ctx.createRadialGradient(h.x + ox, h.y + oy, 0, h.x + ox, h.y + oy, r);
      g.addColorStop(0, `hsla(${hue},100%,70%,0.18)`);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(h.x + ox, h.y + oy, r, 0, Math.PI * 2); ctx.fill();
    }
  }

  requestAnimationFrame(loop);
}

window.addEventListener('resize', resize);
resize();
ctx.fillStyle = '#0a080f';
ctx.fillRect(0, 0, W, H);
requestAnimationFrame(loop);
