# ✦ System 41: OPTICAL VORTICES / SCREW DISLOCATIONS

## Core Idea

Light with orbital angular momentum — the wavefront twists like a corkscrew. **The intensity null is a dark spot surrounded by a bright ring**. At the center: nothing. Around it: a bright helix. Use this for "eye of the storm" shine — dark center, brilliant spiral edge.

## Physics

Laguerre-Gaussian modes: beam with azimuthal phase dependence e^(ilφ). Intensity ~ r^|l| × e^(-r²/w²). **The dark center is a phase singularity** — undefined phase, zero intensity. The ring is where phase gradients are maximum.

## Concept

**Shine that is a donut, a helix, a storm.**

- l=1: single helix, one dark center
- l=2: double helix, two intertwined dark threads
- l=3: triple helix, braided darkness
- Superposition: multiple l = complex interference patterns
- Temporal: rotating helix = spinning light

The aesthetic is **light with topology**. Not just bright/dark — but knotted, braided, singular.

## Math Systems

| Component | Math | Purpose |
|-----------|------|---------|
| Phase profile | e^(ilφ) | azimuthal twist |
| Amplitude | r^|l| × Gaussian | intensity profile |
| Superposition | Σ c_l × LG_l | complex patterns |
| Rotation | φ → φ + ωt | temporal dynamics |

## Code Hook (GLSL)

```glsl
vec3 opticalVortex(vec2 uv, float time) {
  vec2 p = uv - 0.5;
  float r = length(p);
  float phi = atan(p.y, p.x);

  // Topological charge
  float l = 3.0;

  // Phase: azimuthal twist
  float phase = l * phi + time * 2.0;

  // Amplitude: donut mode
  float w = 0.3; // beam waist
  float amplitude = pow(r, abs(l)) * exp(-r * r / (w * w));

  // Intensity
  float intensity = amplitude * amplitude;

  // Color from phase
  vec3 color = vec3(
    0.5 + 0.5 * cos(phase + 0.0),
    0.5 + 0.5 * cos(phase + 2.1),
    0.5 + 0.5 * cos(phase + 4.2)
  );

  // Dark center
  float darkCenter = smoothstep(0.0, 0.05, r);

  return color * intensity * darkCenter;
}
```

## Variants

- **Vortex eye**: dark pupil surrounded by colored iris helix
- **Vortex storm**: hurricane made of light, eye = darkness
- **Vortex braid**: multiple vortices intertwined
- **Vortex knot**: light knotted in 3D topology
- **Vortex timepiece**: clock where hands are helical light

## Cross-Breeds

- + System 7 (Weather): storm eye as optical vortex
- + System 11 (Anatomy): pupil as natural optical vortex
- + System 22 (Moiré): moiré of vortex beams = complex patterns
- + System 25 (Holography): holographic vortex = 3D helix
- + System 41 (Vortex) + System 41 (Vortex): vortex collision = topological reaction

---

*"The darkness at the center is not absence — it is phase undefined, a singularity of light."*
