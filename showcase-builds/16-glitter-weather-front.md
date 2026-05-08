# ✦ Showcase Build 16

16. GLITTER WEATHER FRONT 

Idea 

A weather-map-like field where glitter behaves like rain, pressure, radar, clouds, lightning, and 
storm fronts. 

Not sparkles everywhere. 
Sparkles happen where the atmosphere says they happen. 

Think:  matte radar darkness 

+  moving iridescent pressure bands 

+  glitter precipitation 

+  mirrorball storm cells 

Concept / principle 

The principle:  sparkle is meteorology 

A glitter front gives you: 

●  movement 
●  clustering 
thresholds 
● 
●  contour lines 

 
 
 

●  directionality 
●  sudden events 
●  dense and sparse zones 

This turns glitter into a system instead of decoration. 

How it works 

Build a fake weather field:  pressure = large-scale noise + moving waves + local storm cells 

Then map pressure to optical events:  low pressure     -> dark matte calm  medium pressure  -> pearly haze  front boundary   -> chromatic contour shine  high pressure    -> glitter precipitation  extreme cells    -> starburst hail 

Why it works 

Glitter is naturally particulate. Weather is naturally particulate. Rain, snow, hail, dust, pollen, 
sparks — all of them are field-driven particles. 

So:  glitter as weather = believable sparkle distribution 

 
 
 
 
 
 

Goal 

Make the viewer feel:  a storm made of reflective particles is moving across the surface 

Code principle 

You need: 

1.  a scalar weather field 
2.  contour bands for fronts 
3.  glitter particles only in high-density zones 
4.  rare starbursts in extreme zones 
5.  mouse as radar / pressure disturbance 

Weather field helper  function fract(n) { 

  return n - Math.floor(n); 

}  function hashNoise(x, y) { 

  return fract(Math.sin(x * 127.1 + y * 311.7) * 43758.5453123); 

}  function fbmWeather(x, y) { 

  let v = 0; 

  let a = 0.5; 

 
 
 
 
 

  let f = 1; 

  for (let i = 0; i < 5; i++) { 

    v += a * hashNoise(Math.floor(x * f), Math.floor(y * f)); 

    a *= 0.5; 

    f *= 2; 

  } 

  return v; 

}  function weatherPressure(x, y, time, mouse, w, h) { 

  let p = 

    0.55 * fbmWeather(x * 0.006 + time * 0.025, y * 0.006) + 

    0.30 * fbmWeather(x * 0.018 - time * 0.03, y * 0.018 + time * 0.015) + 

    0.15 * Math.sin(x * 0.018 + y * 0.011 - time * 1.2) * 0.5 + 0.5; 

  if (mouse) { 

    const dx = x - mouse.x; 

    const dy = y - mouse.y; 

    const d = Math.sqrt(dx * dx + dy * dy); 

    const push = Math.exp(-d * d / (w * h * 0.025)); 

    p += push * (mouse.isPressed ? 0.45 : 0.18); 

  } 

 
 
 
 

  return Math.max(0, Math.min(1, p)); 

} 

Draw chromatic storm fronts  function drawGlitterWeatherFronts(ctx, w, h, time, mouse) { 

  const step = 3; 

  const bands = 11; 

  for (let y = 0; y < h; y += step) { 

    for (let x = 0; x < w; x += step) { 

      const p = weatherPressure(x, y, time, mouse, w, h); 

      // Contour line around pressure bands. 

      const f = p * bands; 

      const d = Math.abs(f - Math.round(f)); 

      const front = Math.max(0, 1 - d * 18); 

      if (front > 0.1) { 

        const hue = (190 + p * 210 + time * 30) % 360; 

        ctx.fillStyle = `hsla(${hue},100%,${55 + front * 35}%,${front * 0.42})`; 

        ctx.fillRect(x, y, step, step); 

 
 
 
 
 
 
 

        if (front > 0.86) { 

          ctx.fillStyle = `rgba(255,255,255,${front * 0.42})`; 

          ctx.fillRect(x, y, 1, 1); 

        } 

      } 

    } 

  } 

} 

Draw glitter precipitation  function drawGlitterPrecip(ctx, w, h, time, mouse) { 

  for (let i = 0; i < 1800; i++) { 

    const x = Math.random() * w; 

    const y = Math.random() * h; 

    const p = weatherPressure(x, y, time, mouse, w, h); 

    const rainChance = Math.pow(Math.max(0, p - 0.56), 2.2) * 0.23; 

    if (Math.random() < rainChance) { 

      const hue = (180 + p * 180 + Math.random() * 60) % 360; 

      const flash = 0.35 + 0.65 * Math.sin(time * 8 + i * 1.71); 

      const size = p > 0.82 && Math.random() < 0.12 ? 3 : 1; 

 
 
 
 
 

      ctx.fillStyle = `hsla(${hue},100%,${65 + flash * 30}%,${0.22 + flash * 0.65})`; 

      ctx.fillRect(x, y, size, size); 

      if (p > 0.88 && Math.random() < 0.035) { 

        drawWeatherGlint(ctx, x, y, 5 + Math.random() * 8); 

      } 

    } 

  } 

}  function drawWeatherGlint(ctx, x, y, r) { 

  ctx.strokeStyle = "rgba(255,255,255,0.72)"; 

  ctx.lineWidth = 1; 

  ctx.beginPath(); 

  ctx.moveTo(x - r, y); 

  ctx.lineTo(x + r, y); 

  ctx.moveTo(x, y - r); 

  ctx.lineTo(x, y + r); 

  ctx.stroke(); 

} 

Variations 

Radar glitter 

 
 
 
 

Add rotating scan wedge. 

Hailstorm glam 

More rare huge white starbursts. 

Soft pearl weather 

Low glitter, more contour sheen. 

Toxic sparkle squall 

Black/green/pink hazard palette.