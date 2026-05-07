# ✦ Showcase Build 01

1. GLITTER CIRCULATORY SYSTEM 

Idea 

A matte body, blob, panel, or organism has a branching circulatory system inside it, but instead 
of blood it carries liquid glitter. 

Imagine:  soft dull silicone body 

+  transparent capillaries 

+  pink/gold/blue glitter fluid pulsing through them 

The surface is quiet. 
The inside is violently alive. 

 
 

Concept / principle 

The key principle:  shine as circulation 

The glitter is not sprinkled randomly. 
It moves through channels. 

That makes it feel biological and functional. 

The viewer should read:  this thing is alive because the shine is moving 

How it works 

You need four layers: 

1. Matte host 

A low-sheen surface:  rubber 
● 
● 
latex 
●  clay 
●  velvet 
●  pale silicone 
●  cloudy plastic 

2. Branch network 

Use: 

●  L-system 
● 
●  vein graph  recursive branching walkers 

 
 
 
 

● flow-field traces 

3. Glitter fluid 

Sparkles appear inside or near the channels, not everywhere. 

4. Pulse motion 

Bright packets travel through the veins. 

Why it works 

Because glitter usually feels cheap and surface-level. 

But when glitter is put inside vessels, it becomes: 

●  biological 
●  precious 
● 
forbidden 
●  magical 
●  mechanical 
●  alive 

The shine gets a job. 

Goal 

Make the glitter feel like it is:  being pumped  not scattered. 

Code principle 

Each branch segment stores: 

 
 
 
 

{ 

  x1, y1, x2, y2, 

  width, 

  hue, 

  phase, 

  depth 

} 

Then you draw: 

1.  soft under-glow 
2.  translucent tube 
3.  bright liquid core 
4.  moving glitter particles along segment 
5.  star glints at junctions 

Segment drawing snippet  function drawGlitterVessel(ctx, seg, time) { 

  const { x1, y1, x2, y2, width, hue, phase } = seg; 

  const dx = x2 - x1; 

  const dy = y2 - y1; 

  const len = Math.hypot(dx, dy) || 1; 

  // soft buried glow 

  ctx.strokeStyle = `hsla(${hue}, 100%, 65%, 0.08)`; 

  ctx.lineWidth = width * 5; 

 
 
 
 

  ctx.lineCap = "round"; 

  ctx.beginPath(); 

  ctx.moveTo(x1, y1); 

  ctx.lineTo(x2, y2); 

  ctx.stroke(); 

  // translucent vessel wall 

  ctx.strokeStyle = `hsla(${hue + 25}, 90%, 72%, 0.24)`; 

  ctx.lineWidth = width * 2.2; 

  ctx.beginPath(); 

  ctx.moveTo(x1, y1); 

  ctx.lineTo(x2, y2); 

  ctx.stroke(); 

  // glitter liquid core 

  const pulse = 0.5 + 0.5 * Math.sin(time * 4 + phase); 

  ctx.strokeStyle = `hsla(${hue + pulse * 60}, 100%, ${55 + pulse * 25}%, 0.7)`; 

  ctx.lineWidth = width * 0.75; 

  ctx.beginPath(); 

  ctx.moveTo(x1, y1); 

  ctx.lineTo(x2, y2); 

  ctx.stroke(); 

  // moving glitter emboli 

 
 
 

  for (let i = 0; i < 4; i++) { 

    const t = (time * 0.22 + phase * 0.13 + i * 0.25) % 1; 

    const px = x1 + dx * t; 

    const py = y1 + dy * t; 

    const sparkle = 0.45 + 0.55 * Math.sin(time * 12 + i * 11 + phase); 

    ctx.fillStyle = `rgba(255,255,255,${0.25 + sparkle * 0.65})`; 

    ctx.fillRect(px - 1, py - 1, 2, 2); 

    if (sparkle > 0.88) { 

      ctx.strokeStyle = `hsla(${hue + 120}, 100%, 85%, 0.7)`; 

      ctx.beginPath(); 

      ctx.moveTo(px - 5, py); 

      ctx.lineTo(px + 5, py); 

      ctx.moveTo(px, py - 5); 

      ctx.lineTo(px, py + 5); 

      ctx.stroke(); 

    } 

  } 

} 

Branch generation snippet 

 
 
 
 
  function generateVesselTree(cx, cy, startAngle, length, width, depth, out) { 

  if (depth > 8 || length < 5 || width < 0.5) return; 

  const x2 = cx + Math.cos(startAngle) * length; 

  const y2 = cy + Math.sin(startAngle) * length; 

  out.push({ 

    x1: cx, 

    y1: cy, 

    x2, 

    y2, 

    width, 

    hue: 300 - depth * 12 + Math.random() * 60, 

    phase: Math.random() * Math.PI * 2, 

    depth 

  }); 

  const split = 0.35 + Math.random() * 0.35; 

  generateVesselTree( 

    x2, y2, 

    startAngle + split, 

    length * (0.68 + Math.random() * 0.08), 

    width * 0.72, 

 
 
 
 

    depth + 1, 

    out 

  ); 

  generateVesselTree( 

    x2, y2, 

    startAngle - split, 

    length * (0.68 + Math.random() * 0.08), 

    width * 0.72, 

    depth + 1, 

    out 

  ); 

  // occasional tertiary capillary 

  if (Math.random() < 0.42) { 

    generateVesselTree( 

      x2, y2, 

      startAngle + (Math.random() - 0.5) * 1.7, 

      length * 0.45, 

      width * 0.5, 

      depth + 1, 

      out 

    ); 

  } 

 
 

} 

Variations 

Cute version 

Pastel silicone host, pink/gold glitter blood. 

Gross version 

Bruise-purple host, toxic cyan glitter circulation. 

Luxury version 

Black velvet host, champagne-gold glitter capillaries. 

Sci-fi version 

Matte graphite host, RGB fiber-optic liquid pulses.