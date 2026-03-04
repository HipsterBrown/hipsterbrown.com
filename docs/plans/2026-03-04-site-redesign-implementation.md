# Site Redesign — Phases 1 + 2 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild hipsterbrown.com with a new design system (warm-industrial editorial palette, four-font stack, light/dark mode) and Phase 1+2 content infrastructure on a `redesign` feature branch.

**Architecture:** Design-system-first on a feature branch: tokens → typography → dark mode toggle → homepage → nav/footer/layouts → project page → Training Data section → Quick Notes → RSS feeds → Speaking section. Full SCSS rewrite; no legacy variables retained.

**Tech Stack:** Eleventy v3, Liquid templates, SCSS (PostCSS), TypeScript (esbuild), `eleventy-google-fonts` shortcode for font loading.

**Reference files:**
- Visual spec: `.plans/redesign-theme-example.html` (open in browser to see light/dark PoC)
- Design brief: `.plans/site-redesign-brief.md`
- Design doc: `docs/plans/2026-03-04-site-redesign-design.md`

**Build commands:**
- Dev server: `npm start`
- Production build: `npm run build`
- Output directory: `_site/`

---

## Task 1: Create feature branch

**Files:** none

**Step 1: Create and switch to the redesign branch**

```bash
git checkout -b redesign
```

**Step 2: Verify**

```bash
git branch
```
Expected: `* redesign` is the active branch.

---

## Task 2: Rewrite design tokens

Replace the old Typekit-era CSS variables with the new warm-industrial token set. Light mode on `:root`, dark mode under a media query AND a `[data-theme="dark"]` attribute so the JS toggle works.

**Files:**
- Modify: `sass/_theme.scss`

**Step 1: Replace `sass/_theme.scss` entirely**

```scss
:root {
  // ── Palette — Light Mode ──────────────────────────────
  --bg:       #F7F3EC;
  --bg2:      #EDE8DF;
  --bg3:      #E4DDD2;
  --surface:  #DDD6C9;
  --border:   rgba(26, 21, 16, 0.10);
  --border2:  rgba(26, 21, 16, 0.06);
  --ink:      #1A1510;
  --green:    #2D6A4F;
  --brick:    #C24D2C;
  --amber:    #8B6914;
  --text-1:   #1A1510;
  --text-2:   #5A5248;
  --text-3:   #9A9088;

  // ── Typography ────────────────────────────────────────
  --font-display: 'Syne', sans-serif;
  --font-serif:   'Instrument Serif', serif;
  --font-body:    'Epilogue', sans-serif;
  --font-mono:    'IBM Plex Mono', monospace;

  // ── Sizing ────────────────────────────────────────────
  --nav-height:        64px;
  --base-border-radius: 4px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg:       #161210;
    --bg2:      #1E1916;
    --bg3:      #26201C;
    --surface:  #2E2822;
    --border:   rgba(240, 230, 215, 0.08);
    --border2:  rgba(240, 230, 215, 0.05);
    --ink:      #F0EBE3;
    --green:    #4DB87A;
    --brick:    #E8673C;
    --amber:    #C9A84C;
    --text-1:   #F0EBE3;
    --text-2:   #9A8F85;
    --text-3:   #5A524A;
  }
}

[data-theme="dark"] {
  --bg:       #161210;
  --bg2:      #1E1916;
  --bg3:      #26201C;
  --surface:  #2E2822;
  --border:   rgba(240, 230, 215, 0.08);
  --border2:  rgba(240, 230, 215, 0.05);
  --ink:      #F0EBE3;
  --green:    #4DB87A;
  --brick:    #E8673C;
  --amber:    #C9A84C;
  --text-1:   #F0EBE3;
  --text-2:   #9A8F85;
  --text-3:   #5A524A;
}

[data-theme="light"] {
  --bg:       #F7F3EC;
  --bg2:      #EDE8DF;
  --bg3:      #E4DDD2;
  --surface:  #DDD6C9;
  --border:   rgba(26, 21, 16, 0.10);
  --border2:  rgba(26, 21, 16, 0.06);
  --ink:      #1A1510;
  --green:    #2D6A4F;
  --brick:    #C24D2C;
  --amber:    #8B6914;
  --text-1:   #1A1510;
  --text-2:   #5A5248;
  --text-3:   #9A9088;
}
```

**Step 2: Run build to verify no SCSS errors**

```bash
npm run build
```
Expected: exits 0, `_site/sass/app.css` is generated.

**Step 3: Commit**

```bash
git add sass/_theme.scss
git commit -m "feat: replace design tokens with new warm-industrial palette"
```

---

## Task 3: Rewrite typography SCSS

**Files:**
- Modify: `sass/_typography.scss`

**Step 1: Replace `sass/_typography.scss` entirely**

```scss
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  font-size: 16px;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-1);
  background: var(--bg);
  margin: 0;
  padding: 0;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-serif);
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--text-1);
  margin: 0 0 0.5em;
}

h1 { font-size: clamp(2rem, 4vw, 3.5rem); }
h2 { font-size: clamp(1.5rem, 3vw, 2.25rem); }
h3 { font-size: 1.375rem; }
h4 { font-size: 1.125rem; }

p {
  color: var(--text-2);
  margin: 0 0 1em;
}

a {
  color: var(--brick);
  text-decoration: none;

  &:hover { text-decoration: underline; }
  &:focus-visible { outline: 2px solid var(--green); outline-offset: 2px; }
}

code, pre {
  font-family: var(--font-mono);
  font-size: 0.875em;
}

pre {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--base-border-radius);
  padding: 1rem;
  overflow-x: auto;
}

// Display style (section labels, nav logo)
.display {
  font-family: var(--font-display);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -0.03em;
}

// Mono style (metadata, dates, tags)
.mono {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}
```

**Step 2: Run build**

```bash
npm run build
```
Expected: exits 0.

**Step 3: Commit**

```bash
git add sass/_typography.scss
git commit -m "feat: rewrite typography with new four-font stack"
```

---

## Task 4: Update Google Fonts shortcode in header

Remove the Typekit script and the conditional Playfair Display shortcode. Load all four new families globally.

**Files:**
- Modify: `_includes/header.html`

**Step 1: In `_includes/header.html`, replace the Typekit script block and the conditional Google Fonts shortcode**

Remove these lines:
```html
  <!-- Typekit -->
  <script type="text/javascript" src="https://use.typekit.net/vrt0cty.js"></script>
  <script type="text/javascript">
    try {
      Typekit.load();
    } catch (e) { }
  </script>
  {% if page.url == "/" %}
  {% eleventyGoogleFonts "https://fonts.googleapis.com/css?family=Playfair+Display:900&display=swap" %}
  {% endif %}
```

Replace with:
```html
  {% eleventyGoogleFonts "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;1,400&family=Syne:wght@400;600;700;800&family=Instrument+Serif:ital@0;1&family=Epilogue:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" %}
```

**Step 2: Run build**

```bash
npm run build
```
Expected: exits 0, fonts are inlined into the built HTML.

**Step 3: Commit**

```bash
git add _includes/header.html
git commit -m "feat: replace Typekit with Google Fonts shortcode for new type stack"
```

---

## Task 5: Dark mode toggle web component

A minimal web component that reads `prefers-color-scheme`, persists the user's override to `localStorage`, and sets `data-theme` on `<html>`.

**Files:**
- Create: `js/_elements/theme-toggle-element.ts`
- Modify: `js/app.ts`

**Step 1: Create `js/_elements/theme-toggle-element.ts`**

```typescript
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
  }
}

customElements.define('theme-toggle', ThemeToggleElement);
```

**Step 2: Register the element in `js/app.ts`**

Add this import at the top of `js/app.ts`:
```typescript
import './_elements/theme-toggle-element';
```

**Step 3: Run build**

```bash
npm run build
```
Expected: exits 0, `_site/assets/app.js` is generated.

**Step 4: Commit**

```bash
git add js/_elements/theme-toggle-element.ts js/app.ts
git commit -m "feat: add theme-toggle web component for light/dark mode"
```

---

## Task 6: Rewrite component SCSS files

Replace the old component styles with new token-based equivalents. Do this file by file.

**Files:**
- Modify: `sass/components/_globals.scss`
- Modify: `sass/components/_nav.scss`
- Modify: `sass/components/_header.scss`
- Modify: `sass/components/_footer.scss`
- Modify: `sass/components/_grid.scss`
- Modify: `sass/components/_content.scss`
- Modify: `sass/components/_animations.scss`
- Modify: `sass/_lists.scss`

**Step 1: Replace `sass/components/_globals.scss`**

```scss
.visually-hidden:not(:focus):not(:active) {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

a.skip-main {
  left: -999px;
  position: absolute;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  z-index: -999;

  &:focus {
    left: auto;
    top: auto;
    width: 30%;
    height: auto;
    overflow: auto;
    margin: 0 35%;
    padding: 5px;
    font-size: 20px;
    outline: 3px solid var(--green);
    text-align: center;
    z-index: 999;
  }
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 48px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
}
```

**Step 2: Replace `sass/components/_nav.scss`**

```scss
.site-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  height: var(--nav-height);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  background: var(--bg);
  z-index: 100;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
}

.site-logo {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 800;
  color: var(--text-1);
  letter-spacing: -0.03em;
  text-transform: uppercase;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 28px;
  list-style: none;
  align-items: center;
  margin: 0;
  padding: 0;

  a {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.05em;
    color: var(--text-2);
    text-decoration: none;
    transition: color 0.2s;

    &:hover { color: var(--green); }
  }

  .nav-active a { color: var(--text-1); }
}

theme-toggle {
  width: 32px;
  height: 18px;
  border-radius: 9px;
  border: 1.5px solid var(--border);
  background: var(--bg3);
  cursor: pointer;
  position: relative;
  display: block;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 3px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--text-3);
    transition: all 0.3s;
  }

  &[data-current-theme="dark"]::after {
    left: calc(100% - 13px);
    background: var(--amber);
  }
}
```

**Step 3: Replace `sass/components/_header.scss`**

```scss
.page-hero {
  padding: 60px 48px 52px;
  border-bottom: 1px solid var(--border);

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
}

.post-header {
  padding: 40px 48px 32px;
  border-bottom: 1px solid var(--border);

  @media (max-width: 768px) {
    padding: 24px 20px;
  }
}

.post-type-badge {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 3px 9px;
  border-radius: 20px;
  margin-bottom: 16px;

  &.type-long-form  { background: color-mix(in srgb, var(--green) 12%, transparent); color: var(--green); }
  &.type-til        { background: color-mix(in srgb, var(--green) 12%, transparent); color: var(--green); }
  &.type-link       { background: color-mix(in srgb, var(--brick) 12%, transparent); color: var(--brick); }
  &.type-note       { background: color-mix(in srgb, var(--brick) 12%, transparent); color: var(--brick); }
  &.type-talk       { background: color-mix(in srgb, var(--amber) 12%, transparent); color: var(--amber); }
}
```

**Step 4: Replace `sass/components/_footer.scss`**

```scss
.site-footer {
  padding: 24px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--border);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    padding: 24px 20px;
    text-align: center;
  }
}

.footer-logo {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  color: var(--text-3);
  text-decoration: none;
}

.footer-links {
  display: flex;
  gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;

  a {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.05em;
    color: var(--text-3);
    text-decoration: none;
    transition: color 0.2s;

    &:hover { color: var(--text-1); }
  }
}

.footer-copy {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-3);
}
```

**Step 5: Replace `sass/components/_grid.scss`**

```scss
.content-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  border-bottom: 1px solid var(--border);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.main-col {
  padding: 40px 48px;
  border-right: 1px solid var(--border);

  @media (max-width: 900px) {
    border-right: none;
    padding: 32px 20px;
  }
}

.side-col {
  padding: 40px 28px;
  background: var(--bg2);

  @media (max-width: 900px) {
    padding: 32px 20px;
  }
}

.sec-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
}

.sec-title {
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-3);
  white-space: nowrap;
}

.sec-rule {
  flex: 1;
  height: 1px;
  background: var(--border);
}

.sec-all {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-3);
  white-space: nowrap;
  transition: color 0.2s;
  text-decoration: none;

  &:hover { color: var(--green); }
}
```

**Step 6: Replace `sass/components/_content.scss`**

```scss
// ── Post list ──────────────────────────────────────────

.post-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.post-item {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  padding: 20px 0;
  border-bottom: 1px solid var(--border2);
  align-items: start;
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  &:last-child { border-bottom: none; }

  &:hover .post-title { color: var(--green); }
}

.post-cat {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--green);
  margin-bottom: 6px;

  &.cat-link, &.cat-note  { color: var(--brick); }
  &.cat-talk              { color: var(--amber); }
  &.cat-til               { color: var(--green); }
}

.post-title {
  font-family: var(--font-serif);
  font-size: 19px;
  color: var(--text-1);
  line-height: 1.3;
  letter-spacing: -0.01em;
  margin-bottom: 5px;
  transition: color 0.2s;
}

.post-summary {
  font-family: var(--font-body);
  font-size: 12px;
  color: var(--text-2);
  line-height: 1.55;
}

.post-date {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-3);
  white-space: nowrap;
  padding-top: 2px;
}

// ── Note cards (Quick Notes sidebar) ──────────────────

.note-card {
  padding: 12px 14px;
  background: var(--bg);
  border-radius: 4px;
  border-left: 2px solid var(--green);
  margin-bottom: 10px;

  &.note-link    { border-left-color: var(--brick); }
  &.note-note    { border-left-color: var(--brick); }
  &.note-thought { border-left-color: var(--amber); }
}

.note-type {
  font-family: var(--font-mono);
  font-size: 8px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-3);
  margin-bottom: 5px;
}

.note-title {
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 600;
  color: var(--text-1);
  letter-spacing: -0.02em;
  margin-bottom: 4px;
}

.note-body {
  font-family: var(--font-body);
  font-size: 12px;
  line-height: 1.5;
  color: var(--text-2);
}

.note-meta {
  font-family: var(--font-mono);
  font-size: 9px;
  color: var(--text-3);
  margin-top: 6px;
}

// ── Badges ────────────────────────────────────────────

.badge {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.06em;
  padding: 3px 9px;
  border-radius: 20px;

  &.badge-building  { background: color-mix(in srgb, var(--green) 12%, transparent); color: var(--green); }
  &.badge-wip       { background: color-mix(in srgb, var(--brick) 12%, transparent); color: var(--brick); }
  &.badge-ongoing   { background: color-mix(in srgb, var(--amber) 12%, transparent); color: var(--amber); }
}

// ── Stack pills (projects) ────────────────────────────

.stack-pill {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.04em;
  padding: 3px 10px;
  border-radius: 20px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-2);
  margin: 2px 2px 2px 0;
}

// ── Article prose ─────────────────────────────────────

.prose {
  max-width: 680px;

  h1, h2, h3, h4 { margin-top: 2em; }
  p + p { margin-top: 0; }

  blockquote {
    border-left: 3px solid var(--green);
    padding-left: 1rem;
    margin-left: 0;
    color: var(--text-2);
    font-style: italic;
  }

  img {
    max-width: 100%;
    border-radius: var(--base-border-radius);
  }

  hr {
    border: none;
    border-top: 1px solid var(--border);
    margin: 2rem 0;
  }
}
```

**Step 7: Replace `sass/components/_animations.scss`**

```scss
@keyframes pulsate {
  0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--green) 50%, transparent); }
  50%       { box-shadow: 0 0 0 5px color-mix(in srgb, var(--green) 0%, transparent); }
}

.live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--green);
  flex-shrink: 0;
  animation: pulsate 2.4s ease-in-out infinite;
}
```

**Step 8: Replace `sass/_lists.scss`**

```scss
ul, ol {
  padding-left: 1.5rem;
  color: var(--text-2);

  li { margin-bottom: 0.25em; }
}
```

**Step 9: Run build**

```bash
npm run build
```
Expected: exits 0.

**Step 10: Commit**

```bash
git add sass/
git commit -m "feat: rewrite component SCSS with new design system tokens"
```

---

## Task 7: Rewrite shared header and footer includes

**Files:**
- Modify: `_includes/header.html`
- Modify: `_includes/footer.html`

**Step 1: Replace the `<body>` open and nav in `_includes/header.html`**

The file currently ends after `</head>` and opens `<body>`. Replace the entire `<body>` section (starting at `<body>` through the end of the file) with:

```html
<body>
  <a class="skip-main" href="#main" tabindex="0">Skip to main content</a>
  <nav class="site-nav">
    <a href="/" class="site-logo">HipsterBrown</a>
    <ul class="nav-links">
      <li {% if page.url contains '/projects' %}class="nav-active"{% endif %}>
        <a href="/projects/">Projects</a>
      </li>
      <li {% if page.url contains '/training-data' %}class="nav-active"{% endif %}>
        <a href="/training-data/">Training Data</a>
      </li>
      <li {% if page.url contains '/demos' %}class="nav-active"{% endif %}>
        <a href="/demos/">Demos</a>
      </li>
      <li {% if page.url contains '/speaking' %}class="nav-active"{% endif %}>
        <a href="/speaking/">Speaking</a>
      </li>
    </ul>
    <theme-toggle aria-label="Toggle dark mode" role="button" tabindex="0"></theme-toggle>
  </nav>
```

**Step 2: Replace `_includes/footer.html`**

```html
<footer class="site-footer">
  <a href="/" class="footer-logo">HipsterBrown</a>
  <ul class="footer-links">
    <li><a rel="me" href="https://toot.cafe/@hipsterbrown">Mastodon</a></li>
    <li><a href="https://github.com/HipsterBrown">GitHub</a></li>
    <li><a href="/feed.xml">RSS</a></li>
  </ul>
  <span class="footer-copy">© {{ currentYear }} Nick Hehr</span>
</footer>
<script type="text/javascript" src="/assets/app.js" charset="utf-8"></script>
</body>
</html>
```

**Step 3: Run build, then start the dev server and verify nav and footer render correctly**

```bash
npm run build
npm start
```
Open `http://localhost:8080`. Check: logo, nav links, theme toggle button visible. Footer shows Mastodon/GitHub/RSS links and copyright.

**Step 4: Commit**

```bash
git add _includes/header.html _includes/footer.html
git commit -m "feat: rewrite nav and footer with new design system"
```

---

## Task 8: Update default and post layouts

**Files:**
- Modify: `_layouts/default.html`
- Modify: `_layouts/musing.html`
- Modify: `_layouts/post.html`
- Modify: `_layouts/speaking-entry.html`

**Step 1: Replace `_layouts/default.html`**

```html
{% include "header.html" %}

<main id="main" tabindex="-1" class="container" style="padding-top: 40px; padding-bottom: 40px;">
  {{ content }}
</main>

{% include "footer.html" %}
```

**Step 2: Replace `_layouts/musing.html`**

```html
---
permalink: "{{ categories | join: '/' }}/{{ page.fileSlug }}/"
highlight: true
---

{% include "header.html" %}

<header class="post-header">
  <div class="container">
    {% if type %}
    <span class="post-type-badge type-{{ type }}">{{ type }}</span>
    {% endif %}
    <h1>{% if draft %} [DRAFT] {% endif %}{{ title }}</h1>
    <p class="mono" style="color: var(--text-3); margin-top: 8px;">{{ page.date | date: "%B %e, %Y" }}</p>
  </div>
</header>

<main id="main" tabindex="-1" class="container" style="padding-top: 40px; padding-bottom: 60px;">
  <div class="prose">
    {{ content }}
  </div>
</main>

{% include "footer.html" %}
```

**Step 3: Replace `_layouts/post.html`** (keep parity with musing.html)

```html
---
permalink: "{{ categories | join: '/' }}/{{ page.fileSlug }}/"
highlight: true
---

{% include "header.html" %}

<header class="post-header">
  <div class="container">
    {% if type %}
    <span class="post-type-badge type-{{ type }}">{{ type }}</span>
    {% endif %}
    <h1>{% if draft %} [DRAFT] {% endif %}{{ title }}</h1>
    <p class="mono" style="color: var(--text-3); margin-top: 8px;">{{ page.date | date: "%B %e, %Y" }}</p>
  </div>
</header>

<main id="main" tabindex="-1" class="container" style="padding-top: 40px; padding-bottom: 60px;">
  <div class="prose">
    {{ content }}
  </div>
</main>

{% include "footer.html" %}
```

**Step 4: Replace `_layouts/speaking-entry.html`**

```html
{% include "header.html" %}

<header class="post-header">
  <div class="container">
    <span class="post-type-badge type-talk">Talk</span>
    <h1>{{ title }}</h1>
    {% if event %}
    <p class="mono" style="color: var(--text-3); margin-top: 8px;">{{ event }} · {{ page.date | date: "%B %Y" }}</p>
    {% endif %}
  </div>
</header>

<main id="main" tabindex="-1" class="container" style="padding-top: 40px; padding-bottom: 60px;">
  <div class="prose">
    {{ content }}
  </div>
</main>

{% include "footer.html" %}
```

**Step 5: Run build**

```bash
npm run build
```
Expected: exits 0.

**Step 6: Commit**

```bash
git add _layouts/
git commit -m "feat: update layouts to use new design system"
```

---

## Task 9: Create bench data file and homepage layout

**Files:**
- Create: `_data/bench.yml`
- Create: `_layouts/home.html`
- Modify: `index.html`

**Step 1: Create `_data/bench.yml`**

```yaml
- name: Vision + Arm Automation
  status: building
- name: Embedded ML Demos
  status: in-progress
- name: xs-dev + Pebble Watch
  status: in-progress
- name: Homelab
  status: ongoing
```

Status values are: `building` (green badge), `in-progress` (brick badge), `ongoing` (amber badge).

**Step 2: Create `_layouts/home.html`**

```html
{% include "header.html" %}

<section class="hero" style="padding: 60px 48px 52px; display: grid; grid-template-columns: 3fr 2fr; gap: 48px; border-bottom: 1px solid var(--border);">
  <div>
    <div class="role-badge" style="display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--green); margin-bottom: 22px;">
      <span class="live-dot"></span>
      Senior Developer Advocate · Viam Robotics
    </div>
    <h1 style="font-family: var(--font-serif); font-size: clamp(36px, 4vw, 62px); font-weight: 400; line-height: 1.1; letter-spacing: -0.02em; color: var(--text-1); margin-bottom: 18px;">
      Building where<br>
      web meets the<br>
      <em style="font-style: italic; color: var(--green);">physical world.</em>
    </h1>
    <p style="font-family: var(--font-body); font-size: 16px; line-height: 1.7; color: var(--text-2); max-width: 440px;">
      I'm Nick Hehr. I make things, break things, and teach what I learn. My work sits at the intersection of web technologies, embedded systems, and physical AI.
    </p>
  </div>
  <div>
    <div style="background: var(--bg2); border: 1px solid var(--border); border-radius: 8px; padding: 20px 22px;">
      <div style="font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-3); margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
        On the bench
        <span style="flex: 1; height: 1px; background: var(--border); display: block;"></span>
      </div>
      {% for item in bench %}
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 9px 0; {% unless forloop.last %}border-bottom: 1px solid var(--border2);{% endunless %}">
        <span style="font-family: var(--font-display); font-size: 13px; font-weight: 600; color: var(--text-1); letter-spacing: -0.02em;">{{ item.name }}</span>
        <span class="badge badge-{{ item.status }}">{{ item.status }}</span>
      </div>
      {% endfor %}
    </div>
  </div>
</section>

<div class="content-grid">
  <div class="main-col">
    <div class="sec-header">
      <span class="sec-title">Recent Training Data</span>
      <span class="sec-rule"></span>
      <a href="/training-data/" class="sec-all">All posts →</a>
    </div>
    {% assign recent = collections.trainingData | reverse | limit: 5 %}
    {% for post in recent %}
    <a href="{{ post.url }}" class="post-item">
      <div>
        <div class="post-cat cat-{{ post.data.type }}">{{ post.data.type | default: "post" }}</div>
        <div class="post-title">{{ post.data.title }}</div>
        {% if post.data.description %}
        <div class="post-summary">{{ post.data.description }}</div>
        {% endif %}
      </div>
      <div class="post-date">{{ post.date | date: "%b %Y" }}</div>
    </a>
    {% endfor %}
  </div>
  <div class="side-col">
    <div class="sec-header">
      <span class="sec-title">Quick Notes</span>
      <span class="sec-rule"></span>
    </div>
    {% assign notes = collections.trainingData | reverse | where: "data.type", "til" | limit: 3 %}
    {% for note in notes %}
    <div class="note-card note-{{ note.data.type }}">
      <div class="note-type">{{ note.data.type }}</div>
      <div class="note-title">{{ note.data.title }}</div>
      {% if note.data.description %}
      <div class="note-body">{{ note.data.description }}</div>
      {% endif %}
      <div class="note-meta">{{ note.date | date: "%b %e, %Y" }}</div>
    </div>
    {% endfor %}
    {% assign links = collections.trainingData | reverse | where: "data.type", "link" | limit: 2 %}
    {% for note in links %}
    <div class="note-card note-link">
      <div class="note-type">{{ note.data.type }}</div>
      <div class="note-title">{{ note.data.title }}</div>
      {% if note.data.description %}
      <div class="note-body">{{ note.data.description }}</div>
      {% endif %}
      <div class="note-meta">{{ note.date | date: "%b %e, %Y" }}</div>
    </div>
    {% endfor %}
  </div>
</div>

{% include "footer.html" %}
```

**Step 3: Replace `index.html`**

```html
---
layout: home
title: HipsterBrown
---
```

**Step 4: Run build**

```bash
npm run build
```
Expected: exits 0. Verify `_site/index.html` contains the bench items and recent posts.

**Step 5: Start dev server and verify homepage visually**

```bash
npm start
```
Open `http://localhost:8080`. Check:
- Hero section with role badge and live dot
- Bench widget showing items from `_data/bench.yml` with correct badge colors
- Recent Training Data posts listed
- Quick Notes sidebar with TIL/link cards

**Step 6: Commit**

```bash
git add _data/bench.yml _layouts/home.html index.html
git commit -m "feat: rebuild homepage with hero, bench widget, and training data feed"
```

---

## Task 10: Rewrite project layout and projects index

**Files:**
- Modify: `_layouts/project.html`
- Modify: `projects/index.html` (or wherever the projects listing lives — check with `find . -path ./_site -prune -o -name "*.html" -print | xargs grep -l "projects" 2>/dev/null`)

**Step 1: Replace `_layouts/project.html`**

```html
---
permalink: "{{ categories | join: '/' }}/{{ page.fileSlug }}/"
---

{% include "header.html" %}

<header class="post-header">
  <div class="container">
    {% if status %}
    <span class="badge badge-{{ status }}" style="margin-bottom: 16px; display: inline-block;">{{ status }}</span>
    {% endif %}
    <h1>{{ title }}</h1>
    <p style="color: var(--text-2); font-size: 18px; margin-top: 8px;">{{ description }}</p>
    {% if stack %}
    <div style="margin-top: 16px;">
      {% for tech in stack %}
      <span class="stack-pill">{{ tech }}</span>
      {% endfor %}
    </div>
    {% endif %}
    {% if repo or live_link %}
    <div style="margin-top: 20px; display: flex; gap: 12px;">
      {% if live_link %}<a href="{{ live_link }}" class="mono" style="color: var(--green);">Live →</a>{% endif %}
      {% if repo %}<a href="{{ repo }}" class="mono" style="color: var(--text-3);">Source →</a>{% endif %}
    </div>
    {% endif %}
  </div>
</header>

<main id="main" tabindex="-1" class="container" style="padding-top: 40px; padding-bottom: 60px;">
  {% if img_excerpt %}
  <img src="{{ img_excerpt }}" alt="{{ title }} screenshot" style="max-width: 100%; border-radius: 8px; margin-bottom: 32px; border: 1px solid var(--border);">
  {% endif %}
  <div class="prose">
    {{ content }}
  </div>
</main>

{% include "footer.html" %}
```

**Step 2: Find and update the projects index page**

Run:
```bash
find . -path ./_site -prune -o -name "index.*" -print | xargs grep -l "projects" 2>/dev/null
```

Update that file's content section to use the new design system classes. Replace the content with a card grid using the `projects` collection:

```html
---
layout: default
title: Projects
permalink: /projects/index.html
eleventyExcludeFromCollections: true
---
<div class="sec-header" style="margin-bottom: 32px;">
  <span class="sec-title">Projects</span>
  <span class="sec-rule"></span>
</div>
{% for project in collections.projects %}
<div style="padding: 24px 0; border-bottom: 1px solid var(--border2);">
  <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 16px;">
    <div>
      <a href="{{ project.url }}" style="font-family: var(--font-display); font-size: 18px; font-weight: 700; color: var(--text-1); letter-spacing: -0.02em; text-decoration: none;">{{ project.data.title }}</a>
      {% if project.data.description %}
      <p style="margin-top: 6px; font-size: 14px; color: var(--text-2);">{{ project.data.description }}</p>
      {% endif %}
      {% if project.data.stack %}
      <div style="margin-top: 10px;">
        {% for tech in project.data.stack %}
        <span class="stack-pill">{{ tech }}</span>
        {% endfor %}
      </div>
      {% endif %}
    </div>
    {% if project.data.status %}
    <span class="badge badge-{{ project.data.status }}" style="flex-shrink: 0;">{{ project.data.status }}</span>
    {% endif %}
  </div>
</div>
{% endfor %}
```

**Step 3: Run build**

```bash
npm run build
```
Expected: exits 0.

**Step 4: Commit**

```bash
git add _layouts/project.html projects/
git commit -m "feat: rewrite project layout and index with new design system"
```

---

## Task 11: Add Cube Sorter project page

**Files:**
- Create: `posts/projects/cube-sorter.md` (check existing structure with `ls posts/projects/` first; if projects aren't under `posts/` check where existing project posts live)

**Step 1: Find where project posts live**

```bash
ls posts/ 2>/dev/null && find . -path ./_site -prune -o -name "*.md" -print | xargs grep -l "layout: project" 2>/dev/null | head -5
```

**Step 2: Create the Cube Sorter project page in the correct directory**

```markdown
---
layout: project
title: Cube Sorter
description: A robot arm that sorts colored cubes using a vision model and depth camera.
status: building
stack:
  - Viam
  - Python
  - RealSense
  - uFactory Lite6
repo: https://github.com/HipsterBrown/cube-sorter
tags:
  - projects
---

A vision-guided robot arm build using a RealSense depth camera, Jetson Nano, and uFactory Lite6 arm — all orchestrated via Viam.

## How it works

The RealSense camera captures depth-aligned RGB frames. A vision model classifies the cube color and the depth data determines the pickup position. The Lite6 arm executes the pick-and-place sequence via Viam's motion planning API.

## Status

Active build. Vision pipeline is working; full pick-and-place sequence is in progress.
```

**Step 3: Run build and verify the project page renders**

```bash
npm run build
npm start
```
Open the projects index and verify Cube Sorter appears with correct stack pills and status badge.

**Step 4: Commit**

```bash
git add posts/projects/cube-sorter.md
git commit -m "feat: add Cube Sorter project page as reference implementation"
```

---

## Task 12: Training Data index with type filtering

Replace the "Coming soon" Training Data index with a full listing page and client-side type filter.

**Files:**
- Modify: `training-data/index.html`
- Create: `js/_elements/type-filter-element.ts`
- Modify: `js/app.ts`

**Step 1: Create `js/_elements/type-filter-element.ts`**

```typescript
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
```

**Step 2: Add import to `js/app.ts`**

```typescript
import './_elements/type-filter-element';
```

**Step 3: Replace `training-data/index.html`**

```html
---
layout: default
title: Training Data
permalink: /training-data/index.html
eleventyExcludeFromCollections: true
---

<div class="sec-header" style="margin-bottom: 24px;">
  <span class="sec-title">Training Data</span>
  <span class="sec-rule"></span>
</div>

<type-filter style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px;">
  <button data-filter="all" aria-current="true" style="font-family: var(--font-mono); font-size: 11px; padding: 5px 14px; border-radius: 20px; border: 1px solid var(--border); background: transparent; color: var(--text-2); cursor: pointer; transition: all 0.2s;" class="filter-btn">All</button>
  <button data-filter="long-form" style="font-family: var(--font-mono); font-size: 11px; padding: 5px 14px; border-radius: 20px; border: 1px solid var(--border); background: transparent; color: var(--text-2); cursor: pointer;" class="filter-btn">Long Form</button>
  <button data-filter="til" style="font-family: var(--font-mono); font-size: 11px; padding: 5px 14px; border-radius: 20px; border: 1px solid var(--border); background: transparent; color: var(--text-2); cursor: pointer;" class="filter-btn">TIL</button>
  <button data-filter="link" style="font-family: var(--font-mono); font-size: 11px; padding: 5px 14px; border-radius: 20px; border: 1px solid var(--border); background: transparent; color: var(--text-2); cursor: pointer;" class="filter-btn">Link</button>
  <button data-filter="note" style="font-family: var(--font-mono); font-size: 11px; padding: 5px 14px; border-radius: 20px; border: 1px solid var(--border); background: transparent; color: var(--text-2); cursor: pointer;" class="filter-btn">Note</button>
  <button data-filter="talk" style="font-family: var(--font-mono); font-size: 11px; padding: 5px 14px; border-radius: 20px; border: 1px solid var(--border); background: transparent; color: var(--text-2); cursor: pointer;" class="filter-btn">Talk</button>
</type-filter>

<div data-post-list>
  {% for post in collections.trainingData reversed %}
  <a href="{{ post.url }}" class="post-item" data-post-type="{{ post.data.type | default: 'long-form' }}">
    <div>
      <div class="post-cat cat-{{ post.data.type }}">{{ post.data.type | default: "post" }}</div>
      <div class="post-title">{{ post.data.title }}</div>
      {% if post.data.description %}
      <div class="post-summary">{{ post.data.description }}</div>
      {% endif %}
    </div>
    <div class="post-date">{{ post.date | date: "%b %Y" }}</div>
  </a>
  {% endfor %}
</div>

<style>
  type-filter [aria-current="true"] {
    background: var(--surface);
    color: var(--text-1);
    border-color: var(--border);
  }
</style>
```

**Step 4: Run build**

```bash
npm run build
```
Expected: exits 0.

**Step 5: Start dev server and verify**

```bash
npm start
```
Open `http://localhost:8080/training-data/`. Check:
- All posts listed with type labels
- Filter buttons work: clicking "TIL" hides non-TIL posts
- Post titles link to the correct post pages

**Step 6: Commit**

```bash
git add training-data/index.html js/_elements/type-filter-element.ts js/app.ts
git commit -m "feat: add Training Data index with client-side type filtering"
```

---

## Task 13: Quick Notes index page

**Files:**
- Create: `training-data/notes.html`

**Step 1: Create `training-data/notes.html`**

```html
---
layout: default
title: Quick Notes
permalink: /training-data/notes/index.html
eleventyExcludeFromCollections: true
---

<div class="sec-header" style="margin-bottom: 32px;">
  <span class="sec-title">Quick Notes</span>
  <span class="sec-rule"></span>
  <a href="/training-data/" class="sec-all">All posts →</a>
</div>

{% assign notes = collections.trainingData | reverse %}
{% for post in notes %}
  {% if post.data.type == "til" or post.data.type == "link" or post.data.type == "note" %}
  <a href="{{ post.url }}" style="text-decoration: none; display: block;">
    <div class="note-card note-{{ post.data.type }}" style="margin-bottom: 12px;">
      <div class="note-type">{{ post.data.type }}</div>
      <div class="note-title">{{ post.data.title }}</div>
      {% if post.data.description %}
      <div class="note-body">{{ post.data.description }}</div>
      {% endif %}
      <div class="note-meta">{{ post.date | date: "%b %e, %Y" }}</div>
    </div>
  </a>
  {% endif %}
{% endfor %}
```

**Step 2: Run build**

```bash
npm run build
```
Expected: exits 0, `_site/training-data/notes/index.html` exists.

**Step 3: Commit**

```bash
git add training-data/notes.html
git commit -m "feat: add Quick Notes index for TIL, link, and note types"
```

---

## Task 14: Update RSS feed and add per-type feeds

**Files:**
- Modify: `feed.njk`
- Create: `feeds/all.njk`
- Create: `feeds/longform.njk`
- Create: `feeds/til.njk`
- Create: `feeds/links.njk`
- Create: `feeds/appearances.njk`

**Step 1: Update `feed.njk` to include `type` in each entry**

In `feed.njk`, update each `<entry>` block to include a `<category>` element:

```xml
  <entry>
    <title>{{ post.data.title }}</title>
    <link href="{{ absolutePostUrl }}"/>
    <updated>{{ post.date | dateToRfc822 }}</updated>
    <id>{{ absolutePostUrl }}</id>
    {% if post.data.type %}<category term="{{ post.data.type }}"/>{% endif %}
    <content type="html">{{ post.templateContent | htmlToAbsoluteUrls(absolutePostUrl) }}</content>
  </entry>
```

**Step 2: Create `feeds/` directory and add per-type feeds**

Create `feeds/longform.njk`:

```njk
---
permalink: feeds/longform.xml
metadata:
  title: HipsterBrown — Long Form
  url: https://hipsterbrown.com
  feedUrl: https://hipsterbrown.com/feeds/longform.xml
  author:
    name: Nicholas Hehr
    email: headhipster@hipsterbrown.com
---
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>{{ metadata.title }}</title>
  <link href="{{ metadata.feedUrl }}" rel="self"/>
  <link href="{{ metadata.url }}"/>
  <id>{{ metadata.url }}</id>
  <author>
    <name>{{ metadata.author.name }}</name>
    <email>{{ metadata.author.email }}</email>
  </author>
  {%- for post in collections.trainingData %}
  {%- if post.data.type == "long-form" %}
  {% set absolutePostUrl %}{{ post.url | url | absoluteUrl(metadata.url) }}{% endset %}
  <entry>
    <title>{{ post.data.title }}</title>
    <link href="{{ absolutePostUrl }}"/>
    <updated>{{ post.date | dateToRfc822 }}</updated>
    <id>{{ absolutePostUrl }}</id>
    <category term="long-form"/>
    <content type="html">{{ post.templateContent | htmlToAbsoluteUrls(absolutePostUrl) }}</content>
  </entry>
  {%- endif %}
  {%- endfor %}
</feed>
```

Repeat the same pattern for the other feeds, changing the `permalink`, `title`, `feedUrl`, and the `type` filter value:

- `feeds/til.njk` → filters `post.data.type == "til"`, permalink `feeds/til.xml`
- `feeds/links.njk` → filters `post.data.type == "link"`, permalink `feeds/links.xml`
- `feeds/appearances.njk` → filters `post.data.type == "talk" or post.data.type == "video" or post.data.type == "audio"`, permalink `feeds/appearances.xml`
- `feeds/all.njk` → no filter (same as `feed.njk`), permalink `feeds/all.xml`

**Step 3: Run build**

```bash
npm run build
```
Expected: exits 0. Check that `_site/feeds/longform.xml`, `_site/feeds/til.xml`, etc. exist.

**Step 4: Commit**

```bash
git add feed.njk feeds/
git commit -m "feat: add type metadata to main feed and create per-type RSS feeds"
```

---

## Task 15: Update Speaking section

**Files:**
- Modify: `speaking/index.html`
- Modify: `_layouts/speaking-entry.html` (already done in Task 8 — verify it's applied)

**Step 1: Replace `speaking/index.html`**

```html
---
layout: default
title: Speaking
permalink: /speaking/index.html
eleventyExcludeFromCollections: true
---

<div class="sec-header" style="margin-bottom: 32px;">
  <span class="sec-title">Speaking</span>
  <span class="sec-rule"></span>
</div>

{% for entry in collections.speaking reversed %}
<div style="padding: 24px 0; border-bottom: 1px solid var(--border2);">
  <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap;">
    <div>
      <span class="post-type-badge type-talk" style="margin-bottom: 10px; display: inline-block;">
        {{ entry.data.type | default: "talk" }}
      </span>
      <div>
        <a href="{{ entry.url }}" style="font-family: var(--font-serif); font-size: 19px; color: var(--text-1); text-decoration: none; line-height: 1.3; letter-spacing: -0.01em;">{{ entry.data.title }}</a>
      </div>
      {% if entry.data.event %}
      <div class="mono" style="color: var(--text-3); margin-top: 6px;">{{ entry.data.event }}</div>
      {% endif %}
      <div style="margin-top: 10px; display: flex; gap: 16px; flex-wrap: wrap;">
        {% if entry.data.slides %}
        <a href="{{ entry.data.slides }}" class="mono" style="font-size: 10px; color: var(--text-3);">Slides →</a>
        {% endif %}
        {% if entry.data.recording %}
        <a href="{{ entry.data.recording }}" class="mono" style="font-size: 10px; color: var(--amber);">Recording →</a>
        {% endif %}
        {% if entry.data.event_url %}
        <a href="{{ entry.data.event_url }}" class="mono" style="font-size: 10px; color: var(--text-3);">Event →</a>
        {% endif %}
      </div>
    </div>
    <span class="post-date">{{ entry.date | date: "%b %Y" }}</span>
  </div>
</div>
{% endfor %}
```

**Step 2: Run build**

```bash
npm run build
```
Expected: exits 0.

**Step 3: Start dev server and verify Speaking page**

```bash
npm start
```
Open `http://localhost:8080/speaking/`. Verify entries render with amber type badges, dates, and links.

**Step 4: Commit**

```bash
git add speaking/index.html
git commit -m "feat: update Speaking index with new design system"
```

---

## Final verification

**Step 1: Production build**

```bash
npm run build
```
Expected: exits 0, no warnings about missing files or broken templates.

**Step 2: Check key pages in dev server**

```bash
npm start
```

Visit and verify each of these pages renders correctly with the new design:
- `http://localhost:8080/` — homepage with hero, bench, recent posts, quick notes sidebar
- `http://localhost:8080/training-data/` — filterable post list
- `http://localhost:8080/training-data/notes/` — quick notes cards
- `http://localhost:8080/projects/` — project cards with stack pills
- `http://localhost:8080/speaking/` — speaking entries with amber badges
- Any Training Data post — check the `type` badge in the post header
- Toggle dark mode — verify warm charcoal theme applies and persists on reload

**Step 3: Verify redirect still works**

```bash
curl -I http://localhost:8080/musings/
```
Expected: 301 redirect to `/training-data/`.

**Step 4: Final commit (if any cleanup)**

```bash
git add -p
git commit -m "chore: final cleanup before redesign branch review"
```
