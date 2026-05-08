// System 47: Cusp Flash
// Cusp catastrophe with hysteresis — shine that explodes at critical points
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_control_a;
// normal factor (-2 to 2)
uniform float u_control_b;
// splitting factor (-1 to 1)
uniform float u_hysteresis;
// 0 or 1, previous state memory

uniform float u_flash;
// flash intensity (0-1, peaks at catastrophe)
#define PI 3.14159265359
// Hash for sparkle variation
float hash(vec2 p) {
return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}
// Cusp catastrophe potential: V(x) = x^4/4 + a*x^2/2 + b*x
// We solve for equilibria and determine which branch we're on
float cuspState(float a, float b, float hysteresis) {
// Discriminant of x^3 + a*x + b = 0
float discriminant = -(4.0 * a * a * a + 27.0 * b * b);
// If discriminant > 0: three real roots (bistable region)
// If discriminant < 0: one real root (monostable)
float state;
if (discriminant > 0.0) {
// Bistable: hysteresis determines which branch
state = hysteresis;
} else {
// Monostable: forced to single branch
state = (b > 0.0) ? 0.0 : 1.0;
}
return state;
}
// Chrome reflection with cusp distortion
vec3 chromeReflect(vec2 uv, float state, float flash) {
vec2 p = uv * 2.0 - 1.0;
float r = length(p);
float angle = atan(p.y, p.x);
// State 1 = chrome (high reflectivity), State 0 = matte
float reflectivity = mix(0.1, 0.95, state);
// Environment reflection (simplified)
vec3 envColor = vec3(
0.5 + 0.5 * cos(angle * 3.0 + u_time * 0.5),
0.5 + 0.5 * cos(angle * 2.0 + u_time * 0.3 + 1.0),
0.5 + 0.5 * cos(angle * 4.0 + u_time * 0.7 + 2.0)
);
// Add flash spectrum during catastrophe
float flashSpectrum = flash * (
0.5 + 0.5 * cos(r * 20.0 - u_time * 10.0)
);

vec3 flashColor = vec3(
1.0,
0.8 + 0.2 * cos(u_time * 15.0),
0.6 + 0.4 * sin(u_time * 15.0)
);
return mix(envColor * reflectivity, flashColor, flashSpectrum);
}
// Hysteresis boundary detection
float catastropheFlash(float a, float b, float prevState, float currState) {
// Flash when state changes (the catastrophe event)
float stateChange = abs(currState - prevState);
// Also flash near the cusp boundary (anticipation)
float boundary = -(4.0 * a * a * a + 27.0 * b * b);
float nearBoundary = smoothstep(0.0, 0.5, boundary) * smoothstep(2.0, 0.5, boundary);
return stateChange + nearBoundary * 0.3;
}
void main() {
vec2 uv = gl_FragCoord.xy / u_resolution.xy;
vec2 p = uv * 2.0 - 1.0;
p.x *= u_resolution.x / u_resolution.y;
// Current cusp state
float state = cuspState(u_control_a, u_control_b, u_hysteresis);
// Detect catastrophe
float flash = catastropheFlash(u_control_a, u_control_b, u_hysteresis, state);
flash = clamp(flash, 0.0, 1.0);
// Chrome reflection
vec3 color = chromeReflect(uv, state, flash);
// Add sparkle noise for texture
float sparkle = hash(gl_FragCoord.xy + u_time) * 0.1 * state;
color += vec3(sparkle);
// Vignette
float vignette = 1.0 - smoothstep(0.5, 1.5, length(p));
color *= vignette;
gl_FragColor = vec4(color, 1.0);
}