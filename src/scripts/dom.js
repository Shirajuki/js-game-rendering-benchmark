import Engine from "./engine.js";

class CanvasEngine extends Engine {
	constructor() {
		super();
	}
	init() {
		super.init();

		// Clear the canvas
		this.canvas.innerHTML = "";
		window.cancelAnimationFrame(this.request);

		// Particle creation
		const particles = new Array(this.count);
		for (let i = 0; i < this.count; i++) {
			const size = 10 + Math.random() * 100;
			const x = Math.random() * this.width;
			const y = Math.random() * (this.height - size);
			const [dx, dy] = [2 + Math.random(), 2 + Math.random()];

			const particle = document.createElement("div");
			particle.className = "particle";
			particle.style.left = x + "px";
			particle.style.top = y + "px";
			particle.style.width = size + "px";
			particle.style.height = size + "px";
			this.canvas.appendChild(particle);
			particles[i] = { x, y, size: size, dx, dy, el: particle };
		}
		this.particles = particles;
	}
	render() {
		const particles = this.particles;
		for (let i = 0; i < this.count; i++) {
			const r = particles[i];
			r.x -= r.dx;
			r.y -= r.dy;
			if (r.x + r.size < 0) r.x = this.width + r.size;
			else if (r.y + r.size < 0) r.y = this.height + r.size;
			r.el.style.left = r.x + "px";
			r.el.style.top = r.y + "px";
		}
		this.fpsmeter.tick();
		this.request = window.requestAnimationFrame(() => this.render());
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const engine = new CanvasEngine();
	engine.render();
});
