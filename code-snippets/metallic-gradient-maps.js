// ✦ System 6: Metallic Gradient Maps
// Fake normal maps from scalar fields

function metallicPalette(t, hueShift = 0) {
  t = Math.max(0, Math.min(1, t));

  const shine = Math.pow(Math.max(0, Math.sin(t * Math.PI)), 0.35);
  const darkBand = Math.pow(Math.max(0, Math.sin((t + 0.15) * Math.PI)), 0.6);
  const whiteSlash = Math.pow(Math.max(0, Math.sin((t + 0.35) * Math.PI * 2)), 8);

  const r = 0.15 + darkBand * 0.3 + shine * 0.5 + whiteSlash * 0.9;
  const g = 0.1 + darkBand * 0.25 + shine * 0.45 + whiteSlash * 0.85;
  const b = 0.08 + darkBand * 0.2 + shine * 0.4 + whiteSlash * 0.8;

  // Hue shift
  const [hr, hg, hb] = hueRotate([r, g, b], hueShift);
  return [hr, hg, hb];
}

function fakeNormalMap(ctx, scalarField, w, h) {
  const imageData = ctx.createImageData(w, h);
  const data = imageData.data;

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const dx = scalarField[y][x+1] - scalarField[y][x-1];
      const dy = scalarField[y+1][x] - scalarField[y-1][x];

      const normal = [dx * 0.5 + 0.5, dy * 0.5 + 0.5, 1.0];
      const idx = (y * w + x) * 4;
      data[idx] = normal[0] * 255;
      data[idx+1] = normal[1] * 255;
      data[idx+2] = normal[2] * 255;
      data[idx+3] = 255;
    }
  }
  return imageData;
}
