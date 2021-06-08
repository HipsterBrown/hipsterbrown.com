---
layout: musing
title: How to read TypeScript errors
description: My strategy for reading and understanding verbose compiler output
draft: true
categories:
- musings
- musing
tags:
- dev
- typescript
- tip

---

At some point when writing code, everyone runs into errors. These errors can occur at runtime, build time, or as feedback in editors while the code is being written. When seeing TypeScript errors for the first time, they can range from helpful to WTF.

// Add example of long, convoluted TypeScript error trace

**Get it in realtime.**

Over the last few years, I've grown to appreciate the in-editor feedback available to many languages, including TypeScript. This feature is either built-in or available as a plugin to all sorts of dev environments, from vim to Visual Studio Code, which are my main choices. Even ignoring the nice refactoring tools, live feedback is incredibly useful for associating errors with the exact lines in the code with as much context as possible.

**Starting from the bottom.**

While some compilers can provide pin point feedback and helpful suggestions for fixes, the TypeScript compiler errors still have a way to go. When viewing these verbose error traces, it's been helpful to view the bottom message and work my way up. These last messages usually provide the most specific comparison between mismatched types or inference issues.


**Where did that come from?**

Speaking of inference, one of the handy and hurtful things about TypeScript is the ability to [assign types by inference](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html#types-by-inference), so not everything needs an explicit type declaration. The compiler tries its best to get this right, but when it doesn't, it can be a rabbit hole of figuring out where the inferred type came from. This leads to another push for enabling in-editor feedback to help trace assumed types back to the source. Adding explicit declarations during this exploration can help narrow the issue, even if it feels like TS should just know the correct type.

**Don't be afraid to dig.**

A few of the worst offenders in previous debug sessions have come from clashing types and interfaces between third-party libraries and my own code. But this has also led to a better understanding when reading other people's typed code. When looking into the source of a compiler error, feel free to jump to the definition of the flagged type and follow the thread of code to its eventual conclusion if needed. Ideally, the authors will have some comments (maybe even [typedoc](http://typedoc.org) and clearly named generic types; however, there can be a lot of "clever" code out there to make a dynamic API work with the compiler.

I hope these tips are helpful the next time the red squiggle of doom appears in your editor and displays an intimidating stack of feedback.

Other resources:

["Deciphering TypeScript's React errors"](https://medium.com/innovation-and-technology/deciphering-typescripts-react-errors-8704cc9ef402) goes in-depth into specific errors seen in a React codebase.

