/* System 04 – Buried Shine Under Cloudy Material
   Principle: visual depth through depth separation */

const canvas = document.getElementById('c');
const ctx    = canvas.getContext('2d');
let W, H, time = 0;

// Static buried layer: computed once and drawn to offscreen
let buriedCanvas = null;

function buildBuriedLayer() {
  buriedCanvas = document.createElement('canvas');
  buriedCanvas.width  = W;
  buriedCanvas.height = H;
  const bc = buriedCanvas.getContext('2d');
  bc.fillStyle = '#0a080f';
  bc.fillRect(0, 0, W, H);

  // Buried light lines in a loose web
  const lineCount = 24;
  for (let i = 0; i < lineCount; i++) {
    const x1 = Math.random() * W, y1 = Math.random() * H;
    const x2 = x1 + (Math.random() - 0.5) * W * 0.6;
    const y2 = y1 + (Math.random() - 0.5) * H * 0.6;
    const hue = 180 + Math.random() * 180;
    drawBuriedLightLine(bc, x1, y1, x2, y2, hue);
  }

  // Rhinestone nodes at line intersections (approximated as random points)
  for (let i = 0; i < 30; i++) {
    const x   = Math.random() * W;
    const y   = Math.random() * H;
    const hue = 200 + Math.random() * 160;
    drawRhinestoneNode(bc, x, y, 4 + Math.random() * 6, hue, 0);
  }
}

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  buildBuriedLayer();
}

function loop() {
  time += 0.01;

  // Draw the static buried layer
  ctx.drawImage(buriedCanvas, 0, 0);

  // Pulsing rhinestone shimmer (on top of buried layer, under veil)
  const nodeCount = 30;
  for (let i = 0; i < nodeCount; i++) {
    const nx = hash2(i, 0) * W;
    const ny = hash2(0, i) * H;
    const hue = 200 + hash2(i, 1) * 160;
    drawRhinestoneNode(ctx, nx, ny, 5 + 3 * Math.sin(time * 3 + i), hue, time);
  }

  // Animated buried light lines (subtle slow drift)
  for (let i = 0; i < 6; i++) {
    const ph  = time * 0.3 + i * 1.1;
    const x1  = (hash2(i, 10) * W + Math.sin(ph) * 30) % W;
    const y1  = (hash2(i, 11) * H + Math.cos(ph) * 20) % H;
    const x2  = (hash2(i, 12) * W + Math.sin(ph + 1) * 30) % W;
    const y2  = (hash2(i, 13) * H + Math.cos(ph + 1) * 20) % H;
    const hue = 180 + 180 * Math.sin(time + i);
    drawBuriedLightLine(ctx, x1, y1, x2, y2, hue);
  }

  // Multiple cloudy veil passes for depth
  drawCloudyVeil(ctx, W, H);
  drawCloudyVeil(ctx, W, H);
  drawCloudyVeil(ctx, W, H);

  requestAnimationFrame(loop);
}

window.addEventListener('resize', resize);
resize();
requestAnimationFrame(loop);
