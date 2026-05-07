# ✦ System 10

10. WET SHINE VS DRY SHINE 

Idea 

A design can become much richer when it uses two conflicting shine species:  wet shine 
vs 
dry shine 

Examples: 

●  wet chrome veins through dry clay 
●  dry glitter dust over glossy slime 
●  oil slick membrane on chalky plaster 
●  pearly wet resin around dry mica flakes 
● 
juicy lacquer with crusty metallic powder 
●  matte velvet with wet holographic channels 

 
 
 
 
 

Concept / principle 

The principle:  not all shine behaves the same 

This is important. 

Bad shiny design treats shine as one generic effect. 
Good shiny design has material contrast. 

Wet shine: 

●  continuous 
●  smooth 
●  glossy 
● 
flowing 
reflective 
● 
●  high bloom 
liquid-like 
● Dry shine: 

●  particulate 
●  dusty 
●  powdery 
● 
flaky 
●  granular 
● 
● intermittent 
tiny sharp flashes 

When you combine them, you get material tension. 

How it works 

Divide optical behavior into two render layers. 

Wet layer 

Use: 

●  soft highlights 

 
 

●  gradients 
●  smooth glow 
●  streaks 
●  continuous reflective bands 
●  blurred light 

Dry layer 

Use: 

● 
tiny flecks 
●  powder fields 
●  micro-glints 
● 
rough scatter 
●  clustered sparkle 
●  grain 

Then decide where they meet: 

●  dry glitter trapped in wet slime 
●  wet lacquer pooling around dry powder 
●  wet veins crossing dry host 
●  dry metallic flakes crusting a wet edge 

Why it works visually 

Because the eye can identify material differences quickly. 

A wet highlight says:  smooth surface, continuous reflection 

A dry sparkle says:  many tiny reflective particles 

Together they create a complex material ecology. 

Goal 

 
 
 
 

The goal is:  build a shiny surface with multiple optical species 

Not one global glow. 
A world of shine behaviors. 

Good system choices 

Wet:  flow fields 
● 
●  contour fields 
●  blobs 
●  signed distance shapes 
●  warped gradients 
●  caustics 

Dry: 

●  particle clusters 
●  glitter masks 
●  powder noise 
●  scratches 
●  microflake orientation fields 
●  stipple fields 

Wet shine snippet 

Draw glossy wet channels or blobs.  function drawWetBlob(ctx, x, y, r, time, hue) { 
  const g = ctx.createRadialGradient( 
    x - r * 0.35, y - r * 0.45, 0, 
    x, y, r 
  ); 

  g.addColorStop(0.00, "rgba(255,255,255,0.85)"); 
  g.addColorStop(0.08, `hsla(${hue},100%,80%,0.75)`); 

 
 
 
 

  g.addColorStop(0.42, `hsla(${hue + 45},100%,45%,0.45)`); 
  g.addColorStop(0.78, `hsla(${hue - 30},100%,18%,0.72)`); 
  g.addColorStop(1.00, "rgba(0,0,0,0)"); 

  ctx.fillStyle = g; 
  ctx.beginPath(); 
  ctx.arc(x, y, r, 0, Math.PI * 2); 
  ctx.fill(); 

  // hard wet specular slash 
  ctx.strokeStyle = "rgba(255,255,255,0.65)"; 
  ctx.lineWidth = Math.max(1, r * 0.04); 
  ctx.beginPath(); 
  ctx.arc(x - r * 0.2, y - r * 0.25, r * 0.32, -2.6, -1.3); 
  ctx.stroke(); 
} 

Dry sparkle dust snippet  function drawDryGlitterDust(ctx, x, y, r, count, time, hue) { 
  for (let i = 0; i < count; i++) { 
    const a = Math.random() * Math.PI * 2; 
    const rr = r * Math.sqrt(Math.random()); 
    const px = x + Math.cos(a) * rr; 
    const py = y + Math.sin(a) * rr; 

    const flash = Math.random() < 0.12  
      ? 0.9  
      : 0.15 + 0.35 * Math.random(); 

    const size = Math.random() < 0.08 ? 2 : 1; 

    ctx.fillStyle = `hsla(${hue + Math.random()*80},100%,${60 + flash*35}%,${flash})`; 
    ctx.fillRect(px, py, size, size); 

    if (flash > 0.85) { 
      ctx.strokeStyle = "rgba(255,255,255,0.55)"; 
      ctx.beginPath(); 
      ctx.moveTo(px - 3, py); 
      ctx.lineTo(px + 3, py); 
      ctx.moveTo(px, py - 3); 
      ctx.lineTo(px, py + 3); 

 
 
 
 
 
 
 
 

      ctx.stroke(); 
    } 
  } 
} 

Combine wet and dry  function drawWetDryShinePatch(ctx, x, y, r, time) { 
  // dull stain shadow 
  ctx.fillStyle = "rgba(20,10,30,0.35)"; 
  ctx.beginPath(); 
  ctx.arc(x, y, r * 1.15, 0, Math.PI * 2); 
  ctx.fill(); 

  // wet optical body 
  drawWetBlob(ctx, x, y, r, time, 280 + 40 * Math.sin(time)); 

  // dry crust around edge 
  drawDryGlitterDust(ctx, x, y, r * 1.05, 90, time, 35); 

  // tiny white wet ping 
  if (Math.random() < 0.5) { 
    ctx.fillStyle = "rgba(255,255,255,0.8)"; 
    ctx.fillRect(x - r * 0.22, y - r * 0.32, 2, 2); 
  } 
} 

Specific concept: Wet Chrome Veins / Dry Mica Host 

A dry clay surface has wet-looking chrome veins running through it, and the clay is dusted with 
dry mica. 

●  host = matte beige/purple clay 
●  veins = continuous wet metallic gradients 
●  dust = tiny dry mica sparkle 
●  vein edges = wet bloom 
●  dust avoids the wet veins or gathers along their edges 

This contrast is stupid good. 

 
 
 
 
 
 
 

RepoScripter instruction 

Distinguish wet shine from dry shine. Wet shine should be continuous, glossy, bloomy, and 
gradient-based. Dry shine should be granular, clustered, flaky, and intermittent. Use both in one 
design to create material tension. 

Cross-breeding these five 

These systems combine brutally well. 

Metallic Gradient Structure Map + Shine Weather  anodized titanium weather radar 

Contours show pressure bands, but every contour is metallic and reflective. 

Infrastructure + Embroidery  fiber-optic sutured subway map 

A transit network sewn into matte material with pulsing light beads. 

Wet/Dry + Kintsugi  dry ceramic cracks filled with wet chrome resin and crusted mica 

The crack fill is wet shine, the surrounding residue is dry sparkle. 

Tessellation + Wet/Dry  hex tile field with wet holographic grout and dry pearl-powder tile faces 

The seams shine continuously; the cells shimmer granularly. 

 
 
 
 
 
 
 

Weather + Glitter Ecology  sparkle precipitation map 

Glitter appears as storms, not decoration. 

Useful master pattern 

For all 5 of these, a strong render pipeline is: 

1. Draw quiet host surface 
2. Generate a structural field/network/path 
3. Assign optical material behavior to that structure 
4. Add hierarchy: 
   - broad sheen 
   - medium colored shine 
   - tiny particles 
   - rare white glints 
5. Let mouse act as light source / pressure / scanner 

Repo doctrine block 

Shine should be system-specific. 

Metallic gradients should reveal height, angle, pressure, or structural zones. 
Weather shine should move as fronts, contours, storms, and thresholds. 
Infrastructure shine should connect, route, transmit, pulse, or leak. 
Embroidery shine should appear stitched, beaded, sutured, or tensioned into the host. 
Wet and dry shine must be visually distinct: wet is continuous and glossy; dry is particulate and 
intermittent. 

Say next and I’ll keep going into the next shiny-system batch.