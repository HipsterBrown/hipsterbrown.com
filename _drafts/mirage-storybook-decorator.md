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

_TL;DR Link to a gist for the basic setup for using a MirageJS server as a Storybook decorator_

When building and testing an application or service, eventually the need to mock communication with another service arises. For client-side web applications, that usually means mocking HTTP requests to a server. Starting out, this could be done using a library like [fetch-mock](https://github.com/wheresrhys/fetch-mock) or simply manually mocking methods on an API client module using [`jest.mock`](https://jestjs.io/docs/mock-functions#mocking-modules). As the app grows and/or the team expands, something more robust and realistic is required to scale, as well as provide the ability to mock requests outside of the test environment; this is a downside of the solutions mentioned previously. 

This is where a tool like [MirageJS](https://miragejs.com) comes in.

> Mirage JS is an API mocking library that lets you build, test and share a complete working JavaScript application without having to rely on any backend services.

By intercepting outgoing HTTP requests, Mirage can exist outside a test environment and provide a source of truth for interacting with an external service. The [docs](https://miragejs.com/docs/getting-started/introduction/) the many scenarios and setups in which Mirage can be useful when developing an app. I appreciate the [familiar route handler syntax](https://miragejs.com/docs/main-concepts/route-handlers/)  and [factories](https://miragejs.com/docs/main-concepts/factories/) for quick data creation without leaking too much of the implementation. In my experience so far, Mirage has allowed many teams to collaborate with this shared server interface; speeding up their testing and prototyping workflow. In regards to prototyping, the Mirage docs do not yet specify how to use it with [Storybook](https://storybook.js.org), which is where this article comes in.

> Storybook is an open source tool for developing UI components in isolation for React, Vue, Angular, and more. It makes building stunning UIs organized and efficient.

Storybook provides [“decorators”](https://storybook.js.org/docs/react/writing-stories/decorators#gatsby-focus-wrapper) as a way to “augment your stories with extra rendering or gather details about how your story is rendered”.

> If your components are “connected” and require side-loaded data to render, you can use decorators to provide that data in a mocked way, without having to refactor your components to take that data as an arg.

[_Using decorators to provide data_](https://storybook.js.org/docs/react/writing-stories/decorators#using-decorators-to-provide-data)

By defining a component that starts and loads a Mirage server, the stories can be decorated with mocked API handlers. 

_get example code from gist or betterment/retail source_
```jsx
```

_show example usage in a story_
```jsx
```

Could this workflow be improved to provide flexibility to consumer of the stories, rather than statically defining all scenarios as separate stories?

_some addon code to integrate with the previously defined decorator_
```jsx
```

_provide gif of panel in local development_
![](Custom storybook panel to modify response data and status)

Combined with the ability to [reuse stories in unit test scenarios](https://storybook.js.org/docs/react/workflows/unit-testing#gatsby-focus-wrapper), building features that depend on remote data sources has become incredibly streamlined and indepdent of running the complete app locally. I hope you find this knowledge and workflow as productive as I have.

_Link to a gist for the basic setup for using a MirageJS server as a Storybook decorator_