// System 52: Gravity Chrome
// Geodesic reflection through curved space — general relativity made material
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_curvature_type; // 0=sphere, 1=hyperbolic, 2=schwarzschild, 3=saddle, 4=wormhole
uniform float u_mass;
// mass parameter (for Schwarzschild)
uniform float u_curvature;
// curvature magnitude
uniform vec2 u_lens_center;
// center of curvature
#define PI 3.14159265359
#define EPS 0.001
// Metric tensor components for different spaces
// Sphere: ds² = R²(dθ² + sin²θ dφ²)
// Hyperbolic: ds² = R²(dθ² + sinh²θ dφ²)
// Schwarzschild: ds² = -(1-2M/r)dt² + (1-2M/r)⁻¹dr² + r²dΩ²

// Sphere metric
vec2 sphereMetric(vec2 coords, float R) {
float theta = coords.x;
float g_theta = R * R;
float g_phi = R * R * sin(theta) * sin(theta);
return vec2(g_theta, g_phi);
}
// Hyperbolic (Poincaré disk) metric
vec2 hyperbolicMetric(vec2 coords, float R) {
float r2 = dot(coords, coords);
float factor = 4.0 * R * R / ((1.0 - r2) * (1.0 - r2));
return vec2(factor, factor);
}
// Schwarzschild metric (simplified for spatial part)
vec2 schwarzschildMetric(vec2 coords, float M) {
float r = length(coords);
float r_s = 2.0 * M; // Schwarzschild radius
if (r < r_s + EPS) {
// Inside event horizon — return large values
return vec2(1e6, 1e6);
}
float g_r = 1.0 / (1.0 - r_s / r);
float g_theta = r * r;
return vec2(g_r, g_theta);
}
// Saddle (hyperbolic paraboloid) metric
vec2 saddleMetric(vec2 coords, float K) {
float x = coords.x;
float y = coords.y;
float g_xx = 1.0 + K * K * x * x;
float g_yy = 1.0 + K * K * y * y;
return vec2(g_xx, g_yy);
}
// Wormhole metric (Morris-Thorne, simplified)
vec2 wormholeMetric(vec2 coords, float throat) {
float r = length(coords);
float r2 = r * r + throat * throat;
float g_r = 1.0;
float g_theta = r2;
return vec2(g_r, g_theta);
}
// Geodesic step (simplified Euler integration)
// Returns new position and direction

vec4 geodesicStep(vec2 pos, vec2 dir, float dt, float curvatureType, float param) {
vec2 metric;
vec2 dmetric;
if (curvatureType < 0.5) {
// Sphere
metric = sphereMetric(pos, param);
dmetric = vec2(
2.0 * param * param * sin(pos.x) * cos(pos.x),
0.0
);
} else if (curvatureType < 1.5) {
// Hyperbolic
metric = hyperbolicMetric(pos, param);
float r2 = dot(pos, pos);
float factor = 16.0 * param * param * r2 / pow(1.0 - r2, 3);
dmetric = vec2(factor, factor);
} else if (curvatureType < 2.5) {
// Schwarzschild
metric = schwarzschildMetric(pos, param);
float r = length(pos);
float r_s = 2.0 * param;
dmetric = vec2(
-r_s / (r * r * pow(1.0 - r_s / r, 2)),
2.0 * r
);
} else if (curvatureType < 3.5) {
// Saddle
metric = saddleMetric(pos, param);
dmetric = vec2(
2.0 * param * param * pos.x,
2.0 * param * param * pos.y
);
} else {
// Wormhole
metric = wormholeMetric(pos, param);
dmetric = vec2(
2.0 * pos.x,
2.0 * pos.y
);
}
// Christoffel symbols (simplified 2D)
vec2 gamma = dmetric / (2.0 * metric);
// Update direction
vec2 newDir = dir - gamma * dir * dir * dt;
// Normalize
float dirLen = length(newDir);
if (dirLen > EPS) newDir = normalize(newDir);

// Update position
vec2 newPos = pos + newDir * dt;
return vec4(newPos, newDir);
}
// Trace geodesic and compute color
vec3 traceGeodesic(vec2 startPos, vec2 startDir, float curvatureType, float param) {
vec2 pos = startPos;
vec2 dir = startDir;
vec3 color = vec3(0.0);
float totalDist = 0.0;
float dt = 0.01;
int steps = 100;
for (int i = 0; i < 100; i++) {
if (totalDist > 5.0) break;
// Step geodesic
vec4 step = geodesicStep(pos, dir, dt, curvatureType, param);
pos = step.xy;
dir = step.zw;
totalDist += dt;
// Sample environment at current position
float angle = atan(pos.y, pos.x);
float r = length(pos);
vec3 envColor = vec3(
0.5 + 0.5 * cos(angle * 2.0 + u_time * 0.3),
0.5 + 0.5 * cos(angle * 3.0 + u_time * 0.5 + 1.0),
0.5 + 0.5 * cos(angle * 5.0 + u_time * 0.7 + 2.0)
);
// Curvature-based coloring
float curvatureColor;
if (curvatureType < 0.5) {
// Sphere: warm, converging
curvatureColor = 1.0 - smoothstep(0.0, 1.0, r);
envColor = mix(envColor, vec3(1.0, 0.6, 0.3), curvatureColor * 0.5);
} else if (curvatureType < 1.5) {
// Hyperbolic: cool, diverging
curvatureColor = smoothstep(0.0, 1.0, r);
envColor = mix(envColor, vec3(0.3, 0.6, 1.0), curvatureColor * 0.5);
} else if (curvatureType < 2.5) {
// Schwarzschild: redshift near horizon
float r_s = 2.0 * param;
float redshift = 1.0 / sqrt(max(1.0 - r_s / r, 0.01));
envColor.r *= redshift;

envColor.b /= redshift;
} else if (curvatureType < 3.5) {
// Saddle: chaotic, mixed
curvatureColor = abs(sin(pos.x * 5.0) * cos(pos.y * 5.0));
envColor = mix(envColor, vec3(0.5, 1.0, 0.5), curvatureColor * 0.3);
} else {
// Wormhole: tunnel effect
float throat = param;
float tunnel = exp(-pow(r - throat, 2.0) / (throat * 0.5));
envColor = mix(envColor, vec3(0.8, 0.9, 1.0), tunnel * 0.5);
}
// Accumulate with distance falloff
float falloff = exp(-totalDist * 0.5);
color += envColor * falloff * dt;
}
return color;
}
// Chrome reflection with geodesic distortion
vec3 chromeGravity(vec2 uv, float curvatureType, float param) {
vec2 p = uv * 2.0 - 1.0;
p.x *= u_resolution.x / u_resolution.y;
// Ray direction from view point
vec2 dir = normalize(p - vec2(0.0, -0.5));
vec2 startPos = vec2(0.0, -0.5);
// Trace geodesic
vec3 color = traceGeodesic(startPos, dir, curvatureType, param);
// Chrome reflectivity
color *= 0.9;
// Specular highlight
float highlight = pow(max(0.0, 1.0 - length(p)), 3.0);
color += vec3(highlight * 0.3);
return color;
}
void main() {
vec2 uv = gl_FragCoord.xy / u_resolution.xy;
vec2 p = uv * 2.0 - 1.0;
p.x *= u_resolution.x / u_resolution.y;
// Chrome reflection through curved space
vec3 color = chromeGravity(uv, u_curvature_type, u_mass);
// Vignette

float vignette = 1.0 - smoothstep(0.5, 1.5, length(p));
color *= vignette;
// Tone mapping
color = color / (1.0 + color * 0.5);
gl_FragColor = vec4(color, 1.0);
}