# ✦ Showcase Build 09

9. POLARIZED STRESS FRACTURES 

Idea 

A clear or translucent material shows rainbow stress bands and fracture lines, like plastic under 
polarized light. 

Think:  clear toy plastic 

+  pressure rainbows 

+  white cracks 

+  shiny glassy edges 

This is less glitter, more color-shine through stress. 

Concept / principle 

The principle:  shine reveals pressure 

 
 
 

The colorful optical effect appears where the material is compressed, bent, stretched, cracked, 
or trapped. 

It’s a beautiful way to make invisible forces visible. 

How it works 

Generate a stress field from: 

●  mouse pressure 
●  multiple pressure centers 
●  cracks 
●  edges 
●  distance fields 
●  warped noise 

Then map stress to cyclic spectral colors. 

Add: 

●  contour bands 
●  bright crack lines 
●  glassy edge highlights 
●  compression halos 

Why it works 

Stress colors are both technical and magical. 
They look scientific, but also impossible. 

The viewer reads:  this material is under optical tension 

 
 
 
 
 

Goal 

Make color feel physically caused:  the rainbow exists because the material is suffering 

Cute suffering. Toy suffering. Acrylic keychain suffering. 

Code principle 

Stress field:  stress = sum of pressure center influence + noise + crack influence 

Spectral bands:  color = sin(stress * frequency + channelOffsets) 

Polarized stress renderer  function drawPolarizedStress(ctx, w, h, time, mouse) { 

  const step = 3; 

  const centers = [ 

    { x: w * 0.32, y: h * 0.44, p: 1.1 }, 

    { x: w * 0.68, y: h * 0.58, p: 0.9 }, 

    { x: mouse.x || w * 0.5, y: mouse.y || h * 0.5, p: mouse.isPressed ? 2.0 : 0.7 } 

  ]; 

 
 
 
 
 
 

  for (let y = 0; y < h; y += step) { 

    for (let x = 0; x < w; x += step) { 

      let stress = 0; 

      for (const c of centers) { 

        const dx = x - c.x; 

        const dy = y - c.y; 

        const d = Math.sqrt(dx * dx + dy * dy) + 1; 

        stress += c.p * Math.sin(d * 0.045 - time * 1.2) / Math.sqrt(d * 0.02); 

      } 

      stress += 0.65 * fieldNoise(x * 0.012, y * 0.012 + time * 0.02); 

      stress += 0.25 * fieldNoise(x * 0.045 - time * 0.01, y * 0.045); 

      const phase = stress * 8.0; 

      const r = 120 + 120 * Math.sin(phase + 0.0); 

      const g = 120 + 120 * Math.sin(phase + 2.1); 

      const b = 120 + 120 * Math.sin(phase + 4.2); 

      // band edge shine 

      const band = Math.abs(Math.sin(phase)); 

      const alpha = 0.20 + Math.pow(band, 10) * 0.45; 

      ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`; 

 
 
 
 
 

      ctx.fillRect(x, y, step, step); 

      if (band > 0.985) { 

        ctx.fillStyle = "rgba(255,255,255,0.30)"; 

        ctx.fillRect(x, y, 1, 1); 

      } 

    } 

  } 

} 

Crack overlay  function drawStressCrack(ctx, pts, time) { 

  ctx.lineCap = "round"; 

  ctx.lineJoin = "round"; 

  // glass fracture dark line 

  ctx.strokeStyle = "rgba(0,0,0,0.25)"; 

  ctx.lineWidth = 5; 

  ctx.beginPath(); 

  ctx.moveTo(pts[0].x, pts[0].y); 

  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y); 

  ctx.stroke(); 

 
 
 
 
 

  // bright internal crack 

  ctx.strokeStyle = "rgba(255,255,255,0.55)"; 

  ctx.lineWidth = 1.5; 

  ctx.beginPath(); 

  ctx.moveTo(pts[0].x, pts[0].y); 

  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y); 

  ctx.stroke(); 

  // spectral halo 

  ctx.strokeStyle = `hsla(${190 + time * 50},100%,70%,0.18)`; 

  ctx.lineWidth = 12; 

  ctx.beginPath(); 

  ctx.moveTo(pts[0].x, pts[0].y); 

  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y); 

  ctx.stroke(); 

} 

Variations 

Acrylic keychain fracture 

Cute transparent charm with rainbow pressure bands. 

Toy stress map 

Clear plastic toy shell with bright tension zones. 

 
 
 

Polarized scar glass 

Cracks surrounded by liquid spectral halos. 

Clear slime under tension 

Stress bands move slowly like stretched jelly.