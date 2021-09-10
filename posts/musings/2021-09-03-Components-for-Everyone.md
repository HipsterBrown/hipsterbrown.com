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

_TL;DR This is not about web components / custom elements, rather why component-driven architecture for traditional server-rendered apps could be a better solution than adopting a client-side framework._

## Theory

Recently, I've started to form the opinion client-side JS libraries, like Vue, React, Svelte, Ember, Angular, etc, have grown in adoption and popularity due to component-driven view architecture more than any other feature they offer. I believe this core abstraction is key to why larger frameworks, like NextJS, Nuxt, Gatsby, and SvelteKit, are built on top of those libraries with a target of static site generation or server-side rendering.

For context, I currently working on a front end platform team that supports teams using Rails and/or React to develop client-side features, depending on the experience of the team and requirements of the feature. Before adopting React, we used a Rails component abstraction heavily inspired by [`komponent`](https://github.com/komposable/komponent) to create a shared gem of design system components, as well as reusable ones within each application. We still have this abstraction and are starting to adopt [ViewComponent](https://viewcomponent.org) in its place. While our home-grown approach did not reach a critical level of usage, that was mostly due to lack of documentation and surrounding tooling expected by devs who have used component-driven frameworks in the past, i.e. [Storybook](https://storybook.js.org/); both of those last points are addressed by ViewComponent and the community around it.

With that in mind, I wondered how many other teams chose to build features using a client-side JS framework for that framework's component model, consciously or not. Because the more I used this server-side component system, the more I recognized the things I liked about building React components. 

So I did some [lazy web](https://www.urbandictionary.com/define.php?term=lazyweb) research on Twitter to see if other folks thought about this subject as well. If so, where are they seeing this workflow in other frameworks?

https://twitter.com/hipsterbrown/status/1433792423973605397?s=20

No one provided any other examples, while some mentioned using [SSR](https://www.netlify.com/blog/2020/12/02/next.js-should-i-use-ssr-or-ssg/) only with one of the popular JS libraries I mentioned previously. But there was enough engagement to continue exploring the wider web.

## Workflow expectations:

<br />

- storybook (or some type of isolated development playground)
- Unit testing
- Packaging (can they ship as a reusable resource/gem/pub)
- Sidecar assets (?)

<br />

## Language implementations

**Ruby / Rails**

I have mentioned ViewComponent already, as the inspiration / motivation for this post. The docs do a great job explaining the philosophy behind the framework:

> Traditional Rails templates have an implicit interface, making it hard to reason about their dependencies. This can lead to subtle bugs when rendering the same template in different contexts.

[ViewComponent Data Flow](https://viewcomponent.org/#data-flow)

Codebases using ViewComponent: [https://opensourcerails.org/search/by-gem/view_component](https://opensourcerails.org/search/by-gem/view_component)

Design System components built with ViewComponent: [https://primer.style/view-components/](https://primer.style/view-components/)

But that's not the only solution on the block, especially when looking to build a static site. [Bridgetown](https://www.bridgetownrb.com/) bills itself as "a fast, scalable, modular, and thoroughly forward-looking framework for building websites and frontend applications" and a modern successor to [Jekyll](https://jekyllrb.com/). Although it also [supports ViewComponent](https://www.bridgetownrb.com/release/embracing-ruby-in-0.21/), the Bridgetown team is the first place I've seen an implementation of [components for the Liquid templating language](https://www.bridgetownrb.com/docs/components/liquid). [Liquid component](https://github.com/bridgetownrb/liquid-component) does not go as far as ViewComponent in providing a Ruby class as the interface for a component, but uses YAML front matter well to document and describe pieces of reusable view logic.

**PHP / Laravel**

Even though it appears there has been a concept of "components" in Laravel's Blade templates system since [version 5.4](https://laravel.com/docs/5.4/blade#components-and-slots), they are more comparable to partials with support for slots until [version 7](https://laravel.com/docs/7.x/blade#components). This current iteration of Blade component is backed by a PHP class with an associated template (or an [inline component view](https://laravel.com/docs/8.x/blade#inline-component-views)), which is more similar to ViewComponent. These components are rendered using a familiar kebab-case, HTML tag-like syntax: `<x-alert>`.

**Python / Django**

[`django-component`](https://gitlab.com/Mojeer/django_components) provides "declarative and composable components inspired by javascript frameworks". They are made up of a Python class and associated HTML template, like the previously mentioned ViewComponent and Blade components. 

There is also a library called [`slippers`](https://mitchel.me/slippers/), that reminds me of liquid components more than ViewComponent since they don't rely on some kind of class or backing data structure defined outside the template.

**.Net / Blazor**

As a modern replacement for Web Forms, [Blazor supports UI encapsulation through components](https://docs.microsoft.com/en-us/dotnet/architecture/blazor-for-web-forms-developers/components#use-components) using the [Razor templating language](https://docs.microsoft.com/en-us/aspnet/core/mvc/views/razor?view=aspnetcore-5.0) to define markup and logic in a single file; although that logic can be [broken out as a separate C# class](https://docs.microsoft.com/en-us/dotnet/architecture/blazor-for-web-forms-developers/components#code-behind).

**Elixir / Phoenix**

The [`Phoenix.Component` API](https://hexdocs.pm/phoenix_live_view/Phoenix.Component.html#content) allows Elixir developers to create function components, similar to [React](https://reactjs.org/docs/components-and-props.html#function-and-class-components), including ability to pass in "assigns" (props) and "blocks" (children).

[Surface UI](https://surface-ui.org/documentation) builds on top of the Phoenix component API to provide "a fast and productive solution to build modern web applications". It uses an extended templating syntax, helpful macros, and built-in components to become a more full-featured view framework for Phoenix applications.

**JS / Node**

Lastly, we get to the curious case of server-rendered component systems for NodeJS. The closest library in comparison to the previous examples is [Marko](https://markojs.com/), which allows developers to "start with simple HTML templates and add powerful components as needed". Marko templating can be integrated into [popular server libraries](https://markojs.com/docs/server-integrations-overview/) as the core view engine, rather than [forcing a typical client-side framework into that workflow](https://reactjs.org/docs/react-dom-server.html). There was an official view engine for [React in Express](https://github.com/reactjs/express-react-views), but it no longer appears actively supported; [React Server Components](https://reactjs.org/blog/2020/12/21/data-fetching-with-react-server-components.html) are also still theoretical at the time of writing.

There is active development in this space with the advent of tools like [Astro](https://astro.build/) and [Slinkity](https://slinkity.dev/) that aim to take a framework-agnostic approach to introduce components into modern, HTML-first static sites. Astro does a great job [comparing itself to existing tools](https://docs.astro.build/comparing-astro-vs-other-tools) and Slinkity is building on the shoulders of the awesome [Eleventy](https://www.11ty.dev/) ecosystem (slight bias given this site is currently built with Eleventy).

Previously, it seemed like NodeJS devs didn't invest in a server-side component framework because existing client-side libraries could be worked into the SSR pipeline; why reinvent the wheel? There is less of a context switch in terms of syntax when compared to the workflows of other web languages, so the friction lies in the [uncanny vallye](https://crystallize.com/blog/frontend-performance-react-ssr-and-the-uncanny-valley) of managing a client-side component system in a traditional server application.

Who knows where the future is headed in this use case? Could we see some type of [mustache.js](https://github.com/janl/mustache.js/) extension or [Handlebars](https://handlebarsjs.com/) helper for rendering a JavaScript class in a template? That could be pretty neat!

