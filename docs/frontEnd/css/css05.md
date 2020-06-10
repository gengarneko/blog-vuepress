---
title: CSS - Flex 布局
date: 2019-07-26
categories:
 - frontEnd
tags:
 - css
---

#### 			告别 CSS 布局


## 目录

1. flex 之前
2. flex 来了
3. 基本概念
4. flex container 的六个属性
5. flex item 的六个属性
6. 例子
7. 参考



## Flex 之前

我们用什么布局？主要使用：

- normal flow（正常流，也叫文档流）
- float + clear
- position relative + absolute
- display inline-block
- 负 margin



## Flex 来了

一种新的布局方式（随着 css3 而来）——Flex 布局

1. 块级布局侧重垂直方向、行内布局侧重水平方向，flex 布局与方向无关。
2. flex 布局可以实现空间自动分配、自动对齐（flexible：弹性、灵活）
3. flex 适用于简单的线性布局，更复杂的布局要交给 grid 布局（还没发布）

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfnl0umyfmj30kk08x3yz.jpg)

我们先来写一个简单的 flex 布局的页面：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    .child {
      width: 100px;
      height: 50px;
      border: 1px solid red;
      background: white;
      margin: 10px;
    }
    .parent {
      border: 1px solid black;
      display: flex;
      background: #ddd;
    }
  </style>
</head>
<body>
  <div class="parent">
    <div class="child child1">
      1
    </div>
    <div class="child child2">
      2
    </div>
  </div>
</body>
</html>
```

我们可以看到横向的可以叫做主轴，另一条垂直的叫做侧轴。



### Flex container 的属性

---

| 属性名          | 解释                                |
| --------------- | ----------------------------------- |
| flex-direction  | 方向                                |
| flex-wrap       | 换行                                |
| flex-flow       | 上面两个的简写                      |
| justify-content | 主轴方向对齐方式                    |
| align-items     | 侧轴对齐方式                        |
| align-content   | 多行/多列内容对其方式（用的比较少） |

#### flex-direction

排列方向，四个方向，很好理解（row/column）

#### flex-wrap

换行，默认的是 flex-wrap: nowrap;  可以和上面的组合起来使用。

#### flex-flow

没什么好讲的

#### justify-content

![1544089469807](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfnl0yxbm1j30dd0c9glw.jpg)

属性有点多。。。

| 值            | 描述                                             |
| ------------- | ------------------------------------------------ |
| flex-start    | 默认值。项目位于容器的开头。                     |
| flex-end      | 项目位于容器的结尾。                             |
| center        | 项目位于容器的中心                               |
| space-between | 项目位于隔行之间留有空白的容器内。               |
| space-around  | 项目位于各行之前、之间、之后都留有空白的容器内。 |
| initial       | 设置该属性为它的默认值。                         |
| inherit       | 从父元素继承该属性。                             |

#### align-items

| 值         | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| stretch    | 默认值。元素被拉伸以适应容器。
如果指定侧轴大小的属性值为'auto'，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸，但同时会遵照'min/max-width/height'属性的限制。 |
| center     | 元素位于容器的中心。
弹性盒子元素在该行的侧轴（纵轴）上居中放置。（如果该行的尺寸小于弹性盒子元素的尺寸，则会向两个方向溢出相同的长度）。 |
| flex-start | 元素位于容器的开头。
弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴起始边界。 |
| flex-end   | 元素位于容器的结尾。
弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴结束边界。 |
| baseline   | 元素位于容器的基线上。
如弹性盒子元素的行内轴与侧轴为同一条，则该值与'flex-start'等效。其它情况下，该值将参与基线对齐。 |
| initial    | 设置该属性为它的默认值。                                     |
| inherit    | 从父元素继承该属性。                                         |

#### align-content

就这样吧~~~





### Flex item 的属性

---

| 值          | 描述                   |
| ----------- | ---------------------- |
| flex-grow   | 增长比例（空间过多时） |
| flex-shrink | 收缩比例（空间不够时） |
| flex-basis  | 默认大小（一般不用）   |
| flex        | 上面三个的缩写         |
| order       | 顺序（代替双飞翼）     |
| align-self  | 自身的对齐方式         |

#### flex-grow

对于多余空间进行分配

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    .child {
      background: white;
      margin: 1px;
      height: 70px;
    }
    .parent {
      display: flex;
      background: #ddd;
    }
    .child:nth-child(1) {
      flex-grow: 1;
    }
  </style>
</head>
<body>
  <div class="parent">
    <div class="child child1">3123123123123132</div>
    <div class="child child1">3123123123123132</div>
    <div class="child child1">3123123123123132</div>
  </div>
</body>
</html>
```

`flex-grow: 1` 的意思就是吃独食，将剩余空间全部占满。如果写 `flex-grow: 2` 那么也是一样的效果。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    .child {
      background: white;
      margin: 1px;
      height: 70px;
    }
    .parent {
      display: flex;
      background: #ddd;
    }
    .child:nth-child(1) {
      flex-grow: 2;
    }
    .child:nth-child(2) {
      flex-grow: 1;
    }
    .child:nth-child(3) {
      flex-grow: 1;
    }
  </style>
</head>
<body>
  <div class="parent">
    <div class="child child1">3123123123123132</div>
    <div class="child child1">3123123123123132</div>
    <div class="child child1">3123123123123132</div>
  </div>
</body>
</html>
```

大家按照分配的比例来瓜分剩余空间。

#### flex-shrink

其实还是瓜分空间，只不过这次是瓜分超出的比例，也就是负数的宽度~~

#### flex-basis

默认大小，一般不用，基本没啥用处，但是可以设置默认值：

```css
flex-shrink: basis;
```

#### flex

三者的缩写，没啥好说的，接受三个参数~

#### order

杀手级作用，我们可以通过这个来改变布局顺序，直接代替掉双飞翼。

双飞翼布局源于淘宝 ued：先完成鸟身 main，然后用 margin-left 将 sub 和 extra 翅膀拖到左右两边，布局完成。

我们的 order 可以更方便地完成此类布局：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    .child {
      background: white;
      margin: 1px;
      height: 70px;
    }
    .parent {
      display: flex;
      background: #ddd;
    }
    .child:nth-child(1) {
      order: 3;
    }
    .child:nth-child(2) {
      order: 2;
    }
    .child:nth-child(3) {
      order: 1;
    }
  </style>
</head>
<body>
  <div class="parent">
    <div class="child child1">11111111</div>
    <div class="child child1">22222222</div>
    <div class="child child1">33333333</div>
  </div>
</body>
</html>
```

#### align-self

自身对齐方式。

我们可以完成一些奇怪的写法：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    .child {
      background: white;
      margin: 1px;
      width: 100px;
    }
    .parent {
      display: flex;
      background: #ddd;
      justify-content: space-around;
      align-items: flex-start;
    }
    .child:nth-child(1) {
      
    }
    .child:nth-child(2) {
      
    }
    .child:nth-child(3) {
      align-self: flex-end;
    }
  </style>
</head>
<body>
  <div class="parent">
    <div class="child">
      11111<br>
      1111<br>
      111<br>
      11<br>
      1<br>
    </div>
    <div class="child">
      2<br>
      2<br>
      2<br>
      2<br>
    </div>
    <div class="child">
      3 <br>
    </div>
  </div>
</body>
</html>
```

也就是说父元素已经规定好了对齐的方式，但是通过 align-self 可以改变自身的对齐。



## 总结

flex-container：四个要背的属性

- flex-direction 
- flex-wrap
- justify-content
- align-items

flex-item ：五个要背的属性

- flex-grow
- flex-shrink
- flex-basis
- order
- align-self



## 使用 flex 布局

1. 手机页面布局（topbar + main + tabs）
2. 产品页面（ul>li*9）
3. PC 页面布局
4. 完美居中



### 基础页面布局

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    *{margin: 0;padding: 0;box-sizing: border-box;}
    ul{list-style: none;}
    .container {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    header {
      height: 100px;
      background: #ddd;
    }
    footer ul {
      height: 100px;
      background: #ddd;
    }
    main {
      flex-grow: 1;
      overflow: auto;
    }
    footer > ul {
      display: flex;
    }
    footer > ul > li {
      background: #666;
      width: 25%;
      height: 100%;
      border: 1px solid black;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
    </header>
    <main>
      <p>main</p>
      <p>main</p>
      <p>main</p>
      <p>main</p>
      <p>main</p>
      <p>main</p>
      <p>main</p>
      <p>main</p>
      <p>main</p>
      <p>main</p>
      <p>main</p>
      <p>main</p>
      <p>main</p>
      <p>main</p>
      <p>main</p>
      <p>main</p>
    </main>
    <footer>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </footer>
  </div>

</body>
</html>
```



### 产品页面

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    *{margin: 0;padding: 0;box-sizing: border-box;}
    ul{list-style: none;}
    ul {
      display: flex;
      flex-wrap: wrap;
      width: 350px;
      margin: auto;
      border: 1px solid black;
      justify-content: space-around;
    }
    li {
      width: 100px;
      height: 100px;
      background: #ddd;
      border: 1px solid red;
      margin: 10px 0;
    }
  </style>
</head>
<body>
  <ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</body>
</html>
```



### PC 页面布局

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    *{margin: 0;padding: 0;box-sizing: border-box;}
    header {height: 50px; background: #ddd;}
    footer {height: 50px; background: #ddd;}
    .content {
      display: flex;
    }
    .content > aside {
      width: 120px;
      background: #444;
    }
    .content > main {
      height: 400px;
      flex: 1;
      background: red;
    }
    .content > nav {
      width: 100px;
      background: green;
    }
  </style>
</head>
<body>
  <header>
    header
  </header>
  <div class="content">
    <aside></aside>
    <main></main>
    <nav></nav>
  </div>
  <footer>
    footer
  </footer>
</body>
</html>
```

很常见的双飞翼布局~~



## 完美居中

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    *{margin: 0;padding: 0;box-sizing: border-box;}
    .parent {
      height: 700px;
      background: #ddd;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .child {
      border: 1px solid red;
    }
  </style>
</head>
<body>
  <div class="parent">
    <div class="child">
      dadadasdad<br>
      dadadasdad<br>
      dadadasdad<br>
      dadadasdad<br>
    </div>
  </div>
</body>
</html
```






这样，我们的 flex 布局就讲完啦！！！！

## 参考

- Flex 布局教程：语法篇
- A Complete Guide to Flexbox
- A Visual Guide to CSS3 Flexbox Properties

