const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2;
  const maxR = Math.min(W, H) * 0.46;
  const rings = 14;
  for (let ring = 0; ring < rings; ring++) {
    const r = maxR * (ring + 1) / rings;
    const speed = 0.4 + (1 - ring / rings) * 1.8;
    const offset = time * speed;
    const nodeCount = 6 + ring * 2;
    for (let n = 0; n < nodeCount; n++) {
      const a = (n / nodeCount) * Math.PI * 2 + offset;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      const hue = (ring * 25 + n * 12 + time * 30) % 360;
      const rr = 2 + (1 - ring / rings) * 5;
      drawRhinestoneNode(ctx, x, y, rr, hue, time);
    }
  }
  requestAnimationFrame(frame);
}
frame();
