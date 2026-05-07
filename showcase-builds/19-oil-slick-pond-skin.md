# ✦ Showcase Build 19

19. OIL SLICK POND SKIN 

 
 
 
 

Idea 

A dull pond, puddle, membrane, or dark surface has floating islands of thin-film iridescent oil. 

The shine is a skin sitting on top. 

Think:  black water 

+  rainbow film islands 

+  thin contour bands 

+  wet rim highlights 

Concept / principle 

The principle:  shine as surface film thickness 

Oil slick colors come from perceived film thickness. In code, you fake that with a scalar 
thickness field. 

The film is not uniformly rainbow. It has: 

●  bands 
●  swirls 
●  edges 
●  holes 
●  pooled regions 
rupture lines 
● How it works 

Build: 

1. dark matte/wet base 

Pond or rubbery surface. 

2. film mask 

Where oil exists. 

3. thickness field 

Controls hue phase. 

4. contour bands 

Thin spectral rings. 

5. edge rim 

Wet bright outline around film islands. 

Why it works 

Oil slick is one of the most satisfying color-shine systems because color naturally follows 
thickness contours. 

So the code can be simple but feel optically motivated. 

Goal 

Make the viewer feel:  this color is not pigment — it is a thin optical film 

 
 
 

Code principle 

Use:  fBm for film mask 

● 
●  warped fBm for thickness 
●  sine spectral palette 
● thresholded bands for thin-film rings 

Film thickness helpers  function oilMask(x, y, time) { 

  const v = 

    0.7 * fbmWeather(x * 0.006 + time * 0.015, y * 0.006) + 

    0.3 * fbmWeather(x * 0.025, y * 0.025 - time * 0.01); 

  return v; 

}  function oilThickness(x, y, time) { 

  let u = x * 0.013; 

  let v = y * 0.013; 

  const warp = fbmWeather(u * 0.8, v * 0.8); 

  u += Math.sin(warp * 6 + time * 0.4) * 0.7; 

  v += Math.cos(warp * 5 - time * 0.3) * 0.7; 

 
 
 
 
 
 

  return ( 

    0.55 * fbmWeather(u, v) + 

    0.30 * fbmWeather(u * 3.1 + 4.2, v * 3.1) + 

    0.15 * Math.sin((u + v) * 5.0 + time) 

  ); 

} 

Spectral thin-film color  function thinFilmRGB(phase) { 

  const r = 120 + 120 * Math.sin(phase + 0.0); 

  const g = 120 + 120 * Math.sin(phase + 2.1); 

  const b = 120 + 120 * Math.sin(phase + 4.2); 

  return [r, g, b]; 

} 

Draw oil slick pond skin  function drawOilSlickPondSkin(ctx, w, h, time) { 

  const step = 2; 

  // dark pond base 

 
 
 
 
 
 

  ctx.fillStyle = "rgb(2,5,9)"; 

  ctx.fillRect(0, 0, w, h); 

  for (let y = 0; y < h; y += step) { 

    for (let x = 0; x < w; x += step) { 

      const m = oilMask(x, y, time); 

      if (m < 0.47) continue; 

      const t = oilThickness(x, y, time); 

      const edge = Math.max(0, 1 - Math.abs(m - 0.47) * 40); 

      const bands = Math.abs(Math.sin(t * 22 + time * 0.7)); 

      const phase = t * 16 + m * 5 + time * 0.25; 

      const [r, g, b] = thinFilmRGB(phase); 

      const alpha = 0.12 + Math.pow(bands, 4) * 0.36 + edge * 0.22; 

      ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`; 

      ctx.fillRect(x, y, step, step); 

      if (edge > 0.5) { 

        ctx.fillStyle = `rgba(255,255,255,${edge * 0.25})`; 

        ctx.fillRect(x, y, 1, 1); 

 
 
 
 
 
 
 

      } 

    } 

  } 

} 

Add floating rupture lines  function drawOilRuptureLine(ctx, x1, y1, x2, y2, time, hue) { 

  ctx.strokeStyle = `hsla(${hue + time * 20},100%,70%,0.22)`; 

  ctx.lineWidth = 7; 

  ctx.lineCap = "round"; 

  ctx.beginPath(); 

  ctx.moveTo(x1, y1); 

  ctx.lineTo(x2, y2); 

  ctx.stroke(); 

  ctx.strokeStyle = "rgba(255,255,255,0.18)"; 

  ctx.lineWidth = 1; 

  ctx.beginPath(); 

  ctx.moveTo(x1, y1); 

  ctx.lineTo(x2, y2); 

  ctx.stroke(); 

} 

 
 
 
 

Variations 

Blacklight oil pond 

Dark base, saturated cyan/magenta/green film. 

Candy gasoline 

Pastel weird, more playful. 

Cosmic puddle 

Oil slick becomes nebula-like with star glints. 

Medical film 

Thin rainbow membrane over matte biological surface.