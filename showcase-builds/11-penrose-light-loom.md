# ✦ Showcase Build 11

11. PENROSE LIGHT LOOM 

Idea 

A Penrose-ish quasicrystal tiling woven from colored reflective light-strands on a matte dark 
host. 

Not regular tiles. 
Not a clean grid. 
A slightly impossible geometric fabric. 

 
 
 
 

Think:  black felt ground 

+  quasicrystal edge network 

+  fiber-optic metallic rainbow threads 

Concept / principle 

The principle:  non-repeating geometry makes shine feel intelligent 

Penrose tilings and quasicrystal patterns have order without obvious repetition. That is perfect 
for shine because it makes the highlights feel designed, but not wallpaper-simple. 

The shine lives in:  tile edges 
thread crossings 

● 
● 
●  vertex nodes 
● 
● long directional seams 
local star clusters 

How it works 

A true Penrose implementation can get complex. For RepoScripter, use a buildable 
approximation: 

Option A: polar quasicrystal line families 

 
 
 
 

Draw several families of parallel lines at golden-ratio-related angles. Their intersections form a 
Penrose-ish woven structure. 

Option B: rhombus field approximation 

Generate points on several rotated grids, connect near intersections. 

Option C: starburst quasicrystal graph 

Use angular spokes and nested radii, connect points by nearest neighbors. 

For JS5 Canvas, Option C is easiest and looks great. 

Why it works 

Because the eye reads:  this pattern has laws 

But it cannot immediately compress those laws into a boring grid. 

The shine gets to travel through a strange organized network. 

Goal 

Make the design feel like:  a sacred carpet woven from spectral fiber optics  but not tasteful. Make it electric, synthetic, slightly mall-hologram, slightly alien math textile. 

Core system 

Generate quasicrystal-ish points: 

 
 
 
 
 

●  multiple rings 
●  golden angle 
●  slight radial wobble 
●  connect nearby points 
● 
● render edges as light threads 
render vertices as tiny glints 

Quasicrystal point field  function makeQuasiLoomPoints(w, h, count) { 

  const pts = []; 

  const cx = w / 2; 

  const cy = h / 2; 

  const maxR = Math.min(w, h) * 0.48; 

  const goldenAngle = Math.PI * (3 - Math.sqrt(5)); 

  for (let i = 0; i < count; i++) { 

    const t = i / Math.max(1, count - 1); 

    const r = maxR * Math.sqrt(t); 

    const a = i * goldenAngle; 

    // Penrose-ish radial irregularity 

    const wobble = 

      1 + 

      0.08 * Math.sin(i * 0.618) + 

      0.04 * Math.sin(i * 1.618); 

 
 
 
 

    pts.push({ 

      x: cx + Math.cos(a) * r * wobble, 

      y: cy + Math.sin(a) * r * wobble, 

      ring: Math.floor(t * 12), 

      id: i 

    }); 

  } 

  return pts; 

} 

Connect near neighbors  function makeLoomEdges(pts, maxEdgesPerPoint = 3) { 

  const edges = []; 

  const seen = new Set(); 

  for (let i = 0; i < pts.length; i++) { 

    const near = []; 

    for (let j = 0; j < pts.length; j++) { 

      if (i === j) continue; 

      const dx = pts[j].x - pts[i].x; 

 
 
 
 
 
 

      const dy = pts[j].y - pts[i].y; 

      const d2 = dx * dx + dy * dy; 

      near.push({ j, d2 }); 

    } 

    near.sort((a, b) => a.d2 - b.d2); 

    for (let k = 0; k < maxEdgesPerPoint; k++) { 

      const j = near[k].j; 

      const key = i < j ? `${i}:${j}` : `${j}:${i}`; 

      if (!seen.has(key)) { 

        seen.add(key); 

        edges.push([i, j]); 

      } 

    } 

  } 

  return edges; 

} 

Fiber-optic edge renderer 

 
 
 
 
 
 
  function drawFiberEdge(ctx, a, b, time, id) { 

  const dx = b.x - a.x; 

  const dy = b.y - a.y; 

  const len = Math.hypot(dx, dy) || 1; 

  const nx = -dy / len; 

  const ny = dx / len; 

  const hueA = (190 + id * 17 + time * 35 + a.ring * 22) % 360; 

  const hueB = (310 + id * 11 - time * 25 + b.ring * 31) % 360; 

  // buried glow halo 

  ctx.strokeStyle = `hsla(${hueA},100%,65%,0.07)`; 

  ctx.lineWidth = 10; 

  ctx.lineCap = "round"; 

  ctx.beginPath(); 

  ctx.moveTo(a.x, a.y); 

  ctx.lineTo(b.x, b.y); 

  ctx.stroke(); 

  // colored optical thread 

  const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y); 

  grad.addColorStop(0.0, `hsla(${hueA},100%,60%,0.88)`); 

  grad.addColorStop(0.45, "rgba(255,255,255,0.78)"); 

  grad.addColorStop(1.0, `hsla(${hueB},100%,65%,0.88)`); 

 
 
 

  ctx.strokeStyle = grad; 

  ctx.lineWidth = 2.8; 

  ctx.beginPath(); 

  ctx.moveTo(a.x, a.y); 

  ctx.lineTo(b.x, b.y); 

  ctx.stroke(); 

  // offset specular rail 

  ctx.strokeStyle = "rgba(255,255,255,0.18)"; 

  ctx.lineWidth = 1; 

  ctx.beginPath(); 

  ctx.moveTo(a.x + nx * 2, a.y + ny * 2); 

  ctx.lineTo(b.x + nx * 2, b.y + ny * 2); 

  ctx.stroke(); 

} 

Vertex jewel  function drawLoomVertex(ctx, p, time) { 

  const flash = 0.5 + 0.5 * Math.sin(time * 5 + p.id * 0.71); 

  const r = flash > 0.86 ? 4 : 2; 

  ctx.fillStyle = `rgba(255,255,255,${0.28 + flash * 0.5})`; 

 
 
 
 
 

  ctx.beginPath(); 

  ctx.arc(p.x, p.y, r, 0, Math.PI * 2); 

  ctx.fill(); 

  if (flash > 0.9) { 

    ctx.strokeStyle = "rgba(255,255,255,0.7)"; 

    ctx.beginPath(); 

    ctx.moveTo(p.x - 8, p.y); 

    ctx.lineTo(p.x + 8, p.y); 

    ctx.moveTo(p.x, p.y - 8); 

    ctx.lineTo(p.x, p.y + 8); 

    ctx.stroke(); 

  } 

} 

Variations 

Sacred mall carpet 

Quasicrystal geometry, absurd holographic fiber. 

Opal math textile 

Milky pastel background, gentle opal threads. 

Blacklight loom 

Dark velvet base, cyan/magenta/yellow violent threads. 

 
 
 

Broken quasicrystal 

Some edges missing, some over-bright, like a light loom with bad wiring.