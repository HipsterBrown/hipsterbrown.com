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

My personal site had the same design for over a decade. Over that time, I've expanded my focus and interests, but the site hadn't kept up with any of it. This is the start of a new era of hipsterbrown.com.

## Motivation

The old design wasn't broken, exactly. But it started as a portfolio site trying to be a blog trying to be a personal brand, and it wasn't fully committing to any of those things. I wanted a place the I felt proud to publish and share my latest projects, which have grown to include robotics, embedded JavaScript, home automation, and practical ML. I've also longed for a convenient way to draft, review, and edit posts without being at my laptop, without giving up the simplicity and portability of my static site built from markdown files. The final product should feel like an active workshop instead of a content archive; living and iterating as I strive to do. 

After attempting to accomplish this project a few times in the past, it was the confluence of parental leave and Claude Code that provided the time to finally get it done. 
## Visuals

Using Claude's [frontend-design skill](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md), I iterated on theme & layout prototypes to inform a design brief for the visual redesign. That eventually led to a "warm-industrial editorial" look, a maker's workshop meets dev log; a personal showcase and publication for what I'm building and learning.
### Color Scheme

**Light mode** is built on a warm cream base (`#F7F3EC`) with inky text and three accent colors: green for technical content and learnings, brick for links and alerts, amber for talks and appearances.
**Dark mode** stays on a warm charcoal base (`#161210`) to compliment the cream color of the light mode, also making sure the contrast levels stay accessible.

### Typography

**Syne** (display, 800 weight, uppercase) for structural backbone.
**Instrument Serif** for article headlines. 
**Epilogue** for body copy.
**IBM Plex Mono** for metadata and labels, including dates, status badges, and content type labels.

## Content Architecture

The biggest structural change is replacing the old "Musings" blog with a unified section called **Training Data**, sharing what I learn with world and the robots. All blog-type content flows through it: long-form essays and build logs, TILs, curated links with commentary, short notes, talk writeups, video, and audio. Each type gets a color-coded label and its own RSS feed. Everything that was at `/musings/:slug` redirects 301 to `/training-data/:slug` because nobody likes dead links.

Beyond Training Data, the homepage was updated with an "On the Bench" widget to show what I've actively building and columns for recent Training Data entries alongside Quick Notes for short-form content. I'd like the widget to eventually be fed by a heuristic based on by GitHub history and published content tags; for now it's static JSON data that can be updated through a commit to the repo.

The **Projects** pages, like this one, have varying statuses (`shipped`, `in progress`, `ongoing`), tags described the tech stack, along with the typical body content. Any ongoing and in progress projects will have an "updated" field to indicate when new changes have been made.

Future content pages include:
- **Demos** (`/demos`): interactive browser experiments; some living under a subdomain, some linking out to other hosts
- **Speaking** (`/speaking`): conference talks, podcast appearances, video interviews

## Publishing Workflow

For the most part. the deployment stack stays the same: [11ty / Build Awesome](https://www.11ty.dev/) builds to static HTML, GitHub Actions deploys to a Dokku VPS on push to main. To accomplish my goal of remote content management, I've added Decap CMS as a Git-backed admin layer configured to use the "editorial workflow" when creating and updating drafts. It writes Markdown files with YAML front-matter directly to the repo as a PR, which means a commit goes out on save and the standard Actions pipeline picks it up when merged. No new infrastructure, no vendor lock-in, and it works in a mobile browser. I'll be sure to write about this setup separately soon.

## Roadmap

**Shipped:**
- Design tokens as CSS custom properties, light/dark mode with `prefers-color-scheme` and a manual override
- Typography stack installed, Syne/Instrument Serif/Epilogue/IBM Plex Mono
- Homepage rebuilt with hero, On the Bench widget, recent Training Data, Quick Notes sidebar
- Redirect rules for all `/musings` URLs
- Decap CMS configured for mobile publishing
- Training Data section with type labels and client-side filtering
- RSS feeds per content type (`/feeds/all.xml`, `/feeds/longform.xml`, `/feeds/til.xml`, `/feeds/links.xml`, `/feeds/appearances.xml`)
- Quick Notes as a first-class 11ty content type with low-friction publishing
- OG image generation at build time for Training Data and Projects posts

**In progress (Phase 2):**
- client-side search based on content, tags, and stack metadata

**Coming (Phase 3):**
- Speaking section with the full talk archive
- Demos section
- On the Bench widget wired to a YAML data file so status updates don't require a code change

## Stack Notes

Everything is intentionally boring infrastructure-wise. 11ty with Liquid templates is what was already here as a holdover from the previous Jekyll setup. Web components handle any interactive pieces — no framework. Dokku self-hosted on a VPS keeps the deployment entirely under my control and similar to the classic Heroku workflow. The only new dependency is Decap CMS, which is open source, self-hostable, and doesn't affect how the data is stored.

