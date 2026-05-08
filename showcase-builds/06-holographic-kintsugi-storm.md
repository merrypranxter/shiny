# ✦ Showcase Build 06

6. HOLOGRAPHIC KINTSUGI STORM 

Idea 

A matte broken surface is repaired with violent holographic seams, but the repair does not 
politely follow the original cracks. It branches outward like weather, lightning, roots, or a 
spreading spell. 

Think:  dead ceramic 

+  rainbow foil repair seams 

+  storm-like branching fracture logic 

 
 
 

Not gold kintsugi. Too tasteful. 
This is diffraction kintsugi with electrical weather problems. 

Concept / principle 

The principle:  repair becomes the brightest part of the object 

The crack is no longer a flaw. 
The crack becomes the light-routing system. 

This works because cracks already have natural structure: 

●  main fractures 
tributary cracks 
● 
junctions 
● 
tapering width 
● 
● 
jagged direction changes 
●  dark damaged edges 

Then you fill them with: 

●  holographic foil 
●  opal resin 
●  chrome lacquer 
●  glitter welds 
●  spectral metal 

How it works 

Build four layers: 

1. Matte broken host 

Ceramic, clay, porcelain, stone, plaster. 

2. Dark fracture trench 

 
 
 

The crack cuts into the host. 

3. Holographic repair fill 

A high-value metallic rainbow line inside the trench. 

4. Storm branching 

Secondary seams split from the main cracks and create a weather-map feeling. 

Why it works 

This creates an immediate material contradiction:  quiet broken object  versus  aggressive optical repair 

The shine is justified. It lives where the object had to be fixed. 

The viewer reads:  something powerful was poured into the cracks 

Goal 

Make the shine feel like:  repair material that became more alive than the original surface 

It should look sacred, cheap, cosmic, and unstable at the same time. 

 
 
 
 
 
 

Code principle 

Generate cracks as branching walkers. 
Draw each crack segment with: 

1.  dark trench 
2.  broad color glow 
3.  metallic rainbow core 
4.  white specular filament 
5.  intersection glints 

Crack storm generator  function makeKintsugiStorm(w, h, originCount = 4) { 

  const cracks = []; 

  for (let i = 0; i < originCount; i++) { 

    const cx = w * (0.2 + Math.random() * 0.6); 

    const cy = h * (0.2 + Math.random() * 0.6); 

    const arms = 4 + Math.floor(Math.random() * 5); 

    for (let a = 0; a < arms; a++) { 

      cracks.push({ 

        x: cx, 

        y: cy, 

        angle: (Math.PI * 2 * a) / arms + (Math.random() - 0.5) * 0.7, 

        life: 90 + Math.random() * 180, 

        width: 5 + Math.random() * 5, 

        depth: 0, 

 
 
 

        hue: 190 + Math.random() * 160, 

        storm: Math.random() * 999 

      }); 

    } 

  } 

  return cracks; 

} 

Step and draw the storm  function stepKintsugiStorm(cracks, ctx, time, w, h) { 

  const next = []; 

  const junctions = []; 

  for (const c of cracks) { 

    if (c.life <= 0 || c.width < 0.35) continue; 

    if (c.x < -30 || c.x > w + 30 || c.y < -30 || c.y > h + 30) continue; 

    const crooked = 

      Math.sin(time * 0.15 + c.storm + c.x * 0.011 + c.y * 0.008) * 0.08 + 

      (Math.random() - 0.5) * 0.24; 

    const speed = 2.0 + Math.random() * 2.4; 

 
 
 
 
 
 

    const nx = c.x + Math.cos(c.angle + crooked) * speed; 

    const ny = c.y + Math.sin(c.angle + crooked) * speed; 

    drawHolographicRepairSegment(ctx, c.x, c.y, nx, ny, c.width, c.hue, time, c.storm); 

    next.push({ 

      ...c, 

      x: nx, 

      y: ny, 

      angle: c.angle + crooked, 

      life: c.life - 1, 

      width: c.width * 0.992 

    }); 

    if (Math.random() < 0.035 && c.depth < 6) { 

      junctions.push({ x: nx, y: ny, r: c.width * 2.2, hue: c.hue }); 

      next.push({ 

        x: nx, 

        y: ny, 

        angle: c.angle + (Math.random() < 0.5 ? 0.8 : -0.8) + (Math.random() - 0.5) * 0.45, 

        life: c.life * 0.55, 

        width: c.width * 0.62, 

        depth: c.depth + 1, 

 
 
 
 

        hue: c.hue + 50 * (Math.random() - 0.5), 

        storm: c.storm + Math.random() * 10 

      }); 

    } 

  } 

  for (const j of junctions) { 

    drawRepairJunctionGlint(ctx, j.x, j.y, j.r, j.hue, time); 

  } 

  return next; 

} 

Holographic seam renderer  function drawHolographicRepairSegment(ctx, x1, y1, x2, y2, width, hue, time, seed) { 

  const dx = x2 - x1; 

  const dy = y2 - y1; 

  const len = Math.hypot(dx, dy) || 1; 

  const nx = -dy / len; 

  const ny = dx / len; 

  // broken trench 

  ctx.strokeStyle = "rgba(0,0,0,0.42)"; 

 
 
 
 
 

  ctx.lineWidth = width * 3.8; 

  ctx.lineCap = "round"; 

  ctx.beginPath(); 

  ctx.moveTo(x1, y1); 

  ctx.lineTo(x2, y2); 

  ctx.stroke(); 

  // holographic glow bleeding into ceramic 

  ctx.strokeStyle = `hsla(${hue + Math.sin(seed + time) * 80},100%,65%,0.10)`; 

  ctx.lineWidth = width * 6.2; 

  ctx.beginPath(); 

  ctx.moveTo(x1, y1); 

  ctx.lineTo(x2, y2); 

  ctx.stroke(); 

  // spectral metallic core 

  const grad = ctx.createLinearGradient( 

    x1 + nx * width, 

    y1 + ny * width, 

    x1 - nx * width, 

    y1 - ny * width 

  ); 

  const h = (hue + time * 42 + seed * 11) % 360; 

 
 
 

  grad.addColorStop(0.00, `hsl(${h + 180},100%,8%)`); 

  grad.addColorStop(0.18, `hsl(${h},100%,40%)`); 

  grad.addColorStop(0.34, `hsl(${h + 70},100%,68%)`); 

  grad.addColorStop(0.48, "rgba(255,255,255,0.96)"); 

  grad.addColorStop(0.62, `hsl(${h + 145},100%,55%)`); 

  grad.addColorStop(1.00, `hsl(${h + 260},100%,15%)`); 

  ctx.strokeStyle = grad; 

  ctx.lineWidth = width; 

  ctx.beginPath(); 

  ctx.moveTo(x1, y1); 

  ctx.lineTo(x2, y2); 

  ctx.stroke(); 

  // raised white foil edge 

  ctx.strokeStyle = "rgba(255,255,255,0.22)"; 

  ctx.lineWidth = 1; 

  ctx.beginPath(); 

  ctx.moveTo(x1 + nx * width * 0.65, y1 + ny * width * 0.65); 

  ctx.lineTo(x2 + nx * width * 0.65, y2 + ny * width * 0.65); 

  ctx.stroke(); 

} 

 
 
 
 

Junction glint  function drawRepairJunctionGlint(ctx, x, y, r, hue, time) { 

  const flash = 0.5 + 0.5 * Math.sin(time * 9 + x * 0.03 + y * 0.02); 

  const g = ctx.createRadialGradient(x, y, 0, x, y, r * 4); 

  g.addColorStop(0, `hsla(${hue},100%,82%,${0.25 + flash * 0.35})`); 

  g.addColorStop(0.4, `hsla(${hue + 90},100%,60%,0.12)`); 

  g.addColorStop(1, "rgba(0,0,0,0)"); 

  ctx.fillStyle = g; 

  ctx.beginPath(); 

  ctx.arc(x, y, r * 4, 0, Math.PI * 2); 

  ctx.fill(); 

  if (flash > 0.74) { 

    ctx.strokeStyle = `rgba(255,255,255,${flash})`; 

    ctx.beginPath(); 

    ctx.moveTo(x - r * 1.8, y); 

    ctx.lineTo(x + r * 1.8, y); 

    ctx.moveTo(x, y - r * 1.8); 

    ctx.lineTo(x, y + r * 1.8); 

    ctx.stroke(); 

  } 

 
 
 
 

} 

Variations 

Ceramic storm 

White ceramic, cyan/magenta holographic repair. 

Black clay thunder 

Charcoal host, yellow/violet diffraction seams. 

Toy kintsugi 

Pastel broken toy plastic repaired with rainbow foil. 

Sacred glitch plate 

Porcelain surface, cracks forming sigil-like weather maps.