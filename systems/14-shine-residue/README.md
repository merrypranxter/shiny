# ✦ System 14

14. SHINE-AS-RESIDUE / 
CONTAMINATION 

Idea 

Shine appears as a residue, stain, bloom, dust, growth, spill, oxidation, mold, or contamination. 

Examples:  foil rust 

●  glitter mold 
●  chrome pollen 
● 
●  sequin mildew 
● 
●  mirror dust 
●  holographic chemical bloom  lip-gloss oil spill 

 
 
 

●  metallic powder residue 

Concept / principle 

The principle:  shine is what the material leaves behind 

This makes shine feel accidental, ecological, or chemically active. 

Instead of a clean shiny object, you get:  something matte has been contaminated by brilliance 

How it works 

Use a host surface, then distribute shine based on a growth/deposition field:  trails 

●  high-density zones 
●  edge blooms 
● 
●  powdery scatter 
●  crusted ridges 
●  glitter clusters 
●  stain halos 
●  erosion marks 

Shine should not be uniform. It should collect. 

Why it works visually 

Residue has natural structure: 

●  clumps 
●  halos 
●  gradients 
●  sediment 

 
 
 
 
 

●  droplets 
● 
fingerprints 
●  dust patterns 
●  accidental edges 

That gives sparkle believability. 

Goal 

Make shine feel like:  a trace of some optical organism or chemical process 

Not a decoration. 

Good systems  fBm masks 

● 
●  particle deposition 
random walks 
● 
●  erosion fields 
●  growth fronts 
●  cluster thresholds 
●  cellular automata 
●  DLA-like deposits 
●  edge accumulation 

Code hook: glitter residue bloom  function drawGlitterResidue(ctx, w, h, time) { 
  const count = 2500; 

  for (let i = 0; i < count; i++) { 
    const x = Math.random() * w; 
    const y = Math.random() * h; 

    const n1 = cheapField(x * 0.006, y * 0.006, time); 

 
 
 
 
 
 

    const n2 = cheapField(x * 0.025 + 9.1, y * 0.025 - 4.7, time); 

    // residue only in bloom zones 
    const bloom = Math.pow(Math.max(0, n1 - 0.48), 2.2) * 6.0; 
    const crust = Math.abs(n1 - 0.58) < 0.035 ? 1 : 0; 

    if (Math.random() < bloom * 0.045 + crust * 0.025) { 
      const hue = 290 + n2 * 140 + Math.sin(time + x * 0.02) * 40; 
      const hot = Math.random() < 0.07; 
      const alpha = hot ? 0.9 : 0.18 + Math.random() * 0.35; 
      const size = hot ? 2 : 1; 

      ctx.fillStyle = `hsla(${hue},100%,${hot ? 82 : 62}%,${alpha})`; 
      ctx.fillRect(x, y, size, size); 

      if (hot) drawMiniGlint(ctx, x, y, 4 + Math.random() * 5); 
    } 
  } 
} 

Cheap field helper  function cheapHash(x, y) { 
  return fract(Math.sin(x * 41.17 + y * 289.31) * 43758.5453); 
}  function cheapField(x, y, time) { 
  let v = 0; 
  let a = 0.5; 
  let f = 1.0; 

  for (let i = 0; i < 5; i++) { 
    v += a * cheapHash(Math.floor(x * f + time * 0.2), Math.floor(y * f)); 
    a *= 0.5; 
    f *= 2.0; 
  } 

  return v; 
}  function fract(n) { 
  return n - Math.floor(n); 

 
 
 
 
 
 
 
 
 
 

} 

Mini glint  function drawMiniGlint(ctx, x, y, r) { 
  ctx.strokeStyle = "rgba(255,255,255,0.75)"; 
  ctx.lineWidth = 1; 

  ctx.beginPath(); 
  ctx.moveTo(x - r, y); 
  ctx.lineTo(x + r, y); 
  ctx.moveTo(x, y - r); 
  ctx.lineTo(x, y + r); 
  ctx.stroke(); 

  ctx.fillStyle = "rgba(255,255,255,0.9)"; 
  ctx.fillRect(x - 1, y - 1, 2, 2); 
} 

Specific concepts 

Glitter Mold Bloom 

Dark fuzzy host with craft glitter spore heads. 

Chrome Pollen 

Mirror particles clustered like pollen dust. 

Foil Rust 

Rainbow metallic corrosion eating across a matte surface. 

Sequin Mildew 

Tiny sequins growing in damp-looking colonies. 

Lip-Gloss Oil Spill 

 
 
 
 
 
 

Wet cosmetic shine spreading over rough ground.