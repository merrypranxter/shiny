# ✦ System 18

18. SHINE-AS-MAP / TOPOGRAPHY 

Idea 

Shine becomes cartography. 

The shiny elements are not random decorations. They are:  transit routes 

●  contour lines 
● 
rivers 
●  borders 
● 
●  weather fronts 
● 
fault lines 
●  survey marks 
●  depth rings 
●  elevation ridges 
● ley lines 

 

●  shiny territory boundaries 

Examples: 

●  metallic topographic glyphs 
●  glitter weather atlas 
●  opal subway map 
●  chrome river delta 
●  holographic fault map 
●  pearlescent contour skin 
● rhinestone constellation map 

Concept / principle 

The principle:  shine reveals a hidden field 

Maps are already abstractions of invisible things: 

●  height 
●  pressure 
●  ownership 
●  movement 
risk 
● 
●  weather 
●  geology 
●  energy 

Shine can visualize those invisible forces. 

How it works 

Generate a field: 

●  height 
●  pressure 
●  density 
●  noise 

 
 
 

●  distance 
● 
flow 
●  attraction 
●  charge 

Then extract map structures: 

●  contours 
● 
ridges 
●  paths 
●  boundaries 
rivers 
● 
●  basins 
islands 
● 
labels / symbols 
● Render those map structures with optical materials. 

Why it works visually 

Maps give you both structure and mystery. 

When made shiny, they feel like:  luxury surveillance  alien cartography  sacred geography  weather jewelry  glamorous scientific instrument 

Goal 

Make the shine feel informational. 

It should imply: 

 
 
  this shimmer is measuring something 

Good systems 

●  contour extraction 
●  scalar fields 
fBm terrain 
● 
●  distance fields 
●  Voronoi maps 
flow lines 
● 
●  watershed paths 
● 
●  graph routes 
isolines 
● radial radar sweeps 

Code hook: pearlescent contour map  function drawPearlContourMap(ctx, w, h, time) { 

  ctx.fillStyle = "rgb(18,15,21)"; 

  ctx.fillRect(0, 0, w, h); 

  const step = 3; 

  const bands = 16; 

  for (let y = 0; y < h; y += step) { 

    for (let x = 0; x < w; x += step) { 

      const v = 

        0.55 * fieldNoise(x * 0.008 + time * 0.04, y * 0.008) + 

 
 
 
 
 

        0.30 * fieldNoise(x * 0.025, y * 0.025 - time * 0.03) + 

        0.15 * fieldNoise(x * 0.08, y * 0.08); 

      const f = v * bands; 

      const d = Math.abs(f - Math.round(f)); 

      const line = Math.max(0, 1 - d * 18); 

      if (line > 0.12) { 

        const hue = (170 + v * 180 + time * 20) % 360; 

        const alpha = line * 0.75; 

        ctx.fillStyle = `hsla(${hue},100%,${58 + line * 30}%,${alpha})`; 

        ctx.fillRect(x, y, step, step); 

        // white pearl crest 

        if (line > 0.88) { 

          ctx.fillStyle = `rgba(255,255,255,${line * 0.45})`; 

          ctx.fillRect(x, y, 1, 1); 

        } 

      } 

    } 

  } 

} 

 
 
 
 
 

Noise helpers  function fract(n) { 

  return n - Math.floor(n); 

}  function hashNoise(x, y) { 

  return fract(Math.sin(x * 127.1 + y * 311.7) * 43758.5453123); 

}  function fieldNoise(x, y) { 

  let v = 0; 

  let a = 0.5; 

  let f = 1; 

  for (let i = 0; i < 5; i++) { 

    v += a * hashNoise(Math.floor(x * f), Math.floor(y * f)); 

    f *= 2; 

    a *= 0.5; 

  } 

  return v; 

} 

 
 
 
 
 
 

Code hook: shiny river delta / flow map  function drawShinyDelta(ctx, w, h, time) { 

  const root = { x: w * 0.5, y: h * 0.12 }; 

  function branch(x, y, angle, length, thick, depth) { 

    if (depth > 8 || length < 5) return; 

    const x2 = x + Math.cos(angle) * length; 

    const y2 = y + Math.sin(angle) * length; 

    const hue = (190 + depth * 22 + time * 30) % 360; 

    drawMapRiverStroke(ctx, x, y, x2, y2, thick, hue); 

    const split = 0.35 + 0.1 * Math.sin(time + depth); 

    branch(x2, y2, angle + split, length * 0.72, thick * 0.72, depth + 1); 

    branch(x2, y2, angle - split, length * 0.72, thick * 0.72, depth + 1); 

    if (Math.random() < 0.45) { 

      branch(x2, y2, angle + (Math.random() - 0.5) * 1.4, length * 0.52, thick * 0.55, depth + 1); 

    } 

  } 

 
 
 
 
 
 
 
 

  branch(root.x, root.y, Math.PI / 2, h * 0.16, 8, 0); 

}  function drawMapRiverStroke(ctx, x1, y1, x2, y2, thick, hue) { 

  ctx.strokeStyle = `hsla(${hue},100%,65%,0.10)`; 

  ctx.lineWidth = thick * 4; 

  ctx.beginPath(); 

  ctx.moveTo(x1, y1); 

  ctx.lineTo(x2, y2); 

  ctx.stroke(); 

  ctx.strokeStyle = `hsla(${hue + 70},100%,70%,0.85)`; 

  ctx.lineWidth = thick; 

  ctx.beginPath(); 

  ctx.moveTo(x1, y1); 

  ctx.lineTo(x2, y2); 

  ctx.stroke(); 

  ctx.strokeStyle = "rgba(255,255,255,0.3)"; 

  ctx.lineWidth = 1; 

  ctx.beginPath(); 

  ctx.moveTo(x1, y1); 

  ctx.lineTo(x2, y2); 

  ctx.stroke(); 

 
 
 

} 

Specific concepts 

Glitter Weather Atlas 

Contour storms made from sparkle density. 

Chrome River Delta 

Branching hydrology rendered as liquid metal. 

Opal Subway Map 

Transit lines as iridescent routes through matte darkness. 

Holographic Fault Map 

Crack systems and elevation rings printed in diffraction shine. 

Metallic Topographic Glyphs 

Contour symbols embossed in pearlescent chrome.