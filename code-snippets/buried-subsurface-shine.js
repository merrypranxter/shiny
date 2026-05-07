// ✦ System 4: Buried Subsurface Shine
// SDF + fresnel edge glow

function buriedShine(ctx, w, h, time) {
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = x / w, v = y / h;

      // SDF for blob shape
      const d = sdfBlob(u, v, time);

      // Fresnel: edge = bright, center = dark
      const fresnel = Math.pow(1.0 - Math.abs(d), 3.0);

      // Subsurface glow
      const glow = Math.exp(-Math.abs(d) * 8) * (0.5 + 0.5 * Math.sin(time + d * 10));

      const idx = (y * w + x) * 4;
      data[idx] = 255 * fresnel * 0.9 + glow * 50;     // R
      data[idx+1] = 255 * fresnel * 0.7 + glow * 100; // G
      data[idx+2] = 255 * fresnel * 0.5 + glow * 150;  // B
      data[idx+3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

function sdfBlob(x, y, t) {
  return Math.hypot(x - 0.5, y - 0.5) - 0.3 + Math.sin(x * 5 + t) * 0.05;
}
