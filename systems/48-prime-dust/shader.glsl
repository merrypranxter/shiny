// System 48: Prime Dust
// Sparkle placement from prime sequences — secret math message in the glitter
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_prime_index;
// starting prime index
uniform float u_count;
// number of sparkles
uniform float u_mode;
// 0=ulam, 1=gap rain, 2=twin, 3=mersenne, 4=goldbach
#define PI 3.14159265359
#define TAU 6.28318530718
// Deterministic pseudo-random (for non-prime variation)
float hash(float n) {
return fract(sin(n * 12.9898) * 43758.5453);
}

// Approximate nth prime using prime number theorem
// p(n) ≈n * (ln n + ln ln n - 1) for n >= 4
float nthPrimeApprox(float n) {
if (n < 4.0) return n * 2.0; // rough: 2, 3, 5, 7
float ln_n = log(n);
return n * (ln_n + log(ln_n) - 1.0);
}
// Prime gap approximation (average gap ~ ln p)
float primeGapApprox(float n) {
return log(nthPrimeApprox(n));
}
// Ulam spiral coordinate from integer n
vec2 ulamCoord(float n) {
float k = ceil((sqrt(n) - 1.0) / 2.0);
float t = 2.0 * k + 1.0;
float m = t * t;
vec2 pos;
if (n >= m - t) {
pos = vec2(k - (m - n), -k);
} else if (n >= m - 2.0*t) {
pos = vec2(-k, -k + (m - t - n));
} else if (n >= m - 3.0*t) {
pos = vec2(-k + (m - 2.0*t - n), k);
} else {
pos = vec2(k, k - (m - 3.0*t - n));
}
return pos;
}
// Color from residue mod 6
vec3 primeColor(float p) {
float residue = mod(p, 6.0);
// All primes > 3 are ≡1 or 5 (mod 6)
if (abs(residue - 1.0) < 0.5) {
// Warm: gold/orange
return vec3(1.0, 0.8, 0.2);
} else {
// Cool: blue/cyan
return vec3(0.2, 0.6, 1.0);
}
}
// Mersenne diamond shape
float mersenneDiamond(vec2 uv, float size) {
vec2 p = abs(uv * 2.0 - 1.0);
return 1.0 - smoothstep(size * 0.8, size, p.x + p.y);
}

void main() {
vec2 uv = gl_FragCoord.xy / u_resolution.xy;
vec2 p = uv * 2.0 - 1.0;
p.x *= u_resolution.x / u_resolution.y;
vec3 color = vec3(0.0);
// Generate sparkles from prime sequence
float count = min(u_count, 200.0);
for (float i = 0.0; i < 200.0; i++) {
if (i >= count) break;
float idx = u_prime_index + i;
float prime = nthPrimeApprox(idx);
float nextPrime = nthPrimeApprox(idx + 1.0);
float gap = nextPrime - prime;
// Position based on mode
vec2 sparklePos;
float size;
if (u_mode < 0.5) {
// Ulam spiral
sparklePos = ulamCoord(prime) * 0.02;
size = 0.003 + gap * 0.001;
} else if (u_mode < 1.5) {
// Gap rain
sparklePos = vec2(
hash(prime) * 2.0 - 1.0,
fract(hash(prime * 1.618) + u_time * 0.1 * (1.0 + gap * 0.1))
);
size = 0.005 + gap * 0.002;
} else if (u_mode < 2.5) {
// Twin constellation (only gap=2)
if (abs(gap - 2.0) > 0.5) continue;
sparklePos = vec2(
hash(prime) * 2.0 - 1.0,
hash(prime * 2.0) * 2.0 - 1.0
);
size = 0.01;
} else if (u_mode < 3.5) {
// Mersenne diamonds
// Approximate: check if prime+1 is power of 2
float log2 = log(prime + 1.0) / log(2.0);
if (abs(fract(log2)) > 0.01) continue;
sparklePos = vec2(
hash(prime) * 2.0 - 1.0,
hash(prime * 3.0) * 2.0 - 1.0
);
size = 0.05 + log2 * 0.02;

} else {
// Goldbach glow
sparklePos = vec2(
hash(prime) * 2.0 - 1.0,
hash(prime * 1.414) * 2.0 - 1.0
);
size = 0.008;
}
// Distance to sparkle
float d = length(p - sparklePos);
// Sparkle shape
float sparkle = exp(-d * d / (size * size));
// Color
vec3 col = primeColor(prime);
// Add to accumulation
color += col * sparkle * 0.5;
}
// Tone mapping
color = color / (1.0 + color * 0.5);
// Vignette
float vignette = 1.0 - smoothstep(0.5, 1.5, length(p));
color *= vignette;
gl_FragColor = vec4(color, 1.0);
}