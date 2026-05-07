# Graph Networks for Shine

## What
Nodes connected by edges — the math of connection.

## Use For
- Infrastructure shine (power lines, transit)
- Nervous systems
- Circuit boards
- Lace / filigree
- Subway maps under skin

## Types
- **Random geometric**: points + distance threshold
- **Nearest-neighbor**: k-closest connections
- **Delaunay**: triangulation edges
- **Minimum spanning tree**: optimal connection
- **Small-world**: clustered + long-range links

## Shine Adaptation
- Edges = chrome conduits, fiber optics
- Nodes = junction jewels, synapses
- Edge weight = thickness / capacity
- Path = pulse travel direction

## Code Hook
```javascript
function makeNetwork(w, h, count) {
  const nodes = [];
  for (let i = 0; i < count; i++) {
    nodes.push({ x: Math.random() * w, y: Math.random() * h, id: i });
  }
  const edges = [];
  for (let i = 0; i < nodes.length; i++) {
    const dists = nodes.filter((_, j) => j !== i)
      .map(n => ({ node: n, d: (n.x - nodes[i].x)**2 + (n.y - nodes[i].y)**2 }))
      .sort((a, b) => a.d - b.d);
    for (let k = 0; k < 2; k++) {
      const j = dists[k].node.id;
      if (i < j) edges.push([i, j]);
    }
  }
  return { nodes, edges };
}
```
