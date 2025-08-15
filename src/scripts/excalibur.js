import * as ex from 'excalibur';
import Engine from './engine.js';

export class Scene extends ex.Scene {
  onActivate(ctx) {
    const engine = ctx.engine;
    this.engine = ctx.data.engine;

    this.clear();

    // Particle creation
    const particles = new Array(this.engine.count);
    const rnd = [1, -1];
    const spriteImage = new ex.ImageSource('sprite.png');
    spriteImage.load();
    for (let i = 0; i < this.engine.count; i++) {
      const size = 10 + Math.random() * 80;
      const x = Math.random() * this.engine.width;
      const y = Math.random() * (this.engine.height - size);
      const [dx, dy] = [
        3 * Math.random() * rnd[Math.floor(Math.random() * 2)],
        3 * Math.random() * rnd[Math.floor(Math.random() * 2)],
      ];

      const particle = new ex.Actor({
        x: x,
        y: y,
        radius: size,
      });

      if (this.engine.type === 'sprite') {
        const sprite = ex.Sprite.from(spriteImage);
        particle.graphics.use(sprite);
      } else {
        const circle = new ex.Circle({
          x: x,
          y: y,
          radius: size,
          color:
            this.engine.type === 'stroke'
              ? ex.Color.Transparent
              : ex.Color.fromRGB(255, 255, 255),
          strokeColor:
            this.engine.type === 'stroke'
              ? ex.Color.fromRGB(255, 255, 255)
              : ex.Color.fromRGB(0, 0, 0),
          strokeWidth: this.engine.type === 'stroke' ? 1 : undefined,
        });
        particle.graphics.use(circle);
      }
      this.add(particle);

      particles[i] = { x, y, size: size, dx, dy, el: particle };

      particle.on("postupdate", () => {
        const r = particles[i];
        r.x -= r.dx;
        r.y -= r.dy;
        if (r.x + r.size < 0) r.dx *= -1;
        else if (r.y + r.size < 0) r.dy *= -1;
        if (r.x > engine.screen.drawWidth) r.dx *= -1;
        else if (r.y > engine.screen.drawHeight) r.dy *= -1;
        r.el.pos.x = r.x;
        r.el.pos.y = r.y;
      });
    }
  }
  onPostUpdate() {
    this.engine.fpsmeter.tick();
  }
}

class ExcaliburEngine extends Engine {
  init() {
    super.init();

    window.cancelAnimationFrame(this.request);
    if (this.game) {
      this.game.dispose();
      this.canvas = document.createElement("canvas");
      this.canvas.id = "canvas";
      this.canvas.className = "canvas";
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      document.querySelector("main").appendChild(this.canvas);
    }

    const game = new ex.Engine({
      width: this.width,
      height: this.height,
      canvasElement: this.canvas,
      backgroundColor: ex.Color.fromRGB(26, 26, 26),
      scenes: { scene: Scene }
    });
    this.game = game;
  }
  render() {
    this.game.start().then(() => {
      this.game.goToScene('scene', { sceneActivationData: { engine: this } });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const engine = new ExcaliburEngine();
  engine.render();
});
