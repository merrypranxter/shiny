// ✦ System 11: Shine as Anatomy
// L-systems + organelle placement

function anatomySystem(w, h, seed) {
  const systems = {
    circulatory: generateVeinNetwork(w * 0.5, h * 0.5, 8, 150),
    nervous: generateNerveTree(w * 0.5, h * 0.5, 6, 100),
    lymph: generateLymphNodes(w, h, 12),
    skeletal: generateSkeletonFrame(w, h)
  };
  return systems;
}

function generateVeinNetwork(cx, cy, branches, length) {
  const veins = [];
  for (let i = 0; i < branches; i++) {
    const angle = (Math.PI * 2 * i) / branches + (Math.random() - 0.5) * 0.3;
    veins.push({
      x: cx,
      y: cy,
      angle,
      length,
      thickness: 3 + Math.random() * 2,
      color: 'hsla(0, 60%, 50%, 0.7)' // arterial red
    });
  }
  return veins;
}

function generateNerveTree(cx, cy, depth, spread) {
  const nerves = [];
  function branch(x, y, angle, d, len) {
    if (d <= 0) return;
    const endX = x + Math.cos(angle) * len;
    const endY = y + Math.sin(angle) * len;
    nerves.push({ x1: x, y1: y, x2: endX, y2: endY, depth: d });

    branch(endX, endY, angle - 0.3, d - 1, len * 0.7);
    branch(endX, endY, angle + 0.3, d - 1, len * 0.7);
  }
  branch(cx, cy, -Math.PI / 2, depth, spread / depth);
  return nerves;
}

function generateLymphNodes(w, h, count) {
  const nodes = [];
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: 5 + Math.random() * 8,
      pulse: Math.random() * Math.PI * 2
    });
  }
  return nodes;
}

function generateSkeletonFrame(w, h) {
  // Simplified stick skeleton
  const joints = [
    { x: w * 0.5, y: h * 0.1 },   // head
    { x: w * 0.5, y: h * 0.3 },   // neck
    { x: w * 0.3, y: h * 0.35 },  // shoulder L
    { x: w * 0.7, y: h * 0.35 },  // shoulder R
    { x: w * 0.5, y: h * 0.6 },   // spine
    { x: w * 0.35, y: h * 0.9 },  // hip L
    { x: w * 0.65, y: h * 0.9 },  // hip R
  ];
  return joints;
}
