# L-Systems for Shine

## What
Lindenmayer systems — recursive string rewriting for branching structures.

## Use For
- Vein networks
- Capillary systems
- Root structures
- Crack propagation
- Embroidery paths

## Basic Rules
```
Axiom: F
Rule: F -> F[+F]F[-F]F
Angle: 25°
```

## Shine Adaptation
- Each segment = optical filament
- Branch points = junction glints
- Terminal points = sparkle nodes
- Thickness tapers with depth

## Code Hook
```javascript
function lSystemVeins(iterations, angle) {
  let str = "F";
  for (let i = 0; i < iterations; i++) {
    str = str.replace(/F/g, "F[+F]F[-F]F");
  }
  return str; // render with turtle graphics
}
```
