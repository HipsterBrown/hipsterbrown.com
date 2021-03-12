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

There are several great articles describing how to work with [React Context](https://reactjs.org/docs/context.html) using TypeScript, including one from the folks at [React Training](https://reacttraining.com/): [https://reacttraining.com/blog/react-context-with-typescript/](https://reacttraining.com/blog/react-context-with-typescript/)

In this quick post, I want to describe how I've used [TypeScript generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) in combination with React Context to build more flexible but strongly typed shared state. So prior knowledge of React Context and TypeScript is assumed, otherwise select one of the previous links before continuing.

For a refresher on generics:

> While using `any` is certainly generic in that it will cause the function to accept any and all types for the type of `arg`, we actually are losing the information about what that type was when the function returns. If we passed in a number, the only information we have is that any type could be returned.
>
> Instead, we need a way of capturing the type of the argument in such a way that we can also use it to denote what is being returned. Here, we will use a _type variable_, a special kind of variable that works on types rather than values.
> ```ts
> function identity<Type>(arg: Type): Type {
>   return arg;
> }
> ```

[_https://www.typescriptlang.org/docs/handbook/2/generics.html#hello-world-of-generics_](https://www.typescriptlang.org/docs/handbook/2/generics.html#hello-world-of-generics)

For the feature in question, there is a list of items that can be selected in a table with the selected items stored as a list of IDs. We want to make sure this Context data stores objects that must include an `id` property. We need to tell TypeScript that the generic type argument has constraints (required fields in this case): [https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)

```ts
type ItemWithID = { id: string };
type MyContextData<Item extends ItemWithID> = {
  selectedItems: string[];
  itemList: Item[];
};
```

This gets a little tricky when creating the Context object since it is declared as a static variable:

```ts
const MyContext = React.createContext<MyContextData<ItemWithID>>(null);
```

The generic type argument for `MyContextData` will use the constrained `ItemWithId` type as a placeholder. Then we can create our `Provider` component to accept an `Item` generic:

```tsx
type MyProviderProps<Item extends ItemWithId> = {
  itemList: Item[];
}

function MyProvider <Item extends ItemWithId>(
  { children, itemList }: React.PropsWithChildren<MyProviderProps<Item>>
) {
  // keep track of `selectedItems` somehow

  return <MyContext.Provider value={{ itemList, selectedItems }}>{children}</MyContext.Provider>;
}
```

To get the correct generic usage for the hook that consumes that Context object, some overrides need to happen:

```ts
function useMyContext<Item extends ItemWithID>() {
  const context = React.useContext<MyContextData<Item>>(
    (MyContext as unknown) as React.Context<MyContextData<Item>>
  );
  if (!context) {
    throw new Error('useMyContext must be used under MyContextProvider');
  }
  return context;
}
```

The type of `MyContext` is [asserted](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions) to match the expected type with `Item` generic. Otherwise, TypeScript will raise an error like:

```shell
Type 'MyContextData<ItemWithID>' is not assignable to type 'MyContextData<Item>'
```

Finally, we can use our `Provider` component and hook with our feature:

```tsx
// import MyProvider and useMyContext

type Account {
  id: string;
  name: string;
  age: number;
}

const App = () => {
  const itemList = // request or create this data

  return (
    <MyProvider itemList={itemList}>
      <AccountTable />
    </MyProvider>
  );
};

const AccountTable = () => {
  const { itemList, selectedItems } = useMyContext<Account>();

  // use the itemList and selectedItems data, which should match `Account[]` and `string[]` types respectively
};
```

That's it! Once you get the hang of the pattern, it opens up a world of flexible, reusable state management in your React + TypeScript application.
