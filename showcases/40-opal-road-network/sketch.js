const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let net = null;

function init() {
  net = makeNetwork(W, H, 50);
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(10,12,10,0.25)';
  ctx.fillRect(0, 0, W, H);
  for (const e of net.edges) {
    const a = net.nodes[e[0]], b = net.nodes[e[1]];
    const hueA = (160 + e[0] * 17 + time * 15) % 360;
    const hueB = (180 + e[1] * 13 + time * 15) % 360;
    // Soft opal gradient
    const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
    g.addColorStop(0, `hsla(${hueA},80%,60%,0.55)`);
    g.addColorStop(0.5, `hsla(${(hueA + hueB) / 2},90%,80%,0.45)`);
    g.addColorStop(1, `hsla(${hueB},80%,60%,0.55)`);
    ctx.strokeStyle = g;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    // Glow
    ctx.strokeStyle = `hsla(${hueA},100%,70%,0.1)`;
    ctx.lineWidth = 10;
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
  }
  for (const n of net.nodes) {
    drawRhinestoneNode(ctx, n.x, n.y, 3, (170 + n.id * 19 + time * 10) % 360, time);
  }
  requestAnimationFrame(frame);
}
frame();
