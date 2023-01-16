import Two from 'two.js';
import Engine from './engine.js';

class TwoEngine extends Engine {
  constructor() {
    super();
  }
  init() {
    super.init();

    // Clear the canvas
    this.canvas.innerHTML = '';
    window.cancelAnimationFrame(this.request);

    const main = document.querySelector('main');
    main.removeChild(main.lastElementChild);
    if (this.two) {
      this.two.unbind('update');
      this.two.clear();
    }
    this.two = new Two({
      type: Two.Types['webgl'],
      width: this.width,
      height: this.height,
      autostart: true,
    }).appendTo(main);

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
        circle = new Two.Sprite('/sprite.png', x, y, 1, 1);
        this.two.add(circle);
      } else {
        circle = this.two.makeCircle(0, 0, size);
        if (this.type === 'stroke') circle.noFill().stroke = '#ffffff';
        else if (this.type === 'fill') circle.stroke = '#000000';
      }
      circle.position.set(0, 0);
      particles[i] = { x, y, size: size, dx, dy, el: circle };
    }
    this.particles = particles;
  }
  render() {
    this.two.bind('update', () => {
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
        r.el.translation.set(r.x, r.y);
      }
      this.fpsmeter.tick();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const engine = new TwoEngine();
  engine.render();
});
