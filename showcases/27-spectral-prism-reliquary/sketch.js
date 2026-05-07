const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(10,8,18,0.3)';
  ctx.fillRect(0, 0, W, H);
  const bx = W * 0.25, by = H * 0.25, bw = W * 0.5, bh = H * 0.5;
  // Prismatic beams from box edges
  const beamCount = 12;
  for (let i = 0; i < beamCount; i++) {
    const hue = (i * 30 + time * 25) % 360;
    const t = i / beamCount;
    // Top edge beams
    const sx = bx + bw * t, sy = by;
    const fanAngle = (-Math.PI / 2) + (t - 0.5) * 0.8;
    const len = 150 + 80 * Math.sin(time * 0.7 + i);
    const g = ctx.createLinearGradient(sx, sy, sx + Math.cos(fanAngle) * len, sy + Math.sin(fanAngle) * len);
    g.addColorStop(0, `hsla(${hue},100%,70%,0.5)`);
    g.addColorStop(1, `hsla(${(hue + 60) % 360},100%,60%,0)`);
    ctx.strokeStyle = g;
    ctx.lineWidth = 4 + 6 * t;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx + Math.cos(fanAngle) * len, sy + Math.sin(fanAngle) * len);
    ctx.stroke();
  }
  // Chrome box outline
  const boxPts = [
    { x: bx, y: by }, { x: bx + bw, y: by },
    { x: bx + bw, y: by + bh }, { x: bx, y: by + bh }, { x: bx, y: by }
  ];
  for (let i = 0; i < boxPts.length - 1; i++) {
    drawChromeConduit(ctx, boxPts[i], boxPts[i + 1], time, i);
  }
  requestAnimationFrame(frame);
}
frame();
