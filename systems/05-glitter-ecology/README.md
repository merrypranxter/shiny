# ✦ System 05

5. GLITTER ECOLOGY / CLUSTERED 
SPARKLE SYSTEMS 

Idea 

Glitter is not evenly spread decoration. 
It behaves like a population ecology. 

There are: 

●  dense glitter blooms 
●  sparse deserts 
●  medium drift zones 
●  microdust 
● 
●  neighborhoods of similar flake types  rare explosive glints 

Examples: 

●  mirror dust dunes 
rhinestone spore clusters 
● 
●  cosmetic sparkle weather 
●  glitter mold colonies 
●  metallic pollen drift 
● reflective sediment bars 

Concept / principle 

 
 

The principle is:  sparkle gets better when its distribution has intelligence 

Uniform sparkle is dead. 
Clustered sparkle feels: 

●  organic 
●  spatially believable 
●  precious 
●  atmospheric 
●  alive 

How it works 

Use a hierarchical density field. 

Not: 

● random sparkle everywhere 

Instead: 

●  broad cluster regions 
● 
● 
●  with rare starbursts  inside them, medium glitter concentration 
inside those, tiny bright flakes 

This is scale nesting. 

Why it works visually 

Because real shiny particulate materials are not uniform: 

●  glitter settles 
●  powders clump 
● 
flakes gather 
●  some regions expose more sparkle 
●  some regions are worn down 
●  some glints dominate 

 
 
 

So clustered sparkle feels richer and more believable. 

Goal 

Build a sparkle field with: 

●  population structure 
● 
rarity 
●  hierarchy 
●  surprise 
●  directional flashes 

Good system choices  fBm density masks 

● 
●  multifractals 
●  blue-noise points inside cluster masks 
●  Voronoi weighted populations 
● 
●  erosion / deposition logic 
●  point-family classes  layered hash thresholds 

Very useful sparkle hierarchy  layer 1: region mask 

Where sparkle is even allowed.  layer 2: cluster mask 

Where it’s common.  layer 3: flake placement 

Actual particles.  layer 4: flash logic 

 
 
 

Only some flakes flare strongly. 

JS-ish sparkle field example  function hash2(x, y) { 
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123; 
  return n - Math.floor(n); 
}  function pseudoFbm(x, y) { 
  let v = 0; 
  let a = 0.5; 
  let f = 1; 
  for (let i = 0; i < 4; i++) { 
    v += a * hash2(Math.floor(x * f), Math.floor(y * f)); 
    f *= 2; 
    a *= 0.5; 
  } 
  return v; 
}  function drawSparkleField(ctx, width, height, time) { 
  for (let y = 0; y < height; y += 3) { 
    for (let x = 0; x < width; x += 3) { 
      const cluster = pseudoFbm(x * 0.01, y * 0.01);   // broad ecology 
      const local = hash2(x, y);                       // local flake chance 

      if (cluster > 0.58 && local > 0.985) { 
        const shimmer = 0.5 + 0.5 * Math.sin(time * 3 + x * 0.02 + y * 0.01); 
        const size = local > 0.997 ? 3 : 1; 

        ctx.fillStyle = `rgba(255,255,255,${0.2 + shimmer * 0.8})`; 
        ctx.fillRect(x, y, size, size); 

        // rare starburst 
        if (local > 0.9985) { 
          ctx.strokeStyle = `rgba(255,255,255,${0.4 + shimmer * 0.4})`; 
          ctx.beginPath(); 
          ctx.moveTo(x - 4, y); 
          ctx.lineTo(x + 4, y); 
          ctx.moveTo(x, y - 4); 
          ctx.lineTo(x, y + 4); 

 
 
 
 
 
 

          ctx.stroke(); 
        } 
      } 
    } 
  } 
} 

That alone gives you way smarter glitter than random confetti. 

Better version later 

Eventually this wants: 

●  multiple flake species 
●  colored metallic flakes 
●  angle-sensitive flashes 
● 
local alignment families 
●  particle size classes 
●  motion / settling / clustering 
●  worn / abraded regions 

PRINCIPLE BLOCK FOR THIS WHOLE SET 

These 5 directions all share one core truth: 

Shine should occupy structure. 

That structure may be: 

●  a vein 
●  an edge 
●  a crack 
●  a seam 
●  a hidden network 
●  a clustered ecology 
●  a tessellated line system 

 
 
 
 

But the moment shine has a job, it gets better. 

If you want, say next and I’ll do the next batch. I’d suggest the next 5 be: 

6.  Metallic Gradient Structure Maps 
7.  Shine-As-Weather / Contour Systems 
8.  Infrastructure Made of Brilliance 
9.  Shine-As-Embroidery / Suturing 
10. Wet Shine vs Dry Shine as a design system