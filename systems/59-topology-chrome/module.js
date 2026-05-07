// System 59: Topology Chrome — JS Module
// Implicit surfaces, topology computation, shape morphing
export class TopologyChromeSystem {
constructor() {
this.mode = 0;
this.time = 0;
this.genus = 1;
this.morphT = 0;

// Surface parameters
this.sphereRadius = 0.5;
this.torusMajor = 0.4;
this.torusMinor = 0.15;
// Topology invariants (computed)
this.eulerCharacteristic = 2;
this.currentGenus = 0;
}
// SDF: Sphere
sdSphere(p, r) {
const len = Math.sqrt(p.x**2 + p.y**2 + p.z**2);
return len - r;
}
// SDF: Torus
sdTorus(p, R, r) {
const qx = Math.sqrt(p.x**2 + p.z**2) - R;
const qy = p.y;
return Math.sqrt(qx**2 + qy**2) - r;
}
// SDF: Box
sdBox(p, b) {
const d = [
Math.abs(p.x) - b.x,
Math.abs(p.y) - b.y,
Math.abs(p.z) - b.z
];
const inside = Math.min(Math.max(d[0], Math.max(d[1], d[2])), 0);
const outside = Math.sqrt(
Math.max(d[0], 0)**2 +
Math.max(d[1], 0)**2 +
Math.max(d[2], 0)**2
);
return inside + outside;
}
// Evaluate SDF at point
evaluateSDF(p) {
switch(this.mode) {
case 0: return this.sdSphere(p, this.sphereRadius);
case 1: return this.sdTorus(p, this.torusMajor, this.torusMinor);
case 2: return this.sdKlein(p, 0.5);
case 3: return this.sdGenus(p, this.genus, 0.5);
case 4: return this.morphT * this.sdTorus(p, this.torusMajor, this.torusMinor) +
(1 - this.morphT) * this.sdSphere(p, this.sphereRadius);
default: return this.sdSphere(p, this.sphereRadius);
}
}

// Approximate normal via central differences
calcNormal(p) {
const eps = 0.001;
return {
x: this.evaluateSDF({x: p.x + eps, y: p.y, z: p.z}) -
this.evaluateSDF({x: p.x - eps, y: p.y, z: p.z}),
y: this.evaluateSDF({x: p.x, y: p.y + eps, z: p.z}) -
this.evaluateSDF({x: p.x, y: p.y - eps, z: p.z}),
z: this.evaluateSDF({x: p.x, y: p.y, z: p.z + eps}) -
this.evaluateSDF({x: p.x, y: p.y, z: p.z - eps})
};
}
// Compute Euler characteristic (sampling approach)
computeEulerCharacteristic() {
// Sample grid of points
const samples = 20;
let inside = 0;
let surface = 0;
for (let x = -1; x <= 1; x += 2/samples) {
for (let y = -1; y <= 1; y += 2/samples) {
for (let z = -1; z <= 1; z += 2/samples) {
const d = this.evaluateSDF({x, y, z});
if (d < 0) inside++;
if (Math.abs(d) < 0.05) surface++;
}
}
}
// Rough approximation: χ ≈2 for sphere, 0 for torus
const volume = inside / (samples**3);
this.eulerCharacteristic = volume > 0.5 ? 2 : 0;
this.currentGenus = (2 - this.eulerCharacteristic) / 2;
return this.eulerCharacteristic;
}
// Morph between shapes
morph(targetMode, duration = 2.0) {
const startT = this.morphT;
const startTime = this.time;
const animate = () => {
const elapsed = this.time - startTime;
const progress = Math.min(elapsed / duration, 1.0);
if (this.mode === 4) {
this.morphT = startT + (targetMode === 1 ? 1 : -1) * progress;
this.morphT = Math.max(0, Math.min(1, this.morphT));

}
if (progress < 1.0) {
requestAnimationFrame(animate);
} else {
this.mode = targetMode;
}
};
this.mode = 4; // morph mode
animate();
}
// Get topology info
getTopologyInfo() {
return {
eulerCharacteristic: this.eulerCharacteristic,
genus: this.currentGenus,
orientable: this.mode !== 2, // Klein is non-orientable
name: this.getShapeName()
};
}
getShapeName() {
const names = ['Sphere', 'Torus', 'Klein Bottle', 'Genus-g', 'Morphing'];
return names[this.mode] || 'Unknown';
}
// Get uniforms for shader
getUniforms() {
return {
u_time: this.time,
u_mode: this.mode,
u_genus: this.genus,
u_morph_t: this.morphT
};
}
// Main update
update(dt) {
this.time += dt;
}
setMode(mode) {
this.mode = mode;
this.computeEulerCharacteristic();
}
setGenus(g) {
this.genus = Math.max(1, Math.floor(g));
if (this.mode === 3) {

this.computeEulerCharacteristic();
}
}
}
// Klein bottle SDF (simplified parametric)
TopologyChromeSystem.prototype.sdKlein = function(p, scale) {
p = {x: p.x/scale, y: p.y/scale, z: p.z/scale};
const a = 2.0;
const r = a + Math.cos(p.y * 0.5) * Math.sin(p.x * 0.5) -
Math.sin(p.y * 0.5) * Math.cos(p.x * 0.5) * 0.5;
const dx = r * Math.cos(p.y) - p.x;
const dy = r * Math.sin(p.y) - p.z;
const dz = -Math.sin(p.y * 0.5) * Math.sin(p.x * 0.5) -
Math.cos(p.y * 0.5) * Math.cos(p.x * 0.5) * 0.5 - p.y;
return Math.sqrt(dx*dx + dy*dy + dz*dz) * scale;
};
// Genus-g surface SDF
TopologyChromeSystem.prototype.sdGenus = function(p, g, scale) {
let d = this.sdSphere(p, scale);
for (let i = 0; i < g; i++) {
const angle = (i / g) * Math.PI * 2;
const tc = {
x: Math.cos(angle) * scale * 0.6,
y: 0,
z: Math.sin(angle) * scale * 0.6
};
const tunnel = this.sdTorus(
{x: p.x - tc.x, y: p.y - tc.y, z: p.z - tc.z},
scale * 0.3,
scale * 0.15
);
d = Math.max(d, -tunnel); // CSG subtraction
}
return d;
};