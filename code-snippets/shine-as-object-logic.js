// ✦ System 16: Shine as Object Logic
// Shape grammars + recursive forms

function objectLogic(seed, depth, rules) {
  const objects = [];

  function grow(parent, d) {
    if (d <= 0) return;

    for (const rule of rules) {
      if (rule.condition(parent)) {
        const child = rule.transform(parent);
        child.depth = d;
        child.shine = rule.shineType;
        objects.push(child);
        grow(child, d - 1);
      }
    }
  }

  const root = { x: 0, y: 0, size: 100, type: 'root', depth };
  objects.push(root);
  grow(root, depth);

  return objects;
}

// Example rules
const chromeRules = [
  {
    condition: (p) => p.type === 'root',
    transform: (p) => ({
      x: p.x,
      y: p.y - p.size * 0.5,
      size: p.size * 0.6,
      type: 'stem'
    }),
    shineType: 'chrome'
  },
  {
    condition: (p) => p.type === 'stem' && p.depth > 2,
    transform: (p) => ({
      x: p.x + p.size * 0.4,
      y: p.y,
      size: p.size * 0.5,
      type: 'branch'
    }),
    shineType: 'mirror'
  },
  {
    condition: (p) => p.type === 'stem' && p.depth > 2,
    transform: (p) => ({
      x: p.x - p.size * 0.4,
      y: p.y,
      size: p.size * 0.5,
      type: 'branch'
    }),
    shineType: 'mirror'
  },
  {
    condition: (p) => p.depth === 1,
    transform: (p) => ({
      x: p.x,
      y: p.y - p.size * 0.3,
      size: p.size * 0.3,
      type: 'tip'
    }),
    shineType: 'sparkle'
  }
];

function drawObject(ctx, obj, time) {
  switch(obj.shine) {
    case 'chrome':
      ctx.fillStyle = `hsla(200, 10%, ${70 + Math.sin(time + obj.depth) * 20}%, 0.9)`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(200, 220, 255, 0.5)';
      break;
    case 'mirror':
      ctx.fillStyle = `hsla(0, 0%, ${80 + Math.sin(time * 2 + obj.x) * 15}%, 0.8)`;
      ctx.shadowBlur = 4;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
      break;
    case 'sparkle':
      const twinkle = Math.sin(time * 5 + obj.x * 0.1) * 0.5 + 0.5;
      ctx.fillStyle = `rgba(255, 255, 220, ${twinkle})`;
      ctx.shadowBlur = 6 * twinkle;
      ctx.shadowColor = 'rgba(255, 255, 200, 0.8)';
      break;
    default:
      ctx.fillStyle = 'rgba(100, 100, 100, 0.5)';
  }

  ctx.beginPath();
  ctx.arc(obj.x, obj.y, obj.size / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
}
