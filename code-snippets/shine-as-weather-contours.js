// ✦ System 7: Shine as Weather Contours
// Contour extraction + metallic bands

function contourShine(ctx, w, h, time) {
  // Generate pressure field
  const pressure = generatePressureField(w, h, time);

  // Extract contours
  const bands = 8;
  for (let b = 0; b < bands; b++) {
    const threshold = b / bands;
    ctx.strokeStyle = metallicBandColor(b, bands, time);
    ctx.lineWidth = 2 + Math.sin(time + b) * 1;
    ctx.shadowBlur = 4;
    ctx.shadowColor = ctx.strokeStyle;

    // Marching squares or threshold tracing
    traceContour(ctx, pressure, threshold, w, h);
  }
  ctx.shadowBlur = 0;
}

function metallicBandColor(band, total, time) {
  const t = band / total;
  const hue = (200 + t * 60 + time * 10) % 360;
  return `hsla(${hue}, 70%, 50%, 0.7)`;
}

function generatePressureField(w, h, time) {
  const field = [];
  for (let y = 0; y < h; y++) {
    field[y] = [];
    for (let x = 0; x < w; x++) {
      const u = x / w, v = y / h;
      field[y][x] = fbm(u * 3, v * 3 + time * 0.1);
    }
  }
  return field;
}
