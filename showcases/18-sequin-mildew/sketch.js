const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(13,16,8,0.22)';
  ctx.fillRect(0, 0, W, H);
  // Bloom zones from corners
  const corners = [{ x: 0, y: 0 }, { x: W, y: 0 }, { x: 0, y: H }, { x: W, y: H }];
  const radius = Math.min(W, H) * (0.35 + 0.1 * Math.sin(time * 0.5));
  for (const c of corners) {
    for (let i = 0; i < 180; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * radius;
      const x = c.x + Math.cos(a) * r;
      const y = c.y + Math.sin(a) * r;
      const hue = 50 + Math.random() * 40;
      const flash = 0.3 + 0.7 * Math.random();
      ctx.fillStyle = `hsla(${hue},90%,${50 + flash * 35}%,${flash * 0.6})`;
      ctx.beginPath();
      ctx.arc(x, y, 1 + Math.random(), 0, Math.PI * 2);
      ctx.fill();
    }
  }
  requestAnimationFrame(frame);
}
frame();
