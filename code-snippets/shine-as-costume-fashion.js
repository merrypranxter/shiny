// ✦ System 17: Shine as Costume/Fashion
// Drape simulation + attachment rules

function fashionSystem(bodyPoints, fabricRules) {
  const garments = [];

  for (const rule of fabricRules) {
    const garment = {
      type: rule.type,
      anchor: rule.anchor(bodyPoints),
      drape: generateDrape(rule.anchor(bodyPoints), rule.length, rule.width),
      material: rule.material,
      shine: rule.shine
    };
    garments.push(garment);
  }

  return garments;
}

function generateDrape(anchor, length, width) {
  const points = [];
  const segments = 20;

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = anchor.x + Math.sin(t * Math.PI) * width * (0.5 + Math.random() * 0.3);
    const y = anchor.y + t * length;
    const z = Math.sin(t * Math.PI * 2) * 5; // fold depth
    points.push({ x, y, z, t });
  }

  return points;
}

function drawGarment(ctx, garment, time) {
  const { drape, material, shine } = garment;

  ctx.beginPath();
  ctx.moveTo(drape[0].x, drape[0].y);

  for (let i = 1; i < drape.length; i++) {
    const p = drape[i];
    const prev = drape[i - 1];

    // Bezier for smooth drape
    const cpX = (prev.x + p.x) / 2;
    const cpY = (prev.y + p.y) / 2;
    ctx.quadraticCurveTo(cpX, cpY, p.x, p.y);
  }

  // Material shine
  switch(shine) {
    case 'sequin':
      ctx.strokeStyle = `hsla(${time * 30}, 80%, 60%, 0.9)`;
      ctx.lineWidth = 2;
      ctx.setLineDash([2, 4]);
      break;
    case 'latex':
      ctx.strokeStyle = `hsla(0, 0%, ${50 + Math.sin(time) * 30}%, 0.8)`;
      ctx.lineWidth = 3;
      ctx.setLineDash([]);
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
      break;
    case 'velvet':
      ctx.strokeStyle = `hsla(300, 40%, ${20 + Math.sin(time * 0.5) * 10}%, 0.9)`;
      ctx.lineWidth = 4;
      ctx.setLineDash([]);
      ctx.shadowBlur = 0;
      break;
  }

  ctx.stroke();
  ctx.setLineDash([]);
  ctx.shadowBlur = 0;

  // Attachment points (jewelry, pins)
  for (const p of drape.filter((_, i) => i % 5 === 0)) {
    ctx.fillStyle = 'rgba(255, 215, 0, 0.8)';
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}
