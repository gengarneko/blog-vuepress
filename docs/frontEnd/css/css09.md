---
title: CSS - IFC（BFC的兄弟）
date: 2019-08-23
categories:
 - frontEnd
tags:
 - css
---

行内排版上下文

相关链接《[深入理解 CSS：字体度量、line-height 和 vertical-align](https://zhuanlan.zhihu.com/p/25808995)》

1. font-size em-square
2. line-height 实际占地高度
3. 100px 100px -> 103px
4. vertical top middle bottom text-top text-bottom
5. 图片下面有空隙
   1. vertical-align: top
   2. img{display: block;}
   3. font-size: 0 傻逼采用
6. inline-block 元素对不齐 ——无解 —— 用 flex 或 float
7. inline-block 有空隙 ——用 flex 或 float

## IFC布局规则：

1. 框会从包含块的顶部开始，一个接一个地水平摆放。
2. 摆放这些框时，它们在水平方向的 内外边距+边框 所占用的空间都会被考虑； 在垂直方向上，这些框可能会以不同形式来对齐： 水平的margin、padding、border有效，垂直无效。不能指定宽高;
3. 行框的宽度是 由包含块和存在的浮动来决定; 行框的高度 由行高来决定