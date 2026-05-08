// System 54: Fourier Shimmer
// FFT frequency bins = sparkle field. The spectrum IS the image.
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_mode;
// 0=audio, 1=harmonic, 2=phase, 3=freeze, 4=convolution
uniform sampler2D u_spectrum;
// FFT magnitude data (RGBA = freq bins)
uniform sampler2D u_phase;
// FFT phase data
uniform float u_beat;
// beat detection intensity
uniform float u_spectrum_size;
// number of frequency bins
#define PI 3.14159265359
#define TAU 6.28318530718
#define MAX_BINS 128
// Approximate inverse-DFT: sum of sinusoids
// x[n] = (1/N) Σ X[k]・e^(2πikn/N)
vec3 inverseDFT(vec2 uv, sampler2D spectrum, sampler2D phase, float numBins) {
vec3 color = vec3(0.0);
float N = numBins;
for (float k = 0.0; k < float(MAX_BINS); k++) {
if (k >= N) break;
float u = (k + 0.5) / N;
float mag = texture2D(spectrum, vec2(u, 0.5)).r;
float ph = texture2D(phase, vec2(u, 0.5)).r * TAU;
// Frequency as spatial wave
float freq = k + 1.0;
float wave = sin(uv.x * freq * TAU + ph) * sin(uv.y * freq * TAU + ph);
// Amplitude = brightness, frequency = hue

vec3 waveColor = vec3(
sin(freq * 0.1) * 0.5 + 0.5,
sin(freq * 0.1 + 2.0) * 0.5 + 0.5,
sin(freq * 0.1 + 4.0) * 0.5 + 0.5
);
color += waveColor * mag * wave * 0.5;
}
return color / N;
}
// Beat-driven sparkle burst
float beatSparkle(vec2 uv, float beat, float time) {
float burst = exp(-beat * 3.0);
float ring = sin(length(uv) * 20.0 - time * 10.0) * 0.5 + 0.5;
return burst * ring * beat;
}
// Harmonic lattice: integer ratio frequencies
vec3 harmonicLattice(vec2 uv, float time) {
vec3 color = vec3(0.0);
// Just intonation ratios
float ratios[12];
ratios[0] = 1.0;
ratios[1] = 1.059;
ratios[2] = 1.122;
ratios[3] = 1.189;
ratios[4] = 1.260;
ratios[5] = 1.335;
ratios[6] = 1.414;
ratios[7] = 1.498;
ratios[8] = 1.587;
ratios[9] = 1.682;
ratios[10] = 1.782; ratios[11] = 1.888;
for (int i = 0; i < 12; i++) {
float freq = ratios[i] * 5.0;
float wave = sin(uv.x * freq + time * ratios[i]) *
sin(uv.y * freq + time * ratios[i] * 1.618);
float consonance = 1.0 - abs(fract(ratios[i]) - 0.5) * 2.0;
vec3 noteColor = vec3(
sin(float(i) * 0.5) * 0.5 + 0.5,
sin(float(i) * 0.5 + 2.0) * 0.5 + 0.5,
sin(float(i) * 0.5 + 4.0) * 0.5 + 0.5
);
color += noteColor * wave * consonance * 0.1;
}
return color;
}
// Phase sculpture: interactive phase rotation
vec3 phaseSculpture(vec2 uv, float time, float phaseShift) {

vec3 color = vec3(0.0);
for (float k = 1.0; k < 20.0; k++) {
float ph = phaseShift * k + time * 0.5;
float wave = sin(uv.x * k * TAU + ph) * cos(uv.y * k * TAU + ph * 1.618);
float hue = fract(ph / TAU);
vec3 waveColor = vec3(
sin(hue * TAU) * 0.5 + 0.5,
sin(hue * TAU + 2.0) * 0.5 + 0.5,
sin(hue * TAU + 4.0) * 0.5 + 0.5
);
color += waveColor * wave * (1.0 / k) * 0.3;
}
return color;
}
// Convolution bloom: reverb applied to light
vec3 convolutionBloom(vec2 uv, float time) {
vec3 color = vec3(0.0);
for (int i = 0; i < 20; i++) {
float t = float(i) * 0.05;
float decay = exp(-t * 3.0);
vec2 offset = vec2(
sin(t * 5.0 + time) * t * 0.1,
cos(t * 3.0 + time) * t * 0.1
);
float sparkle = sin((uv + offset).x * 10.0) * sin((uv + offset).y * 10.0);
sparkle = pow(abs(sparkle), 3.0);
color += vec3(0.5 + decay * 0.5, 0.3 + decay * 0.3, decay) * sparkle * decay * 0.1;
}
return color;
}
void main() {
vec2 uv = gl_FragCoord.xy / u_resolution.xy;
vec2 p = uv * 2.0 - 1.0;
p.x *= u_resolution.x / u_resolution.y;
vec3 color = vec3(0.05, 0.05, 0.1);
if (u_mode < 0.5) {
color += inverseDFT(p, u_spectrum, u_phase, u_spectrum_size);
color += vec3(beatSparkle(p, u_beat, u_time));
} else if (u_mode < 1.5) {

color += harmonicLattice(p, u_time);
} else if (u_mode < 2.5) {
float phaseShift = sin(u_time * 0.5) * PI;
color += phaseSculpture(p, u_time, phaseShift);
} else if (u_mode < 3.5) {
float freezeTime = floor(u_time * 0.5) * 2.0;
float morph = fract(u_time * 0.5);
vec3 frozen = inverseDFT(p, u_spectrum, u_phase, u_spectrum_size);
vec3 live = harmonicLattice(p, u_time);
color += mix(frozen, live, smoothstep(0.7, 1.0, morph));
} else {
color += convolutionBloom(p, u_time);
}
color = color / (1.0 + color * 0.3);
float vignette = 1.0 - smoothstep(0.5, 1.5, length(p));
color *= vignette;
gl_FragColor = vec4(color, 1.0);
}