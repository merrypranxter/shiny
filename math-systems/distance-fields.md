# Distance Fields for Shine

## What
Scalar field where each point stores distance to nearest feature.

## Use For
- Edge shine (distance to border)
- Contour bands
- Hyperactive rim light
- SDF-based shapes
- Voronoi edge detection

## Variants
- **SDF**: signed (inside/outside)
- **Unsigned**: pure distance
- **Analytic**: exact math shapes
- **Approximate**: grid-based

## Code Hook
```javascript
function edgeShine(x, y, shapeSDF) {
  const d = Math.abs(shapeSDF(x, y));
  const edge = Math.exp(-d * 3); // glow falloff
  return edge * chromeColor;
}
```
