// ✦ System 15: Shine as Language/Symbol
// SDF glyphs + sigil generation

function sigilSDF(x, y, symbolType, time) {
  let d = Infinity;

  switch(symbolType) {
    case 'circle':
      d = Math.abs(Math.hypot(x, y) - 0.5);
      break;
    case 'triangle':
      d = sdTriangle(x, y, 0, -0.4, -0.4, 0.3, 0.4, 0.3);
      break;
    case 'star':
      d = sdStar(x, y, 0.5, 5, 0.2);
      break;
    case 'rune':
      d = sdRune(x, y, time);
      break;
  }

  return d;
}

function sdTriangle(px, py, x1, y1, x2, y2, x3, y3) {
  // SDF for triangle
  const p = { x: px, y: py };
  const a = { x: x1, y: y1 };
  const b = { x: x2, y: y2 };
  const c = { x: x3, y: y3 };

  const ab = { x: b.x - a.x, y: b.y - a.y };
  const bc = { x: c.x - b.x, y: c.y - b.y };
  const ca = { x: a.x - c.x, y: a.y - c.y };

  const ap = { x: p.x - a.x, y: p.y - a.y };
  const bp = { x: p.x - b.x, y: p.y - b.y };
  const cp = { x: p.x - c.x, y: p.y - c.y };

  // Simplified: return distance to closest edge
  return Math.min(
    Math.abs(ap.x * ab.y - ap.y * ab.x) / Math.hypot(ab.x, ab.y),
    Math.abs(bp.x * bc.y - bp.y * bc.x) / Math.hypot(bc.x, bc.y),
    Math.abs(cp.x * ca.y - cp.y * ca.x) / Math.hypot(ca.x, ca.y)
  );
}

function sdStar(x, y, r, n, m) {
  const angle = Math.atan2(y, x);
  const sector = Math.PI / n;
  const a = ((angle + sector) % (2 * sector)) - sector;
  const d = Math.hypot(x, y);
  return Math.abs(d - r * (Math.cos(a) + m * Math.cos(3 * a)));
}

function sdRune(x, y, time) {
  // Animated rune: lines that pulse
  const line1 = Math.abs(x);
  const line2 = Math.abs(x - 0.2 * Math.sin(time));
  const line3 = Math.abs(y);
  return Math.min(line1, line2, line3);
}

function drawSigil(ctx, x, y, size, type, time) {
  const imageData = ctx.createImageData(size, size);
  const data = imageData.data;

  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      const u = (px / size) * 2 - 1;
      const v = (py / size) * 2 - 1;

      const d = sigilSDF(u, v, type, time);
      const edge = Math.exp(-Math.abs(d) * 10);

      const idx = (py * size + px) * 4;
      const hue = (time * 20 + edge * 60) % 360;
      const rgb = hslToRgb(hue / 360, 0.8, 0.5 + edge * 0.3);

      data[idx] = rgb[0];
      data[idx+1] = rgb[1];
      data[idx+2] = rgb[2];
      data[idx+3] = edge * 255;
    }
  }

  ctx.putImageData(imageData, x, y);
}
