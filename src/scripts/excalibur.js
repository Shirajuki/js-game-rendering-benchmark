import * as ex from 'excalibur';
import Engine from './engine.js';

const spriteImage = new ex.ImageSource('sprite.png');

const loader = new ex.Loader([spriteImage]);

export class Scene extends ex.Scene {
  onInitialize() {
    this.sprite = spriteImage.toSprite();
  }

  onActivate(ctx) {
    this.engine = ctx.data.engine;

    this.clear();

    // Particle creation
    const particles = Array.from({ length: this.engine.count });
    const rnd = [1, -1];

    const graphicsGroup = new ex.GraphicsGroup({ members: [] });

    for (let i = 0; i < this.engine.count; i++) {
      const size = 10 + Math.random() * 80;
      const x = Math.random() * this.engine.width;
      const y = Math.random() * (this.engine.height - size);
      const [dx, dy] = [
        3 * Math.random() * rnd[Math.floor(Math.random() * 2)],
        3 * Math.random() * rnd[Math.floor(Math.random() * 2)],
      ];

      if (this.engine.type === 'sprite') {
        graphicsGroup.members.push({
          graphic: this.sprite,
          offset: ex.vec(x, y),
        });
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
        graphicsGroup.members.push({
          graphic: circle,
          offset: ex.vec(x, y),
        });
      }

      particles[i] = { x, y, size: size, dx, dy, el: graphicsGroup.members[i] };
    }

    const screenElement = new ex.ScreenElement();

    screenElement.graphics.use(graphicsGroup);

    this.add(screenElement);

    this.particles = particles;
  }

  onPostUpdate(engine) {
    for (let i = 0; i < this.engine.count; i++) {
      const r = this.particles[i];
      r.x -= r.dx;
      r.y -= r.dy;
      if (r.x + r.size < 0) r.dx *= -1;
      else if (r.y + r.size < 0) r.dy *= -1;
      if (r.x > engine.screen.drawWidth) r.dx *= -1;
      else if (r.y > engine.screen.drawHeight) r.dy *= -1;
      r.el.offset.setTo(r.x, r.y);
    }

    this.engine.fpsmeter.tick();
  }
}

class ExcaliburEngine extends Engine {
  init() {
    super.init();

    window.cancelAnimationFrame(this.request);
    if (this.game) {
      this.game.dispose();
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'canvas';
      this.canvas.className = 'canvas';
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      document.querySelector('main').appendChild(this.canvas);
    }

    const game = new ex.Engine({
      width: this.width,
      height: this.height,
      canvasElement: this.canvas,
      backgroundColor: ex.Color.fromRGB(26, 26, 26),
      suppressPlayButton: true,
      physics: { enabled: false },
      scenes: { scene: Scene },
    });
    this.game = game;
  }
  render() {
    this.game.start(loader).then(() => {
      this.game.goToScene('scene', { sceneActivationData: { engine: this } });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const engine = new ExcaliburEngine();
  engine.render();
});
