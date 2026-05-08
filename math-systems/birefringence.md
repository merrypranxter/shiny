# Birefringence for Shine

## What
Double refraction in anisotropic materials — stress-induced rainbow colors.

## Use For
- Polarized stress fractures
- Pressure shine
- Clear plastic tension zones
- Acrylic keychain effects
- Material suffering made beautiful

## Physics
Different refractive indices for different polarizations → phase delay → color.

## Approximation
```javascript
function birefringenceColor(stress, phase) {
  const r = 120 + 120 * Math.sin(stress * 8.0 + 0.0);
  const g = 120 + 120 * Math.sin(stress * 8.0 + 2.1);
  const b = 120 + 120 * Math.sin(stress * 8.0 + 4.2);
  return [r, g, b];
}
```

## Parameters
- **stress field**: from pressure centers, cracks, deformation
- **frequency**: controls color band density
- **threshold**: where color appears
