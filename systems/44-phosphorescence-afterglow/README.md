# ✦ System 44: PHOSPHORESCENCE / AFTERGLOW

## Core Idea

Not glow-in-the-dark. **Persistent luminescence with decay curves**. The shine has memory — bright when lit, then fading through colors over time. Imagine a surface where dragging your finger leaves a trail that goes white → cyan → blue → dark over 30 seconds. The history is visible.

## Physics

Phosphorescence: excited states with long lifetime (seconds to hours). Trap states slowly release energy. Different trap depths = different decay times. **The material remembers light**.

## Concept

**A surface that records its illumination history.**

- Bright flash: intense white
- 1 second later: cyan glow
- 5 seconds: blue
- 30 seconds: faint violet
- 2 minutes: dark

Multiple excitations = overlapping decay curves = **color mixing from time**. The surface is a **temporal color canvas**.

## Math Systems

| Component | Math | Purpose |
|-----------|------|---------|
| Excitation | Impulse or continuous | input light |
| Trap states | Multi-exponential decay | memory |
| Decay curves | I(t) = Σ A_i × exp(-t/τ_i) | temporal behavior |
| Color | Wavelength-dependent decay | chromatic afterglow |

## Code Hook (GLSL)

```glsl
vec3 phosphorescence(vec2 uv, float excitationTime[10], float time) {
  vec3 color = vec3(0.0);

  for (int i = 0; i < 10; i++) {
    float dt = time - excitationTime[i];
    if (dt < 0.0 || dt > 120.0) continue; // 2 min max

    // Multi-exponential decay
    float fast = exp(-dt * 2.0);   // τ = 0.5s
    float medium = exp(-dt * 0.2); // τ = 5s
    float slow = exp(-dt * 0.02);  // τ = 50s

    // Color shifts with time
    vec3 earlyColor = vec3(1.0, 1.0, 1.0);  // white
    vec3 midColor = vec3(0.3, 0.8, 1.0);    // cyan
    vec3 lateColor = vec3(0.2, 0.3, 0.8);   // blue

    float tNorm = dt / 30.0;
    vec3 decayColor = mix(earlyColor, midColor, smoothstep(0.0, 0.3, tNorm));
    decayColor = mix(decayColor, lateColor, smoothstep(0.3, 1.0, tNorm));

    float intensity = fast * 0.5 + medium * 0.3 + slow * 0.2;

    color += decayColor * intensity;
  }

  return color;
}
```

## Variants

- **Phosphorescent writing**: invisible ink that glows after UV exposure
- **Phosphorescent memory**: surface that shows last 10 touches as fading trails
- **Phosphorescent timepiece**: clock where hands leave glowing trails
- **Phosphorescent art**: painting that changes over minutes after viewing
- **Phosphorescent safety**: exit signs that glow without power

## Cross-Breeds

- + System 35 (Evanescent): touch excites evanescent field, phosphorescent decay
- + System 12 (Repair): repair material with phosphorescent curing history
- + System 30 (Entropic): damage creates phosphorescent scars
- + System 44 (Phosphorescence) + System 44 (Phosphorescence): overlapping excitations = color mixing
- + System 5 (Glitter ecology): glitter particles with different phosphorescent lifetimes

---

*"The light is a memory, and the memory fades in color."*
