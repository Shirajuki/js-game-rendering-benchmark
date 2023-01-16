import Hilo from 'hilojs';
import Engine from './engine.js';

class HiloEngine extends Engine {
  constructor() {
    super();
  }
  init() {
    const GraphicScene = Hilo.Class.create({
      Extends: Hilo.Container,
      constructor: function (properties) {
        GraphicScene.superclass.constructor.call(this, properties);
        this.init(properties);
      },
      init: function (_properties) {
        return;
      },
      onUpdate: function (_properties) {
        if (!this.engine) return;
        // Particle animation
        const particles = this.engine.particles;
        for (let i = 0; i < this.engine.count; i++) {
          const r = particles[i];
          r.x -= r.dx;
          r.y -= r.dy;
          if (r.x + r.size < 0) r.dx *= -1;
          else if (r.y + r.size < 0) r.dy *= -1;
          if (r.x > this.engine.width) r.dx *= -1;
          else if (r.y > this.engine.height) r.dy *= -1;
          r.el.x = r.x;
          r.el.y = r.y;
        }

        this.engine.fpsmeter.tick();
      },
      loadEngine: function (engine) {
        this.engine = engine;
      },
    });

    super.init();

    if (this.ticker) this.ticker.stop();

    // Clear the canvas
    this.canvas.innerHTML = '';
    window.cancelAnimationFrame(this.request);
    const main = document.querySelector('main');
    main.removeChild(main.lastElementChild);

    // Init stage and scene
    this.stage = new Hilo.Stage({
      renderType: 'canvas',
      container: main,
      width: this.width,
      height: this.height,
    });
    this.graphicScene = new GraphicScene({
      width: this.width,
      height: this.height,
      engine: this,
    }).addTo(this.stage);
    this.graphicScene.loadEngine(this);

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
      let circle;
      if (this.type === 'sprite') {
        circle = new Hilo.Bitmap({
          image: 'sprite.png',
        }).addTo(this.graphicScene);
      } else {
        circle = new Hilo.Graphics({
          width: size * 2,
          height: size * 2,
          x: x,
          y: y,
        });
        if (this.type === 'stroke')
          circle
            .lineStyle(1, '#ffffff')
            .drawCircle(1, 1, size - 1)
            .closePath()
            .endFill()
            .addTo(this.graphicScene);
        else if (this.type === 'fill')
          circle
            .beginFill('#fff')
            .lineStyle(1, '#000000')
            .drawCircle(1, 1, size - 1)
            .closePath()
            .endFill()
            .addTo(this.graphicScene);
      }
      particles[i] = { x, y, size: size, dx, dy, el: circle };
    }
    this.particles = particles;
  }
  render() {
    // Start game loop
    this.ticker = new Hilo.Ticker(60);
    this.ticker.addTick(this.stage);
    this.ticker.start();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const engine = new HiloEngine();
  engine.render();
});
