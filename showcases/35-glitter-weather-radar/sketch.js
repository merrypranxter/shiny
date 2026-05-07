const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(5,10,5,0.28)';
  ctx.fillRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2;
  const maxR = Math.min(W, H) * 0.46;
  // Concentric circles
  for (let ring = 1; ring <= 6; ring++) {
    const r = maxR * (ring / 6);
    ctx.strokeStyle = `rgba(0,200,100,${0.15 + ring * 0.03})`;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
  }
  // Rotating sweep arm
  const sweepAngle = time * 1.4;
  const g = ctx.createLinearGradient(cx, cy, cx + Math.cos(sweepAngle) * maxR, cy + Math.sin(sweepAngle) * maxR);
  g.addColorStop(0, 'rgba(0,255,100,0.6)');
  g.addColorStop(1, 'rgba(0,255,100,0)');
  ctx.strokeStyle = g;
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(sweepAngle) * maxR, cy + Math.sin(sweepAngle) * maxR); ctx.stroke();
  // Storm cells with glitter
  for (let y = 10; y < H; y += 30) {
    for (let x = 10; x < W; x += 30) {
      const dist = Math.hypot(x - cx, y - cy);
      if (dist < maxR) {
        const v = cheapField(x * 0.012, y * 0.012, time * 0.08);
        if (v > 0.6) {
          drawDryGlitterDust(ctx, x, y, 18, 6, time, 100 + v * 80);
        }
      }
    }
  }
  requestAnimationFrame(frame);
}
frame();
