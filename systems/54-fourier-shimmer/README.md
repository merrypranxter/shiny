# System 54: Fourier Shimmer

System 54: Fourier Shimmer
Overview
Every sparkle is a frequency bin. The FFT of the visual field IS the image. Time-domain sparkles =
inverse-transformed spectrum. You see the music, literally — each frequency component is a point of
light with amplitude = brightness, phase = hue.
Mathematical Foundation
Discrete Fourier Transform: X[k] = Σ x[n]・e^(-2πikn/N)
Inverse DFT: x[n] = (1/N) Σ X[k]・e^(2πikn/N)
Key Insight: The sparkle field IS the time-domain signal. The spectrum (frequency bins) controls the
pattern. Low frequencies = large-scale structure. High frequencies = fine detail/sparkle.
Phase Information: arg(X[k]) determines spatial position of frequency component. Phase coherence
= structured pattern. Random phase = noise.
GLSL Shader
See shader.glsl — real-time FFT approximation, frequency-bin sparkle placement, phase-color mapping.
JS Module
See module.js — Web Audio API integration, FFT computation, frequency bin →sparkle mapping, beat
detection.
Showcase Builds
1. Audio Prism
Real-time audio FFT drives sparkle field. Bass = large warm sparkles. Treble = small cool sparkles. The
music IS the visual. Every note = a birth event.
2. Harmonic Lattice
Frequencies arranged as harmonic series lattice. Integer ratios = consonance = connected sparkles. Dis-
sonance = chaotic, unconnected. Musical theory made spatial.
3. Phase Sculpture
Interactive phase manipulation. Drag to rotate phase of frequency bins. The image morphs as phase
shifts. You sculpt with phase, not geometry.

4. Spectral Freeze
Capture FFT snapshot, hold it. The frozen spectrum becomes a static sparkle constellation. Release =
morph back to live audio. Memory of a sound.
5. Convolution Bloom
Sparkle field convolved with impulse response. The reverb of a space applied to light. Cathedral = long
trailing sparkles. Bathroom = short, bright bursts.
Implementation Notes
• Use Web Audio API AnalyserNode for real-time FFT
• Approximate inverse-DFT in shader with sum of sinusoids
• Phase coherence crucial for structured patterns
• Beat detection: sudden energy increase in low-frequency bins