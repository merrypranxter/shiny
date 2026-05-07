# System 59: Topology Chrome

System 59: Topology Chrome
Overview
Chrome that knows its shape.
Euler characteristic, genus, homology — topological invariants made
visible. A torus reflects differently than a sphere. A Klein bottle has no inside or outside. The chrome
IS the topology. You see the shape of space itself.
Mathematical Foundation
Euler Characteristic: χ = V - E + F (vertices - edges + faces)
• Sphere: ￿= 2
• Torus: ￿= 0
• Klein bottle: ￿= 0 (but non-orientable)
Genus: Number of “holes”. g = (2 - ￿)/2 for orientable surfaces.
Fundamental Group: ￿￿(M) — loops that can’t be contracted. Torus has two independent loops.
Homology: H￿= connected components, H￿= 1D holes, H￿= 2D voids.
GLSL Shader
See shader.glsl — ray marching on implicit surfaces, topological coloring, fundamental group visualiza-
tion.

JS Module
See module.js — implicit surface evaluation, topology computation, genus detection, shape morphing.
Showcase Builds
1. Sphere Mirror
￿= 2, g = 0. All loops contract. The chrome is simply connected. Reflection is “normal” — what you’d
expect from a perfect sphere.
2. Torus Jewelry
￿= 0, g = 1. Two independent loop directions. The chrome has a grain — reflection depends on which
loop you’re on. The ring is a map of the torus.
3. Klein Bottle
￿= 0, non-orientable. No inside/outside. The chrome is one-sided. You can trace a path that returns
mirrored. The surface drinks its own reflection.
4. Genus Garden
Multiple holes, multiple handles. ￿= 2 - 2g. Each handle = a different reflection channel. The chrome is
a switchboard of spaces.
5. Shape Morph
Continuous deformation between topologies. Sphere →torus (add handle) →sphere (remove different
handle). The chrome passes through singularities. Topology change = catastrophe.
Implementation Notes
• Use implicit surfaces: f(x,y,z) = 0
• Torus: (√(x²+y²) - R)² + z² = r²
• Klein bottle: parametric or 4D immersion
• Ray marching with SDFs (signed distance functions)
• Topological coloring: different color per homology class