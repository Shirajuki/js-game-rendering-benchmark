import * as pc from 'playcanvas';
import Engine from './engine.js';

class PlayCanvasEngine extends Engine {
  constructor() {
    super();
  }
  init() {
    super.init();

    // Clear the canvas
    this.canvas.innerHTML = '';
    window.cancelAnimationFrame(this.request);

    // create a PlayCanvas application
    this.app = new pc.Application(this.canvas);
    this.app.setCanvasResolution(pc.RESOLUTION_AUTO);

    // create camera entity
    const camera = new pc.Entity('camera');
    camera.addComponent('camera', {
      clearColor: new pc.Color(0.098, 0.098, 0.098),
      fov: 90,
      orthoHeight: 2.0,
    });
    camera.rotateLocal(0, 0, 0);
    camera.translateLocal(0, 0, 0);
    camera.setLocalPosition(0, 0, 240);
    camera.lookAt(pc.Vec3.ZERO);
    this.app.root.addChild(camera);

    // Particle creation
    const particles = new Array(this.count);
    const rnd = [1, -1];
    const circles = {};
    for (let i = 0; i < this.count; i++) {
      const size = 10 + Math.random() * 80;
      const x = Math.random() * this.width;
      const y = Math.random() * (this.height - size);
      const [dx, dy] = [
        3 * Math.random() * rnd[Math.floor(Math.random() * 2)],
        3 * Math.random() * rnd[Math.floor(Math.random() * 2)],
      ];
      let points = [];
      let colors = [];
      if (circles[size]) {
        points = circles[size][0];
        colors = circles[size][1];
      } else {
        const radius = size;
        const step = (2 * Math.PI) / 360;
        const half = { x: this.width / 2, y: this.height / 2 };
        for (let i = -Math.PI; i <= Math.PI; i += Math.PI / 360) {
          points.push(
            new pc.Vec3(
              x - half.x + radius * Math.cos(i),
              -y + half.y + radius * Math.sin(i),
              0
            ),
            new pc.Vec3(
              x - half.x + radius * Math.cos(i + step),
              -y + half.y + radius * Math.sin(i + step),
              0
            )
          );
          colors.push(pc.Color.WHITE, pc.Color.WHITE);
        }
        circles[size] = [points, colors];
      }
      particles[i] = { x, y, size: size, dx, dy, points, colors };
    }
    this.particles = particles;
  }
  render() {
    this.app.on('update', () => {
      // Particle animation
      const particles = this.particles;
      for (let i = 0; i < this.count; i++) {
        const r = particles[i];
        r.x -= r.dx;
        r.y -= r.dy;
        for (let j = 0; j < r.points.length; j++) {
          r.points[j].add(new pc.Vec3(-r.dx, -r.dy, 0));
        }
        if (r.x + r.size < 0) r.dx *= -1;
        else if (r.y + r.size < 0) r.dy *= -1;
        if (r.x > this.width) r.dx *= -1;
        else if (r.y > this.height) r.dy *= -1;
        this.app.drawLines(r.points, r.colors, false);
      }

      this.fpsmeter.tick();
    });

    this.app.start();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const engine = new PlayCanvasEngine();
  engine.render();
});
