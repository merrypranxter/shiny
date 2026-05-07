# Penrose Tiling for Shine

## What
Non-repeating quasicrystal tiling — order without periodicity.

## Use For
- Fiber-optic loom patterns
- Sacred geometry shine
- Non-repeating light networks
- Mall-hologram alien math

## Construction
- **Rhombus method**: fat/thin rhombuses, matching rules
- **Kite/dart**: classic Penrose pieces
- **Deflation**: recursive subdivision
- **Grid (approximation)**: multiple rotated grids

## Shine Adaptation
- Edges = fiber-optic threads
- Vertices = jewel nodes
- Rhombus interiors = matte host
- Deflation levels = thickness hierarchy

## Code Hook (Approximation)
```javascript
function quasiLoomPoints(count, w, h) {
  const pts = [], cx = w/2, cy = h/2;
  const maxR = Math.min(w, h) * 0.48;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const t = i / Math.max(1, count - 1);
    const r = maxR * Math.sqrt(t);
    const a = i * goldenAngle;
    const wobble = 1 + 0.08 * Math.sin(i * 0.618) + 0.04 * Math.sin(i * 1.618);
    pts.push({ x: cx + Math.cos(a) * r * wobble, y: cy + Math.sin(a) * r * wobble });
  }
  return pts;
}
```
