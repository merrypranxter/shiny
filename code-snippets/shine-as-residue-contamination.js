// ✦ System 14: Shine as Residue/Contamination
// Cellular automata + slime mold

class Contamination {
  constructor(w, h) {
    this.grid = new Array(h).fill(0).map(() => new Array(w).fill(0));
    this.w = w;
    this.h = h;
    this.sources = [];
  }

  addSource(x, y, strength) {
    this.sources.push({ x, y, strength });
    this.grid[y][x] = strength;
  }

  step() {
    const newGrid = this.grid.map(row => [...row]);

    for (let y = 1; y < this.h - 1; y++) {
      for (let x = 1; x < this.w - 1; x++) {
        // Spread to neighbors
        const current = this.grid[y][x];
        if (current > 0.1) {
          const spread = current * 0.25;
          newGrid[y-1][x] += spread;
          newGrid[y+1][x] += spread;
          newGrid[y][x-1] += spread;
          newGrid[y][x+1] += spread;
          newGrid[y][x] *= 0.8; // decay
        }
      }
    }

    // Clamp
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        newGrid[y][x] = Math.min(1, Math.max(0, newGrid[y][x]));
      }
    }

    this.grid = newGrid;
  }

  render(ctx, time) {
    const imageData = ctx.createImageData(this.w, this.h);
    const data = imageData.data;

    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        const v = this.grid[y][x];
        const idx = (y * this.w + x) * 4;

        // Mold color: greenish with iridescence
        const hue = 100 + v * 40 + Math.sin(x * 0.1 + time) * 10;
        const sat = 40 + v * 40;
        const light = 20 + v * 40;

        const rgb = hslToRgb(hue / 360, sat / 100, light / 100);
        data[idx] = rgb[0];
        data[idx+1] = rgb[1];
        data[idx+2] = rgb[2];
        data[idx+3] = v * 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }
}

function hslToRgb(h, s, l) {
  // HSL to RGB conversion
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
