# Fresnel Fields for Shine

## What
Edge-brightening based on viewing angle — glancing = bright, straight-on = dull.

## Use For
- Subsurface shine reveal
- Rim lighting
- Buried structure edge glow
- Velvet / soft material sheen
- Glass / liquid surface

## Formula
```glsl
float fresnel(float cosTheta, float power) {
  return pow(1.0 - abs(cosTheta), power);
}
```

## Shine Adaptation
- High fresnel = edge chrome glow
- Low fresnel = matte interior
- Variable power = material type (velvet = high power, metal = low)
- Combine with subsurface color for magical depth
