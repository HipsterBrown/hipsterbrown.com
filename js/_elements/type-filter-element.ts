class TypeFilterElement extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest('[data-filter]');
      if (!btn) return;
      const filter = (btn as HTMLElement).dataset.filter!;
      this.querySelectorAll('[data-filter]').forEach(b => b.removeAttribute('aria-current'));
      btn.setAttribute('aria-current', 'true');
      const list = document.querySelector('[data-post-list]');
      if (!list) return;
      list.querySelectorAll('[data-post-type]').forEach(item => {
        const el = item as HTMLElement;
        el.hidden = filter !== 'all' && el.dataset.postType !== filter;
      });
    });
  }
}

customElements.define('type-filter', TypeFilterElement);
