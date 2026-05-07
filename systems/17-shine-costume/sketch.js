/* System 17 – Shine-As-Costume / Fashion
   Principle: shine as performed identity */

const canvas = document.getElementById('c');
const ctx    = canvas.getContext('2d');
let W, H, time = 0;

// Embroidery paths follow silhouette contours (concentric ellipses)
let contourPaths = [];

function buildContours() {
  contourPaths = [];
  const cx = W * 0.5, cy = H * 0.5;
  const rings = 14;
  for (let ring = 1; ring <= rings; ring++) {
    const t    = ring / rings;
    const rx   = W * 0.08 + W * 0.32 * t;
    const ry   = H * 0.12 + H * 0.36 * t;
    const segs = 48;
    const pts  = [];
    for (let i = 0; i <= segs; i++) {
      const a = (Math.PI * 2 * i) / segs;
      pts.push({
        x: cx + Math.cos(a) * rx,
        y: cy + Math.sin(a) * ry,
      });
    }
    contourPaths.push({ pts, hue: ring * 26, ring });
  }
}

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  buildContours();
}

function loop() {
  time += 0.012;

  ctx.fillStyle = 'rgba(10,8,15,0.22)';
  ctx.fillRect(0, 0, W, H);

  const cx = W * 0.5, cy = H * 0.5;

  // Large matte silhouette blob (innermost ellipse, filled dark)
  ctx.fillStyle = '#14101c';
  ctx.beginPath();
  ctx.ellipse(cx, cy, W * 0.08, H * 0.12, 0, 0, Math.PI * 2);
  ctx.fill();

  // Embroidered contour rings
  for (const cp of contourPaths) {
    const pts = cp.pts;
    const hue = (cp.hue + time * 22) % 360;
    for (let i = 0; i < pts.length - 1; i++) {
      drawStitchedLine(ctx, pts[i].x, pts[i].y, pts[i + 1].x, pts[i + 1].y, time, hue);
    }
    // Punctures
    for (let i = 0; i < pts.length; i += 4) {
      drawPuncture(ctx, pts[i].x, pts[i].y);
    }
  }

  // Rhinestone nodes at intersections of ring and radial lines
  const radials = 8;
  for (let r = 0; r < radials; r++) {
    const angle = (Math.PI * 2 * r) / radials + time * 0.05;
    for (const cp of contourPaths) {
      if (cp.ring % 3 !== 0) continue;
      const idx = Math.floor((angle / (Math.PI * 2)) * (cp.pts.length - 1));
      const pt  = cp.pts[Math.max(0, Math.min(cp.pts.length - 1, idx))];
      const hue = (cp.hue + r * 45 + time * 30) % 360;
      drawRhinestoneNode(ctx, pt.x, pt.y, 5, hue, time);
    }
  }

  requestAnimationFrame(loop);
}

window.addEventListener('resize', resize);
resize();
ctx.fillStyle = '#0a080f';
ctx.fillRect(0, 0, W, H);
requestAnimationFrame(loop);
