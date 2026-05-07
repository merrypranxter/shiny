/* System 11 – Shine-As-Anatomy
   Principle: shine becomes internal life */

const canvas = document.getElementById('c');
const ctx    = canvas.getContext('2d');
let W, H, time = 0;

// Branching anatomical vessel walkers from center
let vessels = [];
let junctions = []; // rhinestone positions

function seedVessels() {
  vessels   = [];
  junctions = [];
  const cx = W * 0.5, cy = H * 0.5;
  const armCount = 8;
  for (let i = 0; i < armCount; i++) {
    vessels.push({
      x: cx, y: cy,
      angle: (Math.PI * 2 * i) / armCount + (Math.random() - 0.5) * 0.3,
      thick: 6 + Math.random() * 4,
      life:  180 + Math.random() * 120,
      hue:   280 + Math.random() * 120,
      depth: 0
    });
  }
}

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  ctx.fillStyle = '#0c0a10';
  ctx.fillRect(0, 0, W, H);
  seedVessels();
  junctions = [];
}

let vesselCanvas = null;
function ensureVesselCanvas() {
  if (!vesselCanvas || vesselCanvas.width !== W) {
    vesselCanvas = document.createElement('canvas');
    vesselCanvas.width  = W;
    vesselCanvas.height = H;
    const vc = vesselCanvas.getContext('2d');
    vc.fillStyle = '#0c0a10';
    vc.fillRect(0, 0, W, H);
  }
}

function loop() {
  time += 0.014;
  ensureVesselCanvas();
  const vc = vesselCanvas.getContext('2d');

  if (vessels.length > 0) {
    const next = [];
    for (const v of vessels) {
      if (v.life <= 0 || v.thick < 0.4) continue;
      const nx = v.x + Math.cos(v.angle) * 2.5;
      const ny = v.y + Math.sin(v.angle) * 2.5;
      drawLivingShineTube(vc, v.x, v.y, nx, ny, v.thick, v.hue, time, v.depth);
      next.push({
        ...v, x: nx, y: ny,
        angle: v.angle + (Math.random() - 0.5) * 0.22,
        life:  v.life - 1,
        thick: v.thick * 0.993
      });
      if (Math.random() < 0.018 && v.depth < 6) {
        junctions.push({ x: nx, y: ny, hue: v.hue, r: v.thick * 1.2 });
        next.push({
          x: nx, y: ny,
          angle: v.angle + 0.7 + Math.random() * 0.4,
          thick: v.thick * 0.68, life: v.life * 0.65,
          hue: v.hue + 30, depth: v.depth + 1
        });
      }
    }
    vessels = next;
  } else {
    // Respawn with fade
    vc.fillStyle = 'rgba(12,10,16,0.12)';
    vc.fillRect(0, 0, W, H);
    junctions = [];
    seedVessels();
  }

  // Draw vessel cache
  ctx.drawImage(vesselCanvas, 0, 0);

  // Rubbery dark vignette overlay
  const vg = ctx.createRadialGradient(W * 0.5, H * 0.5, H * 0.3, W * 0.5, H * 0.5, H * 0.8);
  vg.addColorStop(0, 'rgba(0,0,0,0)');
  vg.addColorStop(1, 'rgba(0,0,0,0.55)');
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, W, H);

  // Rhinestone nodes at branch junctions
  const max = Math.min(junctions.length, 200);
  for (let i = 0; i < max; i++) {
    const j = junctions[i];
    drawRhinestoneNode(ctx, j.x, j.y, j.r + 1, j.hue, time);
  }

  requestAnimationFrame(loop);
}

window.addEventListener('resize', resize);
resize();
requestAnimationFrame(loop);
