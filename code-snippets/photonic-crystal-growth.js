// ✦ Photonic Crystal Growth
// System 26
// Extracted from systems/26-photonic-crystal-growth.md

// --- Block 1 ---
function growPhotonicCrystal(seed, lightSource, iterations) {
  let crystal = [seed];
  for (let i = 0; i < iterations; i++) {
    // Find growth front
    let front = getSurfaceParticles(crystal);

    // Compute local light field
    for (let p of front) {
      let intensity = traceLight(p, lightSource, crystal);
      let wavelength = dominantWavelength(intensity);

      // Grow if intensity > threshold
      if (intensity > threshold) {
        let newPos = p + growthDirection(p, wavelength);
        crystal.push({ pos: newPos, orientation: lightPolarization(p) });
      }
    }
  }
  return crystal;
}

