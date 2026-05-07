# ✦ Showcase Build 05

5. SEQUINED SKELETON 

Idea 

A soft or matte creature/object contains a skeleton made of sequins, metallic plates, or reflective 
scale discs. 

The outside is muted. 
The structure inside is a glamorous disco skeleton. 

Think:  plush organism 

+  internal bone lattice 

+  sequins where joints should be 

Concept / principle 

The key principle:  shine as support structure 

Unlike veins or nerves, this does not flow. 
It holds. 

So the shiny parts should feel:  rigid 
● 
● 
jointed 
●  structural 
● 
●  articulated  load-bearing 

 
 
 

How it works 

Build a skeleton graph: 

●  spine 
ribs 
● 
limb branches 
● 
● 
joints 
●  crossbars 
● 
● radial bones 
lattice frame 

Then render bones as:  rows of sequins 

● 
●  chrome rods 
●  pearl beads 
● 
●  metallic gradient strips  reflective plates 

Joints get stronger flashes. 

Why it works 

Skeletons are already visual hierarchies. 
Sequins are small repeated reflective units. 

Together:  support structure becomes sparkle rhythm 

This is extremely good for generative systems because a graph can become a decorative 
armature. 

Goal 

 
 
 
 

Make shine feel like:  hidden architecture  or:  glamorous structural anatomy 

Code principle 

Draw bones as lines made of repeated discs. 

Each disc has: 

●  body color 
●  crescent highlight 
●  occasional star glint 

Sequin disc snippet  function drawSequin(ctx, x, y, r, hue, time, id) { 

  const flash = 0.5 + 0.5 * Math.sin(time * 6 + id * 0.77 + x * 0.01); 

  const g = ctx.createRadialGradient( 

    x - r * 0.3, y - r * 0.35, 0, 

    x, y, r 

  ); 

  g.addColorStop(0.00, "rgba(255,255,255,0.92)"); 

 
 
 
 
 
 

  g.addColorStop(0.16, `hsla(${hue + 50},100%,75%,0.88)`); 

  g.addColorStop(0.55, `hsla(${hue},100%,42%,0.86)`); 

  g.addColorStop(1.00, `hsla(${hue + 160},100%,18%,0.9)`); 

  ctx.fillStyle = g; 

  ctx.beginPath(); 

  ctx.arc(x, y, r, 0, Math.PI * 2); 

  ctx.fill(); 

  // center stitch hole 

  ctx.fillStyle = "rgba(0,0,0,0.36)"; 

  ctx.beginPath(); 

  ctx.arc(x, y, r * 0.18, 0, Math.PI * 2); 

  ctx.fill(); 

  if (flash > 0.88) { 

    ctx.strokeStyle = `rgba(255,255,255,${flash})`; 

    ctx.beginPath(); 

    ctx.moveTo(x - r * 1.3, y); 

    ctx.lineTo(x + r * 1.3, y); 

    ctx.moveTo(x, y - r * 1.3); 

    ctx.lineTo(x, y + r * 1.3); 

    ctx.stroke(); 

  } 

 
 
 

} 

Bone made of sequins  function drawSequinBone(ctx, x1, y1, x2, y2, r, hue, time, idOffset) { 

  const dx = x2 - x1; 

  const dy = y2 - y1; 

  const len = Math.hypot(dx, dy) || 1; 

  const count = Math.max(2, Math.floor(len / (r * 1.65))); 

  // faint shadow bone channel 

  ctx.strokeStyle = "rgba(0,0,0,0.22)"; 

  ctx.lineWidth = r * 3.2; 

  ctx.lineCap = "round"; 

  ctx.beginPath(); 

  ctx.moveTo(x1, y1); 

  ctx.lineTo(x2, y2); 

  ctx.stroke(); 

  for (let i = 0; i <= count; i++) { 

    const t = i / count; 

    const x = x1 + dx * t; 

    const y = y1 + dy * t; 

 
 
 
 
 

    drawSequin(ctx, x, y, r * (0.85 + 0.2 * Math.sin(i)), hue + i * 5, time, idOffset + i); 

  } 

} 

Simple skeleton layout snippet  function drawSequinSkeleton(ctx, w, h, time) { 

  const cx = w / 2; 

  const cy = h / 2; 

  // spine 

  const spine = []; 

  for (let i = 0; i < 9; i++) { 

    const t = i / 8; 

    spine.push({ 

      x: cx + Math.sin(t * Math.PI * 2 + time * 0.4) * 22, 

      y: cy - h * 0.25 + t * h * 0.5 

    }); 

  } 

  for (let i = 1; i < spine.length; i++) { 

    drawSequinBone(ctx, spine[i - 1].x, spine[i - 1].y, spine[i].x, spine[i].y, 5, 210 + i * 18, time, i * 
100); 

  } 

 
 
 
 

  // ribs 

  for (let i = 2; i < 7; i++) { 

    const p = spine[i]; 

    const ribLen = 55 - Math.abs(i - 4) * 8; 

    drawSequinBone(ctx, p.x, p.y, p.x - ribLen, p.y + 24, 3.5, 300, time, i * 200); 

    drawSequinBone(ctx, p.x, p.y, p.x + ribLen, p.y + 24, 3.5, 150, time, i * 300); 

  } 

  // joint rhinestones 

  for (let i = 0; i < spine.length; i++) { 

    if (i % 2 === 0) { 

      drawFacetedRhinestone(ctx, spine[i].x, spine[i].y, 9, 250 + i * 25, time, i); 

    } 

  } 

} 

Variations 

Plush x-ray 

A stuffed animal silhouette with sequined skeleton visible through fabric. 

Disco fossil 

Sequin bones embedded in matte stone. 

 
 
 
 
 

Sacred costume anatomy 

A robe with skeleton embroidery made of sequins. 

Weird interface 

A UI diagram where the “skeleton” of layout is a sequin network. 

Cross-mutation of these five 

Glitter Circulation + Opal Nervous System  two internal shine systems:  slow glitter blood  fast opal signal pulses 

Rhinestone Lymph + Sequined Skeleton  sequin bones with swollen jewel joints 

Metallic Vein Stone + Glitter Circulation  a stone slab whose mineral veins pulse like living glitter blood 

Opal Nerves + Metallic Stone  fossilized opal neural network inside black basalt 

Sequined Skeleton + Glitter Circulation 

 
 
 
 
  support structure and fluid system visible together, like glamorous x-ray anatomy 

RepoScripter doctrine for this batch 

For shiny anatomy designs, the shine must have a biological role. 

Use: 

- glitter for circulation 

- opal for signal 

- rhinestones for glands or nodes 

- metallic gradients for mineral inclusions 

- sequins for skeleton or support 

Do not scatter shine evenly. 

Organize shine into vessels, nodes, joints, bones, and embedded systems. 

Say next and I’ll keep going with the next 5 showcase builds.