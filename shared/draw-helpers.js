/**
 * shared/draw-helpers.js
 * Reusable Canvas 2D drawing primitives for shiny generative art.
 * Requires utils.js to be loaded first.
 */

// ---------------------------------------------------------------------------
// VEIN / LINE SHINE
// ---------------------------------------------------------------------------

/**
 * drawShinyVeinStroke(ctx, x1, y1, x2, y2, t, hueBase)
 * Draws a single chromatic vein segment with glow and glitter hits.
 */
function drawShinyVeinStroke(ctx, x1, y1, x2, y2, t, hueBase) {
  ctx.strokeStyle = `hsla(${hueBase}, 100%, 70%, 0.08)`;
  ctx.lineWidth   = t * 3.0;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();

  ctx.strokeStyle = `hsla(${hueBase + 40 * Math.sin(x1 * 0.01 + y1 * 0.01)}, 100%, 75%, 0.85)`;
  ctx.lineWidth   = t;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();

  if (Math.random() < 0.08) {
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.fillRect(x2 - 1, y2 - 1, 2, 2);
  }
}

/**
 * drawSeamGlow(ctx, x1, y1, x2, y2, w)
 * Chromatic kintsugi seam: dark trench + metallic core + hot specular strip.
 */
function drawSeamGlow(ctx, x1, y1, x2, y2, w) {
  const hue = 180 + 120 * Math.sin((x1 + y1) * 0.01);
  ctx.strokeStyle = `hsla(${hue},100%,65%,0.08)`;
  ctx.lineWidth   = w * 5;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();

  ctx.strokeStyle = `hsla(${hue},100%,70%,0.85)`;
  ctx.lineWidth   = Math.max(1, w);
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();

  ctx.strokeStyle = 'rgba(255,255,255,0.35)';
  ctx.lineWidth   = 1;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
}

/**
 * drawHoloRepairSeam(ctx, x1, y1, x2, y2, w, hue, time)
 * Full holographic kintsugi seam: dark trench + rainbow gradient + raised lip highlights.
 */
function drawHoloRepairSeam(ctx, x1, y1, x2, y2, w, hue, time) {
  const dx  = x2 - x1, dy  = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx  = -dy / len, ny = dx / len;

  ctx.strokeStyle = 'rgba(0,0,0,0.22)';
  ctx.lineWidth   = w * 4.5;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();

  const h1   = (hue + time * 40 + x1 * 0.05) % 360;
  const h2   = (hue + 130 + y1 * 0.04) % 360;
  const grad = ctx.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0.0,  `hsla(${h1},100%,35%,0.95)`);
  grad.addColorStop(0.35, `hsla(${h2},100%,70%,0.95)`);
  grad.addColorStop(0.5,  'rgba(255,255,255,0.95)');
  grad.addColorStop(1.0,  `hsla(${h1 + 70},100%,45%,0.95)`);
  ctx.strokeStyle = grad;
  ctx.lineWidth   = w;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();

  ctx.strokeStyle = 'rgba(255,255,255,0.18)';
  ctx.lineWidth   = 1;
  ctx.beginPath();
  ctx.moveTo(x1 + nx * w, y1 + ny * w); ctx.lineTo(x2 + nx * w, y2 + ny * w);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x1 - nx * w, y1 - ny * w); ctx.lineTo(x2 - nx * w, y2 - ny * w);
  ctx.stroke();
}

// ---------------------------------------------------------------------------
// NODES / JEWELS
// ---------------------------------------------------------------------------

/**
 * drawRhinestoneNode(ctx, x, y, r, hue, time)
 * Faceted jewel node with radial gradient and optional starburst flash.
 */
function drawRhinestoneNode(ctx, x, y, r, hue, time) {
  const flash = 0.5 + 0.5 * Math.sin(time * 7 + x * 0.02 + y * 0.01);
  const g     = ctx.createRadialGradient(x - r * 0.25, y - r * 0.35, 0, x, y, r);
  g.addColorStop(0,    'rgba(255,255,255,0.95)');
  g.addColorStop(0.18, `hsla(${hue + 40},100%,78%,0.9)`);
  g.addColorStop(0.55, `hsla(${hue},100%,38%,0.85)`);
  g.addColorStop(1,    'rgba(20,0,30,0)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  if (flash > 0.86) {
    ctx.strokeStyle = `rgba(255,255,255,${flash})`;
    ctx.lineWidth   = 1;
    ctx.beginPath();
    ctx.moveTo(x - r * 1.3, y); ctx.lineTo(x + r * 1.3, y);
    ctx.moveTo(x, y - r * 1.3); ctx.lineTo(x, y + r * 1.3);
    ctx.stroke();
  }
}

// ---------------------------------------------------------------------------
// NETWORK / CONDUIT RENDERING
// ---------------------------------------------------------------------------

/**
 * drawLightRibbon(ctx, a, b, hueA, hueB)
 * Woven-light edge: soft underglow + color gradient core + edge shine rails.
 */
function drawLightRibbon(ctx, a, b, hueA, hueB) {
  const dx  = b.x - a.x, dy  = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx  = -dy / len, ny = dx / len;

  ctx.strokeStyle = `hsla(${hueA},100%,70%,0.10)`;
  ctx.lineWidth   = 10;
  ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();

  const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
  grad.addColorStop(0, `hsla(${hueA},100%,65%,0.95)`);
  grad.addColorStop(1, `hsla(${hueB},100%,70%,0.95)`);
  ctx.strokeStyle = grad;
  ctx.lineWidth   = 4;
  ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();

  ctx.strokeStyle = 'rgba(255,255,255,0.25)';
  ctx.lineWidth   = 1;
  ctx.beginPath();
  ctx.moveTo(a.x + nx*2, a.y + ny*2); ctx.lineTo(b.x + nx*2, b.y + ny*2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(a.x - nx*2, a.y - ny*2); ctx.lineTo(b.x - nx*2, b.y - ny*2);
  ctx.stroke();
}

/**
 * drawChromeConduit(ctx, a, b, time, id)
 * Chrome tube conduit: dark body + metallic gradient + offset highlight rail.
 */
function drawChromeConduit(ctx, a, b, time, id) {
  const dx  = b.x - a.x, dy  = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx  = -dy / len, ny = dx / len;

  ctx.strokeStyle = 'rgba(5,8,18,0.85)';
  ctx.lineWidth   = 9;
  ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();

  const hue1 = (190 + id * 37 + time * 20) % 360;
  const hue2 = (310 + id * 19 - time * 30) % 360;
  const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
  grad.addColorStop(0.00, `hsl(${hue1},100%,35%)`);
  grad.addColorStop(0.35, `hsl(${hue2},100%,68%)`);
  grad.addColorStop(0.50, 'rgba(255,255,255,0.92)');
  grad.addColorStop(0.70, `hsl(${hue1 + 80},100%,42%)`);
  grad.addColorStop(1.00, `hsl(${hue2},100%,20%)`);
  ctx.strokeStyle = grad;
  ctx.lineWidth   = 5;
  ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();

  ctx.strokeStyle = 'rgba(255,255,255,0.35)';
  ctx.lineWidth   = 1;
  ctx.beginPath();
  ctx.moveTo(a.x + nx * 2, a.y + ny * 2); ctx.lineTo(b.x + nx * 2, b.y + ny * 2);
  ctx.stroke();
}

/**
 * drawPulseOnEdge(ctx, a, b, time, id)
 * Animated glowing pulse traveling along an edge.
 */
function drawPulseOnEdge(ctx, a, b, time, id) {
  const phase = (time * 0.35 + id * 0.17) % 1;
  const x     = a.x + (b.x - a.x) * phase;
  const y     = a.y + (b.y - a.y) * phase;
  const hue   = (id * 53 + time * 80) % 360;
  const g     = ctx.createRadialGradient(x, y, 0, x, y, 18);
  g.addColorStop(0,    `hsla(${hue},100%,80%,0.75)`);
  g.addColorStop(0.25, `hsla(${hue + 40},100%,60%,0.25)`);
  g.addColorStop(1,    'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(x, y, 18, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.fillRect(x - 1, y - 1, 2, 2);
}

// ---------------------------------------------------------------------------
// EMBROIDERY / STITCHING
// ---------------------------------------------------------------------------

/**
 * drawStitchedLine(ctx, x1, y1, x2, y2, time, hue)
 * Metallic embroidery stitches along a line segment.
 */
function drawStitchedLine(ctx, x1, y1, x2, y2, time, hue) {
  const dx  = x2 - x1, dy  = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const ux  = dx / len, uy = dy / len;
  const nx  = -uy,      ny = ux;
  const spacing   = 9;
  const stitchLen = 5;
  for (let d = 0; d < len; d += spacing) {
    const t    = d / len;
    const cx   = x1 + dx * t;
    const cy   = y1 + dy * t;
    const side = Math.floor(d / spacing) % 2 === 0 ? 1 : -1;
    const ax   = cx - ux * stitchLen + nx * side * 2;
    const ay   = cy - uy * stitchLen + ny * side * 2;
    const bx   = cx + ux * stitchLen - nx * side * 2;
    const by_  = cy + uy * stitchLen - ny * side * 2;
    const flash = 0.5 + 0.5 * Math.sin(time * 4 + d * 0.2);
    ctx.strokeStyle = `hsla(${hue + t * 80},100%,${55 + flash * 30}%,0.9)`;
    ctx.lineWidth   = 2;
    ctx.lineCap     = 'round';
    ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by_); ctx.stroke();
    if (flash > 0.92) {
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.fillRect(cx - 1, cy - 1, 2, 2);
    }
  }
}

/**
 * drawPuncture(ctx, x, y)
 * Dark oval shadow simulating a stitch hole in matte material.
 */
function drawPuncture(ctx, x, y) {
  ctx.fillStyle = 'rgba(0,0,0,0.22)';
  ctx.beginPath();
  ctx.ellipse(x, y, 3, 1.5, 0, 0, Math.PI * 2);
  ctx.fill();
}

// ---------------------------------------------------------------------------
// WET / DRY SHINE
// ---------------------------------------------------------------------------

/**
 * drawWetBlob(ctx, x, y, r, time, hue)
 * Glossy wet blob with radial gradient and hard specular slash.
 */
function drawWetBlob(ctx, x, y, r, time, hue) {
  const g = ctx.createRadialGradient(
    x - r * 0.35, y - r * 0.45, 0,
    x, y, r
  );
  g.addColorStop(0.00, 'rgba(255,255,255,0.85)');
  g.addColorStop(0.08, `hsla(${hue},100%,80%,0.75)`);
  g.addColorStop(0.42, `hsla(${hue + 45},100%,45%,0.45)`);
  g.addColorStop(0.78, `hsla(${hue - 30},100%,18%,0.72)`);
  g.addColorStop(1.00, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();

  ctx.strokeStyle = 'rgba(255,255,255,0.65)';
  ctx.lineWidth   = Math.max(1, r * 0.04);
  ctx.beginPath();
  ctx.arc(x - r * 0.2, y - r * 0.25, r * 0.32, -2.6, -1.3);
  ctx.stroke();
}

/**
 * drawDryGlitterDust(ctx, x, y, r, count, time, hue)
 * Dry particulate sparkle cloud scattered within radius r.
 */
function drawDryGlitterDust(ctx, x, y, r, count, time, hue) {
  for (let i = 0; i < count; i++) {
    const a   = Math.random() * Math.PI * 2;
    const rr  = r * Math.sqrt(Math.random());
    const px  = x + Math.cos(a) * rr;
    const py  = y + Math.sin(a) * rr;
    const flash = Math.random() < 0.12 ? 0.9 : 0.15 + 0.35 * Math.random();
    const size  = Math.random() < 0.08 ? 2 : 1;
    ctx.fillStyle = `hsla(${hue + Math.random() * 80},100%,${60 + flash * 35}%,${flash})`;
    ctx.fillRect(px, py, size, size);
    if (flash > 0.85) {
      ctx.strokeStyle = 'rgba(255,255,255,0.55)';
      ctx.lineWidth   = 1;
      ctx.beginPath();
      ctx.moveTo(px - 3, py); ctx.lineTo(px + 3, py);
      ctx.moveTo(px, py - 3); ctx.lineTo(px, py + 3);
      ctx.stroke();
    }
  }
}

// ---------------------------------------------------------------------------
// ANATOMY / BIOLOGY
// ---------------------------------------------------------------------------

/**
 * drawLivingShineTube(ctx, x1, y1, x2, y2, thick, hue, time, depth)
 * Biological vessel: buried glow + translucent tissue + pulsing highlight.
 */
function drawLivingShineTube(ctx, x1, y1, x2, y2, thick, hue, time, depth) {
  const pulse = 0.5 + 0.5 * Math.sin(time * 4 - depth * 0.8 + x1 * 0.03);
  ctx.strokeStyle = `hsla(${hue}, 100%, 65%, 0.09)`;
  ctx.lineWidth   = thick * 4.5;
  ctx.lineCap     = 'round';
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();

  ctx.strokeStyle = `hsla(${hue + pulse * 35}, 100%, ${45 + pulse * 20}%, 0.55)`;
  ctx.lineWidth   = thick * 1.5;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();

  ctx.strokeStyle = `rgba(255,255,255,${0.12 + pulse * 0.28})`;
  ctx.lineWidth   = Math.max(1, thick * 0.22);
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
}

// ---------------------------------------------------------------------------
// SURFACE / HOST
// ---------------------------------------------------------------------------

/**
 * drawCloudyVeil(ctx, w, h)
 * Frosted translucent overlay — use after drawing buried structures.
 */
function drawCloudyVeil(ctx, w, h) {
  for (let i = 0; i < 25; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const r = 40 + Math.random() * 140;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(255,255,255,0.05)');
    g.addColorStop(1, 'rgba(240,245,255,0.0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
  ctx.fillStyle = 'rgba(235,240,245,0.08)';
  ctx.fillRect(0, 0, w, h);
}

/**
 * drawBuriedLightLine(ctx, x1, y1, x2, y2, hue)
 * Dim embedded line — appears as buried luminous filament under cloudy surface.
 */
function drawBuriedLightLine(ctx, x1, y1, x2, y2, hue) {
  ctx.strokeStyle = `hsla(${hue},100%,60%,0.22)`;
  ctx.lineWidth   = 6;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();

  ctx.strokeStyle = `hsla(${hue + 30},100%,75%,0.35)`;
  ctx.lineWidth   = 2;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
}

// ---------------------------------------------------------------------------
// SIGILS / LANGUAGE
// ---------------------------------------------------------------------------

/**
 * drawGlitterGlyphStroke(ctx, x1, y1, x2, y2, time, hue)
 * Prismatic inscription stroke with scattered glitter along its length.
 */
function drawGlitterGlyphStroke(ctx, x1, y1, x2, y2, time, hue) {
  const dx   = x2 - x1, dy   = y2 - y1;
  const len  = Math.hypot(dx, dy) || 1;
  const grad = ctx.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0,    `hsla(${hue},100%,28%,0.85)`);
  grad.addColorStop(0.4,  `hsla(${hue + 80},100%,70%,0.95)`);
  grad.addColorStop(0.52, 'rgba(255,255,255,0.95)');
  grad.addColorStop(1,    `hsla(${hue + 170},100%,35%,0.9)`);
  ctx.strokeStyle = grad;
  ctx.lineWidth   = 3;
  ctx.lineCap     = 'round';
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();

  const steps = Math.floor(len / 8);
  for (let k = 0; k <= steps; k++) {
    if (Math.random() > 0.28) continue;
    const t     = k / Math.max(1, steps);
    const x     = x1 + dx * t + (Math.random() - 0.5) * 3;
    const y     = y1 + dy * t + (Math.random() - 0.5) * 3;
    const flash = 0.4 + 0.6 * Math.sin(time * 5 + k);
    ctx.fillStyle = `rgba(255,255,255,${0.2 + flash * 0.6})`;
    ctx.fillRect(x, y, 1.5, 1.5);
  }
}

/**
 * drawSigil(ctx, cx, cy, r, time, seed)
 * Procedural sigil: star-connected points rendered as glitter glyph strokes
 * with a rhinestone center jewel.
 */
function drawSigil(ctx, cx, cy, r, time, seed = 0) {
  const pts  = [];
  const arms = 7 + Math.floor(seed % 5);
  for (let i = 0; i < arms; i++) {
    const a  = (Math.PI * 2 * i) / arms + seed * 0.37;
    const rr = r * (0.35 + 0.65 * Math.abs(Math.sin(i * 2.17 + seed)));
    pts.push({ x: cx + Math.cos(a) * rr, y: cy + Math.sin(a) * rr });
  }
  for (let i = 0; i < pts.length; i++) {
    const j = (i * 3 + 2) % pts.length;
    drawGlitterGlyphStroke(ctx, pts[i].x, pts[i].y, pts[j].x, pts[j].y, time, 260 + i * 31);
  }
  drawRhinestoneNode(ctx, cx, cy, r * 0.13, 290 + seed * 20, time);
}

// ---------------------------------------------------------------------------
// RIBBON / WEAVE
// ---------------------------------------------------------------------------

/**
 * drawRibbonSegment(ctx, x1, y1, x2, y2, width, hue, time, over)
 * Holographic woven ribbon segment. over=true renders on top with full gradient.
 */
function drawRibbonSegment(ctx, x1, y1, x2, y2, width, hue, time, over) {
  const dx  = x2 - x1, dy  = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx  = -dy / len, ny = dx / len;

  if (!over) {
    ctx.strokeStyle = 'rgba(0,0,0,0.42)';
    ctx.lineWidth   = width + 5;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  }

  const phase = time * 50 + x1 * 0.2 + y1 * 0.1;
  const grad  = ctx.createLinearGradient(
    x1 + nx * width, y1 + ny * width,
    x1 - nx * width, y1 - ny * width
  );
  grad.addColorStop(0.00, `hsl(${(hue + phase) % 360},100%,22%)`);
  grad.addColorStop(0.30, `hsl(${(hue + 70 + phase) % 360},100%,62%)`);
  grad.addColorStop(0.48, 'rgba(255,255,255,0.96)');
  grad.addColorStop(0.62, `hsl(${(hue + 180 + phase) % 360},100%,45%)`);
  grad.addColorStop(1.00, `hsl(${(hue + 260 + phase) % 360},100%,15%)`);
  ctx.strokeStyle = grad;
  ctx.lineWidth   = width;
  ctx.lineCap     = 'round';
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();

  ctx.strokeStyle = 'rgba(255,255,255,0.18)';
  ctx.lineWidth   = 1;
  ctx.beginPath();
  ctx.moveTo(x1 + nx * width * 0.38, y1 + ny * width * 0.38);
  ctx.lineTo(x2 + nx * width * 0.38, y2 + ny * width * 0.38);
  ctx.stroke();
}
