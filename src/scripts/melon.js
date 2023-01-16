import * as me from 'melonjs';
import Engine from './engine.js';

class Graphics extends me.Renderable {
  constructor(engine) {
    super(0, 0, engine.width, engine.heigth);
    this.engine = engine;
    this.anchorPoint.set(0, 0);

    // Particle creation
    const particles = new Array(engine.count);
    const rnd = [1, -1];
    for (let i = 0; i < engine.count; i++) {
      const size = 10 + Math.random() * 80;
      const x = Math.random() * engine.width;
      const y = Math.random() * (engine.height - size);
      const [dx, dy] = [
        3 * Math.random() * rnd[Math.floor(Math.random() * 2)],
        3 * Math.random() * rnd[Math.floor(Math.random() * 2)],
      ];
      particles[i] = { x, y, size: size, dx, dy };
    }
    this.particles = particles;
  }
  update() {
    return true;
  }
  draw(renderer) {
    renderer.clearColor('#1a1a1a');
    renderer.setColor('#ffffff');

    // Particle animation
    const particles = this.particles;
    for (let i = 0; i < this.engine.count; i++) {
      const r = particles[i];
      r.x -= r.dx;
      r.y -= r.dy;
      if (r.x + r.size < 0) r.dx *= -1;
      else if (r.y + r.size < 0) r.dy *= -1;
      if (r.x > this.engine.width) r.dx *= -1;
      else if (r.y > this.engine.height) r.dy *= -1;
      if (this.engine.type === 'stroke')
        renderer.strokeArc(r.x, r.y, r.size, 0, Math.PI * 2);
      if (this.engine.type === 'fill') {
        renderer.setColor('#ffffff');
        renderer.fillArc(r.x, r.y, r.size, 0, Math.PI * 2, false);
        renderer.setColor('#000000');
        renderer.strokeArc(r.x, r.y, r.size, 0, Math.PI * 2, false);
      }
    }
    this.engine.fpsmeter.tick();
  }
}

class MelonEngine extends Engine {
  constructor() {
    super();
  }
  init() {
    super.init();

    // Clear the canvas
    this.canvas.innerHTML = '';
    window.cancelAnimationFrame(this.request);

    // Create if new, else reset/empty the game world
    if (me.game.world) {
      me.game.world.reset();
    } else {
      const main = document.querySelector('main');
      main.removeChild(main.lastElementChild);
      me.video.init(this.width, this.height, {
        parent: 'main',
        renderer: me.video.AUTO,
        preferWebGL1: false,
        subPixel: false,
      });
    }
  }
  render() {
    me.game.world.addChild(new Graphics(this));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const engine = new MelonEngine();
  engine.render();
});
