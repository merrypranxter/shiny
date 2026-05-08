// System 47: Cusp Flash — JS Module
// Hysteresis state machine, critical point detection, touch mapping

export class CuspFlashSystem {
constructor() {
this.controlA = 0.0;
// normal factor
this.controlB = 0.0;
// splitting factor
this.hysteresis = 0;
// state memory: 0 or 1
this.prevHysteresis = 0;
// for detecting change
this.flashIntensity = 0.0; // current flash
// Cusp parameters
this.upperThreshold = 0.3;
// jump up threshold
this.lowerThreshold = -0.3; // jump down threshold
this.flashDecay = 0.9;
// flash fade per frame
}
// Map touch pressure to control_b
setPressure(pressure) {
// Pressure 0-1 maps to control_b range
this.controlB = (pressure - 0.5) * 2.0;
}
// Set normal factor (can be animated for "The Sneeze" build)
setNormalFactor(a) {
this.controlA = a;
}
// Update hysteresis state based on cusp catastrophe
update() {
this.prevHysteresis = this.hysteresis;
// Discriminant: 4a³ + 27b² (negated for our convention)
const discriminant = -(4 * Math.pow(this.controlA, 3) + 27 * Math.pow(this.controlB, 2));
if (discriminant > 0) {
// Bistable region — hysteresis determines branch
// Only jump if we cross thresholds
if (this.controlB > this.upperThreshold && this.hysteresis === 0) {
this.hysteresis = 1;
} else if (this.controlB < this.lowerThreshold && this.hysteresis === 1) {
this.hysteresis = 0;
}
// Otherwise: stay on current branch (the memory!)
} else {
// Monostable — forced to single equilibrium
this.hysteresis = (this.controlB > 0) ? 0 : 1;
}
// Detect catastrophe (state change)
const stateChanged = (this.hysteresis !== this.prevHysteresis);
// Flash on state change or near boundary

const nearBoundary = (discriminant > -0.5 && discriminant < 0.5);
if (stateChanged) {
this.flashIntensity = 1.0;
} else if (nearBoundary) {
this.flashIntensity = Math.max(this.flashIntensity, 0.3);
}
// Decay flash
this.flashIntensity *= this.flashDecay;
}
// Get uniforms for shader
getUniforms() {
return {
u_control_a: this.controlA,
u_control_b: this.controlB,
u_hysteresis: this.hysteresis,
u_flash: this.flashIntensity
};
}
// For "Dam Break" — array of cells
static createCellGrid(rows, cols) {
const cells = [];
for (let i = 0; i < rows; i++) {
for (let j = 0; j < cols; j++) {
cells.push(new CuspFlashSystem());
}
}
return cells;
}
// For "Cusp Choir" — slightly varied thresholds
static createChoir(count) {
const systems = [];
for (let i = 0; i < count; i++) {
const sys = new CuspFlashSystem();
sys.upperThreshold = 0.3 + (Math.random() - 0.5) * 0.2;
sys.lowerThreshold = -0.3 + (Math.random() - 0.5) * 0.2;
sys.controlA = -1.0 + Math.random() * 0.5; // all in bistable region
systems.push(sys);
}
return systems;
}
// For "The Sneeze" — slowly increasing pressure
sneezeBuildup(speed = 0.01) {
this.controlA -= speed; // Move toward bistable region
if (this.controlA < -1.5) {
this.controlA = 0.0; // Reset

this.hysteresis = 0;
}
}
}