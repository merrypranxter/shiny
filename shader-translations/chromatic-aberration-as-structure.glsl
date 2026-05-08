// ✦ Chromatic Aberration As Structure
// System 21
// Extracted from systems/21-chromatic-aberration-as-structure.md

// --- Block 1 ---
vec3 chromaticObject(vec3 p, float t) {
  float r = sdfShell(p + noise(p*2.0 + t*0.1) * 0.1);
  float g = sdfShell(p * 0.8 + noise(p*3.0 - t*0.15) * 0.08);
  float b = sdfShell(p * 0.5 + curlNoise(p*4.0 + t*0.2) * 0.05);

  float redDist = abs(r) - 0.02;
  float greenDist = abs(g) - 0.015; 
  float blueDist = abs(b) - 0.01;

  vec3 color = vec3(0.0);
  color.r = smoothstep(0.05, 0.0, redDist) * 1.0;
  color.g = smoothstep(0.05, 0.0, greenDist) * 0.9;
  color.b = smoothstep(0.05, 0.0, blueDist) * 0.8;

  return color;
}

