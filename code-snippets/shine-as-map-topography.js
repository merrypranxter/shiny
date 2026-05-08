// ✦ System 18: Shine as Map/Topography
// Contour bands + elevation shine

function topographicMap(w, h, elevationFn) {
  const elevation = [];
  const contours = [];

  // Sample elevation
  for (let y = 0; y < h; y++) {
    elevation[y] = [];
    for (let x = 0; x < w; x++) {
      const u = x / w, v = y / h;
      elevation[y][x] = elevationFn(u, v);
    }
  }

  // Extract contour bands
  const bands = 10;
  for (let b = 0; b < bands; b++) {
    const threshold = b / bands;
    const band = [];

    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const e = elevation[y][x];
        const eRight = elevation[y][x + 1];
        const eDown = elevation[y + 1][x];

        // Edge crossing
        if ((e < threshold && eRight >= threshold) ||
            (e >= threshold && eRight < threshold) ||
            (e < threshold && eDown >= threshold) ||
            (e >= threshold && eDown < threshold)) {
          band.push({ x, y, elevation: e });
        }
      }
    }

    contours.push({ threshold, points: band });
  }

  return { elevation, contours };
}

function drawTopographicShine(ctx, topo, time) {
  const { contours } = topo;

  for (let b = 0; b < contours.length; b++) {
    const contour = contours[b];
    const t = b / contours.length;

    // Metallic gradient: low = warm, high = cool
    const hue = 30 + t * 200; // 30 (warm) to 230 (cool)
    const sat = 40 + t * 30;
    const light = 30 + t * 40;

    ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${light}%, 0.6)`;
    ctx.lineWidth = 1 + t * 2;
    ctx.shadowBlur = t * 4;
    ctx.shadowColor = ctx.strokeStyle;

    ctx.beginPath();
    for (const p of contour.points) {
      ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
  }
  ctx.shadowBlur = 0;
}

function defaultElevation(u, v) {
  return fbm(u * 4, v * 4) * 0.5 + fbm(u * 8, v * 8) * 0.25;
}
