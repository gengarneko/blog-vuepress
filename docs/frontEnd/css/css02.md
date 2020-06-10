---
title: CSS - 堆叠上下文
date: 2019-07-05
categories:
 - frontEnd
tags:
 - css
---

## 目录

1. 什么是堆叠顺序。
2. 什么是堆叠上下文。

参考博文：https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/

> 思考：浮动元素是脱离文档流的，绝对定位的元素是脱离文档流的，那么谁的浮动层级更高呢？



## 堆叠顺序

1. background
2. border
3. 块级
4. 浮动
5. 内联
6. z-index: 0
7. z-index: +

如果是兄弟元素重叠，那么后面的盖在前面的身上。



### 盒模型与堆叠上下文

初始化：我们写一个 div 然后给它 10px 的 border 和一个背景色。

问题：border 和 bgColor 是什么关系？

答案：border 是浮在 bgColor 上面

问题：我们继续在 div 中写一个 “你好”，谁的层级更高？

答案：文字（内联元素）的层级更高

问题：我们在 div 中写一个子元素，它和文字哪个层级更高？

答案：div（块级元素）层及更高

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfnk5doe26j30gt0abjrk.jpg)

这是 CSS2.1 时期的堆叠顺序。

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfnk5galu5j30g50ajglt.jpg)

现在 position: relative 层级是最高的。

只有被定位的元素才能被 z-index 提高，position 不是 static 的元素（不为默认值）才能被提高。

z-index 在 auto 和 0 的时候是不会提高的，只有正数才能生效。

![1543992801127](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfnk5ju9s2j30kn0dejuf.jpg)



## 堆叠（层叠）上下文

可以理解为堆叠作用域。跟 BFC 一样，我们只知道一些属性会触发堆叠上下文，但是并不知道堆叠上下文是什么。

文档中的层叠上下文由满足以下任意一个条件的元素形成：

- 根元素（HTML）
- z-index 值不为 “auto” 的绝对/相对定位
- 一个 z-index 值不为 “auto” 的 flex 项目（flex item），即：父元素 display: flex | inline-flex
- opacity 属性值小于 1 的元素（参考 the specification for opacity）
- transform 属性值不为 “none” 的元素
- mix-blend-mode 属性值不为 “normal” 的元素
- filter 值不为 “none” 的元素
- perspective 值不为 “none” 的元素
- isolation 属性被设置为 “isolate” 的元素
- position: fixed
- 在 will-change 中指定了任意 CSS 属性，即便你没有直接指定这些属性的值（参考文章）
- -webkit-overflow-scrolling 属性被设置 “touch” 的元素

层叠上下文是 HTML 元素的三位概念，这些 HTML 元素在一条假想的相对于面向（电脑屏幕的）视窗或者网页的用户的 z 轴上延伸，HTML 元素一句其自身属性按照优先级顺序（上图）占用层叠上下文空间。



我们可以看到 css 的文档里面只说概念的特征，不说概念的含义。就好比我们定义一个桌子，除了外形还要加上其作用，我们需要观察和试验才能得出。

只要是堆叠上下文，那么其中的 负index 元素就会浮动上来。





## 堆叠上下文对 z-index 的影响

两个知识点：

- 八层堆叠顺序
- 堆叠上下文
  - 一个元素写一个透明度 opacity，就有堆叠上下文

堆叠上下文主要影响的是 z-index，如果子元素的父元素的等级比较高，那随之而来的，它本身也比较高，即使它和同辈的比起来，z-index 比较低，但是它依然可以覆盖它的堂兄弟。

背景和边框这两层是不可分割的，即使有负数 z-index 子元素存在，那它也是在 border 层上面。

