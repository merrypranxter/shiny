# Shiny Design Formulas

Quick generators and composition recipes for building shiny designs.

---

## The Four Core Formulas

### Formula 1: Dull Host + Branching Shiny System

```
[dull host material] + [branching shiny system]
```

| Host | Shiny System |
|------|-------------|
| velvet | opal veins |
| chalk | glitter capillaries |
| ceramic | chrome sutures |
| plaster | foil root network |
| latex | holographic nerves |
| stone | metallic crack-fill |
| silicone | prismatic bloodstream |

The branching system should feel like it *belongs* inside the host — not pasted on.

---

### Formula 2: Tessellated Geometry + Shine Medium + Wrong Physical Behavior

```
[tessellated geometry] + [shine medium] + [wrong physical behavior]
```

| Geometry | Shine Medium | Wrong Behavior |
|----------|-------------|----------------|
| Penrose tiling | fiber-optic thread | leaks color like sap |
| Voronoi cells | rhinestones | pulse like a nervous system |
| hex grid | holographic grout | liquefies at intersections |
| Islamic stars | chrome ribbon | crystallizes over time |
| Delaunay mesh | opal thread | breathes in/out |

The "wrong physical behavior" is the key — it makes the geometry feel alive rather than static.

---

### Formula 3: Fracture/Seam Logic + Luxury Optical Material

```
[fracture/seam logic] + [luxury optical material]
```

| Fracture Type | Optical Material |
|--------------|-----------------|
| crack map | pearl glaze |
| kintsugi seams | diffraction film |
| pressure ridges | polarized acrylic rainbow |
| Voronoi fracture | chrome resin |
| fault lines | glitter lacquer |
| cellular borders | holographic foil weld |

The optical material should feel *better* than the original surface — making damage desirable.

---

### Formula 4: Soft Matte Body + Buried Luminous Structure

```
[soft matte body] + [buried luminous structure]
```

| Matte Body | Buried Structure |
|-----------|-----------------|
| silicone flesh | glitter veins |
| chalk foam | opal skeleton |
| plaster tile | woven chromatic wireframe |
| milky wax | prismatic fossil lattice |
| cloudy resin | rhinestone network |
| frosted glass | embedded light grid |

The buried structure is most powerful when you can **almost** see it — when the surface is translucent enough to hint but not fully reveal.

---

## Cross-Breeding Formulas

Combine systems for unexpected complexity:

### Metallic Map + Weather
→ Anodized titanium weather radar. Contours show pressure bands, but every contour is metallic and reflective.

### Infrastructure + Embroidery
→ Fiber-optic sutured subway map. A transit network sewn into matte material with pulsing light beads.

### Wet/Dry + Kintsugi
→ Dry ceramic cracks filled with wet chrome resin and crusted mica. The crack fill is wet shine, the surrounding residue is dry sparkle.

### Tessellation + Wet/Dry
→ Hex tile field with wet holographic grout and dry pearl-powder tile faces. The seams shine continuously; the cells shimmer granularly.

### Weather + Glitter Ecology
→ Sparkle precipitation map. Glitter appears as storms, not decoration.

### Anatomy + Repair
→ Holographic sutures repairing a glitter nervous system.

### Woven Structure + Residue
→ Hologram basketweave collecting chrome pollen in the crossings.

### Language + Anatomy
→ A shiny circulatory system that doubles as unreadable script.

### Damage + Symbol
→ Cracks repaired into a sigil diagram.

### Residue + Repair
→ Foil rust growing only along kintsugi seams.

---

## The Strongest First Directions

If you had to pick a starting point, these five produce the strongest immediate results:

1. **Matte host + brilliant veins** — immediately strong and endlessly mutable
2. **Tessellation woven from light** — gets away from blobs into elegant design territory
3. **Kintsugi / crack / seam shine** — shine loves boundaries
4. **Buried shine under cloudy material** — subsurface optical stuff feels magical and expensive
5. **Clustered glitter ecology** — glitter is only good when its distribution has intelligence

---

## The Tiny Doctrine Block

Save this:

```
Shiny design is not about covering a thing in gloss.
It is about deciding where brilliance lives.

Brilliance may live in:
  veins / seams / cracks / tessellated edges
  woven light-paths / buried channels
  reflective dust ecologies / pressure bands
  contour ridges / kintsugi sutures
  prismatic boundaries / luminous structural filaments

The best shiny design contrasts:
  a quiet host material
  against
  a highly active optical subsystem.
```

---

## Render Pipeline Template

For any shiny design, a strong render order:

1. Draw quiet host surface (matte, textured, low-contrast)
2. Generate structural field / network / path
3. Assign optical material behavior to that structure
4. Add hierarchy (Layer 1 broad → Layer 4 rare explosive)
5. Let mouse / time act as light source / pressure / scanner

```js
// Template
function frame(time) {
  drawMatteHost(ctx, W, H);               // Step 1
  const structure = generateStructure();  // Step 2
  renderOpticalMaterial(structure, time); // Step 3
  addSparkleHierarchy(time);             // Step 4
  // Step 5 handled by time / mouse events
}
```
