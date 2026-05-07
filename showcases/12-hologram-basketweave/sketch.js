const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let hSegs = [], vSegs = [];

function init() {
  hSegs = []; vSegs = [];
  const sp = 28;
  for (let y = sp / 2; y < H; y += sp) {
    const segs = [];
    for (let x = 0; x < W; x += sp) segs.push({ x1: x, y1: y, x2: x + sp, y2: y, hue: (y * 2) % 360 });
    hSegs.push(segs);
  }
  for (let x = sp / 2; x < W; x += sp) {
    const segs = [];
    for (let y = 0; y < H; y += sp) segs.push({ x1: x, y1: y, x2: x, y2: y + sp, hue: (x * 2 + 90) % 360 });
    vSegs.push(segs);
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(10,8,15,0.3)';
  ctx.fillRect(0, 0, W, H);
  // Draw horizontal ribbons under
  for (let r = 0; r < hSegs.length; r++) {
    for (const s of hSegs[r]) {
      if (Math.floor(s.x1 / 28) % 2 === 0) drawRibbonSegment(ctx, s.x1, s.y1, s.x2, s.y2, 12, s.hue, time, false);
    }
  }
  // Draw vertical ribbons
  for (const row of vSegs) {
    for (const s of row) drawRibbonSegment(ctx, s.x1, s.y1, s.x2, s.y2, 12, s.hue, time, true);
  }
  // Draw horizontal ribbons on top
  for (let r = 0; r < hSegs.length; r++) {
    for (const s of hSegs[r]) {
      if (Math.floor(s.x1 / 28) % 2 === 1) drawRibbonSegment(ctx, s.x1, s.y1, s.x2, s.y2, 12, s.hue, time, true);
    }
  }
  requestAnimationFrame(frame);
}
frame();
