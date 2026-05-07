# ✦ System 35: EVANESCENT WAVE COUPLING

## Core Idea

Light trapped at the boundary between two media, leaking exponentially. **The shine only exists at the interface** — touch the surface, you break the coupling, light escapes. Invisible until contact. Like a pool of light that only shows where something touches it.

## Physics

Total internal reflection: light in high-index medium reflects off boundary with low-index medium. But an evanescent wave extends into the lower-index medium, decaying exponentially with distance. **The light is there, but it can't leave** — unless something disturbs the boundary.

## Concept

**A surface that is dark until touched, then light blooms at the contact point.**

- No contact: total internal reflection, surface is mirror/dark
- Touch: finger (higher index) couples to evanescent wave, light tunnels out
- Drag: trail of light follows the finger
- Release: light fades as coupling breaks

The surface is a **light trap that only releases on contact**. Like a sleeping bioluminescence that wakes when touched.

## Math Systems

| Component | Math | Purpose |
|-----------|------|---------|
| Evanescent field | Exponential decay from boundary | field strength |
| Coupling efficiency | Overlap integral | light extraction |
| Contact map | Distance field from touch points | active regions |
| Decay | Exponential fade after release | temporal behavior |

## Code Hook (GLSL)

```glsl
vec3 evanescentCoupling(vec2 uv, vec2 touchPoints[5], float time) {
  // Evanescent field: decays from surface
  float depth = 0.1; // distance from interface
  float decayLength = 0.05;
  float fieldStrength = exp(-depth / decayLength);

  vec3 color = vec3(0.0);

  for (int i = 0; i < 5; i++) {
    vec2 touch = touchPoints[i];
    float dist = length(uv - touch);

    // Time since touch
    float dt = time - touchTimes[i];
    if (dt < 0.0) continue;

    // Coupling strength: strong at contact, fades with distance and time
    float coupling = exp(-dist * 10.0) * exp(-dt * 2.0);

    // Light extraction: evanescent field * coupling
    float extraction = fieldStrength * coupling;

    // Color: wavelength-dependent extraction
    vec3 extractedColor = vec3(
      extraction * 1.0,    // red extracts easiest
      extraction * 0.8,    // green
      extraction * 0.6     // blue hardest
    );

    color += extractedColor;
  }

  // Background: total internal reflection (dark mirror)
  vec3 background = vec3(0.02, 0.03, 0.05);

  return background + color;
}
```

## Variants

- **Evanescent skin**: body that only shows veins when touched
- **Evanescent text**: invisible writing that appears under finger
- **Evanescent topography**: terrain map that only reveals elevation on contact
- **Evanescent memory**: surface that retains touch history as fading light trails
- **Evanescent instrument**: piano keys that light up when pressed

## Cross-Breeds

- + System 1 (Veins): veins only visible when touching skin
- + System 4 (Buried): buried structure revealed by contact
- + System 9 (Embroidery): stitches that light up when traced
- + System 15 (Language): invisible text, readable by touch
- + System 29 (Sonic): sound + touch = evanescent light burst

---

*"The light is trapped, and the touch is the key."*
