# ✦ System 02

2. TESSELLATION WOVEN FROM 
COLORED LIGHT 

Idea 

A geometric tiling is not drawn in pigment. 
It is constructed from strands / seams / conduits of light. 

 
 
 
 
 

Examples: 

●  Penrose tiling made of iridescent fiber 
●  Voronoi cells outlined in prismatic weld-light 
●  hexagonal cells stitched with opal seams 
● 
●  graph network made of neon metallic braid 

Islamic star pattern woven from chrome ribbon 

Concept / principle 

The principle is:  geometry becomes shine-carrying infrastructure 

Instead of filling shapes with color, the edges or threads become the main event. 

This is perfect because shine reads best when it has: 

●  direction 
●  continuity 
●  crossings 
●  edge logic 
● filament behavior 

A tessellation gives you all of that automatically. 

How it works 

You build: 

●  a tiling / cell field / edge graph 
●  a way to render the edges as optical filaments 
●  a matte or quiet interior ground for contrast 

The key is: the shine should feel woven or stitched, not like neon strokes slapped on top. 

So give the lines:  thickness hierarchy 

● 
●  edge bloom 

 
 
 

●  over/under logic 
●  color shifts along path 
intersection flares 
● Why it works visually 

Because it combines: 

●  order 
● 
luxury 
●  complexity 
rhythm 
● 
●  edge brilliance 

And because shine likes filamentary structure. 
A glowing line is interesting. 
A whole network of structured reflective line-work is even better. 

Goal 

Make the viewer feel:  this pattern is literally made of light-bearing material 

Not “a tile pattern with a glow effect.” 

Good system choices 

●  Voronoi / Delaunay 
●  hex grids 
●  Penrose tilings 
●  quasicrystals 
● 
●  graph meshes 
●  subdivision lattices 
●  cellular foam / network skeletons 

Islamic geometry 

 
 
 
 

Implementation strategy 

You can do this three ways: 

A. edge-only rendering 

Only the seams are bright. 

B. seam + dim fill 

Cells are low-energy, seams are brilliant. 

C. woven strips 

Each edge becomes a ribbon with over/under relationships. 

Quick Voronoi-ish / network edge idea 

If you don’t want full Voronoi generation yet, fake a cell network using points and 
nearest-neighbor connections.  const pts = []; 
for (let i = 0; i < 80; i++) { 
  pts.push({ x: Math.random() * width, y: Math.random() * height }); 
}  function nearestNeighbors(points, k = 3) { 
  const edges = []; 
  for (let i = 0; i < points.length; i++) { 
    const d = []; 
    for (let j = 0; j < points.length; j++) { 
      if (i === j) continue; 
      const dx = points[i].x - points[j].x; 
      const dy = points[i].y - points[j].y; 
      d.push({ j, dist: dx*dx + dy*dy }); 
    } 
    d.sort((a, b) => a.dist - b.dist); 
    for (let n = 0; n < k; n++) { 
      edges.push([points[i], points[d[n].j]]); 

 
 
 

    } 
  } 
  return edges; 
} 

Then render edges like woven light. 

Woven-light edge rendering snippet  function drawLightRibbon(ctx, a, b, hueA, hueB) { 
  const dx = b.x - a.x; 
  const dy = b.y - a.y; 
  const len = Math.hypot(dx, dy) || 1; 
  const nx = -dy / len; 
  const ny = dx / len; 

  // soft underglow 
  ctx.strokeStyle = `hsla(${hueA},100%,70%,0.10)`; 
  ctx.lineWidth = 10; 
  ctx.beginPath(); 
  ctx.moveTo(a.x, a.y); 
  ctx.lineTo(b.x, b.y); 
  ctx.stroke(); 

  // core ribbon 
  const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y); 
  grad.addColorStop(0, `hsla(${hueA},100%,65%,0.95)`); 
  grad.addColorStop(1, `hsla(${hueB},100%,70%,0.95)`); 
  ctx.strokeStyle = grad; 
  ctx.lineWidth = 4; 
  ctx.beginPath(); 
  ctx.moveTo(a.x, a.y); 
  ctx.lineTo(b.x, b.y); 
  ctx.stroke(); 

  // edge shine rails 
  ctx.strokeStyle = "rgba(255,255,255,0.25)"; 
  ctx.lineWidth = 1; 
  ctx.beginPath(); 
  ctx.moveTo(a.x + nx*2, a.y + ny*2); 
  ctx.lineTo(b.x + nx*2, b.y + ny*2); 

 
 
 
 
 

  ctx.stroke(); 

  ctx.beginPath(); 
  ctx.moveTo(a.x - nx*2, a.y - ny*2); 
  ctx.lineTo(b.x - nx*2, b.y - ny*2); 
  ctx.stroke(); 
} 

Better version later 

Eventually you want: 

●  actual tiling rules 
●  color-routing across graph edges 
● 
●  over-under weaving 
● intersection sparkle events  fiber-optic pulse motion 

That’s the really good shit.