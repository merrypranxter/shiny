const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let scars = [];

function init() {
  scars = [];
  for (let s = 0; s < 14; s++) {
    const x0 = W * (0.05 + 0.9 * Math.random());
    const y0 = H * (0.1 + 0.8 * Math.random());
    const pts = [{ x: x0, y: y0 }];
    let cx = x0, cy = y0;
    const len = 4 + Math.floor(Math.random() * 5);
    for (let p = 0; p < len; p++) {
      cx += (Math.random() - 0.5) * 120;
      cy += (Math.random() - 0.5) * 60;
      pts.push({ x: cx, y: cy });
    }
    scars.push({ pts, hue: 330 + Math.random() * 30 });
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(45,31,26,0.2)';
  ctx.fillRect(0, 0, W, H);
  for (const sc of scars) {
    for (let p = 0; p < sc.pts.length - 1; p++) {
      const a = sc.pts[p], b = sc.pts[p + 1];
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      drawWetBlob(ctx, mid.x, mid.y, 14, time, sc.hue);
      drawDryGlitterDust(ctx, mid.x + (Math.random() - 0.5) * 30,
        mid.y + (Math.random() - 0.5) * 20, 22, 12, time, sc.hue + 20);
    }
  }
  requestAnimationFrame(frame);
}
frame();
