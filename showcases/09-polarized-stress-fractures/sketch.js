const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let cracks = [], allSegs = [];

function init() {
  allSegs = [];
  ctx.fillStyle = '#c8d4e0';
  ctx.fillRect(0, 0, W, H);

  // Seed multiple crack origins
  const origins = [
    { x: W * 0.25, y: H * 0.3 },
    { x: W * 0.7,  y: H * 0.5 },
    { x: W * 0.5,  y: H * 0.75 },
    { x: W * 0.15, y: H * 0.7 }
  ];

  for (const o of origins) {
    let walkers = seedCracks(o.x, o.y, 8);
    for (let step = 0; step < 60; step++) {
      walkers = stepCracks(walkers, ctx, (c, x1, y1, x2, y2, w) => {
        allSegs.push({ x1, y1, x2, y2, ox: o.x, oy: o.y });
      });
      if (walkers.length === 0) break;
    }
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(200,212,224,0.06)';
  ctx.fillRect(0, 0, W, H);

  for (const s of allSegs) {
    // Dark crack line
    ctx.strokeStyle = 'rgba(40,30,60,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(s.x1, s.y1); ctx.lineTo(s.x2, s.y2); ctx.stroke();

    // Rainbow pressure halos using contourAmount for distance fields
    const dist = Math.hypot(s.x1 - s.ox, s.y1 - s.oy);
    const pressure = contourAmount(dist * 0.005, 8);
    for (let ring = 1; ring <= 4; ring++) {
      const hue = (dist * 0.7 + ring * 50 + time * 55) % 360;
      const alpha = (0.08 - ring * 0.015) * (1 + pressure * 0.5);
      ctx.strokeStyle = `hsla(${hue},100%,55%,${Math.max(0, alpha)})`;
      ctx.lineWidth = ring * 2.2;
      ctx.beginPath(); ctx.moveTo(s.x1, s.y1); ctx.lineTo(s.x2, s.y2); ctx.stroke();
    }
  }
  requestAnimationFrame(frame);
}
frame();
