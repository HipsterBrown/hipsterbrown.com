---
layout: musing
title: Islands on the Rails
description: An evolution of implementing "islands of richness" in a Ruby on Rails application
categories:
- musings
- musing
tags:
- dev
- islands
- rails
- vite
- web components
---

Given the renewed conversation around ["Islands Architecture"](https://jasonformat.com/islands-architecture), related to the JS community's interest in frameworks like [Astro](https://astro.build/) & [iles](https://iles-docs.netlify.app/) as well as libraries like [Eleventy's `<is-land>` element](https://is-land.11ty.dev/), I thought I would reflect on how I've been working in a [Ruby on Rails](https://guides.rubyonrails.org/index.html) application that's been using this architecture since 2018; followed by how I think it can continue to evolve.

## Background

I learned about ["Islands Architecture"](https://jasonformat.com/islands-architecture) after joining [Betterment](https://www.betterment.com/) in 2019, where the implementation had been in production for at least 6 months as explorations into building richer, client-side experiences within the main Ruby on Rails app were starting to take hold. These "islands" were being built with [React](https://reactjs.org/) as the UI library of choice due to the mature tooling and community around it.

The goal of this work was to allow developers to embed components into their templates with minimal effort and provide a positive user experiences for Betterment customers. To support a positive _developer_ experience while working on the React components, the code was isolated as an internal npm package within the same repo as the Rails application using [Yarn v1 workspaces](https://classic.yarnpkg.com/en/docs/workspaces).

The package directory was bootstrapped with [Create React App](https://create-react-app.dev/) to reduce [bike-shedding](https://en.wiktionary.org/wiki/bikeshedding) the related bundling, linting, and testing tooling for the project. The separate workspace also allowed for setting up [Storybook](https://storybook.js.org/) for rapid visual feedback without running the entire Rails application. The Rails app could consume the internal package like any other from npm and be none-the-wiser to how it was built (for the most part). As this setup solidified, it was adopted by nearly every consumer-facing Rails app within the company.

## Workflow

So how does it all work?

Well, the core library for bridging the two worlds is [StimulusJS](https://stimulus.hotwired.dev/). Betterment had already been using Stimulus for adding "sprinkles" of client-side behavior to server-rendered features for a while, so it made sense to adopt it as the mechanism for declaring "islands" within the Rails templates. Stimulus controllers are JS classes that are registered with a single "Application" object that instantiates those classes when it sees a matching `data-controller` attribute in the DOM. The controllers have lifecycle methods for when it has been "connected", or bound to the element with the `data-controller` attribute, among others.

Through this functionality, a "ReactAppController" was created to mount a React component to the bound element whenever it was declared in a Rails template; the element would also have a `data-react-app-name` attribute to select the particular component for that island based on a map of registered components. Initial props could even be passed to the React component as a JSON string parsed by the controller before rendering the component.

```ts
// react-app-controller.tsx
import { Controller } from 'stimulus';
import React from 'react';
import { render } from 'react-dom';
import registry from '../registry';

export default class extends Controller {
  connect() {
    const App = this.app;

    if (App) {
      render(<App {...this.initialProps} />, this.element);
    } else {
      console.warn(`Could not resolve app with name: '${this.name}'`);
    }
  }

  get app() {
    return registry.getApp(this.name || '');
  }

  get name() {
    return this.data.get('name');
  }

  get initialProps() {
    return JSON.parse(this.data.get('initial-props') || '{}');
  }
}
```
_We referred to these components as "apps" since "islands" was not as well-known at the time_

The Rails view usage:

```erb
<div data-controller="react-app" data-react-app-name="thing" data-react-app-initial-props="<%= @initial_props %>"></div>
```

[View full example project based on this commit](https://github.com/HipsterBrown/rails-react-playground/tree/edd29d0eef8783148796784a4b39891929624e24)

To abstract over the implementation details of data attributes and make it feel more native to the application, a Rails UI component was created. We had an [internal gem for this purpose](https://www.betterment.com/engineering/design-components-rails), but there is an open-source approximation that covers this need called [ViewComponent](https://viewcomponent.org/).

```ruby
class ReactAppComponent < ViewComponent::Base
  def initialize(name:, initial_props:)
    @name = name
    @initial_props = initial_props.to_json
  end
end
```

The associated template file for that component, which should look familiar:

```erb
<div data-controller="react-app" data-react-app-name="<%= @name %>" data-react-app-initial-props="<%= @initial_props %>"></div>
```

The Rails view usage:

```erb
<%= render ReactAppComponent.new(name: "thing", initial_props: @initial_props)  %>
```

[View full example project based on this commit](https://github.com/HipsterBrown/rails-react-playground/tree/739041d6303780938adab96d311303e4585dd027)

With these pieces in place, teams could build new components, register them, and drop them into a Rails template without worrying about conflicting with another team's work.

## In Practice

The ability to drop React components into Rails views stretched the definition of an "island" as teams used them in a variety of features, from interactive form elements for cropping images to complete page and routing takeovers. The system evolved slightly to handle the growing "registry" of components to ensure the size of the core JS bundle wasn't unmanageable by [dynamically importing components and lazily-loading them](https://reactjs.org/docs/code-splitting.html#reactlazy) within the Stimulus controller:

```tsx
export default class extends Controller {
  connect() {
    const App = this.app;

    if (App) {
      render(
        <Suspense fallback="Loading...">
          <App {...this.initialProps} />
        </Suspense>,
        this.element
      );
    } else {
      console.warn(`Could not resolve app with name: '${this.name}'`);
    }
  }

  get app() {
    return registry.getApp(this.name || '');
  }

  get name() {
    return this.data.get('name');
  }

  get initialProps() {
    return JSON.parse(this.data.get('initial-props') || '{}');
  }
}
```

The fallback behavior could eventually be configured from the Rails template so customers didn't just see "Loading..." while they waited for an experience to appear.

[View full example project based on this commit](https://github.com/HipsterBrown/rails-react-playground/tree/aa0dfd6ca65fe9d9d2e5e3f08072ea8121947e2d)

Adding this lazy-loading behavior actually exposed a point of friction in the tooling setup; there wasn't a source of truth for sharing fixes or new functionality across the applications using the islands architecture, so each workspace had to be individually updated with this new behavior. The Stimulus controller relied on a reference to a local "registry" of components that was manually created for each workspace, which had to be registered with a central Stimulus Application. The code-splitting feature also relied on [Webpacker](https://guides.rubyonrails.org/webpacker.html) to process the dynamic import statements within the internal package source code to "chunk" the bundle correctly, which was a deprecated feature of the gem before the entire gem was eventually deprecated with the release of Rails 7. So if any existing or new app wanted to use islands, there was a tedious scaffolding process to go through first; usually through copy-pasting files across codebases or directories and hoping it worked.

With the writing on the wall about the next generation of JS tooling and [Rails asset management](https://guides.rubyonrails.org/working_with_javascript_in_rails.html), it's time to consider how "Islands on Rails" could evolve to solve the shortcomings listed above while taking advantage of new patterns.

## Looking Forward

To summarize the core concerns to be addressed:

- portability of JS controller to mount React islands
- manual setup and registration of islands in each workspace

Starting with the portability problem, the web has had a solution for many years that works across all modern browsers: custom elements! If the earlier description of how Stimulus controllers work sounded familiar, then you've probably built a custom element before. Custom elements don't need to contain styles or HTML; they can just be classes that encapsulate behavior and are associated with a unique tag in some HTML. Just like Stimulus controllers, they are registered with a central object known as the `CustomElementRegistry` that is provided by the DOM instead of the application itself.

```ts
class ReactIslandElement extends HTMLElement {
  connectedCallback() {
    const App = this.app;

    if (App) {
      render(
        <Suspense fallback="Loading...">
          <App {...this.initialProps} />
        </Suspense>,
        this
      );
    } else {
      console.warn(`Could not resolve app with name: '${this.name}'`);
    }
  }

  get app() {
    return registry.getApp(this.name || '');
  }

  get name() {
    return this.dataset.name;
  }

  get initialProps() {
    return JSON.parse(this.dataset.initialProps || '{}');
  }
}

customElements.define('react-island', ReactIslandElement)
```
_Using Island here to lean into the concept a bit more_

This should nearly identical to the Stimulus implementation because they share a lot of similar properties, like the lifecycle method for when the class is bound to the DOM; it just needed a few changes for getting data attributes and updating `this.element` to `this` since the class itself _is a reference to the DOM element_. No third-party dependencies required and using it in a Rails templates is even simpler:

```erb
<react-island data-name="thing" data-initial-props="<%= @initial_props %>"></react-island>
```

If you're working with a team that is familiar with Stimulus, there is a lightweight library that provides similar semantics through TypeScript decorators called [`@github/catalyst`](https://github.github.io/catalyst/guide/introduction/). It will also reduce some of the boilerplate for working with data attributes and defining the element:

```ts
import { controller, attr } from '@github/catalyst';

@controller
class ReactIslandElement extends HTMLElement {
  @attr name = '';
  @attr props = '{}';

  connectedCallback() {
    const App = this.app;

    if (App) {
      render(
        <Suspense fallback="Loading...">
          <App {...this.initialProps} />
        </Suspense>,
        this
      );
    } else {
      console.warn(`Could not resolve app with name: '${this.name}'`);
    }
  }

  get app() {
    return registry.getApp(this.name);
  }

  get initialProps() {
    return JSON.parse(this.props);
  }
}
```

Using the documented conventions of the catalyst project, the `ReactIslandElement` will automatically be defined as `react-island` through the `@controller` decorator. Catalyst also comes with a useful feature I haven't seen in the Stimulus ecosystem yet: [lazily-defined controllers](). Using the `lazyDefine` function and a dynamic import statement, we start to get an experience similar to the [`<is-land>` element from 11ty](https://is-land.11ty.dev/) where the loading can be delayed based on certain events:

```ts
import { lazyDefine} from '@github/catalyst';
lazyDefine('react-island', () => import('./src/elements/react-island'));
```

```erb
<react-island data-load-on="visible" data-name="thing" data-initial-props="<%= @initial_props %>"></react-island>
```

Now the code for the island won't be loaded until the element is visible on the page! For any Rails app using the `ReactAppComponent` ViewComponent, this is a single update to the component's template as an implementation detail.

Now that there is a native way of providing the "island" behavior to the applications, how can it be packaged up into a reusable module for each workspace so island component registries don't need to be manually created for the custom element to use?

Drawing inspiration from Stimulus once again, there are helper modules like [`@hotwired/stimulus-webpack-helpers`](https://github.com/hotwired/stimulus-webpack-helpers) and [`stimulus-vite-helpers`](https://github.com/ElMassimo/stimulus-vite-helpers) that allow for dynamically loading and registering Stimulus controllers at build time by using specific syntax for ["globbing"](https://en.wikipedia.org/wiki/Glob_(programming)) files within a project. Looking at the Vite implementation more specifically, which extends the [modern ESM import syntax](https://vitejs.dev/guide/features.html#glob-import), we could provide a module that takes in a "glob" of React island components to lazily import and provide as a registry to the `ReactIslandElement`:

```ts
// registry.ts
// fake package name used as an example
import { generateIslandRegistry } from 'react-islands'

const islands = import.meta.glob(['/**/islands/*.tsx', '/**/islands/*.jsx']);

const { getIsland } = generateIslandRegistry(islands)
// verbosity used for clarity
export { getIsland };
```
_Renaming `getApp` to `getIsland` in this new implementation for the sake of consistency and clarity._

This module defines a convention of collecting all components within an "islands" directory in the workspace, similar to [Fresh](https://fresh.deno.dev/) from Deno. With this in place, any new islands added to the matching directory would be automatically registered and available to embed in the Rails app; however, this all still feels like boilerplate for each new workspace to scaffold. If we're already using a build tool to enable this feature, why not generate this boilerplate at build time?

The list of [community plugins for Vite](https://github.com/vitejs/awesome-vite#plugins) provides some examples of extending the bundler to provide [virtual modules](https://vitejs.dev/guide/api-plugin.html#virtual-modules-convention) to a project. The plugin could generate the custom element and dynamic registry code as the single source of truth for React islands functionality. Each workspace would be set up in two files:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { reactIslands } from 'vite-plugin-react-islands'

export default defineConfig({
  plugins: [react(), reactIslands()],
  // rest of the config specific to the workspace
```
_[plugin implementation source](https://github.com/HipsterBrown/rails-react-playground/blob/ea1de03a2d20357d0c843abe4a670ad72af0438c/@playground/vite-plugin-react-islands/src/index.ts#L3)_

```ts
// src/index.ts (entrypoint for the project)
import 'virtual:react-islands';
```
_The `virtual:` prefix is following Vite conventions for generated modules_

Now any updates to the custom element or registry can be released through the plugin! If the project didn't want the separate JS workspace, the same setup could be applied to the Rails app through [Vite Ruby](https://vite-ruby.netlify.app/) as well.

Overall, this feels like the right level of abstraction and quality-of-life improvement from the original setup while looking to the future of the web and JS tooling. You can find a [complete example repo of this architecture on GitHub](https://github.com/HipsterBrown/rails-react-playground) to try it out yourself. The Vite plugin is only an internal package to that repo at the moment; it could eventually be updated and published to support a variety of build tools through the [unified plugin system](https://github.com/unjs/unplugin).

If you learned something new, found this interesting, or have ideas about how it could be improved, please let me know on Twitter [@hipsterbrown](https://twitter.com/hipsterbrown).  Cheers & happy building!


**Bonus**

If you made it this far and like the concept but want something a bit lighter than React for your islands, I have a branch of the repo to provide [Preact in Rails](https://github.com/HipsterBrown/rails-react-playground/tree/preact); it can be compatible with the React implementation while being smaller in bundle size than the `react` package by itself. There are trade-offs to consider that is probably a whole separate blog post to discover.

