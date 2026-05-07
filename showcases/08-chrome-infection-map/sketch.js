const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let segs = [];

function init() {
  segs = [];
  ctx.fillStyle = '#ddd8cc';
  ctx.fillRect(0, 0, W, H);
  const origins = 3;
  for (let o = 0; o < origins; o++) {
    const ox = W * (0.2 + 0.6 * Math.random());
    const oy = H * (0.2 + 0.6 * Math.random());
    const arms = 6 + Math.floor(Math.random() * 4);
    for (let a = 0; a < arms; a++) {
      let x = ox, y = oy;
      let angle = (a / arms) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const hue = 190 + Math.random() * 40;
      for (let s = 0; s < 55; s++) {
        angle += (Math.random() - 0.5) * 0.4;
        const nx = x + Math.cos(angle) * (5 + Math.random() * 6);
        const ny = y + Math.sin(angle) * (5 + Math.random() * 6);
        segs.push({ x1: x, y1: y, x2: nx, y2: ny, hue, w: Math.max(0.5, 2.5 - s * 0.03) });
        if (Math.random() < 0.05) {
          let bx = nx, by = ny, ba = angle + (Math.random() < 0.5 ? 1 : -1) * (0.8 + Math.random() * 0.6);
          for (let b = 0; b < 18; b++) {
            ba += (Math.random() - 0.5) * 0.3;
            const bnx = bx + Math.cos(ba) * 5;
            const bny = by + Math.sin(ba) * 5;
            segs.push({ x1: bx, y1: by, x2: bnx, y2: bny, hue: (hue + 15) % 360, w: 0.8 });
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
  ctx.fillStyle = 'rgba(221,216,204,0.06)';
  ctx.fillRect(0, 0, W, H);
  for (const s of segs) drawShinyVeinStroke(ctx, s.x1, s.y1, s.x2, s.y2, s.w, s.hue);
  requestAnimationFrame(frame);
}
frame();
