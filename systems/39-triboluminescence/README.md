# ✦ System 39: TRIBOLUMINESCENCE

## Core Idea

Light from crushing/breaking crystals. **The shine is the sound of breaking made visible**. A material that sparkles when you snap it, bend it, crush it. The damage IS the light source. Like Wint-O-Green Lifesavers but for design.

## Physics

Triboluminescence: mechanical energy breaks crystal bonds, separates charges, discharge produces light. The light is **friction made photons**. Not heat — direct mechanical-to-optical conversion.

## Concept

**A material that lights up when damaged.**

- Snap a stick: flash at break point
- Crush powder: sparkle cloud
- Bend wire: light along stress concentration
- Scratch surface: glowing trail
- Grind together: shower of sparks

The shine is **mechanical stress made visible**. Use it for materials that record their own abuse.

## Math Systems

| Component | Math | Purpose |
|-----------|------|---------|
| Stress field | FEM or SDF stress analysis | where breaking happens |
| Fracture events | Discrete element method | when/where flashes occur |
| Light emission | Blackbody + line spectrum | color/brightness |
| Accumulation | Event history | material fatigue visualization |

## Code Hook (GLSL)

```glsl
vec3 triboluminescence(vec2 uv, vec2 fracturePoints[20], float time) {
  vec3 color = vec3(0.0);

  for (int i = 0; i < 20; i++) {
    vec2 fracture = fracturePoints[i];
    float dist = length(uv - fracture);

    // Time since fracture
    float dt = time - fractureTimes[i];
    if (dt < 0.0 || dt > 0.5) continue;

    // Flash intensity: sharp peak at fracture, then decay
    float intensity = exp(-dt * 10.0) * (1.0 + sin(dt * 50.0) * 0.3);

    // Crystal type determines color
    float crystalType = fract(fracture.x * 7.0 + fracture.y * 13.0);
    vec3 flashColor;
    if (crystalType < 0.25) {
      flashColor = vec3(0.9, 0.9, 1.0); // sugar: blue-white
    } else if (crystalType < 0.5) {
      flashColor = vec3(0.5, 1.0, 0.5); // quartz: green
    } else if (crystalType < 0.75) {
      flashColor = vec3(1.0, 0.8, 0.3); // mica: yellow
    } else {
      flashColor = vec3(1.0, 0.5, 0.5); // ruby: red
    }

    // Spatial falloff
    float falloff = exp(-dist * dist * 50.0);

    color += flashColor * intensity * falloff;
  }

  return color;
}
```

## Variants

- **Triboluminescent safety glass**: cracks light up when broken (emergency visibility)
- **Triboluminescent geology**: rock core that shows stress history as light map
- **Triboluminescent packaging**: box that flashes when opened (tamper evidence)
- **Triboluminescent art**: sculpture that changes as you handle it
- **Triboluminescent sport**: ball that sparks on impact

## Cross-Breeds

- + System 12 (Repair): repair material that triboluminesces when stressed
- + System 30 (Entropic): material degradation = more triboluminescent
- + System 3 (Kintsugi): gold repair + crystal substrate = flash on crack
- + System 10 (Wet/Dry): wet crystal = more triboluminescent
- + System 33 (Sonoluminescence): mechanical + acoustic = double flash

---

*"The break is the light, and the light is the break."*
