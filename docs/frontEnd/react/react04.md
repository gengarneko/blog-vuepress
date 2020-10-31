---
title: 使用 Immer 优化 Reducer
date: 2020-10-31
categories:
  - frontEnd
tags:
  - React
  - Immer
sidebarDepth: 6
---
周末翻译了两篇基础性质的文章，这篇讲 JS 中的不可变性和 immer

原文地址：https://www.smashingmagazine.com/2020/06/better-reducers-with-immer/

<!-- more -->

> 速览：在本文中，我们将学习如何使用 Immer 书写 reducers。在使用 React 时我们经常会维护大量的 state，同时为更新 state 需要创建很多 reducers。在组件状态 state 的每一个地方手动编写 reducer 会导致代码膨胀，这很容易导致代码出错。本文将告诉你，Immer 如何将编写 state reducers 的过程变得更简单。

作为 React 开发者，你应该对这条原则很熟悉：state 数据不应该是可变的，你可能会想这是什么意思（很多人开始时都会对此感到困惑）。

本文将解释这一切：你将明白什么是不可变数据，为什么需要不可变数据；如何使用 Immer 去处理不可变数据和使用 Immer 的好处。

你可以在这个仓库找到本文的示例代码：[repo](https://github.com/chidimo/immutability-in-js)。

## JavaScript 的不可变性及其重要性

Immer.js 是由 Michel Weststrate 编写的一个轻量级 JavaScript 库，其目标是允许你「以更方便地方式处理不可变状态」。但是在开始进入 Immer 之前，让我们快速重温一下 JavaScript 中的不变性及其在 React 项目中的重要性。

最新的 ECMAScript（aka JavaScript）标准定义了九种内置数据类型，在这九种类型中，有六种被称为原始值/类型。这六种是 `undefined`/`number`/`string`/`boolean`/`bigint`/`symbol`。通过对 JavaScript 的 `typeof` 运算符进行简单检查，即可了解这些数据所对应的数据类型。

```ts
console.log(typeof 5) // number
console.log(typeof 'name') // string
console.log(typeof (1 < 2)) // boolean
console.log(typeof undefined) // undefined
console.log(typeof Symbol('js')) // symbol
console.log(typeof BigInt(900719925474)) // bigint
```

一个 `primitive` 原始值/类型是一个不是对象且没有方法的值，对于当前讨论最重要的是，原始类型值 `primitive` 一旦创建就无法更改。因此，原始类型值 `primitive` 是不可改变的。

其余的三种类型为 `null`/`object`/`function`，用 `typeof` 检查一下：

```ts
console.log(typeof null) // object
console.log(typeof [0, 1]) // object
console.log(typeof {name: 'name'}) // object
const f = () => ({})
console.log(typeof f) // function
```

这些类型是可变的，这意味着它们的值可以在创建之后随时更改。

你可能想知道为什么我有数组 `[0, 1]`，在 JavaScript 世界中，数组知识对象的一种特殊类型。如果你还想知道 `null` 和 `undefined` 有什么不同，`undefined` 指我们没有给变量设置值，而 `null` 是对象的特殊情况，如果你知道某个对象应该是一个对象但是这个对象并不存在，则只需要返回 `null`。（译者：它们大多数情况是可以相互替代的，一些开发者不用 `null` 只使用 `undefined` 以降低类型复杂度）

为了举例说明，可以在浏览器控制台中运行以下代码：

```js
console.log('aeiou'.match(/[x]/gi)) // null
console.log('xyzabc'.match(/[x]/gi)) // [ 'x' ]
```

`String.prototype.match` 应该返回一个数组，这是一个对象类型。如果找不到此类对象，则返回 `null`，返回 `undefined` 在这里也没有意义。

够了，让我们把话题回到不可变性。

根据 MDN 文档：

> “除对象以外的所有类型都定义了不可变的值（即不能更改的值）。”
>
> *“All types except objects define immutable values (that is, values which can’t be changed).”*

该语句包含了函数，因为它们是 JavaScript 对象的一种特殊类型，[参考函数定义](https://developer.mozilla.org/en-US/docs/Glossary/Function)。

让我们快速了解一下可变和不可变数据类型在实际中的含义。尝试在控制台运行以下代码：

```js
let a = 5;
let b = a
console.log(`a: ${a}; b: ${b}`) // a: 5; b: 5
b = 7
console.log(`a: ${a}; b: ${b}`) // a: 5; b: 7
```

结果显示，即使 `b` 是从 `a` 派生出来的，更改 `b` 的值也不会影响 `a` 的值。这是由于 JavaScript 引擎执行语句 `b = a` 时，它会创建一个新的单独的内存位置，在其中放置 5，然后将 `b` 指向该位置。

那对象呢？参考以下代码：

```js
let c = { name: 'some name'}
let d = c;

console.log(`c: ${JSON.stringify(c)}; d: ${JSON.stringify(d)}`) 
// {"name":"some name"}; d: {"name":"some name"}

d.name = 'new name'

console.log(`c: ${JSON.stringify(c)}; d: ${JSON.stringify(d)}`) 
// {"name":"new name"}; d: {"name":"new name"}
```

我们可以看到，通过变量 `d` 更改 `name` 属性也会在 `c` 中更改它。这是由于 JavaScript 引擎执行语句 `c = { name: 'some name' }` 时，会在内存中创建一个空间，将对象放在其中，并指向 c。然后，执行 `d = c` 时，JavaScript 引擎仅仅将 `d` 指向相同的位置，它不会创建新的存储位置。因此，对 `d` 中项目的任何更改都暗含了对 `c` 中项目的操作。很清晰，我们就能明白这会造成什么样的麻烦。

假设你正在开发一个 React 应用程序，并且想在某个地方通过读取变量 `c` 将用户名显示为某些名称。但是在其他地方存在对 `c` 的引用 `d`，这引入了错误，这会导致使用者的命名看上去是新的命名。如果 `c` 和 `d` 是基本数据类型，就不会有这个问题，但是对于 React 而言，仅使用基本数据类型是不够的。

这是应该重视在应用中保持状态不可变的主要原因，我鼓励你通过阅读 Immutable.js 文档中的一小节来了解其它一些注意事项：[the case for immutability](https://github.com/immutable-js/immutable-js/#the-case-for-immutability)。

了解了为什么我们需要在 React 应用中实现数据不可变性之后，现在让我们看一下 Immer 如何通过 `produce` 函数解决问题。

## Immer 中的 `produce` 函数

Immer 的核心 API 很小，你要使用的主要功能就是 `produce` 函数，`produce` 只需要一个初始状态和一个回调函数，该回调函数定义了如何处理状态。回调函数本身会受到对其所有预期更新的状态的 `draft`（相同，但是仍然是副本）（译者：草稿，可以理解为数据代理）。最后，在应用所有更改结束后，将产生一个新的、不可变的状态。（译者：类似于深拷贝数据，但有所不同）

这种状态更新的一般模式是：

```js
// produce signature
produce(state, callback) => nextState
```

让我们来看它在实际编码中怎么运用：

```js
import produce from 'immer'

const initState = {
  pets: ['dog', 'cat'],
  packages: [
    { name: 'react', installed: true },
    { name: 'redux', installed: true },
  ],
}

// to add a new package
const newPackage = { name: 'immer', installed: false }

const nextState = produce(initState, draft => {
  draft.packages.push(newPackage)
})
```

在上面的代码中，我们只是传递了起始状态和一个回调函数，该回调指定了我们期望突变（mutation）发生的处理方式：`draft.packages.push(newPackage)`。就是这么简单，不需要接触这个状态对象的其它任何地方，它使 `initState` 保持不变，并且在结构上共享了我们在开始状态和新状态之间没有接触到的状态。在这个例子中指的就是 `pets` 数组属性，产生的 `nextState` 是一颗不可变的状态树，其中包含我们所做的更改以及未修改的部分。

掌握了这些简单但是有用的知识之后，我们来看 `produce` 如何帮助我们简化 React 的 `reducers`。

## 使用 Immer 书写 Reducers

假设我们有如下定义的状态对象：

```js
const initState = {
  pets: ['dog', 'cat'],
  packages: [
    { name: 'react', installed: true },
    { name: 'redux', installed: true },
  ],
};
```

我们想要添加一个新对象，并且将 `installed` 属性设置为 `true`：

```js
const newPackage = { name: 'immer', installed: false };
```

如果我们要使用 `JavaScript` 对象和数组扩展语法进行常规操作，则 reducer 可能会这样：

```js
const updateReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_PACKAGE':
      return {
        ...state,
        packages: [...state.packages, action.package],
      };
    case 'UPDATE_INSTALLED':
      return {
        ...state,
        packages: state.packages.map(pack =>
          pack.name === action.name
            ? { ...pack, installed: action.installed }
            : pack
        ),
      };
    default:
      return state;
  }
};
```

我们能看到，对于这个相对简单的状态对象而言，`...state` 这是不必要的冗余代码并且容易出错，我们没必要考虑对象的每一个属性，让我们看看 `immer` 如何简化：

```js
const updateReducerWithProduce = (state = initState, action) =>
  produce(state, draft => {
    switch (action.type) {
    case 'ADD_PACKAGE':
      draft.packages.push(action.package);
      break;
    case 'UPDATE_INSTALLED': {
      const package = draft.packages.filter(p => p.name === action.name)[0];
      if (package) package.installed = action.installed;
      break;
    }
    default:
      break;
    }
  });
```

通过几行代码大大简化了 `reducer`，同样，如果我们进入了默认情况，`immer` 只会返回 `draft` 状态，并不执行任何操作。注意它是如何实现减少样板代码和状态扩散的，有了 Immer，我们只关心我们需要的状态部分。如果找不到这样一个操作，（比如在 `UPDATE_INSTALLED`  操作中），将跳过操作，没有多余的执行。`produce`函数也很方便用于柯里化，将回调函数作为 `produce` 的第一个参数便能实现柯里化。柯里化 `produce` 的代码结构如下：

```js
//curried produce signature
produce(callback) => (state) => nextState
```

让我们看一下，如何使用柯里化后的 `produce` 来组织之前的 `state`，像这样：

```js
const curriedProduce = produce((draft, action) => {
  switch (action.type) {
  case 'ADD_PACKAGE':
    draft.packages.push(action.package);
    break;
  case 'SET_INSTALLED': {
    const package = draft.packages.filter(p => p.name === action.name)[0];
    if (package) package.installed = action.installed;
    break;
  }
  default:
    break;
  }
});
```

柯里化的 `produce` 函数接受一个函数作为第一个参数，并返回一个柯里化的 `produce`，该柯里化 `produce` 仅需要一个状态，从而去生产处理后的状态。该函数的第一个参数是草稿状态（`draft state`，当调用这个柯里化 `produce` 函数并将状态 `state` 传递进去时产生）。接下来跟随我们希望传给该函数的每一个参数。我们现在要用这个函数做的，是传递状态和对应的数据处理操作：

```js
// add a new package to the starting state
const nextState = curriedProduce(initState, {
  type: 'ADD_PACKAGE',
  package: newPackage,
});

// update an item in the recently produced state
const nextState2 = curriedProduce(nextState, {
  type: 'SET_INSTALLED',
  name: 'immer',
  installed: true,
});
```

注意，在 React 应用中使用 `useReducer` 时，我们不需要像上面所做的那样，显示地传递状态，因为 `useReducer` 本身可以处理这样的问题。

你可能会想知道，`immer` 是否会像最近 `React` 中的 `hooks` 一样吸引人？好吧，`immer` 也提供两个用于处理状态的钩子：`useImmer` 和 `useImmerReducer`，让我们看看它们是如何生效的。

## 使用 useImmer 和 useImmerReducer 钩子

关于 `useImmer` 的最好描述可以从 `use-immer` 项目中的 `README` 中找到：

> `useImmer(initialState)` 和 `useState` 很相像，这个方法返回一个元祖（`tuple`），元祖的第一个值是当前状态，第二个值是更新函数，它接受一个 [immer producer function](https://github.com/mweststrate/immer#api)，在函数中 `draft` 状态可以自由更改，直到 `producer` 结束，这个变更后的数据是不可变的，并且可以作为下一次的状态。
>
> `useImmer(initialState)` *is very similar to* [`useState`](https://reactjs.org/docs/hooks-state.html)*. The function returns a tuple, the first value of the tuple is the current state, the second is the updater function, which accepts an* [immer producer function](https://github.com/mweststrate/immer#api)*, in which the* `draft` *can be mutated freely, until the producer ends and the changes will be made immutable and become the next state.*

要使用这些 `hooks`，除了必要的 `immer` 库之外，还需要单独安装它们：

```bash
yarn add immer use-immer

npm i immer use-immer
```

在代码中，`useImmer` 会像这样使用：

```js
import React from "react";
import { useImmer } from "use-immer";

const initState = {}
const [ data, updateData ] = useImmer(initState)
```

就是这么简单，你可以说这是 React 的 `useState` 带着一下升级。使用状态函数 `updateData` 很简单，它接受到 `draft` 状态，你可以根据自身需要随便更改：

```js
// make changes to data
updateData(draft => {
  // modify the draft as much as you want.
})
```

 `Immer` 的创建者提供了一个 [codesandbox](https://codesandbox.io/s/l97yrzw8ol) 例子，你可以尝试运行。

如果你使用过 React 的 `useReducer` 钩子，那么 `useImmerReducer` 同样简单易用，它具有相似的签名，让我们来看看代码：

```js
import React from "react";
import { useImmerReducer } from "use-immer";

const initState = {}
const reducer = (draft, action) => {
  switch(action.type) {      
    default:
      break;
  }
}

const [data, dataDispatch] = useImmerReducer(reducer, initState);
```

我们可以看到，`reducer` 收到了 `draft` 状态，我们可以根据需要进行处理，这里也有一个 [codesandbox](https://codesandbox.io/s/2zor1monvp) 例子供你体验。

这就是使用 `immer` 的简单之处，如果你仍想知道在项目中使用 `immer` 的具体原因，下面是使用 `immer` 的一些重要因素。

## 为什么你应该使用 Immer

如果你编写状态管理逻辑已经有一段时间，那么你将很快体会到 `immer` 提供的简便性。但这并不是 `immer` 提供的唯一好处。

当你使用 `immer` 时，最终会减少书写样板代码的次数，就像我们通过对相对简单 `reducer` 进行的处理那样。同时也会让层级较深情况下的数据更新变得容易。 

在使用 [Immutable.js](https://github.com/immutable-js/immutable-js/) 之类的库时，你必须学习新的 `API` 才能获得数据不变性的好处，但是使用 `immer`，你可以使用普通的 JavaScript `Objects`、`Arrays`、`Sets` 和 `Maps`。这没有新的学习成本。

`immer` 默认还提供结构共享，这仅意味着，当你对状态对象进行变更时，`immer` 会在新状态和之前状态之间自动共享状态的未变更部分。

使用 `immer`，你还可以自动冻结对象，这意味着你无法更改被 `produce` 的状态。例如，当我开始使用 `immer` 的时候，我尝试将 `sort` 方法用于 `immer` 的 `produce` 函数返回的对象数组。这将发生错误，告知我无法对 `array` 进行更改。我必须在进行排序操作之前进行 `array` 切片操作。再说一遍，生产出的 `nextState` 是不可变状态树。

`immer` 的类型检查也很强，同时压缩后只有 3KB，十分轻量。

## 结论

当管理状态更新时，使用 `immer` 对我们来说是不费吹灰之力的。这是一个很轻巧的库，可以让你继续使用所学的关于 JavaScript 的所有知识，而不会产生额外的学习成本。我鼓励你将其安装在项目中并立即运用它，你可以在现有项目中添加使用它，并逐步改造你的 `reducer`。

推荐去阅读 [Immer introductory blog post](https://medium.com/hackernoon/introducing-immer-immutability-the-easy-way-9d73d8f71cb3) by Michael Weststrate。我发现特别有趣的部分是 “Immer 如何工作？”章节，这章解释了 Immer 如何利用 JS 自身的功能如代理 [proxies](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 和概念 [copy-on-write](https://en.wikipedia.org/wiki/Copy-on-write)。

推荐阅读此博客文章：[Immutability in JavaScript: A Contratian View](https://desalasworks.com/article/immutability-in-javascript-a-contrarian-view/)，文章作者 Steven de Salas 介绍了他关于追求不可变性的思想。

希望你通过这篇文章中学到的知识立即体验 Imemr。

## 相关阅读

1. [`use-immer`](https://github.com/immerjs/use-immer), GitHub
2. [Immer](https://github.com/immerjs/immer), GitHub
3. [`function`](https://developer.mozilla.org/en-US/docs/Glossary/Function), MDN web docs, Mozilla
4. [`proxy`](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Proxy), MDN web docs, Mozilla
5. [Object (computer science)](https://en.wikipedia.org/wiki/Object_(computer_science)), Wikipedia
6. “[Immutability in JS](https://github.com/chidimo/immutability-in-js),” Orji Chidi Matthew, GitHub
7. “[ECMAScript Data Types and Values](https://tc39.es/ecma262/#sec-ecmascript-data-types-and-values),” Ecma International
8. [Immutable collections for JavaScript](https://github.com/immutable-js/immutable-js/), Immutable.js , GitHub
9. “[The case for Immutability](https://github.com/immutable-js/immutable-js/#the-case-for-immutability),” Immutable.js , GitHub

## 番外：Immer.js 精读

来自知乎同名文章

### Immer.js 精读

`Immer` 是更底层的拼图，它可以插入到任何数据流框架作为功能增强，不得不感叹 Mweststrate 真的非常高瞻远瞩

`Immer` 是一个支持柯里化，**仅支持同步计算的工具**，所以非常适合作为 `redux` 的 `reducer` 使用

> Immer 也支持直接 return value，这个功能比较简单，所以此功能跳过不谈
>
> PS: mutable 与 return 不能同时返回不同对象，否则弄不清楚到哪种修改是有效的

柯里化详情自行查看 [curry](https://github.com/dominictarr/curry)，我们来看 `produce` 函数的 `callback` 部分：

```tsx
produce(obj, (draft) => {
  draft.count++
})
```

`obj` 是个普通对象，那么黑魔法一定出现在 `draft` 对象，`Immer` 给 `draft` 对象的所有属性做了监听

所以整体思路就有了：`draft` 是 `obj` 的代理，对 `draft` mutable 的修改都会流入到自定义 `setter` 函数，它并不修改原始对象的值，而是递归父级不断浅拷贝，最终返回新的顶层对象，作为 `produce` 函数的返回值

### 生成代理

第一步，也就是将 `obj` 转为 `draft` 这一步，为了提高 `Immutable` 的运行效率，需要一些额外信息，因此将 `obj` 封装成一个包含额外信息的代理对象：

```tsx
{
	modified, // 是否被修改过
  finalized, // 是否已经完成（所有 setter 完成，并且已经生成了 copy）
  parent, // 父级对象
  base, // 原始对象
  copy, // base（也就是 obj）的浅拷贝，使用 Object.assign(Object.create(null), obj)实现
  proxies, // 存储每个 propertyKey 的代理对象，采用懒初始化策略
}
```

在这个代理对象上，绑定了自定义 `getter`、`setter`，然后直接将其扔给 `produce` 执行

### getter

```
produce` 回调函数中包含了用户的 `mutable` 代码，所以现在入口变成了 `getter` 与 `setter
```

`getter` 主要用来懒初始化代理对象，也就是当代理对象子属性被访问的时候，才会生成其代理对象

这么说比较抽象，我们举个 🌰 ：

```tsx
{
	a: {},
	b: {},
	c: {}
}
```

那么初始情况下，`draft` 是 `obj` 的代理，所以访问 `draft.a`、`draft.b`、`draft.c` 时，都能触发 `getter`、`setter`，进入自定义处理逻辑，可是对 `draft.a.x` 相当于访问了 `draftA.x`，所以能递归监听一个对象的所有属性

同时，如果代码中只访问了 `draft.a`，那么只会在内存生成 `draftA` 代理，`b` `c` 属性因为没有访问，因此不需要浪费资源生成代理 `draftB`、`draftC`

当然 Immer 做了一些性能优化，以及在对象被修改过（`modified`）获取其 `copy` 对象，为了保证 `base` 是不可变的，这里不做展开

### setter

当对 `draft` 修改时，会对 `base` 也就是原始值进行浅拷贝，保存到 `copy` 属性，同时将 `modified` 属性设置为 `true`。这样就完成了最重要的 `Immutable` 过程，而且浅拷贝并不是很消耗性能，加上是按需浅拷贝，因此 `Immer` 的性能还可以

同时为了保证整条链路的对象都是新对象，会根据 `parent` 属性递归父级，不断浅拷贝，直到这个叶子节点到根节点整条链路对象都换新为止

### 生成 Immutable 对象

当执行完 `produce` 后，用户的所有修改已经完成（所以 `Immer` 没有支持异步），如果 `modified` 属性为 `false` ，说明用户根本没有更改这个对象，那直接返回原始 `base` 属性即可

如果 `modified` 属性为 `true`，说明对象发生了改变，返回 `copy` 属性即可。但是 `setter` 过程是递归的，`draft` 的子对象也是 `draft`（包含了 `base`、`copy`、`modified` 等额外属性的代理），我们必须一层层递归，拿到真正的值

所以在这个阶段，所有 `draft` 的 `finalized` 都是 `false`、`copy` 内部可能还存在大量 `draft` 属性，因此递归 `base` 与 `copy` 的子属性，如果相同，就直接返回；如果不同，递归一次整个过程

最后返回的对象是由 `base` 的一些属性（没有修改的部分）和 `copy` 的一些属性（修改的部分）最终拼接而成的。最后使用 `freeze` 冻结 `copy` 属性，将 `finalized` 属性设置为 `true`

至此，返回值生成完毕，我们将最终值保存在 `copy` 属性上，并将其冻结，返回了 `Immutable` 的值

```
Immer` 因此完成了不可思议的操作：`Create the next immutable state by mutating the current one
```

> 源码读到这里，发现 Immer 其实可以支持异步，只要支持 produce 函数返回 Promise 即可。最大的问题是，最后对代理的 `revoke` 清洗，需要借助全局变量，这一点阻碍了 Immer 对异步的支持。





