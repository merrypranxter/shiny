const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let compartments = [];

function init() {
  compartments = [];
  const cols = 5, rows = 4;
  const cw = W / cols, ch = H / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      compartments.push({
        x: c * cw + 6, y: r * ch + 6, w: cw - 12, h: ch - 12,
        type: (r * cols + c) % 4, hue: (c * 47 + r * 83) % 360,
        seed: Math.random() * 100
      });
    }
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(16,12,8,0.3)';
  ctx.fillRect(0, 0, W, H);
  for (const cm of compartments) {
    const cx = cm.x + cm.w / 2, cy = cm.y + cm.h / 2;
    // Box outline
    ctx.strokeStyle = `hsla(${cm.hue},60%,40%,0.5)`;
    ctx.lineWidth = 1;
    ctx.strokeRect(cm.x, cm.y, cm.w, cm.h);
    if (cm.type === 0) {
      drawWetBlob(ctx, cx, cy, Math.min(cm.w, cm.h) * 0.3, time, cm.hue);
    } else if (cm.type === 1) {
      drawSigil(ctx, cx, cy, Math.min(cm.w, cm.h) * 0.35, time, cm.seed);
    } else if (cm.type === 2) {
      const segs = 8;
      for (let i = 0; i < segs; i++) {
        const a = (i / segs) * Math.PI * 2;
        drawLivingShineTube(ctx, cx, cy, cx + Math.cos(a) * cm.w * 0.38, cy + Math.sin(a) * cm.h * 0.38, 1.2, cm.hue + i * 15, time, i);
      }
    } else {
      drawDryGlitterDust(ctx, cx, cy, Math.min(cm.w, cm.h) * 0.4, 40, time, cm.hue);
    }
  }
  requestAnimationFrame(frame);
}
frame();
