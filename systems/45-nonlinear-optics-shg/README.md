# ✦ System 45: NONLINEAR OPTICS (SECOND HARMONIC GENERATION)

## Core Idea

Two photons in, one photon out at double frequency. **IR light becomes visible green**. The shine only appears under specific illumination. Like a secret color layer that needs a specific light source to unlock. Use for "hidden" shine that only certain viewers (or cameras) can see.

## Physics

Second harmonic generation (SHG): nonlinear polarization at 2ω. Requires non-centrosymmetric crystal, phase matching. **The material doubles the frequency**. 1064nm IR → 532nm green. Invisible pump, visible output.

## Concept

**A material with a secret color that only reveals under IR illumination.**

- Normal light: matte, dull, invisible
- IR laser: brilliant green/blue glow
- The material is a **frequency translator**
- Security: only IR-equipped viewers see the shine
- Art: hidden layer revealed by specific technology

## Math Systems

| Component | Math | Purpose |
|-----------|------|---------|
| Pump field | Gaussian beam | IR illumination |
| Nonlinear polarization | χ^(2) × E² | SHG source |
| Phase matching | Δk = 0 | efficiency |
| Output | E(2ω) ∝ χ^(2) × E(ω)² | visible light |

## Code Hook (GLSL)

```glsl
vec3 nonlinearSHG(vec2 uv, float pumpIntensity, float time) {
  // Pump: IR (invisible)
  float pump = pumpIntensity * exp(-dot(uv - 0.5, uv - 0.5) * 10.0);

  // Nonlinear response: χ^(2) 
  float chi2 = 0.1; // nonlinear coefficient

  // SHG intensity ∝ pump²
  float shgIntensity = chi2 * pump * pump;

  // Phase matching: efficiency depends on angle
  float phaseMatch = cos(time * 2.0) * 0.5 + 0.5;
  shgIntensity *= phaseMatch;

  // SHG color: green (532nm from 1064nm)
  vec3 shgColor = vec3(0.2, 0.9, 0.3);

  // Under normal light: invisible
  vec3 ambient = vec3(0.1, 0.1, 0.12); // dark matte

  // Combined: only SHG visible when pump present
  return ambient + shgColor * shgIntensity;
}
```

## Variants

- **SHG security**: document with hidden IR-visible pattern
- **SHG art**: painting with layer only visible under IR
- **SHG sensor**: material that glows when specific IR wavelength hits
- **SHG communication**: IR beam carrying visible information
- **SHG biology**: imaging collagen (naturally SHG-active) in tissue

## Cross-Breeds

- + System 36 (Plasmonic): plasmon-enhanced SHG = massive efficiency
- + System 35 (Evanescent): evanescent SHG = surface-only generation
- + System 25 (Holography): SHG hologram = hidden 3D image
- + System 45 (SHG) + System 45 (SHG): cascaded SHG = extreme frequency shift
- + System 28 (Quantum dust): quantum dots with SHG coating

---

*"The light is a secret, and the secret is twice the frequency."*
