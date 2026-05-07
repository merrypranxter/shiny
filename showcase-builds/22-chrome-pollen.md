# ✦ Showcase Build 22

22. CHROME POLLEN 

Idea 

A matte field is dusted with microscopic mirror pollen. The pollen clusters around invisible 
flows, barriers, and attraction zones. 

Think:  soft powder surface 

+  metallic dust grains 

+  windblown reflective pollen clouds 

This is dry, sparse, and atmospheric. 

Concept / principle 

The principle:  shine as airborne particulate memory 

Pollen is not structure like veins. It is not liquid like oil. It is a suspended/deposited cloud. 

Chrome pollen should feel: 

● 
fine 
●  dry 
●  mobile 
●  directional 
●  partially settled 
●  clustered by currents 

 
 
 

How it works 

Use particles. 

Each pollen particle has: 

●  position 
●  drift velocity 
flake angle 
● 
●  hue / metal tint 
●  brightness based on light direction 
●  cluster attraction 

The sparkle depends on orientation and time. 

Why it works 

Tiny particles make shine feel atmospheric. 
They create depth because some grains flash and others stay dark. 

The viewer reads:  the air or surface is full of reflective dust 

Goal 

Make shine feel:  dry, floating, granular, and directional 

Particle initialization 

 
 
 
 
 
  function initChromePollen(w, h, count) { 

  const pollen = []; 

  for (let i = 0; i < count; i++) { 

    pollen.push({ 

      x: Math.random() * w, 

      y: Math.random() * h, 

      vx: (Math.random() - 0.5) * 0.25, 

      vy: (Math.random() - 0.5) * 0.25, 

      angle: Math.random() * Math.PI * 2, 

      spin: (Math.random() - 0.5) * 0.08, 

      size: Math.random() < 0.08 ? 2.2 : 1.1, 

      hue: 190 + Math.random() * 160, 

      seed: Math.random() * 999 

    }); 

  } 

  return pollen; 

} 

Flow field drift  function pollenFlow(x, y, time) { 

  const a = 

 
 
 
 

    Math.sin(x * 0.006 + time * 0.4) + 

    Math.cos(y * 0.008 - time * 0.3) + 

    Math.sin((x + y) * 0.004); 

  return { 

    x: Math.cos(a * Math.PI) * 0.12, 

    y: Math.sin(a * Math.PI) * 0.12 

  }; 

} 

Draw/update chrome pollen  function updateChromePollen(ctx, pollen, w, h, time, mouse) { 

  // smoky fade, not full clear 

  ctx.fillStyle = "rgba(8,7,10,0.16)"; 

  ctx.fillRect(0, 0, w, h); 

  const lightAngle = mouse 

    ? Math.atan2(mouse.y - h / 2, mouse.x - w / 2) 

    : time * 0.4; 

  for (let i = 0; i < pollen.length; i++) { 

    const p = pollen[i]; 

    const f = pollenFlow(p.x, p.y, time); 

 
 
 
 
 

    p.vx += f.x * 0.04; 

    p.vy += f.y * 0.04; 

    p.vx *= 0.97; 

    p.vy *= 0.97; 

    p.x += p.vx; 

    p.y += p.vy; 

    p.angle += p.spin; 

    if (p.x < 0) p.x += w; 

    if (p.x > w) p.x -= w; 

    if (p.y < 0) p.y += h; 

    if (p.y > h) p.y -= h; 

    const facing = Math.cos(p.angle - lightAngle); 

    const flash = Math.pow(Math.max(0, facing), 18); 

    const hue = (p.hue + flash * 80 + time * 10) % 360; 

    const alpha = 0.08 + flash * 0.78; 

    ctx.save(); 

    ctx.translate(p.x, p.y); 

    ctx.rotate(p.angle); 

 
 
 
 
 
 

    ctx.fillStyle = `hsla(${hue},100%,${45 + flash * 45}%,${alpha})`; 

    ctx.fillRect(-p.size * 1.6, -p.size * 0.45, p.size * 3.2, p.size * 0.9); 

    if (flash > 0.82) { 

      ctx.strokeStyle = `rgba(255,255,255,${flash})`; 

      ctx.beginPath(); 

      ctx.moveTo(-5, 0); 

      ctx.lineTo(5, 0); 

      ctx.stroke(); 

    } 

    ctx.restore(); 

  } 

} 

Variations 

Chrome pollen over moss 

Pollen catches on fuzzy growth tips. 

Cosmetic powder cloud 

Pearl/champagne dust with soft flashes. 

Industrial mirror dust 

 
 
 
 
 

Silver particles over black rubber. 

Pollinated circuit 

Pollen clusters around glowing wires or seams.