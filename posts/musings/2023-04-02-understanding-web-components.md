---
layout: musing
title: How I stopped worrying and started working with Web Components
description: After a few false starts, this is my current perception of web component as an extensible format and target for composable pieces of UI.
draft: true
categories:
- musings
- musing
tags:
- dev
- components
---

_TL;DR Web components are a great realization of the [Extensible Web Manifesto](https://github.com/extensibleweb/manifesto) by providing backward-compatible building blocks to use as a target for providing composable, interactive layers for user interfaces, rather than a complete replacement for existing frontend frameworks as a standalone technology._

## Background

<!-- a brief history of web components --> 

The long tale of Chrome dev leading the way with mixed interest across browser vendors and battling the IE hold on the world.

<!-- Polymer -->

Attempting to prove out web components as a platform for building rich client experiences to compete with Backbone, Ember, Angular, and React.

It was kind of odd to see it come out of the same company promoting Angular, but this was more from the Chrome dev folks rather than JS infra groups.

<!-- HTML Imports -->

Womp womp, never fully shipped. Would have been interesting to have pure HTML components w/o JS.

<!-- x-tag -->

Layering on the web component building blocks. Mozilla's entrant but Microsoft's charge.

<!-- my original take -->

These APIs are more work than writing React components. Why should I make my life harder?

## Layers

It took many years of gradually increased support, education, and adoption for me to realize the true nature of the web component spec as a format and platform target.

### Low-level Behaviors

If you've come from a world of [jQuery plugins](https://learn.jquery.com/plugins/) and [Stimulus controllers](https://stimulus.hotwired.dev/), you may have heard the term "client-side behavior" to refer to reusable logic for adding interactivity to existing HTML. This is often related to "progressive enhancement", as the initial HTML should still work while allowing for additional functionality when the behavior was available. 

<!-- raw custom element API -->
The fact that the core API for building custom elements doesn't require any visual output is probably a source of confusion when folks think about Web Components, but one of its greatest strengths as well. It reminds me of [BackboneJS Views](https://backbonejs.org/#View)

> A View is an atomic chunk of user interface. It often renders the data from a specific model, or number of models — but views can also be data-less chunks of UI that stand alone

Both of these APIs involve extending some base class (`Backbone.View` vs `HTMLElement`), have access to events, and can react to lifecycle methods. The key advantage for custom elements is the declarative nature of applying them to the HTML document; Backbone Views are initialized manually within JS and are configured to select matching elements at that time. Once a custom element is registered under a tag name, it will be initialized as soon as it appears in the DOM!

<!-- GitHub Elements -->
A significant example of applying this ability to a large scale application can be found with GitHub: ["How we use Web Components at GitHub"](https://github.blog/2021-05-04-how-we-use-web-components-at-github/)

> We chose to use Web Components because our codebase was already structured into component-like behaviors. Still, as the GitHub monolith grew in size, we saw the need to implement better encapsulations before the front-end became unmanageable – and Web Components fit the bill. Web Components offered better portability and encapsulation than our existing JavaScript behaviors

<!-- Catalyst -->
The linked post mentions [Catalyst](https://catalyst.rocks/) as their library for adding Stimulus-like conventions to these "controller" elements that lean on TypeScript and decorators for the developer experience. Although their open-source [github-elements collection](https://github.com/github/github-elements) does not use Catalyst, it can be extremely handy for teams that are familiar with this pattern and starting to learn about Web Components.

<!-- Turbo Frames & Streams -->
Along the lines of Stimulus, it is part of a group of related libraries under the "HTML Over The Wire" (HOTWire) moniker. Another key member of this group is Turbo, which makes heavy use of Web Components to encapsulate the behavior of [Turbo Frames](https://turbo.hotwired.dev/reference/frames) and [Turbo Streams](https://turbo.hotwired.dev/reference/streams). Neither of these elements provide any UI and are generally sprinkled throughout templates to create dynamic, client-side experiences defined on the server.

<!-- is-land by 11ty -->
The [`<is-land>` element](https://github.com/11ty/is-land) leans into the progressive enhancement angle of this layer; adding additional control over when client-side behaviors, including other custom elements, are initialized and fallback content before that before is available.

<!-- spicy-section -->
Even [community standards groups](https://open-ui.org/) are using "headless" Web Components to trial new elements to be built into the browser, see [`<spicy-sections>`](https://github.com/tabvengers/spicy-sections) to help prove out an extensible "tabs" element. This core building block is so minimal and just enough for starting the adoption of Web Components.


### UI Components

This is usually what comes to mind when web components are mentioned, and tend to be what are referenced when learning about them for the first time. This layer brings together the trinity of Web Component APIs: Custom elements, ShadowDOM for scoped styles, and template fragments.

<!-- scoped styles with Shadown DOM -->

<!-- design system implementations -->

<!-- Lightning Web Components -->

<!-- Lion by ING -->

<!-- Carbon Web Components -->

<!-- Shoelace -->

<!-- Lion design system -->

<!-- Material design -->

<!-- Nord Design System -->

<!-- Spectrum web components -->

### Distribution Format

Given how much third-party code runs on a lot of sites on the Internet, portability is a massive bonus for web components as a target format. Rather than script tags that need additional code to be initialized or attempt to self-bootstrap and defensively query the document for the magic ID / class / data attribute, companies can create clean integrations with a script from a CDN and some custom elements dropped into a page.

<!-- Mux Player -->

<!-- Stoplight elements -->

<!-- py-script component -->

### Templating Format

Driven by the renewed interest in server-rendered sites and applications, the Web Component spec is playing catch-up through the Declarative ShadowDOM proposal. However, some folks are eschewing ShadowDOM and iterating on their own strategies for providing "HTML-first" components that are enhanced on available clients. 

<!-- webc -->

<!-- wcc -->

<!-- enhance -->

<!-- Bridgetown Lit renderer -->

### Client UI Framework

This is where we reach the contentious and hype-driven world of sites vs application frameworks. Some of these projects are the basis for the UI components layer while having an ecosystem of patterns and tooling around them to make them platforms on their own. They can range from an improved DX layer on top of Web Components to site generators and frontend frameworks.

<!-- Lit -->

<!-- 11ty -->

<!-- Rocket -->

<!-- Stencil -->

<!-- Hybrids -->

<!-- Vue, Solid, Mitosis -->

## Summary

Stop worrying and start targeting web components for client-side UI features. Although the pace of innovation seems to be speeding up and leaving the standards behind, they are called standards for a reason. They will exist on the Web Platform for years to come and continue to improve as much as we care to improve it. I think we're getting close to a world where it is expected of frameworks to ship web components as the output from their compiler or underlying basis for their component model. The differentiation will be lifted to a higher level as state management and data fetching patterns continue their trip around the hype cycle.

<!-- Learning materials, like Frontend Masters, Egghead.io, MDN -->
At the very least, it doesn't hurt to start becoming familiar with the APIs in the same way you would learn `fetch` but continue to use an abstraction on top.
