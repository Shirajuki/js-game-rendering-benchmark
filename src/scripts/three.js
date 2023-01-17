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
    const meshMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.FrontSide,
      depthTest: false,
    });
    let lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    if (this.type === 'fill')
      lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });

    // Sprite texture
    const map = new THREE.TextureLoader().load('sprite.png');
    const material = new THREE.SpriteMaterial({ map: map });

    for (let i = 0; i < this.count; i++) {
      const size = 10 + Math.random() * 80;
      const x = Math.random() * this.width;
      const y = Math.random() * (this.height - size);
      const [dx, dy] = [
        3 * Math.random() * rnd[Math.floor(Math.random() * 2)],
        3 * Math.random() * rnd[Math.floor(Math.random() * 2)],
      ];

      const geometry = new THREE.CircleGeometry(size);
      let line, plane;
      if (this.type === 'sprite') {
        line = new THREE.Sprite(material);
        line.scale.x = 64;
        line.scale.y = 64;
      } else {
        if (this.type === 'fill') {
          plane = new THREE.Mesh(geometry, meshMaterial);
          plane.position.set(x, y, 0);
          this.scene.add(plane);
        }
        const edges = new THREE.EdgesGeometry(geometry);
        line = new THREE.LineSegments(edges, lineMaterial);
      }
      line.position.set(x, y, 0);
      this.scene.add(line);
      particles[i] = { x, y, size: size, dx, dy, el: [line, plane] };
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

      r.el[0].position.x = r.x;
      r.el[0].position.y = r.y;
      if (r.el[1]) {
        r.el[1].position.x = r.x;
        r.el[1].position.y = r.y;
      }
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
