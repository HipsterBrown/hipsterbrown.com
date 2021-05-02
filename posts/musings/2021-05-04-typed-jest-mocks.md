---
layout: musing
title: Typed mocks for Jest
description: Combining TypeScript with mocks can be made better using jest-when
draft: true
categories:
- musings
- musing
tags:
- dev
- typescript
- jest
- mock

---

_TL:DR [`jest-when`](https://www.npmjs.com/package/jest-when) and its [associated types package](https://www.npmjs.com/package/@types/jest-when) are useful additions to any TypeScript codebase looking for a nicer way to use Jest mocks._

If you've ever worked on a TypeScript project that used [Jest](https://jestjs.io/) as its testing framework, you've most likely run into the issue of using a mocked function, method, or class in your test setup and seen a compiler error like "Property 'mockImplementation' does not exist on type 'blah'." Even though you know you've replaced that imported dependency, TypeScript is still using the regular types for it. When looking at the docs, the [`jest.MockedFunction` type](https://jestjs.io/docs/mock-function-api#jestmockedfunction) is recommended as a solution for resolving this issue:

```ts
import { myFunction } from './library';
jest.mock('./library');

const mockMyFunction = myFunction as jest.MockedFunction<typeof myFunction>;
expect(mockMyFunction.mock.calls[0][0]).toBe(42);
```

This can be quite tedious when done several times in the setup for a test, so my coworkers and I came up with a helper called `mockOfFunction` that made this process a bit cleaner:

```ts
// in some shared testing helpers file
export function mockOfFunction<T extends (...args: any[]) => any>(f: T): jest.Mock<ReturnType<T>> {
  return (f as unknown) as jest.Mock<ReturnType<T>>;
}

// in a test setup
import { myFunction as _myFunction } from './library';
import { mockOfFunction } from './testing-helpers';
jest.mock('./library');

const myFunction = mockOfFunction(_myFunction);
```

While this quieted the compiler's complaints, the abstraction caused some confusion among team members who were newer to TypeScript and Jest; leading them to believe that `mockOfFunction` was doing the actual mocking rather than `jest.mock`. In an effort to help improve my team's testing workflow, I sought out a better solution and discovered [`jest-when`](https://github.com/timkindberg/jest-when) in the process.

> `jest-when` allows you to use a set of the original Jest mock functions in order to train your mocks only based on parameters your mocked function is called with.

Given the API provided by `jest-when`, any imported mocked dependency could use the allowed [mocking methods](https://jestjs.io/docs/mock-function-api#reference) without worrying about [type assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions) and odd setup boilerplate.

```ts
import { when } from 'jest-when';
import { myFunction } from './library';
jest.mock('./library');

when(myFunction).calledWith(42).mockReturnValue(true);
```

[https://github.com/timkindberg/jest-when](https://github.com/timkindberg/jest-when#introduction)

The actual purpose of providing more robust and specific mocking behavior to Jest was an added bonus in my eyes, especially as it looked familiar to [the `when` method from `testdouble`](https://www.npmjs.com/package/testdouble#tdwhen-for-stubbing-responses).

Using this library has been particularly helpful when stubbing feature flag responses:

```ts
when(useFeatureFlag).calledWith({ name: 'my-feature-flag' }).mockReturnValue({ enabled: true });
```

Whereas previously, any feature flag request would have been stubbed with the same response and making it nearly impossible to distinguish expected output related to overlapping flags or experiments.

So I highly recommend checking out [`jest-when`](https://github.com/timkindberg/jest-when) and improving your mocking setup, especially when dealing with TypeScript.
