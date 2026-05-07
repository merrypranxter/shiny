const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let bones = [];

function init() {
  bones = [];
  const cx = W / 2, cy = H / 2;
  // Spine segments
  for (let i = -10; i <= 10; i++) {
    bones.push({ x1: cx, y1: cy + i * 28, x2: cx, y2: cy + (i + 1) * 28, hue: 215 });
  }
  // Rib curves
  for (let r = -7; r <= 7; r++) {
    if (r === 0) continue;
    const ry = cy + r * 24;
    for (let side = -1; side <= 1; side += 2) {
      const pts = [];
      for (let t = 0; t <= 20; t++) {
        const tt = t / 20;
        pts.push({
          x: cx + side * (40 + 70 * Math.sin(tt * Math.PI)),
          y: ry + 12 * Math.sin(tt * Math.PI * 2)
        });
      }
      for (let p = 0; p < pts.length - 1; p++) {
        bones.push({ x1: pts[p].x, y1: pts[p].y, x2: pts[p+1].x, y2: pts[p+1].y, hue: 200 + Math.random() * 40 });
      }
    }
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(24,20,13,0.18)';
  ctx.fillRect(0, 0, W, H);

  for (const b of bones) {
    const hue = b.hue + 20 * Math.sin(time * 2 + b.x1 * 0.015);
    // Render bone segment as stitched sequin line using shared helper
    drawStitchedLine(ctx, b.x1, b.y1, b.x2, b.y2, time, hue);

    // Extra sequin circles at joint endpoints
    const flash = 0.5 + 0.5 * Math.sin(time * 4 + b.x1 * 0.03 + b.y1 * 0.02);
    if (flash > 0.75) {
      ctx.beginPath();
      ctx.arc(b.x2, b.y2, 2 + flash * 2, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${hue + 20},100%,${70 + flash * 25}%,${flash * 0.8})`;
      ctx.fill();
    }
  }
  requestAnimationFrame(frame);
}
frame();
