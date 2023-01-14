import * as BABYLON from 'babylonjs';
import Engine from './engine.js';

class BabylonEngine extends Engine {
  constructor() {
    super();
  }
  init() {
    super.init();

    // Clear the canvas
    this.canvas.innerHTML = '';
    window.cancelAnimationFrame(this.request);

    // Load the 3D engine
    if (this.engine) this.engine.stopRenderLoop();
    this.engine = new BABYLON.Engine(this.canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    });
    // Create a basic BJS Scene object
    this.scene = new BABYLON.Scene(this.engine);
    this.scene.clearColor = new BABYLON.Color3(0.098, 0.098, 0.098);
    // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
    const camera = new BABYLON.FreeCamera(
      'camera1',
      new BABYLON.Vector3(0, 1, 0),
      this.scene
    );
    // We chose an orthographic view to simplify at most our mesh creation
    camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
    // Setup the camera to fit with our canvas coordinates
    camera.orthoLeft = 0;
    camera.orthoTop = 0;
    camera.orthoRight = this.width;
    camera.orthoBottom = this.height;
    camera.fov = 0.9;
    // Target the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    let optimizerOptions = new BABYLON.SceneOptimizerOptions(60, 500);
    optimizerOptions.addOptimization(
      new BABYLON.HardwareScalingOptimization(0, 1)
    );
    // Optimizer
    const optimizer = new BABYLON.SceneOptimizer(this.scene, optimizerOptions);

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

      // Create circles by drawing lines in a 360 degree radius
      let points = [];
      if (circles[size]) {
        points = circles[size];
      } else {
        const radius = size;
        for (let i = -Math.PI; i <= Math.PI; i += Math.PI / 360) {
          points.push(
            new BABYLON.Vector3(radius * Math.cos(i), 0, radius * Math.sin(i))
          );
        }
        circles[size] = points;
      }
      const circle = BABYLON.MeshBuilder.CreateLines(
        'circle',
        { points: points, updatable: false },
        this.scene
      );
      circle.color = new BABYLON.Color3(1, 1, 1);
      circle.position.x = -x;
      circle.position.z = -y;
      circle.position.y = 0;

      particles[i] = { x, y, size: size, dx, dy, el: circle };
    }
    this.particles = particles;
  }
  render() {
    this.engine.runRenderLoop(() => {
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
        r.el.position.x = -r.x;
        r.el.position.z = -r.y;
      }
      this.scene.render();
      this.fpsmeter.tick();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const engine = new BabylonEngine();
  engine.render();
});
