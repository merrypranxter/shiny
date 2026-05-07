// ✦ System 10: Wet Shine vs Dry Shine
// State machine + material switching

class ShineState {
  constructor() {
    this.state = 'dry'; // 'dry', 'wet', 'transition'
    this.wetness = 0;   // 0 = dry, 1 = wet
    this.puddles = [];
    this.dust = [];
  }

  addWater(x, y, amount) {
    this.puddles.push({ x, y, radius: amount * 10, depth: amount });
    this.wetness = Math.min(1, this.wetness + amount * 0.1);
  }

  evaporate(rate) {
    this.wetness = Math.max(0, this.wetness - rate);
    for (const p of this.puddles) {
      p.radius *= (1 - rate * 0.5);
      p.depth *= (1 - rate);
    }
    this.puddles = this.puddles.filter(p => p.depth > 0.01);
  }

  render(ctx, time) {
    // Dry: particulate, dusty, flaky
    if (this.wetness < 0.3) {
      this.renderDust(ctx, time);
    }
    // Wet: glossy, reflective, flowing
    else if (this.wetness > 0.7) {
      this.renderWet(ctx, time);
    }
    // Transition: both present
    else {
      this.renderDust(ctx, time);
      this.renderWet(ctx, time);
    }
  }

  renderWet(ctx, time) {
    for (const p of this.puddles) {
      // Reflective pool
      const gradient = ctx.createRadialGradient(
        p.x, p.y, 0,
        p.x, p.y, p.radius
      );
      gradient.addColorStop(0, 'rgba(200, 220, 255, 0.6)');
      gradient.addColorStop(0.7, 'rgba(150, 180, 220, 0.3)');
      gradient.addColorStop(1, 'rgba(100, 140, 200, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      // Specular highlight
      const highlightX = p.x + Math.sin(time) * p.radius * 0.3;
      const highlightY = p.y + Math.cos(time) * p.radius * 0.3;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.ellipse(highlightX, highlightY, p.radius * 0.2, p.radius * 0.1, time, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  renderDust(ctx, time) {
    // Flaky, intermittent sparkle
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * ctx.canvas.width;
      const y = Math.random() * ctx.canvas.height;
      const twinkle = Math.sin(time * 5 + x * 0.1 + y * 0.1);
      if (twinkle > 0.8) {
        ctx.fillStyle = `rgba(255, 250, 220, ${twinkle * 0.5})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
}
