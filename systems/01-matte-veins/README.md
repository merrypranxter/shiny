# ✦ System 01

1. MATTE HOST + BRILLIANT VEINS 

Idea 

A mostly dull, quiet, tactile surface gets interrupted by veins of intense optical activity. 

Examples: 

●  black velvet + holographic capillaries 

 
 

●  chalk plaster + glitter bloodstream 
●  ceramic + opal cracks 
●  matte latex + chrome nerves 
●  stone + molten metallic seams 

Concept / principle 

The principle is contrast of energy states. 

The host is: 

●  absorbent 
●  soft 
●  dry 
●  deadened 
● 
●  stable  low specular 

The veins are: 

● 
reflective 
●  wet-looking 
luminous 
● 
●  active 
●  precious 
●  dynamic 

So instead of a whole image being “shiny,” the shine has a territory. 

That’s what makes it feel designed. 

How it works 

You need two systems: 

A. the host surface 

This gives the broad matte substrate: 

●  subtle roughness 
● low-contrast texture 

 
 

●  maybe powder, velvet, chalk, clay, skin, paper, foam 

B. the vein network 

This is the optical subsystem: 

●  branching channels 
●  capillaries 
●  crack-like routes 
●  circulation 
● 
root logic 
●  nerve logic 

The shine is concentrated inside the network. 

Why it works visually 

Because the eye loves: 

●  boundary contrast 
interruption 
● 
● 
“hidden system revealed” 
●  quiet/loud material pairings 

This also gives you narrative for free:  something is flowing 
something is alive 
something is embedded 
something is leaking brilliance through a dead shell 

That’s why this direction feels so rich. 

Goal 

The goal is not “sparkly texture.” 

The goal is:  make shine feel like an internal infrastructure 

 
 
 

You want the viewer to feel like the shiny part is: 

●  carrying information 
●  carrying power 
●  carrying fluid 
●  carrying infection 
●  carrying luxury 
●  carrying magic 

Good system choices 

Best math / generative systems for veins:  flow tracing 

●  L-system branching 
● 
●  slime-mold / nutrient network logic 
●  reaction-diffusion skeletons 
●  distance-transform ridges 
●  DLA branches 
●  Voronoi seam extraction 
●  gradient ascent/descent paths 

Implementation strategy 

Host 

Use low-contrast multi-scale texture. 

Vein mask 

Generate a branching mask or field. 

Shine response 

Inside the vein mask, layer: 

●  color-shifting gradient 
fresnel-like edge glow 
● ●  glitter points 
● 
tiny star glints 
●  wet highlight band 
●  occasional pulse 

JS-ish code sketch: vein mask via branching walkers  const veins = [];  function seedVeins(count, w, h) { 
  for (let i = 0; i < count; i++) { 
    veins.push({ 
      x: w * (0.3 + 0.4 * Math.random()), 
      y: h * (0.3 + 0.4 * Math.random()), 
      angle: Math.random() * Math.PI * 2, 
      life: 120 + Math.random() * 180, 
      thickness: 2 + Math.random() * 5, 
      depth: 0 
    }); 
  } 
}  function stepVeins(ctx) { 
  const next = []; 
  for (const v of veins) { 
    if (v.life <= 0 || v.thickness < 0.5) continue; 

    const nx = v.x + Math.cos(v.angle) * 2.0; 
    const ny = v.y + Math.sin(v.angle) * 2.0; 

    // matte-host underpainting can be separate; here we're drawing the vein 
    ctx.lineWidth = v.thickness; 
    ctx.strokeStyle = `rgba(255,255,255,0.06)`; 
    ctx.beginPath(); 
    ctx.moveTo(v.x, v.y); 
    ctx.lineTo(nx, ny); 
    ctx.stroke(); 

    next.push({ 
      ...v, 
      x: nx, 
      y: ny, 

 
 
 
 
 
 

      angle: v.angle + (Math.random() - 0.5) * 0.28, 
      life: v.life - 1, 
      thickness: v.thickness * 0.995 
    }); 

    // branching 
    if (Math.random() < 0.025 && v.depth < 5) { 
      next.push({ 
        x: nx, 
        y: ny, 
        angle: v.angle + 0.6 + Math.random() * 0.5, 
        life: v.life * 0.7, 
        thickness: v.thickness * 0.72, 
        depth: v.depth + 1 
      }); 
    } 
    if (Math.random() < 0.025 && v.depth < 5) { 
      next.push({ 
        x: nx, 
        y: ny, 
        angle: v.angle - 0.6 - Math.random() * 0.5, 
        life: v.life * 0.7, 
        thickness: v.thickness * 0.72, 
        depth: v.depth + 1 
      }); 
    } 
  } 
  veins.length = 0; 
  veins.push(...next); 
} 

That gives structure only. Then put shine into it. 

Shine-on-vein snippet  function drawShinyVeinStroke(ctx, x1, y1, x2, y2, t, hueBase) { 
  // soft glow underlayer 
  ctx.strokeStyle = `hsla(${hueBase}, 100%, 70%, 0.08)`; 
  ctx.lineWidth = t * 3.0; 
  ctx.beginPath(); 
  ctx.moveTo(x1, y1); 

 
 
 

  ctx.lineTo(x2, y2); 
  ctx.stroke(); 

  // bright core 
  ctx.strokeStyle = `hsla(${hueBase + 40*Math.sin(x1*0.01+y1*0.01)}, 100%, 75%, 0.85)`; 
  ctx.lineWidth = t; 
  ctx.beginPath(); 
  ctx.moveTo(x1, y1); 
  ctx.lineTo(x2, y2); 
  ctx.stroke(); 

  // glitter hits 
  if (Math.random() < 0.08) { 
    ctx.fillStyle = `rgba(255,255,255,0.95)`; 
    ctx.fillRect(x2 - 1, y2 - 1, 2, 2); 
  } 
} 

Better version later 

Eventually this wants: 

●  branch mask in an offscreen buffer 
●  gradient-based fake normals 
●  angle-sensitive color shift 
●  clustered sparkle on junctions 
●  pulse propagation traveling through branches 

That’s the deluxe version.