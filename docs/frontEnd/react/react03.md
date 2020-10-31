---
title: Immer.js 精读
date: 2020-09-07
categories:
  - frontEnd
tags:
  - React
  - Immer
sidebarDepth: 6
---

## 1 引言

Immer 是 18 年火起来的项目，由 [Mobx](https://github.com/mobxjs/mobx) 作者 [Mweststrate](https://github.com/mweststrate) 研发

了解 mobx 的同学会发现，Immer 就是更底层的 Mobx，它将 Mobx 的特性发扬光大，得以结合到任何数据流框架，使用起来非常优雅

<!-- more -->

## 2 概述

### 麻烦的 Immutable

Immer 想解决的问题，是利用元编程简化 Immutable 使用的复杂度。举个例子 🌰，我们写一个纯函数：

```tsx
const addProducts = products => {
  const cloneProducts = =products.slice()
  cloneProducts.push({ text: "shoes" })
  return cloneProducts
}
```

虽然代码不复杂，但是写起来依然内心不爽，我们必须将 `products` 拷贝一份，再调用 `push` 函数修改刷新 `cloneProducts`，再返回它

如果原生 JS 支持 `Immutable`，就可以直接使用 `push` 了，而 `Immer` 就让 JS 现在就支持：

```tsx
const addProducts = produce((products) => {
  products.push({ text: 'shoes' })
})
```

很有趣吧，这两个 `addProducts` 函数功能一模一样，而且都是纯函数

### 别扭的 setState

我们知道，react 框架中 `setState` 支持函数式写法：

```tsx
setState((state) => ({
  ...state,
  isShow: true,
}))
```

配合解构语法，写起来仍然是如此优雅，那么数据稍微复杂一点呢？就要忍受糟糕的 `Immutable` 了：

```tsx
setState((state) => {
  const cloneProducts = state.products.slice()
  cloneProducts.push({ text: 'shoes' })
  return {
    ...state,
    cloneProducts,
  }
})
```

但是引入 `Immer` 之后一切都改变了：

```tsx
setState(produce((state) => (state.isShow = true)))
setState(produce((state) => state.products.push({ text: 'shoes' })))
```

这就是 `Immer`：`Create the next immutable state by mutating the current one.`

## 3 精读

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

`produce` 回调函数中包含了用户的 `mutable` 代码，所以现在入口变成了 `getter` 与 `setter`

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

`Immer` 因此完成了不可思议的操作：`Create the next immutable state by mutating the current one`

> 源码读到这里，发现 Immer 其实可以支持异步，只要支持 produce 函数返回 Promise 即可。最大的问题是，最后对代理的 `revoke` 清洗，需要借助全局变量，这一点阻碍了 Immer 对异步的支持。

## 4 总结

读到这，如果觉得不过瘾，可以看看 [redux-box](https://github.com/anish000kumar/redux-box) 这个库，利用 immer + redux 解决了 reducer 冗余 `return` 的问题。

> 同样我们也开始思考并设计新的数据流框架，笔者在 2018.3.24 的携程技术沙龙将会分享 [《mvvm 前端数据流框架精讲》](http://mp.weixin.qq.com/s/54BJPM7aldH6yq6qj2Yrpw)，分享这几年涌现的各套数据流技术方案研究心得，感兴趣的同学欢迎报名参加。

## 5 更多讨论

讨论地址是：[精读《Immer.js》源码》 · Issue #68 · dt-fe/weekly](
