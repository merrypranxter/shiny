// System 55: Cellular Automata Chrome — JS Module
// Lenia CA, ping-pong buffers, rule breeding, pattern seeding
export class CellularAutomataChromeSystem {
constructor(width, height) {
this.width = width;
this.height = height;
this.mode = 0;
this.time = 0;
// CA parameters
this.mu = 0.35;
this.sigma = 0.15;
this.dt = 0.1;

// Framebuffers for ping-pong
this.framebuffers = [];
this.currentBuffer = 0;
// Rules for breeding
this.rules = [
{mu: 0.35, sigma: 0.15, name: 'standard'},
{mu: 0.25, sigma: 0.10, name: 'crystal'},
{mu: 0.45, sigma: 0.20, name: 'chaos'}
];
// Pattern library
this.patterns = {
glider: [
[0,1,0],
[0,0,1],
[1,1,1]
],
oscillator: [
[0,1,0],
[0,1,0],
[0,1,0]
],
pulsar: [
[0,0,1,1,1,0,0,0,1,1,1,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,0,0,0,0,1,0,1,0,0,0,0,1],
[1,0,0,0,0,1,0,1,0,0,0,0,1],
[1,0,0,0,0,1,0,1,0,0,0,0,1],
[0,0,1,1,1,0,0,0,1,1,1,0,0]
]
};
this.initFramebuffers();
}
initFramebuffers() {
// Create two framebuffers for ping-pong
// In practice, you'd use WebGL framebuffers
// Here we store state as Float32Arrays
this.states = [
new Float32Array(this.width * this.height),
new Float32Array(this.width * this.height)
];
// Random initial state
this.randomizeState();
}
randomizeState() {
const state = this.states[this.currentBuffer];

for (let i = 0; i < state.length; i++) {
state[i] = Math.random() > 0.8 ? Math.random() : 0;
}
}
// Seed a pattern at position
seedPattern(patternName, x, y) {
const pattern = this.patterns[patternName];
if (!pattern) return;
const state = this.states[this.currentBuffer];
const h = pattern.length;
const w = pattern[0].length;
for (let py = 0; py < h; py++) {
for (let px = 0; px < w; px++) {
const sx = Math.floor(x + px - w/2);
const sy = Math.floor(y + py - h/2);
if (sx >= 0 && sx < this.width && sy >= 0 && sy < this.height) {
state[sy * this.width + sx] = pattern[py][px];
}
}
}
}
// Get neighbor average with Gaussian kernel
getNeighborAverage(state, x, y, radius = 3) {
let sum = 0;
let weight = 0;
for (let dy = -radius; dy <= radius; dy++) {
for (let dx = -radius; dx <= radius; dx++) {
const nx = (x + dx + this.width) % this.width;
const ny = (y + dy + this.height) % this.height;
const r2 = dx * dx + dy * dy;
const w = Math.exp(-r2 / (2 * radius * radius));
sum += state[ny * this.width + nx] * w;
weight += w;
}
}
return sum / weight;
}
// Bell-shaped growth function
growth(u, mu, sigma) {
return 2 * Math.exp(-Math.pow(u - mu, 2) / (2 * sigma * sigma)) - 1;
}
// Update CA state

update() {
const current = this.states[this.currentBuffer];
const next = this.states[1 - this.currentBuffer];
for (let y = 0; y < this.height; y++) {
for (let x = 0; x < this.width; x++) {
const idx = y * this.width + x;
const state = current[idx];
const neighbors = this.getNeighborAverage(current, x, y, 3);
let newState;
if (this.mode === 2) {
// Mitosis
const growthRate = this.growth(neighbors, 0.35, 0.15);
newState = state + this.dt * growthRate;
if (state > 0.8 && neighbors < 0.3) {
newState = 0.4;
}
} else if (this.mode === 3) {
// Breeding: mix rules
const rule1 = this.growth(neighbors, this.rules[0].mu, this.rules[0].sigma);
const rule2 = this.growth(neighbors, this.rules[1].mu, this.rules[1].sigma);
const mixFactor = 0.5 + 0.5 * Math.sin(this.time * 0.2);
newState = state + this.dt * (rule1 * mixFactor + rule2 * (1 - mixFactor));
} else if (this.mode === 4) {
// Frozen fire
const temp = 0.5 + 0.3 * Math.sin(this.time * 0.5);
const mu = 0.2 + 0.3 * temp;
const sigma = 0.05 + 0.15 * temp;
const growthRate = this.growth(neighbors, mu, sigma);
newState = state + this.dt * growthRate;
} else {
// Standard / Glider
const growthRate = this.growth(neighbors, this.mu, this.sigma);
newState = state + this.dt * growthRate;
}
next[idx] = Math.max(0, Math.min(1, newState));
}
}
// Swap buffers
this.currentBuffer = 1 - this.currentBuffer;
}
// Auto-seed gliders
autoSeedGliders() {
if (Math.random() < 0.02) {
const x = Math.floor(Math.random() * this.width);
const y = Math.floor(Math.random() * this.height);

this.seedPattern('glider', x, y);
}
}
// Get current state as texture data
getStateData() {
return this.states[this.currentBuffer];
}
// Get uniforms for shader
getUniforms() {
return {
u_time: this.time,
u_mode: this.mode,
u_mu: this.mu,
u_sigma: this.sigma,
u_dt: this.dt
};
}
// Main update
update(dt) {
this.time += dt;
this.update();
if (this.mode === 1) {
this.autoSeedGliders();
}
}
setMode(mode) {
this.mode = mode;
}
setParams(mu, sigma, dt) {
this.mu = mu;
this.sigma = sigma;
this.dt = dt;
}
// Breed new rule from two parents
breedRules(parent1, parent2) {
return {
mu: (parent1.mu + parent2.mu) / 2 + (Math.random() - 0.5) * 0.05,
sigma: (parent1.sigma + parent2.sigma) / 2 + (Math.random() - 0.5) * 0.03,
name: `breed_${Math.floor(Math.random() * 1000)}`
};
}
}
====================================================================

SYSTEM 56: REACTION-DIFFUSION GLITTER
====================================================================