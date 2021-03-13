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


- hit issues with parcel, 1 and 2
- didn't want to manage another config, i.e. rollup or webpack
- gulp is even more work to integrate and relies on a separate process
- existing 11ty plugins would moneypatch the `Eleventy` class to process sass and js
- I needed something efficient, scalable, and somewhat future-proof, that also didn't hack the build
