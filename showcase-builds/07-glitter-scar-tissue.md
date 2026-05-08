# ✦ Showcase Build 07

7. GLITTER SCAR TISSUE 

Idea 

A matte soft surface has raised scars, but the scar tissue is glittery, pearlescent, and 
color-shifting. 

Not horror gore. 
More like:  cute medical sticker 

+  raised jelly scar 

+ 

 
 
  dry glitter caught in the healed ridge 

Concept / principle 

The principle:  healing becomes optical accumulation 

The scar is where the surface repaired itself. 
That repair material has different optical properties than the host. 

So the shine is not decoration. 
It is a biological material difference. 

How it works 

Create scar paths:  long raised strokes 

● 
●  branching scars 
loop scars 
● 
●  stitch-like scars 
● ridges with little glitter granules 

Render each scar with: 

1.  dark underside shadow 
2.  soft pink/purple translucent ridge 
3.  wet highlight along one edge 
4.  dry glitter dust embedded in ridge 
5.  occasional white sharp glint 

Why it works 

 
 
 
 
 

Scar tissue has shape. 
Glitter has sparkle. 
Together, you get tactile shine:  raised surface 

+  rough particles 

+  wet skin highlight 

It feels physical. 

Goal 

Make the shine feel like:  a healing process that accidentally became glamorous 

Code principle 

Draw scars as thick curved strokes. 
Use points along the path. 
Add glitter near the path centerline. 

Scar path generator  function makeScarPath(cx, cy, length, angle, segments, curl = 0.2) { 

  const pts = []; 

  let x = cx; 

 
 
 
 
 

  let y = cy; 

  let a = angle; 

  for (let i = 0; i < segments; i++) { 

    pts.push({ x, y, i }); 

    a += Math.sin(i * 0.37) * curl + (Math.random() - 0.5) * 0.18; 

    const step = length / segments; 

    x += Math.cos(a) * step; 

    y += Math.sin(a) * step; 

  } 

  return pts; 

} 

Raised glitter scar renderer  function drawGlitterScar(ctx, pts, time, hueBase) { 

  if (pts.length < 2) return; 

  // broad bruise shadow underneath 

  ctx.lineCap = "round"; 

  ctx.lineJoin = "round"; 

  ctx.strokeStyle = "rgba(50,0,45,0.22)"; 

 
 
 
 
 
 

  ctx.lineWidth = 19; 

  ctx.beginPath(); 

  ctx.moveTo(pts[0].x, pts[0].y); 

  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y); 

  ctx.stroke(); 

  // translucent raised scar body 

  const hue = (hueBase + time * 8) % 360; 

  ctx.strokeStyle = `hsla(${hue},90%,68%,0.42)`; 

  ctx.lineWidth = 11; 

  ctx.beginPath(); 

  ctx.moveTo(pts[0].x, pts[0].y); 

  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y); 

  ctx.stroke(); 

  // pearly wet ridge highlight 

  ctx.strokeStyle = "rgba(255,255,255,0.28)"; 

  ctx.lineWidth = 2; 

  ctx.beginPath(); 

  ctx.moveTo(pts[0].x - 2, pts[0].y - 2); 

  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x - 2, pts[i].y - 2); 

  ctx.stroke(); 

  // dry glitter embedded into the scar 

 
 
 

  for (let i = 2; i < pts.length - 2; i += 2) { 

    const p = pts[i]; 

    if (Math.random() < 0.45) { 

      const gx = p.x + (Math.random() - 0.5) * 10; 

      const gy = p.y + (Math.random() - 0.5) * 10; 

      const flash = 0.35 + 0.65 * Math.sin(time * 7 + i * 0.7); 

      ctx.fillStyle = `hsla(${hue + 80 + Math.random() * 60},100%,${65 + flash * 30}%,${0.25 + 
flash * 0.55})`; 

      ctx.fillRect(gx, gy, 1.5, 1.5); 

      if (flash > 0.9) { 

        ctx.strokeStyle = "rgba(255,255,255,0.65)"; 

        ctx.beginPath(); 

        ctx.moveTo(gx - 4, gy); 

        ctx.lineTo(gx + 4, gy); 

        ctx.moveTo(gx, gy - 4); 

        ctx.lineTo(gx, gy + 4); 

        ctx.stroke(); 

      } 

    } 

  } 

} 

 
 
 
 

Add stitch punctures 

This makes scar tissue feel physical.  function drawScarPunctures(ctx, pts) { 

  for (let i = 4; i < pts.length - 4; i += 8) { 

    const p = pts[i]; 

    ctx.fillStyle = "rgba(0,0,0,0.20)"; 

    ctx.beginPath(); 

    ctx.ellipse(p.x, p.y, 3.5, 1.2, Math.random() * Math.PI, 0, Math.PI * 2); 

    ctx.fill(); 

  } 

} 

Variations 

Candy medical 

Pink scar tissue with gold glitter specks. 

Blacklight scar 

Purple host, cyan/magenta scar ridge. 

Pearl wound 

Soft white surface, pearly scar with opal dust. 

Sticker surgery 

 
 
 
 

Cartoon-like scar ridges with sparkles and fake stitch holes.