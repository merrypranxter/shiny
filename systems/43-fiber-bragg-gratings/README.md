# ✦ System 43: FIBER BRAGG GRATINGS

## Core Idea

Periodic variations in fiber refractive index that reflect specific wavelengths. **The fiber is a color filter, a mirror, a sensor**. Different strain = different color. Use for textiles where stretching changes the shine — pull the fabric, the seams light up in new colors.

## Physics

Bragg grating: periodic index modulation with period Λ. Reflects wavelength λ_B = 2n_eff × Λ. Strain changes Λ and n_eff, shifting λ_B. **The fiber measures strain by color**.

## Concept

**A textile where tension = color.**

- Relaxed: blue reflection
- Stretched: red reflection (longer period)
- Compressed: UV reflection (shorter period)
- Local strain = local color = strain map
- The fabric is a **wearable stress visualization**

## Math Systems

| Component | Math | Purpose |
|-----------|------|---------|
| Grating period | Λ = Λ₀(1 + ε) | strain response |
| Bragg wavelength | λ_B = 2n_eff × Λ | color |
| Strain field | FEM or measured | spatial distribution |
| Render | Wavelength → RGB | visual output |

## Code Hook (GLSL)

```glsl
vec3 fiberBraggGrating(vec2 uv, float strain, float time) {
  // Grating period changes with strain
  float lambda0 = 550.0; // nm, green at rest
  float lambda = lambda0 * (1.0 + strain * 0.1);

  // Reflectance: peak at Bragg wavelength
  float reflectance = exp(-pow((550.0 - lambda) / 50.0, 2.0));

  // Color from wavelength
  vec3 color = wavelengthToRGB(lambda);

  // Strain visualization
  float strainVis = abs(strain) * 5.0;
  color += vec3(strainVis, 0.0, -strainVis) * 0.2;

  // Fiber texture
  float fiber = sin(uv.y * 100.0) * 0.5 + 0.5;
  color *= 0.8 + fiber * 0.4;

  return color * reflectance;
}
```

## Variants

- **Bragg clothing**: shirt that shows muscle tension as color
- **Bragg architecture**: cable that shows structural load
- **Bragg medical**: bandage that shows swelling as color change
- **Bragg sport**: equipment that shows impact history
- **Bragg art**: sculpture that changes as you interact

## Cross-Breeds

- + System 17 (Fashion): clothing with Bragg fiber seams
- + System 13 (Woven): weave where tension = color
- + System 9 (Embroidery): stitches as Bragg sensors
- + System 43 (Bragg) + System 43 (Bragg): multiple gratings = complex spectra
- + System 34 (Cholesteric): liquid crystal + Bragg = double color response

---

*"The fiber is a harp string, and the light is the note it plays. Pull it: the pitch changes."*
