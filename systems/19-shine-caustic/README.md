# ✦ System 19

19. SHINE-AS-CAUSTIC PROJECTION 

Idea 

The shiny thing is not itself visible as an object. 
Instead, it creates light patterns on another surface. 

Examples: 

●  caustic quilt 
●  prism scars projected onto matte clay 
●  glitter aquarium light lace 

 
 
 

●  spectral shadows from invisible jewels 
●  stained-glass shine crawling across a wall 
●  disco-ball wounds on velvet 
●  holographic reflections from a hidden foil surface 

Concept / principle 

The principle:  shine is evidence of an unseen optical object 

This is extremely useful. 

Instead of drawing the shiny material directly, draw the light it casts, reflects, refracts, or 
concentrates. 

How it works 

Make a matte receiving surface. 

Then layer projected optical marks: 

●  caustic curves 
●  spectral patches 
radial glints 
● 
reflected streaks 
● 
●  prism bands 
●  watery lace 
●  moving light pools 
●  glitter dots 
●  colored shadows 

The invisible source can be: 

●  glass 
●  water 
jewels 
● 
●  sequins 
●  chrome foil 

 
 
 

●  prism 
●  holographic film 
●  disco ball 

Why it works visually 

It creates depth and implication. 

The viewer sees:  something outside the frame is making this light 

That expands the scene. 

It also lets you make shine delicate and atmospheric rather than object-heavy. 

Goal 

Make the shine feel like projected physics:  light has touched the scene and left spectral evidence 

Good systems  thresholded caustic ridges  flow fields 

● 
●  warped sine bands 
●  additive blending 
● 
●  prism color offsets 
●  point-light scatter 
● 
radial glint projections 
●  moving sweep beams 
● layered transparent gradients 

 
 
 
 
 

Code hook: fake caustic lace  function drawCausticLace(ctx, w, h, time) { 

  ctx.save(); 

  ctx.globalCompositeOperation = "lighter"; 

  const step = 3; 

  for (let y = 0; y < h; y += step) { 

    for (let x = 0; x < w; x += step) { 

      let u = x * 0.012; 

      let v = y * 0.012; 

      // recursive-ish warp 

      for (let i = 0; i < 4; i++) { 

        const su = Math.sin(v * 2.7 + time * 0.8 + i * 1.7); 

        const cv = Math.cos(u * 2.4 - time * 0.6 + i * 2.1); 

        u += su * 0.12; 

        v += cv * 0.12; 

      } 

      const ridgeA = Math.abs(Math.sin(u * 7.0 + Math.sin(v))); 

      const ridgeB = Math.abs(Math.sin(v * 8.0 + Math.cos(u * 1.3))); 

      const caustic = Math.pow(1 - Math.min(ridgeA, ridgeB), 8); 

 
 
 
 
 

      if (caustic > 0.18) { 

        const hue = (185 + caustic * 80 + Math.sin(time + u) * 40) % 360; 

        ctx.fillStyle = `hsla(${hue},100%,72%,${caustic * 0.22})`; 

        ctx.fillRect(x, y, step, step); 

      } 

    } 

  } 

  ctx.restore(); 

} 

Code hook: spectral prism patches  function drawPrismPatch(ctx, x, y, r, angle, time) { 

  ctx.save(); 

  ctx.translate(x, y); 

  ctx.rotate(angle); 

  ctx.globalCompositeOperation = "lighter"; 

  const colors = [ 

    "rgba(255,40,120,0.18)", 

    "rgba(255,180,40,0.16)", 

 
 
 
 
 
 

    "rgba(80,255,120,0.15)", 

    "rgba(60,210,255,0.17)", 

    "rgba(170,80,255,0.16)" 

  ]; 

  for (let i = 0; i < colors.length; i++) { 

    ctx.fillStyle = colors[i]; 

    ctx.beginPath(); 

    ctx.ellipse( 

      i * r * 0.18 - r * 0.35, 

      Math.sin(time + i) * 4, 

      r * 0.42, 

      r * 0.10, 

      0, 

      0, 

      Math.PI * 2 

    ); 

    ctx.fill(); 

  } 

  ctx.restore(); 

} 

 
 
 
 

Specific concepts 

Caustic Quilt 

A matte textile surface covered in moving refractive light seams. 

Glitter Aquarium Projection 

Water-caustic lace plus suspended glitter flashes. 

Prism Scars 

Spectral patches crawling across a dull wall like light wounds. 

Invisible Disco Ball 

Only the reflected dots and glints are visible. 

Holographic Shadow Spill 

A hidden foil object casts impossible rainbow shadows.