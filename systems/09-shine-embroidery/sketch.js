/* System 09 – Shine-As-Embroidery / Suturing
   Principle: shine is craft labor */

const canvas = document.getElementById('c');
const ctx    = canvas.getContext('2d');
let W, H, time = 0;

// Wave paths defined as arrays of points
let paths = [];

function buildPaths() {
  paths = [];
  const rows = 9;
  for (let r = 0; r < rows; r++) {
    const pts  = [];
    const yBase = H * (0.1 + r / rows * 0.82);
    const amp   = 20 + 30 * Math.random();
    const freq  = 2 + Math.random() * 4;
    const phase = Math.random() * Math.PI * 2;
    const segs  = 60;
    for (let i = 0; i <= segs; i++) {
      const t = i / segs;
      const x = t * W;
      const y = yBase + amp * Math.sin(t * Math.PI * freq + phase);
      pts.push({ x, y });
    }
    paths.push({ pts, hue: r * 40 + Math.random() * 30 });
  }
}

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  buildPaths();
}

function loop() {
  time += 0.015;

  ctx.fillStyle = 'rgba(10,8,15,0.18)';
  ctx.fillRect(0, 0, W, H);

  for (const path of paths) {
    const pts = path.pts;
    // Animate path slightly
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i];
      const b = pts[i + 1];
      const hue = (path.hue + time * 25 + i * 2) % 360;
      drawStitchedLine(ctx, a.x, a.y, b.x, b.y, time, hue);
    }
    // Puncture at stitch endpoints (every ~9px spacing, approximate)
    for (let i = 0; i < pts.length; i += 3) {
      drawPuncture(ctx, pts[i].x, pts[i].y);
    }
  }

  // Rhinestone nodes at path crossings (approximated)
  for (let i = 0; i < paths.length - 1; i++) {
    const crossing_x = W * hash2(i, 77);
    const y1 = paths[i].pts[Math.floor(hash2(i, 5) * (paths[i].pts.length - 1))].y;
    const hue = (paths[i].hue + 90) % 360;
    drawRhinestoneNode(ctx, crossing_x, y1, 5, hue, time);
  }

  requestAnimationFrame(loop);
}

window.addEventListener('resize', resize);
resize();
ctx.fillStyle = '#0a080f';
ctx.fillRect(0, 0, W, H);
requestAnimationFrame(loop);
