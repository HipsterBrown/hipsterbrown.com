---
layout: musing
title: Decorate Storybook with MirageJS
description: Mocking HTTP requests from Storybook can allow for some powerful prototyping capabilities, and I've found MirageJS to be a brilliant tool in that regard.
categories:
- musings
- musing
tags:
- dev
- mirage
- storybook

---

_TL;DR Check out the published addon: [`storybook-mirage`](https://www.npmjs.com/package/storybook-mirage)_

When building and testing an application or service, eventually the need to mock communication with another service arises. For client-side web applications, that usually means mocking HTTP requests to a server. Starting out, this could be done using a library like [fetch-mock](https://github.com/wheresrhys/fetch-mock) or simply manually mocking methods on an API client module using [`jest.mock`](https://jestjs.io/docs/mock-functions#mocking-modules). As the app grows and/or the team expands, something more robust and realistic is required to scale, as well as provide the ability to mock requests outside of the test environment; a downside of the solutions mentioned previously.

This is where tooling like [MirageJS](https://miragejs.com) comes in.

> Mirage JS is an API mocking library that lets you build, test and share a complete working JavaScript application without having to rely on any backend services.

[https://miragejs.com/](https://miragejs.com/)

By intercepting outgoing HTTP requests, Mirage can exist outside a test environment and provide a source of truth for interacting with an external service. The [docs](https://miragejs.com/docs/getting-started/introduction/) share the many scenarios and setups in which Mirage can be useful when developing an app. I appreciate the [familiar route handler syntax](https://miragejs.com/docs/main-concepts/route-handlers/) and use of [factories](https://miragejs.com/docs/main-concepts/factories/) for quick data creation without leaking too much of the implementation. In my experience so far, Mirage has allowed several teams to collaborate with this shared server interface; speeding up their testing and prototyping workflow. In regards to prototyping, the Mirage docs do not yet specify it can be used with [Storybook](https://storybook.js.org), which is what this article hopes to provide.

> Storybook is an open source tool for developing UI components in isolation for React, Vue, Angular, and more. It makes building stunning UIs organized and efficient.

[https://storybook.js.org/](https://storybook.js.org/)

Storybook provides [“decorators”](https://storybook.js.org/docs/react/writing-stories/decorators#gatsby-focus-wrapper) as a way to “augment your stories with extra rendering or gather details about how your story is rendered”.

> If your components are “connected” and require side-loaded data to render, you can use decorators to provide that data in a mocked way, without having to refactor your components to take that data as an arg.

[_Using decorators to provide data_](https://storybook.js.org/docs/react/writing-stories/decorators#using-decorators-to-provide-data)

By defining a functional component that starts and loads a Mirage server, the stories can be decorated with mocked API handlers.

```jsx
// withServer.js

import {
  useEffect,
  useRef,
} from "@storybook/addons";

export const withServer = makeServer => (StoryFn) => {
  const server = useRef();

  useEffect(() => {
    server.current = makeServer();
    return () => server.current.shutdown();
  }, []);

  return StoryFn();
};
```
The decorator uses hooks from the [`@storybook/addons`](https://www.npmjs.com/package/@storybook/addons) package. It is set up with the [server creator function](https://miragejs.com/docs/workflow-tips/#centralize-and-share-your-server-between-development-and-testing), which is cleaned up when the story is unmounted.

```jsx
// .storybook/preview.js

export const decorators = [withServer(makeServer)];
```

While the example decorator simply starts and stops the Mirage server, it could be configured for each story or component through the `mirage` parameter:

```jsx
// withServer.js
export const withServer = makeServer => (StoryFn) => {
  const server = useRef();
  const { logging, fixtures, handlers, timing, instance } = useParameter(
    'mirage',
    {
      handlers: null,
      fixtures: null,
      logging: false,
      timing: null,
      instance: null
    }
  );
  // rest of setup in useEffect
```

```jsx
// Page.stories.js | Page.stories.ts

import Page from './Page';

export default {
  title: 'Page',
  component: Page,
  parameters: {
    mirage: {
      // automatically log requests to browser console https://miragejs.com/api/classes/server/#logging
      logging: true,
      // customize when a request responds https://miragejs.com/docs/main-concepts/route-handlers/#timing
      timing: 1000,
      // override route handlers for the story https://miragejs.com/docs/main-concepts/route-handlers/
      handlers: {
        get: {
          '/api/user': 404, // status code
          '/api/items': [204, {}, { items: [] }], // arguments for Response https://miragejs.com/api/classes/response/
        },
        post: {
          'api/task': { task: {} } // body for Response
        }
      },
      // data to seed Mirage ORM https://miragejs.com/docs/main-concepts/fixtures/
      fixtures: null,
      // pass in a custom Mirage server instance to override the global setting
      instance: null
    }
  },
};
```

All this will allow components to make requests like normal, captured by Mirage with the same behavior as when using it in normal development and testing.

By [tracking state in the decorator](https://storybook.js.org/tutorials/create-an-addon/react/en/track-state/), the integration could become more interactive when displayed in a custom [panel](https://storybook.js.org/docs/react/addons/addon-types#panels):

![Custom storybook panel to modify response data and status](https://github.com/HipsterBrown/storybook-mirage/raw/badf9194699ca0e3fcaf319b3eb63668b267c2d3/screenshots/custom-response-panel.png)
_Custom storybook panel to modify the response data and status_

![Custom storybook panel to view request logs](https://github.com/HipsterBrown/storybook-mirage/raw/badf9194699ca0e3fcaf319b3eb63668b267c2d3/screenshots/request-logs-panel.png)
_View request logs handled by Mirage_

Combined with the ability to [reuse stories in unit test scenarios](https://storybook.js.org/docs/react/workflows/unit-testing#gatsby-focus-wrapper), building features that depend on remote data sources has become incredibly streamlined and independent of running the complete app locally. I hope you find this knowledge and workflow as productive as I have.

The addon is published here: [`storybook-mirage`](https://www.npmjs.com/package/storybook-mirage)
