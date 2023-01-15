import * as PIXI from 'pixi.js';
import Engine from './engine.js';

class PixiEngine extends Engine {
  constructor() {
    super();
  }
  init() {
    super.init();

    // Clear the canvas
    this.canvas.innerHTML = '';
    window.cancelAnimationFrame(this.request);

    // Setup application and stage
    if (this.app) this.app.ticker.destroy();
    this.app = new PIXI.Application({
      width: this.width,
      height: this.height,
      backgroundColor: 0x1a1a1a,
      antialias: true,
    });
    console.log(this.app.renderer);
    this.app.view.classList.add('canvas');

    // Update canvas with application view
    const main = document.querySelector('main');
    main.removeChild(main.lastElementChild);
    main.appendChild(this.app.view);

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
      const particle = new PIXI.Graphics();
      if (this.type === 'stroke') {
        particle.lineStyle(1, 0xffffff, 1);
        particle.drawCircle(-size / 2, -size / 2, size, 0, Math.PI);
      } else if (this.type === 'fill') {
        particle.beginFill(0xffffff);
        particle.lineStyle(1, 0x000000, 1);
        particle.drawCircle(-size / 2, -size / 2, size, 0, Math.PI);
        particle.endFill();
      }
      particle.position.set(x, y);
      this.app.stage.addChild(particle);
      particles[i] = { x, y, size: size, dx, dy, el: particle };
    }
    this.particles = particles;
  }
  render() {
    this.app.ticker.add(() => {
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
        r.el.position.x = r.x;
        r.el.position.y = r.y;
      }

      this.fpsmeter.tick();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const engine = new PixiEngine();
  engine.render();
});
