# ✦ Showcase Build 21

21. GLITTER MOLD BLOOM 

Idea 

A dark matte or fuzzy surface grows mold colonies, except the fruiting bodies are holographic 
craft glitter. 

Think:  black velvet rot 

+  soft fuzzy bloom 

+  hot pink/cyan/gold glitter spores 

The mold body is dull. 
The spores are tiny violent mirrors. 

Concept / principle 

The principle:  shine appears at reproductive points 

The glitter is not randomly scattered. It is the mold’s fruiting system. 

So you get: 

●  dull colony body 
● 
fuzzy growth edge 
●  sparkling spore heads 
●  dense blooms 
●  sparse satellite colonies 
rare glitter explosions 
● How it works 

Build a colony density field:  low density   -> clean matte host  medium        -> fuzzy mold body  high edge     -> active bloom rim  peak clusters -> glitter spore heads 

Use fBm or growth walkers. 

Render layers: 

1.  matte host 
2.  soft fuzzy mold patches 
3.  colored bloom halos 
4.  glitter spores 
5.  rare star glints 

Why it works 

Mold has natural clustered growth. Glitter also looks better clustered. This concept gives glitter a 
biological reason to exist. 

The viewer reads:  this sparkle is alive and reproducing 

Goal 

Make glitter feel: 

 
 
 
 
  ecological, cute, infected, and cheap in a good way 

Not luxury. More craft-store organism. 

Mold density helper  function fract(n) { 

  return n - Math.floor(n); 

}  function hashNoise(x, y) { 

  return fract(Math.sin(x * 127.1 + y * 311.7) * 43758.5453123); 

}  function moldFbm(x, y) { 

  let v = 0; 

  let a = 0.5; 

  let f = 1; 

  for (let i = 0; i < 5; i++) { 

    v += a * hashNoise(Math.floor(x * f), Math.floor(y * f)); 

    a *= 0.5; 

    f *= 2; 

  } 

 
 
 
 
 
 

  return v; 

}  function moldDensity(x, y, time) { 

  return ( 

    0.58 * moldFbm(x * 0.006 + time * 0.012, y * 0.006) + 

    0.27 * moldFbm(x * 0.022, y * 0.022 - time * 0.01) + 

    0.15 * moldFbm(x * 0.075, y * 0.075) 

  ); 

} 

Draw fuzzy mold body  function drawGlitterMoldBloom(ctx, w, h, time) { 

  ctx.fillStyle = "rgb(5,4,8)"; 

  ctx.fillRect(0, 0, w, h); 

  const step = 3; 

  // dull fuzzy colony body 

  for (let y = 0; y < h; y += step) { 

    for (let x = 0; x < w; x += step) { 

      const d = moldDensity(x, y, time); 

 
 
 
 
 
 

      if (d > 0.42) { 

        const fuzz = Math.pow(d - 0.42, 1.4); 

        const hue = 125 + d * 80 + Math.sin(time + x * 0.01) * 25; 

        ctx.fillStyle = `hsla(${hue},55%,${18 + fuzz * 35}%,${0.10 + fuzz * 0.38})`; 

        ctx.fillRect( 

          x + (Math.random() - 0.5) * 2, 

          y + (Math.random() - 0.5) * 2, 

          step, 

          step 

        ); 

      } 

    } 

  } 

  // glitter spore layer 

  drawMoldGlitterSpores(ctx, w, h, time); 

} 

Glitter spore layer  function drawMoldGlitterSpores(ctx, w, h, time) { 

  for (let i = 0; i < 2200; i++) { 

    const x = Math.random() * w; 

 
 
 
 

    const y = Math.random() * h; 

    const d = moldDensity(x, y, time); 

    const edge = Math.abs(d - 0.56); 

    // Spores prefer bloom edge and dense colony peaks. 

    const sporeChance = 

      Math.pow(Math.max(0, d - 0.55), 2.0) * 0.23 + 

      (edge < 0.018 ? 0.08 : 0); 

    if (Math.random() < sporeChance) { 

      const hue = (300 + d * 190 + Math.random() * 90 + time * 25) % 360; 

      const flash = 0.45 + 0.55 * Math.sin(time * 8 + x * 0.03 + y * 0.02); 

      const size = Math.random() < 0.08 ? 3 : 1.5; 

      ctx.fillStyle = `hsla(${hue},100%,${62 + flash * 33}%,${0.28 + flash * 0.62})`; 

      ctx.fillRect(x, y, size, size); 

      if (flash > 0.93) { 

        drawTinyStar(ctx, x, y, 5 + Math.random() * 5); 

      } 

    } 

  } 

} 

 
 
 
 
  function drawTinyStar(ctx, x, y, r) { 

  ctx.strokeStyle = "rgba(255,255,255,0.75)"; 

  ctx.lineWidth = 1; 

  ctx.beginPath(); 

  ctx.moveTo(x - r, y); 

  ctx.lineTo(x + r, y); 

  ctx.moveTo(x, y - r); 

  ctx.lineTo(x, y + r); 

  ctx.stroke(); 

} 

Variations 

Lisa Frank rot 

Hot pink, cyan, violet spores on black fuzz. 

Bathroom sparkle mold 

Pale mint fuzz, silver/green glitter colonies. 

Velvet glitter mildew 

Deep purple velvet host, champagne glitter blooms. 

UV flashlight mode 

Mouse reveals hidden spores with cyan glow.