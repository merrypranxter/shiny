# Thin-Film Interference for Shine

## What
Color from light reflecting off thin layers — oil slicks, soap bubbles.

## Use For
- Oil slick pond skin
- Iridescent coatings
- Holographic foil
- Structural color
- Spectral caustics

## Physics
Phase shift depends on film thickness and refractive index.

## Approximation
```javascript
function thinFilmRGB(phase) {
  const r = 120 + 120 * Math.sin(phase + 0.0);
  const g = 120 + 120 * Math.sin(phase + 2.1);
  const b = 120 + 120 * Math.sin(phase + 4.2);
  return [r, g, b];
}
```

## Parameters
- **thickness**: controls hue (map from noise/field)
- **refractive index**: affects color shift speed
- **angle**: viewing angle affects perceived color
