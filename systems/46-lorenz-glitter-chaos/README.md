# ✦ System 46: LORENZ GLITTER — Chaos Made Shine

## Core Idea

Sparkle that follows strange attractors. Not random — **deterministically unpredictable**. The same seed always produces the same sparkle path, but you can never predict it without running it. Each sparkle has a **fingerprint**, a signature trajectory.

The Lorenz system: three variables, three parameters, infinite complexity. A butterfly flaps its wings in Brazil and the sparkle in Tokyo changes color. **Sensitive dependence on initial conditions = every sparkle is unique**.

## Physics

Lorenz attractor:
- dx/dt = σ(y − x)
- dy/dt = x(ρ − z) − y
- dz/dt = xy − βz

Parameters: σ=10, ρ=28, β=8/3 (classic chaotic regime)

The attractor has two lobes. Particles orbit one lobe, then unpredictably flip to the other. The flip is the event. The orbit is the rhythm.

## Concept

**A glitter ecology where each particle is a Lorenz system.**

- Species A: σ=10, ρ=28, β=8/3 (classic butterfly)
- Species B: σ=14, ρ=45, β=5/2 (faster flipping)
- Species C: σ=5, ρ=15, β=2 (stable orbits, rare flips)

Each species has a different "personality":
- A: unpredictable, dramatic, two-lobed
- B: hyperactive, frequent flips, nervous
- C: calm, orbital, meditative

The shine is the **collective behavior of hundreds of chaotic particles**.

## Math Systems

| Component | Math | Purpose |
|-----------|------|---------|
| Particle dynamics | Lorenz ODE integration | trajectory |
| Species parameters | (σ, ρ, β) tuples | personality |
| Color mapping | z-coordinate → hue | height = color |
| Brightness | velocity magnitude | fast = bright |
| Trails | Decay buffer | temporal memory |
| Interaction | Distance perturbation | particle coupling |

## Code Hook (GLSL)

```glsl
// ✦ Lorenz Glitter — System 46
// Single-particle Lorenz attractor visualization

uniform float u_time;
uniform vec2 u_resolution;
uniform vec3 u_lorenzParams; // sigma, rho, beta

vec3 lorenzStep(vec3 pos, vec3 params, float dt) {
  float sigma = params.x;
  float rho = params.y;
  float beta = params.z;

  float dx = sigma * (pos.y - pos.x);
  float dy = pos.x * (rho - pos.z) - pos.y;
  float dz = pos.x * pos.y - beta * pos.z;

  return pos + vec3(dx, dy, dz) * dt;
}

vec3 lorenzColor(vec3 pos, float velocity) {
  // z-coordinate maps to hue
  float hue = (pos.z + 20.0) / 50.0 * 360.0;

  // velocity maps to brightness
  float brightness = 0.3 + velocity * 0.7;

  // x-y position determines saturation
  float dist = length(pos.xy);
  float saturation = 0.5 + smoothstep(0.0, 30.0, dist) * 0.5;

  return hsv2rgb(vec3(hue, saturation, brightness));
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec3 color = vec3(0.02, 0.03, 0.05); // dark background

  // Multiple particles
  for (float i = 0.0; i < 50.0; i++) {
    // Unique seed per particle
    float seed = i * 1.618033988749895;

    // Initial conditions (sensitive!)
    vec3 pos = vec3(
      sin(seed * 7.0) * 10.0 + 0.1 * fract(sin(seed * 13.0) * 43758.5453),
      cos(seed * 11.0) * 10.0,
      15.0 + sin(seed * 3.0) * 5.0
    );

    // Species parameters vary by seed
    vec3 params = u_lorenzParams;
    params.x += sin(seed * 2.0) * 2.0; // sigma variation
    params.y += cos(seed * 3.0) * 5.0; // rho variation

    // Integrate Lorenz system
    float t = u_time * 0.5;
    float dt = 0.01;
    for (float step = 0.0; step < 200.0; step++) {
      pos = lorenzStep(pos, params, dt);
      if (step > t * 10.0) break;
    }

    // Project to screen
    vec2 screenPos = pos.xy * 0.02 + 0.5;
    float dist = length(uv - screenPos);

    // Velocity for brightness
    vec3 nextPos = lorenzStep(pos, params, dt);
    float velocity = length(nextPos - pos);

    // Glow
    float glow = exp(-dist * dist * 5000.0) * (0.5 + velocity * 2.0);
    vec3 particleColor = lorenzColor(pos, velocity);

    color += particleColor * glow * 0.3;
  }

  // Tone mapping
  color = color / (1.0 + color * 0.5);

  gl_FragColor = vec4(color, 1.0);
}
```

## Code Hook (JS)

```javascript
// ✦ Lorenz Glitter — System 46
// Particle system with chaotic trajectories

class LorenzParticle {
  constructor(seed, params = { sigma: 10, rho: 28, beta: 8/3 }) {
    this.seed = seed;
    this.sigma = params.sigma + (Math.random() - 0.5) * 2;
    this.rho = params.rho + (Math.random() - 0.5) * 5;
    this.beta = params.beta + (Math.random() - 0.5) * 0.5;

    // Sensitive initial conditions
    this.pos = {
      x: Math.sin(seed * 7) * 10 + Math.random() * 0.1,
      y: Math.cos(seed * 11) * 10,
      z: 15 + Math.sin(seed * 3) * 5
    };

    this.trail = [];
    this.maxTrail = 50;
    this.color = this.computeColor();
  }

  step(dt = 0.01) {
    const { x, y, z } = this.pos;

    const dx = this.sigma * (y - x);
    const dy = x * (this.rho - z) - y;
    const dz = x * y - this.beta * z;

    this.pos.x += dx * dt;
    this.pos.y += dy * dt;
    this.pos.z += dz * dt;

    // Record trail
    this.trail.push({ ...this.pos });
    if (this.trail.length > this.maxTrail) this.trail.shift();

    this.color = this.computeColor();
  }

  computeColor() {
    const hue = ((this.pos.z + 20) / 50) * 360;
    const velocity = Math.sqrt(
      Math.pow(this.sigma * (this.pos.y - this.pos.x), 2) +
      Math.pow(this.pos.x * (this.rho - this.pos.z) - this.pos.y, 2)
    );
    const brightness = 30 + Math.min(velocity * 10, 70);
    return `hsla(${hue}, 70%, ${brightness}%, 0.8)`;
  }

  draw(ctx, centerX, centerY, scale = 0.02) {
    // Draw trail
    if (this.trail.length > 1) {
      ctx.beginPath();
      for (let i = 0; i < this.trail.length; i++) {
        const t = this.trail[i];
        const alpha = i / this.trail.length;
        if (i === 0) {
          ctx.moveTo(centerX + t.x * scale, centerY + t.y * scale);
        } else {
          ctx.lineTo(centerX + t.x * scale, centerY + t.y * scale);
        }
      }
      ctx.strokeStyle = this.color.replace('0.8', '0.3');
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw particle
    const screenX = centerX + this.pos.x * scale;
    const screenY = centerY + this.pos.y * scale;

    ctx.fillStyle = this.color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(screenX, screenY, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

class LorenzGlitterSystem {
  constructor(count = 100) {
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push(new LorenzParticle(i));
    }
  }

  update() {
    for (const p of this.particles) p.step();
  }

  draw(ctx, w, h) {
    ctx.fillStyle = 'rgba(5, 8, 15, 0.1)';
    ctx.fillRect(0, 0, w, h);

    for (const p of this.particles) {
      p.draw(ctx, w / 2, h / 2);
    }
  }
}

// Usage
const system = new LorenzGlitterSystem(100);
function animate() {
  system.update();
  system.draw(ctx, canvas.width, canvas.height);
  requestAnimationFrame(animate);
}
```

## Showcase Build 1: "Butterfly Storm"

**Concept:** 500 Lorenz particles, classic parameters. Two lobes visible as color clusters — warm colors (red/orange) on one lobe, cool (blue/cyan) on the other. Particles flip between lobes unpredictably, creating color mixing at the center.

**Math:** σ=10, ρ=28, β=8/3. 500 particles. Color from z-coordinate. Trail decay over 30 frames.

**Visual:** Dark background. Two swirling "wings" of color. Occasional particle flips create bright streaks across the center. Like a butterfly made of fire and ice.

## Showcase Build 2: "Nervous System"

**Concept:** Particles with different ρ values = different "personalities." High ρ = hyperactive, frequent flips. Low ρ = stable orbits. The system looks like a neural network — some nodes fire constantly, others pulse rhythmically.

**Math:** ρ distributed 15-45. σ=10, β=8/3. Color from ρ value (low=calm blue, high=agitated red).

**Visual:** Network of nodes. Hyperactive nodes glow white-hot. Stable nodes pulse gently. Connections form when particles pass close to each other.

## Showcase Build 3: "Chaos Garden"

**Concept:** Particles as "seeds" that grow trails like vines. Each particle's trail is a Lorenz orbit. Trails accumulate, creating a dense, organic structure. New particles spawn when trails intersect.

**Math:** Trail accumulation. Intersection detection. Spawn probability from intersection density.

**Visual:** Dense, tangled garden of light-vines. Some areas thick with growth, others sparse. The garden evolves, grows, dies back. Like bioluminescent kudzu.

## Showcase Build 4: "Strange Echo"

**Concept:** Two identical Lorenz systems with slightly different initial conditions (0.001 difference). Start synchronized, then diverge. The divergence IS the visual — two identical sparkle clouds that slowly become different.

**Math:** Two systems, same parameters, x₀ differs by 0.001. Measure divergence over time. Color from divergence magnitude.

**Visual:** Initially: single cloud. After 10 seconds: two distinct clouds. After 30 seconds: completely different patterns. The split is visible as a color gradient from identical (white) to divergent (rainbow).

## Showcase Build 5: "Attractor Fossil"

**Concept:** Long-exposure capture of Lorenz attractor. Thousands of particles, trails accumulated over minutes. The result is a **density map of the attractor** — bright where particles spend more time, dark where they rarely go.

**Math:** Density accumulation buffer. 10,000 particles, 10-minute exposure. Log-scale brightness for visibility.

**Visual:** The classic Lorenz attractor shape, but made of light. Two lobes clearly visible. The "eyes" of the lobes are dark (particles orbit, don't stop). The bridges between lobes are bright (particles cross quickly). Like a constellation map of chaos.

## Cross-Breeds

- + System 5 (Glitter ecology): chaos + ecology = competing attractor species
- + System 11 (Anatomy): chaotic neurons = nervous system visualization
- + System 33 (Sonoluminescence): chaotic particle collisions = flash events
- + System 44 (Phosphorescence): chaotic trails with memory = temporal fossils
- + System 28 (Quantum dust): quantum chaos = wavefunction attractors

---

*"The butterfly flaps its wings, and the sparkle changes color."*
