---
title: CSS - 高度与宽度
date: 2019-06-28
categories:
 - frontEnd
tags:
 - css
---

## 核心知识

1. 文档流（Normal Flow）
   1. 内联元素的宽高
   2. 块级元素的宽高
   3. 水平居中
   4. 垂直居中
   5. 文字溢出省略（多行）
2. 盒模型
   1. 一比一的 div
   2. outline
   3. border 调试大法

## 文档流

Normal Flow ，全 CSS 翻译的最烂的中文名称，其实就是普通文件流。

为什么讲文档流？块级元素的宽高如何确立？

div 原本的高度是 0，可以新建文件，div 元素添加 border，可以发现只有一条线。里面如果有文字，它就会自动地撑高真个 div。那 div 到底是多高呢？和文字一样高嘛？写一个 font-size 20px 的文字进去，它是 28px 高呢？会有人回答说因为默认的行高，行高默认值是 1.4 所以 div 高 28px，但是！我们换一个字体，诶嘿，行高变了！会有人回答不同字体对应行高不一样，但是！每个字体对应的字体是多少呢？答不上来是吧。

真正的原因是（需要字体设计相关知识）：一般字体分为三部分（上部，中部，下部），比如 a、c、e就只占了中部，知识点 1：字和字之间使用基线对其的，大概就是中部下面这条线，不是通过中线对其的。

如果我们写两排字，中间会没有距离，所以设计师设计字体的时候会写一个建议行高（1.5 、1.3、3.0），苹果方正字体设计师觉得 1.4 倍行高显示这个字会比较好看，所以 20px 字体的字它的行高是 28px，div 撑开的高度也就是 28px。所以！div 真正的高度是由字体建议行高所确定的，和字有多大是没有关系的。

如果这个 div 只有一个内联元素，那么 div 的高度就是这个内联元素，这一行的行高，这一行也叫行盒。

在div 中两个字中打一个空格，会显示一个空格，但是打两个空格，还是现实一个空格。HTML 会把多的空格缩起来，我们可以使用 `&nbsp;`  来替代空格（no break space）。比如说我们想让“姓名”与“联系方式”相对其，我们可以在姓名中间加 6 个空格，难道说一个字代表 3 个空格嘛？不是的，如果换一个字体，就会不一样。空格的宽度是由字体设计师决定的。所以！字体对齐用空格是傻逼的！国外设计师是不用对齐的（英文不需要），只有中国人需要对齐。

那么怎么样真正的对齐呢？（最好别对齐，有点麻烦），我们先用 span 标签将它包裹起来（span 是 inline 元素，不支持设置宽度，我们用 display：inline-block）我们设置 4em（em 和中文对应的很好，和英文对应的不好，4 em 恰好将四个字包裹起来）我们怎么将姓名和联系方式对齐呢？我们添加 text-align：justify，这个属性只在换行的时候有效的（换行两边对齐），但是只有一行就很遗憾了！

套路就是！

```css
span {
	border: 1px solid green;
	display: inline-block;
	width: 5em;
	text-align: justify;
}
span::after {
    content: '';
    display: inline-block;
    width: 100%;
    border: 1px solid blue;
}
```

记住这三行（border 不算）！！！！

这时候我们的对齐就实现了，但是有两行，怎么把多的一行干掉呢？

```css
pan {
	border: 1px solid green;
	display: inline-block;
	width: 5em;
	text-align: justify;
	line-height: 20px;
	overflow: hidden;
	height: 20;
}
span::after {
    content: '';
    display: inline-block;
    width: 100%;
    border: 1px solid blue;
}
```

实际上下面有一行文字，我们将它隐藏了，所以能实现这样的效果。



我们发现 1 回车 2 显示的时候仍然是 1 空格 2，这就是 html 的特点，它会把所有内联元素之外的所有元素去掉，将内联元素之间的元素显示为一个空格。任何 inline 元素之间有元素都有一个空格元素，怎么消除呢？消不掉，但是我们不用 display，用 float: left 浮动元素，不需要遵守 inline 元素的特点，然后我们在 ul 上面加一个 clearfix

```css
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}
```

