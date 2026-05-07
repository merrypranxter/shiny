# Reaction-Diffusion for Shine

## What
Gray-Scott / Turing pattern formation — chemicals that react and diffuse.

## Use For
- Organic pattern generation
- Skeleton extraction for veins
- Spot/stripe formation
- Moss / mold growth patterns
- Infection boundaries

## Parameters
- **f** (feed rate): pattern density
- **k** (kill rate): pattern type (spots vs stripes vs chaos)
- **D_u, D_v**: diffusion rates

## Shine Adaptation
- High concentration zones = matte host
- Boundary/skeleton = shiny seams
- Feed points = sparkle origins
- Kill zones = dark host regions

## Code Hook
```javascript
function grayScottStep(grid, f, k, Du, Dv) {
  // Laplacian + reaction terms
  // Return next state
}
```
