// ✦ Quantum Dust
// System 28
// Extracted from systems/28-quantum-dust.md

// --- Block 1 ---
vec3 quantumDust(vec2 uv, float t) {
  // Multiple scales of dots
  vec3 color = vec3(0.0);
  float totalWeight = 0.0;

  for(float scale = 1.0; scale < 50.0; scale *= 2.0) {
    vec2 id = floor(uv * scale);
    float n = hash(id + t * 0.01);

    // Size varies with position
    float size = 2.0 + fbm(uv * 2.0) * 8.0 + n * 2.0;

    // Quantum confinement: smaller = bluer
    vec3 dotColor = 0.5 + 0.5 * cos(10.0/size + vec3(0.0, 2.1, 4.2));

    float weight = 1.0 / scale;
    color += dotColor * weight;
    totalWeight += weight;
  }

  return color / totalWeight;
}

