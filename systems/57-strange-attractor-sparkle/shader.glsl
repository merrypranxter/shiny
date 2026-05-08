// System 57: Strange Attractor Sparkle
// Chaotic systems rendered as sparkle trails — deterministic ghosts
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_mode;
// 0=lorenz, 1=rossler, 2=aizawa, 3=morph, 4=orchestra
uniform sampler2D u_attractor_points; // Precomputed points (x,y,z,velocity)
uniform float u_point_count;
uniform float u_trail_length;
// how many previous points to show
uniform float u_point_size;
#define PI 3.14159265359
#define MAX_POINTS 5000
// Hash for variation
float hash(float n) {
return fract(sin(n * 12.9898) * 43758.5453);
}
// Project 3D point to 2D with rotation
vec2 project3D(vec3 p, float time) {
float rotX = time * 0.1;
float rotY = time * 0.15;
// Rotate around Y
float x1 = p.x * cos(rotY) - p.z * sin(rotY);
float z1 = p.x * sin(rotY) + p.z * cos(rotY);
// Rotate around X
float y2 = p.y * cos(rotX) - z1 * sin(rotX);
float z2 = p.y * sin(rotX) + z1 * cos(rotX);

// Perspective
float perspective = 1.0 / (1.0 + z2 * 0.1);
return vec2(x1, y2) * perspective;
}
// Color from velocity
vec3 velocityColor(float vel) {
float hue = fract(vel * 0.5 + 0.3);
vec3 c;
float h = hue * 6.0;
float i = floor(h);
float f = h - i;
float q = 1.0 - f;
if (i == 0.0) c = vec3(1.0, f, 0.0);
else if (i == 1.0) c = vec3(q, 1.0, 0.0);
else if (i == 2.0) c = vec3(0.0, 1.0, f);
else if (i == 3.0) c = vec3(0.0, q, 1.0);
else if (i == 4.0) c = vec3(f, 0.0, 1.0);
else c = vec3(1.0, 0.0, q);
return c;
}
// Position-based color (for Aizawa sphere)
vec3 positionColor(vec3 p) {
float r = length(p);
float hue = fract(atan(p.y, p.x) / (2.0 * PI) + 0.5);
float sat = smoothstep(0.0, 2.0, r);
float val = 0.5 + 0.5 * sin(p.z * 2.0);
vec3 c;
float h = hue * 6.0;
float i = floor(h);
float f = h - i;
float q = 1.0 - f;
if (i == 0.0) c = vec3(1.0, f, 0.0);
else if (i == 1.0) c = vec3(q, 1.0, 0.0);
else if (i == 2.0) c = vec3(0.0, 1.0, f);
else if (i == 3.0) c = vec3(0.0, q, 1.0);
else if (i == 4.0) c = vec3(f, 0.0, 1.0);
else c = vec3(1.0, 0.0, q);
return c * sat * val;
}
// Trail fade
float trailFade(float pointIndex, float currentIndex, float trailLength) {
float dist = abs(currentIndex - pointIndex);
if (dist > trailLength) return 0.0;

return 1.0 - dist / trailLength;
}
void main() {
vec2 uv = gl_FragCoord.xy / u_resolution.xy;
vec2 p = uv * 2.0 - 1.0;
p.x *= u_resolution.x / u_resolution.y;
vec3 color = vec3(0.02, 0.02, 0.05);
float pointCount = min(u_point_count, float(MAX_POINTS));
float currentIndex = mod(u_time * 50.0, pointCount);
if (u_mode < 3.5) {
// Single attractor modes
for (float i = 0.0; i < float(MAX_POINTS); i++) {
if (i >= pointCount) break;
float u = (i + 0.5) / pointCount;
vec4 pointData = texture2D(u_attractor_points, vec2(u, 0.5));
vec3 pos = pointData.xyz;
float vel = pointData.w;
vec2 proj = project3D(pos, u_time);
float d = length(p - proj);
// Trail effect
float trail = trailFade(i, currentIndex, u_trail_length);
float size = u_point_size * (1.0 + vel * 0.5);
float glow = exp(-d * d / (size * size)) * trail;
// Color
vec3 pointColor;
if (u_mode < 0.5 || u_mode > 2.5) {
// Lorenz / Morph: velocity color
pointColor = velocityColor(vel);
} else if (u_mode < 1.5) {
// Rössler: warm ribbon
pointColor = mix(vec3(1.0, 0.3, 0.1), vec3(0.9, 0.8, 0.2), vel * 0.5);
} else {
// Aizawa: position color
pointColor = positionColor(pos);
}
color += pointColor * glow * 0.5;
}
} else {
// Orchestra: multiple attractors
for (float a = 0.0; a < 5.0; a++) {
float offset = a * 1000.0;

float scale = 0.3 + a * 0.15;
vec2 center = vec2(
cos(a * 1.256) * 0.6,
sin(a * 1.256) * 0.6
);
for (float i = 0.0; i < 1000.0; i++) {
float idx = offset + i;
if (idx >= pointCount) break;
float u = (idx + 0.5) / pointCount;
vec4 pointData = texture2D(u_attractor_points, vec2(u, 0.5));
vec3 pos = pointData.xyz * scale;
float vel = pointData.w;
vec2 proj = project3D(pos, u_time + a) + center;
float d = length(p - proj);
float trail = trailFade(idx, currentIndex, u_trail_length * 0.5);
float size = u_point_size * scale;
float glow = exp(-d * d / (size * size)) * trail;
vec3 attractorColor = vec3(
sin(a * 1.2) * 0.5 + 0.5,
sin(a * 1.2 + 2.0) * 0.5 + 0.5,
sin(a * 1.2 + 4.0) * 0.5 + 0.5
);
color += attractorColor * glow * 0.3;
}
}
}
// Tone mapping
color = color / (1.0 + color * 0.5);
// Vignette
float vignette = 1.0 - smoothstep(0.5, 1.5, length(p));
color *= vignette;
gl_FragColor = vec4(color, 1.0);
}