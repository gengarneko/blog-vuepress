---
title: React.js 可视化编辑工具
date: 2020-06-24
categories:
 - frontEnd
tags:
 - React.js
---
本文主要关于前端可视化编辑工具的实现思路
<!-- more -->
## 可视化编辑工具定位

面向初级前端开发者和后端人员，通过拖拽和配置，快速生成前端页面，搭建项目。

技术栈：Node.js + React.js，最终的可视化编辑工具做到好用，需要深入到 AST 抽象语法树。

可视化工具已经有很多很多的人做过了，能参考的例子还是非常多的。

## 如何提高开发效率

借助可视化编辑工具快速生成简易中台，节省开发成本与周期。参考阿里云凤蝶将移动端建站功能切换成中台的快速开发平台。

如何实现前端项目快速开发？参考文章：[减少代码量的 7~8 种方式](https://www.phodal.com/blog/code-reuse/)

1. 代码复用：脚手架（快速创建新应用），组件库（基础 UI 组件、复合组件、业务组件），模式库（代码集，依赖包），模板（（模板和模板应用，页面级模板引入路由自动生成）
2. 工程化（规范，标准化输出，统一开发环境，TS 强类型）
3. 工具（CLI 编写的一系列自动化代码工具相互配合，形成自己的解决方案，下载脚手架，配置安装依赖，集成组件库，配置自动化部署脚本，一系列工作自动化，参照 Angular CLI，Angular Schematics，容器发布模板）
4. 编辑器插件（snppets 代码段，输入关键字自动生成，typings 智能提示参数或者代码段）
5. 组件设计系统（storybook 集成㢟开发调试和文档说明的平台，赋值代码段直接可用）
6. 降低程序员的代码量，就是提升效率
7. 物料资源

大致介绍以上的点：

### 脚手架

和我们平时用到的 vue-cli / create-react-app 类似，用命令行的方式快速初始化一个项目，我们的设想是，这个 CLI 工具可以帮助我们快速初始化一个符合规范的项目架构和相关依赖。工具发布到 NPM 仓库，使用者也可以全局下载，然后用命令行的方式去使用，这样可以省去使用者初始化项目的步骤，实现一个规范项目的初始化标准流程。也可以通过命令快速生成文件到某一个目录或生成多个文件到关联目录，如果你使用过 `Laravel tinker`，就会体验到这种方式是多么便捷了。当然也可以参考 Angular CLI，它的一套 CLI 工具在三大框架中算是最强大的了。

### 工程化

做一套项目规范，这种规范不会细化到变量函数定位规则等，更多的是大规范，保证标准化输出。

### 编辑器插件

比如开发 VSCode 插件，针对我们自己的规划和项目结构做代码自动生成。

### 组件设计系统

比如 storybook，集成了组件开发、预览、调试和文档说明的一整套方案，组件代码可以直接复制使用，方便我们快速、系统地开发组件。

### 减少代码量

减少手写代码量就是效率的提升

### 物料资源

可以把封装过的组件和区块（区块这个概念可以比照 antd-design 那一套来看），把页面级别的区块当作是一种资源，这种资源可以做版本维护和修改，下次使用功能的时候直接拿来用就好。上传图片也可以作为一种资源池，需要的时候直接去资源池中选取，不用多次重复上传。

### 可视化编辑器工具

重点，通过预置组件，拖拽快速生成页面布局，继续拖入组件丰富页面，然后编辑器工具读取组件的 props 配置信息，用可视化配置的方式配置组建的 props，使用者可以预览组件，最后下载保存代码，在浏览器端就可以生成 file.jsx 代码文件，通过浏览器下载，整个过程不需要后端参与。

## 编辑器工具

### 业务架构

用两张图庙湖整体业务结构

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gg3nchmz96j30zk0oydhh.jpg)

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gg3nbzmhedj30zk0q7mys.jpg)

这里面会涉及到几个概念，组件，插件，区块，模板，具体解释图上也都有备注，强调一点的是这些统称为物料资源，为的就是代码复用，减少代码量。

### 编辑器配置原理

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gg3nkpx5qtj31980u0wi7.jpg)

这张图是上文提到的组件 props 配置的原理图。当某一个预置组件被拖入到主操作区的时候，点选当前组件对象，组件的props 配置信息会通过 不同值类型的表单组件展示出来。例如：String 类型就用 Input 组件展示， Boolean 值用 Switch 组件展示。配置表单组件具体是哪种是由需要配置的值类型决定的。

### 编辑器总体架构

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gg3nmgsprgj30zk0oimzf.jpg)

整体形成一个闭环，也就是我们整个可视化编辑工具和配套的CLI 工具等等提升开发效率的配套设施是可以循环往复，不断迭代具有生命力的。

再从右下角看，我们一系列工具最终生成的是一个完整的项目，项目是由CLI 命令行初始化后，然后由一个个组件构成的，这些组件聚合生成区块，也就是页面级别的组件，再通过拖拽的方式，将组件拖拽到编辑器的主操作区，形成组件数据树形结构。

编辑器通过拖拽构造一套组件树对象，拖拽的时候其实修改的是组件树的 JSON 结构。通过修改数据，然后驱动页面的即时更新，这一块交给 React 去完成就好了，我们只需要用 JSON 数据树描述好组件树和组件配置 props 以及组件之间的层级关系就好了。编辑器输出的是 JSON 数据，然后通过解析引擎将 JSON 对象编译还原成组件，生成一个大的组件树，通过 React 模板文件，最后生成一个 file.jsx 的 React 文件，这个文件放入到 umi.js 的 pages 目录就可以直接访问了。你可以把这个文件理解为我们日常写的 react 组件或页面文件。

以下是涉及的概念：

#### 组件

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gg3nqcfcq9j30zk0hkt9y.jpg)

这个图片描述了更具体的组件概念，是系统里的最小资源级别，其他的大区块都是基于和这个构建的。

#### 区块

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gg3nqsm1qsj30zk0nsgoh.jpg)
区块是页面级别的，可以通过代码库实现版本维护，具体可以参照 antd-design 的区块来理解。图片中右侧的图示就是 整个区块的生命周期逻辑。

#### 模板

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gg3nrr5a97j30zk0l50u8.jpg)

#### 编译

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gg3ns59ydkj30zk0kywgt.jpg)

这里说的编译还是最基础的编辑，暂时没有深入到 AST抽象语法树和,编译是代码自动生成的原理支撑。个人觉得，想要把可视化编辑器工具做好，后期必须得深入到 AST 编译层面。

#### 可视化配置

- 可视化拖拽 + 即时编译预览
- 拖拽映射到HTML树形结构->AST->生成代码
- 可视化生成块，解析后生成的代码可以复制
- 后期实现生成的代码直接生成或者修改源文件
- 拖拽生成文件时可以选择目标目录

配置的方式不仅仅只有 props 一种，下面列举下我想到的

- config.json + JSON-Schema
- Template
- Props
- States
- Service存储
- LocalStorage存储

#### 数据驱动

数据驱动是你一定要做好的思维转化，你拖拽操作最终映射的是数据结构的变化，将数据交给react vue 这样的框架，让框架去做UI渲染，整个工具开发过程中，深刻的体会到了自己的短板，深层次的数据结构和算法。大家一定要重视这两方面的能力哦。用一张图来形容数据驱动。

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gg3ntllij6j30zk0geq4f.jpg)



#### Node.js 服务支撑

- 浏览器没法操作文件，用Node.js做浏览器功能拓展
- 服务端支撑，操作文件和读取系统信息
- Node操作文件流，CLI命令行的底层支撑和核心

目前整个编辑器的实现没有用到 node 做拓展，但是综上所述，浏览器在操作文件这一块是存在问题的，后期需要引如 node 做浏览器的功能拓展。

#### CLI 工具可以有哪些功能？

- 命令行脚本
- 快速查创建项目（可交互式选择布局）/ git clone
- 快速创建块
- 快速创建文件( 数据+模板=文件 )，路由随之生成
- 项目快速发布脚本
- 底层支撑就是Node
- 可参照Angular CLI

#### 即时编译预览

这里用一张图描述了 rect 是怎么实现热更新和即时预览功能的

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gg3nv4c90sj30zk0pcdhw.jpg)

目前在做可视化编辑相关项目的有很多，但是真正好用的几乎没有。 阿里的氚云，内部项目 金蝉，对外项目云凤蝶等。但是这个方向的确是一个大的趋势，我总结了一个这个方向的未来展望：

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gg3nvhwnb1j30zk09xmy5.jpg)

最终应该会发展到 AI 编程和无代码。

### 存在的问题：

暂时无法解决自动生成数据流和业务逻辑。虽然生成了 react 文件，但是在数据流自动生成和 业务逻辑自动生成遇到很大的障碍，如果朋友们有好的解决办法，有兴趣可以评论留言一起讨论下。这里只能贴一些技术架构和原理了，具体代码展示没法展示出来。

文中一直提到我们，其实这个项目就是我一个人在做，非常吃力，需要考虑的配套设施和技术攻关的太多了，不是很容易快速的看到成绩...目前除了遇到的数据流自动生成问题外，其他的基本用实际代码论证了方案的可行性，也有一个可以生成 react.jsx 文件的编辑器雏形。

目前也有一些类似的工具开源了，但是我做的工具跟大部分的都有一个区别就是我输出的是 react.jsx 文件，很多工具输出的是 渲染后的页面。

#### 相关概念

[无代码编程平台，可视化编辑工具](https://cloud.tencent.com/developer/article/1443477)

程序=数据+算法

要做到无码, 就必须有数据和算法

#### 参考例子

在技术方案调研过程中找到了一些比较好的原理分析和代码实现，在这里给大家贴一下

[页面可视化搭建工具前生今世](https://github.com/CntChen/cntchen.github.io/issues/15)

[页面可视化搭建工具前生今世： 文章介绍](https://zhuanlan.zhihu.com/p/37171897)

[页面搭建工具的死与生](https://www.cnblogs.com/sskyy/p/6496287.html)

[区块可视化代码编辑器](https://github.com/sww1230/blockVisualEditor)

[一个简单易用的电商活动页面生成系统](https://juejin.im/post/5cf328706fb9a07f042030f0)

[使用 React 写个简单的活动页面运营系统 - 设计篇](https://segmentfault.com/a/1190000004540256)

[携程：活动专题系统搭建过程中我的一些思考](https://www.dazhuanlan.com/2019/10/07/5d9a698bdde35/)

上面这个是新鲜出炉的，看作者是国庆最后一天发布的

[政采云的鲁班：前端工程实践之可视化搭建系统（一）](https://juejin.im/post/5d8774bff265da03ae78b2a1)

[【电商】用可视化编辑，解构看起来非常炫酷的专题页面](https://www.jianshu.com/p/c4359a7338d3)

[运满满的：如何设计高扩展的在线网页制作平台](https://juejin.im/post/5bd83daee51d4524b50d23b5)

[云凤蝶中台研发提效实践](https://zhuanlan.zhihu.com/p/78425921)

[gaea-editor](https://github.com/ascoders/gaea-editor)

[基于Angular的](https://riccio.gitee.io/panel-magic/#/mock)

[X-Page-Editor-Vue](https://github.com/OXOYO/X-Page-Editor-Vue)

[Vue-Layout](https://github.com/jaweii/Vue-Layout)

[点石](http://www.h5ds.com/) 这个刚开始的时候官网看着很粗躁，貌似挣钱了？

[antd-visual-editor](https://github.com/xinyu198736/antd-visual-editor)

[十倍效能提升——Web 基础研发体系的建立](https://www.cnblogs.com/sskyy/p/8613393.html)

[页面可视化搭建工具技术要点](https://mp.weixin.qq.com/s/90JJAFhGokKmicOQZxdAGg)

[从前到后搭建专题系统 ](http://www.sohu.com/a/168498868_505779)

[grapesjs](https://grapesjs.com/)

[如何搭建一个功能复杂的前端配置化框架(一)](https://www.cnblogs.com/wukong-holmes/p/9287763.html)

[可视化在线编辑器架构设计](https://www.jianshu.com/p/840e0b0b2c6a)

[gaea-editor](https://github.com/ascoders/gaea-editor)

上面的文章作者好像挺牛逼的

[uform智能表单](https://uformjs.org)

上面这个智能表单思路可以解决 组件可视化配置表单的问题

[腾讯 IMWeb社区：积木系统，将运营系统做到极致](https://cloud.tencent.com/developer/article/1055079)

[QQ的：如何保证H5页面高质量低成本快速生成？](http://caibaojian.com/toutiao/7411)

[百度的：前端即服务-通向零成本开发之路](https://os.alipayobjects.com/rmsportal/sJqXvOtwePsVWGNIwlas.pdf)

[百度外卖如何做到前端开发配置化](https://juejin.im/post/59536bad6fb9a06ba024d96d)

[百度外卖blocks 开源地址](https://github.com/Eyot424/blocks)

[美团乐高的](https://zhuanlan.zhihu.com/p/27288444)

[人人贷：活动运营自动化平台实践](https://zhuanlan.zhihu.com/p/68108055)

[转转的：持续迭代的电商可视化运营页面生成系统](https://www.cnblogs.com/zhuanzhuanfe/p/10500786.html)

[京东的：商城活动页面构建系统——通天塔](https://blog.csdn.net/zl1zl2zl3/article/details/84661421)

[阿里云：云凤蝶](https://www.yunfengdie.com/intro)

[阿里云](https://help.aliyun.com/document_detail/124738.html?spm=a2c4g.11186623.6.895.5c794ad6sIQEIS)

[阿里云：宜搭](https://www.aliwork.com/?spm=a2c4g.11186623.2.12.5e7d39eeQjvxHj)

[imgcook](https://imgcook.taobao.org/)

[飞冰](https://ice.work/)

阿里的内部好像还有一个 【金蝉】

[无代码编程](https://zhuanlan.zhihu.com/p/61288928)

上面的无代码编程原理架构图很形象

### 附加

云凤蝶的2.0规划跟我想要实现的设想太像了，当然我也是参考了很多 ice飞冰项目思想。可惜云凤蝶还没开源，不然可以节约我们很多踩坑的时间，哈哈哈...,看下面👇的文章 [云凤蝶可视化搭建的推导与实现](https://zhuanlan.zhihu.com/p/101665976)

[云凤蝶中台研发提效实践](https://zhuanlan.zhihu.com/p/78425921)

[云凤蝶后期是要搞智能中台可视化搭建？](https://zhuanlan.zhihu.com/p/54422324)

国外的

[structor](https://github.com/ipselon/structor)

[bubble](https://bubble.io/)

[vvvebjs](http://www.vvveb.com/vvvebjs/editor.html)

[forestadmin](https://www.forestadmin.com/)

[colonel-kurtz](https://github.com/vigetlabs/colonel-kurtz)

[mobirise](https://mobirise.com/)

 放一个 可视化拖拽里的一个知识点：

```
<!DOCTYPE html>
<html>
<head>
	<title>拖拽测试</title>
	<style type="text/css">
		#target{
			height: 160px;
			width: 200px;
			border:1px solid #000;
			position: relative;
		}
		.dot{
			position: absolute;
			width: 10px;
			height: 10px;
			border: 1px solid pink;
			border-radius: 50%;
			background: #fff;
		}
		.left{
			top:50%;
			left: -6px;
			transform: translateY(-50%);
			cursor: w-resize;
		}
		.top{
			top:-6px;
			left: 50%;
			transform: translateX(-50%);
			cursor: n-resize;
		}
		.right{
			top:50%;
			right: -6px;
			transform: translateY(-50%);
			cursor: e-resize;
		}
		.bottom{
			left:50%;
			bottom:-6px;
			transform: translateX(-50%);
			cursor: s-resize;
		}
	</style>
</head>
<body>
	<div id="target"></div>

	<script type="text/javascript">
		window.onload = function () {
			var startX, startY, moveX, moveY, status, width, height, direction
			var target = document.getElementById('target')
			var arr = ['top', 'left', 'right', 'bottom']
			var len = arr.length
			for(var i = 0; i < len; i++){
				var div = document.createElement("div")
				div.classList.add("dot", arr[i])
				div.dataset.direction = arr[i]
				target.appendChild(div)

				div.addEventListener("mousedown", function(event){
					event.stopPropagation()
					startX = event.clientX
					startY = event.clientY
					width = target.offsetWidth
					height = target.offsetHeight
					direction = event.target.dataset.direction
					status = true
				})
			}

			document.addEventListener("mousemove", function(event){
				event.stopPropagation()
				if(status){
					moveX = event.clientX - startX 
					moveY = event.clientY - startY
					switch (direction) {
						case 'top':
							target.style.height = height + moveY + 'px'
							break;
						case 'right':
							target.style.width = width + moveX + 'px'
							break;
						case 'bottom':
							target.style.height = height + moveY + 'px'
							break;
						case 'left':
							target.style.width = width + moveX + 'px'
							break;
					}
				}
			})

			document.addEventListener("mouseup", function(event){
				event.stopPropagation()
				status = false
			})
		}
	</script>
</body>
</html>
复制代码
```

实现元素 拖拽式修改 元素的宽高。示例里面的元素不是绝对定位的，所以请忽略（左，上两个拖拽指示按钮），实现了元素的左右，上下 改变宽高的功能。



作者：winyh
链接：https://juejin.im/post/5d7ae944f265da03c5033e38