# ✦ System 07

7. SHINE-AS-WEATHER / CONTOUR 
SYSTEMS 

Idea 

Shine behaves like weather. 

Not static sparkle. 
Not decorative gloss. 

It moves as:  fronts 

● 
●  pressure bands 
●  storms 
radar rings 
● 
●  wind streaks 
●  contour lines 
● 
● 
●  glitter precipitation  lightning seams 
iridescent cloud layers 

 
 
 
 
 

Examples: 

●  glitter storm map 
●  oil-slick pressure system 
●  chrome rain bands 
●  pearlescent isobars 
●  holographic hurricane 
●  sparkle snow squall over matte terrain 

Concept / principle 

The principle:  shine is a changing field condition 

This is great because shine already depends on angle and motion. Weather gives you a reason 
for it to drift, pulse, cluster, and reform. 

A weather system gives shine:  large-scale organization 

● 
●  moving fronts 
local turbulence 
● 
● 
thresholds 
●  contour bands 
●  sudden flashes 

How it works 

Build a scalar field:  pressure / humidity / charge / oil thickness / glitter density 

Then use contours and thresholds: 

●  contour line = shiny ridge 
●  high pressure = metallic bloom 
●  storm cell = glitter cluster 
● front boundary = chromatic seam 

 
 
 
 

● lightning = rare branching glint 

The material logic can be fake weather:  iridescent pressure 
glitter humidity 
metallic temperature 
sparkle precipitation 

Why it works visually 

Because it makes shine spatially meaningful. 

Instead of random sparkles, you get:  sparkles happen where the storm says they happen 

That feels controlled and alive. 

Goal 

The goal is:  turn optical effects into meteorology 

A viewer should feel that shine is not pasted on. 
It is arriving, gathering, raining, blooming, or evacuating. 

Good system choices  fBm pressure fields 

● 
●  contour bands 
● 
flow fields 
●  particle advection 
● 
● thresholded cloud maps 
radial storm systems 

 
 
 
 
 
 

●  curl noise-ish motion 
recursive turbulence 
● Contour shine snippet 

Use a field. Draw only where field value is near a band.  function contourAmount(v, bands) { 
  const f = v * bands; 
  const d = Math.abs(f - Math.round(f)); 
  return Math.max(0, 1 - d * 14); 
}  function drawShinyContours(ctx, w, h, time) { 
  const step = 2; 

  for (let y = 0; y < h; y += step) { 
    for (let x = 0; x < w; x += step) { 
      const v = heightAt(x + Math.sin(time) * 20, y, time); 
      const c = contourAmount(v + time * 0.04, 13); 

      if (c > 0.15) { 
        const hue = 180 + 160 * v + 70 * Math.sin(time + v * 8); 
        const alpha = c * 0.65; 
        ctx.fillStyle = `hsla(${hue},100%,70%,${alpha})`; 
        ctx.fillRect(x, y, step, step); 

        if (c > 0.88) { 
          ctx.fillStyle = `rgba(255,255,255,${c * 0.5})`; 
          ctx.fillRect(x, y, 1, 1); 
        } 
      } 
    } 
  } 
} 

This gives oil-slick contour shine / radar shine / topographic shimmer. 

Glitter precipitation snippet 

 
 
 
 
 
 
 

Sparkles appear only in “storm zones.”  function drawGlitterPrecipitation(ctx, w, h, time) { 
  for (let i = 0; i < 1800; i++) { 
    const x = Math.random() * w; 
    const y = Math.random() * h; 

    const pressure = heightAt(x, y, time); 
    const storm = Math.pow(Math.max(0, pressure - 0.55), 2.0) * 8; 

    if (Math.random() < storm * 0.04) { 
      const fall = (time * 80 + i * 13) % h; 
      const yy = (y + fall * 0.08) % h; 

      const hue = 190 + 120 * pressure + 60 * Math.sin(i); 
      const flash = 0.4 + 0.6 * Math.sin(time * 8 + i); 
      ctx.fillStyle = `hsla(${hue},100%,75%,${0.25 + flash * 0.55})`; 
      ctx.fillRect(x, yy, 1 + Math.random() * 2, 1 + Math.random() * 2); 
    } 
  } 
} 

Specific concept: Glitter Weather Radar 

A dark matte radar screen. 
Instead of rain, the radar shows zones of reflective particles. 

●  green/blue = mild shimmer 
●  magenta/yellow = dangerous sparkle front 
●  white = mirrorball hail 
●  contour rings sweep outward 

Implementation:  radial scan angle 

● 
●  pressure field 
●  contour bands 
●  sparkle threshold  function drawRadarSweep(ctx, w, h, time) { 
  const cx = w / 2; 
  const cy = h / 2; 

 
 
 
 
 

  const sweep = time * 1.2; 

  ctx.save(); 
  ctx.translate(cx, cy); 
  ctx.rotate(sweep); 

  const grad = ctx.createLinearGradient(0, 0, w * 0.5, 0); 
  grad.addColorStop(0, "rgba(120,255,220,0.18)"); 
  grad.addColorStop(1, "rgba(120,255,220,0.0)"); 

  ctx.fillStyle = grad; 
  ctx.beginPath(); 
  ctx.moveTo(0, 0); 
  ctx.arc(0, 0, Math.max(w, h), -0.08, 0.08); 
  ctx.closePath(); 
  ctx.fill(); 

  ctx.restore(); 
} 

RepoScripter instruction 

Make shine behave like weather: use pressure fields, contour bands, storm thresholds, glitter 
precipitation, and moving fronts. Sparkle should cluster where the field conditions demand it.