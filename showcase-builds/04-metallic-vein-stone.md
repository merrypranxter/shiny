# ✦ Showcase Build 04

4. METALLIC VEIN STONE 

Idea 

A matte stone, ceramic, marble, clay, or concrete surface contains impossible embedded veins 
of rainbow metal. 

It is geology, but fake and glamorous. 

Think:  boring mineral slab 

+  molten anodized titanium veins 

Concept / principle 

The key principle:  shine as mineral inclusion 

The shine should look like it belongs inside the material, not on top. 

This is different from glitter veins. 
Glitter veins feel fluid/biological. 
Metallic vein stone feels geological and structural. 

How it works 

You need: 

Stone host 

 
 
 
 

Dull, granular, cloudy, low-saturation. 

Vein network 

Crack-like, branching, sometimes jagged. 

Metallic fill 

Hard gradients, dark reflection bands, white specular slashes. 

Edge integration 

Powder halos, shadow grooves, chipped edges. 

Why it works 

Stone is heavy and matte. 
Metallic gradients are glossy and active. 

The contrast makes the veins feel impossible. 

The viewer reads:  this rock grew luxury inside it 

Goal 

Make the shine feel: 

●  embedded 
●  heavy 
●  mineral 
●  ancient 
●  precious 
● impossible 

 
 
 
 

Code principle 

Render pipeline: 

1.  draw stone texture 
2.  generate crack/vein paths 
3.  draw dark trench 
4.  draw metallic fill 
5.  draw edge powder and tiny crystal glints 

Matte stone texture snippet  function drawMatteStone(ctx, w, h, time) { 

  ctx.fillStyle = "rgb(34,31,38)"; 

  ctx.fillRect(0, 0, w, h); 

  for (let i = 0; i < 9000; i++) { 

    const x = Math.random() * w; 

    const y = Math.random() * h; 

    const grain = Math.random(); 

    const a = 0.025 + grain * 0.055; 

    const l = 28 + grain * 20; 

    ctx.fillStyle = `rgba(${l},${l - 3},${l + 6},${a})`; 

    ctx.fillRect(x, y, 1, 1); 

  } 

 
 
 
 
 

  // cloudy mineral stains 

  for (let i = 0; i < 40; i++) { 

    const x = Math.random() * w; 

    const y = Math.random() * h; 

    const r = 50 + Math.random() * 160; 

    const g = ctx.createRadialGradient(x, y, 0, x, y, r); 

    g.addColorStop(0, "rgba(120,110,135,0.035)"); 

    g.addColorStop(1, "rgba(0,0,0,0)"); 

    ctx.fillStyle = g; 

    ctx.beginPath(); 

    ctx.arc(x, y, r, 0, Math.PI * 2); 

    ctx.fill(); 

  } 

} 

Metallic vein renderer  function drawMetalStoneVein(ctx, x1, y1, x2, y2, w, time, seed) { 

  const dx = x2 - x1; 

  const dy = y2 - y1; 

  const len = Math.hypot(dx, dy) || 1; 

  const nx = -dy / len; 

 
 
 
 

  const ny = dx / len; 

  // chipped trench 

  ctx.strokeStyle = "rgba(0,0,0,0.45)"; 

  ctx.lineWidth = w * 4.2; 

  ctx.lineCap = "round"; 

  ctx.beginPath(); 

  ctx.moveTo(x1, y1); 

  ctx.lineTo(x2, y2); 

  ctx.stroke(); 

  // colored metal fill 

  const hue = (190 + seed * 67 + time * 18 + x1 * 0.03) % 360; 

  const grad = ctx.createLinearGradient( 

    x1 + nx * w, 

    y1 + ny * w, 

    x1 - nx * w, 

    y1 - ny * w 

  ); 

  grad.addColorStop(0.00, `hsl(${hue + 180},100%,8%)`); 

  grad.addColorStop(0.18, `hsl(${hue},100%,35%)`); 

  grad.addColorStop(0.42, `hsl(${hue + 65},100%,70%)`); 

  grad.addColorStop(0.50, "rgba(255,255,255,0.95)"); 

 
 
 

  grad.addColorStop(0.62, `hsl(${hue + 140},100%,48%)`); 

  grad.addColorStop(1.00, `hsl(${hue + 260},100%,14%)`); 

  ctx.strokeStyle = grad; 

  ctx.lineWidth = w; 

  ctx.beginPath(); 

  ctx.moveTo(x1, y1); 

  ctx.lineTo(x2, y2); 

  ctx.stroke(); 

  // stone dust along edge 

  if (Math.random() < 0.35) { 

    ctx.fillStyle = "rgba(210,205,220,0.12)"; 

    ctx.fillRect(x2 + nx * w * 2, y2 + ny * w * 2, 1, 1); 

  } 

} 

Variation: spectral vein stone 

Make veins follow Voronoi edges or crack walkers.  thick main veins 
thin tributary veins 
tiny metallic flecks in surrounding stone 

● 
● 
● 
●  white glints where veins fork