# fBm (Fractal Brownian Motion) for Shine

## What
Layered noise at multiple frequencies — natural-looking variation.

## Use For
- Terrain / height maps
- Weather pressure fields
- Glitter density masks
- Film thickness (oil slick)
- Moss / mold growth fields

## Formula
```
fBm(x, y) = Σ (noise(x * 2^i, y * 2^i) / 2^i)
```

## Parameters
- **Octaves**: detail levels (3-8)
- **Lacunarity**: frequency multiplier (usually 2)
- **Persistence**: amplitude decay (usually 0.5)

## Code Hook
```javascript
function fbm(x, y, octaves = 5) {
  let v = 0, a = 0.5, f = 1;
  for (let i = 0; i < octaves; i++) {
    v += a * noise(x * f, y * f);
    f *= 2; a *= 0.5;
  }
  return v;
}
```
