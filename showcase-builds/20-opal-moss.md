# ✦ Showcase Build 20

20. OPAL MOSS 

Idea 

A fuzzy matte moss colony whose tips flash like opal, pearl, mica, or beetle shell. 

The host is soft and dull. 
The growth tips are precious. 

Think:  dark velvet moss 

+  tiny rounded growths 

+  green/violet/blue opal flashes 

 
 

Concept / principle 

The principle:  shine appears at biological tips 

Moss has many small elements. If every element shines equally, it becomes noise. Better: 

●  stems are dull 
●  old growth is matte 
● 
fresh tips are iridescent 
●  clusters flash in waves 

This gives shine an ecological role. 

How it works 

Use clustered point/growth field: 

Moss bed 

Dense short marks or dots. 

Colony clusters  fBm mask controls where moss grows. 

Tip highlights 

Only selected upper/tip particles receive opal shine. 

Glint waves 

Time causes clusters to shimmer. 

 
 
 
 
 

Why it works 

Moss is textural and absorptive. Opal is precious and reflective. 

Together:  soft biology with mineral light at its growth edge 

Very good cute-weird shiny surface. 

Goal 

Make the viewer feel:  the moss is growing tiny jewels instead of spores 

Code principle 

Draw many tiny strokes/ellipses: 

●  dark base particles 
●  colored growth particles 
●  opal tip dots 
rare glints 
● Use cluster mask to avoid uniform coverage. 

Moss cluster field  function mossDensity(x, y, time) { 

  return ( 

    0.60 * fbmWeather(x * 0.008, y * 0.008) + 

 
 
 
 
 

    0.25 * fbmWeather(x * 0.025 + time * 0.01, y * 0.025) + 

    0.15 * fbmWeather(x * 0.08, y * 0.08) 

  ); 

} 

Draw opal moss  function drawOpalMoss(ctx, w, h, time) { 

  ctx.fillStyle = "rgb(5,8,7)"; 

  ctx.fillRect(0, 0, w, h); 

  const count = 9000; 

  for (let i = 0; i < count; i++) { 

    const x = Math.random() * w; 

    const y = Math.random() * h; 

    const d = mossDensity(x, y, time); 

    if (d < 0.42 || Math.random() > d) continue; 

    const len = 2 + d * 7 * Math.random(); 

    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.2; 

    const x2 = x + Math.cos(angle) * len; 

    const y2 = y + Math.sin(angle) * len; 

 
 
 
 
 
 

    // dull moss fiber 

    const green = 25 + d * 70; 

    ctx.strokeStyle = `rgba(${green * 0.35},${green},${green * 0.62},0.22)`; 

    ctx.lineWidth = 1; 

    ctx.beginPath(); 

    ctx.moveTo(x, y); 

    ctx.lineTo(x2, y2); 

    ctx.stroke(); 

    // opal tip, not on every fiber 

    if (d > 0.56 && Math.random() < 0.16) { 

      const phase = time * 2.2 + x * 0.03 + y * 0.017; 

      const hue = (150 + 90 * Math.sin(phase) + 70 * d) % 360; 

      const flash = 0.45 + 0.55 * Math.sin(phase + i); 

      ctx.fillStyle = `hsla(${hue},100%,${62 + flash * 28}%,${0.25 + flash * 0.55})`; 

      ctx.beginPath(); 

      ctx.arc(x2, y2, 1.2 + flash * 1.3, 0, Math.PI * 2); 

      ctx.fill(); 

      if (flash > 0.93) { 

        ctx.strokeStyle = "rgba(255,255,255,0.65)"; 

        ctx.beginPath(); 

 
 
 
 

        ctx.moveTo(x2 - 4, y2); 

        ctx.lineTo(x2 + 4, y2); 

        ctx.moveTo(x2, y2 - 4); 

        ctx.lineTo(x2, y2 + 4); 

        ctx.stroke(); 

      } 

    } 

  } 

} 

Add velvet shadow patches  function drawMossShadowPockets(ctx, w, h) { 

  for (let i = 0; i < 30; i++) { 

    const x = Math.random() * w; 

    const y = Math.random() * h; 

    const r = 40 + Math.random() * 120; 

    const g = ctx.createRadialGradient(x, y, 0, x, y, r); 

    g.addColorStop(0, "rgba(0,0,0,0.28)"); 

    g.addColorStop(1, "rgba(0,0,0,0)"); 

    ctx.fillStyle = g; 

    ctx.beginPath(); 

 
 
 
 

    ctx.arc(x, y, r, 0, Math.PI * 2); 

    ctx.fill(); 

  } 

} 

Variations 

Luxury moss 

Deep green velvet with champagne opal tips. 

Alien lawn 

Black/violet moss with cyan/pink opal flash. 

Cute terrarium 

Pastel moss, pearl tips, tiny glitter dew. 

Mold crossover 

Opal moss tips become glitter spores. 

Cross-mutations for this batch 

Glitter Weather + Mirror Dust Dunes  a windstorm deposits reflective dust into moving dune crests 

Caustic Rainforest + Opal Moss 

 
 
 
  opal moss only flashes when caustic light passes over it 

Oil Slick Pond + Glitter Weather  sparkle rain falls into an oil slick and creates spectral ripple blooms 

Mirror Dust Dunes + Oil Slick Pond  dry reflective dunes interrupted by wet iridescent puddles 

Opal Moss + Glitter Weather  a storm causes moss tips to release glitter pollen 

RepoScripter doctrine for this batch 

For ecology and weather shine designs, optical behavior must be field-driven. 

Use: 

- glitter as precipitation 

- mirror dust as sediment 

- caustics as projected light ecology 

- oil slick as film thickness 

- opal moss as biological tip shine 

 
 
 
 
 
 
 

Do not distribute sparkle uniformly. 

Make shine gather according to wind, pressure, growth, liquid film, or light projection. 

Say next and I’ll keep going with the next showcase builds.