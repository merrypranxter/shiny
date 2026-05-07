/* System 15 – Shine-As-Language / Symbol
   Principle: shine behaves like information */

const canvas = document.getElementById('c');
const ctx    = canvas.getContext('2d');
let W, H, time = 0;

// Sigil placement — recomputed on resize
let sigils = [];

function buildSigils() {
  sigils = [];
  const count = 6;
  for (let i = 0; i < count; i++) {
    sigils.push({
      x:    (0.1 + 0.8 * hash2(i, 99)) * W,
      y:    (0.1 + 0.8 * hash2(99, i)) * H,
      r:    55 + 70 * hash2(i, 7),
      seed: i * 3 + Math.floor(hash2(i, 8) * 9),
    });
  }
}

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  buildSigils();
}

function loop() {
  time += 0.011;

  // Very slow fade for residual trails
  ctx.fillStyle = 'rgba(10,8,15,0.14)';
  ctx.fillRect(0, 0, W, H);

  for (const s of sigils) {
    // Slow orbital drift
    const ox = 12 * Math.sin(time * 0.25 + s.seed * 0.7);
    const oy = 10 * Math.cos(time * 0.2  + s.seed * 0.5);
    const cx = s.x + ox;
    const cy = s.y + oy;

    // Subtle dark aura
    const aura = ctx.createRadialGradient(cx, cy, 0, cx, cy, s.r * 1.4);
    aura.addColorStop(0, 'rgba(20,8,40,0.18)');
    aura.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = aura;
    ctx.beginPath(); ctx.arc(cx, cy, s.r * 1.4, 0, Math.PI * 2); ctx.fill();

    drawSigil(ctx, cx, cy, s.r, time, s.seed);
  }

  requestAnimationFrame(loop);
}

window.addEventListener('resize', resize);
resize();
ctx.fillStyle = '#0a080f';
ctx.fillRect(0, 0, W, H);
requestAnimationFrame(loop);
