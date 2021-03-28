---
layout: musing
title: Using esbuild with 11ty
description: While looking to upgrade my blog's asset pipeline, I ended up on `esbuild` as my solution with just a little bit of integration code.
categories:
- musings
- musing
tags:
- dev
- 11ty

---

A little while ago, I migrated my personal site to [11ty](https://11ty.dev) as the static site engine; moving away from Jekyll for various reasons: speed, language familiarity, and community. Given 11ty's sole focus on being a great static site builder, there isn't a built-in concern for processing or bundling other assets like CSS and JavaScript. While using Jekyll, I had [`grunt`](https://gruntjs.com/) set up to process [Sass](https://sass-lang.com/), minify JS, and create an SVG icon map. Since I replaced the SVG icon map with inline `{% include %}` expressions, I wanted a different build system to process the Sass and JS that could integrate cleanly with 11ty.



- hit issues with parcel, 1 and 2
- didn't want to manage another config, i.e. rollup or webpack
- gulp is even more work to integrate and relies on a separate process
- existing 11ty plugins would moneypatch the `Eleventy` class to process sass and js
- I needed something efficient, scalable, and somewhat future-proof, that also didn't hack the build
