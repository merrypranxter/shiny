# ✦ System 37: DICHROIC GLASS / FILM

## Core Idea

Transmits one color, reflects another, simultaneously. **The shine depends on which side you're on**. Front = mirror gold, back = transparent blue. The object has two personalities. Use this for layers that reveal/hide depending on viewpoint.

## Physics

Dichroic filters use thin-film interference with multiple layers of different refractive indices. Constructive interference at one wavelength (reflection) means destructive interference at another (transmission). **The same photon is both reflected and not-reflected** — depending on which way it came from.

## Concept

**A material with two faces, each a different optical world.**

- Front: reflective, metallic, opaque
- Back: transparent, colored, see-through
- Edge: both at once, prismatic
- Layered: multiple dichroic films = complex color mixing

The object is a **Janus material** — two-faced by physics, not by design.

## Math Systems

| Component | Math | Purpose |
|-----------|------|---------|
| Thin-film stack | Transfer matrix method | reflectance/transmittance |
| Angle dependence | Snell's law + phase shift | viewing angle effect |
| Layer count | Recursive reflection | color purity |
| Stack design | Optimization (target colors) | design tool |

## Code Hook (GLSL)

```glsl
vec3 dichroicFilm(vec3 viewDir, vec3 normal, vec3 lightDir, float time) {
  // Fresnel reflectance
  float cosTheta = abs(dot(viewDir, normal));
  float R = fresnel(cosTheta, 1.5); // film IOR

  // Thin-film interference
  float filmThickness = 500.0 + sin(time) * 50.0; // nm
  float phase = 2.0 * 3.14159 * filmThickness * 1.5 * cosTheta / 550.0;

  // Reflected color (front)
  vec3 reflected = vec3(
    0.5 + 0.5 * cos(phase + 0.0),
    0.5 + 0.5 * cos(phase + 2.1),
    0.5 + 0.5 * cos(phase + 4.2)
  );

  // Transmitted color (back): complementary
  vec3 transmitted = 1.0 - reflected;

  // Which side? View direction determines
  float frontSide = step(0.0, dot(viewDir, normal));

  return mix(transmitted, reflected * R, frontSide);
}

float fresnel(float cosTheta, float ior) {
  float r0 = pow((1.0 - ior) / (1.0 + ior), 2.0);
  return r0 + (1.0 - r0) * pow(1.0 - cosTheta, 5.0);
}
```

## Variants

- **Dichroic architecture**: building facade, different color from street vs interior
- **Dichroic jewelry**: pendant that changes color when flipped
- **Dichroic lens**: glasses that filter differently for each eye
- **Dichroic layering**: multiple films = complex color mixing
- **Dichroic timepiece**: watch face, different color from above vs below

## Cross-Breeds

- + System 24 (Caustic chromatics): dichroic film + caustic = double color split
- + System 6 (Metallic): dichroic chrome = two metals in one
- + System 4 (Buried): buried dichroic layer, revealed by erosion
- + System 37 (Dichroic) + System 37 (Dichroic): multiple layers = impossible color
- + System 22 (Moiré): dichroic moiré = color-shifting interference

---

*"The front is gold, the back is blue, and the edge is both."*
