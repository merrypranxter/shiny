// System 53: Minimal Sparkle — JS Module
// Hash exploration, fBm configuration, domain warp animation
export class MinimalSparkleSystem {
constructor() {
this.mode = 0;
this.time = 0;
// Hash DNA parameters
this.hashSeed = {x: 12.9898, y: 78.233};
this.hashMultiplier = 43758.5453;
// fBm parameters

this.octaves = 6;
this.lacunarity = 2.0;
this.gain = 0.5;
this.hurst = 0.5;
// Domain warp
this.warpAmount = 1.0;
this.warpOctaves = 4;
// Temporal
this.timeQuant = 10.0; // fps for quantization
// DNA population for evolution
this.population = [];
}
// THE HASH — 80 characters, infinite output
hash(x, y, seedX = 12.9898, seedY = 78.233, multiplier = 43758.5453) {
const dot = x * seedX + y * seedY;
return ((Math.sin(dot) * multiplier) % 1 + 1) % 1;
}
// Value noise (smooth hash)
noise(x, y) {
const ix = Math.floor(x);
const iy = Math.floor(y);
const fx = x - ix;
const fy = y - iy;
// Smoothstep
const sx = fx * fx * (3 - 2 * fx);
const sy = fy * fy * (3 - 2 * fy);
const a = this.hash(ix, iy);
const b = this.hash(ix + 1, iy);
const c = this.hash(ix, iy + 1);
const d = this.hash(ix + 1, iy + 1);
return this.mix(this.mix(a, b, sx), this.mix(c, d, sx), sy);
}
mix(a, b, t) {
return a + (b - a) * t;
}
// fBm (fractional Brownian motion)
fbm(x, y, octaves = this.octaves) {
let value = 0;
let amplitude = 0.5;
let frequency = 1;

for (let i = 0; i < octaves; i++) {
value += amplitude * this.noise(x * frequency, y * frequency);
amplitude *= this.gain;
frequency *= this.lacunarity;
}
return value;
}
// Domain warp
domainWarp(x, y, amount = this.warpAmount, time = 0) {
const qx = this.fbm(x + 0, y + 0, this.warpOctaves);
const qy = this.fbm(x + 5.2, y + 1.3, this.warpOctaves);
const rx = this.fbm(x + amount * qx + 1.7, y + amount * qy + 9.2 + time * 0.15, this.warpOctaves);
const ry = this.fbm(x + amount * qx + 8.3, y + amount * qy + 2.8 + time * 0.126,
this.warpOctaves);
↪
return {x: x + amount * rx, y: y + amount * ry};
}
// Temporal crystal: quantized time
temporalCrystal(time, quant = this.timeQuant) {
return Math.floor(time * quant) / quant;
}
// Generate DNA population (for evolution)
generatePopulation(size = 10) {
this.population = [];
for (let i = 0; i < size; i++) {
this.population.push({
seedX: 10 + Math.random() * 10,
seedY: 70 + Math.random() * 15,
multiplier: 40000 + Math.random() * 10000,
octaves: 3 + Math.floor(Math.random() * 6),
gain: 0.3 + Math.random() * 0.4,
fitness: 0
});
}
}
// Crossbreed two DNA specimens
crossbreed(a, b) {
return {
seedX: Math.random() < 0.5 ? a.seedX : b.seedX,
seedY: Math.random() < 0.5 ? a.seedY : b.seedY,
multiplier: Math.random() < 0.5 ? a.multiplier : b.multiplier,
octaves: Math.random() < 0.5 ? a.octaves : b.octaves,
gain: Math.random() < 0.5 ? a.gain : b.gain,
fitness: 0
};

}
// Mutate DNA
mutate(specimen, rate = 0.1) {
return {
seedX: specimen.seedX + (Math.random() - 0.5) * rate * 10,
seedY: specimen.seedY + (Math.random() - 0.5) * rate * 15,
multiplier: specimen.multiplier + (Math.random() - 0.5) * rate * 10000,
octaves: Math.max(1, specimen.octaves + Math.floor((Math.random() - 0.5) * rate * 4)),
gain: Math.max(0.1, Math.min(0.9, specimen.gain + (Math.random() - 0.5) * rate)),
fitness: 0
};
}
// Evaluate fitness (visual interest metric)
evaluateFitness(specimen, samples = 100) {
let variance = 0;
let mean = 0;
for (let i = 0; i < samples; i++) {
const x = Math.random() * 10;
const y = Math.random() * 10;
const h = this.hash(x, y, specimen.seedX, specimen.seedY, specimen.multiplier);
mean += h;
variance += h * h;
}
mean /= samples;
variance = variance / samples - mean * mean;
// Fitness = variance (we want interesting, not flat)
// Penalize too uniform or too chaotic
const targetVariance = 0.08;
specimen.fitness = 1 / (1 + Math.abs(variance - targetVariance) * 10);
return specimen.fitness;
}
// Evolve one generation
evolve() {
// Evaluate fitness
for (let s of this.population) {
this.evaluateFitness(s);
}
// Sort by fitness
this.population.sort((a, b) => b.fitness - a.fitness);
// Keep top half, breed new half
const newPopulation = this.population.slice(0, Math.floor(this.population.length / 2));

while (newPopulation.length < this.population.length) {
const parentA = this.population[Math.floor(Math.random() * newPopulation.length)];
const parentB = this.population[Math.floor(Math.random() * newPopulation.length)];
let child = this.crossbreed(parentA, parentB);
child = this.mutate(child, 0.1);
newPopulation.push(child);
}
this.population = newPopulation;
// Return best
return this.population[0];
}
// Get uniforms for shader
getUniforms() {
return {
u_time: this.time,
u_mode: this.mode,
u_hash_seed: [this.hashSeed.x, this.hashSeed.y],
u_octaves: this.octaves,
u_warp_amount: this.warpAmount,
u_time_quant: this.timeQuant
};
}
// Animate
update(dt) {
this.time += dt;
}
setMode(mode) {
this.mode = mode;
}
// Set hash parameters (for DNA exploration)
setHashParams(seedX, seedY, multiplier) {
this.hashSeed = {x: seedX, y: seedY};
this.hashMultiplier = multiplier;
}
// Randomize hash (discover new species)
randomizeHash() {
this.hashSeed = {
x: 10 + Math.random() * 20,
y: 60 + Math.random() * 40
};
this.hashMultiplier = 30000 + Math.random() * 30000;
}
}
