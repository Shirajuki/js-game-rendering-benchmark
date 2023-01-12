import Engine from './engine.js';

class DOMEngine extends Engine {
  constructor() {
    super();
  }
  init() {
    super.init();

    // Clear the canvas
    this.canvas.innerHTML = '';
    window.cancelAnimationFrame(this.request);

    // Particle creation
    const particles = new Array(this.count);
    const rnd = [1, -1];
    for (let i = 0; i < this.count; i++) {
      const size = 10 + Math.random() * 80 * 2;
      const x = Math.random() * this.width;
      const y = Math.random() * (this.height - size);
      const [dx, dy] = [
        3 * Math.random() * rnd[Math.floor(Math.random() * 2)],
        3 * Math.random() * rnd[Math.floor(Math.random() * 2)],
      ];

      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      this.canvas.appendChild(particle);
      particles[i] = { x, y, size: size, dx, dy, el: particle };
    }
    this.particles = particles;
  }
  render() {
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
      r.el.style.left = r.x + 'px';
      r.el.style.top = r.y + 'px';
    }

    this.fpsmeter.tick();
    this.request = window.requestAnimationFrame(() => this.render());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const engine = new DOMEngine();
  engine.render();
});
