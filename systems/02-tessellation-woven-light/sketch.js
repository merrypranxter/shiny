/* System 02 – Tessellation Woven From Colored Light
   Principle: geometry becomes shine-carrying infrastructure */

const canvas = document.getElementById('c');
const ctx    = canvas.getContext('2d');
let W, H, points, edges, time = 0;

function rebuild() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  points = makeRandomPoints(80, W, H);
  edges  = nearestNeighbors(points, 3);
}

function loop() {
  time += 0.008;

  // Slow fade for trails
  ctx.fillStyle = 'rgba(10,8,15,0.18)';
  ctx.fillRect(0, 0, W, H);

  // Draw each edge as a light ribbon with animated hue
  for (let i = 0; i < edges.length; i++) {
    const [a, b] = edges[i];
    const hueA = (i * 47 + time * 28) % 360;
    const hueB = (hueA + 120 + 80 * Math.sin(time + i * 0.3)) % 360;
    drawLightRibbon(ctx, a, b, hueA, hueB);
  }

  // Rhinestone node at each point
  for (let i = 0; i < points.length; i++) {
    const p   = points[i];
    const hue = (i * 37 + time * 40) % 360;
    drawRhinestoneNode(ctx, p.x, p.y, 4 + 2 * Math.sin(time * 2 + i), hue, time);
  }

  requestAnimationFrame(loop);
}

window.addEventListener('resize', rebuild);
rebuild();
ctx.fillStyle = '#0a080f';
ctx.fillRect(0, 0, W, H);
requestAnimationFrame(loop);
