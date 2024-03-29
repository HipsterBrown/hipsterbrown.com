---
layout: musing
title: Using esbuild with 11ty
description: While looking to upgrade my site's asset pipeline, I ended up on esbuild as my solution with just a little bit of integration code.
categories:
- musings
- musing
tags:
- dev
- 11ty

---

A little while ago, I migrated my personal site to [11ty](https://11ty.dev) as the static site engine; moving away from [Jekyll](https://jekyllrb.com/) for various reasons: speed, language familiarity, and community. Given 11ty's sole focus on being a great static site builder, there isn't a built-in concern for processing or bundling other assets like CSS and JavaScript. While using Jekyll, I had [Grunt](https://gruntjs.com/) set up to process [Sass](https://sass-lang.com/), minify JS, and create an SVG icon map. Since I replaced the SVG icon map with inline `include` expressions, I wanted a different build system to process the Sass and JS that could integrate cleanly with 11ty.

During my initial research, I looked into the [starter projects](https://www.11ty.dev/docs/starter/) shared through the 11ty docs. There's a wide range of options, from simple résumé sites to full e-commerce solutions and remote CMS sources. Much like the story of the three bears, nothing seemed to fit quite right because they either did more than required or not enough. Most of the solutions also required running a one or more separate processes outside of 11ty. This led me to assembling my own pipeline using [11ty plugins](https://www.11ty.dev/docs/plugins/), which is another plethora of choice for most things except processing JS and Sass. The few plugins for handling styles appeared to [monkeypatch](https://en.wikipedia.org/wiki/Monkey_patch) the Eleventy class, which felt fragile to depend on.

Finally, I got around to looking at [`esbuild`](https://esbuild.github.io/) to solve my problem. I've used it at work to improve the performance of TypeScript and React bundling, although the scale of my site is considerably smaller. esbuild doesn't handle Sass out of the box ([CSS support is in progress at the time of writing](https://esbuild.github.io/content-types/#css)), but it too has [a plugin system](https://github.com/esbuild/community-plugins) to help extend its capabilities. I landed on the [`esbuild-sass-plugin`](https://www.npmjs.com/package/esbuild-sass-plugin) because it looked up to date, performant, and provided the choice between [node-sass](https://github.com/sass/node-sass) and [dart sass](https://www.npmjs.com/package/sass). Integrating was just a matter of calling esbuild in [11ty's "afterBuild" event handler](https://www.11ty.dev/docs/events/#afterbuild) to ensure the output directory was created by 11ty before processing the Sass and JS.

```js
// .eleventy.js
const esbuild = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");

module.exports = config => {
  config.on("afterBuild", () => {
    return esbuild.build({
      entryPoints: ["sass/app.scss", "js/app.js"],
      outdir: "_site/assets",
      minify: process.env.ELEVENTY_ENV === "production",
      sourcemap: process.env.ELEVENTY_ENV !== "production",
      plugins: [sassPlugin()]
    });
  });
  config.addWatchTarget("./sass/");
  config.addWatchTarget("./js/");
  // continue configuring 11ty
};
```

The [`addWatchTarget` method](https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets) helps trigger the esbuild when one of the entrypoints, or files related to those entrypoints, has changed. Keeping 11ty in charge of file watching maintains a source of truth for build triggers, rather than having competing watchers when using separate processes. Even though esbuild does support [incremental builds](https://esbuild.github.io/api/#incremental), the amount of files being processed is so small that it would be overkill to use this feature and means I'm not concerned about the uneccessary builds that happen while I'm not working on those assets. A nice perk from this overall setup meant converting my JavaScript to TypeScript just by renaming my source file and esbuild did the rest.

All in all, its nice to know that extending 11ty is supported by a rich community of examples, plugins, and documentation. If anything needs to change in the future, I'm confident I could find a way forward.

_P.S._

During discovery for this post, I found [eleventy-plugin-esbuild by jamshop](https://github.com/jamshop/eleventy-plugin-esbuild) as a pre-built solution for what I ended up doing myself. The core differences with this implementation is the use of the synchronous version of esbuild's processing and manages its own build cache as [custom global data](https://www.11ty.dev/docs/data-global-custom/).
