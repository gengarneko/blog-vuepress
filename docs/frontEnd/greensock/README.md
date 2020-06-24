---
title: GreenSock（GASP）初窥
date: 2020-06-24
categories:
 - frontEnd
tags:
 - animation
---
GASP 全称 GreenSock Animation Platform，是一个 JS 的动画框架，用于创建高性能、零依赖、跨浏览器动画GSAP是灵活的，可以与React、Vue、Angular和vanilla JS协同工作。
<!-- more -->

先打开它的官网：https://greensock.com
![image-20200624122307284](https://tva1.sinaimg.cn/large/007S8ZIlgy1gg39htcynpj31gv0h8414.jpg)

介绍很简单：适用于现代网络的超高性能、专业级别动画，它有用于前端的 JS 库GASP：

![image-20200624121407689](https://tva1.sinaimg.cn/large/007S8ZIlgy1gg398hcggtj31ak09f40d.jpg)

![image-20200624121440273](https://tva1.sinaimg.cn/large/007S8ZIlgy1gg3990e3rlj31cc0jxdig.jpg)

这里是它的速度测试链接：https://greensock.com/js/speed.html，可以比较和其他动画的速度。

## GASP 基本内容

- **GASP**：GSAP 是一套兼容主流浏览器的高性能的  HTML5 JS 动画工具：GSAP 的 API 高效而紧凑；
- **TweenLite**：TweenLite 是整个 GASP 的核心基础，它代码轻量高效，能够根据时间 tween 对任何对象（或者对象数组）的一个一个或多个属性；**它用于创建基本动画，是其他各类模块的基础。**一般都会搭配`plugins/CSSPlugin`以实现DOM元素的动画（也就是我们最熟悉的动画了）
- **TimelineLite**：TimelineLite 是一个用来创建和管理 TweenLite, TweenMax, TimelineLite, and/or TimelineMax 的实例的轻量级的，直观的类；你可以把 TimelineLite 看成是一个可以放置 tween 动画的容器；**综上，它是一个叫做时间轴的动画容器，它用于对多个动画进行有序的组织与控制。**
-  **TimelineMax**：**TimeLineMax 是 TimelineLite 的升级版**，在 TimelineLite 的基础之上，可以有更高级的组织与控制。除了和 TimeLite 一致的 API 外，还额外的添加了一些诸如： `repeat, repeatDelay, yoyo, currentLabel(), tweenTo(), tweenFromTo(), getLabelAfter(), getLabelBefore(), getActive()` 等方法；
- **TweenMax**：是GSAP集合包，除前面3个之外，还包括`plugins`里的常用插件以及`easing`里的缓动函数补充。TweenMax 扩展了TweenLite ，且添加了许多有用的特性；

![GSAP的源文件关系](https://tva1.sinaimg.cn/large/007S8ZIlgy1gg39w5ac0oj309408ygll.jpg)

所以，如果想要简单地引入GSAP的主体功能，使用`TweenMax.js`这一个文件即可，如果要争取更小的库文件大小，应该使用`TweenLite.js`（必需）+ 其他文件的组合。

## 引用 GASP

> 下载地址：[greensock.com/get-started…](https://greensock.com/get-started-js#)

或者

```js
<!--CDN links for TweenLite, CSSPlugin, and EasePack-->
<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/plugins/CSSPlugin.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/easing/EasePack.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenLite.min.js"></script>

<!--CDN link for  TweenMax-->
<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min.js">
</script>复制代码
```

如果引用 `TweenMax` 这个文件，那就说明你引用了所有功能，因为它包括 `TweenLite`, `CSSPlugin`, `EasePack`, `TimelineLite`, `TimelineMax`, `RoundPropsPlugin`, `BezierPlugin`, `AttrPlugin`, `and DirectionalRotationPlugin`，它是最大体积的。当然你可以只下载引用你想用的文档。

## 快速上手

参考中文官网：[TweenMax中文网（GreenSock动画平台,GSAP）](https://www.tweenmax.com.cn/)

![image-20200624124633103](https://tva1.sinaimg.cn/large/007S8ZIlgy1gg3a66sdghj319e0qljyl.jpg)

## 准备代码

```html
<div id="box">
  <div class="boxSmall"></div>
</div>
```

```css
body {
  background-color: #262626;
  font-family: 'Open Sans', sans-serif;
  overflow: hidden;
}
#box {
  background-color: #88ce02;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.boxSmall {
  position: absolute;
  background-color: #70a40b;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 25px;
  height: 75px;
  z-index: 2;
}
```

当然还得引入 GreenSock 文件，这里我们引入的是 **TweenMax** 这个全功能的js文件，为了操作方便我们还需要引入 jquery 来选择和操作 DOM。

```
https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min.js
```

为了演示方便，使用了 codepen 这个代码平台来运行编写效果：https://codepen.io/janily/pen/xwbpGw

们这里操作的物体是这个 ID 为 box 的盒子。首先把它用一个变量存起来，方便后面来操作。在codepen里的js区域编写下面的代码：

```js
var $box = $('#box');
```

## TweenLite.to() 方法

下面就是让它动起来，可以使用 `TweenLite.to()` 方法来使元素动起来。比如，让元素移动到浏览器左边的边缘，我们就可以使用 `TweenLite.to()` 方法。

下面是 `TweenLite.to()` 方法的示意图：

![image-20200624125251863](https://tva1.sinaimg.cn/large/007S8ZIlgy1gg3acr4a3cj30h504ot9t.jpg)

在codepen中加入下面的代码：

```
TweenLite.to($box, 0.7, {left: 0});
```

上面的代码会在0.7秒之内把 `$box` 元素从 CSS 中定义的位置移动到 `body` 的边缘。如下所示：(鼠标移动到右下角，有一个 return 按钮，点击以下就会重新运行代码，就可以看到效果了)。

![image-20200624125321338](https://tva1.sinaimg.cn/large/007S8ZIlgy1gg3ad99xbdj30hs05smx9.jpg)

[demo地址](http://codepen.io/janily/pen/meypPB)

小问题：那就是 `$box` 元素只有一半露出来了，应该是全部显示的，这是为什么呢？

![image-20200624125347917](https://tva1.sinaimg.cn/large/007S8ZIlgy1gg3adq68sgj30ha09xwg9.jpg)

因为在CSS中定义了 `transform: translate(–50%, –50%)`，这时可以通过定义元素的 `X` 的值来修正这个小bug。

```
TweenLite.to($box, 0.7, {left: 0, x: 0});
```

## TweenLite.from方法

下面来看下 `TweenLite.from` 这个方法。

在上面的例子上，我们修改代码如下：

```
tweenLite.from($box, 2, {x: '-=200px', autoAlpha: 0});
```

![image-20200624125442039](https://tva1.sinaimg.cn/large/007S8ZIlgy1gg3aeo0g0jj30ha06ddh3.jpg)

这个方法是用来使元素从定义在 `.from()` 方法里的位置运动到在 CSS 中定义的位置。

运行这个例子，我们会看到元素从元素左边 200px 的位置运动到元素在 CSS 中定义的位置。

`autoAlpha` 方法是GSAP中一个特别的属性，它把 `opacity` 和 `visibility` 两个属性合二为一了。

![image-20200624125717723](https://tva1.sinaimg.cn/large/007S8ZIlgy1gg3ahdc5kaj30h908wmyy.jpg)

在代码中 `autoAlpha: 0` 表示它会把元素初始化为 `opacity:0;visibility:hidden`。当执行动画效果的时候它会把 `visibility` 的值设置为 `inherit` 以及 `opacity` 值设置为 1。从而产生一个渐现的效果。

## TweenLite.set() 方法

有时候，我们只是想设置元素的一些 CSS 属性并不需要动画效果，比如，重设元素的位置。

这个时候就可以使用 GreenSock 提供的 `.set()` 方法。

去掉我们前面编写的代码除了定义好的$box变量，编写下面的代码：

```js
TweenLite.set($box, {x: '-=200px', scale: 0.3});
TweenLite.set($box, {x: '+=100px', scale: 0.6, delay: 1});
TweenLite.set($box, {x: '-50%', scale: 1, delay: 2});
```

![image-20200624130003892](https://tva1.sinaimg.cn/large/007S8ZIlgy1gg3ak8w2bpj30h909uwh4.jpg)

运行上面的代码，可以看到元素只是单纯的在改变属性并没有动画效果。

在上面的代码中，我们使用 `delay` 这个属性来制定元素属性改变的延迟时间。

要注意一点的是，在最后一个序列中我们重新设置元素的位置为 `x: '-50%'`。

### TweenLite.fromTo() 方法

最后来说一说 `TweenLite.fromTo` 这个方法。

顾名思义，这个方法我们可以定义元素的起始位置：

```
TweenLite.fromTo($box, 2, {x: '-=200px'}, {x: 150});
```

把上面的代码放入到 codepen 中，就可以看到运行的动画效果。

![image-20200624130116929](https://tva1.sinaimg.cn/large/007S8ZIlgy1gg3alj3eoyj30h507kq4q.jpg)

我们定义了元素从左边 200px 的位置开始运动到指定的位置。

`x:150` 会覆盖在CSS中定义的 `transform: translate(–50%, –50%)` 的样式，用新的 `transform: matrix(1, 0, 0, 1, 150, -50)` 样式来代替。

## 缓动曲线

为了使动画效果更有趣，符合真实的物体运动效果。这个时候缓动曲线函数就派上用场了，GreenSock 也提供了各种的运动曲线。

如果使用的是 TweenMax 的话，它已经包含了 EasePack。

EasePack包含下面的这些运动曲线：

1、Back 2、SlowMo 3、StppedEase 4、RoughEase 5、Bounce 6、Circ 7、Elastic 8、Expo 9、Sine

下面来添加ease:Power4.easeInOut来看看实际的效果。

```
TweenLite.fromTo($box, 2, {x: '-=200px'}, {x: 150, ease:Power4.easeInOut});
```

试着添加下面的代码，看看有什么有趣的效果发生？

```
TweenLite.to($box, 0.4, {top: '100%', y: '-100%', ease:Bounce.easeOut, delay: 2});
TweenLite.to($box, 0.7, {x: '-=200px', y: '-100%', ease:Back.easeInOut, delay: 3});
TweenLite.to($box, 0.8, {x: '-=200px', y: '-100%', ease:Back.easeInOut, delay: 4.2});
TweenLite.to($box, 2.5, {top: '50%', y: '-50%', ease:Power0.easeNone, delay: 5});
TweenLite.to($box, 2.5, {x: '+=400px', ease:Elastic.easeInOut, delay: 7.7});
TweenLite.to($box, 2.5, {x: '-=400px', rotation: -720, ease: SlowMo.ease.config(0.1, 0.7, false), delay: 10.4});
```

具体各种运动曲线的效果可以去这个[地址](http://greensock.com/ease-visualizer)看看。

## 回调函数

GreenSock 提供了丰富的回调函数来操作动画效果。

这里以 `.fromTo()` 方法来说明它的用法。

比如，我们想要在动画开始的时候来触发回调函数。首先来创建一个start的函数：

```js
function start(){
  console.log('start');
}
```

触发回调函数，只需要添加下面这句代码就可以了 `onStart:start` 就可以了，非常简单。

```
TweenLite.fromTo($box, 2, {x: '-=200px'}, {x: 150, ease:Power4.easeInOut, onStart: start});
```

打开开发者工具，就可以看到输出的相关信息。

你也可以添加 `onUpdate` 和 `onComplete` 来触发对应的回调函数：

```js
function start(){
  console.log('start');
}
function update(){
  console.log('animating');
}
function complete(){
  console.log('end');
}
```

![image-20200624130402852](/Users/xu/Library/Application Support/typora-user-images/image-20200624130402852.png)

onUpdate会在动画的每一帧触发；onComplete会在动画结束的时候触发。

看看最后的效果。

![image-20200624130702615](https://tva1.sinaimg.cn/large/007S8ZIlgy1gg3arj7ielj30mr076t8s.jpg)

[demo地址](http://codepen.io/janily/pen/ZbYvVQ)

最后再来一些好的 tips：

1、任何的 CSS 属性需要变为驼峰式的写法。比如 `background-color` 修改为 `backgroundColor` 

2、CSS 中的 `transform:rotate()` 变为 `rotation`

3、另外在 GSAP 中的 2Dtransform－scaleX, scaleY, scale, skewX, skewY,x, y, xPercent, 和 yPercent 的使用方法可以去[这个视频](https://www.youtube.com/watch?v=J5twQLXJ-vQ)看看。

4、如果使用SublimeText来作为开发工具，可以下载[GSAP这个代码片段](http://greensock.com/forums/topic/11071-sublimetext-snippets/)。

5、如果你使用JSHint和JSLint作为代码质量检测工具，可以去这看看它在GSAP中的[使用方法](http://greensock.com/forums/topic/11369-gsap-globals-for-jshint/)。

遇到问题随时查看GreenSock的[文档](http://greensock.com/docs/#/HTML5/GSAP/TweenLite/)。

## 动画保存及控制

和`jQuery.animate()`的风格不同，GSAP以动画为主体，你可以这样保存动画：

```
var tween = TweenLite.to("#ball1", 2, {
  x: "+=200px"
});
```

然后你可以做精细的控制：

```
// 暂停
tween.pause();

// 继续播放
tween.resume();

// 反转播放
tween.reverse();

// 跳转到1s进度处开始播放
tween.seek(1);

// 重播
tween.restart();

// 动画变为三倍速
tween.timeScale(3);
```

这些可以看做GSAP作为专业动画库的体现。

## 选择器

前面的例子中反复用到了类似jQuery的选择器，但GSAP并没有自带选择器，相关源码如下：

```
TweenLite.selector = window.$ || window.jQuery || function(e) {
    var selector = window.$ || window.jQuery;
    if (selector) {
        TweenLite.selector = selector;
        return selector(e);
    }
    return (typeof(document) === "undefined") ? e 
    : (document.querySelectorAll ? document.querySelectorAll(e) 
        : document.getElementById((e.charAt(0) === "#") ? e.substr(1) 
            : e));
};
```

GSAP不依赖jQuery，但如果引入了jQuery，GSAP会使用jQuery的选择器，否则回退到`document.querySelectorAll()`及`document.getElementById()`。

## TimelineLite的动画管理

好像`TweenLite` + `css plugin`就已经足够用了，这个Timeline系列是做什么的呢？

想象你是一个动画的导演，你要按剧本安排演员在一个CUT里依次上场和退场。在前文的例子里，我们只有一个演员（`#ball1`），但现在，我们要拍一个有20+演员的动画大片，要怎么办呢？

你也许曾用css3的`animation`做过类似的事情，做法是，当转换到一个场景（CUT）后，为场景里的所有演员依次设定适当的`delay`。只要`delay`计划好，看起来就是漂亮精彩的大片。

不过，这可没有那么简单，假如你已经安排好了20位演员的上场时间，现在改了下剧本，来了第21位演员要在最开始上场，你会发现你可能要依次调整在它之后的所有演员的`delay`...

GSAP的TweenLite也会有同样的问题，因此，我们需要有一个工具来统一管理多个元素的多个动画，这就是TimelineLite。

### 时间轴

如果你做过视频编辑，你一定很熟悉“时间轴”这个概念。简单来说，每一个元素的单次动画都是一段素材，我们需要把它们分别放置到同一个时间轴的适当位置，才能集合在一起得到有序的动画大片。

现在我们引入`TimelineLite`。下面是一个例子：

```
var tl = new TimelineLite();
tl.from("#ball1", 1, {
    y: "-=60px",
    autoAlpha: 0
}).from("#ball2", 1, {
    x: "+=60px",
    autoAlpha: 0
}).from("#ball3", 1, {
    y: "+=60px",
    autoAlpha: 0
}).from("#ball4", 1, {
    x: "-=60px",
    autoAlpha: 0
});
```

效果是：

![TimelineLite顺序动画](https://segmentfault.com/img/bVwF9e)

以上的`tl.from()`等同于以下代码：

```
tl.add(TweenLite.from("#ball1", 1, {
    y: "-=60px",
    autoAlpha: 0
}));
```

可见，TimelineLite像一个容器，它可以通过`add()`方法将TweenLite动画添加到自己的时间轴上。然后，动画将以时间轴为整体，进行播放。

在默认情况下，TimelineLite会这样按添加顺序依次排列它们的位置，就这样，我们不借助`delay`做出了这种较复杂的动画组合。

如果画一下这里的时间轴，是这样的：

![时间轴图示 - 顺序动画](https://segmentfault.com/img/bVwF9g)

### 调整放置位置

如果要让第2个动画不是在第1个刚结束时播放，而是更提前一点，看起来更连贯的话？

这样做：

```
var tl = new TimelineLite();
tl.from("#ball1", 1, {
    y: "-=60px",
    autoAlpha: 0
}).from("#ball2", 1, {
    x: "+=60px",
    autoAlpha: 0
}, "-=0.7").from("#ball3", 1, {
    y: "+=60px",
    autoAlpha: 0
}, "-=0.7").from("#ball4", 1, {
    x: "-=60px",
    autoAlpha: 0
}, "-=0.7");
```

其中`tl.from(target, duration, vars, position)`等同于`tl.add(TweenLite.from(target, duration, vars), position);`，这里的`position`参数指定动画在时间轴上的位置，默认为`+=0`也就是取前一个动画的结束点。以上的`-=0.7`就是相对这个位置再提前0.7s，这样就让动画互相之间有了重叠，看起来更连贯流畅一些。

效果：

![TimelineLite调整动画](https://segmentfault.com/img/bVwF9i)

时间轴像这样：

![时间轴图示 - 调整动画](https://segmentfault.com/img/bVwF9j)

### 时间轴控制

把多个动画装进时间轴的重要作用是，可以当做一个整体进行控制和调整。时间轴的这些方法类似TweenLite：

```
// 在1s时间进度位置暂停
tl.pause(1);

// ... （和前面tween一样）

// 跳转到50%进度处
tl.progess(0.5);
```

### 相同动画的简便方法

如果多个元素的动画是一样的，而且它们需要有规律地安排在时间轴的不同位置，那么非常适合用`staggerFrom()`、`staggerTo()`及`staggerFromTo()`。例如：

```
tl.staggerFrom(["#ball1", "#ball2", "#ball3", "#ball4", ], 1, {
    scale: "-=0.5",
    autoAlpha: 0
}, 2);
```

这样使用数组，就可以同时选中多个元素。

效果是：

![间隔规律动画](https://segmentfault.com/img/bVwF9n)

可以看到，每一个元素按照顺序依次执行动画，间隔2s。

## TimelineMax和TweenMax

如果你觉得还需要一些动画和时间轴的更高级功能（如同一动画间隔重复），可以选择TimelineMax和TweenMax。它们并不需要更多的学习成本，如字面意思所示，TweenMax是TweenLite的升级版，拥有其全部特性，只是增加了一些额外的高级控制。它们的语法完全一致，你可以试试用全局搜索把所有TweenLite替换成TweenMax，不会有任何影响。TimelineMax和TimelineLite的关系也是如此。

## 补充信息

### 浏览器兼容性

可以到IE6（使用jQuery1.x的选择器）。

另外，不要期望在不支持的浏览器上做3d transform动画。

### 指定默认缓动

如果你大部分动画都使用同一种缓动函数，那么用`TweenLite.defaultEase`会很方便，比如修改为`Expo.easeOut`：

```
TweenLite.defaultEase = Expo.easeOut;
```

### 动画结束后清空style属性

默认情况下，执行过动画的元素会留下`style`的内联样式，如果你担心这可能造成额外影响，可以设定`clearProps`参数清空它：

```
TweenLite.to("#ball1", 2, {
    x: 200,
    clearProps: "all",
    autoAlpha: 0
});
```

如果只需要清理个别样式，单独写出来即可，如`clearProps: "opacity"`。

### autoAlpha的作用

前文反复用到的`autoAlpha`并不是css属性，而是GSAP给定的一个特殊属性。`autoAlpha`是`opacity`和`visibility`这2个css属性的结合。

为什么要结合起来呢？一般来说，`opacity`为`0`的不可见元素，我们会认为它也是不可交互的（比如`onclick`不触发），因此附加`visibility: hidden`可以保证这一点。GSAP会正确处理动画过程中这2个css属性的变化。

### 备忘单

GSAP有一份包含丰富参考代码的[备忘单](https://ihatetomatoes.net/greensock-cheat-sheet/)（Cheat Sheet），可以帮助你节约时间。

## 结语

GSAP里的很多概念和API设计可以追溯到flash时代。虽然flash在今天已经很少被使用，但“flash动画”一词能够深入人心是有它的原因的。

GSAP是专业动画库，在大部分情况下，它也具备更好的动画性能。如果你打算在网页里制作一个动画大片，那你现在应该知道什么可以帮助你了 :) 。

## 参考文章

文章来自于[Simple GreenSock Tutorial – Your first steps with GSAP](https://ihatetomatoes.net/simple-greensock-tutorial-your-first-steps-with-gsap/) + http://acgtofe.com/posts/2016/05/gsap-for-animation-pro

另外推荐一些有用的学习资源：

- [Jump Start: GSAP JS](https://greensock.com/jump-start-js)
- [Getting Started Guide](http://greensock.com/get-started-js)
- [GSAP Forum](http://greensock.com/forums/forum/11-gsap/)
- [GreenSock course at Noble Desktop in New York](https://nobledesktop.com/classes/greensock)
- [GreenSock course workbook](https://nobledesktop.com/books/gsap)
- [GreenSock Workshop](https://ihatetomatoes.net/product/greensock-workshop/)

- [GreenSock (TweenMax) 简单入门教程](https://juejin.im/entry/591a600f128fe1005cdae46f)
- [[动画]快速入手 GSAP](https://juejin.im/post/58d4f52544d9040068659edd)
- [GSAP - 专业的 Web 动画库](https://segmentfault.com/a/1190000005366176)
- [GreenSocks Animation Platform详细工作机制](https://zhuanlan.zhihu.com/p/74465798)