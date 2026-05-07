# Good Math / Systems for Shine Design

If you want the shine to feel truly designed and not generic, these are the systems that are especially good.

---

## For Veins / Channels / Branching Shine

Shine that flows through paths like a biological or hydrological system:

- **L-systems** — recursive grammar-based branching; great for capillaries and root networks
- **Slime mold network logic** — nutrient-seeking path networks; produces organic-looking infrastructure
- **DLA (Diffusion-Limited Aggregation)** — random-walk deposition; produces dendritic crystal/lightning shapes
- **Reaction-diffusion skeleton extraction** — extracts the skeleton of organic patterns
- **Gradient-flow tracing** — follow the gradient of a scalar field downhill; produces river/watershed channels
- **Shortest-path / medial-axis networks** — connects points through minimum-cost paths; organic but structured

---

## For Woven Light / Pattern Light

Shine that forms structured geometric patterns:

- **Tessellations** — regular tilings; give shine a repeating pattern logic
- **Penrose tilings** — quasicrystalline aperiodic tilings; produces rich non-repeating shine structure
- **Voronoi / Delaunay** — cell and edge decomposition; great for organic glitter networks
- **Islamic geometry** — high-symmetry star patterns; makes shine feel ancient and mathematical
- **Braid / weave over-under rules** — crossing logic for ribbons and threads
- **Graph-based edge lighting** — nearest-neighbor or Delaunay graph; vertices as jewels, edges as conduits

---

## For Cracks / Seams / Repair Shine

Shine that lives in damage topology:

- **Voronoi fracture** — random Voronoi cell separation; produces believable crack patterns
- **Recursive subdivision** — repeatedly splitting regions; creates fractal-like fragmentation
- **Crack propagation fields** — physics-like crack branching based on stress direction
- **Stress maps** — distance/angle fields that determine where and how cracks form
- **Contour ridges** — sharp value changes in a scalar field; look like fracture lines

---

## For Clustered Glitter / Mirror-Dust Shine

Shine that comes in populations, not uniform coverage:

- **fBm masks** — fractal Brownian motion as a density map; defines where sparkle clusters
- **Multifractals** — scale-dependent noise; produces rich texture hierarchy
- **Blue-noise sampling** — well-distributed but irregular point placement; avoids clumping artifacts
- **Clustered Poisson-ish fields** — biologically-plausible population distributions
- **Scale-nested density fields** — multiple scales of noise combined; gives "neighborhoods" of sparkle

---

## For Embedded Optical Color

Shine that depends on physics-like color behavior:

- **Thin-film interference approximation** — produces oil-slick rainbow colors from layer thickness
- **Structural color / Voronoi cell pockets** — iridescent colors from geometric interference
- **Fresnel fields** — edge brightening; objects brighten at glancing angles
- **Birefringence / stress-band mapping** — double-refraction rainbow halos in stressed transparent materials
- **Chromatic edge offsets** — color aberration at contrast edges; adds prismatic fringing

---

## Quick Implementation Patterns

### Scalar Field → Shine

```
heightAt(x, y, time)           → raw field value
contourAmount(value, bands)    → 0-1 contour strength
metallicPalette(value, hueShift) → metallic color
```

### Edge Detection → Shine

```
dzdx = heightAt(x+4,y,t) - heightAt(x-4,y,t)
dzdy = heightAt(x,y+4,t) - heightAt(x,y-4,t)
edgeStrength = |dzdx| + |dzdy|
```

High edge strength → white glint or bright seam.

### Branching Walker → Shine

```
walker = { x, y, angle, life, thickness, depth }
each step:
  nx = x + cos(angle) * speed
  ny = y + sin(angle) * speed
  draw segment(x,y → nx,ny)
  angle += noise * turnStrength
  if random() < branchProb && depth < maxDepth:
    spawn child walker
```

### Density Field → Glitter

```
cluster = pseudoFbm(x * 0.01, y * 0.01)
local   = hash2(x, y)
if cluster > threshold && local > sparkleThreshold:
  draw sparkle
if local > rareThreshold:
  draw starburst
```

---

## The "Shine Has a Job" Test

For each shiny element in your design, ask:

| Question | If yes... |
|----------|-----------|
| Is it a vein? | It's carrying something |
| Is it a seam? | It's a boundary or repair |
| Is it a crack? | It's damage made beautiful |
| Is it a cluster? | It's an ecology with density logic |
| Is it a contour? | It's reading the field's topology |
| Is it an edge? | It's negotiating between zones |
| Is it infrastructure? | It's connecting or transmitting |
| Is it embroidery? | It was attached by labor |

If the shine fails this test — if it's just "glitter everywhere" — add structure to it.
