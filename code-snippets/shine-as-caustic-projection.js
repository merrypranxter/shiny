// ✦ System 19: Shine as Caustic Projection
// Warped domain + recursive distortion

function causticProjection(ctx, w, h, time) {
  const imageData = ctx.createImageData(w, h);
  const data = imageData.data;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = x / w, v = y / h;

      // Domain warp
      let wx = u, wy = v;
      for (let i = 0; i < 4; i++) {
        const a = Math.sin(wy * 2.8 + time * 0.75 + i * 1.9);
        const b = Math.cos(wx * 2.5 - time * 0.55 + i * 2.4);
        wx += a * 0.13;
        wy += b * 0.13;
      }

      // Caustic intensity
      const r1 = Math.abs(Math.sin(wx * 7.2 + Math.sin(wy)));
      const r2 = Math.abs(Math.sin(wy * 8.3 + Math.cos(wx * 1.3)));
      const caustic = Math.pow(Math.max(0, 1 - Math.min(r1, r2)), 8);

      // Chromatic separation
      const phase = caustic * 10 + time;
      const r = 120 + 120 * Math.sin(phase + 0.0);
      const g = 120 + 120 * Math.sin(phase + 2.1);
      const b = 120 + 120 * Math.sin(phase + 4.2);

      const idx = (y * w + x) * 4;
      data[idx] = r * caustic;
      data[idx+1] = g * caustic;
      data[idx+2] = b * caustic;
      data[idx+3] = caustic * 255 * 0.3; // low opacity for layering
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

// Blend mode helper
function blendCaustic(ctx, causticCanvas, mode = 'screen') {
  ctx.globalCompositeOperation = mode;
  ctx.drawImage(causticCanvas, 0, 0);
  ctx.globalCompositeOperation = 'source-over';
}
