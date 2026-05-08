# System 49: Escher Chrome

System 49: Escher Chrome
Overview
Chrome reflection through conformal maps — Möbius, inversion, Schwarz-Christoffel. Circles stay circles,
angles preserved, but space bends. Straight lines become arcs. Parallel lines meet. The mirror shows a
world with different geometry.
Mathematical Foundation
Conformal Maps: Complex functions that preserve angles locally. f(z) where f'(z) ≠0.
Key Maps:
• Möbius: f(z) = (az+b)/(cz+d), maps circles→circles, lines→circles
• Inversion: f(z) = R²/z̄ , turns world inside-out through sphere
• Schwarz-Christoffel: Maps upper half-plane to polygon interiors
• Hyperbolic: f(z) = (z-a)/(1-āz), Poincaré disk model
Invariant: Cross-ratio (z₁,z₂;z₃,z₄) = (z₁-z₃)(z₂-z₄)/((z₁-z₄)(z₂-z₃)) preserved under Möbius.
GLSL Shader
See shader.glsl — conformal map distortion of environment reflection, circle preservation, hyperbolic
tiling.
JS Module
See module.js — Möbius transform composition, inversion center animation, Schwarz-Christoffel param-
eter computation.

Showcase Builds
1. Circle Limit Chrome
Infinite hyperbolic tiling in a circle (Escher’s Circle Limit IV). Chrome polygons reflect distorted world.
The circle boundary is infinity — objects shrink exponentially as they approach it.
2. Möbius Mirror
Mirror that inverts/rotates based on viewer distance. Funhouse mirror with real math. The distortion is
a Möbius transform parameterized by viewer position.
3. Inversion Jewelry
Pendant that reflects the world inside-out through sphere inversion. The “stone” is a window into inverted
space. Your face appears upside-down and reversed.
4. Schwarz-Christoffel Architecture
Building facade “unfolded” from star polygon via conformal map. The straight walls of the building are
images of circular arcs in the mapped space.
5. Hyperbolic Caustics
Light through hyperbolic lens.
Caustics are circular arcs not parabolas.
The focusing properties of
hyperbolic geometry made visible.
Implementation Notes
• Use complex arithmetic in GLSL (vec2 as complex number)
• Möbius transforms: normalize so ad-bc = 1
• Inversion: handle z=0 singularity (map to infinity)
• Hyperbolic distance: arctanh(|(z-a)/(1-āz)|)