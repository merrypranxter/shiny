// System 49: Escher Chrome — JS Module
// Conformal map composition, Möbius transforms, inversion animation
export class EscherChromeSystem {
constructor() {
this.mapType = 0; // 0=mobius, 1=inversion, 2=hyperbolic, 3=schwarz
// Möbius parameters (complex a,b,c,d with ad-bc=1)
this.mobiusA = {x: 1, y: 0};

this.mobiusB = {x: 0, y: 0};
this.mobiusC = {x: 0, y: 0};
this.mobiusD = {x: 1, y: 0};
// Inversion
this.inversionRadius = 1.0;
this.inversionCenter = {x: 0, y: 0};
// Hyperbolic
this.hyperbolicCenter = {x: 0, y: 0};
// Animation
this.time = 0;
}
// Set Möbius transform (normalize to ad-bc=1)
setMobius(a, b, c, d) {
// Compute determinant
const det = (a.x * d.x - a.y * d.y) - (b.x * c.x - b.y * c.y);
const scale = 1 / Math.sqrt(det);
this.mobiusA = {x: a.x * scale, y: a.y * scale};
this.mobiusB = {x: b.x * scale, y: b.y * scale};
this.mobiusC = {x: c.x * scale, y: c.y * scale};
this.mobiusD = {x: d.x * scale, y: d.y * scale};
}
// Compose two Möbius transforms
composeMobius(a1, b1, c1, d1, a2, b2, c2, d2) {
// Matrix multiplication
const a = {
x: a1.x*a2.x - a1.y*a2.y + b1.x*c2.x - b1.y*c2.y,
y: a1.x*a2.y + a1.y*a2.x + b1.x*c2.y + b1.y*c2.x
};
const b = {
x: a1.x*b2.x - a1.y*b2.y + b1.x*d2.x - b1.y*d2.y,
y: a1.x*b2.y + a1.y*b2.x + b1.x*d2.y + b1.y*d2.x
};
const c = {
x: c1.x*a2.x - c1.y*a2.y + d1.x*c2.x - d1.y*c2.y,
y: c1.x*a2.y + c1.y*a2.x + d1.x*c2.y + d1.y*c2.x
};
const d = {
x: c1.x*b2.x - c1.y*b2.y + d1.x*d2.x - d1.y*d2.y,
y: c1.x*b2.y + c1.y*b2.x + d1.x*d2.y + d1.y*d2.x
};
return {a, b, c, d};
}
// Animate inversion center (for "Möbius Mirror")
animateInversion(dt) {

this.time += dt;
this.inversionCenter = {
x: Math.sin(this.time * 0.5) * 0.3,
y: Math.cos(this.time * 0.7) * 0.3
};
this.inversionRadius = 0.5 + Math.sin(this.time * 0.3) * 0.3;
}
// Animate hyperbolic center
animateHyperbolic(dt) {
this.time += dt;
this.hyperbolicCenter = {
x: 0.3 * Math.cos(this.time * 0.4),
y: 0.3 * Math.sin(this.time * 0.4)
};
}
// Set map type
setMapType(type) {
this.mapType = type;
}
// Get uniforms for shader
getUniforms() {
return {
u_time: this.time,
u_map_type: this.mapType,
u_mobius_a: [this.mobiusA.x, this.mobiusA.y],
u_mobius_b: [this.mobiusB.x, this.mobiusB.y],
u_mobius_c: [this.mobiusC.x, this.mobiusC.y],
u_mobius_d: [this.mobiusD.x, this.mobiusD.y],
u_inversion_radius: this.inversionRadius,
u_inversion_center: [this.inversionCenter.x, this.inversionCenter.y]
};
}
// Generate random Möbius transform (for "funhouse" effect)
randomMobius() {
const a = {x: 1 + Math.random(), y: Math.random()};
const b = {x: Math.random(), y: Math.random()};
const c = {x: Math.random() * 0.5, y: Math.random() * 0.5};
const d = {x: 1 + Math.random(), y: Math.random()};
this.setMobius(a, b, c, d);
}
// Circle limit tiling vertices (for hyperbolic mode)
generateCircleLimitTiling(p, q, maxDepth = 3) {
// Regular {p,q} tiling in hyperbolic plane
// p = polygon sides, q = polygons meeting at vertex
const polygons = [];

// Central polygon
const centralRadius = Math.sqrt(
(Math.cos(PI/q) - Math.cos(PI/p)) /
(Math.cos(PI/q) + Math.cos(PI/p))
);
for (let i = 0; i < p; i++) {
const angle = (2 * PI * i) / p;
polygons.push({
x: centralRadius * Math.cos(angle),
y: centralRadius * Math.sin(angle),
radius: centralRadius
});
}
return polygons;
}
}
const PI = Math.PI;