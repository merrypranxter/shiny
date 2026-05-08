// System 57: Strange Attractor Sparkle — JS Module
// ODE integration, attractor generation, trail management
export class StrangeAttractorSparkleSystem {
constructor(numPoints = 10000) {
this.numPoints = numPoints;

this.mode = 0;
this.time = 0;
// Attractor parameters
this.lorenzParams = {sigma: 10, rho: 28, beta: 8/3};
this.rosslerParams = {a: 0.2, b: 0.2, c: 5.7};
this.aizawaParams = {a: 0.95, b: 0.7, c: 0.6, d: 3.5, e: 0.25, f: 0.1};
// Current parameters (for morphing)
this.currentParams = {...this.lorenzParams};
this.targetParams = {...this.lorenzParams};
// Point data: [x, y, z, velocity] for each point
this.points = new Float32Array(numPoints * 4);
// Integration
this.dt = 0.01;
this.currentState = {x: 0.1, y: 0, z: 0};
this.generatePoints();
}
// Lorenz ODE
lorenzDeriv(state, params) {
const {sigma, rho, beta} = params;
return {
x: sigma * (state.y - state.x),
y: state.x * (rho - state.z) - state.y,
z: state.x * state.y - beta * state.z
};
}
// Rössler ODE
rosslerDeriv(state, params) {
const {a, b, c} = params;
return {
x: -state.y - state.z,
y: state.x + a * state.y,
z: b + state.z * (state.x - c)
};
}
// Aizawa ODE
aizawaDeriv(state, params) {
const {a, b, c, d, e, f} = params;
const {x, y, z} = state;
const r = Math.sqrt(x*x + y*y);
return {
x: (z - b) * x - d * y,
y: (z - b) * y + d * x,
z: c + a * z - z*z*z/3 - r*r * (1 + e * z) + f * z * x*x*x

};
}
// 4th-order Runge-Kutta step
rk4Step(state, derivFn, params, dt) {
const k1 = derivFn(state, params);
const s2 = {
x: state.x + k1.x * dt * 0.5,
y: state.y + k1.y * dt * 0.5,
z: state.z + k1.z * dt * 0.5
};
const k2 = derivFn(s2, params);
const s3 = {
x: state.x + k2.x * dt * 0.5,
y: state.y + k2.y * dt * 0.5,
z: state.z + k2.z * dt * 0.5
};
const k3 = derivFn(s3, params);
const s4 = {
x: state.x + k3.x * dt,
y: state.y + k3.y * dt,
z: state.z + k3.z * dt
};
const k4 = derivFn(s4, params);
return {
x: state.x + (k1.x + 2*k2.x + 2*k3.x + k4.x) * dt / 6,
y: state.y + (k1.y + 2*k2.y + 2*k3.y + k4.y) * dt / 6,
z: state.z + (k1.z + 2*k2.z + 2*k3.z + k4.z) * dt / 6
};
}
// Generate attractor points
generatePoints() {
let state = {x: 0.1, y: 0, z: 0};
// Burn-in: let attractor settle
for (let i = 0; i < 1000; i++) {
const derivFn = this.getDerivFn();
state = this.rk4Step(state, derivFn, this.currentParams, this.dt);
}
// Generate points
for (let i = 0; i < this.numPoints; i++) {
const derivFn = this.getDerivFn();
const prevState = {...state};
state = this.rk4Step(state, derivFn, this.currentParams, this.dt);
// Compute velocity
const vel = Math.sqrt(
Math.pow(state.x - prevState.x, 2) +

Math.pow(state.y - prevState.y, 2) +
Math.pow(state.z - prevState.z, 2)
) / this.dt;
// Normalize for storage
const idx = i * 4;
this.points[idx] = state.x * 0.03;
// scale down
this.points[idx + 1] = state.y * 0.03;
this.points[idx + 2] = state.z * 0.03;
this.points[idx + 3] = Math.min(vel * 0.1, 1.0); // normalized velocity
}
this.currentState = state;
}
// Get derivative function for current mode
getDerivFn() {
if (this.mode === 0 || this.mode === 3) {
return this.lorenzDeriv.bind(this);
} else if (this.mode === 1) {
return this.rosslerDeriv.bind(this);
} else {
return this.aizawaDeriv.bind(this);
}
}
// Get current parameters
getCurrentParams() {
if (this.mode === 0 || this.mode === 3) return this.currentParams;
if (this.mode === 1) return this.rosslerParams;
return this.aizawaParams;
}
// Morph parameters toward target
morphParams(dt) {
const speed = 0.5 * dt;
const keys = Object.keys(this.currentParams);
for (let key of keys) {
if (this.targetParams[key] !== undefined) {
this.currentParams[key] += (this.targetParams[key] - this.currentParams[key]) * speed;
}
}
}
// Set target parameters for morphing
setTargetParams(params) {
this.targetParams = {...params};
}
// Get point data for shader
getPointData() {

return this.points;
}
// Get uniforms for shader
getUniforms() {
return {
u_time: this.time,
u_mode: this.mode,
u_point_count: this.numPoints,
u_trail_length: 500,
u_point_size: 0.005
};
}
// Main update
update(dt) {
this.time += dt;
if (this.mode === 3) {
// Morph mode
this.morphParams(dt);
// Regenerate points periodically
if (Math.floor(this.time * 10) % 50 === 0) {
this.generatePoints();
}
}
}
setMode(mode) {
this.mode = mode;
// Reset parameters for new mode
if (mode === 0) {
this.currentParams = {...this.lorenzParams};
} else if (mode === 1) {
this.currentParams = {...this.rosslerParams};
} else if (mode === 2) {
this.currentParams = {...this.aizawaParams};
}
this.generatePoints();
}
// Randomize parameters (discover new attractors)
randomizeParams() {
this.currentParams = {
sigma: 5 + Math.random() * 15,
rho: 10 + Math.random() * 30,
beta: 2 + Math.random() * 3
};
this.generatePoints();

}
// Compute Lyapunov exponent (measure of chaos)
computeLyapunov(iterations = 1000) {
let state = {x: 0.1, y: 0, z: 0};
let perturbed = {x: 0.10001, y: 0, z: 0};
let sum = 0;
const derivFn = this.getDerivFn();
const params = this.getCurrentParams();
for (let i = 0; i < iterations; i++) {
state = this.rk4Step(state, derivFn, params, this.dt);
perturbed = this.rk4Step(perturbed, derivFn, params, this.dt);
const dist = Math.sqrt(
Math.pow(state.x - perturbed.x, 2) +
Math.pow(state.y - perturbed.y, 2) +
Math.pow(state.z - perturbed.z, 2)
);
if (dist > 0) {
sum += Math.log(dist / 0.00001);
}
// Renormalize
const scale = 0.00001 / dist;
perturbed = {
x: state.x + (perturbed.x - state.x) * scale,
y: state.y + (perturbed.y - state.y) * scale,
z: state.z + (perturbed.z - state.z) * scale
};
}
return sum / (iterations * this.dt);
}
}