class SiteNavElement extends HTMLElement {
  private popper: HTMLElement | null = null;
  private triggers: NodeListOf<HTMLButtonElement> | null = null;
  private channel: HTMLElement | null = null;
  private items: NodeListOf<HTMLAnchorElement> | null = null;
  private _isOpen = false;
  private _onDocClick: (e: MouseEvent) => void;
  private _onKeyDown: (e: KeyboardEvent) => void;

  constructor() {
    super();
    this._onDocClick = this._handleOutsideClick.bind(this);
    this._onKeyDown = this._handleKeyDown.bind(this);
  }

  connectedCallback() {
    this.popper = this.querySelector('.site-nav__popover');
    this.triggers = this.querySelectorAll<HTMLButtonElement>('.site-nav__explore-btn');
    this.channel = this.querySelector('.site-nav__channel');
    this.items = this.querySelectorAll<HTMLAnchorElement>('.site-nav__item');

    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._onKeyDown);

    this._setActiveFromURL();
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._onKeyDown);
    document.removeEventListener('mousedown', this._onDocClick);
  }

  private _handleClick = (e: Event) => {
    const target = e.target as HTMLElement;
    const trigger = target.closest('.site-nav__explore-btn');
    const item = target.closest('.site-nav__item');

    if (trigger) {
      this._toggle();
    } else if (item) {
      this._close();
    }
  };

  private _handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this._isOpen) {
      this._close();
      const visibleTrigger = this.triggers
        ? Array.from(this.triggers).find(btn => btn.offsetParent !== null)
        : null;
      visibleTrigger?.focus();
    }
  }

  private _toggle() {
    this._isOpen ? this._close() : this._open();
  }

  private _open() {
    if (!this.popper) return;
    this._isOpen = true;
    this.popper.classList.add('is-open');
    this.popper.removeAttribute('aria-hidden');
    this.triggers?.forEach(btn => btn.setAttribute('aria-expanded', 'true'));
    document.addEventListener('mousedown', this._onDocClick);
  }

  private _close() {
    if (!this.popper) return;
    this._isOpen = false;
    this.popper.classList.remove('is-open');
    this.popper.setAttribute('aria-hidden', 'true');
    this.triggers?.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
    document.removeEventListener('mousedown', this._onDocClick);
  }

  private _handleOutsideClick(e: MouseEvent) {
    if (!this.contains(e.target as Node)) {
      this._close();
    }
  }

  private _setActiveFromURL() {
    if (!this.items) return;
    const path = window.location.pathname;
    let hasActive = false;

    this.items.forEach(item => {
      const href = item.getAttribute('href') ?? '';
      const hrefBase = href.replace(/\/$/, '');
      const isActive = hrefBase !== '' && (
        path === hrefBase
        || path === hrefBase + '/'
        || path.startsWith(hrefBase + '/')
      );

      item.classList.toggle('is-active', isActive);

      if (isActive) {
        hasActive = true;
        item.setAttribute('aria-current', 'page');
        const label = item.querySelector('.site-nav__item-label')?.textContent;
        if (label && this.channel) {
          this.channel.textContent = `▸ ${label}`;
        }
      } else {
        item.removeAttribute('aria-current');
      }
    });

    if (!hasActive && this.channel) {
      this.channel.textContent = 'Select section';
    }
  }
}

customElements.define('site-nav', SiteNavElement);
