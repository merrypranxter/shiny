// System 55: Cellular Automata Chrome
// Living chrome — continuous CA (Lenia-style) on reflective surface
uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_prevState;
// Previous frame CA state
uniform float u_mode;
// 0=living chrome, 1=gliders, 2=mitosis, 3=breeding, 4=frozen fire
uniform float u_mu;
// growth center
uniform float u_sigma;
// growth width
uniform float u_dt;
// time step
#define PI 3.14159265359
// Gaussian kernel for neighbor averaging
float gaussianKernel(vec2 offset, float radius) {
float r = length(offset);
return exp(-r * r / (2.0 * radius * radius));
}
// Bell-shaped growth function (Lenia)
float growth(float u, float mu, float sigma) {
return 2.0 * exp(-pow(u - mu, 2.0) / (2.0 * sigma * sigma)) - 1.0;
}
// Sample neighbor average with kernel
float neighborAverage(sampler2D state, vec2 uv, vec2 resolution, float radius) {
float sum = 0.0;
float weight = 0.0;

// Sample in 3x3 neighborhood
for (float x = -1.0; x <= 1.0; x += 1.0) {
for (float y = -1.0; y <= 1.0; y += 1.0) {
vec2 offset = vec2(x, y) / resolution * radius;
float w = gaussianKernel(vec2(x, y), 1.0);
sum += texture2D(state, uv + offset).r * w;
weight += w;
}
}
return sum / weight;
}
// Chrome reflection from CA state
vec3 chromeFromState(float state, vec2 uv, float time) {
// State = height map for chrome
float height = state;
// Normal from height gradient
vec2 grad = vec2(
dFdx(height),
dFdy(height)
);
vec3 normal = normalize(vec3(-grad, 1.0));
// Environment reflection
vec3 envColor = vec3(
0.5 + 0.5 * sin(uv.x * 3.0 + time * 0.3),
0.5 + 0.5 * sin(uv.y * 2.0 + time * 0.5 + 1.0),
0.5 + 0.5 * sin((uv.x + uv.y) * 4.0 + time * 0.7 + 2.0)
);
// Fresnel
float fresnel = pow(1.0 - abs(normal.z), 3.0);
// State-based color: low = cool, high = warm
vec3 stateColor = mix(
vec3(0.1, 0.2, 0.5),
// dead: deep blue
vec3(1.0, 0.8, 0.3),
// alive: warm gold
height
);
return mix(stateColor, envColor, fresnel * 0.5);
}
// Seed glider pattern
float gliderSeed(vec2 uv, vec2 center) {
vec2 d = (uv - center) * u_resolution;
float pattern = 0.0;

// Glider pattern (5 cells)
pattern += smoothstep(2.0, 0.0, length(d - vec2(0.0, 0.0)));
pattern += smoothstep(2.0, 0.0, length(d - vec2(1.0, 0.0)));
pattern += smoothstep(2.0, 0.0, length(d - vec2(2.0, 0.0)));
pattern += smoothstep(2.0, 0.0, length(d - vec2(2.0, 1.0)));
pattern += smoothstep(2.0, 0.0, length(d - vec2(1.0, 2.0)));
return clamp(pattern, 0.0, 1.0);
}
// Mitosis: split when mass > threshold
float mitosisRule(float state, float neighbors, float time) {
float growthRate = growth(neighbors, 0.35, 0.15);
float newState = state + u_dt * growthRate;
// Splitting: if too big, create two smaller
if (state > 0.8 && neighbors < 0.3) {
newState = 0.4; // Split into half
}
return clamp(newState, 0.0, 1.0);
}
// Frozen fire: temperature-based phase transition
float frozenFire(float state, float neighbors, float time) {
float temp = 0.5 + 0.3 * sin(time * 0.5); // oscillating temperature
float mu = mix(0.2, 0.5, temp); // high temp = chaotic, low = ordered
float sigma = mix(0.05, 0.2, temp);
float growthRate = growth(neighbors, mu, sigma);
return clamp(state + u_dt * growthRate, 0.0, 1.0);
}
void main() {
vec2 uv = gl_FragCoord.xy / u_resolution.xy;
vec2 p = uv * 2.0 - 1.0;
p.x *= u_resolution.x / u_resolution.y;
float state = texture2D(u_prevState, uv).r;
float neighbors = neighborAverage(u_prevState, uv, u_resolution, 3.0);
if (u_mode < 0.5) {
// Living Chrome
float growthRate = growth(neighbors, u_mu, u_sigma);
state = clamp(state + u_dt * growthRate, 0.0, 1.0);
} else if (u_mode < 1.5) {
// Glider Constellation
float growthRate = growth(neighbors, 0.35, 0.15);
state = clamp(state + u_dt * growthRate, 0.0, 1.0);

// Seed new gliders periodically
if (fract(u_time * 0.3) < 0.01) {
vec2 seedPos = vec2(
sin(u_time * 0.7) * 0.5 + 0.5,
cos(u_time * 0.5) * 0.5 + 0.5
);
state = max(state, gliderSeed(uv, seedPos));
}
} else if (u_mode < 2.5) {
// Mitosis Bloom
state = mitosisRule(state, neighbors, u_time);
} else if (u_mode < 3.5) {
// Rule Breeding: mix two rules
float rule1 = growth(neighbors, 0.35, 0.15);
float rule2 = growth(neighbors, 0.25, 0.1);
float mixFactor = 0.5 + 0.5 * sin(u_time * 0.2);
float growthRate = mix(rule1, rule2, mixFactor);
state = clamp(state + u_dt * growthRate, 0.0, 1.0);
} else {
// Frozen Fire
state = frozenFire(state, neighbors, u_time);
}
// Chrome reflection
vec3 color = chromeFromState(state, uv, u_time);
// Output state to framebuffer for next frame
gl_FragColor = vec4(color, state);
}