---
title: CSS - 移动端页面（响应式）
date: 2019-07-19
categories:
 - frontEnd
tags:
 - css
---

手机端页面的做法

1. 学会 media query

2. 学会要设计图（没图不做）

   - 实在要做也行，看着丑别怪我~

3. 学会隐藏元素

4. 手机端要加一个 meta

   - <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

5. 手机端的交互方式不一样

   - 没有 hover
   - 没有 touch 事件
   - 没有 resize
   - 没有滚动条



## 媒体查询（media query）

```shell
cd ~/desktop
mkdir demo
touch index.html
touch style.css
```

我们不要用 file 协议，太丑了，我们用服务器：

```shell
npm i -g http-server
http-server -c-1
```

这时候就可以在本地打开我们的网页了。

```html
<!DOCTYPE html>
<html lang="zh-Hans">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="shortcut icon" href="#"/>
  <title>移动页面 Demo</title>
  <style>
    @media (max-width: 800px) {
      body {
        background: red;
      }
    }
  </style>
</head>
<body>
  lalal
</body>
</html>
```

这就是我们媒体查询的所有内容~所有的只是都是这样的。

下面我们想要慢慢变色：

```html
<!DOCTYPE html>
<html lang="zh-Hans">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="shortcut icon" href="#"/>
  <title>移动页面 Demo</title>
  <style>
    @media (min-width: 769px) {
      body {
        background: purple;
      }
    }
    @media (max-width: 768px) {
      body {
        background: blue;
      }
    }
    @media (max-width: 425px) {
      body {
        background: green;
      }
    }
    @media (max-width: 375px) {
      body {
        background: orange;
      }
    }
    @media (max-width: 320px) {
      body {
        background: red;
      }
    }
  </style>
</head>
<body>
  lalal
</body> 
</html>
```

> 记住，顺序要从大到小，因为后者覆盖前者

另一种比较严谨的写法：

```css
	@media (min-width: 321px) and (max-width: 768px) {
      body {
        background: blue;
      }
    }
```



## 实例

### 实例一

在宽度只有达到 320px 的时候这个样式才会生效：

```html
<!DOCTYPE html>
<html lang="zh-Hans">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="shortcut icon" href="#"/>
  <title>移动页面 Demo</title>
  <link rel="stylesheet" href="style.css" media="(max-width: 320px)">
</head>
<body>
  lalal
</body>
</html>
```

> 是生效不是下载，一开始就下载好了，是否生效是受变化影响的。

### 实例二

我们来看一个网站：www.smashingmagazine.com，一旦切换到窄屏，就会更换导航栏样式。

我们初始化基本样式：

```html
<!DOCTYPE html>
<html lang="zh-Hans">
<head>
  <meta charset="UTF-8">
  <title>移动页面 Demo</title>
</head>
<body>
  <header>
    <div class="logo">
      <ul>
        <li><a href="#">导航1</a></li>
        <li><a href="#">导航2</a></li>
        <li><a href="#">导航3</a></li>
        <li><a href="#">导航4</a></li>
        <li><a href="#">导航5</a></li>
      </ul>
    </div>
  </header>
</body>
</html>
```

现在问题来了：我们先做手机端还是先做 PC 端？

如果我们先做手机，就是 Mobile first，如果我们先做 PC 就是 desktop first

mobile-first 技术，就是响应式技术。。。。一行代码的技术。我们推荐 mobile first （因为手机看页面更多，而 PC 更多的是生产力工具）

```html
<!DOCTYPE html>
<html lang="zh-Hans">
<head>
  <meta charset="UTF-8">
  <title>移动页面 Demo</title>
  <style>
    * {margin: 0;padding: 0;}
    a {color: inherit;text-decoration: none;}
    ul, ol {list-style: none;}

    .logo {
      width: 60px;
      height: 60px;
      background: grey;
      border-radius: 30px;
    }
    .clearfix::after {
      content: '';
      display: block;
      clear: both;
    }
    .nav>li {
      float: left;
    }
    .nav {
      display: none;
    }
  </style>
</head>
<body>
  <header>
    <div class="logo"></div>
    <button id="xx">菜单</button>
    <ul id="yy" class="nav">
      <li><a href="#">导航1</a></li>
      <li><a href="#">导航2</a></li>
      <li><a href="#">导航3</a></li>
      <li><a href="#">导航4</a></li>
      <li><a href="#">导航5</a></li>
    </ul>
  </header>
  <script>
    xx.onclick = function () {
      if (yy.style.display === 'block') {
        yy.style.display = 'none'
      } else {
        yy.style.display = 'block'
      }
    }
  </script>
</body>
</html>
```

我们可以搭建一个初步的菜单栏，但是有问题：我们不建议对样式进行操作，我们应该对元素的 class 进行操作。我们对 nav 进行两种状态：默认是 激活状态。我们的 js 只需要进行状态更改。

```html
<!DOCTYPE html>
<html lang="zh-Hans">
<head>
  <meta charset="UTF-8">
  <title>移动页面 Demo</title>
  <style>
    * {margin: 0;padding: 0;}
    a {color: inherit;text-decoration: none;}
    ul, ol {list-style: none;}

    .logo {
      width: 60px;
      height: 60px;
      background: grey;
      border-radius: 30px;
    }
    .clearfix::after {
      content: '';
      display: block;
      clear: both;
    }
    .nav>li {
      float: left;
    }
    .nav {
      display: none;
    }
    .nav.active {
      display: block;
    }
  </style>
</head>
<body>
  <header>
    <div class="logo"></div>
    <button id="xx">菜单</button>
    <ul id="yy" class="nav">
      <li><a href="#">导航1</a></li>
      <li><a href="#">导航2</a></li>
      <li><a href="#">导航3</a></li>
      <li><a href="#">导航4</a></li>
      <li><a href="#">导航5</a></li>
    </ul>
  </header>
  <script>
    xx.onclick = function () {
      yy.classList.toggle('active')
    }
  </script>
</body>
</html>
```

我们的 js 专注于更改状态，而不是直接去操作样式~



终极完成版本：

```html
<!DOCTYPE html>
<html lang="zh-Hans">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <title>移动页面 Demo</title>
  <style>
    * {margin: 0;padding: 0;}
    a {color: inherit;text-decoration: none;}
    ul, ol {list-style: none;}

    .logo {
      width: 60px;
      height: 60px;
      background: grey;
      border-radius: 30px;
    }
    header {
      padding: 10px;
    }
    .clearfix::after {
      content: '';
      display: block;
      clear: both;
    }
    .nav > li {
      float: left;
    }
    .nav {
      display: none;
      background: grey;
      margin-top: 20px;
    }
    .nav.active {
      display: flex;
      justify-content: space-between;
    }
    header > button {
      position: absolute;
      right: 20px;
      top: 26px;;
    }
    .nav2 {
      display: none;
    }
    @media (min-width: 400px) {
      header > button {
        display: none;
      }
      .nav {
        display: none!important;
      }
      .nav2 {
        display: block;
      }
      header {
        display: flex;
        align-items: center;
      }
      header .nav2 {
        display: flex;
        margin-left: 20px;
      }
      header .nav2>li {
        margin-left: 20px;
        border: 1px solid red;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="logo"></div>
    <button id="xx">菜单</button>
    <ul id="yy" class="nav">
      <li><a href="#">导航1</a></li>
      <li><a href="#">导航2</a></li>
      <li><a href="#">导航3</a></li>
      <li><a href="#">导航4</a></li>
      <li><a href="#">导航5</a></li>
    </ul>
    <ul class="nav2">
        <li><a href="#">导航1</a></li>
        <li><a href="#">导航2</a></li>
        <li><a href="#">导航3</a></li>
        <li><a href="#">导航4</a></li>
        <li><a href="#">导航5</a></li>
      </ul>
  </header>
  <script>
    xx.onclick = function () {
      yy.classList.toggle('active')
    }
  </script>
</body>
</html>
```



## meta viewport

既然 PC 和手机端这么不一样，干嘛不写两个文件呢？

我们知道设备之后，直接输出对应的样式文件，这是后端负责的，和前端没什么关系~

不用响应式才是对的，用响应式的都是骗人的~

响应式只在面试的时候有用，我们看京东淘宝都是两套 html~如果检测到是手机，那么就会发送手机端的页面。

一般响应式运用的多的是博客网站，因为结构简单，内容单一。

除非是大的项目，需要两个域名，否则一般都是一个域名对应两套页面文件。



最早的时候只有 PC 端页面，没有智能手机，然后出现了诺基亚（需要用类html语言 wap 进行专门的网页开发），再之后就是苹果3，苹果只有300+像素，没法显示900+像素的网站。这就是为什么页面需要缩放~

所以我们用手机看网页，都是需要缩放的，它是模拟 980px，业界的不成文规定（因为调查之后发现所有网页都是980px左右）。这就是为什么 ip6 得到的网页宽度是 980，实际显示的是 375px。这时候就需要告诉浏览器别给我缩放：<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"> 加上这行代码，我们取到的宽度就是 375px。



## 杂项

手机端的交互方式不一样

- 没有 hover
- 没有 touch 事件
- 没有 resize
- 没有滚动条

好消息！好消息！手机上没有 IE ！！！