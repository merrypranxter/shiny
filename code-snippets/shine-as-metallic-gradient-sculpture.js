// ✦ System 20: Shine as Metallic Gradient Sculpture
// Gradient flow + chrome surfaces

function metallicSculpture(w, h, time) {
  const imageData = ctx.createImageData(w, h);
  const data = imageData.data;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = x / w, v = y / h;

      // Gradient field
      const angle = Math.atan2(v - 0.5, u - 0.5) + time * 0.2;
      const dist = Math.hypot(u - 0.5, v - 0.5);

      // Metallic palette
      const t = (angle / (Math.PI * 2) + 0.5 + dist * 2) % 1;
      const shine = Math.pow(Math.max(0, Math.sin(t * Math.PI)), 0.35);
      const darkBand = Math.pow(Math.max(0, Math.sin((t + 0.15) * Math.PI)), 0.6);
      const whiteSlash = Math.pow(Math.max(0, Math.sin((t + 0.35) * Math.PI * 2)), 8);

      const r = 0.15 + darkBand * 0.3 + shine * 0.5 + whiteSlash * 0.9;
      const g = 0.1 + darkBand * 0.25 + shine * 0.45 + whiteSlash * 0.85;
      const b = 0.08 + darkBand * 0.2 + shine * 0.4 + whiteSlash * 0.8;

      // Hue rotation
      const hueShift = time * 10;
      const [hr, hg, hb] = hueRotate([r, g, b], hueShift);

      const idx = (y * w + x) * 4;
      data[idx] = hr * 255;
      data[idx+1] = hg * 255;
      data[idx+2] = hb * 255;
      data[idx+3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

function hueRotate(rgb, degrees) {
  const [r, g, b] = rgb;
  const angle = degrees * Math.PI / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  const matrix = [
    [0.213 + cos * 0.787 - sin * 0.213, 0.715 - cos * 0.715 - sin * 0.715, 0.072 - cos * 0.072 + sin * 0.928],
    [0.213 - cos * 0.213 + sin * 0.143, 0.715 + cos * 0.285 + sin * 0.140, 0.072 - cos * 0.072 - sin * 0.283],
    [0.213 - cos * 0.213 - sin * 0.787, 0.715 - cos * 0.715 + sin * 0.715, 0.072 + cos * 0.928 + sin * 0.072]
  ];

  return [
    r * matrix[0][0] + g * matrix[0][1] + b * matrix[0][2],
    r * matrix[1][0] + g * matrix[1][1] + b * matrix[1][2],
    r * matrix[2][0] + g * matrix[2][1] + b * matrix[2][2]
  ];
}
