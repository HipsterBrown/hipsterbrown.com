---
layout: musing
title: End-to-End Testing for Everyone
description: An overview of browser testing experiences in web frameworks
draft: true
categories:
- musings
- musing
tags:
- dev
- testing
---

In the same vein as my ["Components for Everyone" post](../Components-for-Everyone), I've been digging into the developer experience of providing end-to-end (E2E) test coverage in web applications. This was inspired by my work on implementing the [RealWorld example app](https://github.com/gothinkster/realworld) with [AdonisJS](https://adonisjs.com/), which I'll cover later in this piece.

## Background

<!-- what is end-to-end testing? -->

<!-- why does it matter -->

## Workflow

<!-- what is the expected workflow -->

- should feel native to the language of the framework to allow for little context switching and use of built-in tools like database factories
- should automate the things that can be automated, like starting the web server and performing necessary migrations

## Implementation

<!-- PHP / Laravel Dusk -->

[Laravel Dusk](https://laravel.com/docs/9.x/dusk#introduction)

<!-- Ruby / Rails system tests -->

[Rails system tests](https://guides.rubyonrails.org/testing.html#system-testing)
[Rspec system specs](https://relishapp.com/rspec/rspec-rails/v/3-7/docs/system-specs/system-spec)

[Playwright bindings for Ruby (?)](https://github.com/YusukeIwaki/playwright-ruby-client)

<!-- Python / django LiveServerTestCase -->

[Djano LiveServerTestCase](https://docs.djangoproject.com/en/4.1/topics/testing/tools/#liveservertestcase)

<!-- C# / .Net Playwright -->

[Playwright for .Net](https://playwright.dev/dotnet/docs/intro)

<!-- Elixir / Phoenix  --> 

[Elixir w/ Hound](https://semaphoreci.com/community/tutorials/end-to-end-testing-in-elixir-with-hound)

<!-- JS / Node -->

[AdonisJS](https://docs.adonisjs.com/guides/testing/introduction)

[Playwright](https://playwright.dev/docs/intro)

[Cypress](https://www.cypress.io/)

## Summary

<!-- what can be improved? -->

<!-- what's right for you> -->
