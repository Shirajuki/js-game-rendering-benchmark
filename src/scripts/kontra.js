import { init, GameLoop } from 'kontra';
import Engine from './engine.js';

class KontraEngine extends Engine {
  constructor() {
    super();
  }
  init() {
    super.init();

    // Clear the canvas
    this.canvas.innerHTML = '';
    window.cancelAnimationFrame(this.request);

    if (!this.loop) {
      const { context } = init();
      this.ctx = context;
      this.ctx.strokeStyle = 'white';
      this.ctx.lineWidth = 1;
    }

    // Particle creation
    const particles = new Array(this.count);
    const rnd = [1, -1];
    for (let i = 0; i < this.count; i++) {
      const size = 10 + Math.random() * 80;
      const x = Math.random() * this.width;
      const y = Math.random() * (this.height - size);
      const [dx, dy] = [
        3 * Math.random() * rnd[Math.floor(Math.random() * 2)],
        3 * Math.random() * rnd[Math.floor(Math.random() * 2)],
      ];
      particles[i] = { x, y, size: size, dx, dy };
    }
    this.particles = particles;
  }
  render() {
    if (this.loop) return;
    this.loop = GameLoop({
      update: () => {
        // Particle animation
        for (let i = 0; i < this.count; i++) {
          const r = this.particles[i];
          r.x -= r.dx;
          r.y -= r.dy;
          if (r.x + r.size < 0) r.dx *= -1;
          else if (r.y + r.size < 0) r.dy *= -1;
          if (r.x > this.width) r.dx *= -1;
          else if (r.y > this.height) r.dy *= -1;
        }
        this.fpsmeter.tick();
      },
      render: () => {
        for (let i = 0; i < this.count; i++) {
          const r = this.particles[i];
          this.ctx.beginPath();
          this.ctx.arc(r.x, r.y, r.size, 0, 2 * Math.PI);
          this.ctx.stroke();
        }
      },
    });
    this.loop.start();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const engine = new KontraEngine();
  engine.render();
});
