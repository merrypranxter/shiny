# Voronoi / Delaunay for Shine

## Voronoi
- Cells = matte territories
- Edges = chrome grout, seams, cracks
- Vertices = junction jewels, nodes
- Distance to edge = shine intensity

## Delaunay
- Triangles = mesh structure
- Edges = wireframe shine
- Circumcenters = Voronoi seeds

## Use For
- Tile fields with shiny seams
- Crack networks
- Graph infrastructure
- Territory maps

## Code Hook
```javascript
function voronoiEdgeShine(x, y, seeds) {
  let d1 = Infinity, d2 = Infinity;
  for (const s of seeds) {
    const d = dist(x, y, s.x, s.y);
    if (d < d1) { d2 = d1; d1 = d; }
    else if (d < d2) { d2 = d; }
  }
  const edge = 1 - (d2 - d1) / threshold;
  return edge > 0 ? metallicPalette(edge) : matteColor;
}
```
