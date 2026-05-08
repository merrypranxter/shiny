# ✦ System 22: MOIRÉ AS OPTICAL ARCHITECTURE

## Core Idea

Moiré is usually an accident — two grids overlap and create interference bands [^45^]. But moiré is **wave interference made visible** — and that means it can be architected.

Instead of avoiding moiré, build with it. Two (or more) periodic structures that interact to create emergent optical phenomena. The moiré becomes the building material.

## Concept

**Layered gratings that generate shine through interference, not through material properties.**

The host is transparent or matte. The shine comes from the **interaction between layers** — not from any single layer.

- Layer 1: fine parallel lines (0°)
- Layer 2: fine parallel lines (slightly rotated, 2-5°)
- Layer 3: concentric circles or radial spokes

Where they intersect: interference bands appear. Those bands are the shine. Move one layer: the shine moves. The shine is **dynamic, interactive, immaterial**.

## Math Systems

| Component | Math | Purpose |
|-----------|------|---------|
| Grating A | Sine wave * threshold | line set 1 |
| Grating B | Sine wave * threshold, rotated | line set 2 |
| Interference | abs(A - B) or A * B | moiré bands |
| Animation | rotate B slowly over time | living interference |

The moiré band spacing depends on the angle difference and frequency ratio [^46^]. Small angle changes = large visual changes.

## Code Hook (GLSL)

```glsl
float moireGrating(vec2 uv, float angle, float freq, float thickness) {
  vec2 rot = rotate(uv, angle);
  float wave = sin(rot.x * freq * 3.14159);
  return smoothstep(-thickness, thickness, wave);
}

float moireArchitecture(vec2 uv, float t) {
  float g1 = moireGrating(uv, 0.0, 40.0, 0.3);
  float g2 = moireGrating(uv, 0.05 + sin(t*0.1)*0.02, 40.0, 0.3);
  float g3 = moireGrating(uv, length(uv)*10.0, 30.0, 0.2); // radial

  float interference = abs(g1 - g2) * g3;
  return pow(interference, 2.0); // sharpen bands
}
```

## Variants

- **Moiré topography**: terrain where elevation = grating frequency, shine follows contour
- **Moiré fabric**: textile where warp and weft create interference shimmer
- **Moiré liquid**: fluid simulation where velocity field rotates gratings
- **Moiré hologram**: multiple gratings at different angles create 3D-like depth without lenses
- **Moiré typography**: text made of interfering line sets, readable only at certain angles

## Why It Works

Moiré is **emergent optics** — the shine doesn't exist in any single layer. It only exists in the relationship between layers. This makes it feel magical, unstable, alive. The viewer's slightest movement changes the pattern.

## Cross-Breeds

- + System 2 (Tessellation): Penrose tiling + moiré overlay = non-repeating interference
- + System 7 (Weather): pressure fronts as rotating gratings, storm moiré
- + System 13 (Woven): actual textile with moiré-generating weave structure
- + System 19 (Caustic): caustic patterns that are moiré of light rays

---

*"The shine is in the gap between things."*
