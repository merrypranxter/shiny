/* EXO-PRISMATIC SINGULARITY // MASTER TEMPLATE V1.0
 * [DNA MODULES: CLIFFORD, POINCARE, PHYSARUM, GEMATRIA, MANTIS]
 *
 * This is the "God Class" for your reposcripter — a template that allows the
 * machine to iterate on "Good Weird Fractal Art" by simply modulating a handful
 * of high-level functions. Change getFractalGnosis() or getProjectedSpace() to
 * spawn entirely different species of fractals without rewriting the pipeline.
 *
 * Assumes a multipass environment (FBOs) where the host app handles ping-ponging.
 * Uniforms:
 *   u_resolution  — vec2 canvas size in pixels
 *   u_time        — float seconds elapsed
 *   u_backbuffer  — sampler2D previous frame
 *   u_audioBass   — float [0,1] low-frequency energy
 *   u_audioTreble — float [0,1] high-frequency energy
 */

precision highp float;

uniform vec2      u_resolution;
uniform float     u_time;
uniform sampler2D u_backbuffer;
uniform float     u_audioBass;
uniform float     u_audioTreble;

// ---------------------------------------------------------------------------
// MODULE 01: TOPOLOGY (Pass H)
// Stereographic projection from 4D torus with W-axis rotation.
// ---------------------------------------------------------------------------
vec2 getProjectedSpace() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

  // Tile the 4D Torus
  vec4 p4 = vec4(cos(uv.x * 6.28), sin(uv.x * 6.28),
                 cos(uv.y * 6.28), sin(uv.y * 6.28));

  float spin = u_time * 0.1 + u_audioBass * 2.0;

  // 4D W-axis rotation (The Whirring)
  mat2 rot = mat2(cos(spin), -sin(spin), sin(spin), cos(spin));
  p4.xw = rot * p4.xw;

  return p4.xy / (2.0 - p4.w); // Stereographic projection
}

// ---------------------------------------------------------------------------
// MODULE 02: THE FRACTAL CORE (Pass C)
// 4D Julia-set-style iteration with orbit trap.
// Swap this function to create new fractal species.
// ---------------------------------------------------------------------------
float getFractalGnosis(vec2 p) {
  vec4 z = vec4(p, sin(u_time * 0.1), cos(u_time * 0.1));
  vec4 c = vec4(p, 0.4, 0.3);
  float d = 1000.0;

  for (int i = 0; i < 24; i++) {
    // Rotation in xy plane
    float angle = 0.2;
    mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    z.xy = rot * z.xy;

    // 4D quadratic map
    z = vec4(
      z.x * z.x - z.y * z.y,
      2.0 * z.x * z.y,
      z.z * z.z - z.w * z.w,
      2.0 * z.z * z.w
    ) + c;

    // Orbit Trap: node clustering
    d = min(d, length(z.xyz - sign(z.xyz) * 0.6));
  }

  return d;
}

// ---------------------------------------------------------------------------
// MODULE 03: BIOMORPHIC GROWTH (Pass D / E)
// Physarum-like slime mold pheromone decay from backbuffer.
// ---------------------------------------------------------------------------
vec3 getSlimeVeins(vec2 uv) {
  vec4 prev = texture2D(u_backbuffer, uv);

  // Sense: sample 3 directions ahead
  float senseAngle = 0.4;
  vec2 dir = normalize(prev.rg * 2.0 - 1.0 + 0.001);
  float speed = 0.003;

  vec2 fwd   = uv + dir * speed;
  vec2 left  = uv + (cos(senseAngle) * dir + sin(senseAngle)  * vec2(-dir.y,  dir.x)) * speed;
  vec2 right = uv + (cos(senseAngle) * dir + sin(-senseAngle) * vec2(-dir.y,  dir.x)) * speed;

  float fL = texture2D(u_backbuffer, fract(left)).b;
  float fF = texture2D(u_backbuffer, fract(fwd)).b;
  float fR = texture2D(u_backbuffer, fract(right)).b;

  // Steer toward pheromone
  if (fF > fL && fF > fR) {
    // continue forward
  } else if (fL > fR) {
    dir = cos(senseAngle) * dir + sin(senseAngle) * vec2(-dir.y, dir.x);
  } else {
    dir = cos(senseAngle) * dir + sin(-senseAngle) * vec2(-dir.y, dir.x);
  }

  // Deposit pheromone
  float deposit = 0.85 + u_audioBass * 0.15;
  vec3 updated  = prev.rgb * 0.95; // decay
  updated.b     = min(1.0, updated.b + deposit * 0.1);

  return updated;
}

// ---------------------------------------------------------------------------
// MODULE 04: SPECTRAL COMPOSITOR (Pass G)
// Thin-film interference — mantis shrimp vision.
// ---------------------------------------------------------------------------
vec3 applyMantisVision(vec3 col, float gnosis) {
  float thickness = gnosis * 400.0 + u_audioTreble * 100.0;
  vec3 spectral   = 0.5 + 0.5 * cos(
    6.28318 * thickness / vec3(400.0, 550.0, 700.0)
    + vec3(0.0, 2.0, 4.0)
  );
  return col * spectral;
}

// ---------------------------------------------------------------------------
// PALETTE: Mantis-style oscillating color
// ---------------------------------------------------------------------------
vec3 mantisPalette(float t) {
  vec3 a = vec3(0.5, 0.5, 0.5);
  vec3 b = vec3(0.5, 0.5, 0.5);
  vec3 c = vec3(1.0, 1.0, 0.5);
  vec3 d = vec3(0.80, 0.90, 0.30);
  return a + b * cos(6.28318 * (c * t + d));
}

// ---------------------------------------------------------------------------
// MAIN — Five-pass synthesis
// ---------------------------------------------------------------------------
void main() {
  // 1. TOPOLOGY — project into interesting space
  vec2 p = getProjectedSpace();

  // 2. GNOSIS — run the fractal core
  float gnosis = getFractalGnosis(p);

  // 3. BIOLOGY — slime vein layer from backbuffer
  vec2  screenUV = gl_FragCoord.xy / u_resolution;
  vec3  biology  = getSlimeVeins(screenUV);

  // 4. SEMANTICS — identify peak / node positions for glyph logic
  float peak = step(0.98, 1.0 - gnosis);

  // 5. SYNTHESIS — combine all layers
  vec3 color = mantisPalette(gnosis * 10.0 + u_time);
  color = abs(color - biology);           // XOR interference
  color = applyMantisVision(color, gnosis);

  // Add glowing sigil logic at peaks
  color += peak * vec3(0.0, 1.0, 0.8) * u_audioTreble;

  // Slight temporal accumulation
  vec3 prev = texture2D(u_backbuffer, screenUV).rgb;
  color = mix(color, prev, 0.15);

  gl_FragColor = vec4(color, 1.0);
}

// ---------------------------------------------------------------------------
// MUTATION GUIDE (for Sentient Seeder)
// ---------------------------------------------------------------------------
//
// To spawn new fractal species, replace getFractalGnosis with any of:
//
//   MANDELBOX variant:
//     fold the components: z = clamp(z, -1, 1)*2 - z
//     then scale: z = z * scale + c
//
//   APOLLONIAN variant:
//     use inversion: z = z / dot(z, z) * k - c
//
//   CLIFFORD ATTRACTOR:
//     x' = sin(a*y) + c*cos(a*x)
//     y' = sin(b*x) + d*cos(b*y)
//
//   POINCARÉ DISK:
//     use Möbius transform: z = (z - p) / (1 - conj(p)*z)
//
// The rest of the pipeline (slime, mantis vision, synthesis) stays the same.
// Only the "gnosis" value changes species.
