const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let nodes = [];

function init() {
  nodes = [];
  const sp = 44;
  for (let y = sp; y < H; y += sp) {
    for (let x = sp; x < W; x += sp) {
      nodes.push({ x, y, hue: (160 + x * 0.3 + y * 0.2) % 360, r: 4 + Math.random() * 3 });
    }
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(6,10,18,0.25)';
  ctx.fillRect(0, 0, W, H);
  // Draw net lines
  const sp = 44;
  ctx.strokeStyle = 'rgba(100,180,200,0.15)';
  ctx.lineWidth = 1;
  for (let y = sp; y < H; y += sp) {
    ctx.beginPath(); ctx.moveTo(sp, y); ctx.lineTo(W - sp, y); ctx.stroke();
  }
  for (let x = sp; x < W; x += sp) {
    ctx.beginPath(); ctx.moveTo(x, sp); ctx.lineTo(x, H - sp); ctx.stroke();
  }
  for (const n of nodes) drawRhinestoneNode(ctx, n.x, n.y, n.r, n.hue, time);
  requestAnimationFrame(frame);
}
frame();
