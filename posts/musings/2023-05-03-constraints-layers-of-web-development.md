---
layout: musing
title: The Many Layers of Web Development
description: Flexibility and choice is one of the greatest strengths of web development, as well as the core points of division across communities that build for browsers.
draft: true
categories:
- musings
- musing
tags:
- dev
- web
---

I've been building sites and applications for the Web for over a decade now, not to mention early tinkering with Xanga and MySpace theming previously. Over those years, one of the core lessons I've learned is that **there is not one singular way to build software for the Web.**

This lesson has become more and more true over time, as browsers and Web APIs continue to progress and providing technologies like [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components), [WebAssembly (WASM)](https://developer.mozilla.org/en-US/docs/WebAssembly), even [WebGPU](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API) most recently; various languages and frameworks have been built to target the web in order to ship software on the largest distribution platform in existence. Even within a single codebase, there could be multiple techniques for developing features that people can use across a plethora of devices.

These layers of functionality provide some initial context on how I consider building software for myself, for others, and with many teams of people.

## First Layer - Text / HTML

Plain text and its structured cousin, HTML, is the simplest format through which information is shared on the Web. A server can respond to requests for static text files, like the ones that power this site, and call it a day. This text could also be generated on the fly by a server to personalize the response based on some kind of context like an authenticated session or a form submission; but it is still "just text / HTML" in that response.

There is a seemingly-unending number of languages, frameworks, and tools that can power this layer of functionality. They can generate the static files, serve up dynamic response, or both! Take your pick and preference at this stage.

"Just HTML" can do quite a bit these days too! In addition to the classic anchor and form tags, it's been a while since [HTML5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5) became the standard for browsers to present [video](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) and [audio](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio) without requiring additional plugins and "applets." Additional elements like [dialogs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) and [details](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) can provide additional interactive capabilities to this static response layer.

Even this strong base is not enough to suit all the needs of every feature in an application.

## Second Layer - Augmented HTML

When HTML gets you most of the way, having a conventional set of JavaScript behavior to augment that existing markup can help bridge the gap. My first introduction to this concept was with the [Ruby on Rails unobstrusive scripting adapter](https://github.com/rails/rails/tree/main/actionview/app/javascript#ruby-on-rails-unobtrusive-scripting-adapter), also known as Rails UJS (or jquery-ujs for cross-browser compatibility back in the day). [UJS has been replaced by Turbo](https://guides.rubyonrails.org/working_with_javascript_in_rails.html#replacements-for-rails-ujs-functionality) in newer versions of Rails, and similar offerings can be found in other frameworks like [Livewire for Laravel](https://laravel-livewire.com/), [Phoenix LiveView](https://github.com/phoenixframework/phoenix_live_view), and [Django Unicorn](https://www.django-unicorn.com/docs/).

Other libraries like [htmx](https://htmx.org/), [Unpoly](https://unpoly.com/), [Alpine](https://alpinejs.dev/), and [petite-vue](https://github.com/vuejs/petite-vue) also occupy this layer. For the most part, they provide utilities that allow developers to stay in HTML to add client-side logic like conditions, state, and side effects. They can also enhance the standard browser behavior, like navigation and form submissions, to prevent full page reloads and improve perceived performance when available.

By augmenting the existing markup, it is still possible to author features in numerous languages and templating formats while keeping the additional complexity fairly minimal.

## Third Layer - Custom Behaviors

Once the needs of the application start to exceed the default behavior of the agumented HTML conventions, then it may be time to lean on some custom JavaScript. Many of libraries from the 2nd layer can be extended through programmatic hooks and events, so the custom behavior can be reused in a similar manner of augmenting the existing markup. This is also where libraries like [Stimulus](https://stimulus.hotwired.dev/) or native [custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_Components/Using_custom_elements) can be adopted as a structured API for creating these behaviors.

I view this as a separate layer (although the line can blur when pulling in a third-party library of behaviors / elements) because this is the point at which feature development moves away from "just HTML." This is also where client-side HTML generation can be introduced, although it is generally used in service of continuing to augment existing HTML.


## Fourth Layer - Client-side Rendering


## Fifth Layer (?) - WASM
