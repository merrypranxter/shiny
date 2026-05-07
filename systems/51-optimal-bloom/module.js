// System 51: Optimal Bloom — JS Module
// Minimum-jerk trajectories, collision detection, bang-bang control

export class OptimalBloomSystem {
constructor(maxSparkles = 150) {
this.sparkles = []; // {birthPos, targetPos, birthTime, lifespan, mass, velocity}
this.maxSparkles = maxSparkles;
this.mode = 0;
this.time = 0;
this.lifespan = 3.0;
}
// 5th-order minimum-jerk polynomial evaluation
// x(t) = x0 + (x1-x0) * (10*t^3 - 15*t^4 + 6*t^5)
minJerk(t) {
const t2 = t * t;
const t3 = t2 * t;
return 10 * t3 - 15 * t2 * t2 + 6 * t3 * t2;
}
minJerkVelocity(t) {
const t2 = t * t;
return 30 * t2 - 60 * t2 * t + 30 * t2 * t2;
}
// Spawn a sparkle with minimum-jerk trajectory
spawnSparkle(birthPos, targetPos, lifespan = 3.0) {
if (this.sparkles.length >= this.maxSparkles) {
// Remove oldest
this.sparkles.shift();
}
this.sparkles.push({
birthPos: {...birthPos},
targetPos: {...targetPos},
birthTime: this.time,
lifespan,
mass: 0.5 + Math.random() * 1.0,
velocity: {x: 0, y: 0},
alive: true
});
}
// Update all sparkles
update(dt) {
this.time += dt;
for (let s of this.sparkles) {
if (!s.alive) continue;
const age = this.time - s.birthTime;
const t = Math.min(age / s.lifespan, 1.0);

// Compute position from minimum-jerk
const mj = this.minJerk(t);
s.position = {
x: s.birthPos.x + (s.targetPos.x - s.birthPos.x) * mj,
y: s.birthPos.y + (s.targetPos.y - s.birthPos.y) * mj
};
// Compute velocity
const v = this.minJerkVelocity(t);
s.velocity = {
x: (s.targetPos.x - s.birthPos.x) / s.lifespan * v,
y: (s.targetPos.y - s.birthPos.y) / s.lifespan * v
};
// Check death
if (age >= s.lifespan) {
s.alive = false;
}
}
// Remove dead sparkles
this.sparkles = this.sparkles.filter(s => s.alive);
// Handle collisions (Elastic Garden mode)
if (this.mode === 2) {
this.handleCollisions();
}
}
// Elastic collision between two sparkles
handleCollisions() {
const restitution = 0.9;
const mergeThreshold = 0.05;
for (let i = 0; i < this.sparkles.length; i++) {
for (let j = i + 1; j < this.sparkles.length; j++) {
const a = this.sparkles[i];
const b = this.sparkles[j];
if (!a.alive || !b.alive) continue;
const dx = b.position.x - a.position.x;
const dy = b.position.y - a.position.y;
const dist = Math.sqrt(dx * dx + dy * dy);
const minDist = 0.05; // collision radius
if (dist < minDist) {
// Collision response
const nx = dx / dist;
const ny = dy / dist;

// Relative velocity
const dvx = b.velocity.x - a.velocity.x;
const dvy = b.velocity.y - a.velocity.y;
const relVel = dvx * nx + dvy * ny;
if (relVel < 0) {
// Elastic collision
const totalMass = a.mass + b.mass;
const impulse = 2 * relVel / totalMass * restitution;
a.velocity.x += impulse * b.mass * nx;
a.velocity.y += impulse * b.mass * ny;
b.velocity.x -= impulse * a.mass * nx;
b.velocity.y -= impulse * a.mass * ny;
}
// Fission/Fusion (Elastic Garden)
const totalEnergy = 0.5 * a.mass * (a.velocity.x**2 + a.velocity.y**2) +
0.5 * b.mass * (b.velocity.x**2 + b.velocity.y**2);
if (totalEnergy > 2.0 && a.mass > 0.5) {
// Fission: split high-energy sparkle
a.mass *= 0.7;
this.spawnSparkle(
a.position,
{x: a.position.x + a.velocity.x, y: a.position.y + a.velocity.y},
a.lifespan * 0.5
);
} else if (dist < mergeThreshold && a.mass + b.mass < 2.0) {
// Fusion: merge close, slow sparkles
a.mass += b.mass * 0.5;
a.velocity.x = (a.mass * a.velocity.x + b.mass * b.velocity.x) / (a.mass + b.mass);
a.velocity.y = (a.mass * a.velocity.y + b.mass * b.velocity.y) / (a.mass + b.mass);
b.alive = false;
}
}
}
}
}
// Bang-bang control: generate staccato flash pattern
bangBangPattern(period = 1.0, dutyCycle = 0.3) {
const phase = (this.time % period) / period;
return phase < dutyCycle ? 1.0 : 0.0;
}
// Hamiltonian orbit: update with symplectic integrator
hamiltonianStep(sparkle, dt) {
// Simple harmonic oscillator: H = p²/2m + kx²/2
const k = 1.0; // spring constant
const m = sparkle.mass;

// Leapfrog integration
sparkle.velocity.x -= (k / m) * sparkle.position.x * dt * 0.5;
sparkle.velocity.y -= (k / m) * sparkle.position.y * dt * 0.5;
sparkle.position.x += sparkle.velocity.x * dt;
sparkle.position.y += sparkle.velocity.y * dt;
sparkle.velocity.x -= (k / m) * sparkle.position.x * dt * 0.5;
sparkle.velocity.y -= (k / m) * sparkle.position.y * dt * 0.5;
}
// Get sparkle data for shader
getSparkleData() {
const data = new Float32Array(this.maxSparkles * 4);
for (let i = 0; i < this.sparkles.length; i++) {
const s = this.sparkles[i];
data[i * 4] = s.position.x;
data[i * 4 + 1] = s.position.y;
data[i * 4 + 2] = s.velocity.x;
data[i * 4 + 3] = s.velocity.y;
}
return data;
}
// Get uniforms for shader
getUniforms() {
return {
u_sparkle_count: this.sparkles.length,
u_mode: this.mode,
u_lifespan: this.lifespan,
u_time: this.time
};
}
// Auto-spawn fireworks
autoFireworks() {
if (Math.random() < 0.05) {
const birthPos = {
x: (Math.random() - 0.5) * 2,
y: (Math.random() - 0.5) * 2
};
const targetPos = {
x: (Math.random() - 0.5) * 2,
y: (Math.random() - 0.5) * 2
};
this.spawnSparkle(birthPos, targetPos);
}
}
setMode(mode) {

this.mode = mode;
}
}