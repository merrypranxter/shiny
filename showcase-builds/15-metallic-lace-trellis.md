# ✦ Showcase Build 15

15. METALLIC LACE TRELLIS 

Idea 

A delicate lace / trellis / filigree pattern rendered as hard colorful metal. 

It should feel like:  lace made by a machine that only knows chrome, opal, and weaponized nail polish 

Soft pattern, hard material. 

Concept / principle 

The principle:  delicacy plus brutal reflectivity 

 
 
 

Lace is usually soft, fabric, porous, handmade. 
Chrome is hard, reflective, industrial. 

The contradiction is the juice. 

How it works 

Generate a repeating or branching ornamental network: 

●  arcs 
loops 
● 
tendrils 
● 
● 
lattice cells 
●  mirrored curves 
● 
● rosettes 
trellis intersections 

Render strokes as: 

●  metallic gradient tubes 
●  edge rails 
●  occasional jewel nodes 
●  dark shadows underneath 
●  high white glints at curve bends 

Why it works 

Because lace has lots of edges and holes. 

Shine loves edges. 

A metallic lace pattern gives:  rhythmic structure 

●  many highlights 
● 
●  delicate complexity 
●  negative space 
● rich silhouette 

 
 
 

Goal 

Make the image feel like:  ornament that escaped textile and became reflective hardware 

Trellis curve field 

Use sine arcs and mirrored tendrils.  function makeTrellisCurves(w, h) { 

  const curves = []; 

  const cols = 6; 

  const rows = 5; 

  const cellW = w / cols; 

  const cellH = h / rows; 

  for (let j = 0; j < rows; j++) { 

    for (let i = 0; i < cols; i++) { 

      const cx = i * cellW + cellW / 2; 

      const cy = j * cellH + cellH / 2; 

      const r = Math.min(cellW, cellH) * 0.38; 

      curves.push(makeLoopCurve(cx, cy, r, 0)); 

      curves.push(makeLoopCurve(cx, cy, r * 0.7, Math.PI / 2)); 

 
 
 
 
 

    } 

  } 

  return curves; 

}  function makeLoopCurve(cx, cy, r, rot) { 

  const pts = []; 

  for (let k = 0; k <= 48; k++) { 

    const t = (k / 48) * Math.PI * 2; 

    const rr = r * (0.72 + 0.22 * Math.sin(t * 4)); 

    const x = cx + Math.cos(t + rot) * rr; 

    const y = cy + Math.sin(t + rot) * rr * 0.68; 

    pts.push({ x, y }); 

  } 

  return pts; 

} 

Metallic tube stroke along curve  function drawMetallicCurve(ctx, pts, time, hueBase, width = 5) { 

 
 
 
 
 
 
 

  for (let i = 1; i < pts.length; i++) { 

    const a = pts[i - 1]; 

    const b = pts[i]; 

    const dx = b.x - a.x; 

    const dy = b.y - a.y; 

    const len = Math.hypot(dx, dy) || 1; 

    const nx = -dy / len; 

    const ny = dx / len; 

    const hue = (hueBase + i * 7 + time * 20) % 360; 

    // shadow under metal 

    ctx.strokeStyle = "rgba(0,0,0,0.35)"; 

    ctx.lineWidth = width + 4; 

    ctx.lineCap = "round"; 

    ctx.beginPath(); 

    ctx.moveTo(a.x, a.y); 

    ctx.lineTo(b.x, b.y); 

    ctx.stroke(); 

    // metal body across width 

    const grad = ctx.createLinearGradient( 

      a.x + nx * width, 

 
 
 
 

      a.y + ny * width, 

      a.x - nx * width, 

      a.y - ny * width 

    ); 

    grad.addColorStop(0.0, `hsl(${hue + 190},100%,9%)`); 

    grad.addColorStop(0.25, `hsl(${hue},100%,40%)`); 

    grad.addColorStop(0.48, "rgba(255,255,255,0.92)"); 

    grad.addColorStop(0.62, `hsl(${hue + 100},100%,55%)`); 

    grad.addColorStop(1.0, `hsl(${hue + 250},100%,13%)`); 

    ctx.strokeStyle = grad; 

    ctx.lineWidth = width; 

    ctx.beginPath(); 

    ctx.moveTo(a.x, a.y); 

    ctx.lineTo(b.x, b.y); 

    ctx.stroke(); 

    // bend glints 

    if (i % 13 === 0) { 

      const flash = 0.5 + 0.5 * Math.sin(time * 4 + i); 

      if (flash > 0.65) { 

        ctx.fillStyle = `rgba(255,255,255,${flash * 0.65})`; 

        ctx.fillRect(b.x - 1, b.y - 1, 2, 2); 

 
 
 

      } 

    } 

  } 

} 

Draw trellis  function drawMetallicLaceTrellis(ctx, w, h, curves, time) { 

  ctx.fillStyle = "rgb(9,8,13)"; 

  ctx.fillRect(0, 0, w, h); 

  // matte velvet haze 

  for (let i = 0; i < 50; i++) { 

    const x = Math.random() * w; 

    const y = Math.random() * h; 

    const r = 40 + Math.random() * 130; 

    const g = ctx.createRadialGradient(x, y, 0, x, y, r); 

    g.addColorStop(0, "rgba(255,255,255,0.018)"); 

    g.addColorStop(1, "rgba(0,0,0,0)"); 

    ctx.fillStyle = g; 

    ctx.beginPath(); 

    ctx.arc(x, y, r, 0, Math.PI * 2); 

 
 
 
 
 

    ctx.fill(); 

  } 

  for (let i = 0; i < curves.length; i++) { 

    drawMetallicCurve(ctx, curves[i], time, 190 + i * 23, 4 + (i % 3)); 

  } 

} 

Variations 

Chrome cathedral lace 

More symmetrical, gothic window logic. 

Candy filigree 

Pastel chrome over matte cream. 

Alien trellis 

Asymmetrical loop lattice, weird biological nodes. 

Metallic blacklight lace 

Dark host, cyan/magenta/purple hard glints. 

Cross-mutations for this batch 

Penrose Light Loom + Metallic Lace  quasicrystal lace made of chrome fiber 

 
 
 
 

Basketweave + Fiber-Optic Quilt  woven holographic quilt whose seams carry moving pulses 

Voronoi Chrome Grout + Penrose Loom  matte cells with quasicrystal chrome seams 

Metallic Lace + Hologram Basketweave  lace pattern woven from holographic foil strips 

Fiber Quilt + Chrome Grout  patchwork tile system with liquid metal seams and fiber-optic pulses 

RepoScripter doctrine for this batch 

For woven and tessellated shine designs, the shine must be the structural material. 

Use: 

- quasicrystal threads for non-repeating light logic 

- holographic ribbons for over-under weave 

- chrome grout for cell boundaries 

 
 
 
 
 
 
 

- fiber-optic seams for patchwork connection 

- metallic lace for delicate reflective filigree 

Do not fill everything with glow. 

Let matte regions create silence so the shiny structure can sing. 

Say next and I’ll keep going with the next showcase builds.