# ✦ Showcase Build 17

17. MIRROR DUST DUNES 

Idea 

A matte powder desert where tiny reflective flakes settle into dune structures. 

Not glitter rain. 
Not glitter veins. 
This is dry shine as sediment. 

Think:  soft dusty surface 

+  wind-shaped mirror particles 

+  rare harsh glints on dune crests 

Concept / principle 

 
 
 

The principle:  dry shine accumulates where flow deposits it 

Mirror dust should not be evenly distributed. It should form: 

●  drift lines 
●  dunes 
● 
ridges 
●  bare valleys 
●  sparkle crests 
● fine powder fields 

The shine is granular and dry. 

How it works 

Build a height/sediment field. 

Use a directional wind term:  sediment = fBm field stretched along wind direction 

Then: 

●  dune crests get bright metallic dust 
●  valleys stay matte 
● rare mirror flakes flash along slope-facing direction 

Why it works 

Dry particles in real life collect based on airflow, friction, slope, and obstruction. 

Even fake math gives sparkle a physical cause:  the surface sparkles because reflective dust settled there 

 
 
 
 
 

Goal 

Make the viewer feel:  this shine is powder, not liquid 

It should feel dusty, granular, scratchy, and intermittent. 

Code principle 

Use an anisotropic field: 

●  one direction stretched 
●  one direction compressed 
●  contour-ish crests 
●  glitter only on high slope/crest zones 

Dune field  function duneField(x, y, time) { 

  // Wind-stretched coordinates. 

  const windX = x * 0.009 + time * 0.025; 

  const windY = y * 0.028 + Math.sin(x * 0.004) * 0.7; 

  const broad = fbmWeather(windX, windY); 

  const ripples = Math.sin(x * 0.03 + broad * 7.0 + time * 0.4) * 0.5 + 0.5; 

  const fine = fbmWeather(x * 0.07, y * 0.07); 

 
 
 
 
 
 

  return broad * 0.55 + ripples * 0.32 + fine * 0.13; 

} 

Draw matte powder host plus dune shine  function drawMirrorDustDunes(ctx, w, h, time) { 

  const step = 2; 

  // dusty matte base 

  ctx.fillStyle = "rgb(29,25,32)"; 

  ctx.fillRect(0, 0, w, h); 

  for (let y = 0; y < h; y += step) { 

    for (let x = 0; x < w; x += step) { 

      const v = duneField(x, y, time); 

      // slope/crest detection 

      const vx = duneField(x + 3, y, time) - duneField(x - 3, y, time); 

      const vy = duneField(x, y + 3, time) - duneField(x, y - 3, time); 

      const slope = Math.sqrt(vx * vx + vy * vy); 

      // matte sand/powder 

      const shade = 18 + v * 28; 

      ctx.fillStyle = `rgba(${shade + 8},${shade + 2},${shade + 14},0.55)`; 

 
 
 
 
 
 

      ctx.fillRect(x, y, step, step); 

      // mica shimmer on crests 

      if (v > 0.58 && slope > 0.06 && Math.random() < 0.12) { 

        const hue = (210 + v * 90 + slope * 700) % 360; 

        const flash = Math.pow(Math.max(0, vx * 8 + 0.4), 2); 

        ctx.fillStyle = `hsla(${hue},80%,${55 + flash * 35}%,${0.10 + flash * 0.55})`; 

        ctx.fillRect(x, y, 1, 1); 

      } 

    } 

  } 

} 

Add rare mirror flakes on crests  function drawMirrorFlakeCrests(ctx, w, h, time) { 

  for (let i = 0; i < 900; i++) { 

    const x = Math.random() * w; 

    const y = Math.random() * h; 

    const v = duneField(x, y, time); 

    if (v > 0.68 && Math.random() < 0.28) { 

      const flash = 0.5 + 0.5 * Math.sin(time * 5 + x * 0.07 + y * 0.02); 

 
 
 
 
 

      if (flash > 0.72) { 

        ctx.fillStyle = `rgba(255,255,255,${flash * 0.75})`; 

        ctx.fillRect(x, y, 2, 1); 

      } 

    } 

  } 

} 

Variations 

Cosmetic mica dunes 

Peach/lavender pearl powder. 

Black mirror dust 

Charcoal desert with silver flake ridges. 

Toy ash glitter 

Pastel ash surface with candy-colored particles. 

Wind map 

Add directional arrows or contour seams made from glitter.