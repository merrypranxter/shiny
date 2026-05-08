// ✦ Caustic Chromatics
// System 24
// Extracted from systems/24-caustic-chromatics.md

// --- Block 1 ---
vec3 chromaticCaustic(vec2 uv, vec3 normal, float t) {
  vec3 caustic = vec3(0.0);
  float iorR = 1.33, iorG = 1.34, iorB = 1.35; // water dispersion

  // Red caustic
  vec3 refractR = refract(vec3(0,0,-1), normal, 1.0/iorR);
  float cR = causticIntensity(uv, refractR.xy, t);

  // Green caustic  
  vec3 refractG = refract(vec3(0,0,-1), normal, 1.0/iorG);
  float cG = causticIntensity(uv, refractG.xy, t);

  // Blue caustic
  vec3 refractB = refract(vec3(0,0,-1), normal, 1.0/iorB);
  float cB = causticIntensity(uv, refractB.xy, t);

  caustic = vec3(cR, cG, cB) * 2.0;
  return pow(caustic, vec3(0.7)); // gamma for bloom
}

