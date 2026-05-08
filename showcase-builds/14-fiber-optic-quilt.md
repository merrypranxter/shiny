# ✦ Showcase Build 14

14. FIBER-OPTIC QUILT 

Idea 

A patchwork quilt or panel system where the seams are made of fiber-optic light, and each 
patch is dull fabric, rubber, paper, or felt. 

This is textile + circuit + map. 

Think:  matte patchwork 

+ 

 
 
  glowing stitched seams 

+  traveling light beads 

Concept / principle 

The principle:  shine connects pieces into one system 

The patches can be separate colors/textures, but the shine makes them communicate. 

The seams are not just borders. 
They are wires. 

How it works 

Build a recursive subdivision or grid of patches. 

For each patch: 

●  draw matte fill 
●  draw slight fabric grain 
●  draw seam edges as glowing fiber 
●  send pulses along seams 
●  glint at intersections 

Why it works 

Quilts already have: 

●  panels 
●  seams 

 
 
 
 
 

●  pattern logic 
●  craft associations 
repeated structure 
● Fiber-optic shine adds: 

●  electricity 
●  hidden system 
●  color flow 
● futuristic craft 

Goal 

Make it feel like:  a handmade textile that has learned to route light 

Recursive patch subdivision  function subdividePatches(x, y, w, h, depth, out) { 

  if (depth <= 0 || w < 45 || h < 45 || Math.random() < 0.22) { 

    out.push({ x, y, w, h, hue: Math.random() * 360 }); 

    return; 

  } 

  const splitVertical = w > h ? true : h > w ? false : Math.random() < 0.5; 

  if (splitVertical) { 

    const cut = w * (0.35 + Math.random() * 0.3); 

    subdividePatches(x, y, cut, h, depth - 1, out); 

 
 
 
 
 

    subdividePatches(x + cut, y, w - cut, h, depth - 1, out); 

  } else { 

    const cut = h * (0.35 + Math.random() * 0.3); 

    subdividePatches(x, y, w, cut, depth - 1, out); 

    subdividePatches(x, y + cut, w, h - cut, depth - 1, out); 

  } 

} 

Draw matte patch  function drawMattePatch(ctx, p, id) { 

  const shade = 22 + (id % 5) * 8; 

  ctx.fillStyle = `hsl(${p.hue},22%,${shade}%)`; 

  ctx.fillRect(p.x, p.y, p.w, p.h); 

  // fabric grain 

  ctx.fillStyle = "rgba(255,255,255,0.025)"; 

  for (let i = 0; i < 40; i++) { 

    const x = p.x + Math.random() * p.w; 

    const y = p.y + Math.random() * p.h; 

    ctx.fillRect(x, y, 1 + Math.random() * 8, 1); 

  } 

  // dark inset 

 
 
 
 

  ctx.strokeStyle = "rgba(0,0,0,0.22)"; 

  ctx.strokeRect(p.x + 1, p.y + 1, p.w - 2, p.h - 2); 

} 

Fiber seam renderer  function drawFiberSeam(ctx, x1, y1, x2, y2, time, hue, id) { 

  const dx = x2 - x1; 

  const dy = y2 - y1; 

  const len = Math.hypot(dx, dy) || 1; 

  // glow bed 

  ctx.strokeStyle = `hsla(${hue},100%,65%,0.10)`; 

  ctx.lineWidth = 8; 

  ctx.beginPath(); 

  ctx.moveTo(x1, y1); 

  ctx.lineTo(x2, y2); 

  ctx.stroke(); 

  // core 

  const grad = ctx.createLinearGradient(x1, y1, x2, y2); 

  grad.addColorStop(0, `hsla(${hue},100%,60%,0.75)`); 

  grad.addColorStop(0.5, "rgba(255,255,255,0.75)"); 

  grad.addColorStop(1, `hsla(${hue + 100},100%,65%,0.75)`); 

 
 
 
 

  ctx.strokeStyle = grad; 

  ctx.lineWidth = 2; 

  ctx.beginPath(); 

  ctx.moveTo(x1, y1); 

  ctx.lineTo(x2, y2); 

  ctx.stroke(); 

  // moving light bead 

  const t = (time * 0.28 + id * 0.137) % 1; 

  const px = x1 + dx * t; 

  const py = y1 + dy * t; 

  const g = ctx.createRadialGradient(px, py, 0, px, py, 14); 

  g.addColorStop(0, "rgba(255,255,255,0.8)"); 

  g.addColorStop(0.25, `hsla(${hue + 60},100%,70%,0.35)`); 

  g.addColorStop(1, "rgba(0,0,0,0)"); 

  ctx.fillStyle = g; 

  ctx.beginPath(); 

  ctx.arc(px, py, 14, 0, Math.PI * 2); 

  ctx.fill(); 

} 

 
 
 
 
 

Draw quilt  function drawFiberOpticQuilt(ctx, w, h, patches, time) { 

  ctx.fillStyle = "rgb(10,8,13)"; 

  ctx.fillRect(0, 0, w, h); 

  for (let i = 0; i < patches.length; i++) { 

    drawMattePatch(ctx, patches[i], i); 

  } 

  // Draw patch borders as fiber optics. 

  for (let i = 0; i < patches.length; i++) { 

    const p = patches[i]; 

    const hue = (190 + i * 29 + time * 30) % 360; 

    drawFiberSeam(ctx, p.x, p.y, p.x + p.w, p.y, time, hue, i * 4); 

    drawFiberSeam(ctx, p.x + p.w, p.y, p.x + p.w, p.y + p.h, time, hue + 40, i * 4 + 1); 

    drawFiberSeam(ctx, p.x + p.w, p.y + p.h, p.x, p.y + p.h, time, hue + 80, i * 4 + 2); 

    drawFiberSeam(ctx, p.x, p.y + p.h, p.x, p.y, time, hue + 120, i * 4 + 3); 

  } 

} 

 
 
 
 
 
 

Variations 

Grandma cyberquilt 

Warm matte fabric with violent neon seams. 

Repository quilt 

Each patch represents a file/folder, seams pulse by imports or dependencies. 

Healing blanket 

Patches look repaired, seams carry opal light. 

Emergency quilt 

Weather-map colors, fiber seams blink like warnings.