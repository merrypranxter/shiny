# Blue Noise for Shine

## What
Even-but-random point distribution — no clustering, no regularity.

## Use For
- Glitter placement
- Sequin scatter
- Mirror dust distribution
- Rhinestone spacing
- Pointillist shine

## vs White Noise
- White noise = clumpy, uneven
- Blue noise = evenly spaced, organic
- Poisson disk = minimum distance guarantee

## Generation
- Dart throwing
- Relaxation (Lloyd's algorithm)
- Tile-based blue noise textures

## Code Hook
```javascript
function blueNoisePoints(count, w, h) {
  const pts = [];
  for (let i = 0; i < count; i++) {
    let best = null, bestDist = 0;
    for (let tries = 0; tries < 30; tries++) {
      const x = Math.random() * w, y = Math.random() * h;
      let minDist = Infinity;
      for (const p of pts) {
        const d = Math.hypot(x - p.x, y - p.y);
        if (d < minDist) minDist = d;
      }
      if (minDist > bestDist) { best = {x, y}; bestDist = minDist; }
    }
    if (best) pts.push(best);
  }
  return pts;
}
```
