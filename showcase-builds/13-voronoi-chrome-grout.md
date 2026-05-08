# ✦ Showcase Build 13

13. VORONOI CHROME GROUT 

Idea 

A matte tile field where the grout lines between cells are filled with liquid colorful chrome. 

 
 
 

The tiles are quiet. 
The seams are insane. 

Think:  matte ceramic cells 

+  liquid anodized metal grout 

+  white glints at intersections 

Concept / principle 

The principle:  shine lives between territories 

This is different from making the cells shiny. 

The cells can be: 

●  chalky 
●  paper-like 
●  clay 
●  bone 
●  dull rubber 

The borders carry all the brilliance. 

That gives clean design contrast. 

How it works 

True Voronoi border extraction can be heavy, but there are two easy JS5 approaches: 

 
 
 
 

Option A: nearest-cell edge detection 

For each pixel, find nearest and second-nearest seed points. Where their distances are close, 
draw chrome grout. 

Option B: connect Delaunay-ish neighbor lines 

Cheaper but less true. 

Option A looks more like real grout. 

Why it works 

Cell boundaries are natural places for shine because they are: 

●  seams 
● 
joins 
●  borders 
●  cracks 
●  network edges 

The viewer reads the chrome as a material between pieces. 

Goal 

Make it feel like:  a matte mosaic held together by impossible liquid metal 

Generate seeds  function makeVoronoiSeeds(w, h, count) { 

  const seeds = []; 

 
 
 
 
 

  for (let i = 0; i < count; i++) { 

    seeds.push({ 

      x: Math.random() * w, 

      y: Math.random() * h, 

      hue: Math.random() * 360, 

      id: i 

    }); 

  } 

  return seeds; 

} 

Nearest two distances  function nearestTwoSeeds(x, y, seeds) { 

  let d1 = Infinity; 

  let d2 = Infinity; 

  let s1 = null; 

  let s2 = null; 

  for (const s of seeds) { 

    const dx = x - s.x; 

    const dy = y - s.y; 

    const d = dx * dx + dy * dy; 

 
 
 
 

    if (d < d1) { 

      d2 = d1; 

      s2 = s1; 

      d1 = d; 

      s1 = s; 

    } else if (d < d2) { 

      d2 = d; 

      s2 = s; 

    } 

  } 

  return { d1: Math.sqrt(d1), d2: Math.sqrt(d2), s1, s2 }; 

} 

Draw matte cells + chrome grout  function drawVoronoiChromeGrout(ctx, w, h, seeds, time) { 

  const step = 3; 

  for (let y = 0; y < h; y += step) { 

    for (let x = 0; x < w; x += step) { 

      const n = nearestTwoSeeds(x, y, seeds); 

      const gap = n.d2 - n.d1; 

 
 
 
 
 

      // gap small = boundary/grout 

      const grout = Math.max(0, 1 - gap / 8); 

      if (grout > 0.08) { 

        const hue = ((n.s1.hue + n.s2.hue) * 0.5 + time * 40 + grout * 120) % 360; 

        const hot = Math.pow(grout, 6); 

        ctx.fillStyle = `hsl(${hue},100%,${25 + grout * 45 + hot * 25}%)`; 

        ctx.fillRect(x, y, step, step); 

        if (hot > 0.55) { 

          ctx.fillStyle = `rgba(255,255,255,${hot * 0.5})`; 

          ctx.fillRect(x, y, 1, 1); 

        } 

      } else { 

        // matte tile body 

        const shade = 24 + (n.s1.id % 7) * 3; 

        ctx.fillStyle = `rgb(${shade},${shade - 2},${shade + 7})`; 

        ctx.fillRect(x, y, step, step); 

      } 

    } 

  } 

} 

 
 
 
 

Add intersection jewels 

Voronoi triple points are harder to detect perfectly, but fake it by drawing small jewels at some 
seed-neighbor midpoints or random high-grout samples.  function drawChromeGroutJewels(ctx, w, h, time) { 

  for (let i = 0; i < 90; i++) { 

    const x = Math.random() * w; 

    const y = Math.random() * h; 

    if (Math.random() < 0.18) { 

      const r = 2 + Math.random() * 4; 

      const hue = (180 + i * 29 + time * 30) % 360; 

      const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r * 3); 

      g.addColorStop(0, "rgba(255,255,255,0.9)"); 

      g.addColorStop(0.3, `hsla(${hue},100%,70%,0.45)`); 

      g.addColorStop(1, "rgba(0,0,0,0)"); 

      ctx.fillStyle = g; 

      ctx.beginPath(); 

      ctx.arc(x, y, r * 3, 0, Math.PI * 2); 

      ctx.fill(); 

    } 

 
 
 
 
 

  } 

} 

Variations 

Bone ceramic + oil-slick grout 

Warm matte cells, rainbow dark seams. 

Black rubber + chrome lava grout 

Deep matte black cells, violent silver/rainbow seams. 

Candy tile map 

Pastel matte cells, neon metallic grout. 

Bio-mosaic 

Cellular organic pattern with shiny intercellular fluid.