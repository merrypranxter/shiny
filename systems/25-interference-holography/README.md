# ✦ System 25: INTERFERENCE HOLOGRAPHY

## Core Idea

Holograms record interference patterns between reference beam and object beam. But what if the **interference pattern itself is the aesthetic object** — not a recording of something else, but a generative interference field?

Build optical structures where interference is the design tool, not the documentation method.

## Concept

**Synthetic holograms** — interference patterns generated mathematically, not optically recorded. The pattern encodes depth, motion, and color through phase relationships.

- Reference wave: planar, coherent
- Object wave: generated from SDF or noise field
- Interference: |R + O|² = intensity pattern

The resulting pattern looks like a **holographic plate** — but it's pure math. View it: depth emerges. Tilt it: parallax shifts. But there's no "object" — only the math.

## Math Systems

| Component | Math | Purpose |
|-----------|------|---------|
| Reference wave | plane wave e^(ikz) | coherent baseline |
| Object wave | scattered from SDF points | depth-encoded phase |
| Interference | I = \|R + O\|² | hologram pattern |
| Reconstruction | inverse propagation | view from angle |

## Code Hook (GLSL)

```glsl
float hologramInterference(vec2 uv, float z, float t) {
  // Reference plane wave
  float phaseR = z * 10.0;

  // Object: scattered from multiple depth layers
  float phaseO = 0.0;
  for(int i = 0; i < 5; i++) {
    float zi = float(i) * 0.2;
    float sdf = objectSDF(uv, zi, t);
    phaseO += exp(-sdf * 3.0) * sin(zi * 20.0 + t);
  }

  // Interference
  float I = 1.0 + cos(phaseR - phaseO);
  return pow(I * 0.5, 3.0); // sharpen
}
```

## Variants

- **Rainbow hologram**: multiple wavelengths, each produces different depth plane
- **Animated hologram**: time-varying object wave = living interference
- **Holographic topography**: terrain where elevation = phase depth
- **Holographic anatomy**: body where organs are different depth layers in interference
- **Holographic void**: interference pattern of empty space — pure phase, no object
- **Destructive holography**: interference designed to cancel at specific angles = invisible object

## Why It Works

Holograms feel like **magic technology** — flat surfaces with depth. Synthetic holograms push that further: the depth exists without an object. It's pure optical information made aesthetic. The viewer recognizes the holographic "look" but can't find the source.

## Cross-Breeds

- + System 22 (Moiré): moiré gratings as holographic recording medium
- + System 23 (Disorder): quasi-ordered scatterers as holographic object wave
- + System 6 (Metallic): chrome surface with synthetic hologram overlay
- + System 18 (Map): topographic hologram where elevation = phase depth

---

*"The object is a ghost made of phase relationships."*
