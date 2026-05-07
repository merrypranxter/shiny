# ✦ Showcase Build 08

8. CHROME INFECTION MAP 

Idea 

A dull material is being colonized by chrome. 

The chrome does not coat everything. 
It spreads through branching zones, edge blooms, crusts, dendrites, stains, and little reflective 
islands. 

Think:  matte clay or rubber 

+  liquid mirror-metal infection 

+  rainbow oxidation edges 

Concept / principle 

The principle:  shine as invasion 

The shiny material is not native. 
It is spreading. 

This gives shine a behavior: 

●  growth 

 
 
 
  territory 

● 
●  edge 
front 
● 
infection density 
● 
●  outbreak nodes 
●  metastasis 

How it works 

Use a scalar infection field plus branching paths. 

Infection field 

Defines where chrome has taken over. 

Growth front 

High-gradient boundary where chrome is actively spreading. 

Chrome body 

Metallic gradient / silver / rainbow. 

Edge oxidation 

Colorful fringe at infection boundary. 

Outbreak glints 

White flashes at active nodes. 

Why it works 

Chrome is usually clean, polished, and controlled. 
Infection is messy and organic. 

Mix them and you get:  luxury contamination 

 
 

Very good. 

Goal 

Make shine feel like:  a reflective organism consuming a matte host 

Code principle 

Generate infection value:  infection = fieldNoise(x, y, time) 

Then: 

● 
● 
● if infection high: draw chrome 
if near threshold: draw rainbow edge 
if edge + random threshold: draw sparkle/glint 

Chrome infection field renderer  function drawChromeInfection(ctx, w, h, time) { 

  const step = 3; 

  const threshold = 0.54 + Math.sin(time * 0.18) * 0.03; 

  for (let y = 0; y < h; y += step) { 

    for (let x = 0; x < w; x += step) { 

 
 
 
 
 
 
 

      const v = 

        0.56 * fieldNoise(x * 0.006 + time * 0.03, y * 0.006) + 

        0.30 * fieldNoise(x * 0.018, y * 0.018 - time * 0.02) + 

        0.14 * fieldNoise(x * 0.055, y * 0.055); 

      const edge = Math.abs(v - threshold); 

      if (v > threshold) { 

        const slope = 

          fieldNoise((x + 4) * 0.018, y * 0.018) - 

          fieldNoise((x - 4) * 0.018, y * 0.018); 

        const hue = (190 + slope * 220 + time * 30 + v * 100) % 360; 

        const shine = Math.pow(Math.max(0, Math.sin((v + slope) * Math.PI * 5)), 6); 

        ctx.fillStyle = `hsl(${hue},100%,${22 + v * 38 + shine * 35}%)`; 

        ctx.fillRect(x, y, step, step); 

        if (shine > 0.82) { 

          ctx.fillStyle = `rgba(255,255,255,${shine * 0.45})`; 

          ctx.fillRect(x, y, 1, 1); 

        } 

      } else if (edge < 0.025) { 

        // active rainbow oxidation front 

 
 
 
 
 

        const hue = (300 + v * 360 + time * 80) % 360; 

        ctx.fillStyle = `hsla(${hue},100%,68%,${0.25 + (0.025 - edge) * 18})`; 

        ctx.fillRect(x, y, step, step); 

      } 

    } 

  } 

} 

Add branching chrome tendrils  function drawChromeTendril(ctx, x1, y1, x2, y2, w, time, id) { 

  const dx = x2 - x1; 

  const dy = y2 - y1; 

  const len = Math.hypot(dx, dy) || 1; 

  const nx = -dy / len; 

  const ny = dx / len; 

  const hue = (210 + id * 31 + time * 24) % 360; 

  const grad = ctx.createLinearGradient( 

    x1 + nx * w, 

    y1 + ny * w, 

    x1 - nx * w, 

    y1 - ny * w 

 
 
 
 

  ); 

  grad.addColorStop(0.00, "hsl(220,100%,6%)"); 

  grad.addColorStop(0.22, `hsl(${hue},100%,35%)`); 

  grad.addColorStop(0.42, `hsl(${hue + 80},100%,70%)`); 

  grad.addColorStop(0.50, "rgba(255,255,255,0.95)"); 

  grad.addColorStop(0.66, `hsl(${hue + 160},100%,45%)`); 

  grad.addColorStop(1.00, "hsl(260,100%,9%)"); 

  ctx.strokeStyle = grad; 

  ctx.lineWidth = w; 

  ctx.lineCap = "round"; 

  ctx.beginPath(); 

  ctx.moveTo(x1, y1); 

  ctx.lineTo(x2, y2); 

  ctx.stroke(); 

} 

Variations 

Mirror mold 

Chrome grows like fungal patches. 

Anodized infection 

Chrome body shifts cyan/pink/purple like titanium. 

 
 
 
 

Liquid metal rash 

Small chrome islands spread through rubber. 

Chrome root system 

Reflective roots invade matte soil or ceramic.