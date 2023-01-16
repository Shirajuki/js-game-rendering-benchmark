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

    var light0 = new BABYLON.HemisphericLight(
      'Hemi0',
      new BABYLON.Vector3(0, 0, 0),
      this.scene
    );
    light0.diffuse = new BABYLON.Color3(1, 1, 1);
    light0.specular = new BABYLON.Color3(1, 1, 1);
    light0.groundColor = new BABYLON.Color3(1, 1, 1);

    let optimizerOptions = new BABYLON.SceneOptimizerOptions(60, 500);
    optimizerOptions.addOptimization(
      new BABYLON.HardwareScalingOptimization(0, 1)
    );
    // Optimizer
    const optimizer = new BABYLON.SceneOptimizer(this.scene, optimizerOptions);

    // Spritemanager
    const spriteManager = new BABYLON.SpriteManager(
      'textures',
      '/sprite.png',
      1000000,
      { width: 64, height: 64 },
      this.scene
    );

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

      let circle;
      let filled;
      if (this.type === 'sprite') {
        circle = new BABYLON.Sprite('sprite', spriteManager);
        circle.width = 64;
        circle.height = 64;
        circle.angle = Math.PI;
        circle.position.x = -x;
        circle.position.z = -y;
        circle.position.y = -i;
      } else {
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
        circle = BABYLON.MeshBuilder.CreateLines(
          'circle',
          { points: points, updatable: false },
          this.scene
        );
        circle.color = new BABYLON.Color3.White();
        circle.position.x = -x;
        circle.position.z = -y;
        circle.position.y = -i - 1;
        if (this.type === 'fill') {
          const mat = new BABYLON.StandardMaterial('mat1', this.scene);
          mat.alpha = 1;
          mat.diffuseColor = new BABYLON.Color3(1, 1, 1);
          mat.emissiveColor = new BABYLON.Color3.White();
          mat.backFaceCulling = false;
          filled = BABYLON.MeshBuilder.CreateRibbon(
            'filled_circle',
            {
              pathArray: [points],
              closePath: true,
            },
            this.scene
          );
          filled.color = BABYLON.Color3.White();
          filled.material = mat;
          filled.position.x = -x;
          filled.position.z = -y;
          filled.position.y = -i;
          circle.color = new BABYLON.Color3.Black();
        }
      }

      particles[i] = { x, y, size: size, dx, dy, el: [circle, filled] };
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
        r.el[0].position.x = -r.x;
        r.el[0].position.z = -r.y;
        if (r.el[1]) {
          r.el[1].position.x = -r.x;
          r.el[1].position.z = -r.y;
        }
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
