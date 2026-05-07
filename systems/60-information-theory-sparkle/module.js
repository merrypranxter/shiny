// System 60: Information Theory Sparkle — JS Module
// Entropy, mutual information, KL divergence, compression
export class InformationTheorySparkleSystem {
constructor(width, height) {

this.width = width;
this.height = height;
this.mode = 0;
this.time = 0;
// Frame data
this.currentFrame = new Float32Array(width * height);
this.prevFrame = new Float32Array(width * height);
this.referenceFrame = new Float32Array(width * height);
// Information metrics
this.entropyField = new Float32Array(width * height);
this.mutualInfoField = new Float32Array(width * height);
this.klField = new Float32Array(width * height);
// Channel parameters
this.noiseLevel = 0.1;
this.capacity = 1.0;
// History for entropy estimation
this.frameHistory = [];
this.maxHistory = 10;
}
// Compute Shannon entropy of a distribution
computeEntropy(histogram) {
let entropy = 0;
const total = histogram.reduce((a, b) => a + b, 0);
for (let count of histogram) {
if (count > 0) {
const p = count / total;
entropy -= p * Math.log2(p);
}
}
return entropy;
}
// Local entropy from neighborhood
computeLocalEntropy(x, y, radius = 2) {
const bins = 8;
const histogram = new Array(bins).fill(0);
for (let dy = -radius; dy <= radius; dy++) {
for (let dx = -radius; dx <= radius; dx++) {
const px = (x + dx + this.width) % this.width;
const py = (y + dy + this.height) % this.height;
const val = this.currentFrame[py * this.width + px];
const bin = Math.min(Math.floor(val * bins), bins - 1);
histogram[bin]++;

}
}
return this.computeEntropy(histogram);
}
// Compute full entropy field
updateEntropyField() {
for (let y = 0; y < this.height; y++) {
for (let x = 0; x < this.width; x++) {
const idx = y * this.width + x;
this.entropyField[idx] = this.computeLocalEntropy(x, y);
}
}
}
// Mutual information between two regions
computeMutualInformation(x1, y1, x2, y2, radius = 2) {
const bins = 4;
const jointHist = new Array(bins * bins).fill(0);
const marginal1 = new Array(bins).fill(0);
const marginal2 = new Array(bins).fill(0);
for (let dy = -radius; dy <= radius; dy++) {
for (let dx = -radius; dx <= radius; dx++) {
const px1 = (x1 + dx + this.width) % this.width;
const py1 = (y1 + dy + this.height) % this.height;
const px2 = (x2 + dx + this.width) % this.width;
const py2 = (y2 + dy + this.height) % this.height;
const val1 = this.currentFrame[py1 * this.width + px1];
const val2 = this.currentFrame[py2 * this.width + px2];
const bin1 = Math.min(Math.floor(val1 * bins), bins - 1);
const bin2 = Math.min(Math.floor(val2 * bins), bins - 1);
jointHist[bin1 * bins + bin2]++;
marginal1[bin1]++;
marginal2[bin2]++;
}
}
// Compute MI
let mi = 0;
const total = (2 * radius + 1) ** 2;
for (let i = 0; i < bins; i++) {
for (let j = 0; j < bins; j++) {
const joint = jointHist[i * bins + j] / total;
const m1 = marginal1[i] / total;
const m2 = marginal2[j] / total;

if (joint > 0 && m1 > 0 && m2 > 0) {
mi += joint * Math.log2(joint / (m1 * m2));
}
}
}
return mi;
}
// KL divergence from reference
computeKLDivergence(x, y) {
const idx = y * this.width + x;
const p = this.currentFrame[idx];
const q = this.referenceFrame[idx];
if (p > 0 && q > 0) {
return p * Math.log2(p / q);
}
return 0;
}
// Update KL field
updateKLField() {
for (let y = 0; y < this.height; y++) {
for (let x = 0; x < this.width; x++) {
const idx = y * this.width + x;
this.klField[idx] = this.computeKLDivergence(x, y);
}
}
}
// Compression ratio estimation
estimateCompressibility(x, y) {
// Simple: variance in neighborhood = incompressibility
const radius = 2;
let sum = 0;
let sumSq = 0;
let count = 0;
for (let dy = -radius; dy <= radius; dy++) {
for (let dx = -radius; dx <= radius; dx++) {
const px = (x + dx + this.width) % this.width;
const py = (y + dy + this.height) % this.height;
const val = this.currentFrame[py * this.width + px];
sum += val;
sumSq += val * val;
count++;
}
}

const mean = sum / count;
const variance = (sumSq / count) - mean * mean;
// High variance = low compressibility
return 1.0 - Math.min(variance * 10, 1.0);
}
// Channel capacity with noise
computeCapacity() {
// Shannon: C = B * log2(1 + S/N)
// Simplified: capacity = 1 - noiseLevel
this.capacity = Math.max(0, 1.0 - this.noiseLevel);
return this.capacity;
}
// Update frame from input (e.g., video, noise, pattern)
updateFrame(inputData) {
// Shift history
this.prevFrame.set(this.currentFrame);
this.currentFrame.set(inputData);
// Add to history
this.frameHistory.push(new Float32Array(inputData));
if (this.frameHistory.length > this.maxHistory) {
this.frameHistory.shift();
}
}
// Generate synthetic frame
generateSyntheticFrame() {
for (let i = 0; i < this.currentFrame.length; i++) {
const x = (i % this.width) / this.width;
const y = Math.floor(i / this.width) / this.height;
// Moving pattern
this.currentFrame[i] = (
Math.sin(x * 10 + this.time) *
Math.cos(y * 10 + this.time * 0.7) * 0.5 + 0.5
);
}
}
// Set reference frame
setReference(frameData) {
this.referenceFrame.set(frameData);
}
// Get metrics data for shader
getMetricsData() {
// Pack entropy, MI, KL into RGBA
const data = new Float32Array(this.width * this.height * 4);

for (let i = 0; i < this.width * this.height; i++) {
data[i * 4] = this.entropyField[i] / 3.0; // normalize
data[i * 4 + 1] = this.mutualInfoField[i];
data[i * 4 + 2] = this.klField[i];
data[i * 4 + 3] = this.currentFrame[i];
}
return data;
}
// Get uniforms for shader
getUniforms() {
return {
u_time: this.time,
u_mode: this.mode,
u_noise_level: this.noiseLevel
};
}
// Main update
update(dt) {
this.time += dt;
this.generateSyntheticFrame();
this.updateEntropyField();
this.updateKLField();
this.computeCapacity();
}
setMode(mode) {
this.mode = mode;
}
setNoiseLevel(level) {
this.noiseLevel = Math.max(0, Math.min(1, level));
}
}

___BEGIN___COMMAND_DONE_MARKER___0