---
title: HTML 常用标签
date: 2019-06-14
categories:
 - frontEnd
tags:
 - html
---

## 1 - 链接

> 又称超链接，设置页面中允许被点击的内容。

```
【标签】<a></a>
【属性】
href：链接地址（要跳转到的页面的地址）
target：目标，打开新网页的形式
取值：
     _blank：在新标签页中打开
     _self：在自身页面中打开（默认值）
title：鼠标放到链接上的提示
```

```
<!-- 新窗口打开 -->
<a href="http://www.baidu.com" target="_blank">百度</a>
<!-- 旧窗口打开 -->
<a href="http://www.baidu.com" target="_self">百度</a>
<!-- 父级窗口打开 -->
<a href="http://www.baidu.com" target="_parent">百度</a>
<!-- 顶层窗口打开 -->
<a href="http://www.baidu.com" target="_top">百度</a>

<a href="http://www.baidu.com" download>下载</a>
content-type: application/octet-stream 浏览器会以下载的形式响应请求，而不是展示

<!-- 无协议，自动继承协议 -->
<a href="//www.baidu.com">下载</a>

<!-- 路径 -->
<a href="xxx.html">下载</a>

<!-- 条件查询 -->
<a href="xxxx?name=qqqq">下载</a>

<!-- 路锚点是不发送请求的 -->
<a href="#sss">下载</a>

<!-- 伪协议 -->
<a href="javascript: alert(1);">下载</a>
<!-- 使用 a 标签但是不跳转 -->
<a href="javascript:;">下载</a>
```



## 2 - 文本标记

- 特殊字符

```
空格： 
<:  <
>:  ≷  
©:  ©
￥: ¥ 
```

- 文本样式

  ### 

```
斜体：<i></i>
粗体：<b></b>
删除线：<s></s>
下划线：<u></u>
上标：<sup></sup>
下标：<sub></sub>
```

- 标题元素

```
以标题的形式来显示文本内容
<h1></h1>
<h2></h2>
<h3></h3>
<h4></h4>
<h5></h5>
<h6></h6>
【特点】
- 改变字号（一级最大，六级最小）
- 加粗显示
- 上下有垂直的空白距离
- 独立成行
```

- 段落元素

```
【标签】<p></p>
【特点】
- 默认文字大小
- 独立成行
- 上下垂直空白
```

- 换行元素

```
【标签】<br>
```

- 分隔线元素

```
【标签】<hr>
【属性】
        size：尺寸，取值单位为 px（像素），可以省略
        width：宽度，取值单位为px（像素）可以省略或百分比
        color：颜色，取值自然颜色值
        align：水平对齐方式，取值：left/center/right
```

- 分区元素

```
（1）块分区元素：<div></div>
【特点】独立成行
【作用】页面布局
（2）行内分区元素：<span></span>
【特点】多个元素在一行内显示
【作用】设置同一行文字内的不同格式
```

- 行内元素与块级元素

```
（1）块级元素（div 、p、h1~h6）
【特点】元素会独占一行，即元素前后都会自动换行，主要用于网页布局
（2）、行内元素（ span、i、b、s、u、sub、sup、img、a）
【特点】不会换行，多个元素会在一行内显示
```



## 3 - 图像

- 路径

```
URL：Uniform Resource Locator（统一资源定位器，俗称：路径） 
作用：标识网络任何资源的位置

（1）绝对路径：从文件所在的最高级目录下开始查找资源文件所经过的路径
-包括网络资源&本地资源（如：E:\mmper\练习\img\flower.jpg）
（2）相对路径：从当前文件位置处开始，查找资源文件所经过的路径
- 同目录，直接用， 直接通过资源文件名称进行引用（a.jpg）
- 子目录，进入到子目录中，然后再对资源文件进行引用（img/a.jpg）
- 父目录，返回到父级目录再对资源文件进行引用（../a.jpg）
```

- 图像

```
【标签】<img>
【属性】
        src：图片地址（绝对/相对）
        width：图像宽度
        height：图像高度
```



## 4 - 表格

```
由<table>元素定义。
【标签】<table></table>
【属性】
        width ：设置表格的宽度
        height：设置表格的高度
        align：设置表格的对齐方式，取值: left/center/right
        border：设置表格边框宽度
        cellpadding：内边距（单元格边框与内容之间的距离）
        cellspacing：外边距（单元格之间的距离）
        bgcolor：设置表格的背景颜色
```

- table中包含的子元素

```
<table></table>中包含的子元素：
【标签】<tr></tr> （创建表行）
【属性】
       align：该行内容水平对齐方式，取值: left/center/right
       valign：该行内容的垂直对齐方式，取值: top/middle/bottom
       bgcolor：设置表格的背景颜色

【标签】<td></td> （创建单元格）
【属性】
        align：内容水平对齐方式
        valign：内容垂直对齐方式
        width ：宽度
        height ：高度
【标签】<caption></caption> （表格标题）
【标签】<th></th> （列标题）
        行标题或列标题，字体有加粗的效果，放在tr中
【标签】<thead></thead> （表头）
【标签】<tbody></tbody> 表主体）
【标签】<tfoot></tfoot> （表尾）
```

- 一个完整的表格

```
<caption>标题文本</caption>
<table>
   <thead>
    <tr>
      <td>姓名</td>
       <td>性别</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>张三</td>
      <td>男</td>
    </tr>
    <tr>
      <td>李四</td>
      <td>女</td>
    </tr>
  </tbody>
</table>
```

- 两行两列的表格

```
<table>
  <tr>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
  </tr>
</table>
```

- 表格的其他应用

```
（1）不规则表格
- 跨列：从指定单元格位置处，横向向右合并几个（包含自己）单元格
  属性：colspan=值（数字，合并单元格的个数）;
- 跨行：从指定单元格位置处，纵向向下合并几个（包含自己）单元格
  属性：rowspan=值（数字，合并单元格的个数）;
（2）表格的嵌套
  在单元格中去嵌套另一个表格，但嵌套的表格必须要放在td中
```

跳转页面（HTTP POST 请求）

属性见 MDN：<https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form>

```
username=lalalal&password=123123
// 如果是中文（英文字母和特殊字符之外）会被转义成特殊编码
// 也就是 utf-8 的 三个字节
```

- 必须要有提交按钮（submit）
- 主要是用来发起一个 post 请求的，响应啥，不管
- file 协议不支持 post，我们需要使用 `http-server`
- 只能写两个值：post/get，而 get 一般不用，所以就要用 post，get 会把参数放到查询里面
- get 请求是没有第四部分的，post 有



## 5 - 列表

> 将一组具有相似特征或者具有先后顺序的内容按照从上到下的顺序排列在一起

- 有序列表

```
<ol>
    <li></li>
</ol>
【属性】
        type:指定列表项标志的类型，默认为数字排列
        取值：1（默认值）/a/A/i/I
        start:定义起始值(数字)，默认从1开始
        取值：数字，如：start:1;  start:i;等 
```

- 无序列表

```
<ul>
     <li></li>
</ul>
【属性】
        type：指定无序列表的列表项标识
        取值： disc,默认,实心圆/circle，空心圆/square，实心矩形none，不显示标识
```

- 自定义列表

```
<dl>
  <dt>列表中的标题内容</dt>
  <dd>列表中的数据</dd>
</dl>
使用场合：图文混排时使用
```



## 6- 表单

```
由<form>定义，将用户输入的数据提交给后台。
【常见属性】
        action：提交的服务器地址
        method：表单数据提交的方式，取值： get：明文提交/post：隐式提交
        name：定义表单名称，JS用到的比较多
        id： 独一无二的标识
如：<form action="url" method="get/post"> </form>
```

####  input 元素

```
【主要属性】
        type：根据不同的type属性值可以创建各种类型的输入字段
        value：最终提交给服务器的值
        name：控件的名称，提供给服务器使用，没有name，控件则无法提交
        id：唯一标识，只能在当前页面使用，服务器不能用
        disabled：禁用，不能被提交
```

- 常用的表单控件：

```
（1）文本框：<input type="text">
（2）密码框：<input type="password">
 【专有属性】
         maxlength：限制输入的字符数，取值：数字
         readonly：设置文本控件只读
（3）单选按钮：<input type="radio">
（4）复选框：<input type="checkbox">
【专有属性】
         checked，设置默认被选中
（5）提交按钮：<input type="submit">
（6）重置按钮：<input type="reset">
（7）普通按钮：<input type="button">
（8）图片按钮：<input type="image" src=""> 
（9）隐藏域：<input type="hidden">
（10）文件选择框：<input type="file">
```

#### 按钮（提交按钮）

```
<button>内容</button>
```

#### 下拉选择框 select 和 option

```
<section name="">
  <option value="" selected></option>
</section>
```



## 7- 结构标记

> HTML5所提供的结构标记，专门用于表示常见的网页结构（即制作布局），提升布局代码的语义性和可读性

- 常见结构标记

```
<header></header>：定义文档的页眉即页面顶部信息
<nav></nav>：定义页面的导航链接部分
<section></section>：定义文档中的节，文档中主体内容
<article></article> ：定义独立于文档的其他部分内容(章、节等)
<footer></footer>：定义某区域的脚注信息，页面底部内容等
<aside></aside>：多用于侧边栏和相关引用信息等
```



## 8 - iframe 框架

嵌套的浏览上下文, 有效地将另一个HTML页面嵌入到当前页面中。在HTML 4.01中，文档可能包含头部和正文，或头部和框架集，但不能包含正文和框架集。但是，可以在正常的文档主体中使用。每个浏览上下文都有自己的会话历史记录和活动文档。包含嵌入内容的浏览上下文称为父浏览上下文。顶级浏览上下文（没有父级）通常是浏览器窗口。

```
<iframe name="xxx" src="https://www.baidu.com" frameborder="0"></iframe>
<a target="xxx" href="http://xxx.html">加载子页面</a>
```



## 9 - `input / button`

区别：是否为空标签

input 的属性见：<https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input>

​	type="button" 没什么卵用~

​	submit 唯一能确定表单能不能提交的按钮

​	所有没给 name 的东西，提交是没有数据的

```html
// 成对出现的初级写法
<label for="xxx">用户名<label><input type="text" id="xxx">
  
// 另一种写法，为什么，不知道呢
<label>用户名<input type="text"><label>
  
<label>用户名<input type="checkbox" name="loveme" va;ue="yes">爱我<label>
  
```

button 的属性见：<https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button>

> button 如果没有写 type，那么就会自动升级为 submit 按钮





## 空标签 

> 一个**空元素（empty element）**可能是 HTML，SVG，或者 MathML 里的一个不可能存在子节点（例如内嵌的元素或者元素内的文本）的 element。

> 在 HTML 中，通常在一个空元素上使用一个闭标签是无效的。例如， `<input type="text"></input>` 的闭标签是无效的 HTML。

在 HTML 中由以下空标签：

```
在 HTML 中由以下空标签：
	<area>
	<base>
	<br>
	<col>
	<colgroup> when the span is present
	<command>
	<embed>
	<hr>
	<img>
	<input>
	<keygen>
	<link>
	<meta>
	<param>
	<source>
	<track>
	<wbr>
```



## 可替换标签

> **可替换元素**（**replaced element**）的展现效果不是由 CSS 来控制的。这些元素是一种外部对象，它们外观的渲染，是独立于 CSS 的。

> 内容不受当前文档的样式的影响。

```
典型的可替换元素有：
	<iframe>
	<video>
	<embed>
	<img>
```

```
有些元素仅在特定情况下被作为可替换元素处理，例如：
	<option>
	<audio>
	<canvas>
	<object>
	<applet>
```

