# System 58: Quantum Interference Glitter

System 58: Quantum Interference Glitter
Overview
Wave functions made visible. Double-slit, quantum harmonic oscillator, particle in a box — the probabil-
ity amplitudes become brightness. Where waves constructively interfere = bright sparkles. Destructive
interference = darkness. The quantum world, but you can see it.
Mathematical Foundation
Schrödinger Equation: iℏ∂ψ/∂t = Ĥψ
Wave Function: ψ(x,t) = |ψ|・e^(iφ). Probability density = |ψ|².
Double-Slit: Two point sources, interference pattern:
ψ = ψ₁ + ψ₂ = A・e^(ikr₁)/r₁ + A・e^(ikr₂)/r₂
|ψ|² = A²(1/r₁² + 1/r₂² + 2・cos(k(r₁-r₂))/(r₁・r₂))
Quantum Harmonic Oscillator: Energy levels E_n = ℏω(n + ½). Wave functions: Hermite polynomials
× Gaussian.
GLSL Shader
See shader.glsl — wave function evaluation, interference patterns, probability density visualization.
JS Module
See module.js — wave packet initialization, time evolution, measurement simulation, eigenstate decom-
position.
Showcase Builds
1. Double-Slit Sparkle
Classic interference. Two sources, bright and dark bands. Each band is a line of sparkles. The pattern
shifts as you “observe” — wavefunction collapse made visual.
2. Harmonic Oscillator
Quantum energy levels as horizontal sparkle bands. n=0 = single central band. n=1 = two bands. n=2
= three bands. The quantization IS the banding.
3. Particle in a Box
Infinite square well. Standing wave patterns. Each mode is a different sparkle pattern. The box bound-
aries = nodes (darkness). The center = antinodes (brightness).
4. Wave Packet
Gaussian wave packet spreading and interfering with itself. The packet is a cloud of sparkles that disperses
over time. Uncertainty principle made visible.

5. Measurement Flash
Simulate quantum measurement. The wavefunction collapses to an eigenstate — flash of light at measured
position. Then re-spreads. Observation = destruction and rebirth.
Implementation Notes
• Use complex numbers in GLSL (vec2 as real/imaginary)
• Time evolution: multiply by phase factor e^(-iEt/￿)
• Interference: sum amplitudes, square magnitude
• Measurement: project onto position eigenstate, then re-initialize