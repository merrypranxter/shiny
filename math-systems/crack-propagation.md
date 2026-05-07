# Crack Propagation for Shine

## What
Simulated fracture mechanics — stress-driven breaking patterns.

## Use For
- Kintsugi seams
- Damage networks
- Stress fracture visualization
- Geological fault maps
- Ceramic crackle glaze

## Models
- **Random walk**: simple branching cracks
- **Stress field**: physics-informed propagation
- **Voronoi fracture**: cell-based breaking
- **Recursive subdivision**: hierarchical cracks

## Shine Adaptation
- Crack path = shiny fill
- Branch tips = sparkle events
- Intersections = jewel nodes
- Width taper = depth/age

## Code Hook
```javascript
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
```
