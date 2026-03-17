---
title: hipsterbrown.com
description: A decade-overdue redesign — new visual identity, new content architecture, same self-hosted stack.
status: ongoing
date: 2026-02-15
updated: 2026-03-16
stack:
  - 11ty
  - Liquid
  - Web Components
  - Decap CMS
  - GitHub Actions
  - Dokku
live_link: https://hipsterbrown.com
repo: https://github.com/HipsterBrown/hipsterbrown.com
---

My personal site had the same design for over a decade. Over that time, I've expanded my focus and interests, but the site hadn't kept up with any of it. It's time for a new era of hipsterbrown.com.

## Motivation

The old design wasn't broken, exactly. But it started as a portfolio site trying to be a blog trying to be a personal brand, and it wasn't fully committing to any of those things. The work I do now sits at the intersection of web technology and physical computing — robotics, embedded JavaScript, ML integration — and that's not what the site communicated. More practically: I was rarely publishing because the friction was too high and the output felt disconnected from how I actually work.

The redesign had three concrete goals:

1. Make the site feel like an active workshop, not a static portfolio
2. Give every type of output — essays, short notes, links, talks, videos — a proper home in a unified content stream
3. Make publishing from a phone or iPad genuinely possible, without breaking the git-backed deployment workflow I want to keep

## Visual Direction

The locked direction is "warm-industrial editorial" — a maker's workshop meets dev blog. Not a cold dark tech showcase, not a precious creative portfolio.

**Light mode** is built on a warm cream base (`#F7F3EC`) with ink text and three accent colors: green for technical content and learnings, brick for links and alerts, amber for talks and appearances. **Dark mode** stays on a warm charcoal base rather than the cold navy that most dark themes default to — the warmth carries across both modes and keeps the brand coherent.

Typography pairs Syne (display, 800 weight, uppercase) for structural backbone with Instrument Serif for article headlines, Epilogue for body copy, and IBM Plex Mono for metadata and labels. The mono stack does a lot of work in the UI — dates, status badges, content type labels — and anchors the technical identity without making everything feel like a terminal.

## Content Architecture

The biggest structural change is replacing the old "Musings" blog with a unified section called **Training Data**. All output types flow through it: long-form essays and build logs, TILs, curated links with commentary, short notes, talk writeups, video, and audio. Each type gets a color-coded label and its own RSS feed. Everything that was at `/musings/:slug` redirects 301 to `/training-data/:slug` — no dead links.

The section name carries a double meaning that felt worth keeping.

Beyond Training Data, the full IA is:

- **Homepage** — hero, an "On the Bench" widget showing what I'm actively building, recent Training Data entries, a Quick Notes sidebar for short-form content
- **Projects** (`/projects`) — curated project pages with status badges (`building`, `in progress`, `ongoing`), stack pills, and prose body
- **Training Data** (`/training-data`) — the unified content stream, filterable by type
- **Demos** (`/demos`) — interactive browser experiments, some self-hosted on a Dokku subdomain, some linking out
- **Speaking** (`/speaking`) — conference talks, podcast appearances, video interviews

## Publishing Workflow

The deployment stack stays the same: 11ty builds to static HTML, GitHub Actions deploys to a Dokku VPS on push to main. What changed is adding Decap CMS as a Git-backed admin layer at `/admin`. It writes Markdown files with YAML front-matter directly to the repo, which means a commit goes out on save and the standard Actions pipeline picks it up. No new infrastructure, no vendor lock-in, and it works in a mobile browser.

## Roadmap

**Shipped (Phase 1):**
- Design tokens as CSS custom properties, light/dark mode with `prefers-color-scheme` and a manual override
- Typography stack installed, Syne/Instrument Serif/Epilogue/IBM Plex Mono
- Homepage rebuilt with hero, On the Bench widget, recent Training Data, Quick Notes sidebar
- Redirect rules for all `/musings` URLs
- Decap CMS configured for mobile publishing

**In progress (Phase 2):**
- Training Data section with type labels and client-side filtering
- RSS feeds per content type (`/feeds/all.xml`, `/feeds/longform.xml`, `/feeds/til.xml`, `/feeds/links.xml`, `/feeds/appearances.xml`)
- Quick Notes as a first-class 11ty content type with low-friction publishing
- Speaking section with the full talk archive

**Coming (Phase 3):**
- Demos section (starting with the vision webcam demo and audio classification experiment)
- On the Bench widget wired to a YAML data file so status updates don't require a code change
- OG image generation at build time for Training Data posts
- Easter egg (the Konami code does something; the mustache is already in the favicon)

## Stack Notes

Everything is intentionally boring infrastructure-wise. 11ty with Liquid templates is what was already here and it's fast, flexible, and doesn't require a build pipeline babysitter. Web components handle any interactive pieces — no framework. Dokku self-hosted on a VPS keeps the deployment entirely under my control. The only new dependency is Decap CMS, which is open source and writes nothing to a vendor database.

The goal was a site that feels alive without becoming a maintenance project.
