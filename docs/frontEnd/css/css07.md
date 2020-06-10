---
title: CSS - BFC
date: 2019-08-09
categories:
 - frontEnd
tags:
 - css
---

讲不清的 BFC

## BFC 的定义

#### CSS 规范中对 BFC 的描述

> 9.4.1 块格式化上下文

> 浮动，绝对定位元素，非块盒的块容器（例如：inline-blocks，table-cells 和 table-captions）和 overflow 不为 visible 的块盒会为它们的内容建立一个新的块格式上下文。

> 在一个块格式化上下文中，盒在竖直方向一个接一个地放置，从包含块的顶部开始，两个兄弟之间的竖直距离由 ‘margin’ 属性决定。同一个块格式化上下文中的相邻块级盒之间的竖直 margin 会合并。

> 在一个块格式化上下文中，每个盒的 left 外边（left outer edge）挨着包含块的 left 边（对于从右向左的格式化，right 边挨着）。即使存在浮动（尽管一个盒的行盒可能会因为浮动收缩），这也成立，除非该盒建立了一个新的块格式化上下文（这种情况下，该盒自身可能会因为浮动变窄）



#### MDN 对 BFC 的描述

> 一个块格式化上下文（block formatting context）是 web 页面的可视化 CSS 渲染出的一部分，它是块级盒布局出现的区域，也是浮动层元素进行交互的区域。

> 一个块格式化上下文由以下之一创建：
>
> - 根元素或其它包含它的元素
> - 浮动元素（元素的 float 不是 none）
> - 绝对定位元素（元素具有 position 为 absolute 或 fixed）
> - 内联块（元素具有 display: inline-block）
> - 表格单元格（元素具有 display: table-cell，HTML 表格单元格默认属性）
> - 表格标题（元素具有 display: table-caption,HTML 表格标题默认属性）
> - 具有 overflow 且值不是 visible 的块元素。
> - display: flow-root
> - column-span: all 应当总是会创建一个新的格式化上下文

> 一个块格式化上下文包括创建它的元素内部所有内容，除了被包含于创建的块级格式化上下文的后代元素内的元素。

> 块格式化上下文对于定位（参见 float）与清除浮动（参见 clear）很重要。定位和清除浮动的样式规则只适用于处于同一块格式化上下文内的元素。浮动不会影响其它格式化上下文中元素的布局，而且清除浮动只能清除同一块格式化上下文中在它前面的元素的浮动。



#### 张鑫旭对 BFC 的描述

> BFC 全称 “Block Formating Context”，中文名为 “块级格式化上下文”。记住一句话：BFC 元素特性表现原则就是，内部子元素再怎么翻江倒海，也不会影响到外部的元素。所以，避免 margin 穿透，清除浮动什么的也好理解了。



#### BFC 到底是什么？

1. 我不知道什么是 BFC
2. 但是你写出样式，我就知道只是不是 BFC

BFC 就是这样的东西（堆叠上下文也是这样）

1. 它没有定义
2. 它只有特性/功能



## BFC 的功能



### 功能1：爸爸管儿子

用 BFC 包住浮动元素（这不是清除浮动，.clearfix 才是清除浮动）

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    .dad {
      border: 1px solid red;
      min-height: 10px;
    }
    .son {
      height: 100px;
      background: green;
      float: left;
      width: 400px;
    }
  </style>
</head>
<body>
  <div class="dad">
    <div class="son"></div>
  </div>
</body>
</html>
```

上面这个例子我们就发现，儿子浮动之后，爸爸就包不住儿子了。

第一个功能就是让这些叛逆的儿子接收改造，重新回归爸爸的怀抱。

这需要爸爸的共同努力：浮动，绝对定位元素，非块盒的块容器（例如：inline-blocks，table-cells 和 table-captions）和 overflow 不为 visible 的块盒。这四种形式。

> display: flow-root; 这个属性就是触发 BFC，专门用来触发。

#### 兄弟情深手牵手

爸爸底下的儿子们之间的距离是可以合并的~

#### 爷爷管不了孙子

孙子可以跳出爷爷的怀抱~



### 功能2：兄弟之间划清界限

用 float + div 做左右自适应布局

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    .gege {
      width: 100px;
      min-height: 500px;
      border: 3px solid red;
      float: left;
    }
    .didi {
      min-height: 300px;
      border: 5px solid green;
    }
  </style>
</head>
<body>
  <div class="gege"></div>
  <div class="didi"></div>
</body>
</html>
```

我们可以发现哥哥浮动起来，但是弟弟的文字被哥哥挤开~

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    .gege {
      width: 100px;
      min-height: 500px;
      border: 3px solid red;
      float: left;
    }
    .didi {
      min-height: 300px;
      border: 5px solid green;
      overflow: auto;
      margin-left: 120px;
    }
  </style>
</head>
<body>
  <div class="gege"></div>
  <div class="didi"></div>
</body>
</html>
```

我们观察到120的左距离和平时的 20 作用是一样的。由于它是 BFC 所以尽量让家人避开别的区域。





### 如何回答面试问题

1. 千万别解释什么是 BFC，一解释就出错。
2. 用上面的例子解释什么是





[关于 webpack 的面试题有哪些？](