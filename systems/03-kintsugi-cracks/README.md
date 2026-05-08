# ✦ System 03

3. KINTSUGI / CRACKS / SEAMS AS 
SHINE 

Idea 

Cracks, breaks, repair lines, and seams become the place where color and brilliance live. 

Examples: 

●  cracked porcelain with opal repair 
●  matte tile with chrome grout 
●  dry clay with holographic fault lines 
●  scar tissue with glitter fill 
● fractured acrylic with rainbow-pressure seam 

 
 
 
 
 

Concept / principle 

This is one of the strongest shine principles:  shine loves boundaries 

A crack is already: 

●  a line 
●  an interruption 
●  a contrast zone 
●  a place where inside meets outside 
●  a route through the object 

So if you fill the crack with: 

● 
foil 
●  chrome 
●  opal resin 
●  glitter lacquer 
●  pearlescent plasma  you get an immediate “of course.” 

How it works 

You need: 

●  a host surface 
●  a crack/seam network 
●  a bright filling material 
●  maybe some edge staining / halos / raised lip 

The shiny subsystem does not cover the whole thing; it occupies the damage topology. 

Why it works visually 

Because it has: 

●  emotional logic 

 
 
 

●  structural logic 
●  compositional logic 

Cracks create natural line-work. 
Line-work carries shine beautifully. 
So the result feels both decorative and inevitable. 

Goal 

Make the breakage feel like: 

●  power leakage 
●  divine repair 
●  disease 
● 
treasure 
●  geology 
●  history 
●  surgery 
●  sacred engineering 

Good system choices 

●  Voronoi fracture 
●  recursive crack propagation 
●  subdivision splits 
●  stress maps 
●  cell border extraction 
●  reaction-diffusion ridge extraction 
●  random-walk crack fields 

Simple crack generator snippet  const cracks = [];  function seedCracks(cx, cy, branches = 8) { 
  for (let i = 0; i < branches; i++) { 
    cracks.push({ 
      x: cx, 

 
 
 
 

      y: cy, 
      angle: (Math.PI * 2 * i) / branches + (Math.random() - 0.5) * 0.3, 
      life: 80 + Math.random() * 120, 
      width: 2 + Math.random() * 2 
    }); 
  } 
}  function stepCracks(ctx) { 
  const next = []; 
  for (const c of cracks) { 
    if (c.life <= 0) continue; 

    const nx = c.x + Math.cos(c.angle) * (1.5 + Math.random() * 1.5); 
    const ny = c.y + Math.sin(c.angle) * (1.5 + Math.random() * 1.5); 

    // dark host fracture line 
    ctx.strokeStyle = "rgba(0,0,0,0.18)"; 
    ctx.lineWidth = c.width + 2; 
    ctx.beginPath(); 
    ctx.moveTo(c.x, c.y); 
    ctx.lineTo(nx, ny); 
    ctx.stroke(); 

    // shiny seam fill 
    drawSeamGlow(ctx, c.x, c.y, nx, ny, c.width); 

    next.push({ 
      ...c, 
      x: nx, 
      y: ny, 
      angle: c.angle + (Math.random() - 0.5) * 0.35, 
      life: c.life - 1, 
      width: c.width * 0.995 
    }); 

    if (Math.random() < 0.04 && c.width > 0.7) { 
      next.push({ 
        x: nx, 
        y: ny, 
        angle: c.angle + 0.8 * (Math.random() < 0.5 ? -1 : 1), 
        life: c.life * 0.6, 
        width: c.width * 0.7 
      }); 

 
 
 
 
 
 

    } 
  } 
  cracks.length = 0; 
  cracks.push(...next); 
} 

And then the seam renderer. 

Shiny seam renderer snippet  function drawSeamGlow(ctx, x1, y1, x2, y2, w) { 
  const hue = 180 + 120 * Math.sin((x1 + y1) * 0.01); 

  // diffuse glow 
  ctx.strokeStyle = `hsla(${hue},100%,65%,0.08)`; 
  ctx.lineWidth = w * 5; 
  ctx.beginPath(); 
  ctx.moveTo(x1, y1); 
  ctx.lineTo(x2, y2); 
  ctx.stroke(); 

  // metallic core 
  ctx.strokeStyle = `hsla(${hue},100%,70%,0.85)`; 
  ctx.lineWidth = Math.max(1, w); 
  ctx.beginPath(); 
  ctx.moveTo(x1, y1); 
  ctx.lineTo(x2, y2); 
  ctx.stroke(); 

  // specular hot strip 
  ctx.strokeStyle = "rgba(255,255,255,0.35)"; 
  ctx.lineWidth = 1; 
  ctx.beginPath(); 
  ctx.moveTo(x1, y1); 
  ctx.lineTo(x2, y2); 
  ctx.stroke(); 
} 

Better version later 

 
 
 
 
 
 
 

This becomes really strong if you add:  raised lips beside the seam 
● 
● 
local metallic gradients 
●  sparkle at intersections 
●  pressure halos 
●  differential crack thickness 
●  embedded “glow under glaze” feel