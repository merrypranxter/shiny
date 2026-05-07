const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();

let time = 0;
function frame() {
  time += 0.016;
  ctx.fillStyle = 'rgba(13,16,8,0.18)';
  ctx.fillRect(0, 0, W, H);

  // Bloom zones from corners using cheapField for density
  const corners = [{ x: 0, y: 0 }, { x: W, y: 0 }, { x: 0, y: H }, { x: W, y: H }];
  const baseRadius = Math.min(W, H) * (0.38 + 0.08 * Math.sin(time * 0.4));

  for (const c of corners) {
    for (let i = 0; i < 200; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * baseRadius;
      const x = c.x + Math.cos(a) * r;
      const y = c.y + Math.sin(a) * r;
      if (x < 0 || x > W || y < 0 || y > H) continue;

      // Use cheapField to modulate density — denser in "damp" zones
      const field = cheapField(x * 0.01, y * 0.01, time * 0.3);
      if (field < 0.45) continue;

      const hue = 50 + Math.random() * 40;
      const flash = field * (0.4 + 0.6 * Math.random());
      const sequinR = 1 + Math.random() * 1.2;
      ctx.fillStyle = `hsla(${hue},90%,${50 + flash * 40}%,${flash * 0.7})`;
      ctx.beginPath();
      ctx.arc(x, y, sequinR, 0, Math.PI * 2);
      ctx.fill();

      // Occasional mini glint crosshair on brightest sequins
      if (flash > 0.88) {
        drawMiniGlint(ctx, x, y, 3);
      }
    }
  }
  requestAnimationFrame(frame);
}
frame();
