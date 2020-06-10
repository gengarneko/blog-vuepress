---
title: CSS - 动态 REM
date: 2019-08-16
categories:
 - frontEnd
tags:
 - css
---

#### 手机专用的自适应方案

1. 什么是 rem
2. rem 和 em 的区别是什么
3. 手机端方案的特点
4. 使用 JS 动态调整 rem
5. rem 可以与其他单位同时存在
6. 在 SCSS 里使用 PX2REM



## 什么是 REM

css 有很多著名的长度单位

- px：像素 `还有 pt 单位，不用`
- em：一个 m 的宽度，一个汉字的宽度（错误答案，但是事实上一样） `还有 ex 单位，不用`
- rem：root em，根元素的 font-size
- vh：viewport height，视口高度，100vh == 视口高度
- vw：viewport width。视口宽度，100vh == 视口宽度



## REM 和 EM 的区别是什么

 rem 就是根元素 font-size。em 则是字体的 fontsize 的像素值，不一定是根元素的。



## 手机端方案的特点

- 所有手机显示的界面都是一样的，只是大小不同
- 1 rem == html font-size == viewport width

手机上的响应式是无法实现的，

类似解决方案：

- 百分比布局
  - 但是这样，我们的高度怎么写呢？没法写
  - 一切单位以宽度为基准，就能完美还原设计
- 整体缩放



## 使用 JS 动态调整 rem

http://js.jirengu.com/xoqadocuqu/2/edit?html.css.output

```html
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
<script>
  var pageWidth = window.innerWidth
  document.write('<style>html(font-size:' + pageWidth + 'px;)</style>')
</script>
```

12像素法，手机最低支持的像素只能是 12px~所以我们可以将页面宽度10份分



## REM 可以与其他单位同时存在

```
font-size: 16px;
border: 1px solid red;
width: 0.5rem;
```



## 在 SCSS 里使用 PX2REM



### 为什么学不好 LESS/SASS/Webpack

- 不会命令行，非要用 windows
- 不会英语（看不懂命令）
- 不会看文档（很重要的能力）

