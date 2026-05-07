/* System 01 – Matte Host + Brilliant Veins
   Principle: contrast of energy states */

const canvas = document.getElementById('c');
const ctx    = canvas.getContext('2d');
let W, H, veins, time = 0;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  // Velvet dark background
  ctx.fillStyle = '#0d0a12';
  ctx.fillRect(0, 0, W, H);
  // Fresh walkers on resize
  veins = seedVeins(12, W, H);
}

function drawVelvetBg() {
  // Subtle dark-to-darker radial for depth
  const g = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, Math.max(W, H) * 0.75);
  g.addColorStop(0,   'rgba(22,14,32,0.12)');
  g.addColorStop(1,   'rgba(4,2,8,0.22)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
}

// Long-lived persistent vein network drawn incrementally each frame
let veinCache = null;
function ensureCache() {
  if (!veinCache || veinCache.width !== W || veinCache.height !== H) {
    veinCache = document.createElement('canvas');
    veinCache.width  = W;
    veinCache.height = H;
    const vc = veinCache.getContext('2d');
    vc.fillStyle = '#0d0a12';
    vc.fillRect(0, 0, W, H);
  }
}

function loop() {
  time += 0.012;
  ensureCache();
  const vc = veinCache.getContext('2d');

  // Step walkers on the off-screen canvas
  if (veins.length > 0) {
    ctx.save();
    // Step draws pale base strokes on main canvas through shared stepVeins
    // but we want them on cache; do it manually
    const next = [];
    for (const v of veins) {
      if (v.life <= 0 || v.thickness < 0.4) continue;
      const nx = v.x + Math.cos(v.angle) * 2.2;
      const ny = v.y + Math.sin(v.angle) * 2.2;
      const hue = 200 + 160 * Math.sin(v.x * 0.008 + time);
      drawShinyVeinStroke(vc, v.x, v.y, nx, ny, v.thickness * 0.28, hue);
      next.push({
        ...v, x: nx, y: ny,
        angle: v.angle + (Math.random() - 0.5) * 0.26,
        life: v.life - 1,
        thickness: v.thickness * 0.994
      });
      if (Math.random() < 0.025 && v.depth < 5) {
        next.push({ x: nx, y: ny,
          angle: v.angle + 0.55 + Math.random() * 0.5,
          life: v.life * 0.68, thickness: v.thickness * 0.7, depth: v.depth + 1 });
      }
      if (Math.random() < 0.025 && v.depth < 5) {
        next.push({ x: nx, y: ny,
          angle: v.angle - 0.55 - Math.random() * 0.5,
          life: v.life * 0.68, thickness: v.thickness * 0.7, depth: v.depth + 1 });
      }
    }
    veins = next;
    ctx.restore();

    // Respawn when exhausted
    if (veins.length === 0) {
      veins = seedVeins(10, W, H);
      // Gentle fade on cache so old veins don't dominate forever
      vc.fillStyle = 'rgba(13,10,18,0.08)';
      vc.fillRect(0, 0, W, H);
    }
  }

  // Draw cache to screen
  ctx.drawImage(veinCache, 0, 0);
  drawVelvetBg();

  // Chromatic shimmer overlay on the live vein tips
  for (const v of veins) {
    const hue = 200 + 160 * Math.sin(v.x * 0.008 + time);
    ctx.fillStyle = `hsla(${hue},100%,80%,${0.05 * v.thickness})`;
    ctx.fillRect(v.x - 2, v.y - 2, 4, 4);
  }

  requestAnimationFrame(loop);
}

window.addEventListener('resize', resize);
resize();
requestAnimationFrame(loop);
