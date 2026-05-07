/* System 08 – Infrastructure Made of Brilliance
   Principle: shine is infrastructure, not finish */

const canvas = document.getElementById('c');
const ctx    = canvas.getContext('2d');
let W, H, net, time = 0;

function rebuild() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  net = makeNetwork(W, H, 55);
}

function loop() {
  time += 0.01;

  ctx.fillStyle = 'rgba(8,6,14,0.28)';
  ctx.fillRect(0, 0, W, H);

  // Draw conduits
  for (let i = 0; i < net.edges.length; i++) {
    const [ai, bi] = net.edges[i];
    const a = net.nodes[ai];
    const b = net.nodes[bi];
    drawChromeConduit(ctx, a, b, time, i);
  }

  // Pulse animations on each edge
  for (let i = 0; i < net.edges.length; i++) {
    const [ai, bi] = net.edges[i];
    const a = net.nodes[ai];
    const b = net.nodes[bi];
    drawPulseOnEdge(ctx, a, b, time, i);
  }

  // Rhinestone nodes at junctions
  for (let i = 0; i < net.nodes.length; i++) {
    const n   = net.nodes[i];
    const hue = (i * 53 + time * 30) % 360;
    drawRhinestoneNode(ctx, n.x, n.y, 5 + 3 * Math.sin(time * 2 + i * 0.4), hue, time);
  }

  requestAnimationFrame(loop);
}

window.addEventListener('resize', rebuild);
rebuild();
ctx.fillStyle = '#08060e';
ctx.fillRect(0, 0, W, H);
requestAnimationFrame(loop);
