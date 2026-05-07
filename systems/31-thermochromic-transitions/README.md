# ✦ System 31: THERMOCHROMIC TRANSITIONS

## Core Idea

Color that responds to heat/pressure gradients. Not "it glows when hot" — but **the shine itself is the temperature map**. The transition boundary between thermal states is where the optical magic lives. The seam between cold and hot is prismatic.

## Physics

Thermochromic materials change color at specific transition temperatures. Liquid crystals (cholesteric) shift pitch with temperature, changing reflected wavelength. Leuco dyes transition from colored to clear. Combined: **the temperature field IS the color field**.

## Concept

**Veins that shift from oil-slick blue (cold) to molten gold (hot) along a gradient.**

The shine is not uniform — it is a **thermal contour map made of optical material**:
- Cold regions: blue-violet structural color (short pitch)
- Transition zone: full spectrum prismatic band (the "seam")
- Hot regions: red-gold metallic reflection (long pitch / leuco dye cleared)

The boundary moves as heat flows. The shine **breathes with temperature**.

## Math Systems

| Component | Math | Purpose |
|-----------|------|---------|
| Temperature field | Reaction-diffusion or heat equation | thermal gradient |
| Pitch map | Temperature → pitch length | color assignment |
| Structural color | Bragg reflection approximation | visual output |
| Transition band | Smoothstep between states | prismatic seam |

## Code Hook (GLSL)

```glsl
vec3 thermochromicShine(vec2 uv, float temp, float time) {
  // Temperature determines cholesteric pitch
  float pitch = mix(200.0, 600.0, temp); // nm

  // Bragg reflection: λ = n * pitch
  float wavelength = 1.55 * pitch; // average refractive index

  // Convert wavelength to RGB
  vec3 coldColor = wavelengthToRGB(400.0);  // violet
  vec3 hotColor = wavelengthToRGB(700.0);   // red

  // Transition zone: prismatic band
  float transition = smoothstep(0.4, 0.6, temp);
  vec3 seamColor = vec3(
    sin(temp * 20.0 + 0.0) * 0.5 + 0.5,
    sin(temp * 20.0 + 2.1) * 0.5 + 0.5,
    sin(temp * 20.0 + 4.2) * 0.5 + 0.5
  );

  // Combine: cold → seam → hot
  vec3 color = mix(coldColor, seamColor, transition);
  color = mix(color, hotColor, smoothstep(0.55, 0.7, temp));

  // Add thermal pulse
  color += vec3(0.1, 0.05, 0.0) * sin(time * 2.0 + temp * 10.0);

  return color;
}

vec3 wavelengthToRGB(float wavelength) {
  // CIE color matching approximation
  float r = 0.0, g = 0.0, b = 0.0;
  if (wavelength >= 380.0 && wavelength < 440.0) {
    r = -(wavelength - 440.0) / (440.0 - 380.0);
    b = 1.0;
  } else if (wavelength >= 440.0 && wavelength < 490.0) {
    g = (wavelength - 440.0) / (490.0 - 440.0);
    b = 1.0;
  } else if (wavelength >= 490.0 && wavelength < 510.0) {
    g = 1.0;
    b = -(wavelength - 510.0) / (510.0 - 490.0);
  } else if (wavelength >= 510.0 && wavelength < 580.0) {
    r = (wavelength - 510.0) / (580.0 - 510.0);
    g = 1.0;
  } else if (wavelength >= 580.0 && wavelength < 645.0) {
    r = 1.0;
    g = -(wavelength - 645.0) / (645.0 - 580.0);
  } else if (wavelength >= 645.0 && wavelength < 780.0) {
    r = 1.0;
  }
  return vec3(r, g, b);
}
```

## Variants

- **Thermochromic veins**: branching network where blood flow = heat = color
- **Thermochromic weather**: storm system where pressure fronts have thermal signatures
- **Thermochromic touch**: surface that records handprints as color fossils
- **Thermochromic anatomy**: body where organ temperature = visible color map
- **Thermochromic kintsugi**: repair material that changes color as it cures (heat of reaction)

## Cross-Breeds

- + System 1 (Veins): thermal veins, blood flow = color flow
- + System 7 (Weather): thermal pressure fronts as color bands
- + System 11 (Anatomy): body heat map as structural color
- + System 3 (Kintsugi): curing heat creates color in repair seams
- + System 23 (Disorder): thermochromic + quasi-ordered = temperature-sensitive structural color

---

*"The shine is the heat, and the heat is the life."*
