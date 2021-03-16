---
layout: musing
title: Simple Slot API for React
description: One of my favorite features of Web Components is the `slot`, so I've replicated it in React to make more composable components.
categories:
- musings
- musing
tags:
- dev
- react

---

Once you get started building components in React, they start out fairly simple or very specific to a feature. As you continue constructing your interfaces, patterns emerge and there's a need for more generalized, flexible components. You may stumble upon the term "compound components" through some very informative articles like [this one from EpicReact.dev](https://epicreact.dev/soul-crushing-components/). To author compound components at work and for personal projects, I use an approach inspired by the `slot` element from the Web Component spec.

If you haven't heard of the `slot` element:

> a placeholder inside a web component that you can fill with your own markup, which lets you create separate DOM trees and present them together.

[MDN HTML elements reference `<slot>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Slot)

There is a more in-depth tutorial here: [https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots#adding_flexibility_with_slots](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots#adding_flexibility_with_slots)

This sort of composability is great when building structural components, like layouts, that should be very flexible about their content but want more control over placement of that content. In React, `props` could certainly be used, however the readability of JSX is hindered when passing large blocks of context through `props`.

In the past, I've enabled this kind of flexibility with static child component connected to a parent:

```tsx
import React from 'react';

type MyLayoutComponent = React.FC & {
  Header: React.FC;
  Body: React.FC;
  Footer: React.FC;
}

const MyLayout: MyLayoutComponent = ({ children }) => {
  const [header, body, footer] = React.Children.toArray(children);

  // place elements as needed
}

MyLayout.Header = ({ children }) => <>{children}</>;
MyLayout.Body = ({ children }) => <>{children}</>;
MyLayout.Footer = ({ children }) => <>{children}</>;
```

The above approach relies on the person using `MyLayout` to know the correct ordering of the child components. Repeating this pattern in other components would be tedious and lead to drift as each component author tries a different take.

Here is a simple but conventional implementation of a `Slot` component with an associated helper function:

```tsx
import React from 'react';

export interface SlotProps {
  name: string;
}

export const Slot: React.FC<SlotProps> = ({ children }) => <>{children}</>;

export function getSlots(
  names: string[],
  children: React.ReactElement | React.ReactElement[] | React.ReactNode | React.ReactNodeArray
): Array<React.ReactElement | null> {
  return names.map(name => {
    let slot = null;
    React.Children.forEach(children, child => {
      if (!React.isValidElement(child)) {
        return;
      }
      if (child.type === Slot && (child.props as SlotProps).name === name) {
        slot = React.cloneElement(child);
      }
    });
    return slot;
  });
}
```

As you can see, the `Slot` component itself is basically a wrapper object to expose a `name` prop for use in the `getSlots` function. Using this API to the earlier `MyLayout` component would look like the following:

```tsx
import React from 'react';
import { getSlots, Slot } from './Slot';

const MyLayout: React.FC = ({ children }) => {
  const [header, body, footer] = getSlots(['header', 'body', 'footer'], children);

  // place elements as needed
}

// usage

<MyLayout>
  <Slot name="header">Hello World</Slot>
  <Slot name="body"></Slot>
  <Slot name="footer"></Slot>
</MyLayout>
```

If we wanted to provide stronger type feedback for available slot names:

```tsx
import React from 'react';
import { getSlots, Slot } from './Slot';

type MyLayoutSlot = React.FC<{ name: 'header' | 'body' | 'footer' }>;

type MyLayoutComponent = React.FC & {
  Slot: MyLayoutSlot;
};

const MyLayout: MyLayoutComponent = ({ children }) => {
  const [header, body, footer] = getSlots(['header', 'body', 'footer'], children);

  // place elements as needed
}

MyLayout.Slot = Slot as MyLayoutSlot;
```

Even with the slight overhead of adding a static `Slot` child, the authoring and usage of the new API provides an arguably better experience than the approach of three different static child components. There is no need to worry about ordering and any unused slot will default to `null`, thus [rendering nothing](https://reactjs.org/docs/react-component.html#render). When comparing it with the `slot` API for Web Components, it reverses the roles for the sake of discoverability and type-safety; since the `<slot>` is used in the component template to author the slotted areas, and a `slot` attribute is used to set the slotted content when using the component.

As mentioned before, the `Slot` component is a convenient feature for providing flexibility with control over placement of content. There is still a case for using static child components to provide styling or functionality through association without carrying about placement (maybe more on that in a future post).

Maybe this feature will be built into React one day, like it is for [Vue](https://v3.vuejs.org/guide/component-slots.html#slot-content) and [Svelte](https://svelte.dev/tutorial/slots). Until then, I hope this solution helps you as much as it has helped me.
