# ✦ System 34: CHOLESTERIC LIQUID CRYSTALS

## Core Idea

Self-organizing helical structures that reflect specific wavelengths based on pitch. The color is **structural, temperature-dependent, and electrically switchable**. A surface that looks like beetle shell, but the colors shift as you breathe on it. The shine is alive, responsive, molecular.

## Physics

Cholesteric liquid crystals have a helical pitch that determines reflected wavelength: λ = n × pitch. Pitch changes with temperature, electric field, and mechanical strain. **The molecule IS the optical filter**.

## Concept

**A material where the molecular helix IS the design element.**

- Helix pitch = color
- Helix orientation = polarization
- Helix defects = optical singularities (dark spots, bright halos)
- Helix domains = color patches with sharp boundaries

The surface is a **mosaic of molecular helices**, each tuned to a different color. Like oil slick, but locked in place — until temperature or electricity changes the pitch.

## Math Systems

| Component | Math | Purpose |
|-----------|------|---------|
| Helix field | Vector field + pitch scalar | molecular orientation |
| Reflection | Bragg reflection from helix | color |
| Defects | Topological charge analysis | singularities |
| Dynamics | Landau-de Gennes free energy | phase transitions |

## Code Hook (GLSL)

```glsl
vec3 cholestericShine(vec2 uv, float temp, float electricField, float time) {
  // Helix pitch varies with temperature and field
  float pitch = 400.0 + temp * 200.0 + electricField * 100.0 * sin(time);

  // Helix orientation field
  float angle = atan(uv.y - 0.5, uv.x - 0.5) + time * 0.1;

  // Bragg reflection
  float wavelength = 1.55 * pitch;
  vec3 baseColor = wavelengthToRGB(wavelength);

  // Domain boundaries = sharp color changes
  float domain = sin(uv.x * 20.0) * sin(uv.y * 20.0);
  float boundary = smoothstep(0.45, 0.55, abs(domain));

  // Defects: points where helix is undefined
  float defect = 1.0 - smoothstep(0.0, 0.1, length(uv - vec2(0.5)));

  // Combine
  vec3 color = baseColor * (1.0 - boundary * 0.3);
  color += vec3(1.0) * boundary * 0.2; // boundary highlight
  color *= (1.0 - defect * 0.5); // defect darkening

  // Electric switching flash
  color += vec3(0.2, 0.1, 0.0) * electricField * sin(time * 10.0);

  return color;
}
```

## Variants

- **Cholesteric skin**: body temperature = color map, fever = red, chill = blue
- **Cholesteric fabric**: textile where stretch = color shift
- **Cholesteric display**: electrically switchable color patches
- **Cholesteric geology**: mineral with locked cholesteric structure (fossilized liquid crystal)
- **Cholesteric weather**: temperature-responsive surface showing thermal history

## Cross-Breeds

- + System 31 (Thermochromic): temperature + cholesteric = double-responsive color
- + System 27 (Polarization): cholesteric helix + polarizer = polarization color
- + System 23 (Disorder): cholesteric domains as quasi-ordered color
- + System 17 (Fashion): clothing where body heat = color pattern
- + System 11 (Anatomy): organs with different cholesteric signatures

---

*"The molecule is a spring, and the light bounces off the coils."*
