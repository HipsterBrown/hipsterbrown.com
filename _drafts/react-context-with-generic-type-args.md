---
layout: musing
title: Creating React Context types with generics
description: Have you ever tried to produce React Context that used TypeScript generics? It can be a little tricky to get right, so here my working solution.
categories:
- musings
- musing
tags:
- dev
- code
- typescript
- react

---

Right, you need to tell TypeScript that the generic type argument has constrains (required fields in this case): https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints

```ts
type ItemWithID = { id: string };
type MyData<Item extends ItemWithID> = {
  selectedItems: String[];
  itemList: Item[];
};
```

Ah ok, so then Item would be a generic to pass to the Context type, which makes sense to how you were setting up the test originally:

```ts
type MyData<Item> = {
  selectedItems: string[];
  itemList: Item[];
}

export interface MyContextData<Item> extends MyData<Item> {
}

interface MyContextProviderProps<Item> {
  itemList: Item[];
  // rest stays the same
}
```

This gets a little tricky when creating the Context object since it is declared as a static variable:

```ts
export const MyContext = React.createContext<MyContextData<ItemWithID>>(null);
```

To get the correct generic usage for the hook that consumes that context object, some overrides need to happen:

export function useMyContext<Item extends ItemWithID>() {
  const context = React.useContext<MyContextData<Item>>(
    (MyContext as unknown) as React.Context<MyContextData<Item>>
  );
  if (!context) {
    throw new Error('useMyContext must be used under MyContextProvider');
  }
  return context;
}

Otherwise, TypeScript will raise an error like:
Type 'MyContextData<ItemWithID>' is not assignable to type 'MyContextData<Item>'.