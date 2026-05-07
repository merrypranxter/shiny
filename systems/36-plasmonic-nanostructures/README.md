# ✦ System 36: PLASMONIC NANOSTRUCTURES

## Core Idea

Gold/silver nanoparticles that resonate with specific wavelengths, producing colors that don't exist in the pigment. **The color is the electron cloud oscillating**. Different shapes = different colors. Rods = blue, spheres = green, stars = red. Build a "palette" of nanoparticle shapes.

## Physics

Localized surface plasmon resonance (LSPR): free electrons in metal nanoparticle oscillate collectively when driven by light. Resonant frequency depends on particle shape, size, and dielectric environment. **The particle IS the color filter**.

## Concept

**A material where the nanoparticle shape IS the color.**

- Spheres (d=40nm): green resonance (~530nm)
- Rods (aspect ratio 3:1): blue resonance (~600nm long axis)
- Stars (6 tips): red resonance (~700nm, tip enhancement)
- Triangles (sharp tips): near-IR resonance (~800nm)
- Core-shell (Au@Ag): tunable by shell thickness

The surface is a **shape-sorted color mosaic**. Like a stained glass window where the glass pieces are too small to see.

## Math Systems

| Component | Math | Purpose |
|-----------|------|---------|
| Particle field | Blue noise + shape distribution | spatial layout |
| LSPR | Mie theory / dipole approximation | resonance wavelength |
| Near-field | Dipole-dipole coupling | interparticle interaction |
| Render | Aggregate scattering | visual output |

## Code Hook (GLSL)

```glsl
vec3 plasmonicSurface(vec2 uv, float time) {
  // Multiple scales of particles
  vec3 color = vec3(0.0);
  float totalWeight = 0.0;

  for (float scale = 1.0; scale < 30.0; scale *= 2.0) {
    vec2 id = floor(uv * scale * 50.0);
    float n = hash(id + time * 0.01);

    // Shape determines color
    float shape = fract(n * 7.0); // 0-1 shape selector
    vec3 particleColor;

    if (shape < 0.2) {
      // Sphere: green
      particleColor = vec3(0.2, 0.8, 0.3);
    } else if (shape < 0.4) {
      // Rod: blue
      particleColor = vec3(0.3, 0.5, 0.9);
    } else if (shape < 0.6) {
      // Star: red
      particleColor = vec3(0.9, 0.2, 0.2);
    } else if (shape < 0.8) {
      // Triangle: near-IR (rendered as deep red)
      particleColor = vec3(0.8, 0.1, 0.1);
    } else {
      // Core-shell: tunable
      float shell = fract(n * 13.0);
      particleColor = vec3(0.5 + shell * 0.5, 0.3, 0.7 - shell * 0.3);
    }

    // Size determines brightness (larger = brighter)
    float size = 0.5 + fract(n * 11.0) * 0.5;
    float weight = size / scale;

    color += particleColor * weight;
    totalWeight += weight;
  }

  return color / totalWeight;
}
```

## Variants

- **Plasmonic tattoo**: nanoparticles injected under skin, shape = color
- **Plasmonic currency**: anti-counterfeiting with shape-coded color
- **Plasmonic sensor**: color changes with environment (pH, temperature)
- **Plasmonic display**: electrically switchable nanoparticle orientation
- **Plasmonic galaxy**: star field where stellar type = particle shape = color

## Cross-Breeds

- + System 28 (Quantum dust): quantum dots + plasmonic particles = dual resonance
- + System 23 (Disorder): quasi-ordered plasmonic arrays
- + System 5 (Glitter ecology): ecology of different plasmonic species
- + System 26 (Photonic crystal): photonic + plasmonic = hybrid optical response
- + System 17 (Fashion): clothing with shape-coded plasmonic threads

---

*"The electron cloud dances, and the color is its song."*
