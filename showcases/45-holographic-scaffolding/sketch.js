const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

let rods = [], joints = [];

function init() {
  rods = []; joints = [];
  const hsp = 60, vsp = 55;
  const cols = Math.ceil(W / hsp) + 1, rows = Math.ceil(H / vsp) + 1;
  // Horizontal rods
  for (let r = 0; r < rows; r++) {
    const y = r * vsp;
    for (let c = 0; c < cols - 1; c++) {
      const x = c * hsp;
      rods.push({ a: { x, y }, b: { x: x + hsp, y }, hueA: (r * 30 + c * 15) % 360, hueB: (r * 30 + (c + 1) * 15) % 360 });
    }
  }
  // Vertical rods
  for (let c = 0; c < cols; c++) {
    const x = c * hsp;
    for (let r = 0; r < rows - 1; r++) {
      const y = r * vsp;
      rods.push({ a: { x, y }, b: { x, y: y + vsp }, hueA: (c * 20 + r * 10 + 90) % 360, hueB: (c * 20 + (r + 1) * 10 + 90) % 360 });
    }
  }
  // Diagonal rods (sparse)
  for (let r = 0; r < rows - 1; r++) {
    for (let c = 0; c < cols - 1; c++) {
      if (Math.random() < 0.18) {
        const x1 = c * hsp, y1 = r * vsp, x2 = (c + 1) * hsp, y2 = (r + 1) * vsp;
        rods.push({ a: { x: x1, y: y1 }, b: { x: x2, y: y2 }, hueA: (r * 40 + c * 23 + 200) % 360, hueB: (r * 40 + c * 23 + 240) % 360 });
      }
    }
  }
  // Joint ellipses at grid intersections
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (Math.random() < 0.4) joints.push({ x: c * hsp, y: r * vsp, hue: (r * 25 + c * 17) % 360 });
    }
  }
}
init();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(10,11,12,0.28)';
  ctx.fillRect(0, 0, W, H);
  for (const r of rods) drawLightRibbon(ctx, r.a, r.b, (r.hueA + time * 12) % 360, (r.hueB + time * 12) % 360);
  // Matte ellipses at joints
  for (const j of joints) {
    ctx.fillStyle = `hsla(${j.hue},30%,25%,0.7)`;
    ctx.beginPath();
    ctx.ellipse(j.x, j.y, 7, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = `hsla(${j.hue},60%,60%,0.5)`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  requestAnimationFrame(frame);
}
frame();
