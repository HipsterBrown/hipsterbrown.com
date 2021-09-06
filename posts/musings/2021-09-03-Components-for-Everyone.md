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

Recently, I've started to form the opinion client-side JS libraries, like Vue, React, Svelte, Ember, Angular, etc, have grown in adoption and popularity due to component-driven view architecture more than any other feature they offer. I believe this core abstraction is key to why larger frameworks, like NextJS, Nuxt, Gatsby, and SvelteKit,  are built on top of those libraries with a target of static site generation or server-side rendering.

For context, I currently working on a front end platform team that supports teams using Rails and/or React to develop client-side features, depending on the experience of the team and requirements of the feature. Before adopting React, we used a Rails component abstraction heavily inspired by [`komponent`](https://github.com/komposable/komponent) to create a shared gem of design system components, as well as reusable ones within each application. We still have this abstraction and are starting to adopt [ViewComponent](https://viewcomponent.org) in its place. While our 


---------------------

### Research

JS frameworks have taken off due to the component abstraction enabled workflow out of the box. Tools like NextJS, Nuxt, Gatsby, and SvelteKit are built upon JS frameworks and have become popular due to this abstraction. There are some exceptions coming from places like Bridgetown, which have created a Liquid component and support ViewComponent (as popularized by GitHub/Rails). 

SSR doesn’t count because it still requires JS as the platform to render to HTML and context switching from other languages. 

Other examples of server-driven component workflows:

- Blade components (https://dev.to/ericchapman/laravel-blade-components-5c9c)
- liquid components (https://www.bridgetownrb.com/docs/components/liquid)
- Django Unicorn components (https://www.django-unicorn.com/)
- Blazor .Net components (https://docs.microsoft.com/en-us/dotnet/architecture/blazor-for-web-forms-developers/components)
- Marko components integrate with express/fastify/koa 🤷‍♂️ 
- Phoenix (Elixir) Surface components (https://surface-ui.org/) built on LiveComponent (https://hexdocs.pm/phoenix_live_view/Phoenix.LiveComponent.html#content), while Phoenix.Component exists as the base (https://hexdocs.pm/phoenix_live_view/Phoenix.Component.html#content)

Codebases using ViewComponent: https://opensourcerails.org/search/by-gem/view_component
Design System components built with ViewComponent: https://primer.style/view-components/


Workflow tooling:

- storybook (or some type of isolated development playground)
- Unit testing
- Packaging (can they ship as a reusable resource/gem/pub)
- Sidecar assets (?)

What about web components?

- requires JS
- Hard to SSR
- Nice for “hybrid components” when combined with server-driven templating component frameworks (https://www.bridgetownrb.com/docs/components#hybrid-components)

