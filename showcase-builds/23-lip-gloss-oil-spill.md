# ✦ Showcase Build 23

23. LIP-GLOSS OIL SPILL 

Idea 

A rough matte surface gets covered by a spill of wet, prismatic, cosmetic goo. 

Think:  dry paper / concrete / skin-like matte host 

+  sticky clear gloss 

+  pink-blue-gold oil-slick gradients 

+  thick wet highlights 

This is shine as accident. 

Concept / principle 

The principle:  wet shine pools and spreads 

 
 
 
 

Unlike chrome pollen, this is continuous. 
The spill should have: 

●  puddle body 
thick rim 
● 
●  spectral thin-film colors 
●  white wet highlights 
●  sticky trails 
●  small separated droplets 

How it works 

Use a blob field or metaballs. 

Each spill blob contributes to a scalar field:  spill value = sum radius² / distance² 

Where field is high, draw glossy wet body. 
Where field is near threshold, draw bright rim. 

Color is controlled by:  thickness 

● 
●  distance to blob centers 
● 
●  mouse drag  time 

Why it works 

Lip gloss has multiple shine types at once: 

●  broad wet gradient 
●  hard white specular streak 
● 
● 
● transparent color 
thick edge rim 
tiny glitter suspended inside 

So it is a great showcase material. 

 
 
 

Goal 

Make it feel:  sticky, wet, cosmetic, excessive, and slightly wrong 

Metaball spill field  function spillField(x, y, blobs) { 

  let v = 0; 

  for (const b of blobs) { 

    const dx = x - b.x; 

    const dy = y - b.y; 

    const d2 = dx * dx + dy * dy + 40; 

    v += (b.r * b.r) / d2; 

  } 

  return v; 

} 

Initialize lip gloss blobs  function initLipGlossBlobs(w, h, count) { 

 
 
 
 
 
 
 

  const blobs = []; 

  for (let i = 0; i < count; i++) { 

    blobs.push({ 

      x: w * 0.5 + (Math.random() - 0.5) * w * 0.35, 

      y: h * 0.5 + (Math.random() - 0.5) * h * 0.25, 

      r: 35 + Math.random() * 85, 

      vx: (Math.random() - 0.5) * 0.18, 

      vy: (Math.random() - 0.5) * 0.18, 

      hue: 300 + Math.random() * 90 

    }); 

  } 

  return blobs; 

} 

Draw lip-gloss spill  function drawLipGlossOilSpill(ctx, w, h, blobs, time) { 

  const step = 2; 

  // rough matte host 

  ctx.fillStyle = "rgb(28,23,30)"; 

  ctx.fillRect(0, 0, w, h); 

 
 
 
 
 

  for (let y = 0; y < h; y += step) { 

    for (let x = 0; x < w; x += step) { 

      const v = spillField(x, y, blobs); 

      if (v > 0.62) { 

        const edge = Math.max(0, 1 - Math.abs(v - 0.72) * 7); 

        const thickness = Math.sin(v * 8 + time * 0.7 + x * 0.008) * 0.5 + 0.5; 

        const phase = thickness * 8 + v * 3 + time * 0.25; 

        const r = 140 + 110 * Math.sin(phase + 0.0); 

        const g = 120 + 110 * Math.sin(phase + 2.1); 

        const b = 150 + 100 * Math.sin(phase + 4.2); 

        const wet = Math.pow(Math.max(0, v - 0.62), 0.7); 

        const alpha = 0.12 + wet * 0.36 + edge * 0.22; 

        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`; 

        ctx.fillRect(x, y, step, step); 

        // rim glare 

        if (edge > 0.6) { 

          ctx.fillStyle = `rgba(255,255,255,${edge * 0.28})`; 

          ctx.fillRect(x, y, 1, 1); 

 
 
 
 
 
 

        } 

      } 

    } 

  } 

  drawGlossSpecularStreaks(ctx, blobs, time); 

} 

Wet specular streaks  function drawGlossSpecularStreaks(ctx, blobs, time) { 

  ctx.save(); 

  ctx.globalCompositeOperation = "lighter"; 

  for (let i = 0; i < blobs.length; i++) { 

    const b = blobs[i]; 

    ctx.strokeStyle = "rgba(255,255,255,0.38)"; 

    ctx.lineWidth = Math.max(1, b.r * 0.035); 

    ctx.lineCap = "round"; 

    ctx.beginPath(); 

    ctx.ellipse( 

      b.x - b.r * 0.22, 

 
 
 
 
 
 

      b.y - b.r * 0.28, 

      b.r * 0.28, 

      b.r * 0.07, 

      -0.45 + Math.sin(time + i) * 0.15, 

      0, 

      Math.PI * 1.3 

    ); 

    ctx.stroke(); 

  } 

  ctx.restore(); 

} 

Variations 

Bubblegum spill 

Pink/purple/cyan gloss over matte paper. 

Toxic lip oil 

Green/yellow/magenta glossy puddle. 

Glitter gloss 

Add suspended glitter dots inside the spill. 

Cosmetic crime scene 

Gloss spill with contour labels, arrows, and shiny evidence tags.