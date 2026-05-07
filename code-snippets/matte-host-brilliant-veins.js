// ✦ System 1: Matte Host + Brilliant Veins
// JS-ish code sketch: vein mask via branching walkers

const veins = [];

function seedVeins(count, w, h) {
  for (let i = 0; i < count; i++) {
    veins.push({
      x: w * (0.3 + 0.4 * Math.random()),
      y: h * (0.3 + 0.4 * Math.random()),
      angle: Math.random() * Math.PI * 2,
      life: 120 + Math.random() * 180,
      thickness: 2 + Math.random() * 2
    });
  }
}

function growVeins() {
  for (const v of veins) {
    if (v.life <= 0) continue;
    v.x += Math.cos(v.angle) * 2;
    v.y += Math.sin(v.angle) * 2;
    v.life--;
    // Branch occasionally
    if (Math.random() < 0.03 && v.life > 30) {
      veins.push({
        x: v.x,
        y: v.y,
        angle: v.angle + (Math.random() - 0.5) * 1.2,
        life: v.life * 0.7,
        thickness: v.thickness * 0.7
      });
    }
    // Wiggle
    v.angle += (Math.random() - 0.5) * 0.15;
  }
}
