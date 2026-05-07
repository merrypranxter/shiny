# ✦ Showcase Build 10

10. GLITTER EROSION CANYON 

Idea 

A chalky matte landscape is eroded, and the eroded channels reveal buried layers of glitter, 
metallic foil, and colored shine. 

Think:  dry pastel clay 

+  river erosion cuts 

+  hidden glitter strata exposed underneath 

Shine is not applied. 
Shine is excavated. 

Concept / principle 

The principle:  shine is buried geology revealed by erosion 

 
 
 
 

This is a great inversion. 
The surface is dull, but underneath are impossible reflective strata. 

The shiny parts happen where material was removed. 

How it works 

Build: 

1. matte terrain / slab 

Flat dry texture. 

2. erosion network 

Branching channels, ravines, deltas, cracks. 

3. exposed shiny strata 

Inside channels, draw metallic rainbow bands, glitter particles, wet glints. 

4. sediment edge 

Dry dust, powder, shadow, crumbly borders. 

Why it works 

Because it gives shine a geological reason. 

The viewer reads:  the dull world has treasure layers under it 

It feels playful and satisfying. 

Goal 

 
 
 
 

Make the shine feel:  discovered by abrasion  not added. 

Code principle 

Draw erosion channels as branching paths with thick strokes: 

1.  dark canyon shadow 
2.  metallic exposed floor 
3.  glitter sediment inside 
4.  chalk dust on edges 

Erosion branch generator  function makeErosionDelta(w, h) { 

  const streams = [{ 

    x: w * 0.5, 

    y: h * 0.05, 

    angle: Math.PI / 2, 

    life: 170, 

    width: 18, 

    depth: 0, 

    seed: Math.random() * 999 

  }]; 

  return streams; 

 
 
 
 

}  function stepErosion(streams, ctx, time, w, h) { 

  const next = []; 

  for (const s of streams) { 

    if (s.life <= 0 || s.width < 1.2) continue; 

    if (s.x < -50 || s.x > w + 50 || s.y < -50 || s.y > h + 50) continue; 

    const meander = Math.sin(s.seed + time * 0.25 + s.y * 0.015) * 0.12; 

    const nx = s.x + Math.cos(s.angle + meander) * 3.3; 

    const ny = s.y + Math.sin(s.angle + meander) * 3.3; 

    drawGlitterCanyonSegment(ctx, s.x, s.y, nx, ny, s.width, time, s.seed); 

    next.push({ 

      ...s, 

      x: nx, 

      y: ny, 

      angle: s.angle + meander + (Math.random() - 0.5) * 0.12, 

      life: s.life - 1, 

      width: s.width * 0.992 

    }); 

 
 
 
 
 
 

    if (Math.random() < 0.032 && s.depth < 7) { 

      next.push({ 

        x: nx, 

        y: ny, 

        angle: s.angle + (Math.random() < 0.5 ? 0.55 : -0.55) + (Math.random() - 0.5) * 0.35, 

        life: s.life * 0.62, 

        width: s.width * 0.58, 

        depth: s.depth + 1, 

        seed: s.seed + Math.random() * 100 

      }); 

    } 

  } 

  return next; 

} 

Glitter canyon segment renderer  function drawGlitterCanyonSegment(ctx, x1, y1, x2, y2, width, time, seed) { 

  const dx = x2 - x1; 

  const dy = y2 - y1; 

  const len = Math.hypot(dx, dy) || 1; 

  const nx = -dy / len; 

  const ny = dx / len; 

 
 
 

  // canyon shadow 

  ctx.strokeStyle = "rgba(20,12,25,0.42)"; 

  ctx.lineWidth = width * 1.7; 

  ctx.lineCap = "round"; 

  ctx.beginPath(); 

  ctx.moveTo(x1, y1); 

  ctx.lineTo(x2, y2); 

  ctx.stroke(); 

  // exposed metallic strata floor 

  const hue = (seed * 17 + time * 25 + y1 * 0.15) % 360; 

  const grad = ctx.createLinearGradient( 

    x1 + nx * width, 

    y1 + ny * width, 

    x1 - nx * width, 

    y1 - ny * width 

  ); 

  grad.addColorStop(0.00, `hsl(${hue + 220},100%,10%)`); 

  grad.addColorStop(0.20, `hsl(${hue},100%,34%)`); 

  grad.addColorStop(0.38, `hsl(${hue + 70},100%,66%)`); 

  grad.addColorStop(0.48, "rgba(255,255,255,0.92)"); 

 
 
 
 

  grad.addColorStop(0.60, `hsl(${hue + 145},100%,45%)`); 

  grad.addColorStop(1.00, `hsl(${hue + 260},100%,14%)`); 

  ctx.strokeStyle = grad; 

  ctx.lineWidth = width * 0.72; 

  ctx.beginPath(); 

  ctx.moveTo(x1, y1); 

  ctx.lineTo(x2, y2); 

  ctx.stroke(); 

  // chalky eroded rim dust 

  ctx.strokeStyle = "rgba(230,220,240,0.08)"; 

  ctx.lineWidth = 1; 

  ctx.beginPath(); 

  ctx.moveTo(x1 + nx * width * 0.86, y1 + ny * width * 0.86); 

  ctx.lineTo(x2 + nx * width * 0.86, y2 + ny * width * 0.86); 

  ctx.moveTo(x1 - nx * width * 0.86, y1 - ny * width * 0.86); 

  ctx.lineTo(x2 - nx * width * 0.86, y2 - ny * width * 0.86); 

  ctx.stroke(); 

  // exposed glitter grains 

  if (Math.random() < 0.55) { 

    const t = Math.random(); 

    const gx = x1 + dx * t + (Math.random() - 0.5) * width * 0.45; 

 
 
 

    const gy = y1 + dy * t + (Math.random() - 0.5) * width * 0.45; 

    ctx.fillStyle = "rgba(255,255,255,0.8)"; 

    ctx.fillRect(gx, gy, 1.5, 1.5); 

  } 

} 

Matte terrain host  function drawDryChalkHost(ctx, w, h) { 

  ctx.fillStyle = "rgb(36,31,42)"; 

  ctx.fillRect(0, 0, w, h); 

  // soft dusty grains 

  for (let i = 0; i < 7000; i++) { 

    const x = Math.random() * w; 

    const y = Math.random() * h; 

    const a = 0.025 + Math.random() * 0.05; 

    const l = 80 + Math.random() * 45; 

    ctx.fillStyle = `rgba(${l},${l - 10},${l + 15},${a})`; 

    ctx.fillRect(x, y, 1, 1); 

  } 

} 

 
 
 
 
 

Variations 

Candy erosion 

Pastel dry terrain, neon foil strata. 

Cosmic canyon 

Black dusty host, cyan/gold glitter canyons. 

Geological sticker cutaway 

Layers look like holographic sticker backing. 

Dry desert / wet treasure 

Chalky matte surface with wet metallic rivers underneath. 

Cross-mutations for this batch 

Holographic Kintsugi + Polarized Stress  cracks repaired with holo resin, surrounded by rainbow stress halos 

Glitter Scar Tissue + Chrome Infection  scar ridges slowly become reflective metal 

Chrome Infection + Glitter Erosion  erosion exposes chrome below, then chrome begins spreading over the surface 

 
 
 
 
 

Polarized Stress + Glitter Scar  scar tissue on clear plastic, with rainbow pressure bands radiating outward 

Kintsugi Storm + Glitter Canyon  broken ceramic plate whose cracks become glitter-filled river deltas 

RepoScripter doctrine for this batch 

For damage-shine designs, the brightest optical material should appear where the host surface 
is broken, stressed, healed, infected, or eroded. 

Use: 

- holographic seams for repair 

- glitter ridges for scar tissue 

- chrome fields for infection 

- spectral bands for pressure 

- metallic strata for exposed erosion 

The shine must have a cause. 

Damage is the cause. 

Say next and I’ll keep going with the next 5 showcase builds.