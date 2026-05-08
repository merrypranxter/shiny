# ✦ System 33: SONOLUMINESCENCE

## Core Idea

Sound collapsing bubbles = light. Tiny, violent, brief. Scale it up: **acoustic cavitation as sparkle source**. Not "sound makes pretty colors" — actual light from pressure collapse. A surface where tapping creates pinpricks of light at impact sites, like bioluminescence but mechanical.

## Physics

Sonoluminescence: collapsing cavitation bubble compresses gas adiabatically, temperature reaches ~10,000K, emits broadband light. The light is **a sonic boom made of photons**.

## Concept

**A material that sparkles when struck, bent, or vibrated.**

- Impact → cavitation bubble → collapse → flash
- Frequency of impact = frequency of flashes
- Intensity of impact = brightness of flash
- Material fatigue = more sensitive (more bubbles form)

The shine is **mechanical energy made visible**. Like a drum skin that lights up when hit.

## Math Systems

| Component | Math | Purpose |
|-----------|------|---------|
| Impact detection | Distance field + velocity | trigger points |
| Bubble dynamics | Rayleigh-Plesset equation | collapse timing |
| Light emission | Blackbody spectrum ~10,000K | color/brightness |
| Decay | Exponential fade | flash duration |

## Code Hook (GLSL)

```glsl
vec3 sonoluminescence(vec2 uv, vec2 impactPoints[10], float time) {
  vec3 color = vec3(0.0);

  for (int i = 0; i < 10; i++) {
    vec2 impact = impactPoints[i];
    float dist = length(uv - impact);

    // Time since impact
    float dt = time - impactTimes[i];
    if (dt < 0.0 || dt > 0.1) continue; // flash duration

    // Bubble collapse: radius shrinks, temperature rises
    float radius = 1.0 - dt * 10.0; // normalized
    float temperature = 10000.0 * pow(radius, -3.0); // adiabatic heating

    // Blackbody color
    vec3 bbColor = blackbody(temperature);

    // Flash intensity: sharp peak at collapse
    float intensity = exp(-dt * 50.0) * smoothstep(0.0, 0.01, dt);

    // Spatial falloff
    float falloff = exp(-dist * dist * 100.0);

    color += bbColor * intensity * falloff;
  }

  return color;
}

vec3 blackbody(float temperature) {
  // Approximate blackbody color
  float t = temperature / 1000.0;
  float r = 1.0;
  float g = 0.0;
  float b = 0.0;

  if (t <= 6.0) {
    g = pow(t / 6.0, 0.5);
    b = 0.0;
  } else {
    g = 1.0;
    b = 1.0 - exp(-(t - 6.0) * 0.5);
  }

  return vec3(r, g, b);
}
```

## Variants

- **Sonoluminescent skin**: body that flashes at pulse points (wrists, neck)
- **Sonoluminescent rain**: raindrops that flash on impact
- **Sonoluminescent fabric**: textile that sparkles when worn/moved
- **Sonoluminescent geology**: rocks that flash when struck (mineral inclusions)
- **Sonoluminescent instrument**: musical instrument where notes = light flashes

## Cross-Breeds

- + System 10 (Wet/Dry): cavitation in liquid layer
- + System 29 (Sonic): sound field creates cavitation pattern
- + System 12 (Repair): fatigue points = more sonoluminescent
- + System 5 (Glitter ecology): sparkle population from impact history
- + System 30 (Entropic): material degradation = more cavitation sites

---

*"The light is the sound dying."*
