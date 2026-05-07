const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let cracks = [];

function init() {
  cracks = [];
  const origins = 4 + Math.floor(Math.random() * 2);
  for (let o = 0; o < origins; o++) {
    const ox = W * (0.15 + 0.7 * Math.random());
    const oy = H * (0.15 + 0.7 * Math.random());
    const arms = 5 + Math.floor(Math.random() * 4);
    for (let a = 0; a < arms; a++) {
      let x = ox, y = oy;
      let angle = (a / arms) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const hue = 160 + Math.random() * 180;
      const steps = 50 + Math.floor(Math.random() * 60);
      for (let s = 0; s < steps; s++) {
        angle += (Math.random() - 0.5) * 0.35;
        const nx = x + Math.cos(angle) * (4 + Math.random() * 5);
        const ny = y + Math.sin(angle) * (4 + Math.random() * 5);
        cracks.push({ x1: x, y1: y, x2: nx, y2: ny, hue, w: 2 + Math.random() * 2 });
        if (Math.random() < 0.06) {
          let bx = nx, by = ny, ba = angle + (Math.random() - 0.5) * 1.5;
          for (let b = 0; b < 20; b++) {
            ba += (Math.random() - 0.5) * 0.3;
            const bnx = bx + Math.cos(ba) * 5;
            const bny = by + Math.sin(ba) * 5;
            cracks.push({ x1: bx, y1: by, x2: bnx, y2: bny, hue: (hue + 60) % 360, w: 1.2 });
            bx = bnx; by = bny;
          }
        }
        x = nx; y = ny;
      }
    }
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(18,12,8,0.15)';
  ctx.fillRect(0, 0, W, H);
  for (const c of cracks) drawHoloRepairSeam(ctx, c.x1, c.y1, c.x2, c.y2, c.w, c.hue, time);
  requestAnimationFrame(frame);
}
frame();
