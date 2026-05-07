/* System 12 – Shine-As-Repair / Damage
   Principle: damage reveals brilliance */

const canvas = document.getElementById('c');
const ctx    = canvas.getContext('2d');
let W, H, allCracks = [], time = 0;

const ORIGINS_DEF = [
  { rx: 0.22, ry: 0.30, b: 7 },
  { rx: 0.68, ry: 0.20, b: 8 },
  { rx: 0.50, ry: 0.55, b: 6 },
  { rx: 0.15, ry: 0.70, b: 7 },
  { rx: 0.80, ry: 0.65, b: 8 },
  { rx: 0.40, ry: 0.82, b: 6 },
];

function drawCeramic() {
  ctx.fillStyle = '#1c1714';
  ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 80; i++) {
    const x = Math.random() * W, y = Math.random() * H;
    const r = 20 + Math.random() * 80;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(255,235,190,0.015)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
}

function spawnAllCracks() {
  allCracks = [];
  for (const o of ORIGINS_DEF) {
    allCracks.push(...seedCracks(o.rx * W, o.ry * H, o.b));
  }
}

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  drawCeramic();
  spawnAllCracks();
}

let seamLayer = null;
function ensureSeam() {
  if (!seamLayer || seamLayer.width !== W) {
    seamLayer = document.createElement('canvas');
    seamLayer.width  = W;
    seamLayer.height = H;
  }
}

function loop() {
  time += 0.013;
  ensureSeam();
  const sc = seamLayer.getContext('2d');

  if (allCracks.length > 0) {
    allCracks = stepCracks(allCracks, sc, (ctx2, x1, y1, x2, y2, w) => {
      const hue = (40 + 280 * Math.sin((x1 * 0.007 + y1 * 0.005) + time * 0.4)) % 360;
      drawHoloRepairSeam(ctx2, x1, y1, x2, y2, w, hue, time);
      // Dark trench edge
      ctx2.strokeStyle = 'rgba(0,0,0,0.35)';
      ctx2.lineWidth   = 1;
      ctx2.beginPath(); ctx2.moveTo(x1, y1); ctx2.lineTo(x2, y2); ctx2.stroke();
    });
  } else {
    drawCeramic();
    sc.clearRect(0, 0, W, H);
    spawnAllCracks();
  }

  ctx.drawImage(seamLayer, 0, 0);

  // Dim the seam layer slowly
  sc.fillStyle = 'rgba(28,23,20,0.004)';
  sc.fillRect(0, 0, W, H);

  requestAnimationFrame(loop);
}

window.addEventListener('resize', resize);
resize();
requestAnimationFrame(loop);
