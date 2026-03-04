# Site Redesign Design — Phases 1 + 2

_2026-03-04_

## Overview

Rebuild hipsterbrown.com using the visual direction defined in `.plans/site-redesign-brief.md`. Work lives on a `redesign` feature branch until ready to ship. CSS architecture is a full rewrite of the existing SCSS. Implementation follows a design-system-first sequence: tokens and typography are stable before any template work begins.

Reference implementation: `.plans/redesign-theme-example.html`

---

## Branch strategy

All work on a `redesign` branch off `main`. No PRs until the branch is ready to ship.

---

## Phase 1 — Foundation

### Step 1 — Design system

**SCSS rewrite**

- Replace `sass/_theme.scss` with new CSS custom property tokens from the brief (light mode on `:root`, dark mode on `@media (prefers-color-scheme: dark)` and `[data-theme="dark"]`)
- Replace `sass/_typography.scss` with new font stack and scale
- Rewrite component SCSS files to use new tokens; remove all Typekit/legacy variables

**Typography**

- Body: Epilogue (400–600)
- Headings/articles: Instrument Serif (400/italic)
- Display/labels/nav: Syne (800 uppercase)
- Mono/metadata/code: IBM Plex Mono (400–500)
- Loaded via `{% eleventyGoogleFonts %}` shortcode in `_includes/header.html` (global, not page-conditional). Replaces current Typekit script and conditional Playfair Display shortcode.

**Dark mode toggle**

- New web component in `js/_elements/` reads `prefers-color-scheme`, persists preference to `localStorage`, toggles `data-theme` attribute on `<html>`

---

### Step 2 — Homepage rebuild

- New `_layouts/home.html` layout (replaces use of `default` layout on `index.html`)
- **Hero**: role badge with live-dot animation, Instrument Serif headline, Epilogue body copy
- **On the Bench widget**: reads from `_data/bench.yml` — array of `{ name, status }` where status is `building | in-progress | ongoing`; badge colors use `--green`, `--brick`, `--amber`
- **Recent Training Data**: last 4–5 posts from `trainingData` collection, color-coded by `type` frontmatter field
- **Quick Notes sidebar**: filters `trainingData` by `type: til | link | note`, renders left-bordered card format

---

### Step 3 — Navigation & shared layout

- **`_includes/header.html`**: new nav — `HipsterBrown` logo (Syne 800) left, mono nav links (Projects · Training Data · Demos · Speaking) center, dark mode toggle right; Google Fonts shortcode applied globally
- **`_includes/footer.html`**: simplified strip — logo left, social links (Mastodon, GitHub, RSS) right, copyright far right
- **`_layouts/default.html`**: updated to use new header/footer, apply `data-theme` on `<html>`
- Per-page layouts (`musing.html`, `post.html`, `project.html`, `speaking-entry.html`): updated to use new token-based classes

---

### Step 4 — Project page

- **`_layouts/project.html`**: name (Syne), status badge, description (Epilogue), stack pills (IBM Plex Mono), optional media slot, links (repo, live, writeup)
- **`/projects` index**: card listing with name, status badge, one-line description, stack pills; works-in-progress shown
- **Seed data**: Cube Sorter as the reference project page

---

## Phase 2 — Content Infrastructure

### Step 5 — Training Data section

- **`/training-data` index**: filterable listing using existing `type` frontmatter field as toggle buttons (client-side JS, no page reload); color-coding maps `type` to accent per brief (green → long-form/TIL, brick → link/note, amber → talk)
- **`_layouts/musing.html`**: updated to render `type` as a color-coded label badge in post header
- **`training-data.11tydata.js`**: no changes needed; `type` is already set per-post
- URL redirects (`/musings` → `/training-data`): already in place, no new work

---

### Step 6 — Quick Notes as first-class content type

- Posts with `type: til | link | note` are Quick Notes; they live in `training-data/` alongside long-form posts
- **`/training-data/notes`**: index listing only short-form types, left-bordered card format
- Homepage sidebar already covered in Step 2

---

### Step 7 — RSS feeds

- Update `feed.njk` to cover all `trainingData` posts regardless of `type`; include `type` in item metadata
- Add per-type feed templates: `feeds/all.xml`, `feeds/longform.xml`, `feeds/til.xml`, `feeds/links.xml`, `feeds/appearances.xml`

---

### Step 8 — Speaking section

- **`/speaking` index**: updated listing with new token-based styles; each entry renders event name, talk title, date (IBM Plex Mono), links
- **`_layouts/speaking-entry.html`**: updated to use new design system; `amber` accent for talk/video/audio labels
- **Cross-posting**: talks with `type: talk` in Training Data link to Speaking entries via a manual `speakingRef` frontmatter slug field

---

## Design tokens reference

See `.plans/site-redesign-brief.md` §Design Tokens for full color palette and typography table.
See `.plans/redesign-theme-example.html` for visual reference (light + dark).
