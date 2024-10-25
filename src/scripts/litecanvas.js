import Engine from './engine.js';
import litecanvas from 'litecanvas';

function init() {}

class LitecanvasEngine extends Engine {
  constructor() {
    super();
  }
  init() {
    super.init();

    // Clear the canvas
    this.canvas.innerHTML = '';
    window.cancelAnimationFrame(this.request);

    // Start the Litecanvas
    if (!this.engine) {
      this.engine = litecanvas({
        canvas: this.canvas,
        width: this.width,
        height: this.height,
        autoscale: false,

        // disable the built-in game loop
        animate: false,
        loop: {},
        global: false,
      });
    }

    // Load the sprite
    if (this.type === 'sprite') {
      this.sprite = new Image();
      this.sprite.src = 'sprite.png';
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
    // Clear the canvas
    this.engine.cls();

    // Particle animation
    const particles = this.particles;
    for (let i = 0; i < this.count; i++) {
      const r = particles[i];
      r.x -= r.dx;
      r.y -= r.dy;
      if (r.x + r.size < 0) r.dx *= -1;
      else if (r.y + r.size < 0) r.dy *= -1;
      if (r.x > this.width) r.dx *= -1;
      else if (r.y > this.height) r.dy *= -1;
      if (this.type === 'sprite') {
        if (this.sprite.complete) {
          this.engine.image(r.x, r.y, this.sprite);
        }
      } else {
        if (this.type === 'fill') this.engine.circfill(r.x, r.y, r.size, 3);
        if (this.type != 'sprite') this.engine.circ(r.x, r.y, r.size, 1);
      }
    }

    this.fpsmeter.tick();
    this.request = window.requestAnimationFrame(() => this.render());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const engine = new LitecanvasEngine();
  engine.render();
});
