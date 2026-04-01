---
draft: false
date: 2026-03-31T22:06:00.000-04:00
title: Generating Open Graph Images in 11ty
description: Integrate automatic OG image generation into your 11ty site
templateEngineOverride: md
type: til
tags:
  - 11ty
  - website
---
When I working on [redesigning my website]https://hipsterbrown.com/projects/personal-site/), one of the big features I wanted to add was Open Graph (OG) images. These always seemed like such a flex to see from personal blogs and really made those links stand out in every social site that supported them.  

I had a few main criteria to cover when adding support for this feature:

- images should be generated automatically for each content collection
- the process should be integrated into the 11ty build system I use for my site
- it should be efficient enough to run anywhere, i.e. my laptop or GitHub Actions
- the images should match the theme of my site, including fonts

I knew very little about how OG images are implemented outside of some special `meta` tags that go into the head of the HTML. Thankfully those tags have become fairly standardized over the years. 

```html
<meta property="og:title" content="Generating Open Graph Images in 11ty" />
<meta property="og:url" content="https://hipsterbrown.com/training-data/generating-open-graph-images-in-11ty/" />
<meta property="og:image" content="https://hipsterbrown.com/og/generating-open-graph-images-in-11ty.png" />
<meta property="og:type" content="article" />
<meta property="og:description" content="Integrate automatic OG image generation into your 11ty site" />
```

Each of those tags needs to be included in the head of each page that wants the social glow up treatment. So I created the following template partial to contain the small amount of logic required to use the correct content for the relevant tags:

```liquid,html
<!-- Open Graph Meta Tags -->
{%- if type -%}
  {%- assign ogImageUrl = '/og/' | append: page.fileSlug | append: '.png' -%}
{%- elsif contentType == "project" -%}
  {%- assign ogImageUrl = '/og/projects/' | append: page.fileSlug | append: '.png' -%}
{%- else -%}
  {%- assign ogImageUrl = '/og/' | append: ogImage | default: 'default.png' | append: '' -%}
{%- endif -%}

<meta property="og:title" content="{{ title | escape }}">
<meta property="og:description" content="{{ description | escape }}">
<meta property="og:type" content="article">
<meta property="og:url" content="{{ canonicalUrl }}">
<meta property="og:image" content="https://hipsterbrown.com{{ ogImageUrl }}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="{{ title | escape }}">
```

Along with the main meta tags, I’ve also included extra metadata about the image to help with displaying them on each site. 

To actually generate the images for the landing pages (home, training data index, project index, etc) and each page in a content collection, I created a Node.js script that used the [satori package](https://npmx.dev/package/satori) to generate an SVG “card” design from an HTML & CSS template and render it to a PNG using [Resvg](https://npmx.dev/package/@resvg/resvg-js). Satori allows me to use flex box layout, embedded custom fonts, and my site’s theme colors in the generated design without having to spin up a headless browser, like folks have done for this feature in the past. I opted out of using the JSX syntax for relative simplicity and efficiency when running the script, so the template can be a bit confusing to follow at first:

```js
function buildCard({ title, type, date, description }) {
  const accent = COLOR.accent[type] ?? COLOR.ink
  const label = LABEL[type] ?? type ?? ''
  const dateStr = date
    ? new Date(date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    })
    : ''
  const titleSize = title.length > 70 ? 48 : title.length > 50 ? 56 : 72
  // Limit description to 150 characters and 2 lines
  const truncatedDesc = description
    ? description.substring(0, 150) + (description.length > 150 ? '...' : '')
    : ''

  return {
    type: 'div',
    props: {
      style: {
        width: 1200,
        height: 630,
        background: COLOR.bg,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '0px',
        fontFamily: 'Epilogue',
        boxSizing: 'border-box',
      },
      children: [
        // Top accent bar
        {
          type: 'div',
          props: {
            style: { width: '100%', height: 8, background: accent },
            children: '',
          },
        },
        // Main content
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              flex: 1,
              padding: '56px 80px 64px',
            },
            children: [
              // Type label
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'Syne',
                    fontSize: 20,
                    fontWeight: 800,
                    color: accent,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  },
                  children: label,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column'
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontSize: titleSize,
                          fontFamily: 'InstrumentSerif',
                          color: COLOR.ink,
                          lineHeight: 1.15,
                          maxWidth: 960,
                        },
                        children: title,
                      },
                    },
                    // Description (optional)
                    ...(truncatedDesc ? [{
                      type: 'div',
                      props: {
                        style: {
                          fontSize: 24,
                          fontWeight: 400,
                          color: COLOR.text2,
                          lineHeight: 1.4,
                          maxWidth: 960,
                          marginTop: 4,
                          display: 'flex',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        },
                        children: truncatedDesc,
                      },
                    }] : []),
                  ]
                }
              },
              // Title
              // Footer row
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontFamily: 'Syne',
                          fontSize: 28,
                          fontWeight: 800,
                          color: COLOR.ink,
                        },
                        children: 'HipsterBrown',
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: { fontSize: 18, color: COLOR.text3 },
                        children: dateStr,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  }
}
```

_Looks reminiscent of the early days of React before everyone used JSX by default. 😆_

That function is called with data for each content type or static page:

```js
async function generateForPost({ slug, title, type, date, description }) {
  const outputPath = join('_site', 'og', `${slug}.png`)
  mkdirSync(dirname(outputPath), { recursive: true })
  const png = await renderPng(buildCard({ title, type, date, description }))
  writeFileSync(outputPath, png)
  return outputPath
}
async function generateStatic(outputPath, { title, type, date, description }) {
  mkdirSync(dirname(outputPath), { recursive: true })
  const png = await renderPng(buildCard({ title, type, date, description }))
  writeFileSync(outputPath, png)
  return outputPath
}
```

The script gathers all the posts, along with their front-matter data using [gray-matter](https://npmx.dev/package/gray-matter), then iterates over each one to generate it’s associated image into the site build directory.

```js
const fileNames = readdirSync('training-data').filter(f => f.endsWith('.md'))
    const files = fileNames.map(f => join('training-data', f))
    const posts = files.flatMap((file) => {
      const { data } = matter(readFileSync(file, 'utf8'))
      if (data.draft) return []
      const slug = file.replace('training-data/', '').replace('.md', '')
      return [{ slug, ...data }]
    })
```


[Full OG generation script source](https://github.com/HipsterBrown/hipsterbrown.com/blob/main/scripts/generate-og-images.mjs)


Integration into 11ty comes in the `eleventy.after` lifecycle hook; once all the pages are generated. 
```js
config.on('eleventy.after', async () => {
    const { spawn } = require('child_process');
    return new Promise((resolve, reject) => {
      const proc = spawn('node', ['scripts/generate-og-images.mjs']);
      proc.on('close', (code) => {
        if (code === 0) resolve();
        else reject(new Error(`OG generation failed with code ${code}`));
      });
    });
  });
```

Generating the pages and images for my site takes about 6 seconds in CI, so I’m currently keeping the images for content collections out of git. This removes the concern of keeping track of which images have been generated already or regenerating them all manually if I decide to update the design. 

Overall, I’m happy with how quick and easy this works once it was all in place. I’m looking forward to playing around with the design a bit more in the future, but it’s in a good enough place for now.

If you’ve added this feature to your site in some other way, reach out and let me know how you did it.

Happy Building!
