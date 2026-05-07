# ✦ Showcase Build 25

25. FOIL RUST 

Idea 

Rust, but instead of orange-brown corrosion, the oxidation produces crumbling rainbow foil. 

A matte metal or paper surface is being eaten by shiny, brittle, iridescent corrosion. 

Think:  dull corroded plate 

+  rainbow foil flakes 

+  cracked metallic oxidation crust 

Concept / principle 

The principle:  decay exposes unstable reflective layers 

Rust normally dulls and destroys shine. 
Foil rust does the opposite: decay creates weird brilliance. 

 
 
 
 

It should feel: 

● 
flaky 
●  brittle 
●  peeling 
●  crusted 
●  sharp 
●  colorful 
●  partially detached 

How it works 

Use a corrosion field. 

Map it to:  low corrosion      -> dull host  medium corrosion   -> stained halo  high corrosion     -> rainbow foil crust  edge of corrosion  -> cracked bright flakes  peak corrosion     -> white foil glints 

Add polygon flakes or rectangular shards. 

Why it works 

This flips the expectation:  decay is supposed to dull the surface,  but here decay manufactures color-shine 

That makes it weird and visually fresh. 

 
 
 
 

Goal 

Make shine feel:  brittle, oxidized, peeling, and chemically wrong 

Corrosion field  function corrosionField(x, y, time) { 

  return ( 

    0.55 * moldFbm(x * 0.007 + time * 0.008, y * 0.007) + 

    0.30 * moldFbm(x * 0.025, y * 0.025 - time * 0.006) + 

    0.15 * moldFbm(x * 0.09, y * 0.09) 

  ); 

} 

Draw foil rust base  function drawFoilRust(ctx, w, h, time) { 

  const step = 3; 

  // dull oxidized host 

  ctx.fillStyle = "rgb(21,19,18)"; 

  ctx.fillRect(0, 0, w, h); 

 
 
 
 
 
 

  for (let y = 0; y < h; y += step) { 

    for (let x = 0; x < w; x += step) { 

      const c = corrosionField(x, y, time); 

      if (c > 0.38 && c < 0.58) { 

        // stained matte oxidation halo 

        const rust = (c - 0.38) / 0.20; 

        ctx.fillStyle = `rgba(${70 + rust * 45},${38 + rust * 15},${28 + rust * 30},${0.12 + rust * 
0.18})`; 

        ctx.fillRect(x, y, step, step); 

      } 

      if (c >= 0.58) { 

        // rainbow foil crust 

        const edge = Math.max(0, 1 - Math.abs(c - 0.58) * 18); 

        const hue = (210 + c * 270 + time * 18 + x * 0.08) % 360; 

        const shine = Math.pow(Math.abs(Math.sin(c * 20 + x * 0.05 - y * 0.03)), 8); 

        ctx.fillStyle = `hsl(${hue},100%,${18 + c * 42 + shine * 32}%)`; 

        ctx.fillRect(x, y, step, step); 

        if (edge > 0.4 || shine > 0.85) { 

          ctx.fillStyle = `rgba(255,255,255,${0.12 + Math.max(edge, shine) * 0.35})`; 

          ctx.fillRect(x, y, 1, 1); 

 
 
 
 
 

        } 

      } 

    } 

  } 

  drawFoilFlakes(ctx, w, h, time); 

} 

Draw peeling foil flakes  function drawFoilFlakes(ctx, w, h, time) { 

  for (let i = 0; i < 180; i++) { 

    const x = Math.random() * w; 

    const y = Math.random() * h; 

    const c = corrosionField(x, y, time); 

    if (c < 0.60 || Math.random() > 0.35) continue; 

    const size = 3 + Math.random() * 12; 

    const angle = Math.random() * Math.PI; 

    const hue = (180 + c * 240 + i * 17 + time * 20) % 360; 

    ctx.save(); 

    ctx.translate(x, y); 

 
 
 
 
 
 

    ctx.rotate(angle); 

    const grad = ctx.createLinearGradient(-size, -size, size, size); 

    grad.addColorStop(0, `hsl(${hue},100%,16%)`); 

    grad.addColorStop(0.35, `hsl(${hue + 70},100%,65%)`); 

    grad.addColorStop(0.48, "rgba(255,255,255,0.9)"); 

    grad.addColorStop(1, `hsl(${hue + 170},100%,25%)`); 

    ctx.fillStyle = grad; 

    ctx.beginPath(); 

    ctx.moveTo(-size, -size * 0.4); 

    ctx.lineTo(size * 0.8, -size * 0.15); 

    ctx.lineTo(size * 0.35, size * 0.55); 

    ctx.lineTo(-size * 0.7, size * 0.3); 

    ctx.closePath(); 

    ctx.fill(); 

    ctx.strokeStyle = "rgba(0,0,0,0.35)"; 

    ctx.stroke(); 

    ctx.restore(); 

  } 

} 

 
 
 
 
 

Variations 

Rainbow oxidation plate 

Dark metal, cyan/magenta/yellow foil crust. 

Sticker foil rot 

Paper sticker surface where foil backing oxidizes outward. 

Candy wrapper rust 

Metallic candy wrapper crumbling into bright corrosion. 

Sacred decay 

Foil rust grows along sigils or seams. 

Cross-mutations for this batch 

Glitter Mold + Chrome Pollen  mold colonies release reflective pollen into the air 

Lip-Gloss Spill + Glitter Mold  gloss puddle becomes nutrient medium for glitter mold 

Sequin Mildew + Foil Rust  sequin colonies grow on brittle rainbow oxidation crust 

 
 
 
 
 

Chrome Pollen + Lip Gloss  dry mirror pollen gets trapped inside wet cosmetic oil 

Foil Rust + Glitter Mold  rainbow corrosion blooms with glitter spore heads 

RepoScripter doctrine for this batch 

For residue and contamination shine designs, shine must be the trace of a process. 

Use: 

- glitter as mold spores 

- chrome particles as pollen or mirror dust 

- lip gloss as wet spill behavior 

- sequins as mildew cells 

- rainbow foil as chemical rust 

Do not scatter sparkle randomly. 

Make the shine bloom, settle, spill, oxidize, or reproduce. 

Say next and I’ll keep going with the next showcase builds.