# ✦ Showcase Build 03

3. RHINESTONE LYMPH NODES 

Idea 

A branching organic network has swollen junctions made from large tacky rhinestones. 

The lines are small vessels. 
The nodes are glamorous cysts. 

This should feel like:  biology wearing mall jewelry 

Concept / principle 

 
 
 
 
 

The key principle:  shine concentrates at junctions 

Not all parts shine equally. 

The vessels can be subtle. 
The nodes are the spectacle. 

This creates hierarchy:  tiny shine → medium shine → ridiculous jewel flash 

How it works 

Use a network with branch points. 

At major junctions: 

●  draw faceted gems 
●  add starburst glints 
●  draw halos 
●  maybe connect small glitter particles around them 

The network can look anatomical, fungal, circuit-like, or cartographic. 

Why it works 

Junctions naturally attract attention. 

If you put rhinestone shine only there, the image feels designed. 

It says:  these are power organs  these are processing centers 

 
 
 
  these are glamorous infections 

Goal 

Make the rhinestones feel like functional glands, not decoration. 

Code principle 

Track branch junctions while generating network:  nodes.push({ x, y, radius, importance }); 

Importance can be: 

●  branch depth 
●  number of children 
random rare event 
● 
●  distance to center 
●  network traffic 

Then draw stones. 

Faceted rhinestone snippet  function drawFacetedRhinestone(ctx, x, y, r, hue, time, id) { 

  const sides = 10; 

  const flash = 0.5 + 0.5 * Math.sin(time * 6 + id * 0.9); 

  // outer shadow 

  ctx.fillStyle = "rgba(0,0,0,0.38)"; 

 
 
 
 
 
 

  ctx.beginPath(); 

  ctx.arc(x + r * 0.12, y + r * 0.18, r * 1.1, 0, Math.PI * 2); 

  ctx.fill(); 

  // facets 

  for (let i = 0; i < sides; i++) { 

    const a1 = (Math.PI * 2 * i) / sides; 

    const a2 = (Math.PI * 2 * (i + 1)) / sides; 

    const localHue = (hue + i * 28 + time * 30) % 360; 

    const light = 35 + 35 * Math.max(0, Math.sin(a1 * 2 + time + id)); 

    ctx.fillStyle = `hsla(${localHue},100%,${light}%,0.92)`; 

    ctx.beginPath(); 

    ctx.moveTo(x, y); 

    ctx.lineTo(x + Math.cos(a1) * r, y + Math.sin(a1) * r); 

    ctx.lineTo(x + Math.cos(a2) * r, y + Math.sin(a2) * r); 

    ctx.closePath(); 

    ctx.fill(); 

  } 

  // central table 

  const g = ctx.createRadialGradient(x - r * 0.25, y - r * 0.3, 0, x, y, r * 0.65); 

  g.addColorStop(0, "rgba(255,255,255,0.95)"); 

 
 
 
 

  g.addColorStop(0.22, `hsla(${hue + 80},100%,82%,0.9)`); 

  g.addColorStop(1, `hsla(${hue},100%,38%,0.7)`); 

  ctx.fillStyle = g; 

  ctx.beginPath(); 

  ctx.arc(x, y, r * 0.58, 0, Math.PI * 2); 

  ctx.fill(); 

  // star glint 

  if (flash > 0.78) { 

    ctx.strokeStyle = `rgba(255,255,255,${flash})`; 

    ctx.lineWidth = 1; 

    ctx.beginPath(); 

    ctx.moveTo(x - r * 1.6, y); 

    ctx.lineTo(x + r * 1.6, y); 

    ctx.moveTo(x, y - r * 1.6); 

    ctx.lineTo(x, y + r * 1.6); 

    ctx.stroke(); 

  } 

} 

Node halo snippet  function drawNodeHalo(ctx, x, y, r, hue) { 

 
 
 
 

  const g = ctx.createRadialGradient(x, y, 0, x, y, r * 3); 

  g.addColorStop(0, `hsla(${hue},100%,70%,0.18)`); 

  g.addColorStop(0.4, `hsla(${hue + 70},100%,55%,0.08)`); 

  g.addColorStop(1, "rgba(0,0,0,0)"); 

  ctx.fillStyle = g; 

  ctx.beginPath(); 

  ctx.arc(x, y, r * 3, 0, Math.PI * 2); 

  ctx.fill(); 

} 

Variations 

Tacky glam organism 

Hot pink vessels, giant rhinestone glands. 

Sacred lymph map 

Jewel nodes arranged like ceremonial body-map. 

Rotten luxury 

Matte moldy host, rhinestones as shiny infected cysts. 

Tech-biological 

Thin chrome wires, faceted data glands.