# ✦ System 38: METASURFACES

## Core Idea

Engineered surfaces with features smaller than light wavelength that can bend, split, or twist light in impossible ways. **Flat lenses, holograms without holograms, polarization vortices**. The surface looks flat but the light behaves like it went through a prism maze.

## Physics

Metasurfaces use subwavelength resonators (nanorods, nanodisks, split-ring resonators) to control phase, amplitude, and polarization of light with subwavelength resolution. **The surface is a flat optical computer**.

## Concept

**A flat surface that performs complex optical operations.**

- Metalens: flat lens that focuses without curvature
- Hologram: phase pattern that reconstructs 3D image
- Polarization converter: linear → circular → vortex
- Color router: different wavelengths steered to different angles
- Analog optical computer: mathematical operations on light fields

The surface is **invisible but transforms light completely**.

## Math Systems

| Component | Math | Purpose |
|-----------|------|---------|
| Resonator array | Periodic / aperiodic lattice | phase/amplitude control |
| Phase profile | Holographic / lens equation | wavefront shaping |
| Polarization | Jones calculus | polarization control |
| Optimization | Inverse design | target functionality |

## Code Hook (GLSL)

```glsl
vec3 metasurfaceOptics(vec2 uv, vec3 viewDir, float time) {
  // Nanoresonator phase profile
  float phase = 0.0;

  // Metalens: quadratic phase
  float r2 = dot(uv - 0.5, uv - 0.5);
  phase += r2 * 10.0;

  // Hologram: interference pattern
  phase += sin(uv.x * 20.0 + time) * cos(uv.y * 20.0);

  // Polarization vortex: azimuthal phase
  float angle = atan(uv.y - 0.5, uv.x - 0.5);
  phase += angle * 3.0; // topological charge 3

  // Apply phase to light
  vec3 light = vec3(1.0); // incident white light

  // Phase-modulated output
  vec3 outputR = light * cos(phase + 0.0);
  vec3 outputG = light * cos(phase + 2.1);
  vec3 outputB = light * cos(phase + 4.2);

  return vec3(outputR.x, outputG.y, outputB.z) * 0.5 + 0.5;
}
```

## Variants

- **Metasurface contact lens**: flat lens on eye, augmented reality
- **Metasurface wallpaper**: room where walls perform optical operations
- **Metasurface camouflage**: flat surface that looks like 3D object
- **Metasurface solar cell**: captures all wavelengths, no reflection
- **Metasurface quantum**: entangled photon generation on flat chip

## Cross-Breeds

- + System 25 (Holography): metasurface hologram = flat 3D display
- + System 36 (Plasmonic): plasmonic resonators as metasurface elements
- + System 32 (Magneto-optical): magnetic metasurface = switchable optics
- + System 38 (Metasurface) + System 38 (Metasurface): cascaded metasurfaces = optical computer
- + System 22 (Moiré): metasurface moiré = impossible interference

---

*"The surface is flat, but the light thinks it's a maze."*
