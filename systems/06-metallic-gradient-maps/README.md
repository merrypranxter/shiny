# ✦ System 06

6. METALLIC GRADIENT STRUCTURE 
MAPS 

Idea 

A diagram, map, field, or surface where the meaningful structure is shown through metallic 
color gradients. 

 
 
 
 

Not a normal gradient. 
Not a background gradient. 
A metallic gradient that encodes system behavior. 

Examples: 

● 
topographic ridges in anodized titanium color 
●  contour maps made of chrome rainbow bands 
●  vein maps with molten metal hue shifts 
●  cellular fields with pearlescent directional gradients 
●  weird weather map made from reflective color strata 
●  abstract machinery with each part assigned a different metal-flop gradient 

Concept / principle 

The principle:  metallic color is not fill — metallic color is information 

A normal color gradient says:  pretty transition 

A metallic structural gradient says:  this part is angled 
this part is raised 
this seam is under pressure 
this area is changing material phase 
this ridge catches light differently 

So the gradient is acting like a fake physics layer. 

How it works 

You usually need a scalar field or geometry field: 

●  height field 

 
 
 
 
 

●  distance field 
●  contour field 
● 
flow field 
●  cell field 
●  pressure field 
●  edge field 
●  curvature field 

Then map that field to a metallic palette. 

A metallic gradient should include: 

●  dark base 
●  saturated color band 
●  pale reflective highlight 
●  sudden white glint 
●  maybe color flip at edges 

The trick is to make it directional and contrast-heavy, not soft rainbow soup. 

Why it works visually 

Metallic gradients feel shiny because they compress value:  dark shadow 
saturated body color 
white highlight 
dark reflection band 

A good metallic surface has hard changes. 
Bad shiny gradients are too smooth. 

Metal is dramatic. It reflects the world in bands. 

So even in Canvas 2D, fake metal by layering:  shadow band + color band + white slash + dark return 

Goal 

 
 
 
 

The goal is:  make color behave like reflective topology 

You want the viewer to feel that the pattern has: 

●  height 
●  angle 
●  specular direction 
●  polished surface 
●  material zones 
●  directional light 

Good system choices  fBm height maps 

● 
●  contour maps 
●  Voronoi cells 
recursive tile maps 
● 
● 
flow-line fields 
●  distance transforms 
●  signed distance fields 
● fake normal maps from scalar fields 

Basic metallic palette function 

Useful for Canvas or shader thinking.  function metallicPalette(t, hueShift = 0) { 
  // t expected 0..1 
  t = Math.max(0, Math.min(1, t)); 

  // Make bands, not smooth mush. 
  const shine = Math.pow(Math.max(0, Math.sin(t * Math.PI)), 0.35); 
  const darkBand = Math.pow(Math.max(0, Math.sin((t + 0.42) * Math.PI * 2)), 6); 
  const hotLine = Math.pow(Math.max(0, Math.sin((t - 0.15) * Math.PI * 8)), 18); 

  const hue = (220 + hueShift + 130 * Math.sin(t * Math.PI * 2)) % 360; 
  const sat = 85 + 15 * shine; 

 
 
 
 
 

  const light = 18 + 42 * shine + 35 * hotLine - 18 * darkBand; 

  return `hsl(${hue}, ${sat}%, ${Math.max(4, Math.min(92, light))}%)`; 
} 

This gives more “anodized metal” than simple HSV rainbow. 

Fake metallic height map snippet 

This is the key move: use a height field, estimate slope, turn slope into shiny color.  function hash(x, y) { 
  return fract(Math.sin(x * 127.1 + y * 311.7) * 43758.5453); 
}  function fract(n) { 
  return n - Math.floor(n); 
}  function fbmGrid(x, y) { 
  let v = 0; 
  let a = 0.5; 
  let f = 1; 
  for (let i = 0; i < 5; i++) { 
    v += a * hash(Math.floor(x * f), Math.floor(y * f)); 
    f *= 2; 
    a *= 0.5; 
  } 
  return v; 
}  function heightAt(x, y, time) { 
  return fbmGrid(x * 0.018 + time * 0.04, y * 0.018); 
}  function drawMetallicField(ctx, w, h, time) { 
  const step = 3; 

  for (let y = 0; y < h; y += step) { 
    for (let x = 0; x < w; x += step) { 
      const z = heightAt(x, y, time); 

 
 
 
 
 
 
 
 

      const zx = heightAt(x + 4, y, time) - heightAt(x - 4, y, time); 
      const zy = heightAt(x, y + 4, time) - heightAt(x, y - 4, time); 

      // Fake directional light response. 
      const lightX = Math.cos(time * 0.4); 
      const lightY = Math.sin(time * 0.3); 
      const facing = zx * lightX + zy * lightY; 

      const band = z * 0.55 + facing * 1.8; 
      ctx.fillStyle = metallicPalette(band, time * 25); 
      ctx.fillRect(x, y, step, step); 
    } 
  } 
} 

This can become: 

●  metallic topographic surface 
●  chrome pelt 
●  anodized slime 
●  pearlescent terrain 
titanium bruise 
● Specific concept: Anodized Infection Map 

Matte dark background. 
Colored metallic regions spread like a contamination map. 
Edges get intense white/blue glints. 

Implementation: 

●  scalar field = infection density 
●  metallic palette = infected material phase 
● 
●  gradient magnitude = edge shine  threshold = visible territory  const density = heightAt(x, y, time); 
const edge = Math.abs(heightAt(x + 2, y, time) - heightAt(x - 2, y, time)) 
           + Math.abs(heightAt(x, y + 2, time) - heightAt(x, y - 2, time));  if (density > 0.48) { 
  const t = density + edge * 3.0; 

 
 
 
 
 

  ctx.fillStyle = metallicPalette(t, 80); 
  ctx.fillRect(x, y, 3, 3); 

  if (edge > 0.16) { 
    ctx.fillStyle = "rgba(255,255,255,0.35)"; 
    ctx.fillRect(x, y, 1, 1); 
  } 
} 

RepoScripter instruction 

Use metallic gradients as structural maps. 
Do not use a smooth rainbow fill. 
Compute a field, estimate its edge/slope/height, then use dark bands, saturated color bands, 
and sharp white glints to make it read as reflective metal.