import Engine from './engine.js';
import * as little from 'littlejsengine';

class LittleJSEngine extends Engine {
  init() {
    super.init();

    // Clear the canvas
    this.rootElement = document.getElementById('root');

    // Start the LittleJS engine
    if (!this.initialized) {
      little.engineInit(
        this.gameInit.bind(this),
        this.gameUpdate.bind(this),
        this.gameUpdatePost.bind(this),
        this.gameRender.bind(this),
        this.gameRenderPost.bind(this),
        this.type === 'sprite' ? ['sprite.png'] : [],
        this.rootElement
      );
      this.initialized = true;
      this.rootElement.style.width = this.width + 'px';
      this.rootElement.style.height = this.height + 'px';
    }
  }

  gameInit() {
    little.setShowWatermark(false);
    little.setCanvasFixedSize(little.vec2(this.width, this.height));
    little.setCameraScale(1);
    little.setCameraPos(little.vec2(this.width / 2, this.height / 2));
    little.mainCanvas.style.background = '#1a1a1a';

    document
      .querySelectorAll('canvas:not(:first-of-type)')
      .forEach((canvas) => {
        canvas.style.background = 'transparent';
      });

    // Particle creation
    const particles = new Array(this.count);
    const rnd = [1, -1];
    for (let i = 0; i < this.count; i++) {
      const size = 10 + Math.random() * 80;
      const x = Math.random() * this.width;
      const y = Math.random() * (this.height - size);
      const pos = little.vec2(x, y);
      const [dx, dy] = [
        3 * Math.random() * rnd[Math.floor(Math.random() * 2)],
        3 * Math.random() * rnd[Math.floor(Math.random() * 2)],
      ];
      particles[i] = {
        pos,
        size: size,
        dx,
        dy,
        tile: this.type === 'sprite' ? little.tile(0, 64, 0) : null,
      };
    }
    this.particles = particles;
  }
  gameUpdate() {
    // Particle animation
    const particles = this.particles;
    for (let i = 0; i < this.count; i++) {
      const r = particles[i];
      r.pos.x -= r.dx;
      r.pos.y -= r.dy;
      if (r.pos.x + r.size < 0) r.dx *= -1;
      else if (r.pos.y + r.size < 0) r.dy *= -1;
      if (r.pos.x > this.width) r.dx *= -1;
      else if (r.pos.y > this.height) r.dy *= -1;
    }
  }
  gameUpdatePost() {}
  gameRender() {
    this.fpsmeter.tick();
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      if (this.type === 'sprite') {
        little.drawTile(particle.pos, particle.tile.size, particle.tile);
      } else {
        if (this.type === 'fill') {
          little.drawCircle(
            particle.pos,
            particle.size,
            little.WHITE,
            1,
            little.BLACK
          );
        }
        if (this.type != 'sprite')
          little.drawCircle(
            particle.pos,
            particle.size,
            little.rgb(0, 0, 0, 0),
            1,
            little.WHITE
          );
      }
    }
  }
  gameRenderPost() {}

  render() {
    super.render();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const engine = new LittleJSEngine();
  engine.render();
});
