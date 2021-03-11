---
layout: musing
title: Wrangle complexity with finite-state reducers
description: UI state can start out fairly simple, but quickly spiral out of control. How do you know when to reach for a more powerful pattern?
categories:
- musings
- musing
tags:
- dev
- code
- state machines

---

_While a lot of the examples will include references to React, the ideas are applicable to any UI development systems._

An example using an accordion feature.

I love taking this code:

```ts
interface State {
  deliveryDetailsIsOpen: boolean;
  employerInformationIsOpen: boolean;
}

const initialState: State = {
  deliveryDetailsIsOpen: false,
  employerInformationIsOpen: false
};

enum Action {
  ToggleDeliveryDetails,
  ToggleEmployerInfo
}

const reducer = (state: State, action: Action): State => {
  switch (action) {
    case Action.ToggleDeliveryDetails:
      return { deliveryDetailsIsOpen: !state.deliveryDetailsIsOpen, employerInformationIsOpen: false };
    case Action.ToggleEmployerInfo:
      return { employerInformationIsOpen: !state.employerInformationIsOpen, deliveryDetailsIsOpen: false };
    default:
      return state;
  }
};
```

And converting it to:

```ts
type State = 'closed' | 'displayingEmployerInfo' | 'displayingDeliveryInfo';

enum Action {
  ToggleDeliveryDetails,
  ToggleEmployerInfo
}

type Config = {
  initial: State;
  states: Record<State, { on: Record<Action, State> }>;
};

const config: Config = {
  initial: 'closed',
  states: {
    closed: {
      on: {
        [Action.ToggleDeliveryDetails]: 'displayingDeliveryInfo',
        [Action.ToggleEmployerInfo]: 'displayingEmployerInfo'
      }
    },
    displayingDeliveryInfo: {
      on: {
        [Action.ToggleDeliveryDetails]: 'closed',
        [Action.ToggleEmployerInfo]: 'displayingEmployerInfo'
      }
    },
    displayingEmployerInfo: {
      on: {
        [Action.ToggleDeliveryDetails]: 'displayingDeliveryInfo',
        [Action.ToggleEmployerInfo]: 'closed'
      }
    }
  }
};

const reducer = (state: State, action: Action): State => {
  return config.states[state].on[action] || state;
};
```

No more impossible states! But how do we get there?

Even while managing the state in a reducer, the first example still required juggling state variables to conditional open or close each disclosure. The final snippet, has a clear view of the expected behavior and could be generalized to share across other features.