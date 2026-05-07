# System 53: Minimal Sparkle

System 53: Minimal Sparkle
Overview
Single hash function = infinite sparkle. fract(sin(x*12.9898+y*78.233)*43758.5453) — 80 characters,
infinite output. fBm for natural variation. Domain warp for organic patterns. Three hashes = RGB. The
code is tiny, the output is a universe.
Mathematical Foundation
The Hash: fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453)
Properties:
• Deterministic: same input →same output
• Pseudo-random: output appears uniform in [0,1]
• Cheap: one sin, one dot, one fract
fBm (fractional Brownian motion): Sum of noise octaves with decreasing amplitude and increasing
frequency.
fBm(x) = Σ 2^(-i・H) ・noise(2^i ・x)
H = Hurst exponent (0 < H < 1). H = 0.5 = classic Brownian motion.
Domain Warping: Distort coordinates before sampling noise.
warp(x) = x + fBm(x)
color = fBm(warp(x))
Creates flowing, organic patterns from rigid noise.
GLSL Shader
See shader.glsl — single-line hash, fBm layering, domain warp, temporal crystal.
JS Module
See module.js — hash parameter exploration, fBm configuration, domain warp animation.

Showcase Builds
1. One Line Universe
Entire visual system in single GLSL line.
The hash IS the universe.
Every pixel determined by 80
characters. Emergent patterns from minimal rules.
2. Hash DNA
Different magic numbers = different species.
Crossbreeding and mutation of hash parameters.
The
parameter space IS the genome. Evolution of visual forms.
3. Fractal Dust
fBm from hash creates terrain, clouds, infinite landscape. Each octave adds detail. The dust settles into
mountains and valleys. Procedural world from one function.
4. Domain Warp Nebula
Recursive coordinate distortion creates flowing, living patterns. The warp field itself is warped. Self-
referential beauty. The nebula breathes.
5. Temporal Crystal
Time-quantized hash creates stroboscopic beats, waves of sync. Discrete time steps create standing wave
patterns. The crystal has temporal structure, not just spatial.
Implementation Notes
• Hash magic numbers: 12.9898, 78.233, 43758.5453 (classic values from IQ)
• fBm: 4-8 octaves typical, lacunarity = 2.0, gain = 0.5
• Domain warp: 1-2 levels of recursion for organic look
• Temporal: quantize time with floor(time * fps) / fps for stroboscopic effect