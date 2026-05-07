const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let rivers = [];

function init() {
  rivers = [];
  for (let r = 0; r < 18; r++) {
    const pts = [];
    let x = W * (0.05 + 0.9 * Math.random()), y = 0;
    for (let s = 0; s < 50; s++) {
      const nx = pseudoFbm(x * 0.004, y * 0.005);
      const ny = pseudoFbm(x * 0.005 + 5, y * 0.004 + 3);
      x += (nx - 0.5) * 16;
      y += 8 + ny * 8;
      pts.push({ x, y });
    }
    rivers.push({ pts, hue: 35 + Math.random() * 20, w: 1 + Math.random() * 2 });
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(61,46,24,0.2)';
  ctx.fillRect(0, 0, W, H);
  for (const rv of rivers) {
    for (let p = 0; p < rv.pts.length - 1; p++) {
      const a = rv.pts[p], b = rv.pts[p + 1];
      drawSeamGlow(ctx, a.x, a.y, b.x, b.y, rv.w);
    }
    for (let p = 0; p < rv.pts.length; p++) {
      if (rv.pts[p].y > H * 0.6 && Math.random() < 0.3) {
        drawDryGlitterDust(ctx, rv.pts[p].x, rv.pts[p].y, 18, 10, time, rv.hue);
      }
    }
  }
  requestAnimationFrame(frame);
}
frame();
