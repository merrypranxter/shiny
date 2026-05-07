const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(10,8,12,0.25)';
  ctx.fillRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2;
  const maxR = Math.min(W, H) * 0.46;
  const spokes = 24;
  // Radial spokes
  for (let i = 0; i < spokes; i++) {
    const a = (i / spokes) * Math.PI * 2;
    const hue = (i * 15 + time * 20) % 360;
    drawShinyVeinStroke(ctx, cx, cy, cx + Math.cos(a) * maxR, cy + Math.sin(a) * maxR, 1, hue);
  }
  // Circular rings
  for (let ring = 1; ring <= 8; ring++) {
    const r = maxR * (ring / 8);
    const ringPts = [];
    for (let i = 0; i <= spokes; i++) {
      const a = (i / spokes) * Math.PI * 2;
      ringPts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
    }
    for (let i = 0; i < ringPts.length - 1; i++) {
      const hue = (ring * 45 + i * 15 + time * 18) % 360;
      drawShinyVeinStroke(ctx, ringPts[i].x, ringPts[i].y, ringPts[i + 1].x, ringPts[i + 1].y, 0.8, hue);
    }
  }
  // Glitter at intersections
  for (let i = 0; i < spokes; i++) {
    const a = (i / spokes) * Math.PI * 2;
    for (let ring = 1; ring <= 8; ring++) {
      const r = maxR * (ring / 8);
      drawMiniGlint(ctx, cx + Math.cos(a) * r, cy + Math.sin(a) * r, 3);
    }
  }
  requestAnimationFrame(frame);
}
frame();
