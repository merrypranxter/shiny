# ✦ Showcase Build 12

12. HOLOGRAM BASKETWEAVE 

Idea 

A woven over-under fabric made from strips of holographic foil ribbon. 

It should feel physical:  strip over  strip under  strip casts shadow  strip catches spectral light 

Not just a checkerboard. 
A reflective plastic weave. 

Concept / principle 

The principle:  shine changes at crossings 

Weaving gives you natural alternation: 

●  over = brighter 
●  under = shadowed 
●  crossing = glint 
●  strand direction = different gradient 

 
 
 
 

●  strip curvature = different color shift 

This makes shine legible. 

How it works 

Create two families of ribbon strips: 

●  horizontal or diagonal ribbons 
●  vertical or opposite diagonal ribbons 

At each cell crossing, use parity to decide over/under. 

Each ribbon segment gets: 

●  metallic gradient across its width 
●  dark edge shadow 
●  white specular band 
●  color-shifting body 

Why it works 

Because the viewer can feel the physical construction:  this shiny thing has thickness and order 

The over-under logic makes it much more convincing than flat luminous lines. 

Goal 

Make the surface feel like:  a cheap holographic gift bag became a sacred textile 

 
 
 
 
 
 

Hologram strip palette 

The magic is hard contrast across ribbon width.  function makeHoloStripGradient(ctx, x1, y1, x2, y2, hue, time) { 

  const grad = ctx.createLinearGradient(x1, y1, x2, y2); 

  const h = (hue + time * 35) % 360; 

  grad.addColorStop(0.00, `hsl(${h + 210},100%,7%)`); 

  grad.addColorStop(0.16, `hsl(${h},100%,34%)`); 

  grad.addColorStop(0.34, `hsl(${h + 70},100%,68%)`); 

  grad.addColorStop(0.48, "rgba(255,255,255,0.94)"); 

  grad.addColorStop(0.58, `hsl(${h + 150},100%,55%)`); 

  grad.addColorStop(0.78, `hsl(${h + 260},100%,18%)`); 

  grad.addColorStop(1.00, `hsl(${h + 40},100%,38%)`); 

  return grad; 

} 

Ribbon segment with over/under  function drawHoloRibbonSegment(ctx, x1, y1, x2, y2, width, hue, time, over) { 

  const dx = x2 - x1; 

  const dy = y2 - y1; 

  const len = Math.hypot(dx, dy) || 1; 

 
 
 
 
 

  const nx = -dy / len; 

  const ny = dx / len; 

  // Under-strands get shadowed so over/under reads. 

  if (!over) { 

    ctx.strokeStyle = "rgba(0,0,0,0.42)"; 

    ctx.lineWidth = width + 7; 

    ctx.lineCap = "butt"; 

    ctx.beginPath(); 

    ctx.moveTo(x1, y1); 

    ctx.lineTo(x2, y2); 

    ctx.stroke(); 

  } 

  // Gradient across ribbon width. 

  const grad = makeHoloStripGradient( 

    ctx, 

    x1 + nx * width, 

    y1 + ny * width, 

    x1 - nx * width, 

    y1 - ny * width, 

    hue, 

    time 

  ); 

 
 

  ctx.strokeStyle = grad; 

  ctx.lineWidth = width; 

  ctx.lineCap = "butt"; 

  ctx.beginPath(); 

  ctx.moveTo(x1, y1); 

  ctx.lineTo(x2, y2); 

  ctx.stroke(); 

  // Crisp plastic edge lines. 

  ctx.strokeStyle = "rgba(255,255,255,0.18)"; 

  ctx.lineWidth = 1; 

  ctx.beginPath(); 

  ctx.moveTo(x1 + nx * width * 0.48, y1 + ny * width * 0.48); 

  ctx.lineTo(x2 + nx * width * 0.48, y2 + ny * width * 0.48); 

  ctx.moveTo(x1 - nx * width * 0.48, y1 - ny * width * 0.48); 

  ctx.lineTo(x2 - nx * width * 0.48, y2 - ny * width * 0.48); 

  ctx.stroke(); 

  // Over-strands get little crossing glare. 

  if (over && Math.random() < 0.08) { 

    const mx = (x1 + x2) / 2; 

    const my = (y1 + y2) / 2; 

    ctx.fillStyle = "rgba(255,255,255,0.75)"; 

 
 
 

    ctx.fillRect(mx - 1, my - 1, 2, 2); 

  } 

} 

Basketweave renderer  function drawHologramBasketweave(ctx, w, h, time) { 

  ctx.fillStyle = "rgb(8,7,13)"; 

  ctx.fillRect(0, 0, w, h); 

  const spacing = 42; 

  const width = 16; 

  // Horizontal chunks. 

  for (let y = -spacing; y < h + spacing; y += spacing) { 

    for (let x = -spacing; x < w + spacing; x += spacing) { 

      const col = Math.floor(x / spacing); 

      const row = Math.floor(y / spacing); 

      const over = ((col + row) & 1) === 0; 

      drawHoloRibbonSegment( 

        ctx, 

        x, 

        y, 

 
 
 
 
 

        x + spacing, 

        y, 

        width, 

        190 + row * 19, 

        time, 

        over 

      ); 

    } 

  } 

  // Vertical chunks. 

  for (let x = -spacing; x < w + spacing; x += spacing) { 

    for (let y = -spacing; y < h + spacing; y += spacing) { 

      const col = Math.floor(x / spacing); 

      const row = Math.floor(y / spacing); 

      const over = ((col + row) & 1) !== 0; 

      drawHoloRibbonSegment( 

        ctx, 

        x, 

        y, 

        x, 

        y + spacing, 

        width, 

 
 

        300 + col * 17, 

        time, 

        over 

      ); 

    } 

  } 

} 

Variations 

Gift bag altar 

Cheap holographic plastic, sacred layout. 

Pixel basket 

Chunky square weave, bright toy colors. 

Wet weave 

Ribbons look like glossy liquid gel instead of foil. 

Damaged weave 

Some strips torn, exposing matte underside.