# Signed Distance Functions (SDF) for Shine

## What
Mathematical shapes defined by distance to surface — positive outside, negative inside.

## Use For
- Blobby shapes with chrome rims
- Matte objects with hyperactive edges
- Sticker-like forms
- Puffy shapes with candy-shell flash
- Contour-based shine

## Common Shapes
```glsl
float circleSDF(vec2 p, float r) { return length(p) - r; }
float boxSDF(vec2 p, vec2 b) { vec2 d = abs(p) - b; return length(max(d,0)) + min(max(d.x,d.y),0); }
float unionSDF(float a, float b) { return min(a, b); }
float intersectSDF(float a, float b) { return max(a, b); }
float subtractSDF(float a, float b) { return max(a, -b); }
```

## Shine Adaptation
- Edge = `abs(sdf)` small → chrome rim
- Interior = negative → matte host
- Exterior = positive → background
- Smooth union = soft blend between shapes
