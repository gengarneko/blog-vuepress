---
title: CSS - icon 全解
date: 2019-07-12
categories:
 - frontEnd
tags:
 - css
---

- img 法
- background 法
- background 合一法（雪碧图法）
- font 法
- SVG 法
- 新手慎用：「CSS 就是干」法

前端技术名词基本翻译得都很垃圾。。。雪碧图，文盲翻译，阿贾克斯ajax，鬼知道是啥



## 切图

#### 方法一

你是一个会 PS 的合格前端：

​	打开 photoshop

​	我们打开 iconfont 然后找一些图标，然后拖进我们的画布，调整到合适的大小后保存到桌面。

​	这样我们就获得一个 psd 文件。

怎么把一个单独图层导出：我们可以复制图层，用 image 的 trim 来进行裁剪，调整宽高，就可以导出为 png。

#### 方法二

你是一个不会 PS 的智障前端

​	导出一个 png 给你到桌面

​	我们用 PS 打开 PNG 文件，然后粗选我们所需要的图标，进行剪切。

​	使用魔法工具然对其快速选择，我们将选中的白色进行删除，然后我们就得到了我们的目标图层。



两个方法相比，有什么好处呢？木有什么特别好的好处。但是当我们的 div 乱动的时候，我们的 background 引入 png 文件图片的时候，是不会变形乱动的。还有一个好处是可以做雪碧图。

png 的问题：当我们改动宽度，它就可能不居中或者重复。总之，不推荐 PNG



## 雪碧图法（CSS sprites）

CSS 妖精图，文盲才叫雪碧图。。。

我们可以搜索 css sprites generator，打开第三个（应该是，蓝色主题色的那个全英文的）

上传图片然后填写必要数据，这样我们就得到我们的雪碧图了，先右键存储到我们的本地。

复制到我们的项目文件夹中，复制 css 样式，修改一下就可以显示出来了。

#### 雪碧图的原理

比较老套的方法，没啥新奇的。

实际上这些背景图都是在 div 当中的，我们选择要用的区域，然后隐藏不需要的。

使用 background-position 进行调整。



## 字体法

主要使用网站 iconfont~~

同一个字，在不同字体里面可以不一样。那么设计师就想，如果一个字体不一样，那么可不可以特别不一样，比如把字母 A 画成一个五角星，那么我们使用五角星的时候就可以用这个字体的 A 。这就是字体法。

由于设计师们一直在画图标，那么作为程序员就不需要再画图标了，我们直接去 iconfont 执行 cv 操作就可以了。

我们在网站上新建项目，然后获取我们的目标图标，可以看到图标下面有一行神秘代码，&# 就是一个 HTML 转义（又叫 HTML 实体）。我们可以在 HTML 中用 & 开头来打一些字符，我们能用 html entity 来进行进一步的搜索学习。

在 W3C 上面我们能看到有两种方式表现符号：一种是实体名称，另一种是实体编号，&# 就是实体编号，我们可以通过数字编号来显示我们想要的字符（搜索任意字符的 unicon 编码然后获取实体编号）。

如果我们要用 iconfont，一般我们要用 &#xe6 开头，因为 e6 我们约定俗成地，用 iconfont 的时候我们要从 e610 开始，因为这一段编码是不表示任何字符的，即使不加载也不会出现问题。

在线生成链接后引入文件内，在 style 中加入 `font-family: iconfont;` ，这样就成了！



## 伪类

#### 方式一

使用 Unicode 来进行 html 的图标加载

伪类是为了干嘛的，是为了装逼的，我们用样式来写图标，使用 :

```css
.xxx::before {
    content: 'hi'
}
```

就是用伪类这种写法来完成我们的字体。

```css
.xxx::before {
    content: '\e614'
}
```

缺点是 ie6 不支持，但是 ie 支不支持关我什么事呢？不用去管它。

#### 方式二

使用 Font class 来进行

其实 iconfont 可以帮助我们在线生成 css （font class），直接引入然后使用 class 显示我们的字体。

#### 方法三

使用 Symbol ，也就是 js

上面的方法二有很多便利，也有问题，所以我们优先使用这种方法，也就是 SVG。



## SVG

最后一种，也是推荐的做法。

SVG 文件其实是代码，它存的是如何画一个五角星，也就是一组坐标。

记录了两个信息：怎么画一个五角星，内容颜色是怎么渐变的。

我们使用 symbol 中提供的 js 文件。这个 js 就是往页面当中插入了一个高度宽度为 0 的 svg 文件，是看不见的 svg 标签，里面有我们所有的 icon，默认是隐藏的。我们在 iconfont 中打开使用帮助，根据文档引入。

svg 特点：不会变形，没有任何锯齿（因为这是个矢量图，好棒），默认是居中的（太棒了），支持各种 css 及动画（超级棒）



## CSS 就是干！

基本上没什么人在用，但是能够提高我们的 css 技巧。

我们可以搜索 cssicon.space ，点进去，我们发现这个家伙（设计师出身）超级吊，用 css 一个个画出来这么多图标。

比如我们画一个搜索的放大镜图标：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    .fdj {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 1px solid red;
      border-radius: 50%;
      position: relative;
    }
    .fdj::after {
      content: '';
      display: inline-block;
      width: 10px;
      border-top: 1px solid blue;
      position: absolute;
      bottom: 0;
      left: 100%;
      transform: rotate(45deg);
      margin-left: -3px;
      margin-bottom: -1px;
    }
  </style>
</head>
<body>
  <span class="fdj"></span>
</body>
</html>
```

![1544075604032](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfnkybl3wpj305d030jr5.jpg)

这样我们的一个放大镜就做出来了。







## 总结

- img：

- background

- background 合一法（精灵图）使用定位显示不同的图标，多个请求合成为一个请求。

- font 法：使用字体，所有的 icon 做到字体里面。流行了很久~~~

- SVG 法：支持的功能更多，支持彩色！可操作性高！

- CSS 就是干：自虐形式~

