// ✦ Polarization Topography
// System 27
// Extracted from systems/27-polarization-topography.md

// --- Block 1 ---
vec3 polarizationMap(vec2 uv, float polarizerAngle) {
  // Terrain height
  float h = fbm(uv * 3.0);

  // Curvature as stress proxy
  vec2 dh = vec2(dFdx(h), dFdy(h));
  float curvature = length(dh);

  // Thickness varies with height
  float thickness = 1.0 + h * 2.0;

  // Phase delay = stress * thickness
  float phase = curvature * thickness * 10.0;

  // Polarized light through crossed polarizers
  float polAngle = polarizerAngle + phase;
  float transmission = pow(sin(polAngle), 2.0);

  // Birefringence color
  vec3 color = vec3(
    0.5 + 0.5 * cos(phase + 0.0),
    0.5 + 0.5 * cos(phase + 2.1),
    0.5 + 0.5 * cos(phase + 4.2)
  );

  return color * transmission;
}

