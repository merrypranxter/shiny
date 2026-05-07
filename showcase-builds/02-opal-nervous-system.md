# ✦ Showcase Build 02

2. OPAL NERVOUS SYSTEM 

Idea 

A dark matte surface contains a branching neural web of opal-like structural color. Synapses 
flash like tiny jewels. 

It is not blood. 
It is signal. 

Think:  black rubber 

+  milky opal nerves 

 
 
 

+  electric pearl synapses 

Concept / principle 

The key principle:  shine as signal transmission 

A circulatory system carries fluid. 
A nervous system carries impulses. 

So the shine should be:  faster 
● 
●  sharper 
●  more electric 
● 
less liquid 
●  more event-based 

How it works 

Use a branching graph, but render it differently: 

Nerve fibers 

Thin pearlescent lines with hue-shifting gradients. 

Synapses 

Bright circular nodes at junctions. 

Signal pulses 

Fast white/color pings traveling along the graph. 

 
 
 
 

Background 

Very dark matte host, so opal colors pop. 

Why it works 

Opal color already feels like hidden structure. 
Nerves already feel like hidden information. 

Together:  the surface is thinking in shine 

That is strong. 

Goal 

Make the viewer feel:  light is firing through a hidden intelligence 

Code principle 

Compared to glitter circulation:  fewer random glitter particles 

● 
●  more directional pulses 
●  more node flashes 
thinner fibers 
● 
●  opal color shifts by angle/path direction 

Opal nerve segment snippet 

 
 
 
 
 
  function drawOpalNerve(ctx, seg, time) { 

  const { x1, y1, x2, y2, width, phase } = seg; 

  const dx = x2 - x1; 

  const dy = y2 - y1; 

  const angle = Math.atan2(dy, dx); 

  const hueA = (170 + angle * 80 + time * 18 + phase * 20) % 360; 

  const hueB = (280 + angle * 120 - time * 14) % 360; 

  // dim embedded haze 

  ctx.strokeStyle = `hsla(${hueA}, 100%, 65%, 0.07)`; 

  ctx.lineWidth = width * 5; 

  ctx.lineCap = "round"; 

  ctx.beginPath(); 

  ctx.moveTo(x1, y1); 

  ctx.lineTo(x2, y2); 

  ctx.stroke(); 

  // opal core 

  const grad = ctx.createLinearGradient(x1, y1, x2, y2); 

  grad.addColorStop(0.0, `hsla(${hueA}, 100%, 78%, 0.72)`); 

  grad.addColorStop(0.45, "rgba(255,255,255,0.58)"); 

  grad.addColorStop(1.0, `hsla(${hueB}, 100%, 72%, 0.72)`); 

 
 
 
 

  ctx.strokeStyle = grad; 

  ctx.lineWidth = Math.max(1, width * 0.75); 

  ctx.beginPath(); 

  ctx.moveTo(x1, y1); 

  ctx.lineTo(x2, y2); 

  ctx.stroke(); 

} 

Signal pulse snippet  function drawNervePulse(ctx, seg, time, index) { 

  const speed = 0.55; 

  const t = (time * speed + index * 0.19 + seg.phase) % 1; 

  const x = seg.x1 + (seg.x2 - seg.x1) * t; 

  const y = seg.y1 + (seg.y2 - seg.y1) * t; 

  const hue = (190 + index * 47 + time * 80) % 360; 

  const g = ctx.createRadialGradient(x, y, 0, x, y, 16); 

  g.addColorStop(0, "rgba(255,255,255,0.95)"); 

  g.addColorStop(0.18, `hsla(${hue},100%,75%,0.65)`); 

  g.addColorStop(1, "rgba(0,0,0,0)"); 

 
 
 
 
 
 

  ctx.fillStyle = g; 

  ctx.beginPath(); 

  ctx.arc(x, y, 16, 0, Math.PI * 2); 

  ctx.fill(); 

} 

Synapse node snippet  function drawOpalSynapse(ctx, x, y, r, time, id) { 

  const pulse = 0.5 + 0.5 * Math.sin(time * 5 + id * 1.7); 

  const hue = (170 + id * 43 + time * 25) % 360; 

  const g = ctx.createRadialGradient(x - r * 0.25, y - r * 0.35, 0, x, y, r); 

  g.addColorStop(0.00, "rgba(255,255,255,0.95)"); 

  g.addColorStop(0.18, `hsla(${hue},100%,82%,${0.7 + pulse * 0.25})`); 

  g.addColorStop(0.55, `hsla(${hue + 90},100%,55%,0.55)`); 

  g.addColorStop(1.00, "rgba(20,0,35,0)"); 

  ctx.fillStyle = g; 

  ctx.beginPath(); 

  ctx.arc(x, y, r * (0.8 + pulse * 0.25), 0, Math.PI * 2); 

  ctx.fill(); 

} 

 
 
 
 
 

Variations 

Soft opal brain 

Milky pastel nerves on translucent white. 

Alien interface 

Opal synapses arranged like circuit-board anatomy. 

Blacklight organism 

Dark background with violent cyan/violet nerve firing. 

Sacred diagram 

Nervous system arranged radially like a mandala, but asymmetrical and alive.