// ✦ System 46: LORENZ GLITTER — Chaos Made Shine
// JavaScript Implementation
// ES2020+, Browser + Node compatible

export class LorenzParticle {
  constructor(seed, params = { sigma: 10, rho: 28, beta: 8/3 }) {
    this.seed = seed;
    this.sigma = params.sigma + (Math.sin(seed * 2) * 2);
    this.rho = params.rho + (Math.cos(seed * 3) * 5);
    this.beta = params.beta + (Math.sin(seed * 5) * 0.5);

    this.pos = {
      x: Math.sin(seed * 7) * 10 + Math.random() * 0.1,
      y: Math.cos(seed * 11) * 10,
      z: 15 + Math.sin(seed * 3) * 5
    };

    this.trail = [];
    this.maxTrail = 50;
    this.color = this.computeColor();
  }

  step(dt = 0.01) {
    const { x, y, z } = this.pos;
    const dx = this.sigma * (y - x);
    const dy = x * (this.rho - z) - y;
    const dz = x * y - this.beta * z;

    this.pos.x += dx * dt;
    this.pos.y += dy * dt;
    this.pos.z += dz * dt;

    this.trail.push({ ...this.pos });
    if (this.trail.length > this.maxTrail) this.trail.shift();
    this.color = this.computeColor();
  }

  computeColor() {
    const hue = ((this.pos.z + 20) / 50) * 360;
    const velocity = Math.sqrt(
      Math.pow(this.sigma * (this.pos.y - this.pos.x), 2) +
      Math.pow(this.pos.x * (this.rho - this.pos.z) - this.pos.y, 2)
    );
    const brightness = 30 + Math.min(velocity * 10, 70);
    return `hsla(${hue}, 70%, ${brightness}%, 0.8)`;
  }

  draw(ctx, centerX, centerY, scale = 0.02) {
    if (this.trail.length > 1) {
      ctx.beginPath();
      for (let i = 0; i < this.trail.length; i++) {
        const t = this.trail[i];
        if (i === 0) ctx.moveTo(centerX + t.x * scale, centerY + t.y * scale);
        else ctx.lineTo(centerX + t.x * scale, centerY + t.y * scale);
      }
      ctx.strokeStyle = this.color.replace('0.8', '0.3');
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    const sx = centerX + this.pos.x * scale;
    const sy = centerY + this.pos.y * scale;
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(sx, sy, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

export class LorenzGlitterSystem {
  constructor(count = 100) {
    this.particles = Array.from({ length: count }, (_, i) => new LorenzParticle(i));
  }

  update() {
    for (const p of this.particles) p.step();
  }

  draw(ctx, w, h) {
    ctx.fillStyle = 'rgba(5, 8, 15, 0.1)';
    ctx.fillRect(0, 0, w, h);
    for (const p of this.particles) p.draw(ctx, w / 2, h / 2);
  }
}

// Quick start
// const system = new LorenzGlitterSystem(100);
// function animate() { system.update(); system.draw(ctx, canvas.width, canvas.height); requestAnimationFrame(animate); }
// animate();
