# ✦ SHADER TRANSLATIONS

GLSL patterns and RepoScripter instructions for turning these concepts into code.

## Core GLSL Patterns

### Vein Generator (SDF + Noise)
```glsl
float vein(vec2 uv, float t) {
  float n = fbm(uv * 3.0 + t * 0.1);
  float v = smoothstep(0.4, 0.5, n) * smoothstep(0.6, 0.5, n);
  return v;
}
```

### Tessellation Edge Glow
```glsl
float edgeGlow(vec2 uv, float thickness) {
  float dist = min(min(uv.x, uv.y), min(1.0-uv.x, 1.0-uv.y));
  return smoothstep(thickness, 0.0, dist);
}
```

### Kintsugi Crack
```glsl
float crack(vec2 uv, vec2 seed) {
  float n = noise(uv * 5.0 + seed);
  float c = smoothstep(0.48, 0.5, n) * smoothstep(0.52, 0.5, n);
  return c;
}
```

### Glitter Sparkle
```glsl
float sparkle(vec2 uv, float density, float seed) {
  vec2 id = floor(uv * density);
  float n = hash(id + seed);
  return step(0.97, n) * n;
}
```

### Thin Film / Oil Slick
```glsl
vec3 oilSlick(float phase) {
  return 0.5 + 0.5 * cos(phase + vec3(0.0, 2.1, 4.2));
}
```

### Caustic Warp
```glsl
float caustic(vec2 uv, float t) {
  vec2 p = uv * 2.0 - 1.0;
  float c = 0.0;
  for(int i = 0; i < 4; i++) {
    p = abs(p) / dot(p,p) - vec2(0.7 + sin(t*0.2)*0.1);
    c += exp(-length(p) * 3.0);
  }
  return c * 0.5;
}
```

## RepoScripter Instructions

For each system file, the code extraction pattern is:
1. Identify the math system used (Voronoi, fBm, DLA, etc.)
2. Find the "Code hook" or pseudocode block
3. Translate to GLSL or JS depending on target
4. Add the optical material behavior as shader uniforms
5. Layer: host (base) → structure (math) → shine (material)

## Singularity Template

```glsl
// Uniforms: u_time, u_resolution, u_mouse
// varyings: v_uv

void main() {
  vec2 uv = v_uv;
  float t = u_time;

  // 1. Host surface (matte)
  vec3 host = matteColor(uv);

  // 2. Structure field (math system)
  float structure = mathSystem(uv, t);

  // 3. Optical material
  vec3 shine = opticalMaterial(structure, uv, t);

  // 4. Hierarchy blend
  vec3 color = mix(host, shine, structure);

  gl_FragColor = vec4(color, 1.0);
}
```

---

*Translate concepts to code. Make it run.*
