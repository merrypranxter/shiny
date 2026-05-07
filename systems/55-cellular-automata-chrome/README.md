# System 55: Cellular Automata Chrome

System 55: Cellular Automata Chrome
Overview
Chrome that evolves. Each pixel is a cell in a continuous-state automaton. Conway’s Game of Life but for
light — birth, survival, death rules applied to brightness values. The chrome surface is alive, breathing,
dying, being reborn. Emergent patterns = emergent beauty.
Mathematical Foundation
Continuous Cellular Automata: Cell state ￿[0,1] (brightness), not binary.
Update Rule: state' = f(state, neighbor_average)
Lenia (Chan, 2019): Generalized continuous CA with bell-shaped growth function.
g(U) = 2・exp(-(U-μ)²/(2σ²)) - 1
state' = clamp(state + dt ・g(U), 0, 1)
SmoothLife:
Continuous space + continuous time CA. Patterns include gliders, oscillators, self-
replicators.
GLSL Shader
See shader.glsl — ping-pong framebuffer CA update, bell-shaped growth, chrome reflection on living
surface.
JS Module
See module.js — CA parameter space exploration, rule breeding, pattern seeding, chrome state manage-
ment.
Showcase Builds
1. Living Chrome
Standard Lenia on chrome surface. The reflection evolves. You see yourself in a mirror that is alive,
changing, forgetting and remembering.
2. Glider Constellation
Seed glider patterns. Each glider is a moving sparkle. Collisions create new patterns. The chrome sky is
full of migrating light creatures.

3. Mitosis Bloom
Self-replicator rules. Sparkles split when they reach critical mass. Population explosion = bloom event.
Then death from overcrowding. Cycle repeats.
4. Rule Breeding
Two CA rules breed offspring. Visual characteristics mix. The chrome inherits traits from both parents.
Evolution of shine.
5. Frozen Fire
Cooling CA — high temperature = chaos, low = crystalline order. The chrome passes through phase
transitions. Fire that freezes into snowflakes.
Implementation Notes
• Use ping-pong framebuffers for CA state
• Gaussian kernel for neighbor averaging
• Bell-shaped growth function for smooth dynamics
• Chrome reflection applied to CA state as height map