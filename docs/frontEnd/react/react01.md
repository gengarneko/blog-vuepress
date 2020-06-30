---
title: React 整理手册
date: 2020-06-30
categories:
 - frontEnd
tags:
 - React
sidebarDepth: 6
---
React 是一个声明式，高效且灵活的用于构建用户界面的 JavaScript 库。使用 React 可以将一些简短、独立的代码片段组合成复杂的 UI 界面，这些代码片段被称作“组件”。
<!-- more -->
## React 入门

用于构建用户界面的 JavaScript 库



### 目标

掌握 create-react-app 的使用



### 资源

1. [React](https://zh-hans.reactjs.org/)
2. [create-react-app](https://facebook.github.io/create-react-app/docs/getting-started)



### 起步

1. 创建项目 `npx creacte-react-app my-app`
2. 打开项目 `cd my-app`
3. 启动项目 `yarn start`
4. 暴露配置项 `npm run eject` （不可逆）

![image-20200630105956411](https://tva1.sinaimg.cn/large/007S8ZIlgy1gga4sxe7jkj30fg0d275y.jpg)



### 文件目录

![image-20200630113237873](https://tva1.sinaimg.cn/large/007S8ZIlgy1gga5qvxt9pj306n06raab.jpg)



### CRA 文件结构

```
├── README.md 						⽂档
├── public 								静态资源
│ ├── favicon.ico 
│ ├── index.html 
│ └── manifest.json 
└── src										源码
	├── App.css
	├── App.js							根组件
	├── App.test.js
	├── index.css						全局样式
	├── index.js						⼊⼝⽂件
	├── logo.svg
	└── serviceWorker.js 		pwa⽀持
├── package.json					npm 依赖
```



### 入口文件 `index.js` 简单介绍

```js
// React 负责逻辑控制，数据 -> VDOM
import React from 'react';
// ReactDOM 渲染实际 DOM，VDOM -> DOM
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

```

- `import React from 'react';`：*React 负责逻辑控制，数据 -> VDOM*
- `import ReactDOM from 'react-dom';`：ReactDOM 负责渲染实际 DOM，VDOM -> DOM
- `import App from './App';`：`App.js` 文件，根模板，将这个对象的虚拟 DOM 渲染成真实 DOM 后插入到 `root div` 中，我们可以在 `index.html` 文件中看到 `root div`
- `App.js`：返回一个 HTML 片段，使用 JSX 语法



### ⼊⼝⽂件 `webpack.conﬁg.js` 定义：

```js
entry: [ 
// WebpackDevServer客户端，它实现开发时热更新功能 
isEnvDevelopment && 
require.resolve('react-dev-utils/webpackHotDevClient'), 
// 应⽤程序⼊⼝：src/index 
paths.appIndexJs, 
].filter(Boolean),
```

webpack.conﬁg.js 是 webpack 配置⽂件，开头的常量声明可以看出 cra 能够⽀持 ts、sass 及 css 模块化。

```js
// Check if TypeScript is setup 
const useTypeScript = fs.existsSync(paths.appTsConfig);

// style files regexes 
const cssRegex = /\.css$/; 
const cssModuleRegex = /\.module\.css$/; 
const sassRegex = /\.(scss|sass)$/; 
const sassModuleRegex = /\.module\.(scss|sass)$/;
```



### React 和 ReactDOM

删除 src 下⾯所有代码，新建 index.js

```js
import React from 'react'; 
import ReactDOM from 'react-dom';

// 这⾥怎么没有出现React字眼？ 
// JSX => React.createElement(...)
ReactDOM.render(<h1>Hello React</h1>, document.querySelector('#root'));
```

> React 负责逻辑控制，数据 -> VDOM 
>
> ReactDOM 渲染实际 DOM，VDOM -> DOM 
>
> React 使⽤ JSX 来描述 UI 
>
> babel-loader 把 JSX 编译成相应的 JS 对象，React.createElement 再把这个 JS 对象构造成 React 需要的虚拟 DOM



## JSX 语法

它被称为 JSX，是一个 JavaScript 的语法扩展。我们建议在 React 中配合使用 JSX，JSX 可以很好地描述 UI 应该呈现出它应有交互的本质形式。JSX 可能会使人联想到模版语言，但它具有 JavaScript 的全部功能。



### 目标

掌握 JSX 语法



### 资源

[JSX 简介](https://zh-hans.reactjs.org/docs/introducing-jsx.html)



### 起步

### JSX

JSX 是一种 JavaScript 的语法扩展，其格式比较像模板语言，但事实上完全是在 JavaScript 内部实现的

JSX 可以很好地描述 UI，能够提高开发效率



### 基本使用

表达式 `{}` 的使用：

```js
const name = "react study"; 
const jsx = <div>hello, {name}</div>;
```



### 函数

函数是合法表达式：

```js
const obj = {
	firstName: 'Harry'
  lastName: 'Potter'
}
function formatName(name) {
  return name.fristName + '' + name.lastName
}
const jsx = <div>{ formatName(user) }</div>
```



### 对象

JSX 是 JS 对象，是合法表达是：

```js
const greet = <div>good</div>
const jsx = <div>{ greet }</div>
```



### 条件语句

条件语句可以基于以上概念实现：

```js
const show = true // false
const greet = <div>good</div>
const jsx = (
	<div>
		{/* 条件语句 */}
		{show ? greet : '登录' }
		{show && greet}
	</div>
)
```



### 数组

数组会被作为一组子元素对待，数组中存放一组 JSX 可用于显示列表数据

```js
const a = [0, 1, 2]
const jsx = (
	<div>
		{/* 数组 */}
		<ul>
			{/*diff 时候，首先比较 type，然后是 key，所以同级同类型的元素，key 值必须得唯一*/}
			{a.map(item => (
				<li key={item}>{ item }<li>
			))}
		</ul>
	</div>
)
```



### 属性的使用

```js
import logo from "./logo.svg"

const jsx = (
	<div> 
		{/* 属性：静态值⽤双引号，动态值⽤花括号；class、for 等要特殊处理。 */} 
		<img src={logo} style={{ width: 100 }} className="img" /> 
	</div> 
)
```



### 模块化

css 模块化，创建 index.module.css，index.js

```js
import style from "./index.module.css"
<img className={style.logo} />
```

`npm install sass -D`

```js
import style from "./index.module.scss"
<img className={style.logo} />
```



## 组件

### 目标

掌握组件使用



### 资源

[组件 & Props](https://zh-hans.reactjs.org/docs/components-and-props.html)



### 起步

### 组件

从概念上类似于 JavaScript 函数，它接受任意的入参（"props"），并返回用于描述页面展示内容的 React 元素

两种形式：

- `class 组件` 
- `function 组件`

### class 组件

`class` 组件通常拥有状态和生命周期，继承于 `Component`，实现 `render` 方法：

```js
// 一个 Clock 组件
import React, { Component } from "react"

export default class ClassComponent extends React.Component {
	constructor(props) {
		super(props);
		// 使⽤state属性维护状态，在构造函数中初始化状态 
		this.state = { date: new Date() }
	}
	componentDidMount() {
		// 组件挂载之后启动定时器每秒更新状态
    this.timerID = setInterval(() => {
    	// 使⽤setState⽅法更新状态
      this.setState({ date: new Date() })
    }, 1000)
  }
  componentWillUnmount() {
  	// 组件卸载前停⽌定时器
    clearInterval(this.timerID)
  }
  componentDidUpdate() {
    console.log("componentDidUpdate")
  }
  render() {
    return <div>{this.state.date.toLocaleTimeString()}</div>
  }
}
```



### function 组件

函数组件通常无状态，仅关注内容展示，返回渲染结果即可

> 从 React 16.8 开始引入了 hooks，函数组件也能够拥有状态

用 function 组件创建一个 Clock

```js
import React, { useState, useEffect } from 'react'

export function FunctionComponent(props) {
	const [date, setDate] = useState(new Date()
	useEffect(() => {//副作⽤ 
		const timer = setInterval(() => { 
      setDate(new Date())
    }, 1000); 
    return () => clearInterval(timer);//组件卸载的时候执⾏ 
  }, []); 
  return ( 
    <div> 
    	<h3>FunctionComponent</h3> 
    	<p>{date.toLocaleTimeString()}</p> 
		</div> 
	)
}
```

> 提示: 如果你熟悉 React class 的⽣命周期函数，你可以把 useEffect Hook 看做 componentDidMount ， componentDidUpdate 和 componentWillUnmount 三个函数的组合。
>
> hooks api 后⾯会继续深⼊讲解。



## 正确使用 setState

### 目标

掌握 setState 的用法



### 资源

[State & 生命周期](https://zh-hans.reactjs.org/docs/state-and-lifecycle.html)



### 起步

### 正确使用 setState

```js
setState(partialState, callback)
```

1. `partialState`：object | function -- 用于产生与当前 `state` 合并的子集
2. `callback`：function -- state 更新之后被调用



### 关于 `setState()` 应该了解的

### 不要直接修改 State

例如，此代码不会重新渲染组件：

```js
// 错误示范 
this.state.comment = 'Hello';
```

⽽是应该使⽤ setState() :

```js
// 正确使⽤ 
this.setState({comment: 'Hell
```



### State 的更新可能是异步的

出于性能考虑，React 可能会把多个 `setState()` 调⽤合并成⼀个调⽤。

观察以下例⼦中 log 的值和 button 显示的 counter。

```js
import React, { Component } from "react";

export default class SetStatePage extends Component { 
	constructor(props) { 
		super(props); 
		this.state = { 
			counter: 0 
    };
  }

	changeValue = v => { 
    // 并没有同步更新，得到的是上一次的值
    this.setState({ counter: this.state.counter + v }); 
    console.log("counter", this.state.counter); 
  };

	setCounter = () => { 
    this.changeValue(1); 
    //this.changeValue(2); 
    //console.log("counter", this.state.counter); 
  }; 

	render() { 
    const { counter } = this.state; 
    return ( 
      <div>
      	<h3>SetStatePage</h3>
				<button onClick={this.setCounter}>{counter}</button>
			</div> 
		);
	}
}
```



如果要获得最新状态值有以下方式：

1. 在回调中获取状态值，使用 setState 的结构，callback 参数

   ```js
   changeValue = v => {
     this.setState(
       { counter: this.state + v },
       () => { console.log('counter', this.state.counter) }
     )
   }
   ```

2. 使用定时器

   ```js
   setTimeout(() => {
     this.setCounter()
   }, 0)
   ```

3. 原生状态中修改状态

   ```js
   componentDisMount() {
     document.body.addEventListener('click', this.changeValue, false)
   }
   ```

> 总结： setState 只有在合成事件和生命周期函数中是异步的，在原生事件和 setTimeout 中都是同步的，这里的异步其实是批量更新。



### State 的更新会被合并

```js
changeValue = v => { 
  this.setState({ 
    counter: this.state.counter + v 
  }); 
}; 

setCounter = () => { 
  this.changeValue(1); 
  this.changeValue(2); // 后者覆盖前者，因为 key 相同，改的是同一个值Ò
};
```

如果想要链式更新 state：

```js
changeValue = v => { 
  this.setState(state => ({ counter: state.counter + v })); 
}; 

setCounter = () => {
	this.changeValue(1);
	this.changeValue(2); 
};
```



## 生命周期

### 目标

- 掌握组件生命周期



### 资源

- [组件的生命周期](https://zh-hans.reactjs.org/docs/react-component.html#the-component-lifecycle)

- [生命周期图谱](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)



### 知识要点

### 生命周期方法

生命周期方法，用于在不同组件不同阶段执行自定义功能。在组件被创建并插入到 DOM 时（挂载中阶段 mounting），组件更新时，组件取消挂载或从 DOM 中删除时，都有可以使用的声明周期方法。



### v16.3 之前的生命周期

![image-20200630144249308](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggab8gqkx3j30ec0jjdkj.jpg)



### v16.4 之后的生命周期

![image-20200630144330061](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggab93eqhbj30v10f3jt6.jpg)

V17可能会废弃的三个⽣命周期函数⽤ getDerivedStateFromProps 替代，⽬前使⽤的话加上 UNSAFE_：

- componentWillMount 
- componentWillReceiveProps 
- componentWillUpdate

引⼊两个新的⽣命周期函数：

- static getDerivedStateFromProps 

- getSnapshotBeforeUpdate

如果不想⼿动给将要废弃的⽣命周期添加 UNSAFE_ 前缀，可以⽤下⾯的命令：

```js
npx react-codemod rename-unsafe-lifecycles <path>
```



### 新引入的两个生命周期

### getDerivedStateFromProps

```js
static getDerivedStateFromProps(props, state)
```

`getDerivedStateFromProps` 会在调用 `render()` 方法之前调用，并且在挂载及后续更新时都会被调用。它返回一个对象来更新 state，如果返回 null 则不更新任何内容

请注意，不管原因是什么，都会在每次渲染前触发此方法，这与 `UNSAFE_componentWillReceiveProps` 形成对比，后者在父组件重新渲染时触发，而不是在内部调用 `setState` 时

### getSnapshotBeforeUpdate

```js
getSnapshotBeforeUpdate(prevProps, prevState)
```

在 `render()` 之后，在 `componentDidUpdate` 之前

`getSnapshotBeforeUpdate()` 在最近一次渲染输出（提交到 DOM 节点）之前调用，它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递给 `componentDidUpdate(prevProps, prevState, snapshot)`



### 验证生命周期

范例：创建 `LifeCyclePage.js`

```js
import React, { Component } from "react"; 
import PropTypes from "prop-types"; 
/* 
	V17可能会废弃的三个⽣命周期函数⽤getDerivedStateFromProps替代，⽬前使⽤的话加上 
	UNSAFE_：
		- componentWillMount
		- componentWillReceiveProps
		- componentWillUpdate 
*/

export default class LifeCyclePage extends Component { 
  static defaultProps = { 
    msg: "omg" 
  }; 
	static propTypes = { 
    msg: PropTypes.string.isRequired 
  }; 
	constructor(props) { 
    super(props); 
    this.state = { 
      count: 0, 
    }; 
    console.log("constructor", this.state.count);

	}

	static getDerivedStateFromProps(props, state) {
		// getDerivedStateFromProps 会在调⽤ render ⽅法之前调⽤， 
    //并且在初始挂载及后续更新时都会被调⽤。
		//它应返回⼀个对象来更新 state，如果返回 null 则不更新任何内容。 
    const { count } = state; 
    console.log("getDerivedStateFromProps", count); 
    return count < 5 ? null : { count: 0 };
	} 
	//在render之后，在componentDidUpdate之前。
	getSnapshotBeforeUpdate(prevProps, prevState, snapshot) { 
    const { count } = prevState; 
    console.log("getSnapshotBeforeUpdate", count); return null; 
  } 

	/* UNSAFE_componentWillMount() {
		//不推荐，将会被废弃
		console.log("componentWillMount", this.state.count); 
	} */ 

	componentDidMount() {
		console.log("componentDidMount", this.state.count); 
  } 

	componentWillUnmount() {
		//组件卸载之前
		console.log("componentWillUnmount", this.state.count); 
  } 

	/* UNSAFE_componentWillUpdate() {
		//不推荐，将会被废弃
		console.log("componentWillUpdate", this.state.count); 
  } */ 
	
	componentDidUpdate() {
		console.log("componentDidUpdate", this.state.count); 
  }

	shouldComponentUpdate(nextProps, nextState) { 
    const { count } = nextState; 
    console.log("shouldComponentUpdate", count, nextState.count); 
    return count !== 3; 
  }

	setCount = () => { 
    this.setState({ count: this.state.count + 1, }); 
  };

	render() {
		const { count } = this.state; 
    console.log("render", this.state); 
    return (
			<div>
				<h1>我是LifeCycle⻚页⾯</h1>
				<p>{count}</p>
				<button onClick={this.setCount}>改变count</button> 
				{/* {!!(count % 2) && <Foo />} */} 
				<Child count={count} /> </div> 
		);
	}
}

class Child extends Component {
	UNSAFE_componentWillReceiveProps(nextProps) { 
    //不推荐，将会被废弃 
    // UNSAFE_componentWillReceiveProps() 会在已挂载的组件接收新的 props 之前被调⽤ 
    console.log("Foo componentWillReceiveProps"); 
  } 
  
  componentWillUnmount() { 
    //组件卸载之前 
    console.log(" Foo componentWillUnmount"); 
  } 
  
  render() { 
    return ( 
      <div style={{ border: "solid 1px black", margin: "10px", padding: "10px" }} > 
      	我是Foo组件 
				<div>Foo count: {this.props.count}</div> 
			</div> 
		);
	}
}
```



## 组件复合

### 目标

- 掌握组件化开发中的实现技术之一：组件复合 - Composition

### 知识要点

- 组件复合 - Composition

### 资源

- [组合 vs 继承](https://zh-hans.reactjs.org/docs/composition-vs-inheritance.html)

### 起步

复合组件给与你⾜够的敏捷去定义⾃定义组件的外观和⾏为，这种⽅式更明确和安全。如果组件间有公⽤的⾮ UI 逻辑，将它们抽取为 JS 模块导⼊使⽤⽽不是继承它。

![image-20200630150926992](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggac01xcibj30k60nawmt.jpg)



### 不具名

```js
// 将公共部分抽象出来
import React, { Component } from "react"; 
import TopBar from "../components/TopBar"; 
import BottomBar from "../components/BottomBar";

export default class Layout extends Component { 
  componentDidMount() {
    const { title = '商城' } = this.props
    document.title = title
  }
  render() {
		const { children, showTopBar, showBottomBar } = this.props; 
    console.log("children", children); 
    return ( 
      <div> 
      	{showTopBar && <TopBar />} 
      	{children.content} 
  			{children.txt} 
				<button onClick={children.btnClick}>button</button> 
				{showBottomBar && <BottomBar />} 
      </div> 
   	);
	}
}
```

```js
import React, { Component } from "react"; 
import Layout from "./Layout";

export default class UserPage extends Component {
	render() { 
    return ( 
      <Layout showTopBar={true} showBottomBar={true} title="⽤户中⼼"> 
      	<div> 
      		<h3>UserPage</h3> 
				</div> 
			</Layout> 
		);
	}
}
```



### 具名

参照 vue 的具名插槽，传个对象进去：

```js
import React, { Component } from "react"; 
import Layout from "./Layout";

export default class HomePage extends Component { 
  render() { 
    return (
			<Layout showTopBar={false} showBottomBar={true} title="商城⾸⻚页"> 
        {/* <div> 
              <h3>HomePage</h3> 
            </div> */} 
        {{ 
          content: ( 
            <div> 
              <h3>HomePage</h3> 
            </div> 
          ), 
          txt: "这是个⽂本", 
          btnClick: () => { console.log("btnClick"); } 
        }} 
			</Layout> 
		);
	}
}
```

实现一个简单的复合组件，如 antD 的 Card

```js
import React, { Component } from 'react'

function Card(props) {
	return <div xu="card"> 
    { 
    	props.children 
  	} 
  </div>
}

function Formbutton(props) { 
  return 
    <div className="Formbutton"> 
      <button onClick={props.children.defaultBtns.searchClick}>默认查询</button> 
      <button onClick={props.children.defaultBtns.resetClick}>默认重置</button> 
      { 
        props.children.btns.map((item, index) => { 
          return <button key={'btn' + index} onClick={item.onClick}>{item.title} </button> 
        }) 
      } 
    </div> 
}

export default class CompositionPage extends Component { 
  render() { 
    return (
  		<div>
				<Card> 
      		<p>我是内容</p> 
      	</Card> 
      	CompositionPage 
      	<Card> 
      		<p>我是内容2</p> 
      	</Card> 
      	<Formbutton> 
      		{{ 
      			/* btns: ( 
      				<> 
      					<button onClick={() => console.log('enn')}>查询</button> 
      					<button onClick={() => console.log('enn2')}>查询2</button> 
      				</> ) */ 
          defaultBtns: { 
            searchClick: () => console.log('默认查询'), 
            resetClick: () => console.log('默认重置') 
          }, 
          btns: [ 
            { title: '查询', onClick: () => console.log('查询') }, 
            { title: '重置', onClick: () => console.log('重置') }
          ] 
        }} 
      	</Formbutton> 
			</div>
		)
	}
}
```



## Redux



### 目标

- 什么时候才需要 Redux
- 掌握 Redux 基本用法



### 资源

- [Redux](https://www.redux.org.cn/)



### 你可能不需要 Redux

Redux 是负责组织 state 的工具，但你也要考虑它是否适合你的情况，不要因为有人告诉你要用 Redux 就去用，花点时间想一想使用 Redux 的好处与坏处。

在下列场景中，引入 Redux 是比较明智的：

- 你有着相当大的、随时间变化的数据
- 你的 state 需要有一个单一可靠数据来源
- 你觉得把所有 state 放在最顶层组件中已经无法满足需要了
- 某个组件的状态需要共享

![image-20200630164843942](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggaev5dg3dj30l00bhjsc.jpg)



### Redux

Redux 是 JavaScript 应用的状态容器，提供可预测化的状态管理，它保证程序行为一致性且易于测试。

![image-20200630164958614](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggaewg73u1j30m10fomyu.jpg)



### 安装

```js
npm install redux --save
```



### 上手

制作一个累加器

1. 需要 store 存储数据
2. store 里的 reducer 初始化 state 并定义 state 修改规则
3. 通过 dispatch 一个 action 来提交对数据的修改
4. action 提交到 reducer 函数里，根据传入的 action 的 type，返回新的 state

创建 store：

```js
// src/store/ReduxStore.js

const counterReducer = (state = 0, action) => { 
  switch (action.type) { 
    case 'ADD':
			return state + 1 
    case 'MINUS':
			return state - 1 
    default:
			return state
	}
} 
const store = createStore(counterReducer)

export default store
```



创建 ReduxPage：

```js
import React, { Component } from "react"; 
import store from "../store/ReduxStore";

export default class ReduxPage extends Component { 
	componentDidMount() { 
    store.subscribe(() => { 
      console.log("subscribe"); 
      this.forceUpdate(); 
      //this.setState({}); 
    });
	} 
  add = () => { 
    store.dispatch({ type: "ADD" }); 
  }; 
	minus = () => {
    store.dispatch({ type: "MINUS" }); 
  }; 
	render() { 
    console.log("store", store); 
    return ( 
      <div> 
      	<h3>ReduxPage</h3> 
      	<p>{store.getState()}</p> 
				<button onClick={this.add}>add</button> 
				<button onClick={this.minus}>minus</button> 
			</div> 
		);
	}
}
```

> 如果点击按钮不能更新，是因为没有订阅（subscribe）状态变更

还可以在 `src/index.js` 的 `render` 里订阅状态变更

```js
import store from './store/ReduxStore' 
const render = ()=>{

	ReactDom.render( 
    <App/>, 
    document.querySelector('#root') 
  )
} render()

store.subscribe(render)
```



### 检查点

1. `createStore` 创建 `store`
2. `reducer` 初始化、修改状态函数
3. `getState` 获取状态值
4. `dispatch` 提交更新
5. `subscribe` 变更订阅



## React-Redux

### 目标

- 掌握 react-redux



### 资源

- [react-redux](https://www.redux.org.cn/docs/react-redux/)



### 要点

### 安装

```js
npm install react-redux --save
```



### 使用 react-redux

react-redux 提供了两个 api

1. Provider 为后代组件提供 store
2. connect 为组件提供数据和变更方法

全局提供 store：

```js
// index.js

import React from 'react' 
import ReactDom from 'react-dom' 
import App from './App' 
import store from './store/' 
import { Provider } from 'react-redux'

ReactDom.render( 
  <Provider store={store}> 
  	<App/> 
  </Provider>, 
	document.querySelector('#root') 
)
```

获取状态数据：

```js
// ReactReduxPage.js

import React, { Component } from "react"; 
import { connect } from "react-redux";

class ReactReduxPage extends Component {
	render() { 
    const { num, add, minus } = this.props; 
    return ( 
      <div> 
      	<h1>ReactReduxPage</h1> 
      	<p>{num}</p> 
      	<button onClick={add}>add</button> 
				<button onClick={minus}>minus</button> 
			</div> 
		);
	}
}

const mapStateToProps = state => { 
	return { 
    num: state, 
  }; 
}; 
const mapDispatchToProps = { 
  add: () => { 
    return { type: "add" }; 
  }, 
  minus: () => { 
    return { type: "minus" }; 
  } 
};

export default connect(
	mapStateToProps, //状态映射 
  mapStateToProps mapDispatchToProps, //派发事件映射 
)(ReactReduxPage);
```

> connect 中的参数：state 映射和事件映射



## React-Router

### 目标

- 掌握 react-router



### 资源

- [react-router](https://reacttraining.com/react-router/web/guides/quick-start)
- [react-router 中文文档](https://react-guide.github.io/react-router-cn/index.html)



### 要点

### react-router

react-router 包含三个库：

1. `react-router`：提供最基本的路由功能，实际不会直接安装 react-router
2. `react-router-dom`：
3. `react-router-native`

`react-router` 提供最 基本的路由功能，实际使⽤的时候我们不会直接安装 `react-router`，⽽是根据应⽤运⾏的环境选择安装 `react-router-dom`（在浏览器中使⽤）或 `react-router-native`（在 rn 中使⽤）。`react-router-dom` 和 `react-router-native` 都依赖 `react-router`，所以在安装时，`react-router` 也会⾃动安装，创建web应⽤， 使⽤：

### 安装

```js
npm install --save react-router-dom
```

### 基本使用

react-router 中风行一切皆组件的思想，路由器 -Router、链接 -Link、路由 -Route、独占 -Switch、重定向 -Redirect 都以组件形式存在、

创建 RouterPage.js

```js
import React, { Component } from "react"; 
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class RouterPage extends Component { 
	render() { 
    return ( 
      <div> 
      	<h3>RouterPage</h3> 
      	<Router> 
      		<Link to="/">⾸⻚页</Link> 
      		<Link to="/user">⽤户中⼼</Link>
					
      		{/* 根路由要添加exact，实现精确匹配 */} 
  				<Route 
						exact 
            path="/" 
						component={HomePage} 
						//children={() => <div>children</div>} 
						//render={() => <div>render</div>} 
						/> 
          <Route path="/user" component={UserPage} /> 
        </Router> </div> 
      );
	}
}

class HomePage extends Component { 
  render() { 
    return ( 
      <div> 
      	<h3>HomePage</h3> 
      </div> 
    );
	}
}

class UserPage extends Component { 
  render() { 
    return ( 
      <div> 
      	<h3>UserPage</h3>
      </div> 
    );
  }
}
```



### Route 渲染内容三种方式

Route 渲染优先级：children > component > render

这三种方法互斥，只能选择其中一种

### children: func

有时候，不管 location 是否匹配，你都需要渲染⼀些内容，这时候你可以⽤ children

除了不管 location 是否匹配都会被渲染之外，其它⼯作⽅法与 render 完全⼀样

### render:  func

当你⽤ render 的时候，你调⽤的只是个函数。

只在当 location 匹配的时候渲染

### component: component

只在当 location 匹配的时候渲染



### 404 页面

设定⼀个没有 path 的路由在路由列表最后⾯，表示⼀定匹配

```js
{/* 添加Switch表示仅匹配⼀个*/} 
<Switch> 
	{/* 根路由要添加exact，实现精确匹配 */} 
	<Route 
		exact 
    path="/" 
		component={HomePage} 
		/> 
  <Route 
		path="/user" 
		component={UserPage} 
		/> 
  <Route 
		component={EmptyPage} 
		/> 
</Switch>

class EmptyPage extends Component { 
	render() { 
    return ( 
      <div>
				<h3>EmptyPage-404</h3>
      </div> 
    );
	}
}
```



## PureComponent

### 目标

- 掌握 PureComponent 使用，实现性能优化
- 掌握 PureComponent 原理



### 资源

- [React.PureComponent](https://zh-hans.reactjs.org/docs/react-api.html#reactpurecomponent)



### 知识点

### 实现功能优化

定制了 shouldComponentUpdate 后的 Component：

```js
import React, { Component, PureComponent } from "react";

export default class PureComponentPage extends PureComponent { 							constructor(props) { 
  	super(props); 
  	this.state = { 
      counter: 0, 
      // obj: { 
      // 		num: 2, 
      // }, 
    };
	}

	setCounter = () => {
    this.setState({ 
      counter: 100, 
      // obj: { 
      // 		num: 200, 
      // }, 
    }); 
  };

	render() {
		const { counter, obj } = this.state; 
    console.log("render"); 
    return (
			<div>
				<h1>PuerComponentPage</h1>
				<div onClick={this.setCounter}>counter: {counter}</div>
			</div> 
		);
	}
}
```



### 浅⽐较

缺点是必须要⽤ class 形式，⽽且要注意是浅⽐较（无法应对复杂对象）

![image-20200630181706645](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggahexyjbxj30k90kh126.jpg)



### 与Component

`React.PureComponent` 与 `React.Component` 很相似。两者的区别在于 `React.Component` 并未实 现 `shouldComponentUpdate()` ，⽽ `React.PureComponent` 中以浅层对⽐ `prop` 和 `state` 的⽅式来实现了该函数。

如果赋予 `React` 组件相同的 `props` 和 `state`， `render()` 函数会渲染相同的内容，那么在某些情况下使 ⽤ `React.PureComponent` 可提⾼性能。

> 注意
>
> `React.PureComponent` 中的 `shouldComponentUpdate()` 仅作对象的浅层⽐较。如果对象中含复杂的数据结构，则有可能因为⽆法检查深层的差别，产⽣错误⽐对结果。仅在 `props` 和 `state` 较为简单时才使⽤ `React.PureComponent` ，或者在深层数据结构发⽣变化时 调⽤ `forceUpdate()` 来确保组件被正确地更新。你也可以考虑使⽤ `immutable` 对象加速嵌套数据的⽐较。
>
> 此外， React.PureComponent 中的 shouldComponentUpdate() 将跳过所有⼦组件树的 prop 更新。因此，请确保所有⼦组件也都是“纯”的组件。

![image-20200630182142096](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggahjpmb0gj30dn072gou.jpg)



## 认识 Hook

### 目标

- 掌握 hook 基本实用



### 资源

- [Hook 简介](https://reactjs.org/docs/hooks-intro.html) 
- Hook 视频介绍 [React Today and Tomorrow](https://www.youtube.com/watch?v=V-QO-KO90iQ&t=3060s)



### 知识点

### 认识 Hook

Hook 是什么？ Hook 是⼀个特殊的函数，它可以让你“钩⼊” React 的特性。例如， useState 是允许 你在 React 函数组件中添加 state 的 Hook

什么时候我会⽤ Hook？ 如果你在编写函数组件并意识到需要向其添加⼀些 state，以前的做法是必须 将其它转化为 class。现在你可以在现有的函数组件中使⽤ Hook

```js
import React, { useState } from "react";

export default function HookPage(props) {
  // 声明⼀个叫 “count” 的 state 变量，初始化为0 
  const [count, setCount] = useState(0); 
  return ( 
    <div> 
    	<h3>HookPage</h3> 
    	<p>{count}</p> 
    	<button onClick={() => setCount(count + 1)}>add</button> 
		</div> 
	);
}
```

### 

### 使用 Effect Hook

Eﬀect Hook 可以让你在函数组件中执⾏副作⽤操作。

数据获取，设置订阅以及⼿动更改 React 组件中的 DOM 都属于副作⽤。不管你知不知道这些操作，或是“副作⽤”这个名字，应该都在组件中使⽤过它们。

```js
import React, { useState, useEffect } from "react";

export default function HookPage(props) {
	// 声明⼀个叫 “count” 的 state 变量，初始化为0 
  const [count, setCount] = useState(0); 
  // 与 componentDidMount 和 componentDidUpdate相似 
  useEffect(() => {
		// 更新 title
		document.title = `You clicked ${count} times`; 
  });

	return ( 
    <div> 
    	<h3>HookPage</h3> 
    	<p>{count}</p> 
    	<button onClick={() => setCount(count + 1)}>add</button> 
		</div> 
	);
}
```

在函数组件主体内（这⾥指在 React 渲染阶段）改变 DOM、添加订阅、设置定时器、记录⽇志以及执⾏其他包含副作⽤的操作都是不被允许的，因为这可能会产⽣莫名其妙的 bug 并破坏 UI 的⼀致性。 

使⽤ useEffect 完成副作⽤操作。赋值给 useEffect 的函数会在组件渲染到屏幕之后执⾏。你可以 把 eﬀect 看作从 React 的纯函数式世界通往命令式世界的逃⽣通道。

默认情况下，eﬀect 将在每轮渲染结束后执⾏，但你可以选择让它在只有某些值改变的时候 才执⾏：https://zh-hans.reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect



### effect 的条件执行

默认情况下，eﬀect 会在每轮组件渲染完成后执⾏。这样的话，⼀旦 eﬀect 的依赖发⽣变化，它就会被重新创建。

然⽽，在某些场景下这么做可能会矫枉过正。⽐如，在上⼀章节的订阅示例中，我们不需要在每次组件更新时都创建新的订阅，⽽是仅需要在 source props 改变时重新创建。

要实现这⼀点，可以给 useEffect 传递第⼆个参数，它是 eﬀect 所依赖的值数组。更新后的示例如 下：

```js
import React, { useState, useEffect } from "react";

export default function HookPage(props) {
	// 声明⼀个叫 “count” 的 state 变量，初始化为0 
  const [count, setCount] = useState(0); 
  const [date, setDate] = useState(new Date());

	// 与 componentDidMount 和 componentDidUpdate相似 
  useEffect(() => {
		// 更新 title
		document.title = `You clicked ${count} times`; 
  }, [count]);

	useEffect(() => { 
    const timer = setInterval(() => { 
      setDate(new Date()); 
    }, 1000); 
  }, []); // 只在 mount 执行
  
	return ( 
    <div> 
    	<h3>HookPage</h3> 
    	<p>{count}</p> 
    	<button onClick={() => setCount(count + 1)}>add</button> 
			<p>{date.toLocaleTimeString()}</p> 
		</div> 
	);
}
```



### 清除 effect

通常，组件卸载时需要清除 eﬀect 创建的诸如订阅或计时器 ID 等资源。要实现这⼀点， useEffect 函数需返回⼀个清除函数，以防⽌内存泄漏，清除函数会在组件卸载前执⾏

```js
useEffect(() => { 
	const timer = setInterval(() => { 
    setDate(new Date()); 
  }, 1000); 
  return () => clearInterval(timer); 
}, []);
```



## 自定义 Hook 与 Hook 使用规则

### 目标

- 掌握自定义 Hook 与 Hook 使用规则



### 资源

- [自定义 Hook](https://zh-hans.reactjs.org/docs/hooks-custom.html)
- [Hook 规则](https://zh-hans.reactjs.org/docs/hooks-rules.html)



### 知识点

### 自定义 Hook

有时候我们会想要在组件之间重⽤⼀些状态逻辑。⽬前为⽌，有两种主流⽅案来解决这个问题：[⾼阶组件](https://zh-hans.reactjs.org/docs/higher-order-components.html)和 [render props](https://zh-hans.reactjs.org/docs/render-props.html)，⾃定义 Hook 可以让你在不增加组件的情况下达到同样的⽬的。

⾃定义 Hook 是⼀个函数，其名称以 “use” 开头，函数内部可以调⽤其他的 Hook

```js
import React, { useState, useEffect, useMemo } from "react";

export default function CustomHookPage(props) { 
  //定义⼀个叫 count 的 state 变量，初始化为0 
  const [count, setCount] = useState(0); 
  //和didMount、didUpdate类似 
  useEffect(() => { 
    console.log("count effect"); 
    // 只需要在 count 发⽣改变的时候执⾏就可以啦 
    document.title = `点击了${count}次`; 
  }, [count]);

	return ( 
    <div>
			<h3>⾃定义Hook</h3> 
    	<p>{count}</p> 
    	<button onClick={() => setCount(count + 1)}>add</button> 
			<p>{useClock().toLocaleTimeString()}</p> 
		</div> 
	);
}

//⾃定义hook，命名必须以use开头
function useClock() {
	const [date, setDate] = useState(new Date()); 
  useEffect(() => { 
    console.log("date effect"); 
    //只需要在didMount时候执⾏就可以了 
    const timer = setInterval(() => { 
      setDate(new Date()); 
    }, 1000); 
    //清除定时器，类似willUnmount 
    return () => clearInterval(timer); 
  }, []); 
  return date;
}
```



### Hook 使用规则

Hook 就是 JavaScript 函数，但是使用它们会有两个额外规则：

- 只能在**函数最外层**调用 Hook，不要在循环、条件判断或者子函数中调用
- 只能在 **React 的函数组件**中调用 Hook，不要在其他 JavaScript 函数中调用（除了自定义 Hook）



## Hook API 之 useMemo 与 useCallback

### 目标

- 掌握 useMemo、useCallback



### 资源

- [HookAPI 索引](https://zh-hans.reactjs.org/docs/hooks-reference.html)



### 知识点

### useMemo

把“创建”函数和依赖项数组作为参数传⼊ `useMemo` ，它仅会在某个依赖项改变时才重新计算 `memoized` 值。这种优化有助于避免在每次渲染时都进⾏⾼开销的计算。

```js
import React, { useState, useMemo } from "react";

export default function UseMemoPage(props) { 
  const [count, setCount] = useState(0); 
  const expensive = useMemo(() => { 
    console.log("compute"); 
    let sum = 0; 
    for (let i = 0; i < count; i++) { 
      sum += i; 
    } 
    return sum; 
    //只有count变化，这⾥才重新执⾏ 
  }, [count]); 
  const [value, setValue] = useState(""); 
  return ( 
    <div> 
    	<h3>UseMemoPage</h3>
    	<p>expensive:{expensive}</p> 
			<p>{count}</p> 
			<button onClick={() => setCount(count + 1)}>add</button> 
			<input value={value} onChange={event => setValue(event.target.value)} /> 
		</div> 
	);
}
```



### useCallback

把内联回调函数及依赖项数组作为参数传⼊ `useCallback` ，它将返回该回调函数的 `memoized` 版本， 该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经优化的并使⽤引⽤相等性去避免⾮必要渲染（例如 `shouldComponentUpdate` ）的⼦组件时，它将⾮常有⽤

```js
import React, { useState, useCallback, PureComponent } from "react";

export default function UseCallbackPage(props) {
	const [count, setCount] = useState(0); 
  const addClick = useCallback(() => { 
    let sum = 0; 
    for (let i = 0; i < count; i++) { 
      sum += i; 
    } 
    return sum; 
  }, [count]); 
  const [value, setValue] = useState(""); 
  return ( 
    <div> 
    	<h3>UseCallbackPage</h3> 
    	<p>{count}</p> 
    	<button onClick={() => setCount(count + 1)}>add</button> 
			<input value={value} onChange={event => setValue(event.target.value)} /> 
			<Child addClick={addClick} /> 
  	</div> 
	);
}

class Child extends PureComponent {
	render() { 
    console.log("child render"); 
    const { addClick } = this.props; 
    return ( 
      <div> 
      	<h3>Child</h3> 
      	<button onClick={() => console.log(addClick())}>add</button> 
			</div> 
		);
	} 
}
```

`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`

> 注意
>
> 依赖项数组不会作为参数传给“创建”函数。虽然从概念上来说它表现为：所有“创建”函数中引⽤的 值都应该出现在依赖项数组中。未来编译器会更加智能，届时⾃动创建数组将成为可能。