/**
 * shared/utils.js
 * Core math and field utilities for shiny generative art systems.
 * All functions are pure / side-effect free unless noted.
 */

// ---------------------------------------------------------------------------
// MATH PRIMITIVES
// ---------------------------------------------------------------------------

/** Fractional part of n */
function fract(n) {
  return n - Math.floor(n);
}

/** Deterministic 2D hash → [0, 1) */
function hash2(x, y) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return n - Math.floor(n);
}

/** Simple cheap 2D hash for residue / field work */
function cheapHash(x, y) {
  return fract(Math.sin(x * 41.17 + y * 289.31) * 43758.5453);
}

/** 4-octave fBm (fractional Brownian motion) noise from hash2 */
function pseudoFbm(x, y) {
  let v = 0;
  let a = 0.5;
  let f = 1;
  for (let i = 0; i < 4; i++) {
    v += a * hash2(Math.floor(x * f), Math.floor(y * f));
    f *= 2;
    a *= 0.5;
  }
  return v;
}

/** 5-octave fBm using cheapHash, optionally animated */
function cheapField(x, y, time = 0) {
  let v = 0;
  let a = 0.5;
  let f = 1.0;
  for (let i = 0; i < 5; i++) {
    v += a * cheapHash(Math.floor(x * f + time * 0.2), Math.floor(y * f));
    a *= 0.5;
    f *= 2.0;
  }
  return v;
}

/** Animated height field using 5-octave fBm */
function heightAt(x, y, time = 0) {
  return pseudoFbm(x * 0.018 + time * 0.04, y * 0.018);
}

/** Smoothstep */
function smoothstep(edge0, edge1, x) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/** Linear interpolation */
function lerp(a, b, t) {
  return a + (b - a) * t;
}

/** Clamp */
function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

// ---------------------------------------------------------------------------
// COLOR / PALETTE
// ---------------------------------------------------------------------------

/**
 * metallicPalette(t, hueShift)
 * Maps a 0–1 value to an anodized metallic color string.
 * Uses dramatic band logic (not smooth rainbow soup).
 * @param {number} t        value 0..1
 * @param {number} hueShift additional hue offset in degrees
 * @returns {string} CSS hsl() color
 */
function metallicPalette(t, hueShift = 0) {
  t = clamp(t, 0, 1);
  const shine    = Math.pow(Math.max(0, Math.sin(t * Math.PI)), 0.35);
  const darkBand = Math.pow(Math.max(0, Math.sin((t + 0.42) * Math.PI * 2)), 6);
  const hotLine  = Math.pow(Math.max(0, Math.sin((t - 0.15) * Math.PI * 8)), 18);
  const hue  = (220 + hueShift + 130 * Math.sin(t * Math.PI * 2)) % 360;
  const sat  = 85 + 15 * shine;
  const light = 18 + 42 * shine + 35 * hotLine - 18 * darkBand;
  return `hsl(${hue}, ${sat}%, ${clamp(light, 4, 92)}%)`;
}

/**
 * contourAmount(v, bands)
 * Returns how close value v is to a contour band (0=none, 1=on-band).
 * Useful for topographic / weather shine lines.
 */
function contourAmount(v, bands) {
  const f = v * bands;
  const d = Math.abs(f - Math.round(f));
  return Math.max(0, 1 - d * 14);
}

// ---------------------------------------------------------------------------
// GEOMETRY
// ---------------------------------------------------------------------------

/**
 * nearestNeighbors(points, k)
 * Returns k nearest-neighbor edges for a point array.
 * Each edge is [pointA, pointB].
 */
function nearestNeighbors(points, k = 3) {
  const edges = [];
  for (let i = 0; i < points.length; i++) {
    const d = [];
    for (let j = 0; j < points.length; j++) {
      if (i === j) continue;
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      d.push({ j, dist: dx * dx + dy * dy });
    }
    d.sort((a, b) => a.dist - b.dist);
    for (let n = 0; n < Math.min(k, d.length); n++) {
      if (i < d[n].j) edges.push([points[i], points[d[n].j]]);
    }
  }
  return edges;
}

/**
 * makeRandomPoints(count, width, height)
 * Returns an array of {x, y} random points.
 */
function makeRandomPoints(count, width, height) {
  const pts = [];
  for (let i = 0; i < count; i++) {
    pts.push({ x: Math.random() * width, y: Math.random() * height });
  }
  return pts;
}

// ---------------------------------------------------------------------------
// VEIN / CRACK WALKERS
// ---------------------------------------------------------------------------

/**
 * seedVeins(count, w, h)
 * Returns initial vein walker array seeded from center region.
 */
function seedVeins(count, w, h) {
  const veins = [];
  for (let i = 0; i < count; i++) {
    veins.push({
      x: w * (0.3 + 0.4 * Math.random()),
      y: h * (0.3 + 0.4 * Math.random()),
      angle: Math.random() * Math.PI * 2,
      life: 120 + Math.random() * 180,
      thickness: 2 + Math.random() * 5,
      depth: 0
    });
  }
  return veins;
}

/**
 * stepVeins(veins, ctx)
 * Advances vein walkers one step. Draws pale base strokes.
 * Returns updated vein array.
 */
function stepVeins(veins, ctx) {
  const next = [];
  for (const v of veins) {
    if (v.life <= 0 || v.thickness < 0.5) continue;
    const nx = v.x + Math.cos(v.angle) * 2.0;
    const ny = v.y + Math.sin(v.angle) * 2.0;
    ctx.lineWidth = v.thickness;
    ctx.strokeStyle = `rgba(255,255,255,0.06)`;
    ctx.beginPath();
    ctx.moveTo(v.x, v.y);
    ctx.lineTo(nx, ny);
    ctx.stroke();
    next.push({
      ...v,
      x: nx,
      y: ny,
      angle: v.angle + (Math.random() - 0.5) * 0.28,
      life: v.life - 1,
      thickness: v.thickness * 0.995
    });
    if (Math.random() < 0.025 && v.depth < 5) {
      next.push({
        x: nx, y: ny,
        angle: v.angle + 0.6 + Math.random() * 0.5,
        life: v.life * 0.7,
        thickness: v.thickness * 0.72,
        depth: v.depth + 1
      });
    }
    if (Math.random() < 0.025 && v.depth < 5) {
      next.push({
        x: nx, y: ny,
        angle: v.angle - 0.6 - Math.random() * 0.5,
        life: v.life * 0.7,
        thickness: v.thickness * 0.72,
        depth: v.depth + 1
      });
    }
  }
  return next;
}

/**
 * seedCracks(cx, cy, branches)
 * Returns initial crack walker array for kintsugi / repair systems.
 */
function seedCracks(cx, cy, branches = 8) {
  const cracks = [];
  for (let i = 0; i < branches; i++) {
    cracks.push({
      x: cx, y: cy,
      angle: (Math.PI * 2 * i) / branches + (Math.random() - 0.5) * 0.3,
      life: 80 + Math.random() * 120,
      width: 2 + Math.random() * 2
    });
  }
  return cracks;
}

/**
 * stepCracks(cracks, ctx, drawFn)
 * Advances crack walkers. drawFn(ctx, x1, y1, x2, y2, w) handles rendering.
 * Returns updated crack array.
 */
function stepCracks(cracks, ctx, drawFn) {
  const next = [];
  for (const c of cracks) {
    if (c.life <= 0) continue;
    const nx = c.x + Math.cos(c.angle) * (1.5 + Math.random() * 1.5);
    const ny = c.y + Math.sin(c.angle) * (1.5 + Math.random() * 1.5);
    if (drawFn) drawFn(ctx, c.x, c.y, nx, ny, c.width);
    next.push({
      ...c, x: nx, y: ny,
      angle: c.angle + (Math.random() - 0.5) * 0.35,
      life: c.life - 1,
      width: c.width * 0.995
    });
    if (Math.random() < 0.04 && c.width > 0.7) {
      next.push({
        x: nx, y: ny,
        angle: c.angle + 0.8 * (Math.random() < 0.5 ? -1 : 1),
        life: c.life * 0.6,
        width: c.width * 0.7
      });
    }
  }
  return next;
}

// ---------------------------------------------------------------------------
// NETWORK / GRAPH
// ---------------------------------------------------------------------------

/**
 * makeNetwork(w, h, count)
 * Returns a graph {nodes, edges} with k=2 nearest-neighbor connections.
 */
function makeNetwork(w, h, count) {
  const nodes = [];
  for (let i = 0; i < count; i++) {
    nodes.push({ x: Math.random() * w, y: Math.random() * h, id: i });
  }
  const edges = [];
  for (let i = 0; i < nodes.length; i++) {
    const dists = nodes
      .filter((_, j) => j !== i)
      .map(n => ({ node: n, d: (n.x - nodes[i].x) ** 2 + (n.y - nodes[i].y) ** 2 }))
      .sort((a, b) => a.d - b.d);
    for (let k = 0; k < 2; k++) {
      const j = dists[k].node.id;
      if (i < j) edges.push([i, j]);
    }
  }
  return { nodes, edges };
}

/**
 * makeLightCityGrid(w, h, cols, rows)
 * Returns a jittered grid {nodes, edges} for city-light-seam systems.
 */
function makeLightCityGrid(w, h, cols, rows) {
  const nodes = [];
  const edges = [];
  const margin = 40;
  const cellW  = (w - margin * 2) / (cols - 1);
  const cellH  = (h - margin * 2) / (rows - 1);
  const jitter = 10;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      nodes.push({
        x: margin + i * cellW + (Math.random() - 0.5) * jitter,
        y: margin + j * cellH + (Math.random() - 0.5) * jitter,
        id: j * cols + i,
        hub: Math.random() < 0.08
      });
    }
  }
  function nodeId(i, j) { return j * cols + i; }
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      if (i < cols - 1 && Math.random() < 0.92)
        edges.push([nodeId(i, j), nodeId(i + 1, j), 'street']);
      if (j < rows - 1 && Math.random() < 0.88)
        edges.push([nodeId(i, j), nodeId(i, j + 1), 'street']);
      if (i < cols - 1 && j < rows - 1 && Math.random() < 0.13)
        edges.push([nodeId(i, j), nodeId(i + 1, j + 1), 'diagonal']);
    }
  }
  return { nodes, edges };
}

// ---------------------------------------------------------------------------
// SPARKLE / GLITTER
// ---------------------------------------------------------------------------

/**
 * drawSparkleField(ctx, width, height, time)
 * Draws a clustered glitter ecology using hierarchical density.
 */
function drawSparkleField(ctx, width, height, time) {
  for (let y = 0; y < height; y += 3) {
    for (let x = 0; x < width; x += 3) {
      const cluster = pseudoFbm(x * 0.01, y * 0.01);
      const local   = hash2(x, y);
      if (cluster > 0.58 && local > 0.985) {
        const shimmer = 0.5 + 0.5 * Math.sin(time * 3 + x * 0.02 + y * 0.01);
        const size    = local > 0.997 ? 3 : 1;
        ctx.fillStyle = `rgba(255,255,255,${0.2 + shimmer * 0.8})`;
        ctx.fillRect(x, y, size, size);
        if (local > 0.9985) {
          ctx.strokeStyle = `rgba(255,255,255,${0.4 + shimmer * 0.4})`;
          ctx.lineWidth   = 1;
          ctx.beginPath();
          ctx.moveTo(x - 4, y); ctx.lineTo(x + 4, y);
          ctx.moveTo(x, y - 4); ctx.lineTo(x, y + 4);
          ctx.stroke();
        }
      }
    }
  }
}

/**
 * drawMiniGlint(ctx, x, y, r)
 * Tiny white crosshair sparkle.
 */
function drawMiniGlint(ctx, x, y, r) {
  ctx.strokeStyle = 'rgba(255,255,255,0.75)';
  ctx.lineWidth   = 1;
  ctx.beginPath();
  ctx.moveTo(x - r, y); ctx.lineTo(x + r, y);
  ctx.moveTo(x, y - r); ctx.lineTo(x, y + r);
  ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.fillRect(x - 1, y - 1, 2, 2);
}
