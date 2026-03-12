import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import matter from 'gray-matter'
import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'

// ─── Fonts ────────────────────────────────────────────────────────────────────

const fonts = [
  {
    name: 'Syne',
    data: readFileSync('./scripts/fonts/Syne-ExtraBold.ttf'),
    weight: 800,
    style: 'normal',
  },
  {
    name: 'Epilogue',
    data: readFileSync('./scripts/fonts/Epilogue-Regular.ttf'),
    weight: 400,
    style: 'normal',
  },
  {
    name: 'Epilogue',
    data: readFileSync('./scripts/fonts/Epilogue-SemiBold.ttf'),
    weight: 600,
    style: 'normal',
  },
  {
    name: 'InstrumentSerif',
    data: readFileSync('./scripts/fonts/InstrumentSerif-Regular.ttf'),
    weight: 400,
    style: 'normal',
  },
]

// ─── Design tokens ────────────────────────────────────────────────────────────

const COLOR = {
  bg: '#F7F3EC',
  ink: '#1A1510',
  text2: '#5A5248',
  text3: '#9A9088',
  accent: {
    'long-form': '#2D6A4F',
    'til': '#3D7A5F',
    'link': '#C24D2C',
    'note': '#C24D2C',
    'talk': '#8B6914',
    'video': '#8B6914',
    'audio': '#8B6914',
  },
}

const LABEL = {
  'long-form': 'Long Form',
  'til': 'TIL',
  'link': 'Link',
  'note': 'Note',
  'talk': 'Talk',
  'video': 'Video',
  'audio': 'Audio',
}

// ─── Card template ────────────────────────────────────────────────────────────

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

// ─── Render ───────────────────────────────────────────────────────────────────

async function renderPng(card) {
  const svg = await satori(card, {
    width: 1200,
    height: 630,
    fonts,
  })
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
  return resvg.render().asPng()
}

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

// ─── Entry point ──────────────────────────────────────────────────────────────

const isStatic = process.argv.includes('--static')

await (async () => {
  if (isStatic) {
    // Generate static images for landing pages
    const staticCards = [
      { file: 'assets/og/homepage.png', title: 'Building where web meets the physical world', type: null, date: null, description: 'I make things, break things, and teach what I learn' },
      { file: 'assets/og/projects.png', title: 'Projects', type: null, date: null },
      { file: 'assets/og/speaking.png', title: 'Speaking', type: null, date: null },
      { file: 'assets/og/training-data.png', title: 'Training Data', type: null, date: null, description: 'Sharing what I learn with the world and the robots.' },
      { file: 'assets/og/default.png', title: 'Building where web meets the physical world', type: null, date: null, description: 'I make things, break things, and teach what I learn' },
    ]

    let count = 0
    for (const { file, title, type, date, description } of staticCards) {
      await generateStatic(file, { title, type, date, description })
      console.log(`✓ ${file}`)
      count++
    }
    console.log(`\nGenerated ${count} static OG images.`)
  } else {
    // Generate dynamic images for Training Data posts
    const fileNames = readdirSync('training-data').filter(f => f.endsWith('.md'))
    const files = fileNames.map(f => join('training-data', f))
    const posts = files.flatMap((file) => {
      const { data } = matter(readFileSync(file, 'utf8'))
      if (data.draft) return []
      const slug = file.replace('training-data/', '').replace('.md', '')
      return [{ slug, ...data }]
    })

    if (posts.length === 0) {
      console.error('No posts found — is training-data/*.md populated?')
      process.exit(1)
    }

    let count = 0
    for (const post of posts) {
      // Strip date prefix (YYYY-MM-DD-) and convert to lowercase
      const cleanSlug = post.slug.replace(/^\d{4}-\d{2}-\d{2}-/, '').toLowerCase()
      const path = await generateForPost({ ...post, slug: cleanSlug })
      console.log(`✓ ${path}`)
      count++
    }
    console.log(`\nGenerated ${count} OG images.`)
  }
})()
