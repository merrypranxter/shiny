// ✦ System 5: Glitter Ecology Clusters
// Blue noise + density-based sparkle

function glitterEcology(w, h, count) {
  const particles = blueNoisePoints(count, w, h);
  const clusters = [];

  // Density-based clustering
  for (const p of particles) {
    let neighbors = 0;
    for (const q of particles) {
      if (Math.hypot(p.x - q.x, p.y - q.y) < 20) neighbors++;
    }
    p.density = neighbors;
    p.size = 1 + Math.random() * 2;
    p.hue = 200 + Math.random() * 60; // cool tones
    p.saturation = 30 + p.density * 10;
  }

  return particles;
}

function drawGlitter(ctx, particles, time) {
  for (const p of particles) {
    const twinkle = Math.sin(time * 3 + p.x * 0.1 + p.y * 0.1);
    if (twinkle < 0.7) continue; // only some sparkle at once

    ctx.fillStyle = `hsla(${p.hue}, ${p.saturation}%, 80%, ${twinkle})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * twinkle, 0, Math.PI * 2);
    ctx.fill();
  }
}
