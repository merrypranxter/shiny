# ✦ System 42: RAMAN SCATTERING (AESTHETICIZED)

## Core Idea

Inelastic light scattering — photons lose/gain energy, shift color. **The shine is a conversation between light and matter**. Red light in, blue light out. Use it for materials that "answer back" to illumination — shine a red laser, get blue glow from the surface.

## Physics

Raman scattering: photon interacts with molecular vibration, gains or loses vibrational energy. Stokes shift: photon loses energy (redshift). Anti-Stokes: photon gains energy (blueshift). **The molecule's fingerprint IS the color shift**.

## Concept

**A material that changes the color of light passing through it.**

- Incident: white light
- Transmitted: color-shifted by molecular vibrations
- Each molecule type = different shift
- The surface is a **color translator**

Shine red on it: it glows blue. Shine blue: it glows red. The material **inverts the spectrum**.

## Math Systems

| Component | Math | Purpose |
|-----------|------|---------|
| Incident spectrum | Gaussian or flat | input light |
| Raman shift | Vibrational modes | energy transfer |
| Output spectrum | Convolution | color translation |
| Molecular map | Spatial distribution | pattern formation |

## Code Hook (GLSL)

```glsl
vec3 ramanMaterial(vec3 incidentColor, vec2 uv, float time) {
  // Molecular vibration frequencies (simplified)
  float vib1 = 1000.0; // cm^-1
  float vib2 = 1600.0;
  float vib3 = 3000.0;

  // Raman shifts (Stokes: redshift)
  float shift1 = 0.1; // normalized
  float shift2 = 0.15;
  float shift3 = 0.25;

  // Spatial distribution of molecules
  float mol1 = smoothstep(0.3, 0.5, fbm(uv * 3.0 + time * 0.1));
  float mol2 = smoothstep(0.3, 0.5, fbm(uv * 5.0 - time * 0.15));
  float mol3 = 1.0 - mol1 - mol2;

  // Raman scattering: shift each channel
  vec3 scattered = vec3(0.0);
  scattered.r = incidentColor.r * (1.0 - mol1 * shift1);
  scattered.g = incidentColor.g * (1.0 - mol2 * shift2);
  scattered.b = incidentColor.b * (1.0 - mol3 * shift3);

  // Anti-Stokes: add shifted light
  vec3 antiStokes = vec3(
    incidentColor.g * mol1 * shift1 * 0.5,
    incidentColor.b * mol2 * shift2 * 0.5,
    incidentColor.r * mol3 * shift3 * 0.5
  );

  return scattered + antiStokes;
}
```

## Variants

- **Raman sensor**: surface that identifies substances by color shift
- **Raman memory**: color-shifted light stores information
- **Raman art**: painting that changes color under different illumination
- **Raman security**: document that reveals pattern only under specific light
- **Raman biology**: cell imaging where organelles have different Raman signatures

## Cross-Breeds

- + System 36 (Plasmonic): plasmon-enhanced Raman = massive color shift
- + System 23 (Disorder): disordered Raman = complex color mixing
- + System 35 (Evanescent): evanescent Raman = surface-only color shift
- + System 42 (Raman) + System 42 (Raman): cascaded Raman = extreme color shift
- + System 28 (Quantum dust): quantum dots with Raman-active coating

---

*"The light speaks to the molecule, and the molecule answers in a different color."*
