// System 59: Topology Chrome
// Chrome that knows its shape — topological invariants as reflection
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_mode;
// 0=sphere, 1=torus, 2=klein, 3=genus, 4=morph
uniform float u_genus;
// number of holes
uniform float u_morph_t;
// morph parameter
#define PI 3.14159265359
#define TAU 6.28318530718

// SDF primitives
float sdSphere(vec3 p, float r) {
return length(p) - r;
}
float sdTorus(vec3 p, vec2 t) {
vec2 q = vec2(length(p.xz) - t.x, p.y);
return length(q) - t.y;
}
float sdBox(vec3 p, vec3 b) {
vec3 d = abs(p) - b;
return min(max(d.x, max(d.y, d.z)), 0.0) + length(max(d, 0.0));
}
// Klein bottle SDF (approximation)
float sdKlein(vec3 p, float scale) {
p /= scale;
float x = p.x, y = p.y, z = p.z;
float a = 2.0;
float r = a + cos(y * 0.5) * sin(x * 0.5) - sin(y * 0.5) * cos(x * 0.5) * 0.5;
float dx = r * cos(y) - x;
float dy = r * sin(y) - z;
float dz = -sin(y * 0.5) * sin(x * 0.5) - cos(y * 0.5) * cos(x * 0.5) * 0.5 - y;
return length(vec3(dx, dy, dz)) * scale;
}
// Genus-g surface (g holes)
float sdGenus(vec3 p, int g, float scale) {
float d = sdSphere(p, scale);
// Subtract tunnels
for (int i = 0; i < 5; i++) {
if (i >= g) break;
float angle = float(i) * TAU / float(g);
vec3 tunnelCenter = vec3(cos(angle), 0.0, sin(angle)) * scale * 0.6;
float tunnel = sdTorus(p - tunnelCenter, vec2(scale * 0.3, scale * 0.15));
d = max(d, -tunnel); // CSG subtraction
}
return d;
}
// Morph between shapes
float sdMorph(vec3 p, float t) {
float sphere = sdSphere(p, 0.5);
float torus = sdTorus(p, vec2(0.4, 0.15));
// Smooth morph
float morph = smoothstep(0.0, 1.0, t);
return mix(sphere, torus, morph);

}
// Normal from SDF
vec3 calcNormal(vec3 p, float mode, float genus, float morph_t) {
float eps = 0.001;
vec2 h = vec2(eps, 0.0);
float d;
if (mode < 0.5) d = sdSphere(p, 0.5);
else if (mode < 1.5) d = sdTorus(p, vec2(0.4, 0.15));
else if (mode < 2.5) d = sdKlein(p, 0.5);
else if (mode < 3.5) d = sdGenus(p, int(genus), 0.5);
else d = sdMorph(p, morph_t);
return normalize(vec3(
d - sdSphere(p - h.xyy, 0.5),
d - sdSphere(p - h.yxy, 0.5),
d - sdSphere(p - h.yyx, 0.5)
));
}
// Evaluate SDF
float map(vec3 p, float mode, float genus, float morph_t) {
if (mode < 0.5) return sdSphere(p, 0.5);
else if (mode < 1.5) return sdTorus(p, vec2(0.4, 0.15));
else if (mode < 2.5) return sdKlein(p, 0.5);
else if (mode < 3.5) return sdGenus(p, int(genus), 0.5);
else return sdMorph(p, morph_t);
}
// Topology-based coloring
vec3 topologyColor(vec3 p, vec3 normal, float mode, float genus) {
vec3 color;
if (mode < 0.5) {
// Sphere: simply connected, uniform
float lat = asin(normal.y) / PI + 0.5;
float lon = atan(normal.z, normal.x) / TAU + 0.5;
color = vec3(lon, lat, 0.5);
} else if (mode < 1.5) {
// Torus: two loop directions
float major = atan(p.z, p.x) / TAU + 0.5; // major loop
float minor = atan(p.y, length(p.xz) - 0.4) / TAU + 0.5; // minor loop
color = vec3(major, minor, 0.5);
} else if (mode < 2.5) {
// Klein bottle: non-orientable
float u = atan(p.z, p.x) / TAU + 0.5;
float v = p.y * 0.5 + 0.5;
// Mirror every other cycle (non-orientable)

float mirror = step(0.5, fract(u * 2.0));
color = mix(vec3(u, v, 0.5), vec3(1.0 - u, v, 0.5), mirror);
} else if (mode < 3.5) {
// Genus garden: color by hole
float angle = atan(p.z, p.x);
float hole = floor((angle / TAU + 0.5) * genus) / genus;
color = vec3(hole, 0.5, 1.0 - hole);
} else {
// Morph: interpolate colors
color = mix(vec3(0.5, 0.7, 1.0), vec3(1.0, 0.5, 0.3), morph_t);
}
return color;
}
// Ray marching
vec4 rayMarch(vec3 ro, vec3 rd, float mode, float genus, float morph_t) {
float t = 0.0;
float d;
for (int i = 0; i < 100; i++) {
vec3 p = ro + rd * t;
d = map(p, mode, genus, morph_t);
if (d < 0.001 || t > 5.0) break;
t += d * 0.5;
}
return vec4(ro + rd * t, d);
}
// Chrome reflection
vec3 chromeReflect(vec3 p, vec3 normal, vec3 rd, float mode, float genus) {
// Reflect view direction
vec3 reflectDir = reflect(rd, normal);
// Environment
vec3 envColor = vec3(
0.5 + 0.5 * sin(reflectDir.x * 3.0 + u_time * 0.3),
0.5 + 0.5 * sin(reflectDir.y * 2.0 + u_time * 0.5 + 1.0),
0.5 + 0.5 * sin(reflectDir.z * 4.0 + u_time * 0.7 + 2.0)
);
// Topology color
vec3 topoColor = topologyColor(p, normal, mode, genus);
// Fresnel
float fresnel = pow(1.0 - max(dot(-rd, normal), 0.0), 3.0);

return mix(topoColor * 0.5, envColor, fresnel);
}
void main() {
vec2 uv = gl_FragCoord.xy / u_resolution.xy;
vec2 p = uv * 2.0 - 1.0;
p.x *= u_resolution.x / u_resolution.y;
// Camera
vec3 ro = vec3(0.0, 0.0, 2.0);
vec3 rd = normalize(vec3(p, -1.0));
// Rotate camera
float camAngle = u_time * 0.2;
ro = vec3(
ro.x * cos(camAngle) - ro.z * sin(camAngle),
ro.y,
ro.x * sin(camAngle) + ro.z * cos(camAngle)
);
// Ray march
vec4 hit = rayMarch(ro, rd, u_mode, u_genus, u_morph_t);
vec3 hitPoint = hit.xyz;
float dist = hit.w;
vec3 color = vec3(0.02, 0.02, 0.05);
if (dist < 0.001) {
vec3 normal = calcNormal(hitPoint, u_mode, u_genus, u_morph_t);
color = chromeReflect(hitPoint, normal, rd, u_mode, u_genus);
}
// Vignette
float vignette = 1.0 - smoothstep(0.5, 1.5, length(p));
color *= vignette;
gl_FragColor = vec4(color, 1.0);
}