import * as THREE from 'three';
import Engine from './engine.js';

class ThreeEngine extends Engine {
  constructor() {
    super();
  }
  init() {
    super.init();

    // Clear the canvas
    this.canvas.innerHTML = '';
    window.cancelAnimationFrame(this.request);

    // Setup application and stage
    this.camera = new THREE.PerspectiveCamera(
      50,
      this.width / this.height,
      0.1,
      2000
    );
    this.camera.position.set(this.width / 2, this.height / 2, 500);
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      depth: false,
      precision: 'lowp',
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.sortObjects = false;
    this.renderer.domElement.classList.add('canvas');

    if (this.scene) this.scene.clear();
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#1a1a1a');

    // Update canvas with renderer view
    const main = document.querySelector('main');
    main.removeChild(main.lastElementChild);
    main.appendChild(this.renderer.domElement);

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

      const geometry = new THREE.CircleGeometry(size);
      const edges = new THREE.EdgesGeometry(geometry);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0xffffff })
      );
      line.position.set(x, y, 0);
      this.scene.add(line);
      particles[i] = { x, y, size: size, dx, dy, el: line };
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

      r.el.position.x = r.x;
      r.el.position.y = r.y;
    }
    this.renderer.render(this.scene, this.camera);

    this.fpsmeter.tick();
    this.request = window.requestAnimationFrame(() => this.render());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const engine = new ThreeEngine();
  engine.render();
});
