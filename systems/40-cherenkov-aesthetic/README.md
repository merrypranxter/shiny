# ✦ System 40: CHERENKOV RADIATION (AESTHETICIZED)

## Core Idea

Blue glow from particles moving faster than light in a medium. Obviously not real Cherenkov, but the **aesthetic of light cones, shock fronts, blue glow preceding an object**. Like a sonic boom but for light. Use it for "speed lines" that are optical, not drawn.

## Physics

Cherenkov radiation: charged particle moves faster than phase velocity of light in medium. Emits coherent shockwave cone. Angle: cos(θ) = c/(nv). **The blue glow is the optical Mach cone**.

## Concept

**Objects that emit a blue wake as they move.**

- Speed lines that are actual light, not drawn
- Wake that persists after object passes
- Cone angle that changes with speed
- Color that shifts from UV (fast) to blue (slow)
- Interference between multiple wakes

The aesthetic is **relativistic optics made visible**. Like seeing the speed of light.

## Math Systems

| Component | Math | Purpose |
|-----------|------|---------|
| Shock cone | Mach angle equation | cone geometry |
| Emission spectrum | Frank-Tamm formula | intensity vs wavelength |
| Wake persistence | Decay + diffusion | temporal trail |
| Multiple sources | Interference | complex patterns |

## Code Hook (GLSL)

```glsl
vec3 cherenkovWake(vec2 uv, vec2 sourcePos, vec2 sourceVel, float time) {
  vec2 toSource = sourcePos - uv;
  float dist = length(toSource);
  float sourceSpeed = length(sourceVel);

  // Mach angle: cos(theta) = c / (n * v)
  float c = 1.0; // speed of light in vacuum (normalized)
  float n = 1.33; // refractive index (water)
  float v = sourceSpeed;
  float cosTheta = c / (n * v);
  float theta = acos(clamp(cosTheta, -1.0, 1.0));

  // Cone geometry
  vec2 sourceDir = normalize(sourceVel);
  float angleToSource = acos(dot(normalize(toSource), sourceDir));
  float inCone = smoothstep(theta - 0.1, theta, angleToSource) * 
                 smoothstep(theta + 0.1, theta, angleToSource);

  // Time delay: light arrives after particle
  float delay = dist / (c / n);
  float dt = time - delay;
  if (dt < 0.0) return vec3(0.0);

  // Intensity: Frank-Tamm formula proxy
  float intensity = (1.0 - cosTheta) * exp(-dt * 2.0) / (dist * dist + 0.01);

  // Color: Cherenkov is blue
  vec3 cherenkovColor = vec3(0.3, 0.6, 1.0);

  // Speed-dependent hue shift
  float hueShift = (v - 0.5) * 0.3;
  cherenkovColor = mix(cherenkovColor, vec3(0.5, 0.3, 1.0), hueShift);

  return cherenkovColor * intensity * inCone;
}
```

## Variants

- **Cherenkov typography**: letters that leave blue wakes when typed
- **Cherenkov vehicle**: car/bike with optical speed trail
- **Cherenkov meteor**: falling star with persistent light cone
- **Cherenkov particle**: subatomic aesthetic, quantum speed visualization
- **Cherenkov music**: notes that emit wakes based on frequency

## Cross-Breeds

- + System 29 (Sonic): sonic boom + Cherenkov = double shock
- + System 7 (Weather): storm fronts as Cherenkov cones
- + System 19 (Caustic): caustic + Cherenkov = light shock interference
- + System 24 (Caustic chromatics): chromatic Cherenkov = rainbow wake
- + System 40 (Cherenkov) + System 40 (Cherenkov): intersecting wakes = interference

---

*"The object is faster than light in its own medium, and the medium glows with betrayal."*
