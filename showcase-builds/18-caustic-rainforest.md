# ✦ Showcase Build 18

18. CAUSTIC RAINFOREST 

Idea 

 
 
 
 

A dark matte organic environment where the plants/branches are mostly dull, but rivers of 
spectral caustic light crawl through them. 

This is not “sparkly plants.” 
It is light projected through an unseen refractive canopy. 

Think:  black-green matte foliage 

+  moving cyan/gold/pink caustic lace 

+  wet light pooling in branch shadows 

Concept / principle 

The principle:  shine is projected environment 

The shiny thing may not be visible. 
You only see the light it produces. 

That makes the scene feel deeper. 

How it works 

Build: 

1. Matte organic host 

Dark leaves, branches, moss, or abstract jungle silhouettes. 

 
 
 
 

2. Caustic field 

Recursive warped sine/ridge pattern. 

3. Masking 

Caustics appear on selected surfaces, not everywhere. 

4. Spectral color 

Caustics split into cyan, pink, yellow, green. 

5. Motion 

Light crawls slowly like refracted water. 

Why it works 

Caustics naturally look branching and lace-like. They already have a fractal-ish feel. 

When placed over matte organic shapes, they feel like: 

●  water light 
●  glass projection 
●  alien sun 
● 
● jewel shadows 
refractive biology 

Goal 

Make the viewer feel:  the scene is being illuminated by something shiny just out of sight 

Code principle 

 
 
 
 

Use additive blending for caustics. 

Generate an organic mask so light only hits “foliage” zones. 

Organic matte host field  function forestMask(x, y, w, h, time) { 

  const v = 

    0.55 * fbmWeather(x * 0.007, y * 0.007) + 

    0.30 * fbmWeather(x * 0.022 + time * 0.01, y * 0.022) + 

    0.15 * Math.sin(y * 0.04 + Math.sin(x * 0.01) * 3); 

  return v; 

}  function drawMatteRainforestHost(ctx, w, h, time) { 

  ctx.fillStyle = "rgb(4,8,7)"; 

  ctx.fillRect(0, 0, w, h); 

  const step = 3; 

  for (let y = 0; y < h; y += step) { 

    for (let x = 0; x < w; x += step) { 

      const m = forestMask(x, y, w, h, time); 

      if (m > 0.46) { 

 
 
 
 
 
 

        const g = 18 + m * 35; 

        ctx.fillStyle = `rgba(${g * 0.45},${g},${g * 0.7},0.48)`; 

        ctx.fillRect(x, y, step, step); 

      } 

    } 

  } 

} 

Caustic lace field  function causticValue(x, y, time) { 

  let u = x * 0.013; 

  let v = y * 0.013; 

  for (let i = 0; i < 4; i++) { 

    const a = Math.sin(v * 2.8 + time * 0.75 + i * 1.9); 

    const b = Math.cos(u * 2.5 - time * 0.55 + i * 2.4); 

    u += a * 0.13; 

    v += b * 0.13; 

  } 

  const r1 = Math.abs(Math.sin(u * 7.2 + Math.sin(v * 1.4))); 

  const r2 = Math.abs(Math.sin(v * 8.3 + Math.cos(u * 1.2))); 

  const ridge = 1 - Math.min(r1, r2); 

 
 
 
 

  return Math.pow(Math.max(0, ridge), 8); 

} 

Draw projected caustics  function drawCausticRainforest(ctx, w, h, time) { 

  ctx.save(); 

  ctx.globalCompositeOperation = "lighter"; 

  const step = 3; 

  for (let y = 0; y < h; y += step) { 

    for (let x = 0; x < w; x += step) { 

      const mask = forestMask(x, y, w, h, time); 

      if (mask < 0.48) continue; 

      const c = causticValue(x, y, time); 

      if (c < 0.15) continue; 

      const hue = (165 + c * 90 + Math.sin(time + x * 0.01) * 55) % 360; 

      ctx.fillStyle = `hsla(${hue},100%,72%,${c * 0.28})`; 

      ctx.fillRect(x, y, step, step); 

 
 
 
 
 
 
 
 

      if (c > 0.78) { 

        ctx.fillStyle = `rgba(255,255,255,${c * 0.26})`; 

        ctx.fillRect(x, y, 1, 1); 

      } 

    } 

  } 

  ctx.restore(); 

} 

Variations 

Jewel canopy 

Light comes from invisible gems. 

Aquarium jungle 

More cyan water light, slower flow. 

Holographic swamp 

Magenta/green caustics over black organic shapes. 

Chrome vine projection 

Caustics align to branch curves.