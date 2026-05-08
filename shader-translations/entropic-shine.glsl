// ✦ Entropic Shine
// System 30
// Extracted from systems/30-entropic-shine.md

// --- Block 1 ---
float entropicShine(vec2 uv, float t) {
  // Eroded height field
  float h = fbm(uv * 4.0);
  h = hydraulicErosion(h, 50); // 50 erosion steps

  // Remaining peaks = specular
  float peaks = smoothstep(0.6, 1.0, h);

  // Valleys = matte host
  float valleys = smoothstep(0.0, 0.3, h);

  // Slopes = transitional sheen
  float slope = length(vec2(dFdx(h), dFdy(h)));
  float sheen = smoothstep(0.1, 0.5, slope);

  // Combine
  vec3 peakColor = vec3(1.0, 0.95, 0.9) * peaks; // warm specular
  vec3 valleyColor = vec3(0.2, 0.15, 0.1) * valleys; // dark matte
  vec3 sheenColor = vec3(0.6, 0.5, 0.4) * sheen; // transitional

  return peakColor + valleyColor + sheenColor;
}

