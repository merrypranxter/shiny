// System 52: Gravity Chrome — JS Module
// Metric tensors, geodesic integration, mass distribution
export class GravityChromeSystem {
constructor() {
this.curvatureType = 0; // 0=sphere, 1=hyperbolic, 2=schwarzschild, 3=saddle, 4=wormhole
this.mass = 0.5;
this.curvature = 1.0;
this.lensCenter = {x: 0, y: 0};
this.time = 0;
// Mass distribution for custom metrics
this.massPoints = []; // {x, y, mass}
}
// Metric tensor at point (x, y) for different curvature types
metricTensor(x, y, type, param) {
switch(type) {
case 0: // Sphere
const R = param;
const theta = Math.atan2(y, x);
return {
g_xx: R * R,
g_yy: R * R * Math.sin(theta) * Math.sin(theta),
g_xy: 0
};
case 1: // Hyperbolic (Poincaré disk)
const r2 = x * x + y * y;
const factor = 4 * param * param / ((1 - r2) * (1 - r2));
return {
g_xx: factor,
g_yy: factor,
g_xy: 0
};
case 2: // Schwarzschild
const r = Math.sqrt(x * x + y * y);
const r_s = 2 * param;
if (r < r_s + 0.001) {

return {g_xx: 1e6, g_yy: 1e6, g_xy: 0};
}
return {
g_xx: 1 / (1 - r_s / r),
g_yy: r * r,
g_xy: 0
};
case 3: // Saddle
const K = param;
return {
g_xx: 1 + K * K * x * x,
g_yy: 1 + K * K * y * y,
g_xy: K * K * x * y
};
case 4: // Wormhole
const throat = param;
const r_w = Math.sqrt(x * x + y * y + throat * throat);
return {
g_xx: 1,
g_yy: r_w * r_w,
g_xy: 0
};
default:
return {g_xx: 1, g_yy: 1, g_xy: 0};
}
}
// Christoffel symbols (simplified for diagonal metrics)
christoffel(x, y, type, param) {
const h = 0.001;
const metric = this.metricTensor.bind(this);
// Numerical derivatives
const g = metric(x, y, type, param);
const g_x = metric(x + h, y, type, param);
const g_y = metric(x, y + h, type, param);
const dg_xx_dx = (g_x.g_xx - g.g_xx) / h;
const dg_yy_dx = (g_x.g_yy - g.g_yy) / h;
const dg_xx_dy = (g_y.g_xx - g.g_xx) / h;
const dg_yy_dy = (g_y.g_yy - g.g_yy) / h;
// For diagonal metric: Γ^x_xx = g^xx * ∂x g_xx / 2
const gInv_xx = 1 / g.g_xx;
const gInv_yy = 1 / g.g_yy;
return {
Gx_xx: gInv_xx * dg_xx_dx / 2,

Gx_yy: -gInv_xx * dg_yy_dx / 2,
Gy_xx: -gInv_yy * dg_xx_dy / 2,
Gy_yy: gInv_yy * dg_yy_dy / 2
};
}
// 4th-order Runge-Kutta geodesic integration
integrateGeodesic(startPos, startDir, steps, dt, type, param) {
let pos = {...startPos};
let dir = {...startDir};
const path = [{...pos}];
for (let i = 0; i < steps; i++) {
const gamma = this.christoffel(pos.x, pos.y, type, param);
// k1
const ddir1 = {
x: -gamma.Gx_xx * dir.x * dir.x - gamma.Gx_yy * dir.y * dir.y,
y: -gamma.Gy_xx * dir.x * dir.x - gamma.Gy_yy * dir.y * dir.y
};
// k2
const pos2 = {
x: pos.x + dir.x * dt * 0.5,
y: pos.y + dir.y * dt * 0.5
};
const dir2 = {
x: dir.x + ddir1.x * dt * 0.5,
y: dir.y + ddir1.y * dt * 0.5
};
const gamma2 = this.christoffel(pos2.x, pos2.y, type, param);
const ddir2 = {
x: -gamma2.Gx_xx * dir2.x * dir2.x - gamma2.Gx_yy * dir2.y * dir2.y,
y: -gamma2.Gy_xx * dir2.x * dir2.x - gamma2.Gy_yy * dir2.y * dir2.y
};
// k3
const pos3 = {
x: pos.x + dir2.x * dt * 0.5,
y: pos.y + dir2.y * dt * 0.5
};
const dir3 = {
x: dir.x + ddir2.x * dt * 0.5,
y: dir.y + ddir2.y * dt * 0.5
};
const gamma3 = this.christoffel(pos3.x, pos3.y, type, param);
const ddir3 = {
x: -gamma3.Gx_xx * dir3.x * dir3.x - gamma3.Gx_yy * dir3.y * dir3.y,
y: -gamma3.Gy_xx * dir3.x * dir3.x - gamma3.Gy_yy * dir3.y * dir3.y
};

// k4
const pos4 = {
x: pos.x + dir3.x * dt,
y: pos.y + dir3.y * dt
};
const dir4 = {
x: dir.x + ddir3.x * dt,
y: dir.y + ddir3.y * dt
};
const gamma4 = this.christoffel(pos4.x, pos4.y, type, param);
const ddir4 = {
x: -gamma4.Gx_xx * dir4.x * dir4.x - gamma4.Gx_yy * dir4.y * dir4.y,
y: -gamma4.Gy_xx * dir4.x * dir4.x - gamma4.Gy_yy * dir4.y * dir4.y
};
// Update
pos.x += (dir.x + 2 * dir2.x + 2 * dir3.x + dir4.x) * dt / 6;
pos.y += (dir.y + 2 * dir2.y + 2 * dir3.y + dir4.y) * dt / 6;
dir.x += (ddir1.x + 2 * ddir2.x + 2 * ddir3.x + ddir4.x) * dt / 6;
dir.y += (ddir1.y + 2 * ddir2.y + 2 * ddir3.y + ddir4.y) * dt / 6;
// Normalize direction
const dirLen = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
if (dirLen > 0) {
dir.x /= dirLen;
dir.y /= dirLen;
}
path.push({...pos});
}
return path;
}
// Add mass point for custom gravity well
addMassPoint(x, y, mass) {
this.massPoints.push({x, y, mass});
}
// Clear mass points
clearMassPoints() {
this.massPoints = [];
}
// Compute custom metric from mass points (superposition)
customMetric(x, y) {
let g_xx = 1, g_yy = 1, g_xy = 0;
for (let mp of this.massPoints) {
const dx = x - mp.x;

const dy = y - mp.y;
const r = Math.sqrt(dx * dx + dy * dy);
const r_s = 2 * mp.mass;
if (r > r_s) {
const factor = 1 / (1 - r_s / r);
g_xx += factor - 1;
g_yy += r * r;
}
}
return {g_xx, g_yy, g_xy};
}
// Schwarzschild redshift factor
redshift(r, M) {
const r_s = 2 * M;
if (r <= r_s) return Infinity;
return 1 / Math.sqrt(1 - r_s / r);
}
// Photon sphere radius (unstable circular orbit)
photonSphereRadius(M) {
return 3 * M;
}
// Get uniforms for shader
getUniforms() {
return {
u_time: this.time,
u_curvature_type: this.curvatureType,
u_mass: this.mass,
u_curvature: this.curvature,
u_lens_center: [this.lensCenter.x, this.lensCenter.y]
};
}
// Animate lens center
animate(dt) {
this.time += dt;
this.lensCenter = {
x: Math.sin(this.time * 0.3) * 0.2,
y: Math.cos(this.time * 0.5) * 0.2
};
}
setCurvatureType(type) {
this.curvatureType = type;
}
setMass(mass) {

this.mass = mass;
}
}