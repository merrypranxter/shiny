# ✦ System 24: CAUSTIC CHROMATICS

## Core Idea

Caustics are light concentration patterns from refraction [^43^]. Usually rendered as white/yellow bright spots. But caustics can be **chromatic** — each wavelength focuses at a different point due to dispersion.

Build shine where the caustic pattern itself is rainbow-split. Not oil slick on top — the caustic IS the spectrum.

## Concept

**Projected light patterns where RGB channels focus at different depths/positions.**

- Red caustics focus at distance D
- Green caustics focus at D * 0.95
- Blue caustics focus at D * 0.9

Result: where caustics overlap = white. Where they separate = rainbow edges. The caustic pattern is a **living prism**.

## Math Systems

| Component | Math | Purpose |
|-----------|------|---------|
| Surface normals | Noise-displaced plane | water/glass surface |
| Ray refraction | Snell's law per wavelength | chromatic splitting |
| Caustic intensity | Jacobian of ray mapping | brightness concentration |
| Color recombination | RGB channel separation + blend | final chromatic caustic |

Maxime Heckel's approach [^43^]: compute refracted ray vectors, compare surface areas before/after refraction, use the ratio as caustic intensity. Add chromatic aberration by computing three times with different refractive indices.

## Code Hook (GLSL)

```glsl
vec3 chromaticCaustic(vec2 uv, vec3 normal, float t) {
  vec3 caustic = vec3(0.0);
  float iorR = 1.33, iorG = 1.34, iorB = 1.35; // water dispersion

  // Red caustic
  vec3 refractR = refract(vec3(0,0,-1), normal, 1.0/iorR);
  float cR = causticIntensity(uv, refractR.xy, t);

  // Green caustic  
  vec3 refractG = refract(vec3(0,0,-1), normal, 1.0/iorG);
  float cG = causticIntensity(uv, refractG.xy, t);

  // Blue caustic
  vec3 refractB = refract(vec3(0,0,-1), normal, 1.0/iorB);
  float cB = causticIntensity(uv, refractB.xy, t);

  caustic = vec3(cR, cG, cB) * 2.0;
  return pow(caustic, vec3(0.7)); // gamma for bloom
}
```

## Variants

- **Caustic typography**: letters projected through rippling water, chromatic edges
- **Caustic skin**: body surface as liquid interface, moving caustic tattoos
- **Caustic architecture**: building facades as water surfaces, projected rainbow patterns
- **Caustic timepiece**: clock where hour markers are caustic foci, chromatic hands
- **Caustic music**: audio-reactive caustics where frequency = wavelength separation

## Why It Works

Caustics already feel magical — light bending into impossible bright lines. Adding chromatic separation makes them **impossible + beautiful**. The physics is real (dispersion) but the effect is pushed to aesthetic extremes. It looks like liquid light.

## Cross-Breeds

- + System 19 (Caustic projection): base caustic system with chromatic upgrade
- + System 21 (Chromatic aberration): double-chromatic — object AND projection split
- + System 10 (Wet shine): wet surface where caustics are the primary shine source
- + System 3 (Kintsugi): cracks filled with liquid that projects chromatic caustics

---

*"The light bends, splits, and concentrates — and the result is a rainbow made of shadow."*
