# ✦ Showcase Build 24

24. SEQUIN MILDEW 

Idea 

A mildew colony grows not as fuzz, but as tiny sequins. 

The surface gets colonized by little reflective discs. 

Think:  damp matte fabric 

+  circular sequin colonies 

+  growth rings 

+  flashing disc scales 

It is tacky and biological. 

Concept / principle 

The principle:  shine grows as repeated reflective units 

Unlike glitter mold, which has tiny irregular sparkles, sequin mildew has distinct visible “cells.” 

Each sequin is a little disc: 

 
 
 
 

●  body color 
●  crescent highlight 
●  dark center / stitch hole 
●  orientation flash 

Mildew controls where they grow. 

How it works 

Generate colony centers. 
Around each center, grow many discs with decreasing density. 

Each sequin: 

●  sits inside colony radius 
●  has color based on colony and distance 
● 
flashes based on its angle 
●  optionally has a stitch-hole dot 

Why it works 

Mildew creates organic clustering. 
Sequins create artificial glamour. 
Together:  tacky glam parasite 

Very good. 

Goal 

Make the viewer feel:  the surface is being consumed by decorative discs 

 
 
 
 
 

Colony generator  function initSequinColonies(w, h, count) { 

  const colonies = []; 

  for (let i = 0; i < count; i++) { 

    colonies.push({ 

      x: Math.random() * w, 

      y: Math.random() * h, 

      r: 60 + Math.random() * 170, 

      hue: 120 + Math.random() * 220, 

      seed: Math.random() * 999 

    }); 

  } 

  return colonies; 

} 

Sequin disc renderer  function drawMildewSequin(ctx, x, y, r, hue, angle, time, id) { 

  const flash = Math.pow(Math.max(0, Math.cos(angle - time * 0.8)), 10); 

 
 
 
 
 
 

  const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, 0, x, y, r); 

  g.addColorStop(0.00, "rgba(255,255,255,0.88)"); 

  g.addColorStop(0.18, `hsla(${hue + 70},100%,75%,0.82)`); 

  g.addColorStop(0.55, `hsla(${hue},100%,42%,0.86)`); 

  g.addColorStop(1.00, `hsla(${hue + 150},100%,18%,0.88)`); 

  ctx.fillStyle = g; 

  ctx.beginPath(); 

  ctx.arc(x, y, r, 0, Math.PI * 2); 

  ctx.fill(); 

  // stitch / mildew pore 

  ctx.fillStyle = "rgba(0,0,0,0.34)"; 

  ctx.beginPath(); 

  ctx.arc(x, y, r * 0.18, 0, Math.PI * 2); 

  ctx.fill(); 

  if (flash > 0.62) { 

    ctx.strokeStyle = `rgba(255,255,255,${flash * 0.75})`; 

    ctx.beginPath(); 

    ctx.moveTo(x - r * 1.2, y); 

    ctx.lineTo(x + r * 1.2, y); 

    ctx.stroke(); 

  } 

 
 
 

} 

Draw colony field  function drawSequinMildew(ctx, w, h, colonies, time) { 

  // damp matte cloth 

  ctx.fillStyle = "rgb(13,14,17)"; 

  ctx.fillRect(0, 0, w, h); 

  for (let c = 0; c < colonies.length; c++) { 

    const col = colonies[c]; 

    // soft damp halo 

    const halo = ctx.createRadialGradient(col.x, col.y, 0, col.x, col.y, col.r); 

    halo.addColorStop(0, `hsla(${col.hue},60%,35%,0.08)`); 

    halo.addColorStop(1, "rgba(0,0,0,0)"); 

    ctx.fillStyle = halo; 

    ctx.beginPath(); 

    ctx.arc(col.x, col.y, col.r, 0, Math.PI * 2); 

    ctx.fill(); 

    const count = Math.floor(col.r * 1.5); 

 
 
 
 
 
 
 

    for (let i = 0; i < count; i++) { 

      const a = Math.random() * Math.PI * 2; 

      const rr = col.r * Math.sqrt(Math.random()); 

      const x = col.x + Math.cos(a) * rr; 

      const y = col.y + Math.sin(a) * rr; 

      const falloff = 1 - rr / col.r; 

      if (Math.random() > falloff * 0.7) continue; 

      const r = 2.5 + falloff * 3.5 * Math.random(); 

      const hue = (col.hue + falloff * 80 + Math.random() * 45) % 360; 

      const angle = a + col.seed; 

      drawMildewSequin(ctx, x, y, r, hue, angle, time, c * 1000 + i); 

    } 

  } 

} 

Variations 

Bathroom sequin mildew 

Pale green/silver colonies on tile grout. 

Club rot 

Magenta/violet sequins on black cloth. 

 
 
 
 
 

Mermaid mildew 

Aqua/purple scale-like sequin colonies. 

Sacred decay 

Sequin colonies form halos around symbols.