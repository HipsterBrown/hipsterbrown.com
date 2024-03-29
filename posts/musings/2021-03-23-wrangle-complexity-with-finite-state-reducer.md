---
layout: musing
title: Wrangle complexity with finite-state reducers
description: UI state can start out fairly simple, but quickly spiral out of control. How do you know when to reach for a more maintainable pattern?
categories:
- musings
- musing
tags:
- dev
- code
- state machines
- react

---

_While the examples include references to React, the ideas are applicable to any UI development systems._

If you've built interfaces before, you've probably run into this issue: **state explosion**. What starts out with one or two pieces of data that affect the output of your component, widget, etc, over time grows into several intertwined variables and flags that needs to be maintained by other team members (or your future self at the very least).

Let's take a look at building a basic accordion component.

> An accordion is a vertically stacked set of interactive headings that each contain a title, content snippet, or thumbnail representing a section of content. The headings function as controls that enable users to reveal or hide their associated sections of content. Accordions are commonly used to reduce the need to scroll when presenting multiple sections of content on a single page.

[WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.2/#accordion)

Based on the specification, we'll need to control which panel is being displayed while closing any open panels. To keep the scope of work fairly small, we're only going to manage two panels and use the [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) element to control showing the content.


```tsx
import React, { useState } from 'react';

function MyAccordion () {
  const [isFirstPanelOpen, setFirstPanelOpen] = useState(false);
  const [isSecondPanelOpen, setSecondPanelOpen] = useState(false);

  const onFirstPanelClick = () => {
    if (isSecondPanelOpen) setSecondPanelOpen(false);
    setFirstPanelOpen(currentState => !currentState);
  }

  const onSecondPanelClick = () => {
    if (isFirstPanelOpen) setFirstPanelOpen(false);
    setSecondPanelOpen(currentState => !currentState);
  }

  return (
    <>
      <details
        open={isFirstPanelOpen}
        id="firstPanel"
        onClick={onFirstPanelClick}
      >
        <summary role="heading" aria-level="1" tabIndex="-1">
          <button
            aria-expanded={isFirstPanelOpen}
            aria-controls="firstPanel"
            type="button"
          >
            {isFirstPanelOpen ? "Close" : "Open"} My First Panel
          </button>
        </summary>

        <p>Some basic content goes here</p>
      </details>
      <details
        open={isSecondPanelOpen}
        id="secondPanel"
        onClick={onSecondPanelClick}
      >
        <summary role="heading" aria-level="1" tabIndex="-1">
          <button
            aria-expanded={isFirstPanelOpen}
            aria-controls="secondPanel"
            type="button"
          >
            {isSecondPanelOpen ? "Close" : "Open"} My Second Panel
          </button>
        </summary>

        <p>Some more basic content goes here</p>
      </details>
    </>
  );
}
```

View live example on CodePen: [https://codepen.io/HipsterBrown/details/qBRWbOG](https://codepen.io/HipsterBrown/details/qBRWbOG)

The state management code appears simple enough with two boolean state variables and two click handlers. The state variables are toggling the `open` states of the two `<details>` elements, as well as the `<summary>` text for each panel. Each time we toggle one piece of state, we may end up toggling another since only one panel should be open at a time. Adding more panels would quickly lead to the state explosion introduced in the beginning of this post. Even in this pared-down version, it would be tough to guarantee our feature is working at a glance.

At this point, it might be a good idea to reach for a reducer to help with this problem:

> useReducer is usually preferable to useState when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one.

[React docs `useReducer`](https://reactjs.org/docs/hooks-reference.html#usereducer)

Let's try applying this to our accordion:

```tsx
import React, { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action) {
    case 'TOGGLE_FIRST_PANEL':
      return { isFirstPanelOpen: !state.isFirstPanelOpen, isSecondPanelOpen: false };
    case 'TOGGLE_SECOND_PANEL':
      return { isSecondPanelOpen: !state.isSecondPanelOpen, isFirstPanelOpen: false };
    default:
      return state;
  }
};

function MyAccordion() {
  const [{isFirstPanelOpen, isSecondPanelOpen}, dispatch] = useReducer(reducer, {
    isFirstPanelOpen: false,
    isSecondPanelOpen: false,
  })

  const onFirstPanelClick = () => {
    dispatch('TOGGLE_FIRST_PANEL')
  };

  const onSecondPanelClick = () => {
    dispatch('TOGGLE_SECOND_PANEL');
  };

  // the rest stays the same
}
```

View live example on CodePen: [https://codepen.io/HipsterBrown/details/ExZYPmM](https://codepen.io/HipsterBrown/details/ExZYPmM)

Adding in our reducer helped collect all the allowed state changes into one function, rather than spreading it between two click handlers, which is useful for identifying where to add or update any new behavior. However, we still haven't solved our state explosion issue, since every new panel will add a new boolean field to our `state` object controlled by the reducer and no guarantee the accordion couldn't end up in a state of displaying more than one open panel. We need a way to define all the allowed states for our component, i.e. a finite-state reducer;

A "finite-state reducer" is just a riff on [finite-state machine (FSM)](https://statecharts.github.io/what-is-a-state-machine.html) as implemented using a reducer function. If we look at our earlier code, we can identify three allowed states for our component: closed, displaying the first panel, displaying the second panel. It can never be closed and displaying a panel, nor can it be displaying both panels at once. We can capture this idea by modifying our existing reducer to update a single string value and inverting the typical `switch` statement setup.

```tsx
import React, { useReducer } from 'react';

// state = closed | displayingFirstPanel | displaySecondPanel
const reducer = (state, action) => {
  switch (state) {
    case 'closed':
      switch (action) {
        case "TOGGLE_FIRST_PANEL":
          return 'displayingFirstPanel';
        case "TOGGLE_SECOND_PANEL":
          return 'displayingSecondPanel';
        default:
          return state;
      }
    case 'displayingFirstPanel':
      switch (action) {
        case "TOGGLE_FIRST_PANEL":
          return 'closed';
        case "TOGGLE_SECOND_PANEL":
          return 'displayingSecondPanel';
        default:
          return state;
      }
    case 'displayingSecondPanel':
      switch (action) {
        case "TOGGLE_FIRST_PANEL":
          return 'displayingFirstPanel';
        case "TOGGLE_SECOND_PANEL":
          return 'closed';
        default:
          return state;
      }
    default:
      return state;
  }
};

function MyAccordion() {
  const [state, dispatch] = useReducer(
    reducer,
    'closed'
  );
  const isFirstPanelOpen = state === 'displayingFirstPanel';
  const isSecondPanelOpen = state === 'displayingSecondPanel';

  // the rest stays the same
}
```

View live example on CodePen: [https://codepen.io/HipsterBrown/details/PoWYZQm](https://codepen.io/HipsterBrown/details/PoWYZQm)

The nested (or two-dimensional) `switch` statement can be a little unsettling at first, especially when compared to the first version that appeared relatively compact. However, the point of using the current state in the first `switch` is to describe the allowed "transitions" to another state based on the "action", or "event" in typical machine parlance. As we read down the 2D `switch`, when the current state is "closed", toggling the first panel will display the first panel, and the same goes respective to the second panel.

The real control comes in the cases for when one of the panels is being displayed; when the first panel is open and it is toggled, the reducer transitions back to closed; if the second panel is toggled at this point, the reducer transitions to displaying that panel. There is no check to see if the first panel is being displayed within the "action" `switch` because the first "state" `switch` has already confirmed that. The `isFirstPanelOpen` and `isSecondPanelOpen` variables are derived from the single piece of state coming from the reducer, mostly to simplify rest of the example.

A bonus feature of modeling the reducer as a finite-state machine is the ability to visualize the behavior of our feature using a state diagram.

{% svg "accordion-viz" %}

If we want to reorganize the 2D `switch` in our reducer, we can get the same results using a [familiar object syntax](https://xstate.js.org/docs/packages/xstate-fsm/#super-quick-start):

```ts
const config = {
  initial: 'closed',
  states: {
    closed: {
      on: {
        'TOGGLE_FIRST_PANEL': 'displayingFirstPanel',
        'TOGGLE_SECOND_PANEL': 'displayingSecondPanel'
      }
    },
    displayingFirstPanel: {
      on: {
        'TOGGLE_FIRST_PANEL': 'closed',
        'TOGGLE_SECOND_PANEL': 'displayingSecondPanel'
      }
    },
    displayingSecondPanel: {
      on: {
        'TOGGLE_FIRST_PANEL': 'displayingFirstPanel',
        'TOGGLE_SECOND_PANEL': 'closed'
      }
    }
  }
};

const reducer = (state, action) => {
  return config.states[state].on[action] || state;
};

function MyAccordion() {
  const [state, dispatch] = useReducer(
    reducer,
    config.initial,
  );

  // the rest stays the same
}

```

View live example on CodePen: [https://codepen.io/HipsterBrown/details/zYNOqYY](https://codepen.io/HipsterBrown/details/zYNOqYY)

In the end, we have a clear description for how our feature works and the freedom to share the functionality with another component without including the UI or creating some specialized hook. If the feature grows, there is a maintainable structure for adding new states, transitions, and actions to accommodate those changes. As [side-effects](https://redux.js.org/tutorials/fundamentals/part-6-async-logic#redux-middleware-and-side-effects) start to get involved, we can reach for something like [`useEffectReducer`](https://github.com/davidkpiano/useEffectReducer), [`@xstate/fsm`](https://xstate.js.org/docs/packages/xstate-fsm/), or [`xstate`](https://xstate.js.org/docs/), but more on that in another post.

In the meantime, check out some other articles that dig into managing gradual complexity and state explosion:

- [useState vs useReducer vs XState](https://dev.to/mpocock1/usestate-vs-usereducer-vs-xstate-part-1-modals-569e)
- [Redux is half of a pattern](https://dev.to/davidkpiano/redux-is-half-of-a-pattern-1-2-1hd7)
