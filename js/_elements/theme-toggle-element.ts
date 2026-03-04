class ThemeToggleElement extends HTMLElement {
  private static STORAGE_KEY = 'hipsterbrown-theme';

  connectedCallback() {
    const stored = localStorage.getItem(ThemeToggleElement.STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored ?? (prefersDark ? 'dark' : 'light');
    this.applyTheme(theme);

    this.addEventListener('click', () => {
      const current = document.documentElement.dataset.theme ?? 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      this.applyTheme(next);
      localStorage.setItem(ThemeToggleElement.STORAGE_KEY, next);
    });
  }

  private applyTheme(theme: string) {
    document.documentElement.dataset.theme = theme;
    this.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    this.dataset.currentTheme = theme;
    this.textContent = theme === 'dark' ? '☾' : '☀';
  }
}

customElements.define('theme-toggle', ThemeToggleElement);
