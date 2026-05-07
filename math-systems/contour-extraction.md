# Contour Extraction for Shine

## What
Finding level sets / isolines of scalar fields.

## Use For
- Topographic shine maps
- Weather front visualization
- Pressure band rendering
- Isobar / contour line glow
- Elevation-based metallic gradients

## Methods
- **Marching squares**: grid-based contour extraction
- **Threshold bands**: discrete level rendering
- **Gradient magnitude**: edge detection
- **Laplacian zero-crossings**: sub-pixel contours

## Code Hook
```javascript
function contourAmount(v, bands) {
  const f = v * bands;
  const d = Math.abs(f - Math.round(f));
  return Math.max(0, 1 - d * 14);
}
```
