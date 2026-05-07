// System 49: Escher Chrome
// Conformal map reflection — circles stay circles, space bends
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_map_type;
// 0=mobius, 1=inversion, 2=hyperbolic, 3=schwarz
uniform vec2 u_mobius_a;
// Möbius parameter a (complex)
uniform vec2 u_mobius_b;
// Möbius parameter b (complex)
uniform vec2 u_mobius_c;
// Möbius parameter c (complex)
uniform vec2 u_mobius_d;
// Möbius parameter d (complex)
uniform float u_inversion_radius; // Inversion radius
uniform vec2 u_inversion_center;
// Inversion center
#define PI 3.14159265359
// Complex arithmetic
vec2 cmul(vec2 a, vec2 b) {

return vec2(a.x*b.x - a.y*b.y, a.x*b.y + a.y*b.x);
}
vec2 cdiv(vec2 a, vec2 b) {
float denom = dot(b, b);
return vec2(dot(a, b), a.y*b.x - a.x*b.y) / denom;
}
vec2 cconj(vec2 z) {
return vec2(z.x, -z.y);
}
float cabs(vec2 z) {
return length(z);
}
// Möbius transform: f(z) = (az+b)/(cz+d)
vec2 mobius(vec2 z, vec2 a, vec2 b, vec2 c, vec2 d) {
vec2 num = cmul(a, z) + b;
vec2 den = cmul(c, z) + d;
return cdiv(num, den);
}
// Circle inversion: f(z) = R² / (z - c)̄ + c
vec2 inversion(vec2 z, vec2 center, float R) {
vec2 dz = z - center;
float r2 = dot(dz, dz);
if (r2 < 0.0001) return vec2(1e6); // singularity
return center + (R * R / r2) * dz;
}
// Hyperbolic disk map: f(z) = (z - a)/(1 - āz)
vec2 hyperbolic(vec2 z, vec2 a) {
vec2 num = z - a;
vec2 den = vec2(1.0, 0.0) - cmul(cconj(a), z);
return cdiv(num, den);
}
// Environment reflection (simplified)
vec3 envReflect(vec2 uv) {
float angle = atan(uv.y, uv.x);
float r = length(uv);
return vec3(
0.5 + 0.5 * cos(angle * 2.0 + u_time * 0.3),
0.5 + 0.5 * cos(angle * 3.0 + u_time * 0.5 + 1.0),
0.5 + 0.5 * cos(angle * 5.0 + u_time * 0.7 + 2.0)
) * (1.0 - r * 0.5);
}
// Chrome shading with conformal distortion

vec3 chromeConformal(vec2 uv, vec2 mapped_uv, float map_type) {
// Base environment
vec3 base = envReflect(mapped_uv);
// Chrome reflectivity varies with map type
float reflectivity = 0.8;
// Add geometric pattern based on original coordinates
float grid = 0.0;
if (map_type < 0.5) {
// Möbius: circles stay circles
float circles = abs(fract(cabs(uv) * 5.0) - 0.5) * 2.0;
grid = smoothstep(0.9, 1.0, circles);
} else if (map_type < 1.5) {
// Inversion: radial lines
float angle = atan(uv.y, uv.x);
grid = smoothstep(0.95, 1.0, abs(sin(angle * 8.0)));
} else if (map_type < 2.5) {
// Hyperbolic: concentric circles
float hyp_dist = cabs(hyperbolic(uv, vec2(0.0)));
grid = smoothstep(0.9, 1.0, abs(fract(hyp_dist * 10.0) - 0.5) * 2.0);
} else {
// Schwarz-Christoffel: polygon edges
float angle = atan(uv.y, uv.x);
float polygon = abs(sin(angle * 5.0)) * cabs(uv);
grid = smoothstep(0.8, 1.0, polygon);
}
// Combine
vec3 color = base * reflectivity;
color += vec3(grid * 0.3);
// Specular highlight
float highlight = pow(max(0.0, 1.0 - length(mapped_uv)), 4.0);
color += vec3(highlight * 0.5);
return color;
}
// Circle Limit tiling pattern
float circleLimitPattern(vec2 z) {
// Poincaré disk: |z| < 1
float r = cabs(z);
if (r >= 1.0) return 0.0;
// Hyperbolic distance from center
float hyp_r = atanh(r);
// Tile boundaries (simplified)
float tiles = abs(fract(hyp_r * 3.0) - 0.5) * 2.0;
float angle = atan(z.y, z.x);

tiles += abs(fract(angle * 4.0 / PI) - 0.5) * 2.0;
return smoothstep(1.8, 2.0, tiles);
}
void main() {
vec2 uv = gl_FragCoord.xy / u_resolution.xy;
vec2 p = uv * 2.0 - 1.0;
p.x *= u_resolution.x / u_resolution.y;
// Apply conformal map
vec2 mapped;
if (u_map_type < 0.5) {
mapped = mobius(p, u_mobius_a, u_mobius_b, u_mobius_c, u_mobius_d);
} else if (u_map_type < 1.5) {
mapped = inversion(p, u_inversion_center, u_inversion_radius);
} else if (u_map_type < 2.5) {
mapped = hyperbolic(p, vec2(0.3 * cos(u_time), 0.3 * sin(u_time)));
} else {
// Schwarz-Christoffel approximation: power map
vec2 logz = vec2(log(cabs(p)), atan(p.y, p.x));
mapped = vec2(cos(logz.y * 0.4) * exp(logz.x * 0.4), sin(logz.y * 0.4) * exp(logz.x * 0.4));
}
// Chrome reflection through distorted space
vec3 color = chromeConformal(p, mapped, u_map_type);
// Circle limit pattern for hyperbolic mode
if (u_map_type > 1.5 && u_map_type < 2.5) {
float pattern = circleLimitPattern(p);
color = mix(color, vec3(0.9, 0.95, 1.0), pattern * 0.3);
}
// Vignette
float vignette = 1.0 - smoothstep(0.5, 1.5, length(p));
color *= vignette;
gl_FragColor = vec4(color, 1.0);
}