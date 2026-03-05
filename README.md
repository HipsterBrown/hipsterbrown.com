# [HipsterBrown.com](https://hipsterbrown.com)

Personal website built with [Eleventy (11ty)](https://www.11ty.dev/) v3. It has gone through several architectures over the years:

- PHP (some custom pages along with [Anchor CMS](https://anchorcms.com/))
- [Jekyll](https://jekyllrb.com/)
- [11ty](https://www.11ty.dev/) [Current]

The core focus of each rebuild is to make it easier to work locally, iterate on the overall design, and ship new content without hassle.

## Commands

```bash
# Development server with live reload
npm start

# Production build
npm run build

# Run local CMS editor proxy (for Static CMS local backend)
npm run start:editor-proxy
```

## Architecture

### Build pipeline

- **HTML**: Liquid templates in `_layouts/` and `_includes/`, content from `posts/` and `training-data/`
- **CSS**: Plain CSS in `css/` compiled via PostCSS + `postcss-preset-env` (stage 0) + `cssnano` (production). Entry point: `css/app.css` which imports component files
- **JS**: TypeScript files in `js/` bundled via esbuild after each Eleventy build, output to `_site/assets/`
- **SVGs**: Inlined from `svg/` via `@jamshop/eleventy-plugin-svg` shortcode (`{% svg "Name" %}`)

### CSS structure

```
css/
  app.scss             # Entry point — imports all components
  _tokens.css          # Design tokens (spacing, type scale, colors)
  components/
    _base.css          # Reset, body, skip-nav
    _nav.css           # Site nav, theme toggle
    _home.css          # Homepage hero, bench widget
    _content.css       # Post lists, pagination, type filters, prose
    _footer.css        # Footer, logo, ornament, links
    _project.css       # Project cards, stack pills, badges
    _speaking.css      # Speaking page
    _section.css       # Section headers
```

### Design system

**Palette** — warm-industrial neutrals with accent colors:
- `--green` / `--brick` / `--amber` — category and status accents
- `--bg` / `--surface` / `--border` — layered surface tokens
- `--text-1` / `--text-2` / `--text-3` — text hierarchy

**Typography** — four-font stack:
- `--font-display`: Syne — headers and logotype
- `--font-serif`: Instrument Serif — editorial body text and post titles
- `--font-body`: Epilogue — paragraph text
- `--font-mono`: IBM Plex Mono — metadata, labels, UI chrome

**Spacing/type scale**: rem-based tokens (`--space-1` through `--space-16`, `--text-xs` through `--text-4xl`)

**Theming**: Light/dark via `[data-theme="dark"]` on `<html>`, toggled by the `<theme-toggle>` web component.

### Content collections

Training data posts live under `training-data/` (markdown files) and are organized by `type` frontmatter field:

| Type | Collection | Landing page |
|------|-----------|--------------|
| `long-form` | `trainingData_long-form` | `/training-data/long-form/` |
| `til` | `trainingData_til` | `/training-data/til/` |
| `link` | `trainingData_link` | `/training-data/link/` |
| `note` | `trainingData_note` | `/training-data/note/` |
| `talk` | `trainingData_talk` | `/training-data/talk/` |

All training data is paginated server-side (20 per page) using the `content-type` layout. The main index at `/training-data/` shows all types combined.

Legacy post collections under `posts/` (musings, faq, bio, empathy) are preserved but redirect to their original URLs.

### RSS feeds

| Feed | URL |
|------|-----|
| All training data | `/feeds/all.xml` |
| Long-form | `/feeds/longform.xml` |
| Links | `/feeds/links.xml` |
| Notes | `/feeds/note.xml` |
| TIL | `/feeds/til.xml` |
| Appearances | `/feeds/appearances.xml` |

### Client-side web components

Custom elements in `js/_elements/`:
- `theme-toggle` — light/dark mode toggle, keyboard operable (Enter/Space)
- `scroll-nav` — nav scroll behavior and mobile menu toggle
- `fit-text-element` — text fitting utility
- `random-word-element` — random word display

### Draft posts

Posts with `draft: true` in frontmatter are hidden in production (`ELEVENTY_ENV=production`) but visible in development. A draft banner appears on post detail pages and a draft badge appears in list views when running locally.

### CMS

Static CMS is configured via `admin/config.yml`. Uses GitHub as the backend by default. For local development, uncomment `local_backend: true` in that config and run `npm run start:editor-proxy` alongside `npm start`.

### Data files

- `_data/metadata.js` — site-wide metadata (title, URL, author)
- `_data/env.js` — exposes `ELEVENTY_ENV` to templates as `env.mode`
- `_data/currentYear.js` — exposes current year to templates

### Deployment

Pushes to `main` deploy automatically to a Dokku server at `hipsterbrown.com` via GitHub Actions (`.github/workflows/deploy.yml`).
