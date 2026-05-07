// ✦ Interference Holography
// System 25
// Extracted from systems/25-interference-holography.md

// --- Block 1 ---
float hologramInterference(vec2 uv, float z, float t) {
  // Reference plane wave
  float phaseR = z * 10.0;

  // Object: scattered from multiple depth layers
  float phaseO = 0.0;
  for(int i = 0; i < 5; i++) {
    float zi = float(i) * 0.2;
    float sdf = objectSDF(uv, zi, t);
    phaseO += exp(-sdf * 3.0) * sin(zi * 20.0 + t);
  }

  // Interference
  float I = 1.0 + cos(phaseR - phaseO);
  return pow(I * 0.5, 3.0); // sharpen
}

