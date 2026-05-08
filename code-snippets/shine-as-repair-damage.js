// ✦ System 12: Shine as Repair/Damage
// Voronoi fracture + kintsugi fill

function damageMap(w, h, stressPoints) {
  const damage = [];

  // Generate cracks from stress points
  for (const stress of stressPoints) {
    const cracks = seedCracks(stress.x, stress.y, 6);
    for (const c of cracks) {
      damage.push({
        x: c.x,
        y: c.y,
        width: c.width,
        age: 0,
        type: 'crack'
      });
    }
  }

  return damage;
}

function seedCracks(cx, cy, branches) {
  const cracks = [];
  for (let i = 0; i < branches; i++) {
    const angle = (Math.PI * 2 * i) / branches + (Math.random() - 0.5) * 0.5;
    cracks.push({
      x: cx,
      y: cy,
      angle,
      life: 60 + Math.random() * 80,
      width: 1 + Math.random()
    });
  }
  return cracks;
}

function kintsugiRepair(ctx, damage, time) {
  for (const d of damage) {
    if (d.type === 'crack') {
      // Gold fill
      const goldHue = 45 + Math.sin(time + d.x * 0.1) * 5;
      ctx.strokeStyle = `hsla(${goldHue}, 80%, 60%, 0.9)`;
      ctx.lineWidth = d.width * 1.5;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 4;
      ctx.shadowColor = 'rgba(255, 215, 0, 0.5)';

      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x + Math.cos(d.angle) * 5, d.y + Math.sin(d.angle) * 5);
      ctx.stroke();
    }
  }
  ctx.shadowBlur = 0;
}

function scarTissue(ctx, damage, time) {
  // Healed cracks become slightly raised, iridescent
  for (const d of damage) {
    if (d.age > 100) {
      const irid = Math.sin(d.x * 0.2 + time) * Math.cos(d.y * 0.2 + time * 0.7);
      ctx.fillStyle = `hsla(${200 + irid * 60}, 30%, 70%, 0.3)`;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.width * 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
