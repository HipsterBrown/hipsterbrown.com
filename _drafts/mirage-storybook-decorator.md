---
layout: musing
title: Decorate Storybook with MirageJS
description: Mocking HTTP request from Storybook can allow for some powerful prototyping capabilities, and I've found MirageJS to be a brilliant tool in that regard.
categories:
- musings
- musing
tags:
- dev
- mirage
- storybook

---

- Brief intro to Mirage and Storybook
- breakdown decorators vs addons
- code examples for mirage server decorator
- maybe an example for custom request panel ?

_TL;DR Link to a gist for the basic setup for using a MirageJS server as a Storybook decorator_

When building and testing an application or service, eventually the need to mock communication with another service arises. For client-side web applications, that usually means mocking HTTP requests to a server. Starting out, this could be done using a library like [fetch-mock](https://github.com/wheresrhys/fetch-mock) or simply manually mocking methods on an API client module using [`jest.mock`](https://jestjs.io/docs/mock-functions#mocking-modules). As the app grows and/or the team expands, something more robust and realistic is required to scale, as well as provide the ability to mock requests outside of the test environment; this is a downside of the solutions mentioned previously. 