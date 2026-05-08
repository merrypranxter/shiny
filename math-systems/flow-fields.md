# Flow Fields for Shine

## What
Vector fields that guide movement and tracing.

## Use For
- Vein path generation
- Glitter drift / weather
- Embroidery stitch direction
- Caustic warping
- Pollen / dust advection

## Types
- **Perlin-based**: organic, smooth
- **Curl noise**: divergence-free, swirly
- **Radial**: explosion / implosion
- **Attractor-based**: clustering, gathering

## Code Hook
```javascript
function flowField(x, y, time) {
  const angle = noise(x * 0.01, y * 0.01, time * 0.1) * Math.PI * 4;
  return { x: Math.cos(angle), y: Math.sin(angle) };
}
```
