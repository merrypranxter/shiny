# ✦ System 28: QUANTUM DUST

## Core Idea

Quantum dots are semiconductor nanocrystals where size determines color — quantum confinement effect. Smaller = bluer, larger = redder. Usually manufactured precisely. Instead: **generative size distributions that produce color fields**.

Build shine from populations of quantum dots with size distributions that follow mathematical patterns. The color comes from the **statistics of the population**, not from any individual dot.

## Concept

**Fields of quantum dots where size = color, and size distribution = color gradient**.

- Region A: small dots (blue) clustered
- Region B: medium dots (green) in bands  
- Region C: large dots (red) scattered
- Boundary: size gradient = smooth color transition

The result: a color field that is actually a **size distribution field**. The dots are too small to see individually — only the collective color is visible.

## Math Systems

| Component | Math | Purpose |
|-----------|------|---------|
| Dot field | Blue noise + density gradient | population |
| Size distribution | Gaussian per region | color assignment |
| Color | Quantum confinement formula | λ ≈ 1/size |
| Render | Aggregate color per pixel | visual output |

## Code Hook (GLSL)

```glsl
vec3 quantumDust(vec2 uv, float t) {
  // Multiple scales of dots
  vec3 color = vec3(0.0);
  float totalWeight = 0.0;

  for(float scale = 1.0; scale < 50.0; scale *= 2.0) {
    vec2 id = floor(uv * scale);
    float n = hash(id + t * 0.01);

    // Size varies with position
    float size = 2.0 + fbm(uv * 2.0) * 8.0 + n * 2.0;

    // Quantum confinement: smaller = bluer
    vec3 dotColor = 0.5 + 0.5 * cos(10.0/size + vec3(0.0, 2.1, 4.2));

    float weight = 1.0 / scale;
    color += dotColor * weight;
    totalWeight += weight;
  }

  return color / totalWeight;
}
```

## Variants

- **Quantum dust storm**: particles where wind sorts by size = color gradients
- **Quantum dust sediment**: geological layers of size-sorted dots
- **Quantum dust biology**: cells where organelles are different-sized dots
- **Quantum dust galaxy**: star field where stellar size = color (unreal but aesthetic)
- **Quantum dust breath**: exhaled particles that change size = color over time

## Why It Works

Quantum dots are **real nanotechnology** — the connection between size and color is physics, not design. By making the size distribution generative, you create color fields that feel **grounded in reality but impossible in nature**. The viewer senses there's real science behind the beauty.

## Cross-Breeds

- + System 5 (Glitter ecology): ecology where species = dot sizes = colors
- + System 17 (Mirror dust): mirror particles that are also quantum dots
- + System 23 (Disorder): quasi-ordered quantum dot arrays
- + System 14 (Residue): contamination where particle size = color signature

---

*"The color is the size, and the size is the population."*
