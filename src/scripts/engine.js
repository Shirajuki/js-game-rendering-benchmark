import "fpsmeter";
class Engine {
	constructor() {
		this.canvas = document.querySelector("#canvas");
		this.fpsContainer = document.querySelector(".fps-container");
		this.countLinks = document.querySelectorAll(".count-container a");
		canvas.width = 1024;
		canvas.height = 480;
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.count = 0;

		this.init();
	}

	initFpsmeter() {
		this.fpsmeter = new window.FPSMeter(this.fpsContainer, {
			top: 0,
			left: 0,
			heat: 1,
			theme: "dark",
			graph: 1,
			history: 25,
			transform: "translateY(-50%)",
		});
	}

	initCountLink() {
		const toggleLinks = (count) => {
			this.countLinks.forEach((link) => {
				link.classList.toggle("active", false);
			});
			const link = [...this.countLinks].filter((l) => l.innerText == count)[0];
			if (link) {
				link.classList.toggle("active", true);
				this.count = count;
			} else
				this.countLinks[this.countLinks.length - 1].classList.toggle(
					"active",
					true
				);
		};
		const { search, pathname } = window.location;

		const count = search
			.substring(1)
			.split("&")
			.filter((s) => s.startsWith("count="))
			.map((s) => parseInt(s.split("=")[1]))[0];
		this.count = count || 1000;
		toggleLinks(this.count);
		this.countLinks.forEach((link, _index) => {
			link.addEventListener("click", (event) => {
				event.preventDefault();
				event.stopPropagation();
				const count = parseInt(link.innerText);
				if (!count) {
					console.log(""); // TODO
					toggleLinks(count);
				} else {
					window.history.replaceState({}, pathname, `?count=${count}`);
					toggleLinks(count);
					this.init();
					this.render();
				}
			});
		});
	}

	initNavLink() {
		const navLinks = document.querySelectorAll("header > nav > a");
		const { pathname } = window.location;

		[...navLinks].forEach((ml) => {
			if (ml.pathname === pathname) ml.classList.add("active");
		});
	}

	init() {
		this.initFpsmeter();
		this.initCountLink();
		this.initNavLink();
	}

	render() {}
}

export default Engine;
