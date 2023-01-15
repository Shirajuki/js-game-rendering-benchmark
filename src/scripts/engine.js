import 'fpsmeter';

const getCount = (search) =>
  search
    .substring(1)
    .split('&')
    .filter((s) => s.startsWith('count='))
    .map((s) => parseInt(s.split('=')[1]))[0];

const getType = (search) =>
  search
    .substring(1)
    .split('&')
    .filter((s) => s.startsWith('type='))
    .map((s) => s.split('=')[1])[0];

class Engine {
  constructor() {
    this.canvas = document.querySelector('#canvas');
    this.fpsContainer = document.querySelector('.fps-container');
    this.countLinks = document.querySelectorAll('.count-container a');
    this.typeLinks = document.querySelectorAll('.options-container a');
    canvas.width = 1024;
    canvas.height = 480;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.count = 0;

    this.initCountLink();
    this.initTypeLink();
    this.init();
  }

  initFpsmeter() {
    this.fpsContainer.innerHTML = '';
    this.fpsmeter = new window.FPSMeter(this.fpsContainer, {
      top: 0,
      left: 0,
      heat: 1,
      theme: 'dark',
      graph: 1,
      history: 25,
      transform: 'translateY(-50%)',
    });
  }

  initCountLink() {
    const toggleCountLinks = (count) => {
      this.countLinks.forEach((link) => {
        link.classList.toggle('active', false);
      });
      const link = [...this.countLinks].filter((l) => l.innerText == count)[0];
      if (link) {
        link.classList.toggle('active', true);
        this.count = count;
      } else
        this.countLinks[this.countLinks.length - 1].classList.toggle(
          'active',
          true
        );
    };
    const { search, pathname } = window.location;
    const count = getCount(search);
    this.count = count || 1000;
    toggleCountLinks(this.count);
    this.countLinks.forEach((link, _index) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const count = parseInt(link.innerText);
        const type = getType(search);
        if (count) {
          if (type)
            window.history.replaceState(
              {},
              pathname,
              `?count=${count}&type=${type}`
            );
          else window.history.replaceState({}, pathname, `?count=${count}`);
          toggleCountLinks(count);
          this.init();
          this.render();
        }
      });
    });
  }

  initTypeLink() {
    const toggleTypeLinks = (type) => {
      this.typeLinks.forEach((link) => {
        link.classList.toggle('active', false);
      });
      const link = [...this.typeLinks].filter(
        (l) => l.innerText.toLowerCase() == type
      )[0];
      if (link) {
        link.classList.toggle('active', true);
        this.type = type;
      } else
        this.typeLinks[this.typeLinks.length - 1].classList.toggle(
          'active',
          true
        );
    };
    const { search, pathname } = window.location;
    const type = getType(search);
    this.type = ['stroke', 'fill', 'sprite'].includes(type)
      ? type
      : null || 'stroke';
    toggleTypeLinks(this.type);
    this.typeLinks.forEach((link, _index) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const type = link.innerText.toLowerCase();
        const count = getCount(search);
        if (type) {
          if (count)
            window.history.replaceState(
              {},
              pathname,
              `?count=${count}&type=${type}`
            );
          else window.history.replaceState({}, pathname, `?type=${type}`);
          toggleTypeLinks(type);
          this.init();
          this.render();
        }
      });
    });
  }

  initNavLink() {
    const navLinks = document.querySelectorAll('header > nav > a');
    const { search, pathname } = window.location;

    [...navLinks].forEach((ml) => {
      if (ml.pathname === pathname) ml.classList.add('active');
      ml.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const count = getCount(search);
        const type = getType(search);
        let href = count ? `${ml.pathname}?count=${count}` : ml.pathname;
        if (type) href += `${count ? '&' : ''}type=${type}`;
        window.location.href = href;
      });
    });
  }

  init() {
    this.initFpsmeter();
    this.initNavLink();
  }

  render() {}
}

export default Engine;
