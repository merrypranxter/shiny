// ✦ System 2: Tessellation Woven Light
// Penrose tiling edge glow

function penroseEdgeGlow(ctx, tiles, time) {
  for (const tile of tiles) {
    // Draw matte interior
    ctx.fillStyle = matteColor(tile.center);
    ctx.beginPath();
    for (const v of tile.vertices) ctx.lineTo(v.x, v.y);
    ctx.closePath();
    ctx.fill();

    // Draw glowing edge
    ctx.strokeStyle = fiberOpticColor(tile.edgeIndex, time);
    ctx.lineWidth = 2 + Math.sin(time * 2 + tile.edgeIndex) * 1;
    ctx.shadowBlur = 8;
    ctx.shadowColor = ctx.strokeStyle;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }
}

function fiberOpticColor(index, time) {
  const hue = (index * 30 + time * 10) % 360;
  return `hsla(${hue}, 80%, 60%, 0.8)`;
}
