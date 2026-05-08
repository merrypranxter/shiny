// ✦ Sonic Shine
// System 29
// Extracted from systems/29-sonic-shine.md

// --- Block 1 ---
vec3 sonicShine(vec2 uv, float t, float freq1, float freq2) {
  // Standing wave field
  float pressure = sin(uv.x * freq1 + t) * sin(uv.y * freq2);

  // Refractive index variation
  float n = 1.0 + pressure * 0.1;

  // Light ray bending
  vec2 bend = vec2(dFdx(n), dFdy(n)) * 2.0;

  // Chromatic separation (different bend per wavelength)
  float bendR = length(bend) * 1.0;
  float bendG = length(bend) * 0.95;
  float bendB = length(bend) * 0.9;

  // Sample displaced coordinates
  vec3 color;
  color.r = texture2D(source, uv + bend * bendR).r;
  color.g = texture2D(source, uv + bend * bendG).g;
  color.b = texture2D(source, uv + bend * bendB).b;

  return color * (1.0 + pressure * 0.5);
}

