import * as ex from 'excalibur';
import Engine from './engine.js';

export class Scene extends ex.Scene {
  particles = [];
  onActivate(ctx) {
    this.benchmarkEngine = ctx.data.engine;

    this.clear();

    // Particle creation
    this.particles = new Array(this.benchmarkEngine.count);
    const rnd = [1, -1];
    const spriteImage = new ex.ImageSource('sprite.png');
    spriteImage.load();
    const sprite = ex.Sprite.from(spriteImage);

    const random = new ex.Random();
    let randomCircles = [];

    for (let i = 0; i < 80; i++) {
      const size = 10 + Math.random() * 80;
      const x = Math.random() * this.benchmarkEngine.width;
      const y = Math.random() * (this.benchmarkEngine.height - size);

      const circle = new ex.Circle({
        x: x,
        y: y,
        radius: size,
        color:
          this.benchmarkEngine.type === 'stroke'
            ? ex.Color.Transparent
            : ex.Color.fromRGB(255, 255, 255),
        strokeColor:
          this.benchmarkEngine.type === 'stroke'
            ? ex.Color.fromRGB(255, 255, 255)
            : ex.Color.fromRGB(0, 0, 0),
        strokeWidth: this.benchmarkEngine.type === 'stroke' ? 1 : undefined,
      });
      randomCircles.push(circle);
    }
    for (let i = 0; i < this.benchmarkEngine.count; i++) {
      const size = 10 + Math.random() * 80;
      const x = Math.random() * this.benchmarkEngine.width;
      const y = Math.random() * (this.benchmarkEngine.height - size);
      const [dx, dy] = [
        3 * Math.random() * rnd[Math.floor(Math.random() * 2)],
        3 * Math.random() * rnd[Math.floor(Math.random() * 2)],
      ];

      this.particles[i] = { x, y, size: size, dx, dy, graphics: null };
      if (this.benchmarkEngine.type === 'sprite') {
        this.particles[i].graphics = sprite;
      } else {
        this.particles[i].graphics = random.pickOne(randomCircles);
      }
    }
  }
  onPostUpdate() {
    for (let i = 0; i < this.benchmarkEngine.count; i++) {
      const r = this.particles[i];
      r.x -= r.dx;
      r.y -= r.dy;
      if (r.x + r.size < 0) r.dx *= -1;
      else if (r.y + r.size < 0) r.dy *= -1;
      if (r.x > this.engine.screen.drawWidth) r.dx *= -1;
      else if (r.y > this.engine.screen.drawHeight) r.dy *= -1;
    }
    this.benchmarkEngine.fpsmeter.tick();
  }
  onPostDraw(ctx) {
    for (let i = 0; i < this.benchmarkEngine.count; i++) {
      const particle = this.particles[i];
      particle.graphics.draw(ctx, particle.x, particle.y);
    }
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
      physics: false, // this benchmark is only doing drawing
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
