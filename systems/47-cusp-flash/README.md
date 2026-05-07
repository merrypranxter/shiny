# System 47: Cusp Flash

System 47: Cusp Flash
Overview
Shine that doesn’t fade — it explodes at critical points. Pressure builds: nothing, nothing, BAM —
full chrome burst. The cusp catastrophe = binary, dramatic, irreversible. Hysteresis means the surface
remembers.
Mathematical Foundation
Cusp Catastrophe Theory (Thom, 1972): The cusp is the simplest catastrophe with two control
parameters (normal factor a, splitting factor b) and one state variable x.
The potential function:
V(x) = x⁴/4 + a・x²/2 + b・x
Critical points where dV/dx = 0:
x³ + a・x + b = 0
The cusp bifurcation set (where the number of equilibria changes):
4a³ + 27b² = 0
Hysteresis: The surface remembers its history. Going up the control path vs down gives different state
transitions. The system has memory.
Key Parameters:
• control_a (-2 to 2): normal factor — moves between single equilibrium and bistable region
• control_b (-1 to 1): splitting factor — asymmetry, triggers the jump
• hysteresis_state: 0 or 1, the memory of which branch we’re on
• flash_threshold: critical point where catastrophe occurs

GLSL Shader
See shader.glsl — implements cusp catastrophe with hysteresis memory, chrome burst, and prismatic
flash.
JS Module
See module.js — touch/pressure input mapping, hysteresis state machine, critical point detection.
Showcase Builds
1. Spark Plug Skin
Touch pressure builds control_b. At critical threshold: prismatic flash across surface. Release: stays on
chrome branch (hysteresis) until pressure drops below lower threshold. Binary, irreversible.
2. Dam Break
Containment cells as cusp systems. Individual cells breach catastrophically when local pressure exceeds
threshold. Chain reaction as breached cells increase pressure on neighbors. Domino collapse.
3. Hysteresis Tattoo
Touch history recorded as binary chrome/matte states. Each touch point is a cusp system. The pattern
of chrome vs matte IS the touch history. Memory made visible.
4. Cusp Choir
Array of cusp systems with slightly different thresholds. Flash events create rhythmic patterns — some
trigger early, some late. The ensemble performs catastrophe music.
5. The Sneeze
Buildup-then-release cycle. control_a slowly increases (pressure builds). At critical point: explosive flash
(the sneeze). Then reset. Biological urgency made optical.
Implementation Notes
• Hysteresis requires storing previous state — use a texture or uniform
• Critical flash should be instantaneous (1-2 frames) for impact
• Chrome branch should have different reflectivity than matte branch
• Prismatic flash = full spectrum sweep during transition