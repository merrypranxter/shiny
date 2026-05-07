// ✦ System 9: Shine as Embroidery
// Hilbert curves + stitch patterns

function hilbertCurve(order, w, h) {
  const points = [];
  const n = Math.pow(2, order);

  for (let i = 0; i < n * n; i++) {
    const [x, y] = hilbertXY(i, order);
    points.push({
      x: x / n * w,
      y: y / n * h,
      index: i
    });
  }
  return points;
}

function hilbertXY(index, order) {
  let x = 0, y = 0;
  for (let s = 1; s < Math.pow(2, order); s *= 2) {
    const rx = (index / 2) & 1;
    const ry = (index ^ rx) & 1;
    if (ry === 0) {
      if (rx === 1) { x = s - 1 - x; y = s - 1 - y; }
      [x, y] = [y, x];
    }
    x += rx * s;
    y += ry * s;
    index /= 4;
  }
  return [x, y];
}

function drawEmbroidery(ctx, stitches, time) {
  for (let i = 0; i < stitches.length - 1; i++) {
    const s1 = stitches[i];
    const s2 = stitches[i + 1];

    const threadHue = (s1.index * 2 + time * 20) % 360;
    const thickness = 1 + Math.sin(s1.index * 0.1) * 0.5;

    ctx.strokeStyle = `hsla(${threadHue}, 70%, 60%, 0.9)`;
    ctx.lineWidth = thickness;
    ctx.lineCap = 'round';

    // Over/under effect
    const isOver = Math.floor(s1.index / 4) % 2 === 0;
    ctx.shadowBlur = isOver ? 2 : 0;
    ctx.shadowColor = ctx.strokeStyle;

    ctx.beginPath();
    ctx.moveTo(s1.x, s1.y);
    ctx.lineTo(s2.x, s2.y);
    ctx.stroke();
  }
  ctx.shadowBlur = 0;
}
