---
title: CSS - 初探
date: 2019-06-21
categories:
 - frontEnd
tags:
 - css
---

## 历史

[中文维基百科](https://zh.wikipedia.org/wiki/层叠样式表#.E5.8E.86.E5.8F.B2)
[英文维基百科](https://en.wikipedia.org/wiki/Cascading_Style_Sheets#History)

注意中文维基百科严重落后了。

1. 两个人合作发明了 CSS
   1994年哈肯·维姆·莱提出了CSS的最初建议。伯特·波斯（Bert Bos）当时正在设计一个叫做“Argo”的浏览器，他们决定一起合作设计CSS。

2. W3C 开始接管 CSS
   1997年初，W3C内组织了专门管CSS的工作组，其负责人是克里斯·里雷。

3. CSS 2.1
   1998年5月W3C发表了CSS2
   CSS2.1修改了CSS2中的一些错误，删除了其中基本不被支持的内容和增加了一些已有的浏览器的扩展内容。

4. CSS 3

   从 2011 年开始 CSS 被分为多个模块单独升级，统称为 CSS 3。这些模块有：

   - CSS 选择器 level 3
   - CSS 媒体查询 level 3
   - CSS Color level 3
   - 更多请 [搜索 CSS spec](https://www.google.com/search?q=css+spec&oq=css+spec&aqs=chrome..69i57j69i60l5.1235j0j7&sourceid=chrome&ie=UTF-8)

5. CSS 4?
   不好意思，没有 CSS 4，只有各个模块的 level 4

周边工具

- LESS CSS
  一种简化、功能更多的 CSS 语言 [中文官网](https://www.google.com/search?q=less+css+中文) [英文官网](https://www.google.com/search?q=less+css)
- SASS
  一种简化、功能更多的 CSS 语言（请自行搜索中英文官网）
- PostCSS
  一种 CSS 处理程序

我的建议是，先不要看周边工具，学好最朴素的 CSS，然后升级就很容易了。

## 学习资源

1. Google: 关键词 MDN
2. [CSS Tricks](https://css-tricks.com/)
3. [Google: 阮一峰 css](https://www.google.com/search?q=阮一峰+css)
4. [张鑫旭的 240 多篇 CSS 博客](http://www.zhangxinxu.com/wordpress/category/css/page/25/)
5. [Codrops 炫酷 CSS 效果](https://tympanus.net/codrops/category/playground/)
6. [CSS揭秘](http://www.ituring.com.cn/book/1695)
7. [CSS 2.1 中文 spec](http://cndevdocs.com/)
8. [Magic of CSS](http://adamschwartz.co/magic-of-css/) 免费在线书

我的建议是：中文学习资源只看大 V 的（毕竟他们要维护形象不能瞎写），英文资源看 CSS Tricks、MDN 和 Codrops。书的话作用不大，最权威的书其实是文档。

- 如果你想快速上手，就先写小 demo 再学理论。
- 如果你想一鸣惊人，就仔细看 CSS 规范文档。

## 由浅入深

1. 引入 CSS 的三/四种方式
2. 从最小的东西开始入手
3. 逐渐变大
4. 学会组织 CSS（以后再说）
5. 自己写 CSS UI 库

## 学习的难点

CSS 一开始设计出来的时候并没有想到大家会这么依赖 CSS，所以设计的时候想得特别简单：你要什么功能我就加什么属性。

你要颜色，就有 color: red; background-color: red;
你要图文混排，就有 float: left
你要绝对定位，就有 position: absolute

虽然 CSS 有一些核心概念，还是我们主要接触的还是一些表面的「技巧」，比如如何布局、如何做出一个小效果。
即使你不了解核心概念，也能把效果搞（抄）出来。

原因很简单：写 CSS 不需要复杂的逻辑。
如果你看见别人用 CSS 写出了一个五角星，那么你只要抄到你的页面里，同样的样式，那么你也有一个五角星。

这就使得很多人不打算深入了解 CSS。

### 如果你不深入了解 CSS

如果你不深入了解 CSS，那么你会发现 CSS 不正交，因而有些反直觉。不正交主要表现在两点：

1. 各属性之间互相影响
   1. margin V.S. border
   2. 小圆点 V.S. display
   3. position: absolute V.S. display: inline
2. 各元素之间互相影响
   1. position: fixed V.S. transform
   2. float 影响 inline 元素

## 学习的易点

1. 背套路即可应付日常工作
   1. 水平居中
   2. 垂直居中
2. 巧用工具
   1. CSS 3 Generator



水了两个多月的 CSS 博客，这方面的学习要告一段落了。

对 CSS 有了一个基本的了解：

1. 控制文档流：利用好默认的宽度和高度规则
2. 控制 z-index：堆叠上下文和堆叠顺序
3. 理解 BFC
4. 理解 IFC
5. 理解 Float 布局和 Flex 布局
6. 理解响应式
7. 掌握动态 REM 方案
8. 掌握 icon 的使用
9. 掌握 Bootstrap 的使用

了解这些理论有助于帮助你更好地理解 CSS。想要把 CSS 用得炉火纯青，还是需要多做出一些惊艳的作品。

去哪里找惊艳的作品：

1. [CSS tricks](https://css-tricks.com/)
2. [Codepen](https://codepen.io/pens/)
3. [Codrops](https://tympanus.net/codrops/)

