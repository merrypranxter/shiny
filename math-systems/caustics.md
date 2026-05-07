# Caustics for Shine

## What
Light concentration patterns from refraction — water ripples, glass curves.

## Use For
- Projected light patterns
- Caustic quilt
- Aquarium light lace
- Jewel shadow projections
- Water surface effects

## Generation
- **Photon mapping**: accurate but expensive
- **Warped sine**: cheap approximation
- **Recursive warp**: fractal-ish caustic lace
- **Texture-based**: precomputed caustic maps

## Code Hook (Fake Caustic)
```javascript
function causticValue(x, y, time) {
  let u = x * 0.013, v = y * 0.013;
  for (let i = 0; i < 4; i++) {
    const a = Math.sin(v * 2.8 + time * 0.75 + i * 1.9);
    const b = Math.cos(u * 2.5 - time * 0.55 + i * 2.4);
    u += a * 0.13; v += b * 0.13;
  }
  const r1 = Math.abs(Math.sin(u * 7.2 + Math.sin(v)));
  const r2 = Math.abs(Math.sin(v * 8.3 + Math.cos(u * 1.3)));
  return Math.pow(Math.max(0, 1 - Math.min(r1, r2)), 8);
}
```

## Rendering
- Use `lighter` or `screen` blend mode
- Low opacity (0.1-0.3) for subtlety
- Spectral color for magic
- Mask to organic surfaces for realism
