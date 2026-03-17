class SiteNavElement extends HTMLElement {
  private popover!: HTMLElement;
  private triggers!: NodeListOf<HTMLButtonElement>;
  private channel!: HTMLElement;
  private items!: NodeListOf<HTMLAnchorElement>;
  private _isOpen = false;
  private _onDocClick!: (e: MouseEvent) => void;

  connectedCallback() {
    this.popover = this.querySelector('.site-nav__popover') as HTMLElement;
    this.triggers = this.querySelectorAll<HTMLButtonElement>('.site-nav__explore-btn');
    this.channel = this.querySelector('.site-nav__channel') as HTMLElement;
    this.items = this.querySelectorAll<HTMLAnchorElement>('.site-nav__item');

    this._onDocClick = this._handleOutsideClick.bind(this);

    this.triggers.forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });

    this.items.forEach(item => {
      item.addEventListener('click', () => this.close());
    });

    this._setActiveFromURL();

    this.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this._isOpen) {
        this.close();
        const visibleTrigger = Array.from(this.triggers).find(
          btn => btn.offsetParent !== null
        );
        visibleTrigger?.focus();
      }
    });
  }

  toggle() {
    this._isOpen ? this.close() : this.open();
  }

  open() {
    this._isOpen = true;
    this.popover.classList.add('is-open');
    this.triggers.forEach(btn => btn.setAttribute('aria-expanded', 'true'));
    document.addEventListener('mousedown', this._onDocClick);
  }

  close() {
    this._isOpen = false;
    this.popover.classList.remove('is-open');
    this.triggers.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
    document.removeEventListener('mousedown', this._onDocClick);
  }

  private _handleOutsideClick(e: MouseEvent) {
    if (!this.contains(e.target as Node)) {
      this.close();
    }
  }

  private _setActiveFromURL() {
    const path = window.location.pathname;

    this.items.forEach(item => {
      const href = item.getAttribute('href') ?? '';
      // Normalize: strip trailing slash for comparison
      const hrefBase = href.replace(/\/$/, '');
      const isActive = path === hrefBase
        || path === hrefBase + '/'
        || path.startsWith(hrefBase + '/');

      item.classList.toggle('is-active', isActive);

      if (isActive) {
        item.setAttribute('aria-current', 'page');
        const label = item.querySelector('.site-nav__item-label')?.textContent;
        if (label && this.channel) {
          this.channel.textContent = `▸ ${label}`;
        }
      } else {
        item.removeAttribute('aria-current');
      }
    });
  }
}

customElements.define('site-nav', SiteNavElement);
