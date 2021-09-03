---
layout: musing
title: Components for Everyone
draft: true
description: With the adoption of component-driven architecture in JS frameworks, how can server-side applications take advantage of a similar workflow in their native languages?
categories:
- musings
- musing
tags:
- dev
- components

---

JS frameworks have taken off due to the component abstraction enabled workflow out of the box. Tools like NextJS, Nuxt, Gatsby, and SvelteKit are built upon JS frameworks and have become popular due to this abstraction. There are some exceptions coming from places like Bridgetown, which have created a Liquid component and support ViewComponent (as popularized by GitHub/Rails). 

SSR doesn’t count because it still requires JS as the platform to render to HTML and context switching from other languages. 

Other examples of server-driven component workflows:

- Blade components (https://dev.to/ericchapman/laravel-blade-components-5c9c)
- liquid components (https://www.bridgetownrb.com/docs/components/liquid)
- Django Unicorn components (https://www.django-unicorn.com/)
- Blazor .Net components (https://docs.microsoft.com/en-us/dotnet/architecture/blazor-for-web-forms-developers/components)
- Marko components integrate with express/fastify/koa 🤷‍♂️ 

Workflow tooling:

- storybook (or some type of isolated development playground)
- Unit testing
- Packaging (can they ship as a reusable resource/gem/pub)
- Sidecar assets (?)

What about web components?

- requires JS
- Hard to SSR
- Nice for “hybrid components” when combined with server-driven templating component frameworks (https://www.bridgetownrb.com/docs/components#hybrid-components)

