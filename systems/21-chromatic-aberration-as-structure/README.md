# ✦ System 21: CHROMATIC ABERRATION AS STRUCTURE

## Core Idea

Don't treat chromatic aberration as a lens defect or post-processing "cool effect." Treat it as a **structural material** — a way to build objects out of color separation itself.

The physics: different wavelengths refract at slightly different angles through any transparent medium [^49^]. Usually we fight this. Instead: **amplify it, architect it, make it the object.**

## Concept

A form where the RGB channels don't align. Not as a blur — as a **spatial offset that defines shape**.

- The red channel defines the outer shell
- The green channel defines the mid-structure  
- The blue channel defines the inner core

Viewed straight on: white/gray object. Viewed from angle: rainbow extrusion. The object **is** the aberration.

## Math Systems

| Layer | Math | Behavior |
|-------|------|----------|
| Red (outer) | SDF shell + noise displacement | rough, organic |
| Green (mid) | SDF shell * 0.8 + different noise | smoother, flowing |
| Blue (core) | SDF shell * 0.5 + curl noise | tight, nervous |

Offset each channel by its wavelength ratio: R ≈ 1.0, G ≈ 0.95, B ≈ 0.9 in refractive index terms.

## Code Hook (GLSL)

```glsl
vec3 chromaticObject(vec3 p, float t) {
  float r = sdfShell(p + noise(p*2.0 + t*0.1) * 0.1);
  float g = sdfShell(p * 0.8 + noise(p*3.0 - t*0.15) * 0.08);
  float b = sdfShell(p * 0.5 + curlNoise(p*4.0 + t*0.2) * 0.05);

  float redDist = abs(r) - 0.02;
  float greenDist = abs(g) - 0.015; 
  float blueDist = abs(b) - 0.01;

  vec3 color = vec3(0.0);
  color.r = smoothstep(0.05, 0.0, redDist) * 1.0;
  color.g = smoothstep(0.05, 0.0, greenDist) * 0.9;
  color.b = smoothstep(0.05, 0.0, blueDist) * 0.8;

  return color;
}
```

## Variants

- **Aberration typography**: letters made of channel-separated strokes
- **Aberration anatomy**: veins where each blood type is a different channel offset
- **Aberration architecture**: buildings that only resolve to white from one exact viewpoint
- **Temporal aberration**: channels animate at different speeds, object breathes in rainbow

## Why It Works

Chromatic aberration is usually a **defect**. By making it structural, you hijack a physics bug and turn it into a design language. The viewer's eye keeps trying to "focus" the object — but the object is intentionally unfocusable. It creates visual tension.

## Cross-Breeds

- + System 4 (Buried shine): chromatic aberration under cloudy skin, channels emerge at different depths
- + System 11 (Anatomy): nervous system where each neuron type is RGB-separated
- + System 19 (Caustic): caustic projections that are themselves chromatically split

---

*"The object is not blurry. The object IS the blur."*
