# System 52: Gravity Chrome

System 52: Gravity Chrome
Overview
Chrome reflection through curved space — geodesics follow surface geometry. Positive curvature = con-
verging geodesics (warm, focal points). Negative curvature = diverging geodesics (cool, chaotic scattering).
The distortion IS the mass distribution. Like general relativity made material.
Mathematical Foundation
Geodesic Equation: d²x^μ/dτ² + Γ^μ_νρ dx^ν/dτ dx^ρ/dτ = 0
Christoffel Symbols: Γ^μ_νρ = ½g^μσ(∂_ν g_ρσ + ∂_ρ g_νσ - ∂_σ g_νρ)
Curvature:
• Positive (K > 0): sphere, converging geodesics, focal points
• Zero (K = 0): flat, straight lines
• Negative (K < 0): saddle/hyperbolic, diverging geodesics
Metric Examples:
• Sphere: ds² = R²(dθ² + sin²θ dφ²)
• Poincaré disk: ds² = 4R²(dx²+dy²)/(1-x²-y²)²
• Schwarzschild: ds² = -(1-2M/r)dt² + (1-2M/r)⁻¹dr² + r²dΩ²
GLSL Shader
See shader.glsl — geodesic ray tracing on curved surfaces, metric-based distortion, curvature coloring.
JS Module
See module.js — metric tensor computation, geodesic integration (Runge-Kutta), mass distribution edit-
ing.

Showcase Builds
1. Black Hole Mirror
Light spirals into center, redshifts, infinite reflection ring at photon sphere (r = 3M). The mirror IS the
event horizon. Looking at it = looking at infinity.
2. Saddle Lens
Negative curvature tears environment apart. Exponential divergence of geodesics. The lens shows a world
where parallel lines don’t exist — everything diverges.
3. Gravity Well Jewelry
Wearable curved space. The “stone” is a window into different geometry. Mass distribution = gemstone
cut. The wearer carries a pocket universe.
4. Geodesic Dome
Great circle chrome seams, spherical geometry made physical. Each seam is a geodesic. The dome is a
map of shortest paths on a sphere.
5. Wormhole Portal
Two mouths connected by throat. See other environment through curved tunnel. The connection is an
Einstein-Rosen bridge. Topology made visible.
Implementation Notes
• Geodesic integration: 4th-order Runge-Kutta
• Metric tensor: precompute for common spaces
• Redshift: z = (λ_obs - λ_emit)/λ_emit = 1/√(1-2M/r) - 1
• Photon sphere: unstable circular orbit at r = 3M