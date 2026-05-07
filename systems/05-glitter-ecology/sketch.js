/* System 05 – Glitter Ecology / Clustered Sparkle
   Principle: sparkle gets better with intelligent distribution */

const canvas = document.getElementById('c');
const ctx    = canvas.getContext('2d');
let W, H, time = 0;

// Cluster centers for hue variation
const CLUSTER_COUNT = 9;
let clusters = [];

function buildClusters() {
  clusters = [];
  for (let i = 0; i < CLUSTER_COUNT; i++) {
    clusters.push({
      x:   0.1 + 0.8 * Math.random(),
      y:   0.1 + 0.8 * Math.random(),
      hue: Math.random() * 360
    });
  }
}

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  buildClusters();
}

// Custom sparkle pass with per-cluster hue shift
function drawColoredSparkleField() {
  for (let y = 0; y < H; y += 3) {
    for (let x = 0; x < W; x += 3) {
      const cluster = pseudoFbm(x * 0.01, y * 0.01);
      const local   = hash2(x, y + time * 0.3 | 0);
      if (cluster > 0.58 && local > 0.984) {
        // Find nearest cluster center for hue bias
        let nearestHue = 0, nearestDist = 1e9;
        for (const c of clusters) {
          const dx = x / W - c.x, dy = y / H - c.y;
          const d = dx * dx + dy * dy;
          if (d < nearestDist) { nearestDist = d; nearestHue = c.hue; }
        }

        const shimmer = 0.5 + 0.5 * Math.sin(time * 3.5 + x * 0.022 + y * 0.011);
        const hue     = (nearestHue + 60 * shimmer + time * 20) % 360;
        const size    = local > 0.997 ? 3 : 1;
        ctx.fillStyle = `hsla(${hue},100%,${65 + shimmer * 30}%,${0.25 + shimmer * 0.75})`;
        ctx.fillRect(x, y, size, size);

        if (local > 0.9985) {
          ctx.strokeStyle = `hsla(${hue + 40},100%,90%,${0.4 + shimmer * 0.45})`;
          ctx.lineWidth   = 1;
          ctx.beginPath();
          ctx.moveTo(x - 5, y); ctx.lineTo(x + 5, y);
          ctx.moveTo(x, y - 5); ctx.lineTo(x, y + 5);
          ctx.stroke();
        }
      }
    }
  }
}

function loop() {
  time += 0.016;

  // Dark host background with slow fade
  ctx.fillStyle = 'rgba(10,8,15,0.72)';
  ctx.fillRect(0, 0, W, H);

  drawColoredSparkleField();

  // Soft radial glow at each cluster center
  for (const c of clusters) {
    const cx = c.x * W, cy = c.y * H;
    const r  = 80 + 40 * Math.sin(time * 0.7 + c.hue);
    const g  = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    const hue = (c.hue + time * 15) % 360;
    g.addColorStop(0, `hsla(${hue},100%,60%,0.06)`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
  }

  requestAnimationFrame(loop);
}

window.addEventListener('resize', resize);
resize();
ctx.fillStyle = '#0a080f';
ctx.fillRect(0, 0, W, H);
requestAnimationFrame(loop);
