# System 51: Optimal Bloom

System 51: Optimal Bloom
Overview
Shine that follows minimum-jerk trajectories — 5th-order polynomial birth/death. Not random spray,
but smooth, natural arcs.
Birth = warm orange, cruise = stable blue, death = violet fade.
Elastic
collisions conserve momentum. Bang-bang control = staccato rhythms. Hamiltonian orbits = phase
space made color.
Mathematical Foundation
Minimum-Jerk Trajectory: The smoothest path between two points. Jerk = 3rd derivative of position.
Minimizing ￿jerk² dt gives 5th-order polynomial.
Position as function of time:
x(t) = x₀ + (x₁-x₀)・(10τ³ - 15τ⁴ + 6τ⁵)
where τ = t/T (normalized time).
Bang-Bang Control: All-or-nothing control. Switch between extremes. Optimal for time-minimization.
Creates staccato, rhythmic patterns.
Hamiltonian Mechanics: H = T + V (kinetic + potential). Conservation laws = symmetries. Phase
space trajectory = orbit.
Elastic Collisions: Momentum conserved. m₁v₁ + m₂v₂ = m₁v₁' + m₂v₂'.
GLSL Shader
See shader.glsl — minimum-jerk sparkle trajectories, elastic collision response, Hamiltonian orbit color-
ing.

JS Module
See module.js — 5th-order polynomial evaluation, collision detection, bang-bang timing, phase space
tracking.
Showcase Builds
1. Minimum-Jerk Fireworks
Sparks follow natural arcs, ballet not explosion. Each sparkle born with minimum-jerk trajectory. The
motion looks “alive” because it follows biological movement principles.
2. Geodesic Constellation
Stars connected by shortest paths through curved space. The connections are geodesics — straight lines
in curved geometry. The constellation is a map of spatial structure.
3. Elastic Garden
Colliding sparkles with fission/fusion. Population dynamics. Sparkles split when too energetic, merge
when close and slow. Ecosystem of light particles.
4. Bang-Bang Bloom
All-or-nothing flashes. Optimal timing encodes information. The pattern of on/off IS the message. Morse
code made optical, but with math-optimal timing.
5. Hamiltonian Orbit
Color = momentum, brightness = speed. Phase space visible. The orbit traces a contour of constant
energy. The sparkle is a particle in a potential well.
Implementation Notes
• Minimum-jerk: precompute 5th-order coeﬀicients
• Collision: grid-based spatial hashing for O(1) neighbor lookup
• Bang-bang: switch times computed from boundary conditions
• Hamiltonian: symplectic integrator (Verlet/Leapfrog) for energy conservation