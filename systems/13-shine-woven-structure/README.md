# ✦ System 13

13. SHINE-AS-WOVEN STRUCTURE 

Idea 

The shiny part is not a surface finish. 
It is a woven, braided, tiled, or interlaced structure. 

Examples: 

●  Penrose light loom 

 
 
 
  fiber-optic quilt 

●  hologram basketweave 
● 
●  opal fishnet 
●  metallic lace trellis 
●  chrome braid over matte rubber 
●  prismatic woven diagram 

Concept / principle 

The principle:  shine becomes textile geometry 

This is different from “lines that glow.” 
A woven shiny system implies: 

●  strands 
●  over/under rules 
●  crossings 
tension 
● 
● 
rhythm 
●  material thickness 
● 
repeated units 
●  directional reflection 

The shine becomes physical. 

How it works 

Generate a pattern system: 

●  grid 
● 
tiling 
●  braid 
●  wave weave 
●  knot network 
●  hex lattice 
●  Penrose-ish rhombs 
●  sine curves crossing 

 
 
 

●  Delaunay graph with over-under logic 

Then render each strand as: 

●  metallic ribbon 
● 
fiber-optic cord 
●  holographic thread 
●  pearlescent strip 
●  chrome wire 

At crossings, decide which strand goes over. 

Why it works visually 

Woven forms catch light in alternating directions. 
That gives you natural variation. 

A woven shine system gives:  directional highlight 
crossing glints 
shadow gaps 
rhythmic color changes 
physical believability 

Goal 

Make the viewer feel:  this pattern is literally constructed from reflective colored strands 

Not printed. 
Not glowing UI. 
Woven optical matter. 

Good systems 

 
 
 
 
  tessellations 

● 
●  braid rules 
●  over/under parity 
●  Lissajous grids 
●  wave interference lines 
●  quasicrystals 
●  graph edges 
lace algorithms 
● 
●  knot diagrams 

Code hook: simple hologram basketweave  function drawHoloBasketWeave(ctx, w, h, time) { 
  const spacing = 32; 
  const ribbonW = 14; 

  // matte host 
  ctx.fillStyle = "rgb(12,10,18)"; 
  ctx.fillRect(0, 0, w, h); 

  // horizontal ribbons 
  for (let y = -spacing; y < h + spacing; y += spacing) { 
    for (let x = -spacing; x < w + spacing; x += spacing) { 
      const over = ((Math.floor(x / spacing) + Math.floor(y / spacing)) & 1) === 0; 
      drawRibbonSegment(ctx, x, y, x + spacing, y, ribbonW, 200 + y * 0.4, time, over); 
    } 
  } 

  // vertical ribbons 
  for (let x = -spacing; x < w + spacing; x += spacing) { 
    for (let y = -spacing; y < h + spacing; y += spacing) { 
      const over = ((Math.floor(x / spacing) + Math.floor(y / spacing)) & 1) !== 0; 
      drawRibbonSegment(ctx, x, y, x, y + spacing, ribbonW, 300 + x * 0.35, time, over); 
    } 
  } 
} 

Code hook: shiny ribbon segment  function drawRibbonSegment(ctx, x1, y1, x2, y2, width, hue, time, over) { 

 
 
 
 
 
 

  const dx = x2 - x1; 
  const dy = y2 - y1; 
  const len = Math.hypot(dx, dy) || 1; 
  const nx = -dy / len; 
  const ny = dx / len; 

  if (!over) { 
    // shadow from the strand going underneath 
    ctx.strokeStyle = "rgba(0,0,0,0.42)"; 
    ctx.lineWidth = width + 5; 
    ctx.beginPath(); 
    ctx.moveTo(x1, y1); 
    ctx.lineTo(x2, y2); 
    ctx.stroke(); 
  } 

  const phase = time * 50 + x1 * 0.2 + y1 * 0.1; 
  const grad = ctx.createLinearGradient( 
    x1 + nx * width, 
    y1 + ny * width, 
    x1 - nx * width, 
    y1 - ny * width 
  ); 

  grad.addColorStop(0.00, `hsl(${(hue + phase) % 360},100%,22%)`); 
  grad.addColorStop(0.30, `hsl(${(hue + 70 + phase) % 360},100%,62%)`); 
  grad.addColorStop(0.48, "rgba(255,255,255,0.96)"); 
  grad.addColorStop(0.62, `hsl(${(hue + 180 + phase) % 360},100%,45%)`); 
  grad.addColorStop(1.00, `hsl(${(hue + 260 + phase) % 360},100%,15%)`); 

  ctx.strokeStyle = grad; 
  ctx.lineWidth = width; 
  ctx.lineCap = "round"; 
  ctx.beginPath(); 
  ctx.moveTo(x1, y1); 
  ctx.lineTo(x2, y2); 
  ctx.stroke(); 

  // thin edge rails 
  ctx.strokeStyle = "rgba(255,255,255,0.18)"; 
  ctx.lineWidth = 1; 
  ctx.beginPath(); 
  ctx.moveTo(x1 + nx * width * 0.38, y1 + ny * width * 0.38); 
  ctx.lineTo(x2 + nx * width * 0.38, y2 + ny * width * 0.38); 

 
 
 
 
 

  ctx.stroke(); 
} 

Specific concepts 

Penrose Light Loom 

Quasicrystal tiling made from fiber-optic strips. 

Hologram Basketweave 

Over-under holographic foil ribbons. 

Fiber-Optic Quilt 

Patchwork whose seams pulse with colored light. 

Opal Fishnet 

A net whose crossings flash like opal synapses.