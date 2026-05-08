// ✦ System 13: Shine as Woven Structure
// Weave rules + over-under logic

function wovenStructure(w, h, warpCount, weftCount) {
  const warp = [];
  const weft = [];

  // Warp threads (vertical)
  for (let i = 0; i < warpCount; i++) {
    warp.push({
      x: (i / (warpCount - 1)) * w,
      thickness: 2 + Math.random(),
      material: i % 3 === 0 ? 'chrome' : 'matte'
    });
  }

  // Weft threads (horizontal)
  for (let j = 0; j < weftCount; j++) {
    weft.push({
      y: (j / (weftCount - 1)) * h,
      thickness: 2 + Math.random(),
      material: j % 3 === 0 ? 'holographic' : 'matte'
    });
  }

  return { warp, weft };
}

function drawWeave(ctx, weave, time) {
  const { warp, weft } = weave;

  // Draw warp
  for (let i = 0; i < warp.length; i++) {
    const thread = warp[i];
    const isOver = i % 2 === 0;

    ctx.strokeStyle = thread.material === 'chrome' 
      ? `hsla(200, 10%, ${70 + Math.sin(time + i) * 20}%, 0.9)`
      : 'rgba(100, 100, 100, 0.5)';
    ctx.lineWidth = thread.thickness;
    ctx.shadowBlur = isOver ? 3 : 0;
    ctx.shadowColor = ctx.strokeStyle;

    ctx.beginPath();
    ctx.moveTo(thread.x, 0);
    ctx.lineTo(thread.x, ctx.canvas.height);
    ctx.stroke();
  }

  // Draw weft
  for (let j = 0; j < weft.length; j++) {
    const thread = weft[j];
    const isOver = j % 2 === 1;

    ctx.strokeStyle = thread.material === 'holographic'
      ? `hsla(${j * 10 + time * 30}, 80%, 60%, 0.8)`
      : 'rgba(100, 100, 100, 0.5)';
    ctx.lineWidth = thread.thickness;
    ctx.shadowBlur = isOver ? 4 : 0;
    ctx.shadowColor = ctx.strokeStyle;

    ctx.beginPath();
    ctx.moveTo(0, thread.y);
    ctx.lineTo(ctx.canvas.width, thread.y);
    ctx.stroke();
  }
  ctx.shadowBlur = 0;
}
