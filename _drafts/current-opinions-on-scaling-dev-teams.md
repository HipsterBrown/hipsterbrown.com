---
layout: musing
title: My current opinions on scaling dev teams
description: After working across a few open source projects and product teams, there are a handful of systems and tooling that make a difference in terms of scaling the number of people working on the codebase and shipping features.
categories:
- musings
- musing
tags:
- dev
- people
- process

---

_These opinions are bound to change over time, so there's the grain of salt_

No priority given to order.

## Feature Flags

There are many options for conditional exposing new features in a codebase. The most scalable systems keep the source of truth for these concerns separate from the core application, either in specific tables or different services altogether. _Environment variables will not last long in this role, in my experience._

Luckily, there are quite a few options these days; open source or commerical, language specifc or generalized. [Test Track](https://github.com/Betterment/test_track) is the open source option with which I am most familiar because I use it every day at work. It is a separate service with integrations for Rails and JavaScript, as well as a handy CLI and web extension for managing flags locally. It supports turning on features for individuals and groups of visitors; not to mention the ability to A/B test with experiments.

[Flipper](https://github.com/jnunemaker/flipper) is another open source option, with the ability to upgrade to a hosted cloud service. Being used by GitHub is pretty good indication of its production scalability and appears to have many choices to adapt with your stack, as long as you're using Ruby.

[Unleash](https://docs.getunleash.io) has a pretty rich ecosystem of clients, both official and unofficials. Like Flipper, I don't have personal experience with this service, but it looks like a decent pick if I needed a more general solution for future projects.

[Launch Darkly](https://launchdarkly.com) has done a pretty good job advertising on all my tech podcasts because it's the only commerical alternative I could think of when considering this list. With apparent full coverage of client and server integrations, it would be hard to go wrong when looking for professional support for any application. 🤷‍♂️


## CSS utility & component system

- Tailwind & Tailwind UI
- Bootstrap (don't knock it until you try it)
- Foundation by Zurb
- Semantic UI
- Bulma


## CI -> CD

- Heroku
- Dokku
- Vercel
- Netlify
- Render
- GitOps for k8s (last resort)

## Safe DB migrations

- Active Record Migrations
- TypeORM migrations
- Knex migrations
- Django Migrations
- Laravel migrations
- Doctrine ORM migrations

## Schema-based API conventions

- JSON:API
- HAL - Hypertext Application Language
- roll your own, just make it consistent

## Automatted code formatting

- Prettier
- Gofmt 
- Standard

## Scalable seed data

- ? (Not sure what public tools exist)

## Documented local dev set up

- shell scripts
- anisble / chef cookbooks
- docker-compose
- vagrant scripts