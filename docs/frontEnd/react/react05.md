---
title: 使用 useReducer 和 TypeScript 优化 React 上下文
date: 2020-10-09
categories:
  - frontEnd
tags:
  - React
  - Immer
sidebarDepth: 6
---

[Just the code?](https://codesandbox.io/s/context-reducer-ts-9ctis)

在 React 应用中有许多方式可以处理状态数据。很显然，setState 可以用于一些较小的组件，但是如果要管理一个复杂的状态怎么办？

也许你将使用 Redux 或 MobX 来处理这种情况，但是也可以使用 React Content，而不必安装其他依赖项。

让我们看看如何使用 Context API 和 TypeScript 管理复杂的状态。

<!-- more -->

> 在本文中，我们将构建一个带有购物车的产品列表

## 初始化

首先，转备好应用环境：

```bash
npx create-react-app my-app --template typescript
cd my-app/
```

```ts
/*context.tsx*/

import React, { createContext } from 'react'

const AppContext = createContext({})
```

你可以使用所需的任何值来简单初始化 `context` api，这里我使用空对象。

现在，让我们创建一个初始状态，其中有一个空的产品列表，并且购物车的计数为零。另外，我们为此添加一些数据类型。

```ts
/*context.tsx*/

import React, { createContext } from 'react'

type ProductType = {
  id: number
  name: string
  price: number
}

type InitialStateType = {
  products: ProductType[]
  shoppingCart: number
}

const initialState = {
  products: [],
  shoppingCart: 0,
}

const AppContext = createContext<InitialStateType>(initialState)
```

产品列表总的每个产品都会有 `id`、`name` 和 `price` 属性。

## 创建 reducers

现在我们将使用 `reducers` 和 `actions` 来创建和删除产品，还有购物车计数操作。首先，创建一个 名为 `reducers.ts` 的新文件：

```ts
/*reducers.ts*/

export const productReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_PRODUCT':
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
        },
      ]
    case 'DELETE_PRODUCT':
      return [...state.filter((product) => product.id !== action.payload.id)]
    default:
      return state
  }
}

export const shoppingCartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return state + 1
  }
}
```

一个 `reducer` 函数接收两个参数，第一个是 `state`，当我们使用 `useReducer` 钩子时要传递该参数，第二个参数是一个对象，表示事件和事件参数，这个将改变数据 `state`（`action`）。

在这种情况下，我们创建了两个 `reducer`，一个用于产品，另一个购物车。在 `productReducer` 上，我们添加了创建和删除操作。在 `shoppingCartReducer` 上，我们添加的唯一操作是添加数据时购物车计数 + 1.

如你所见，创建一个产品，我们需要传递 `id`、`name` 和 `price`，并返回带有新对象的当前状态。对于删除操作，我们只需要一个 `id`，返回值就是不具有该 `id`的 `state` 的产品。

## 组合 reducer 并引入

现在更改一下上下文文件，引入 `reducer` 函数：

```ts
/*context.tsx*/

import React, { createContext, useReducer } from 'react'
import { productReducer, shoppingCartReducer } from './reducers'

type ProductType = {
  id: number
  name: string
  price: number
}

type InitialStateType = {
  products: ProductType[]
  shoppingCart: number
}

const intialState = {
  products: [],
  shoppingCart: 0,
}

const AppContext = createContext<{
  state: InitialStateType
  dispatch: React.Dispatch<any>
}>({
  state: initialState,
  dispatch: () => null,
})

const mainReducer = ({ products, shoppingCart }, action) => ({
  products: productReducer(products, action),
  shoppingCart: shoppingCartReducer(shoppingCart, action),
})

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState)

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export { AppContext, AppProvider }
```

这是一个 `mainReducer` 函数，它组合了我们现在拥有的两个 `reducer`，每个都管理部分状态。

除此之外，我们创建一个 `AppProvider` 组件，其中，useReducer 钩子使用此 `mainReducer` 和初始状态来返回 `state` 和 `dispatch`。

我们将这些值传递给 `AppContext.Provider` 中，这样做可以访问状态并使用 `useContext` 进行分派。

## 添加类型保护

接下来，为 `reducers` 和 `actions` 添加类型：

```ts
/*reducers.ts*/

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export enum Types {
  Create = 'CREATE_PRODUCT',
  Delete = 'DELETE_PRODUCT',
  Add = 'ADD_PRODUCT',
}

// Product

type ProductType = {
  id: number
  name: string
  price: number
}

type ProductPayload = {
  [Types.Create]: {
    id: number
    name: string
    price: number
  }
  [Types.Delete]: {
    id: number
  }
}

export type ProductActions = ActionMap<ProductPayload>[keyof ActionMap<ProductPayload>]

export const productReducer = (state: ProductType[], action: ProductActions | ShoppingCartActions) => {
  switch (action.type) {
    case Types.Create:
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
        },
      ]
    case Types.Delete:
      return [...state.filter((product) => product.id !== action.payload.id)]
    default:
      return state
  }
}

// ShoppingCart

type ShoppingCartPayload = {
  [Types.Add]: undefined
}

export type ShoppingCartActions = ActionMap<ShoppingCartPayload>[keyof ActionMap<ShoppingCartPayload>]

export const shoppingCartReducer = (state: number, action: ProductActions | ShoppingCartActions) => {
  switch (action.type) {
    case Types.Add:
      return state + 1
    default:
      return state
  }
}
```

我从这篇[文章](https://medium.com/hackernoon/finally-the-typescript-redux-hooks-events-blog-you-were-looking-for-c4663d823b01)中获得了灵感：https://codesandbox.io/s/jpj18xoo85，基本上，我们只需要检查 `action.type` 是否生效，并且据此生成 `payload` 的类型。

## 注意

你可以采用的另一种方式是使用联合类型：

```ts
type Action = { type: 'ADD' } | { type: 'CREATE'; create: object } | { type: 'DELETE'; id: string }
```

上面的代码中，所有这些类型都有一个称为 `type` 的公共属性。TypeScript 将为联合类型创建类型守卫，现在让我们根据对象类型具有的类型来使用类型。

但在本文中，我们为 `actions` 类型和 `payload` 使用了两个公共属性，`payload` 对象类型根据类型改变而改变，因此联合类型将不起作用。

现在，将类型定义导入到 `context` 文件中：

```ts
/*context.tsx*/

import React, { createContext, useReducer, Dispatch } from 'react'
import { productReducer, shoppingCartReducer, ProductActions, ShoppingCartActions } from './reducers'

type ProductType = {
  id: number
  name: string
  price: number
}

type InitialStateType = {
  products: ProductType[]
  shoppingCart: number
}

const initialState = {
  products: [],
  shoppingCart: 0,
}

const AppContext = createContext<{
  state: InitialStateType
  dispatch: Dispatch<ProductActions | ShoppingCartActions>
}>({
  state: initialState,
  dispatch: () => null,
})

const mainReducer = ({ products, shoppingCart }: InitialStateType, action: ProductActions | ShoppingCartActions) => ({
  products: productReducer(products, action),
  shoppingCart: shoppingCartReducer(shoppingCart, action),
})

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState)

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export { AppProvider, AppContext }
```

不要忘记用 `AppProvider` 包裹你的主要组件：

```ts
/* App.tsx */

import React from 'react'
import { AppProvider } from './context'
import Products from './products'

const App = () => {
  ;<AppProvider>
    // your stuff
    <Products />
  </AppProvider>
}

export default App
```

创建一个 `Products` 组件：

```ts
/* App.tsx */

import React from 'react'
import { AppProvider } from './context'
import Products from './products'

const App = () => {
  ;<AppProvider>
    // your stuff
    <Products />
  </AppProvider>
}

export default App
```

所有的一切现在都被包含到类型检查中去了！

You can check the code [here](https://codesandbox.io/s/context-reducer-ts-9ctis).

## 扩展阅读

- [Finally, the TypeScript + Redux/Hooks/Events blog you were looking for.](
