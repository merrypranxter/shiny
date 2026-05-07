// ✦ Structural Color From Disorder
// System 23
// Extracted from systems/23-structural-color-from-disorder.md

// --- Block 1 ---
vec3 structuralColor(vec2 uv, float seed) {
  // Blue noise particle positions
  vec2 particles[9]; // 3x3 neighborhood
  // ... populate from blue noise texture ...

  // Local spatial statistics
  float localSpacing = 0.0;
  for(int i = 0; i < 8; i++) {
    localSpacing += length(particles[i] - particles[i+1]);
  }
  localSpacing /= 8.0;

  // Coherent scattering wavelength
  float wavelength = localSpacing * 2.5; // simplified
  vec3 color = wavelengthToRGB(wavelength);

  // Disorder mask
  float disorder = fbm(uv * 50.0 + seed);
  color *= smoothstep(0.3, 0.7, disorder);

  return color;
}

