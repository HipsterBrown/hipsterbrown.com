---
draft: false
date: 2026-03-15T14:08:00.000-04:00
title: The Alloy SDK for Pebble
description: Everything old is new again, and better than ever.
external_url: https://moddable.com/blog/pebble/
templateEngineOverride: md
type: link
tags:
  - pebble
  - embedded
  - moddable
  - xs-dev
---
> Moddable is thrilled to be collaborating with Pebble to reimagine the watch developer experience using standard JavaScript.

It feels like my journey with JavaScript hardware is coming full circle. The [OG Pebble](https://www.kickstarter.com/projects/getpebble/pebble-e-paper-watch-for-iphone-and-android) was my first foray into developing applications for a platform other than the web, which I had only been doing for a year or two at that time anyway. From building watch faces in C with some JS integration code in the mobile app to full JS-driven experiences and early on-device JS runtime support really shaped my perspective on great developer experiences and what’s possible with hardware. It led to some of my first public speaking opportunities at local meetups in Orlando and New York; eventually leading to meeting the [Tessel](https://github.com/tessel/project) team at an open source collaboration event, where I saw a whole new entrypoint into JS-powered hardware. 

From Tessel to participating in [TC53](https://ecma-international.org/technical-committees/tc53/), where I got to know the folks from [Moddable](https://moddable.com/). After Tessel dissolved, I found myself wanting a similar developer experience for the Moddable SDK and associated tooling: plug an MCU in, run a couple CLI commands, and start pushing code to the device. This led to building [xs-dev](https://xs-dev.js.org/) and pushing the boundaries of my favorite language on devices yet again. 

I told Peter Hoddie when I saw the [Moddable Four](https://moddable.com/moddable-four) (in 2023) that it reminded me so much of the experience when using the first e-paper Pebble. It's incredible to see that dream become a reality. 

> All sensors are available through ECMA-419 Sensor APIs. The high-level network APIs use web standards; the low-level networking APIs use ECMA-419 standards.

This is especially exciting, after years of standards work, to see such a beloved devices adopting these APIs. The peak era of [Nodebots](https://nodebots.io/) has come and gone, but there's potential for a revival with a new generation of developers being exposed to using familiar JavaScript patterns running on their wrists. 

