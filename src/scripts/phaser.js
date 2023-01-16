import * as Phaser from 'phaser';
import Engine from './engine.js';

const scene = (engine) => {
  return {
    preload() {
      this.load.image('sprite', 'sprite.png');
    },
    create() {
      for (let i = 0; i < engine.count; i++) {
        const r = engine.particles[i];
        let particle;
        if (engine.type === 'sprite') {
          particle = this.add.sprite(r.x, r.y, 'sprite');
        } else {
          particle = this.add.circle(r.x, r.y, r.size, 0xffffff);
          if (engine.type === 'stroke') {
            particle.setStrokeStyle(1, 0xffffff);
            particle.isFilled = false;
          } else if (engine.type === 'fill')
            particle.setStrokeStyle(1, 0x000000);
        }

        engine.particles[i].el = particle;
      }
    },
    update(_time, _delta) {
      // Particle animation
      const particles = engine.particles;
      for (let i = 0; i < engine.count; i++) {
        const r = particles[i];
        r.x -= r.dx;
        r.y -= r.dy;
        if (r.x + r.size < 0) r.dx *= -1;
        else if (r.y + r.size < 0) r.dy *= -1;
        if (r.x > engine.width) r.dx *= -1;
        else if (r.y > engine.height) r.dy *= -1;
        if (r.el) {
          r.el.x = r.x;
          r.el.y = r.y;
        }
      }
      engine.fpsmeter.tick();
    },
  };
};

class CanvasEngine extends Engine {
  constructor() {
    super();
  }
  init() {
    super.init();

    // Clear the canvas
    this.canvas.innerHTML = '';
    window.cancelAnimationFrame(this.request);

    // Configure phaser with custom scene
    this.config = {
      type: Phaser.WEBGL,
      width: this.width,
      height: this.height,
      canvas,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false,
          fps: 60,
        },
      },
      backgroundColor: '#1a1a1a',
      scene: [scene(this)],
      render: { pixelArt: false, antialias: true },
    };

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
    if (this.game) this.game.destroy(false, false);
    this.game = new Phaser.Game(this.config);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const engine = new CanvasEngine();
  engine.render();
});
