// ✦ System 3: Kintsugi Crack Seam Shine
// Voronoi fracture + pearl fill

function voronoiFracture(seeds, w, h) {
  const cracks = [];
  for (let x = 0; x < w; x += 2) {
    for (let y = 0; y < h; y += 2) {
      let d1 = Infinity, d2 = Infinity;
      let nearest = null;
      for (const s of seeds) {
        const d = Math.hypot(x - s.x, y - s.y);
        if (d < d1) { d2 = d1; d1 = d; nearest = s; }
        else if (d < d2) { d2 = d; }
      }
      // Edge pixel
      if (Math.abs(d2 - d1) < 3) {
        cracks.push({x, y, width: 1 + Math.random()});
      }
    }
  }
  return cracks;
}

function pearlFill(ctx, cracks, time) {
  for (const c of cracks) {
    const irid = Math.sin(c.x * 0.1 + time) * Math.cos(c.y * 0.1 + time * 0.7);
    const hue = 30 + irid * 30; // warm pearl
    ctx.fillStyle = `hsla(${hue}, 40%, 80%, 0.9)`;
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.width, 0, Math.PI * 2);
    ctx.fill();
  }
}
