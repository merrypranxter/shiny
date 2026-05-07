/* System 03 – Kintsugi / Cracks / Seams
   Principle: shine loves boundaries */

const canvas = document.getElementById('c');
const ctx    = canvas.getContext('2d');
let W, H, allCracks = [], time = 0, baseDrawn = false;

// Ceramic-like matte slab colors
const CERAMIC_BG = '#1a1612';

function drawCeramicBase() {
  ctx.fillStyle = CERAMIC_BG;
  ctx.fillRect(0, 0, W, H);
  // Subtle warm mottling
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const r = 30 + Math.random() * 120;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0,   'rgba(255,240,200,0.018)');
    g.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
}

function spawnCracks() {
  const origins = [
    { x: W * 0.25, y: H * 0.35, b: 7 },
    { x: W * 0.70, y: H * 0.25, b: 6 },
    { x: W * 0.50, y: H * 0.65, b: 8 },
    { x: W * 0.15, y: H * 0.72, b: 5 },
    { x: W * 0.82, y: H * 0.60, b: 6 },
  ];
  allCracks = [];
  for (const o of origins) {
    allCracks.push(...seedCracks(o.x, o.y, o.b));
  }
}

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  baseDrawn = false;
  spawnCracks();
}

// Off-screen seam layer
let seamCanvas = null;
function ensureSeam() {
  if (!seamCanvas || seamCanvas.width !== W) {
    seamCanvas = document.createElement('canvas');
    seamCanvas.width  = W;
    seamCanvas.height = H;
  }
}

function loop() {
  time += 0.014;
  ensureSeam();
  const sc = seamCanvas.getContext('2d');

  if (!baseDrawn) {
    drawCeramicBase();
    sc.clearRect(0, 0, W, H);
    baseDrawn = true;
  }

  // Step cracks, drawing seams onto seamCanvas
  if (allCracks.length > 0) {
    allCracks = stepCracks(allCracks, sc, (ctx2, x1, y1, x2, y2, w) => {
      const hue = 40 + 300 * Math.sin((x1 + y1) * 0.005 + time * 0.5);
      drawHoloRepairSeam(ctx2, x1, y1, x2, y2, w, hue, time);
    });
  } else {
    // Cycle: fade ceramic & respawn
    drawCeramicBase();
    sc.clearRect(0, 0, W, H);
    spawnCracks();
  }

  // Compose: ceramic base is already on main canvas, overlay seam layer
  ctx.drawImage(seamCanvas, 0, 0);

  // Very gentle fade the seam canvas so old cracks slowly dim
  sc.fillStyle = 'rgba(26,22,18,0.003)';
  sc.fillRect(0, 0, W, H);

  requestAnimationFrame(loop);
}

window.addEventListener('resize', resize);
resize();
requestAnimationFrame(loop);
