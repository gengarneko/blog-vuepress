---
title: CSS - 布局套路
date: 2019-08-02
categories:
 - frontEnd
tags:
 - css
---

## 布局套路

#### 布局流程图

​	要支持 IE 8 嘛？

- 是：Float 布局，定宽	
- 否：Flex 布局，弹性宽度

#### 原则

- 不到万不得已，不要写死 width 和 height
- 尽量用高级语法，如 calc，flex
- 如果是 ie，就全部写死

#### 口诀

1. float
   1. 儿子全加 float: left（right）
   2. 老子加 .clearfix
2. flex
   1. 老子加 display: flex
   2. 老子加 justify-content: sapce-between

如果宽度不够，可以用 margin: 0 -4px;

```
.clearfix:after {
    content: '';
    diplay: block;
    clear: both;
}
.clearfix {
    zoom: 1;
}
```



## 浮动布局

最为古老的布局~运用最为广泛的布局~



百分比布局：

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
      border: 1px solid green;
    }
    .child {
      border: 1px solid red;
    }
    .child:nth-child(1) {
      float: left;
      width: 30%;
    }
    .child:nth-child(2) {
      float: left;
      width: 70%;
    }
    .clearfix {
      zoom: 1;
    }
    .clearfix::after {
      content: '';
      display: block;
      clear: both;
    }
  </style>
</head>
<body>
  <div class="parent clearfix">
    <div class="child">
      儿子1
    </div>
    <div class="child">
      儿子2
    </div>
  </div>
</body>
</html>
```

```css
.clearfix:after {
    content: '';
    diplay: block;
    clear: both;
}
.clearfix {
    zoom: 1;
}
```

这是最省力的方法，不要加 overflow: hidden; 



写死宽度的布局：

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
      outline: 1px solid green;
      width: 1000px;
      margin-left: auto;
      margin-right: auto;
    }
    .child {
      border: 1px solid red;
    }
    .child:nth-child(1) {
      float: left;
      width: 200px;
    }
    .child:nth-child(2) {
      float: left;
      width: 800px;
    }
    .clearfix {
      zoom: 1;
    }
    .clearfix::after {
      content: '';
      display: block;
      clear: both;
    }
  </style>
</head>
<body>
  <div class="parent clearfix">
    <div class="child">
      儿子1
    </div>
    <div class="child">
      儿子2
    </div>
  </div>
</body>
</html>
```



### 现在我们用 float 做一个标准网页：

导航栏：

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
      width: 700px;
      margin-left: auto;
      margin-right: auto;
      background: #ddd;
    }
    .child {
    }
    .child:nth-child(1) {
      float: left;
      width: 100px;
      height: 36px;
      background: #333;
      color: #fff;
      line-height: 36px;
      text-align: center;
    }
    .child:nth-child(2) {
      float: right;
    }
    .nav {
      line-height: 24px;
      padding: 6px 0;
    }
    .nav-item {
      float: left;
      margin: 0 10px;
    }
    .clearfix {
      zoom: 1;
    }
    .clearfix::after {
      content: '';
      display: block;
      clear: both;
    }
  </style>
</head>
<body>
  <div class="parent clearfix">
    <div class="child">
      logo
    </div>
    <div class="child">
      <div class="nav clearfix">
        <div class="nav-item">导航1</div>
        <div class="nav-item">导航2</div>
        <div class="nav-item">导航3</div>
        <div class="nav-item">导航4</div>
        <div class="nav-item">导航5</div>
      </div>
    </div>
  </div>
</body>
</html>
```

banner + pic：

我们使用 margin-left 来完成平均布局：

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
    .clearfix {zoom: 1;}
    .clearfix::after {content: '';display: block;clear: both;}

    .parent {
      width: 1000px;
      margin-left: auto;
      margin-right: auto;
      background: #ddd;
      min-width: 600px;
    }
    .child {
    }
    .child:nth-child(1) {
      float: left;
      width: 100px;
      height: 36px;
      background: #333;
      color: #fff;
      line-height: 36px;
      text-align: center;
    }
    .child:nth-child(2) {
      float: right;
    }
    .nav {
      line-height: 24px;
      padding: 6px 0;
    }
    .nav-item {
      float: left;
      margin: 0 10px;
    }
    .banner {
      width: 800px;
      height: 200px;
      background: blue;
      margin: auto;
      margin-top: 10px;
    }
    .pictures {
      width: 800px;
      margin: auto;
    }
    .picture {
      width: 194px;
      /* height: 191px; */
      padding-bottom: 194px;
      background: #666;
      margin: 4px;
      float: left;
    }
    .pictures > .xxx {
      background: red;
      margin-left: -4px;
      margin-right: -4px;
    }
    /* .picture:nth-child(4n+1) {
      margin-left: 0;
    }
    .picture:nth-child(4n) {
      margin-right: 0;
    } */
  </style>
</head>
<body>
  <div class="parent clearfix">
    <div class="child">
      logo
    </div>
    <div class="child">
      <div class="nav clearfix">
        <div class="nav-item">导航1</div>
        <div class="nav-item">导航2</div>
        <div class="nav-item">导航3</div>
        <div class="nav-item">导航4</div>
        <div class="nav-item">导航5</div>
      </div>
    </div>
  </div>
  <div class="banner"></div>
  <div class="pictures">
    <div class="xxx clearfix">
      <div class="picture"></div>
      <div class="picture"></div>
      <div class="picture"></div>
      <div class="picture"></div>
      <div class="picture"></div>
      <div class="picture"></div>
      <div class="picture"></div>
    </div>
  </div>
</body>
</html>
```

我们用外面的容器来完成居中，用中间容器来完成宽度设置，里面的容器来存放我们的主要内容。

### 



### 然后我们用 flex 来做一个网页布局

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
    .clearfix {zoom: 1;}
    .clearfix::after {content: '';display: block;clear: both;}

    .parent {
      width: 1000px;
      margin-left: auto;
      margin-right: auto;
      background: #ddd;
      min-width: 600px;
    }
    .child {
    }
    .child:nth-child(1) {
      float: left;
      width: 100px;
      height: 36px;
      background: #333;
      color: #fff;
      line-height: 36px;
      text-align: center;
    }
    .child:nth-child(2) {
      float: right;
    }
    .nav {
      line-height: 24px;
      padding: 6px 0;
    }
    .nav-item {
      float: left;
      margin: 0 10px;
    }
    .banner {
      width: 800px;
      height: 200px;
      background: blue;
      margin: auto;
      margin-top: 10px;
    }
    .pictures {
      width: 800px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

    }
    .picture {
      width: 194px;
      /* height: 191px; */
      padding-bottom: 194px;
      background: #666;
      float: left;
      margin: 4px 0;
    }
  </style>
</head>
<body>
  <div class="parent clearfix">
    <div class="child">
      logo
    </div>
    <div class="child">
      <div class="nav clearfix">
        <div class="nav-item">导航1</div>
        <div class="nav-item">导航2</div>
        <div class="nav-item">导航3</div>
        <div class="nav-item">导航4</div>
        <div class="nav-item">导航5</div>
      </div>
    </div>
  </div>
  <div class="banner"></div>
  <div class="pictures">
    <div class="picture"></div>
    <div class="picture"></div>
    <div class="picture"></div>
    <div class="picture"></div>
    <div class="picture"></div>
    <div class="picture"></div>
    <div class="picture"></div>
    <div class="picture"></div>
  </div>
</body>
</html>
```

这样子写，有一个 bug，如果我们少了一个 div，比如我们只有哦七个子容器，那么第二行样式就会不好看。

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
    .clearfix {zoom: 1;}
    .clearfix::after {content: '';display: block;clear: both;}

    .parent {
      width: 1000px;
      margin-left: auto;
      margin-right: auto;
      background: #ddd;
      min-width: 600px;
    }
    .child {
    }
    .child:nth-child(1) {
      float: left;
      width: 100px;
      height: 36px;
      background: #333;
      color: #fff;
      line-height: 36px;
      text-align: center;
    }
    .child:nth-child(2) {
      float: right;
    }
    .nav {
      line-height: 24px;
      padding: 6px 0;
    }
    .nav-item {
      float: left;
      margin: 0 10px;
    }
    .banner {
      width: 800px;
      height: 200px;
      background: blue;
      margin: auto;
      margin-top: 10px;
    }
    .pictures {
      width: 800px;
      margin: 0 auto;
    }
    .pictures > .xxx {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -4px;
    }
    .picture {
      width: 194px;
      /* height: 191px; */
      padding-bottom: 194px;
      background: #666;
      float: left;
      margin: 4px;
    }
  </style>
</head>
<body>
  <div class="parent clearfix">
    <div class="child">
      logo
    </div>
    <div class="child">
      <div class="nav clearfix">
        <div class="nav-item">导航1</div>
        <div class="nav-item">导航2</div>
        <div class="nav-item">导航3</div>
        <div class="nav-item">导航4</div>
        <div class="nav-item">导航5</div>
      </div>
    </div>
  </div>
  <div class="banner"></div>
  <div class="pictures">
    <div class="xxx">
      <div class="picture"></div>
      <div class="picture"></div>
      <div class="picture"></div>
      <div class="picture"></div>
      <div class="picture"></div>
      <div class="picture"></div>
      <div class="picture"></div>
    </div>
  </div>
</body>
</html>
```

这时候我们可以用中间容器来 flex 布局 + margin: 0 -4px; 组合完成我们的页面布局。

现在我们的宽度是写死的，我们可以不写死~我们这样写：

```css
.picture {
      width: calc(25% - 8px);
      height: 0;
      /* height: 191px; */
      padding-bottom: 194px;
      background: #666;
      float: left;
      margin: 4px;
    }
```

这样它就会自己计算宽度，当然前提是不要写死我们的宽度，它就会自适应~



### 现在我们来做一下广告栏

广告我们是不能用 .ad 来写的，因为有一些广告屏蔽软件会识别我们的 .ad class 的 div。

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
    .clearfix {zoom: 1;}
    .clearfix::after {content: '';display: block;clear: both;}

    .parent {
      width: 1000px;
      margin-left: auto;
      margin-right: auto;
      background: #ddd;
      min-width: 600px;
    }
    .child {
    }
    .child:nth-child(1) {
      float: left;
      width: 100px;
      height: 36px;
      background: #333;
      color: #fff;
      line-height: 36px;
      text-align: center;
    }
    .child:nth-child(2) {
      float: right;
    }
    .nav {
      line-height: 24px;
      padding: 6px 0;
    }
    .nav-item {
      float: left;
      margin: 0 10px;
    }
    .banner {
      width: 800px;
      height: 200px;
      background: blue;
      margin: auto;
      margin-top: 10px;
    }
    .pictures {
      width: 800px;
      margin: 0 auto;
    }
    .pictures > .xxx {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -4px;
    }
    .picture {
      width: calc(25% - 8px);
      height: 0;
      /* height: 191px; */
      padding-bottom: 194px;
      background: #666;
      float: left;
      margin: 4px;
    }
    .art {
      height: 300px;
      padding-bottom: 300px;
      width: 800px;
      background: red;
      margin: 0 auto;
      margin-top: 10px;
    }
    .art > .sider {
      float: left;
      width: 33.3333%;
      height: 300px;
    }
    .art > .main {
      float: left;
      width: 66.666666%;
      height: 300px;
    }
    .sider-content {
      border: 1px solid black;
      margin-right: 20px;
      height: 300px;
    }
    .main-content {
      border: 1px solid black;
    }
  </style>
</head>
<body>
  <div class="parent clearfix">
    <div class="child">
      logo
    </div>
    <div class="child">
      <div class="nav clearfix">
        <div class="nav-item">导航1</div>
        <div class="nav-item">导航2</div>
        <div class="nav-item">导航3</div>
        <div class="nav-item">导航4</div>
        <div class="nav-item">导航5</div>
      </div>
    </div>
  </div>
  <div class="art clearfix">
    <div class="sider">
      <div class="sider-content">ad1</div>
    </div>
    <div class="main">
      <div class="main-content">ad2</div>
    </div>
  </div>
  <div class="banner"></div>
  <div class="pictures">
    <div class="xxx">
      <div class="picture"></div>
      <div class="picture"></div>
      <div class="picture"></div>
      <div class="picture"></div>
      <div class="picture"></div>
      <div class="picture"></div>
      <div class="picture"></div>
    </div>
  </div>
</body>
</html>
```

然后我们来改一下间距：

```css
.art > .sider {
      float: left;
      width: calc(33.3333% - 20px);
      height: 300px;
      margin-right: 20px;
    }
    .art > .main {
      float: left;
      width: 66.666666%;
      height: 300px;
    }
    .sider-content {
      border: 1px solid black;
      height: 300px;
    }
    .main-content {
      border: 1px solid black;
      height: 300px;
    }
```



### Flex 进行重做 ad 区域

```css
	.art {
      height: 300px;
      padding-bottom: 300px;
      width: 800px;
      background: red;
      margin: 0 auto;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }
    .art > .sider {
      border: 1px solid black;
      height: 300px;
      width: calc(33.3333% - 20px);
    }
    .art > .main {
      border: 1px solid black;
      width: 66.666666%;
      height: 300px;
    }
```

PC 上的布局我们就做完了







## 进行移动端布局

 加上 meta：vp

<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maxmum-scale=1.0, minimum-scale=1.0">



```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maxmum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    *{margin: 0;padding: 0;box-sizing: border-box;}
    body {
      /* overflow: hidden; */
    }
    .clearfix {zoom: 1;}
    .clearfix::after {content: '';display: block;clear: both;}

    .parent {
      /* width: 1000px; */
      margin-left: auto;
      margin-right: auto;
      background: #ddd;
    }
    .child {
    }
    .child:nth-child(1) {
      float: left;
      width: 100px;
      height: 36px;
      background: #333;
      color: #fff;
      line-height: 36px;
      text-align: center;
    }
    .child:nth-child(2) {
      float: right;
    }
    .parent .nav2 {
      display: none;
    }
    .nav {
      line-height: 24px;
      padding: 6px 0;
    }
    .nav-item {
      margin: 0 10px;
    }
    .banner {
      width: 800px;
      height: 200px;
      background: blue;
      margin: auto;
      margin-top: 10px;
    }
    .pictures {
      width: 800px;
      margin: 0 auto;
    }
    .pictures > .xxx {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -4px;
    }
    .picture {
      width: calc(25% - 8px);
      height: 0;
      /* height: 191px; */
      padding-bottom: 194px;
      background: #666;
      float: left;
      margin: 4px;
    }
    .art {
      height: 300px;
      padding-bottom: 300px;
      width: 800px;
      background: red;
      margin: 0 auto;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }
    .art > .sider {
      border: 1px solid black;
      height: 300px;
      width: calc(33.3333% - 20px);
    }
    .art > .main {
      border: 1px solid black;
      width: 66.666666%;
      height: 300px;
    }
    @media(max-width: 420px) {
      .parent .nav2 {
        display: block;
      }
      .nav {
        display: none;
      }
      .banner {
        width: auto;
      }
      .pictures {
        width: auto;
      }
      .picture {
        width: calc(50% - 8px);
        height: 0;
        padding-bottom: 194px;
        background: #666;
        float: left;
        margin: 4px;
      }
      .art {
        width: auto;
        flex-direction: column;
      }
      .art > .sider {
        height: 300px;
        width: auto;
      }
      .art > .main {
        width: auto;
        height: 300px;
      }
      .pictures {
        overflow: hidden;
      }
    }
  </style>
</head>
<body>
  <div class="parent clearfix">
    <div class="child">
      logo
    </div>
    <div class="child">
      <div class="nav clearfix">
        <div class="nav-item">导航1</div>
        <div class="nav-item">导航2</div>
        <div class="nav-item">导航3</div>
        <div class="nav-item">导航4</div>
        <div class="nav-item">导航5</div>
      </div>
      <div class="nav2">三</div>
    </div>
  </div>
  <div class="banner"></div>
  <div class="pictures">
    <div class="xxx">
      <div class="picture"></div>
      <div class="picture"></div>
      <div class="picture"></div>
      <div class="picture"></div>
      <div class="picture"></div>
      <div class="picture"></div>
      <div class="picture"></div>
    </div>
  </div>
  <div class="art">
    <div class="sider">
      ad1
    </div>
    <div class="main">
      ad2
    </div>
  </div>
</body>
</html>
```



## 注意：图片变形问题

图片变形是非常重要的一个问题，解决方案： 

​	不要用 img 标签！我们用 background-image

```css
background: transparent url(https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=d631197e9f45d688bc02b4a494c37dab/4b90f603738da9772cde5666bd51f8198718e38e.jpg) no-repeat center;
background-size: cover;
```

