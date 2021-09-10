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

## Background

Recently, I've started to form the opinion client-side JS libraries, like Vue, React, Svelte, etc\*, have grown in adoption and popularity due to component-driven view architecture more than any other feature they offer. I believe this core abstraction is key to why larger frameworks, like NextJS, Nuxt, Gatsby, and SvelteKit, are built on top of those libraries with a target of static site generation (SSG) or server-side rendering (SSR).

For context, I've been using React for ~6 years (starting as the view layer replacement for a [Backbone](https://backbonejs.org/) app) and currently work on a front end platform team that supports product squads using Rails and/or React to develop client-side features, depending on the experience of the team and requirements of the feature. Before adopting React a couple of years ago, we used a Ruby component abstraction heavily inspired by [`komponent`](https://github.com/komposable/komponent). This Component class allowed us to create a shared gem of design system components\*\* for use across our production Rails applications. Even with React in active use, we still have this Ruby abstraction and are starting to adopt [ViewComponent](https://viewcomponent.org) in its place to resolve issues around lack of documentation and surrounding tooling expected by devs who have used component-driven frameworks in the past, i.e. [Storybook](https://storybook.js.org/); both of those last points are addressed by ViewComponent and the community around it.

With that in mind, I wondered how many other teams chose to build features using a client-side JS framework for that framework's component model, consciously or not. Because the more I used this server-side component system, the more I recognized the things I liked about building React components without the need to context switch between Ruby and JavaScript in a single feature. 

So I did some [lazy web](https://www.urbandictionary.com/define.php?term=lazyweb) research on Twitter to see if other folks thought about this subject; if so, where are they seeing this workflow in other frameworks?

https://twitter.com/hipsterbrown/status/1433792423973605397?s=20

No one provided any other examples, while some mentioned using SSR-only with one of the popular JS libraries I mentioned previously. But there was enough engagement to continue exploring the wider web.

## Workflow

When I refer to "component-driven view architecture", I am including the surrounding ecosystem of patterns and tooling as motivation for its accession:

- isolated development playground (Storybook / Pattern Lab)
- unit testing
- packaging (ship as a reusable resource/gem/pub)
- sidecar assets (easily scope styles and behavior)

Each of those values can help scale the efficiency of teams building user interfaces, no matter the platform technology. Taking a look at open source design system components from large Rails shops like [Primer](https://primer.style/) from GitHub and [Polaris](https://polaris.shopify.com/components/get-started) from Shopify, the alternative to using JS components is usually collection of CSS classes, which can lead to inconsistent usage when applying them to markup. [Primer ViewComponents](https://primer.style/view-components/) are still fairly new when compared to the CSS and React implementations of that design system but solves the job of providing reusable pieces of UI in a familiar interface to Rubyists, including an interactive [Storybook](https://primer.style/view-components/stories/?path=/story/primer-button-group--button-group) using [`@storybook/server`](https://github.com/storybookjs/storybook/tree/next/app/server)!

Although I continue to mention the benefits in terms of design system components, they can also be appreciated within a single app codebase to share common functionality across features. 

## Implementations

**Ruby / Rails**

I have mentioned ViewComponent several times already, as the inspiration / motivation for this post. The docs do a great job explaining the philosophy behind the framework:

> Traditional Rails templates have an implicit interface, making it hard to reason about their dependencies. This can lead to subtle bugs when rendering the same template in different contexts.

[ViewComponent Data Flow](https://viewcomponent.org/#data-flow)

It has been growing in popularity since [its introduction by GitHub](https://github.blog/2020-12-15-encapsulating-ruby-on-rails-views/); looking at the open source projects using ViewComponent: [https://opensourcerails.org/search/by-gem/view_component](https://opensourcerails.org/search/by-gem/view_component)

But that's not the only solution on the block, especially when looking to build a static site. [Bridgetown](https://www.bridgetownrb.com/) bills itself as "a fast, scalable, modular, and thoroughly forward-looking framework for building websites and frontend applications" and a modern successor to [Jekyll](https://jekyllrb.com/). Although it also [supports ViewComponent](https://www.bridgetownrb.com/release/embracing-ruby-in-0.21/), the Bridgetown team is the first place I've seen an implementation of [components for the Liquid templating language](https://www.bridgetownrb.com/docs/components/liquid). [Liquid component](https://github.com/bridgetownrb/liquid-component) does not go as far as ViewComponent in providing a Ruby class as the interface for a component, but uses YAML front matter well to document and describe pieces of reusable view logic.

**PHP / Laravel**

It appears there has been a concept of "components" in Laravel's Blade templates system since [version 5.4](https://laravel.com/docs/5.4/blade#components-and-slots); however they are more comparable to partials with support for slots until [version 7](https://laravel.com/docs/7.x/blade#components). This current iteration of Blade component is backed by a PHP class with an associated template (or an [inline component view](https://laravel.com/docs/8.x/blade#inline-component-views)), which is more similar to ViewComponent. These components are rendered using a familiar kebab-case, HTML tag-like syntax: `<x-alert>`.

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

Previously, it seemed like NodeJS devs didn't invest in a server-side component framework because existing client-side libraries could be worked into the SSR pipeline; why reinvent the wheel? There is less of a context switch in terms of syntax when compared to the workflows of other web languages, so the friction lies in the [uncanny valley](https://crystallize.com/blog/frontend-performance-react-ssr-and-the-uncanny-valley) of managing a client-side component system in a traditional server application.

Who knows where the future is headed in this use case? Could there be some type of [mustache.js](https://github.com/janl/mustache.js/) extension or [Handlebars](https://handlebarsjs.com/) helper for rendering a JavaScript class in a template? That could be pretty neat!


## Summary

This is not a post to bash or denigrate client-side component frameworks; I love developing front end applications with JavaScript and will continue to do so. But choosing to build with that stack comes with additional complexity that not every team is ready to handle, so there should be useful alternatives for server-rendered ecosystems and take advantage of that environment. I hope we see more tools like [Storybook Server](https://www.npmjs.com/package/@storybook/server) being used to develop those server components in isolation and generate documentation for easier discoverability.

If I missed something, like an example implementation or assumed detail, please reach out on [Twitter](https://twitter.com/hipsterbronw) to help me correct it here.

\* I purposely left out more complete frameworks like Ember and Angular since they focus on shipping full client-side applications out of the box.

\*\* This was created before my time at the company but is explained well in this Rails Conf talk from 2018: [https://www.youtube.com/watch?v=Egumr5KiTNI](https://www.youtube.com/watch?v=Egumr5KiTNI)
