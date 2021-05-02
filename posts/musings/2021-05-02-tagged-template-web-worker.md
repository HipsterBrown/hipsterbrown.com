---
layout: musing
title: Shipping Web Workers Simply
description: Relieve the pain of shipping web workers by packaging them up as tagged template strings
categories:
- musings
- musing
tags:
- dev
- worker
- tip

---

I was planning a feature that needed some kind of background process on the front-end, which led me to exploring [Web Workers](http://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) in a production use case for the first time. As part of building this feature, I wanted to be able to share the Worker through a common library that each app depended on. This requirement is not address by most articles that talk about Workers; usually showing examples of code defined in a separate file that is referenced by that file's name when creating a Worker instance.

Based on the [inline web worker example from HTML5 Rocks](https://www.html5rocks.com/en/tutorials/workers/basics/#toc-inlineworkers), I created a [tagged template helper](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates) to generate a Worker instance:

```js
function worker(strings, ...interpolatedValues) {
  const script = _flatten(_zip(strings, interpolatedValues)).join('');
  const url = URL.createObjectURL(
    new Blob([script], { type: 'text/javascript' })
  );
  return new Worker(url);
}
```

Or without the `lodash` dependency:

```js
function worker(strings, ...interpolatedValues) {
  const script = [strings, interpolatedValues]
    .reduce(
      (result, current, index) =>
        result.length
          ? result.map((a, i) => a.concat(current[i]))
          : result.concat(current.map((a) => [a])),
      []
    )
    .flat()
    .join('');
  const url = URL.createObjectURL(
    new Blob([script], { type: 'text/javascript' })
  );
  return new Worker(url);
}
```

This could be made even simpler by not allowing interpolated values to be used in the script, but, by allowing this usage, data can be passed to the Worker definition when it is created! Since I was using TypeScript for this project, I could define a typed and tested function that could be colocated with the feature that consumes and interacts with the inlined worker.

```ts
function createHandler(self: Pick<Worker, 'postMessage'>) {
  return function eventHandler(event: MyCustomEvent) {
    if (event.data.type === 'my-event') {
      // perform some background work
      self.postMessage({ type: 'my-response', data: someData });
    }
  };
}

export function startWorker () {
  const myWorker = worker`
    self.onmessage = ${createHandler.toString()}(self);
  `;

  myWorker.addEventListener('message', ({ data }) => {
    if (data.type === 'my-response') {
      // react to the worker response
    }
  });

  myWorker.postMessage({ type: 'my-event' });
}
```

This was a fun problem to solve and has worked out well so far as the feature has been running in production for some time. I didn't create a package or example repo for this helper since it is simple enough to copy and paste into whichever project needs it without me dedicating some amount of time to maintain the code.

Feel free to share some use case examples with me [on Twitter](https://twitter.com/hipsterbrown). I'd love to see them!
