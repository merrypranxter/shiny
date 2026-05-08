// ✦ System 8: Infrastructure Brilliance
// Graph networks + circuit traces

function infrastructureNetwork(w, h, nodeCount) {
  const nodes = [];
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * w,
      y: Math.random() * h,
      id: i,
      capacity: 1 + Math.random() * 3
    });
  }

  const edges = [];
  for (let i = 0; i < nodes.length; i++) {
    // Connect to nearest neighbors
    const dists = nodes.map((n, j) => ({
      j, d: Math.hypot(n.x - nodes[i].x, n.y - nodes[i].y)
    })).filter(d => d.j !== i).sort((a, b) => a.d - b.d);

    for (let k = 0; k < 2 && k < dists.length; k++) {
      edges.push({
        from: i,
        to: dists[k].j,
        thickness: nodes[i].capacity * 0.5
      });
    }
  }

  return { nodes, edges };
}

function drawInfrastructure(ctx, network, time) {
  // Draw edges as chrome conduits
  for (const e of network.edges) {
    const n1 = network.nodes[e.from];
    const n2 = network.nodes[e.to];

    const pulse = Math.sin(time * 3 + e.from * 0.5) * 0.5 + 0.5;
    ctx.strokeStyle = `hsla(200, 10%, ${60 + pulse * 40}%, 0.8)`;
    ctx.lineWidth = e.thickness * (1 + pulse);
    ctx.shadowBlur = 6 * pulse;
    ctx.shadowColor = 'rgba(200, 220, 255, 0.5)';

    ctx.beginPath();
    ctx.moveTo(n1.x, n1.y);
    ctx.lineTo(n2.x, n2.y);
    ctx.stroke();
  }
  ctx.shadowBlur = 0;

  // Draw nodes as junction jewels
  for (const n of network.nodes) {
    const glow = Math.sin(time * 2 + n.id) * 0.5 + 0.5;
    ctx.fillStyle = `hsla(180, 80%, 70%, ${0.5 + glow * 0.5})`;
    ctx.beginPath();
    ctx.arc(n.x, n.y, 3 + glow * 2, 0, Math.PI * 2);
    ctx.fill();
  }
}
