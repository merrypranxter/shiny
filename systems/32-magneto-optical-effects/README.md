# ✦ System 32: MAGNETO-OPTICAL EFFECTS

## Core Idea

Shine that responds to magnetic fields. Faraday rotation — polarization twists in a magnetic field. Build a material where the shine **bends around invisible field lines**. Like iron filings, but with light. You don't see the magnet, you see the light curving around it.

## Physics

Faraday effect: plane of polarization rotates proportionally to magnetic field strength and path length through medium. Verdet constant determines rotation per unit field. **The rotation IS the image**.

## Concept

**A surface where the shine follows magnetic field topology.**

- Field lines = light paths
- Field strength = polarization rotation = color
- Field nulls = dark spots (no rotation)
- Field maxima = saturated color (90° rotation)

The magnet is invisible. The light reveals its shape. Like a **magnetic field made of rainbows**.

## Math Systems

| Component | Math | Purpose |
|-----------|------|---------|
| Magnetic field | Dipole + multipole expansion | B-field topology |
| Faraday rotation | θ = V * B * L | polarization angle |
| Polarizer analysis | Malus' law | intensity from rotation |
| Color | Rotation angle → hue | visual mapping |

## Code Hook (GLSL)

```glsl
vec3 magnetoOptical(vec2 uv, vec3 magnetPos, float magnetStrength, float time) {
  // Distance to magnet
  float dist = length(uv - magnetPos.xy);

  // Magnetic field (dipole approximation)
  vec3 B = vec3(0.0);
  B.x = 3.0 * (uv.x - magnetPos.x) * (0.0 - magnetPos.z) / pow(dist, 5.0);
  B.y = 3.0 * (uv.y - magnetPos.y) * (0.0 - magnetPos.z) / pow(dist, 5.0);
  B.z = (3.0 * pow(0.0 - magnetPos.z, 2.0) - pow(dist, 2.0)) / pow(dist, 5.0);

  float Bmag = length(B) * magnetStrength;

  // Faraday rotation
  float rotation = Bmag * 0.5; // Verdet constant proxy

  // Polarizer at 45°
  float transmission = pow(sin(rotation), 2.0);

  // Color from rotation
  float hue = (rotation / (2.0 * 3.14159)) * 360.0;
  vec3 color = hsv2rgb(vec3(hue, 0.8, transmission));

  // Field line visualization
  float fieldLine = smoothstep(0.48, 0.5, fract(rotation * 2.0));
  color += vec3(0.2) * fieldLine;

  return color;
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
```

## Variants

- **Magnetic anatomy**: body where nerves = field lines, signals = light pulses
- **Magnetic weather**: ion storm where charged particles create field-aligned shine
- **Magnetic kintsugi**: repair material with magnetic particles, field reveals seams
- **Magnetic typography**: letters made of field lines, readable only with polarized light
- **Magnetic memory**: surface that records magnetic history as color patterns

## Cross-Breeds

- + System 11 (Anatomy): nervous system as magnetic field lines
- + System 8 (Infrastructure): power grid as visible magnetic topology
- + System 3 (Kintsugi): magnetic particles in repair seams
- + System 27 (Polarization): double polarization — birefringence + Faraday
- + System 22 (Moiré): magnetic field moiré between polarized layers

---

*"The magnet is invisible. The light is its confession."*
