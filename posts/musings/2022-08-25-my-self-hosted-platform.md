---
layout: musing
title: My Self-Hosted Platform
description: Why I choose to use Dokku as a flexible platform to host my personal projects.
categories:
- musings
- musing
tags:
- dev
- self-hosted
---

In light of the recent news about [Heroku ending their free tier](https://blog.heroku.com/next-chapter#focus-on-mission-critical), I thought I would talk about the alternative platform I've been using for several years ([Dokku](https://dokku.com/)) and why I think it is worth adopting.

## What is Dokku?

A "Platform as a Service", or PaaS, provides a way creating, managing, and deploying applications without the concerns of the underlying server infrastructure. Rather than needing to requisition a standalone or shared server, configure the application dependencies for the operating system, and set up some type of deployment pipeline for getting that code onto the server, i.e. [FTP](https://en.wikipedia.org/wiki/File_Transfer_Protocol) or [rsync](https://en.wikipedia.org/wiki/Rsync) for the old fashioned folks 😉, a PaaS abstracts over the details and make deployment as simple as `git push`. They generally include additional integrations for things like databases, SSL/TLS certificates, and backups. This is the service provided by Heroku, among others, to enable more people to share their applications, from hobby projects to full businesses, and it looks like the former audience is being pushed away. Enter Dokku.

From the documentation:

> Dokku is an extensible, open source Platform as a Service that runs on a single server of your choice

By using [Docker](https://www.docker.com/) and [Heroku's open source Buildpack system](https://github.com/gliderlabs/herokuish), Dokku provides a service similar to Heroku that can be hosted on nearly any [server hardware provider](https://dokku.com/docs/getting-started/advanced-installation/#configuring) (including [Raspberry Pis!](https://dokku.github.io/release/dokku-0.27.x-wrapup#os-and-architecture-support)). Since I've started using it, Dokku has added [other builder options](https://dokku.com/docs/deployment/builders/builder-management/) for deploying a variety of projects and grown its ecosystem of [official and community plugins](https://dokku.com/docs/community/plugins/).

## How I use Dokku

I currently host my Dokku instance on a $10 per month "droplet" on [DigitalOcean](https://dokku.com/docs/getting-started/install/digitalocean/). This one droplet manages this static site (hipsterbrown.com), the private analytics service for this site (using [Umami](https://umami.is/docs/hosting)), and a [personal web app](https://github.com/hipsterbrown/weekly-menu), along with the associated databases required by those services (PostgreSQL and CouchDB); all with auto-renewing [LetsEncrypt TLS certificates](https://letsencrypt.org/). 

My personal site is deployed automatically through a [GitHub Action](https://github.com/HipsterBrown/hipsterbrown.com/blob/main/.github/workflows/deploy.yml) that performs a `git push` to Dokku. I perform manual pushes for the React app since it doesn't change as often. Finally, I use the Docker image maintained by the Umami team as the build target for that deployed application since it "just works." This flexibility has allowed me to pick the best deployment method for each situation.

While most folks will advise against hosting a database on the same server as the dependent application, none of that data is vital to me; so I am OK with the trade-off of convenience over durability.

## Why I'll continue to use Dokku

Since I first set up Dokku, I have rarely needed to SSH into my server to manage the platform. Meanwhile, the project has many great updates with additional functionality and quality of life improvements that I could apply when I felt ready (made very approachable through the [`dokku-update` command](https://dokku.com/docs/getting-started/upgrading/#upgrading-using-dokku-update)). Having the control over my personal platform has provided me the freedom to experiment without worrying about creating various different accounts or racking up unexpected bills due to forgotten projects. For a dollar less per month than the "Hobby" dyno on Heroku, it is possible to set up Dokku to host a Rail app and database with [a similar expected workflow](https://dokku.com/docs/deployment/application-deployment/).

I like to muck around with server management and "Dev Ops" infrastructure, so hosting Dokku has allowed me to do that while also letting me stay hands off for a while. If you never want to think about the server or SSH into an environment, Dokku might not be the right fit and there are plenty of other options these days, even for free. I'm not claiming Dokku is the right or only way to deploy applications and services, rather this is my current preferred way for my needs. If this makes sense for you as well, [give Dokku a try](https://dokku.com/docs/getting-started/installation/) and feel free to let me know [on Twitter](https://twitter.com/hipsterbrown) how it goes.

Cheers and happy hosting!
