// ✦ System 46: LORENZ GLITTER — Chaos Made Shine
// GLSL Fragment Shader
// Compatible: WebGL 2.0 / OpenGL ES 3.0 / GLSL 3.3+

#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec3 u_lorenzParams; // sigma, rho, beta

out vec4 fragColor;

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

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
  float hue = (pos.z + 20.0) / 50.0 * 360.0;
  float brightness = 0.3 + velocity * 0.7;
  float dist = length(pos.xy);
  float saturation = 0.5 + smoothstep(0.0, 30.0, dist) * 0.5;
  return hsv2rgb(vec3(hue, saturation, brightness));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec3 color = vec3(0.02, 0.03, 0.05);

  for (float i = 0.0; i < 50.0; i++) {
    float seed = i * 1.618033988749895;

    vec3 pos = vec3(
      sin(seed * 7.0) * 10.0 + 0.1 * fract(sin(seed * 13.0) * 43758.5453),
      cos(seed * 11.0) * 10.0,
      15.0 + sin(seed * 3.0) * 5.0
    );

    vec3 params = u_lorenzParams;
    params.x += sin(seed * 2.0) * 2.0;
    params.y += cos(seed * 3.0) * 5.0;

    float t = u_time * 0.5;
    float dt = 0.01;
    for (float step = 0.0; step < 200.0; step++) {
      pos = lorenzStep(pos, params, dt);
      if (step > t * 10.0) break;
    }

    vec2 screenPos = pos.xy * 0.02 + 0.5;
    float dist = length(uv - screenPos);

    vec3 nextPos = lorenzStep(pos, params, dt);
    float velocity = length(nextPos - pos);

    float glow = exp(-dist * dist * 5000.0) * (0.5 + velocity * 2.0);
    vec3 particleColor = lorenzColor(pos, velocity);

    color += particleColor * glow * 0.3;
  }

  color = color / (1.0 + color * 0.5);
  fragColor = vec4(color, 1.0);
}
