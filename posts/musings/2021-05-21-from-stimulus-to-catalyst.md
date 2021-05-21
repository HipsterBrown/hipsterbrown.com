---
layout: musing
title: Replacing Stimulus with Catalyst
description: Custom elements powered by Github's catalyst library are a great replacement for Stimulus controllers
draft: true
categories:
- musings
- musing
tags:
- dev
- stimulus
- custom elements
- catalyst

---

// Stimulus is a good idea for organizing JS sprinkles

// GitHub's catalyst is a custom elements helper library inspired by the Stimulus API while leveraging the native web platform.

// Custom elements are more portable than stimulus controllers since they can be defined / registered individually
// i.e. import '@github/elements/tab-nav' and now you have access to the custom element

// Nice coupling between parent components and child components for implicit targets and actions

// _Feels_ better than `data-controller` usage willy-nilly about your templates, easier to spot usage in templates

// Can potentially integrate into other view layers much more seamlessly than stimulus controllers
// use a copy-to-clipboard element within a React feature without worrying about re-implementing that functionality, communicate through events

// Downside: composing behaviors on a single element, following single responsibility principle, allowed by multiple values to data-controller. No such ability for custom elements, other than extending the element classes or wrapping different elements with other custom elements

// Not meant for replacing React, Vue, Svelte, Glimmer components in this use case

// Better TypeScript support for target and attr getters than Simulus using decorators, rather than implicit naming magic

// Caveats: accessing child targets within the `connectedCallback` lifecycle method can be trickier than the `connect` method for Stimulus

// Great docs, explaining each concept and how to do it without TS / decorators

// Ironically, leans into how Turbo mostly integrates behavior into templates, adding client-side behavior through custom elements, rather than Stimulus controllers like stimulus-reflex

// Show an example tab-nav element in Codepen demo using TS, skypack, etc.

// Caveat/Downside: Catalyst elements can only extend HTMLElement due to limitations of Safari and potential brittleness of built-in element APIs, potentially meaning extra markup unless shadowDom template is included in custom element
