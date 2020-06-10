---
title: 如何管理好你的 CSS 
date: 2020-05-22
categories:
 - frontEnd
tags:
 - css
---

> 当我们开始编写前端页面的时候，是不是都经历过 css 命名不规范，导致自己修改页面样式时，需要通过开发者工具查找自己的类名，然后再进行修改的情况呢？

众所周知，CSS 是一门不正交、属性多、调试方便的语言，而正是因为它的功能众多，使得我们在使用 CSS 实现各种各样页面效果的时候，很容易控制不好 CSS 的代码结构。它不像其它逻辑性强的语言，有很多管理代码的方式，我们能管理 CSS 的方式只有两种：文件引用、命名。而由于我们经常会把页面样式文件合并（减少 HTTP 请求），所以我们用来管理 CSS 的方式就只剩下命名。

### 解决好命名问题，就能管理好我们的 CSS

下面分别来简单了解一下管理 CSS我觉得 比较有效的两种方式：

- **BEM**：CSS 命名规范
- **ACSS**：原子化使用 CSS

## 目录

[TOC]

# B.E.M

> 经典的 CSS 命名规范

## 1 - B.E.M 介绍

### 1.1 BEM 是什么？

BEM 其实就是块（block）、元素（element）、修饰符（modifier）的缩写，由 Yandex 团队提出的一种前端 CSS 命名方法。利用不同的区块、功能以及样式给元素命名。

- `-` 中划线：仅作为连字符使用，表示某个块或者某个子元素的多单词之间的连接记号。
- `__` 双下划线：双下划线用来连接块和块的子元素
- `_` 单下划线：单下划线用来描述一个块或者块的子元素的一种状态

> BEM 使用这种命名规范使得你的代码更加易读，让代码更加严密，从而有助于协作、控制和维护。

### 1.2 命名规范

BEM 命名约定的模式如下：

```css
.block {}
.block__element {}
.block--modifier {}
```

每一个 Block 名应该有一个命名空间（前缀）

- `block` 代表了更高级别的抽象或组件
- `block__element` 代表 `block` 的后代，用于形成一个完整的 `block` 的整体
- `block--modifier` 代表 `block` 的不同状态或不同版本

![](https://i.loli.net/2019/02/25/5c737b392fcac.png)

使用两个连字符而不是一个，是为了给块用单个连字符进行自定义：

```css
.nav-block__element {}
.side-block--modifier {}
```

### 1.3 BEM 优点

获得更多的描述和更加清晰的代码结构，从命名中就能得知这个标记的意思、类属性、元素之间的关联。

#### 一般的 CSS 命名：

```html
<div class="student">
  <div class="content">
    <button class="button-primary"></button>
    <button class="button-success"></button>
  </div>
</div>
```

> 用这种写法也许我们能通过父容器猜到大致意思，但是首先你需要了解它的代码结构，也就是时候你需要审查页面元素才能确定某一元素的属性、功能、关系，光从命名中是没法确定的。而且，在纯 CSS 代码中，需要通过层级约束其作用域，避免和其他组件元素冲突。

#### BEM 命名方法：

```html
<div class="student">
  <div class="student__content">
    <button class="student__contentv--primary"></button>
    <button class="student__content--success"></button>
  </div>
</div>
```

> 通过 BEM 改进之后，元素之间的关系更加清晰了，而且在 CSS 文件中也不必作过多考虑层级约束，直接使用名称即可。



## 2 - BEM 使用场景

### 2.1 什么场景适合 BEM

- 有比较明确的层级关系和组件关联的时候，需要使用 BEM。

- 单条公共样式，不需要使用 BEM：

  ```css
  .theme-red {color: red;}
  ```

### 2.2 预处理语言 + BEM

BEM 有利也有弊，最明显的就是命名看起来很长，但是相较于其优点，不值一提。

和 CSS 的预处理语言相结合，能使得你的 CSS 代码书写更快：

```css
.student
	max-width 1000px
	&__body
    padding 20px
	&__button
    padding 5px 8px
    &--primary 
      background blue
    &--success 
      background green
```

> CSS 预处理语言：LESS、SASS、Stylus，具体介绍到各个官网查看，本文不做介绍。

### 2.3 前端框架 + BEM

我们知道在 Vue / React / Angular 等前端框架中，都有 CSS 作用域限制。我们以 Vue 的 `scoped` 为例，在组件样式区域中添加 `scoped` ，会让样式作用域限定在当前作用域中，但是在 Vue 中，慎用 `scoped`。

#### `scoped` 实现原理

通过观察DOM结构可以发现：vue通过在DOM结构以及css样式上加上唯一的标记，保证唯一，达到样式私有化，不污染全局的作用，如图，样式属性上也会多一个该字符，以保证唯一：

![](https://i.loli.net/2019/02/25/5c738410c797e.png)

添加了 `scoped` 属性，为了达到不污染全局，做了如下处理：

- 给 HTML DOM 节点添加不重复的唯一标志
- 在 `scoped` 组件每个样式选择器后添加标志字段，实现类似于命名空间的功能
- 对组件内部的组件，给最外层组件中的标签加上标志字段，不会影响内部引用

#### 为什么慎用

- 父组件无 `scoped` ，子组件有 `scoped`：

  父组件无法操作子组件的样式，虽然能在全局中设置，但是会影响到别的组件

- 父组件有 `scoped` ，子组件无 `scoped`：

  父组件无法操作子组件的样式，因为父组件有标志字段，子组件没有

- 父组件有 `scoped` ，子组件有 `scoped`：

  同样无法设置。

> 当然我们知道 `scoped` 设计的初衷就是不能让当前组件的样式修改其他任何地方的样式，一个组件的样式是建议写死的，但是我们总会有改样式的时候不是嘛，所以即使是在框架中，BEM 依然大有用处。

#### BEM 在框架中存在的意义

- 当选择了局部作用域的写法时，在较小的组件中，BEM 格式可能显得没那么重要。但对于**公共的、全局性的**模块样式定义，依然推荐使用 BEM 格式。

- 对于对外发布的公共组件来说，一般为了风格的可定制性，都不会使用这种局部作用域方式来定义组件样式。这也是 BEM 的使用场景之一。

### 

> 注意：深层次嵌套的 DOM 中，避免过长的样式命名，层级组好不要超 4 层。



## 3 - 例子

```css
.xxx{}
.xxx__item{}
.xxx__item_current{}

// 嵌套写法
.xxx__item_current .mod-xxx__link{}
推荐：

.xxx{}
.xxx__item{}
.xxx__item_hightlight{}
.xxx__product-name{}
.xxx__link{}
.xxx__ming-zi-ke-yi-hen-chang{}

// 嵌套写法
.xxx__item_current{
    .xxx__link{}
}

//对应的HTML结构如下：
<ul class="xxx">
    <li class="xxx__item">第一项
        <div class="xxx__product-name">我是名称</div>
        <span class="xxx__ming-zi-ke-yi-hen-chang">看类名</span>
        <a href="#" class="xxx__link">我是link</a>
    <li>
    <li class="xxx__item xxx__item_current">第二项 且 当前选择项
        <div class="xxx__product-name">我是名称</div>
        <a href="#" class="xxx__item-link">我是link</a>
    <li>
    <li class="xxx__item xxx__item_hightlight">第三项 且 特殊高亮
         <div class="xxx__product-name">我是名称</div>
        <a href="#" class="xxx__item-link">我是link</a>
    <li>
</ul>

```



## 4 - 使用其思想

当然，不是说一定要百分百像素级遵守 BEM 的规范，比如状态我们可以这样写：

```css
.blockName-elName.modifier {}
```

这样可能符合一部分不喜欢划线的人哈~具体怎么弄看 Leader 怎么定吧~

反正万变不离其宗，怎么舒服怎么写就是了。





# ACSS

> 将样式原子化的思维方式，来自雅虎团队的 [**Atomic CSS**](https://link.juejin.im/?target=https%3A%2F%2Facss.io%2F) （简称 ACSS ）。

> 相较于上面介绍的 BEM，ACSS 没有很严格的格式规范，但是它们解决的问题是一样的，都是希望 CSS 在大型项目下能够拥有更好的重用性与维护性，只是采用的方法与方向不同而已。

## 1 - 引入

一件物品的属性可能是多种多样的，比如一件衬衫：颜色、尺寸、材料、花纹、品牌...我们同样可以将一个页面元素想象成一件衬衫，我们暂定一个完整的衬衫定义如下：

```
品牌 + 尺寸 + 颜色 +  花纹 + 季节 + 材料 + 样式     衬衫
```

比如我要拿一件 **李宁 L 码 黑色 带Logo 夏季 速干 短袖 衬衫**，那么名字是不是写起来特别长？

但是我有时候又不需要所有的标签都需要带上，我可能只需要一件 **XL 码 白色 长袖 衬衫**，然后我想给家人买一件 **L 码 红色 纯棉 衬衫**，这样不太好写一个可复用的 CSS 衬衫样式。

> 看到这里聪明的你一定已经大致有了复用样式的思路，没错，就是原子化。

## 2 - 原子化

众所周知 CSS 是一个所见即所得的语言，只要你给他什么样式，它立马就可以显示给你看。那么我就可以直接在页面上通过 `inline` 的方式写我想要的样式，岂不是很爽？这才是 CSS 所原有的样子。当然它有很多问题，但是我们可以用原子化的思维去解决它。

我们之所以需要去管理代码，很大部分是为了我们想要去**复用代码**和**团队协作**，我个人是因为代码复用和管理结构，才会去想怎么给元素命名。

那么，如果我们不要思考通过命名管理 CSS，而是将精力放在管理 CSS 的各种属性上，也就是构成我们衬衫的**原子**上，会不会更好呢？比如我要一件衬衫，什么样子的我不清楚，当需求逐渐清晰的时候，再添加上各种属性：冷了就添加长袖，想舒服点就添加纯棉，骚了就添加夏威夷风，岂不美哉？

## 3 - 相较于 bem 的一些优势

前面的 BEM 思想下，我们可以用类选择器处理命名冲突，但是还是可能造成代码过大，因为你可能会根据不同的组件设置不同的命名空间，很容易使得 CSS 层数过多，于是复杂的页面效果，层级越是容易多。而且几个团队协作的时候，更容易引发问题：

```css
block1__text_highlight {color: yellow;}

...

block2__text_bright {color: yellow;}
```

显然，这种命名还不是拆分的最小单位，而 ACSS 是不可以拆分并且容易固化的，所以管理的难度会小很多，甚至随着需求的清晰，可以做到代码量的只增不减，并且复用率极高。

### 將 CSS style 最小元件化，重用性最大化

只要确保同一个 `style` 只会被定义一次，并且可以通用在各个地方，就饿能解决这些问题！

范例：

```html
<div class="D(f) W(100px)">
</div>
```

利用 atomic css 的工具，会帮你将上述 html 中的 class name 解析：

```css
.D\(f\) {
  display: flex;
}

.W\(100px\) {
  width: 100px;
}
```

稍微想一下，这其实就是在写 `inline` 样式，这样的好处就是：

> Define once, use everywhere.

而且，从此以后只要看一眼组件，就可以直接从 JSX 中看到完整的元件状态，不需要再切换 JS / CSS 文件了

### 列举一下优点

- 将 class name 定义最小化，让全站都可复用
- 通过 atomic css 的打包，只会产生用到的样式
- 比起 inline 的方式更加简单，不会冲突
- 很好压缩，整体 size 小一点

### 当然也有缺点

- 写起来丑
- 没有语义化

> 总的来说，acss 是很值得你去尝试一种方式，熟练了之后哦会极大提高你的编码效率



# 相关阅读

1. [quickLayout.css-快速构建结构兼容的web页面](https://link.juejin.im?target=https%3A%2F%2Fwww.zhangxinxu.com%2Fwordpress%2F2014%2F03%2Fquicklayout-css-%25E5%25BF%25AB%25E9%2580%259F%25E6%259E%2584%25E5%25BB%25BA%25E7%25BB%2593%25E6%259E%2584%25E5%2585%25BC%25E5%25AE%25B9%25E7%259A%2584web%25E9%25A1%25B5%25E9%259D%25A2%2F) 张鑫旭 ；
2. [「英」在组件化浪潮中重新思考CSS ](https://link.juejin.im?target=http%3A%2F%2Fjohnpolacek.com%2Frethinking%2F) johnpolacek ；
3. [「CSS思维」组件化VS原子化](https://juejin.im/post/5b4063936fb9a04fb016b738) ziven27 ；
4. [ ACSS 官网 ](https://link.juejin.im?target=https%3A%2F%2Facss.io%2F) 雅虎 ；
5. [「英」CSS最佳实践探讨 - Atomic CSS](https://link.juejin.im?target=https%3A%2F%2Fwww.smashingmagazine.com%2F2013%2F10%2Fchallenging-css-best-practices-atomic-approach%2F) smashingmagazine；
6. [BEM](https://en.bem.info/methodology/quick-start/#file-structure) Yandex
7. [Scalable CSS - 介紹OOCSS/SMACSS/BEM](http://sj82516-blog.logdown.com/posts/1077348/finish-css-intro-oocss-smacss-bem)
8. [getbem.com](https://link.juejin.im/?target=http%3A%2F%2Fgetbem.com)
9. [github.com/Tencent/tmt…](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FTencent%2Ftmt-workflow%2Fwiki%2F%25E2%2592%259B-%255B%25E8%25A7%2584%25E8%258C%2583%255D--CSS-BEM-%25E4%25B9%25A6%25E5%2586%2599%25E8%25A7%2584%25E8%258C%2583)

