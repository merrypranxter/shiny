// System 60: Information Theory Sparkle
// Entropy, mutual information, KL divergence — information IS the glitter
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_mode;
// 0=entropy, 1=mutual info, 2=KL div, 3=compression, 4=channel noise
uniform sampler2D u_prevFrame;
// Previous frame for temporal analysis
uniform sampler2D u_reference;
// Reference distribution
uniform float u_noise_level;
// channel noise parameter
#define PI 3.14159265359
// Hash for sparkle variation
float hash(vec2 p) {
return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}
// Local entropy estimation (simplified)
float localEntropy(vec2 uv, vec2 resolution) {
// Sample 3x3 neighborhood
float hist[8];
for (int i = 0; i < 8; i++) hist[i] = 0.0;
vec2 offset = 1.0 / resolution;
for (int x = -1; x <= 1; x++) {
for (int y = -1; y <= 1; y++) {

vec2 sampleUV = uv + vec2(float(x), float(y)) * offset;
float val = texture2D(u_prevFrame, sampleUV).r;
int bin = int(val * 7.0);
hist[bin] += 1.0;
}
}
// Compute entropy
float entropy = 0.0;
float total = 9.0;
for (int i = 0; i < 8; i++) {
float p = hist[i] / total;
if (p > 0.0) {
entropy -= p * log2(p);
}
}
return entropy / 3.0; // normalize to [0,1]
}
// Mutual information between two regions
float mutualInformation(vec2 uv1, vec2 uv2, vec2 resolution) {
// Simplified: correlation between two points
float val1 = texture2D(u_prevFrame, uv1).r;
float val2 = texture2D(u_prevFrame, uv2).r;
float joint = (val1 + val2) * 0.5;
float marginal1 = val1;
float marginal2 = val2;
// MI ≈joint - marginals (simplified)
float mi = abs(joint - marginal1 * marginal2);
return mi;
}
// KL divergence from reference
float klDivergence(vec2 uv, sampler2D reference) {
float p = texture2D(u_prevFrame, uv).r;
float q = texture2D(reference, uv).r;
if (p > 0.0 && q > 0.0) {
return p * log2(p / q);
}
return 0.0;
}
// Entropy →sparkle density
vec3 entropyToSparkle(float entropy, vec2 uv, float time) {
// High entropy = dense sparkles
float density = entropy;

// Sparkle threshold
float sparkle = step(1.0 - density, hash(uv * 100.0 + time));
// Color from entropy level
vec3 lowEntropyColor = vec3(0.2, 0.1, 0.5);
// ordered: deep purple
vec3 highEntropyColor = vec3(1.0, 0.9, 0.3);
// chaotic: warm gold
vec3 color = mix(lowEntropyColor, highEntropyColor, entropy);
return color * sparkle;
}
// Mutual information →connection lines
vec3 mutualInfoToSparkle(vec2 uv, vec2 resolution, float time) {
vec3 color = vec3(0.0);
// Check connections to neighbors
vec2 offset = 2.0 / resolution;
for (int x = -2; x <= 2; x++) {
for (int y = -2; y <= 2; y++) {
if (x == 0 && y == 0) continue;
vec2 neighborUV = uv + vec2(float(x), float(y)) * offset;
float mi = mutualInformation(uv, neighborUV, resolution);
if (mi > 0.3) {
// Draw connection
vec2 mid = (uv + neighborUV) * 0.5;
float d = length(uv - mid);
float line = exp(-d * d * 500.0) * mi;
vec3 connectionColor = vec3(0.3, 0.7, 1.0) * line;
color += connectionColor;
}
}
}
return color;
}
// KL divergence →color shift
vec3 klDivToSparkle(float kl, vec2 uv, float time) {
// KL > 0 = different from reference = color shift
float shift = smoothstep(0.0, 1.0, kl);
vec3 referenceColor = vec3(0.5, 0.6, 0.7);
vec3 shiftedColor = vec3(0.9, 0.3, 0.2);
vec3 color = mix(referenceColor, shiftedColor, shift);

// Add sparkle based on divergence magnitude
float sparkle = step(1.0 - shift * 0.5, hash(uv * 100.0 + time));
return color * sparkle;
}
// Compression ratio →sparkle density
vec3 compressionToSparkle(vec2 uv, vec2 resolution, float time) {
// Estimate local compressibility via smoothness
vec2 offset = 1.0 / resolution;
float center = texture2D(u_prevFrame, uv).r;
float n = texture2D(u_prevFrame, uv + vec2(0.0, offset.y)).r;
float s = texture2D(u_prevFrame, uv - vec2(0.0, offset.y)).r;
float e = texture2D(u_prevFrame, uv + vec2(offset.x, 0.0)).r;
float w = texture2D(u_prevFrame, uv - vec2(offset.x, 0.0)).r;
// Variance = incompressibility
float variance = abs(center - n) + abs(center - s) + abs(center - e) + abs(center - w);
float compressibility = 1.0 - smoothstep(0.0, 1.0, variance);
// Low compressibility = many sparkles (high entropy)
float density = 1.0 - compressibility;
float sparkle = step(1.0 - density, hash(uv * 100.0 + time));
vec3 color = mix(vec3(0.1, 0.4, 0.8), vec3(1.0, 0.8, 0.2), density);
return color * sparkle;
}
// Channel noise →blurred sparkles
vec3 channelNoiseSparkle(vec2 uv, float noiseLevel, float time) {
// Add noise to position
vec2 noisyUV = uv + vec2(
hash(uv + time) * noiseLevel * 0.1,
hash(uv + time + 1.0) * noiseLevel * 0.1
);
float val = texture2D(u_prevFrame, noisyUV).r;
// Capacity = 1 - noiseLevel
float capacity = 1.0 - noiseLevel;
float sparkle = step(1.0 - capacity * 0.5, hash(uv * 100.0 + time));
// Blur proportional to noise
float blur = noiseLevel * 0.5;
vec3 color = vec3(val * (1.0 - blur) + 0.5 * blur);
return color * sparkle;
}
void main() {

vec2 uv = gl_FragCoord.xy / u_resolution.xy;
vec2 p = uv * 2.0 - 1.0;
p.x *= u_resolution.x / u_resolution.y;
vec3 color = vec3(0.02, 0.02, 0.05);
if (u_mode < 0.5) {
// Entropy Field
float entropy = localEntropy(uv, u_resolution);
color += entropyToSparkle(entropy, uv, u_time);
} else if (u_mode < 1.5) {
// Mutual Information Web
color += mutualInfoToSparkle(uv, u_resolution, u_time);
// Add node sparkles
float val = texture2D(u_prevFrame, uv).r;
float node = step(0.7, val) * hash(uv * 50.0 + u_time);
color += vec3(0.8, 0.9, 1.0) * node;
} else if (u_mode < 2.5) {
// KL Divergence
float kl = klDivergence(uv, u_reference);
color += klDivToSparkle(kl, uv, u_time);
} else if (u_mode < 3.5) {
// Compression Art
color += compressionToSparkle(uv, u_resolution, u_time);
} else {
// Channel Noise
color += channelNoiseSparkle(uv, u_noise_level, u_time);
}
// Tone mapping
color = color / (1.0 + color * 0.3);
// Vignette
float vignette = 1.0 - smoothstep(0.5, 1.5, length(p));
color *= vignette;
gl_FragColor = vec4(color, 1.0);
}