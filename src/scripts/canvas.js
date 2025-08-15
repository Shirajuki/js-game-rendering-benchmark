import Engine from './engine.js';

class CanvasEngine extends Engine {
  init() {
    super.init();

    // Clear the canvas
    this.canvas.innerHTML = '';
    window.cancelAnimationFrame(this.request);

    if (this.type === 'sprite') {
      this.sprite = new Image();
      this.sprite.src = 'sprite.png';
    }

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

    this.ctx = this.canvas.getContext('2d');
    this.ctx.strokeStyle = this.type === 'stroke' ? 'white' : 'black';
    if (this.type === 'fill') this.ctx.fillStyle = 'white';
    this.ctx.lineWidth = 1;
  }
  render() {
    // Clear the canvas
    this.ctx.clearRect(0, 0, this.width, this.height);

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
      if (this.type === 'sprite') {
        if (this.sprite.complete) {
          this.ctx.beginPath();
          this.ctx.drawImage(this.sprite, r.x, r.y);
        }
      } else {
        this.ctx.beginPath();
        this.ctx.arc(r.x, r.y, r.size, 0, 2 * Math.PI);
        if (this.type === 'fill') this.ctx.fill();
        if (this.type !== 'sprite') this.ctx.stroke();
      }
    }

    this.fpsmeter.tick();
    this.request = window.requestAnimationFrame(() => this.render());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const engine = new CanvasEngine();
  engine.render();
});
