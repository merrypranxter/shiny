# System 57: Strange Attractor Sparkle

System 57: Strange Attractor Sparkle
Overview
Chaotic systems with structure. Lorenz, Rössler, Aizawa — classic strange attractors rendered as sparkle
trails. The deterministic chaos creates organic, never-repeating patterns. Each point is a moment in time,
the trail is memory. The attractor is a ghost made of light.
Mathematical Foundation
Lorenz Attractor (1963):
dx/dt = σ(y - x)
dy/dt = x(ρ - z) - y

dz/dt = xy - βz
￿= 10, ￿= 28, ￿= 8/3
Rössler Attractor (1976):
dx/dt = -y - z
dy/dt = x + ay
dz/dt = b + z(x - c)
a = 0.2, b = 0.2, c = 5.7
Aizawa Attractor:
dx/dt = (z - b)x - dy
dy/dt = (z - b)y + dx
dz/dt = c + az - z³/3 - (x² + y²)(1 + ez) + fz x³
Strange Attractor Properties:
• Deterministic: no randomness
• Aperiodic: never repeats
• Bounded: stays in finite region
• Sensitive: tiny changes →huge divergence
• Fractal dimension: non-integer
GLSL Shader
See shader.glsl — precomputed attractor point cloud, trail rendering, parameter animation.
JS Module
See module.js — ODE integration (Runge-Kutta), attractor point generation, trail management, param-
eter morphing.
Showcase Builds
1. Lorenz Butterfly
The iconic butterfly wings as sparkle trails. Two lobes, never the same path twice. The wings flap but
the butterfly is made of light. ￿=10, ￿=28, ￿=8/3.
2. Rössler Ribbon
Single-lobed attractor with a “fold”. The ribbon twists and never closes. Like a Möbius strip in time.
a=0.2, b=0.2, c=5.7.
3. Aizawa Sphere
Spherical strange attractor. Points orbit a center but never settle. The sphere breathes. Parameters
create different “planets”.

4. Parameter Morph
Smoothly change attractor parameters. The shape morphs between different strange attractors. One
ghost becomes another.
5. Attractor Orchestra
Multiple attractors, different scales, different colors. The ensemble performs chaotic music. Each attractor
is an instrument.
Implementation Notes
• Precompute 10,000+ points per attractor
• Use 4th-order Runge-Kutta for integration
• Trail rendering: point sprites with motion blur
• Parameter morphing: interpolate between attractor parameter sets
• Color from velocity magnitude or position