// ✦ Moire As Optical Architecture
// System 22
// Extracted from systems/22-moire-as-optical-architecture.md

// --- Block 1 ---
float moireGrating(vec2 uv, float angle, float freq, float thickness) {
  vec2 rot = rotate(uv, angle);
  float wave = sin(rot.x * freq * 3.14159);
  return smoothstep(-thickness, thickness, wave);
}

float moireArchitecture(vec2 uv, float t) {
  float g1 = moireGrating(uv, 0.0, 40.0, 0.3);
  float g2 = moireGrating(uv, 0.05 + sin(t*0.1)*0.02, 40.0, 0.3);
  float g3 = moireGrating(uv, length(uv)*10.0, 30.0, 0.2); // radial

  float interference = abs(g1 - g2) * g3;
  return pow(interference, 2.0); // sharpen bands
}

