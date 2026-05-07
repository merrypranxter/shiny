# ✦ SHINY — Generative Art Doctrine & System Library

A complete library of shiny generative art systems, showcase builds, utilities, and doctrine for building luminous, structured, optically alive creative code.

---

## Core Doctrine

> Shiny design is not about covering a thing in gloss. It is about deciding where brilliance lives.

**SHINE IS A STRUCTURE**, not a highlight pasted on top. Brilliance may live in:

- veins and capillaries
- seams and sutures
- cracks and fractures
- tessellated edges
- woven light-paths
- buried channels
- reflective dust ecologies
- pressure bands
- contour ridges
- kintsugi repairs
- prismatic boundaries
- luminous structural filaments

The best shiny design contrasts a **quiet host material** against a **highly active optical subsystem**.

The real goal is contrast: dull versus radiant, buried versus exposed, flat versus electric, dead matter versus signal leaking through.

---

## Repo Structure

```
/
├── README.md              ← you are here
├── index.html             ← gallery of all demos
├── shared/
│   ├── utils.js           ← hash, fBm, metallic palette, field helpers
│   └── draw-helpers.js    ← reusable drawing primitives
├── systems/               ← 20 core shine systems
│   ├── 01-matte-veins/
│   ├── 02-tessellation-woven-light/
│   ├── 03-kintsugi-cracks/
│   ├── 04-buried-shine/
│   ├── 05-glitter-ecology/
│   ├── 06-metallic-gradient-maps/
│   ├── 07-shine-as-weather/
│   ├── 08-infrastructure-brilliance/
│   ├── 09-shine-embroidery/
│   ├── 10-wet-dry-shine/
│   ├── 11-shine-anatomy/
│   ├── 12-shine-repair/
│   ├── 13-shine-woven-structure/
│   ├── 14-shine-residue/
│   ├── 15-shine-language/
│   ├── 16-shine-object-logic/
│   ├── 17-shine-costume/
│   ├── 18-shine-topography/
│   ├── 19-shine-caustic/
│   └── 20-shine-gradient-sculpture/
├── showcases/             ← 45 specific buildable concepts
│   ├── 01-glitter-circulatory-system/
│   ├── 02-opal-nervous-system/
│   ├── 03-rhinestone-lymph-nodes/
│   ├── 04-metallic-vein-stone/
│   ├── 05-sequined-skeleton/
│   ├── 06-holographic-kintsugi-storm/
│   ├── 07-glitter-scar-tissue/
│   ├── 08-chrome-infection-map/
│   ├── 09-polarized-stress-fractures/
│   ├── 10-glitter-erosion-canyon/
│   ├── 11-penrose-light-loom/
│   ├── 12-hologram-basketweave/
│   ├── 13-fiber-optic-quilt/
│   ├── 14-opal-fishnet/
│   ├── 15-chrome-pollen/
│   ├── 16-glitter-mold-bloom/
│   ├── 17-foil-rust/
│   ├── 18-sequin-mildew/
│   ├── 19-glitter-sigil-mesh/
│   ├── 20-chromatic-suture-script/
│   ├── 21-mirror-alphabet-fossils/
│   ├── 22-glitter-bureaucracy/
│   ├── 23-gumball-armor/
│   ├── 24-rhinestone-wormhole/
│   ├── 25-chrome-coral/
│   ├── 26-holographic-organ-cabinet/
│   ├── 27-spectral-prism-reliquary/
│   ├── 28-chrome-topography/
│   ├── 29-opal-isobar-map/
│   ├── 30-metallic-vein-terrain/
│   ├── 31-caustic-quilt/
│   ├── 32-refractive-lens-array/
│   ├── 33-spectral-caustic-web/
│   ├── 34-anodized-infection-map/
│   ├── 35-glitter-weather-radar/
│   ├── 36-sparkle-storm-map/
│   ├── 37-glitter-plumbing/
│   ├── 38-fiber-optic-city-grid/
│   ├── 39-rhinestone-nervous-system/
│   ├── 40-opal-road-network/
│   ├── 41-city-grid-light-seams/
│   ├── 42-vein-delta-light-estuary/
│   ├── 43-power-lines-under-skin/
│   ├── 44-chrome-root-lattice/
│   └── 45-holographic-scaffolding/
├── shaders/
│   └── singularity.glsl   ← GLSL master template
└── doctrine/
    ├── design-directions.md
    ├── effect-vocab.md
    ├── math-systems.md
    └── design-formulas.md
```

---

## The 20 Systems

Each system has a working HTML/JS demo in `systems/`. Open any `index.html` directly in a browser.

| # | System | Principle |
|---|--------|-----------|
| 01 | Matte Host + Brilliant Veins | Shine has a territory |
| 02 | Tessellation Woven From Light | Geometry becomes shine-carrying infrastructure |
| 03 | Kintsugi / Cracks / Seams | Shine loves boundaries |
| 04 | Buried Shine Under Cloudy Material | Visual depth and mystery |
| 05 | Glitter Ecology | Sparkle gets better when its distribution has intelligence |
| 06 | Metallic Gradient Structure Maps | Metallic color is information |
| 07 | Shine-As-Weather | Shine is a changing field condition |
| 08 | Infrastructure Made of Brilliance | Shine is infrastructure, not finish |
| 09 | Shine-As-Embroidery / Suturing | Shine is craft labor |
| 10 | Wet Shine vs Dry Shine | Not all shine behaves the same |
| 11 | Shine-As-Anatomy | Shine becomes internal life |
| 12 | Shine-As-Repair / Damage | Damage reveals brilliance |
| 13 | Shine-As-Woven Structure | Shine becomes textile geometry |
| 14 | Shine-As-Residue / Contamination | Shine is what the material leaves behind |
| 15 | Shine-As-Language / Symbol | Shine behaves like information |
| 16 | Shine-As-Object Logic | Shine is the object's reason for existing |
| 17 | Shine-As-Costume / Fashion | Shine as performed identity |
| 18 | Shine-As-Map / Topography | Shine as terrain reading |
| 19 | Shine-As-Caustic Projection | Shine as bent and focused light |
| 20 | Shine-As-Metallic Gradient Sculpture | Shine as fake volumetric form |

---

## Shared Utilities

All systems use helpers from `shared/`:

- **`hash2(x, y)`** — deterministic 2D hash
- **`fract(n)`** — fractional part
- **`pseudoFbm(x, y)`** — 4-octave fBm noise
- **`heightAt(x, y, time)`** — animated height field
- **`metallicPalette(t, hueShift)`** — anodized metallic color from 0–1 value
- **`contourAmount(v, bands)`** — contour line strength
- **`drawMiniGlint(ctx, x, y, r)`** — tiny starburst sparkle
- **`drawSeamGlow(ctx, x1, y1, x2, y2, w)`** — chromatic seam fill
- **`drawLightRibbon(ctx, a, b, hueA, hueB)`** — woven-light edge
- **`drawRhinestoneNode(ctx, x, y, r, hue, time)`** — jewel gland node

---

## Quick Design Formulas

**Formula 1:** `[dull host material] + [branching shiny system]`
- velvet + opal veins
- chalk + glitter capillaries
- ceramic + chrome sutures

**Formula 2:** `[tessellated geometry] + [shine medium] + [wrong physical behavior]`
- Penrose tiling + fiber-optic thread + leaks color like sap
- Voronoi cells + rhinestones + pulse like a nervous system

**Formula 3:** `[fracture/seam logic] + [luxury optical material]`
- crack map + pearl glaze
- kintsugi seams + diffraction film

**Formula 4:** `[soft matte body] + [buried luminous structure]`
- silicone flesh + glitter veins
- chalk foam + opal skeleton

---

## Shine Hierarchy (the layering trick)

Don't make all shine the same size or behavior. Use a 4-layer hierarchy:

1. **Layer 1** — broad soft sheen (pearl / oil / satin / latex)
2. **Layer 2** — medium directional shine (chrome streaks / woven seams / foil folds)
3. **Layer 3** — tiny sparkle events (glitter / sequins / microglints)
4. **Layer 4** — rare explosive highlights (starbursts / mirror flashes / jewel pings)

---

## Final Doctrine

> What is shining, why is it shining, and what does the shine reveal that the flat surface is trying to hide?

That is the difference between "glitter effect" and actual luminous generative art.

A good shine sketch should feel like the browser has become a little mineral altar. A little disco fungus. A little cursed jewelry engine. A little wet chrome organism showing you where the light is trying to escape.
