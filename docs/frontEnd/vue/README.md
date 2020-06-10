---
sidebar: auto
---
# 开篇：Vue.js 的精髓——组件

## 写在前面

Vue.js 的精髓在于，它的组件与组件化。写一个工程，也就是在写一个个的组件。

业务场景千变万化，而不变的是 Vue.js 组件开发的核心思想和使用技巧，掌握了 Vue.js 的各种开发模式，再复杂的业务场景也可以轻松化解。

本书不会介绍 Vue.js 的基础用法，面向已经了解或是用过 Vue.js 的开发者。

这一节，我们先笼统地聊一聊 Vue.js 组件和组件化以及本书各章节的梳理。

## 组件的分类

一般来说，组件分为三类：

1. 由 `vue-router` 产生的每个页面，它本质上也是一个组件（.vue），主要承载当前页面的 HTML 结构，会包含数据获取、数据整理、数据可视化等常规业务。整个文件相对较大，但一般不会有 `props` 选项和 `自定义事件`，因为它作为路由的渲染，不会被复用，因此也不会对外提供接口。

   在项目开发中，我们写的大部分代码都是这类的组件（页面），协同开发时，每人维护自己的页面，很少有交集。这类组件相对是最好写的，因为主要是还原设计稿，完成需求，不需要太多模块和架构设计上的考虑。

2. 不包含业务，独立、具体功能的基础组件，比如**日期选择器、模态框**等。这类组件作为项目的基础控件，会被大量使用，因此组件的 API 进行过高强度的抽象，可以通过不同配置实现不同的功能。

   每个公司都有自己的组件使用规范或组件库，但是开发和维护一套完整的前端 UI 还是很困难的，所以直接使用已有的开源组件库。

   独立组件的开发难度要高于第一类组件，因为它的侧重点是 API 的设计、兼容性、性能、以及复杂的功能。这类组件对 JavaScript 的编程有一定要求，也会包含非常多的技巧，比如在不依赖 Vuex 和 Bus （因为独立组件，无法依赖其他库）的情况下，各组件间的通信，还会涉及到很多脑壳疼的逻辑，比如日期选择器要考虑不同的区、国家的日历习惯。

   本书也会重点介绍此类组件的各种开发模式和技巧，对应不同的模式，会带有具体的组件实战。

3. 业务组件。它不像第二类组件只包含某个功能，而是在业务中被多个页面复用的，它与独立组件的区别是，业务组件只在当前项目中会用到，不具有通用性，而且会包含一些业务，比如数据请求；而独立组件不含业务，在任何项目中都可以使用，功能单一，比如一个具有数据校验功能的输入框。

   业务组价更像是介于第一类和第二类之间，在开发上也与独立组件类似，但寄托于项目，你可以使用项目中的技术栈，比如 Vuex、axios、echarts 等，所以它的开发难度相对独立组件要容易点，但也有必要考虑组件的可维护性和复用性。

## 本书内容

因为本小册是围绕 Vue.js 组件展开的，所以第二节会讲解 Vue.js 组件的三个 API：`prop`、`event`、`slot`，当然，如果你已经开发过一些独立组件，完全可以跳过这节内容。

3 - 7 小节会介绍组件间通信的一些方法和黑科技，一部分是 Vue.js 内置的，一部分是自行实现的，在实际开发中，会非常实用。同时也利用这些方法完成了两个具体的实战案例：

1. 具有数据校验功能的表单组件 —— Form；
2. 组合多选框组件 —— CheckboxGroup & Checkbox。

本小册都会以这种核心科技 + 对应实战的形式展开。

8 - 10 小节介绍 Vue 的构造器 extend 和手动挂载组件 $mount 的用法及案例。Vue.js 除了我们正常 `new Vue()` 外，还可以手动挂载的，这 3 节将介绍手动挂载一个 Vue 组件的使用场景。其中涉及到两个案例：

1. 动态渲染 .vue 文件的组件 —— Display；
2. 全局通知组件 —— $Alert。

**Display** 组件用于将 `.vue` 文件渲染出来，线上的案例是 [iView Run](https://link.juejin.im/?target=https%3A%2F%2Frun.iviewui.com%2F)，它不需要你重新编译项目，就可以渲染一个标准的 Vue.js 组件。

**$Alert** 是全局的通知组件，它的调用方法不同于常规组件。常规组件使用方法形如：

```
<template>
    <Alert content="通知内容" :duration="3"></Alert>
</template>
<script>
    import Alert from '../components/alert.vue';
    
    export default {
        components: { Alert }
    }
</script>
```

而 `$Alert` 的调用更接近 JS 语法：

```
export default {
    methods: {
        showMessage () {
            this.$Alert({
                content: '通知内容',
                duration: 3
            });
        }
    }
}
```

虽然与常规 Vue 组件调用方式不同，但底层仍然由 Vue 组件构成和维护。

11 - 12 小节介绍 Render 函数与 Functional Render，并完成一个能够渲染自定义列的 Table 组件。Render 函数也是 Vue.js 组件重要的一部分，只不过在大多数业务中不常使用。本小节会介绍它的使用场景。

13 小节介绍**作用域 slot（slot-scope）**，并基于这种方法同样实现 Table 组件。slot 用的很多，但 slot-scope 在业务中并不常用，但在一些特定场景下，比如组件内部有循环体时，会非常实用。

14 - 15 小节介绍递归组件，并完成树形控件 —— Tree。

16 - 19 小节是综合拓展，会着重讲解 Vue.js 容易忽略却很重要的 API，以及对 Vue.js 面试题的详细分析。除此之外，还会总结笔者在两年的 iView 开源经历中的经验，除了技术细节外，还包括开源项目的持续性发展、推广等。

## 结语

三年前，我开始接触 Vue.js 框架，当时就被它的轻量、组件化和友好的 API 所吸引。与此同时，我也开源了 iView 项目。三年的磨(cǎi )砺(kēng)，沉淀了不少关于 Vue.js 组件的经验。

本小册的内容也许不会让你的技术一夜间突飞猛进，但绝对使你醍醐灌顶。

那么，请准备好一台电脑和一杯咖啡，一起来探索 Vue.js 的精髓吧。



# 基础：Vue.js 组件的三个 API：prop、event、slot

> 如果已经对组建基础语法了如指掌，那么可以跳过

## 组件的构成

一个再复杂的组件，都是由三个部分组成的：prop、event、slot，它们构成了 Vue.js 组件的 API。如果你开发的是一个通用组件，那一定要事先设计好这三部分，因为组件一旦发布，后面载修改 API 就苦难了，使用者都是希望不断新增功能，修复 bug，而不是经常变更接口。如果你阅读别人写的组件，也可以从这三个部分展开，它们可以帮助你快速了解一个组件的所有功能。

### 属性 props

`prop` 定义了这个组件有哪些可配置的属性，组件的核心功能也都是它来确定的。写通用组件时，props 最好用**对象**的写法，这样可以针对每个属性设置类型、默认值或自定义校验属性的值，这点在组件开发中很重要，然而很多人却忽视，直接使用 props 的数组用法，这样的组件往往是不严谨的。比如我们封装一个按钮组件 `<i-button>`：

```vue
<template>
  <button :class="'i-button-size' + size" :disabled="disabled"></button>
</template>
<script>
  // 判断参数是否是其中之一
  function oneOf (value, validList) {
    for (let i = 0; i < validList.length; i++) {
      if (value === validList[i]) {
        return true;
      }
    }
    return false;
  }

  export default {
    props: {
      size: {
        validator (value) {
          return oneOf(value, ['small', 'large', 'default']);
        },
        default: 'default'
      },
      disabled: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
```

使用组件：

```html
<i-button size="large"></i-button>
<i-button disabled></i-button>
```

组件中定义了两个属性：尺寸 size 和 是否禁用 disabled。其中 size 使用 `validator` 进行了值的自定义验证，也就是说，从父级传入的 size，它的值必须是指定的 **small、large、default** 中的一个，默认值是 default，如果传入这三个以外的值，都会抛出一条警告。

要注意的是，组件里定义的 props，都是**单向数据流**，也就是只能通过父级修改，组件自己不能修改 props 的值，只能修改定义在 data 里的数据，非要修改，也是通过后面介绍的自定义事件通知父级，由父级来修改。

在使用组件时，也可以传入一些标准的 html 特性，比如 **id**、**class**：

```html
<i-button id="btn1" class="btn-submit"></i-button>
```

这样的 html 特性，在组件内的 `<button>` 元素上会继承，并不需要在 props 里再定义一遍。这个特性是默认支持的，如果不期望开启，在组件选项里配置 `inheritAttrs: false` 就可以禁用了。

### 插槽 slot

如果要给上面的按钮组件 `<i-button>` 添加一些文字内容，就要用到组件中的第二个 API：插槽 slot，它可以分发组件的内容，比如在上面的按钮组件中定义一个插槽：

```html
<template>
  <button :class="'i-button-size' + size" :disabled="disabled">
    <slot></slot>
  </button>
</template>
```

这里的 `<slot>` 节点就是指定的一个插槽的位置，这样在组件内部就可以扩展内容了：

```html
<i-button>按钮 1</i-button>
<i-button>
  <strong>按钮 2</strong>
</i-button>
```

当需要多个插槽时，会用到具名 slot，比如上面的组件我们再增加一个 slot，用于设置另一个图标组件：

```html
<template>
  <button :class="'i-button-size' + size" :disabled="disabled">
    <slot name="icon"></slot>
    <slot></slot>
  </button>
</template>
<i-button>
  <i-icon slot="icon" type="checkmark"></i-icon>
  按钮 1
</i-button>
```

这样，父级内定义的内容，就会出现在组件对应的 slot 里，没有写名字的，就是默认的 slot。

在组件的 `<slot>` 里也可以写一些默认的内容，这样在父级没有写任何 slot 时，它们就会出现，比如：

```html
<slot>提交</slot>
```

### 自定义事件 event

现在我们给组件 `<i-button>` 加一个点击事件，目前有两种写法，我们先看自定义事件 event（部分代码省略）：

```vue
<template>
  <button @click="handleClick">
    <slot></slot>
  </button>
</template>
<script>
  export default {
    methods: {
      handleClick (event) {
        this.$emit('on-click', event);
      }
    }
  }
</script>
```

通过 `$emit`，就可以触发自定义的事件 `on-click` ，在父级通过 `@on-click` 来监听：

```
<i-button @on-click="handleClick"></i-button>
```

上面的 click 事件，是在组件内部的 `<button>` 元素上声明的，这里还有另一种方法，直接在父级声明，但为了区分原生事件和自定义事件，要用到事件修饰符 `.native`，所以上面的示例也可以这样写：

```
<i-button @click.native="handleClick"></i-button>
```

如果不写 `.native` 修饰符，那上面的 `@click` 就是**自定义事件** click，而非**原生事件** click，但我们在组件内只触发了 `on-click` 事件，而不是 `click`，所以直接写 `@click` 会监听不到。

## 组件的通信

一般来说，组件可以有以下几种关系：

![](/Users/xu/Code/Notes/Vue.js 组件精讲/02-基础：prop、event、slot.assets/166864d066bbcf69)



A 和 B、B 和 C、C 和 D 都是父子关系，C 和 D 是兄弟关系，A 和 C 是隔代关系（可能隔多代）。组件间经常会通信，Vue.js 内置的通信手段一般有两种：

- `ref`：给元素或组件注册引用信息
- `$parent/$children`：访问父 / 子实例

这两种都是直接得到组件实例，使用后可以直接调用组件的方法或访问数据，比如下面的示例中，用 ref 来访问组件（部分代码省略）：

```js
// component-a
export default {
  data () {
    return {
      title: 'Vue.js'
    }
  },
  methods: {
    sayHello () {
      window.alert('Hello');
    }
  }
}
```

```vue
<template>
  <component-a ref="comA"></component-a>
</template>
<script>
  export default {
    mounted () {
      const comA = this.$refs.comA;
      console.log(comA.title);  // Vue.js
      comA.sayHello();  // 弹窗
    }
  }
</script>
```

`$parent` 和 `$children` 类似，也是基于当前上下文访问父组件或全部子组件的。

这两种方法的弊端是，无法在跨级或兄弟间通信，比如下面的结构：

```vue
// parent.vue
<component-a></component-a>
<component-b></component-b>
<component-b></component-b>
```

我们想在 component-a 中，访问到引用它的页面中（这里就是 parent.vue）的两个 component-b 组件，那这种情况下，就得配置额外的插件或工具了，比如 Vuex 和 Bus 的解决方案，本小册不再做它们的介绍，读者可以自行阅读相关内容。不过，它们都是依赖第三方插件的存在，这在开发独立组件时是不可取的，而在小册的后续章节，会陆续介绍一些黑科技，它们完全不依赖任何三方插件，就可以轻松得到任意的组件实例，或在任意组件间进行通信，且适用于任意场景。

## 结语

本小节带您复习了 Vue.js 组件的核心知识点，虽然这并没有完全覆盖 Vue.js 的 API，但对于组件开发来说已经足够了，后续章节也会陆续扩展更多的用法。

基于 Vue.js 开发独立组件，并不是新奇的挑战，坦率地讲，它本质上还是 JavaScript。掌握了 Vue.js 组件的这三个 API 后，剩下的便是程序的设计。在组件开发中，最难的环节应当是解耦组件的交互逻辑，尽量把复杂的逻辑分发到不同的子组件中，然后彼此建立联系，在这其中，计算属性（computed）和混合（mixins）是两个重要的技术点，合理利用，就能发挥出 Vue.js 语言的最大特点：把状态（数据）的维护交给 Vue.js 处理，我们只专注在交互上。

当您最终读完本小册时，应该会总结出和笔者一样的感悟：Vue.js 组件开发，玩到最后还是在拼 JavaScript 功底。对于每一位使用 Vue.js 的开发者来说，阅读完本小册都可以尝试开发和维护一套属于自己的组件库，并乐在其中，而且你会越发觉得，一个组件或一套组件库，就是融合了前端精髓的产出。

## 扩展阅读

- [Vue 组件通信之 Bus](https://juejin.im/post/5a4353766fb9a044fb080927)
- [Vuex 通俗版教程](https://juejin.im/entry/58cb4c36b123db00532076a2)



# 组件的通信1：provider / inject

上一节我们说到，`ref` 和 `$parent/$children` 在跨级通信时是有弊端的。当组件 A 和组件 B 中间隔了数代（甚至不确定具体级别）时，以往会借助 Vuex 和 Bus 这样的解决方案，不得不引入第三方库来支持。本小节则介绍一种无依赖的组件通信方法：Vue.js 内置的 provider / inject 接口。

## 什么是 provider / inject

`provider/inject` 是 Vue.js 2.2.0 版本以后新增的 API，在文档中是这样介绍的：

> [cn.vuejs.org/v2/api/#pro…](https://link.juejin.im/?target=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fapi%2F%23provide-inject)
>
> 这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。如果你熟悉 React，这与 React 的上下文特性很相似。

并且文档中有如下提示：

> provide 和 inject 主要为高阶插件/组件库提供用例。并不推荐直接用于应用程序代码中。

看不懂上面的介绍没有关系，不过上面的这句提示应该明白，就是说 Vue.js 不建议在业务中使用这对 API，而是在插件/组件库（比如 iView，事实上 iView 的很多组件都在用）。不过建议归建议，这个 API 会非常有用。

我们先来看一下这个 API 怎么使用，假设有两个组件：A.vue 和 B.vue，B 是 A 的子组件。

```js
// A.vue
export default {
  provide: {
    name: 'Aresn'
  }
}

// B.vue
export default {
  inject: ['name'],
  mounted () {
    console.log(this.name);  // Aresn
  }
}
```

可以看到，在 A.vue 里，我们设置了一个 **provider: name**，值为 Aresn，它的作用就是将 **name** 这个变量提供给它的所有子组件。而在 B.vue 中，通过 `inject` 注入了从 A 组件中提供的 **name** 变量，那么在组件 B 中，就可以通过 **this.name** 访问这个变量了，它的值也是 Aresn。这就是 provider / inject API 最核心的用法。

需要注意的是：

> provide 和 inject 绑定并**不是可响应**的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的。

所以，上面 A.vue 的 name 如果改变了，B.vue 的 this.name 是不会改变的，仍然是 Aresn。

## 替代 Vuex

我们知道，在做 Vue 大型项目时，可以使用 Vuex 做状态管理，它是一个专为 Vue.js 开发的**状态管理模式**，用于集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

那了解了 provide / inject 的用法，下面来看怎样替代 Vuex。当然，我们的目的并不是为了替代 Vuex，它还是有相当大的用处，这里只是介绍另一种可行性。

使用 Vuex，最主要的目的是跨足间通信、全局数据维护、多人协同开发。需求比如有：用户的登录信息维护、通知信息维护等全局的状态和数据。

一般在 webpack 中使用 Vue.js，都会有一个入口文件 **main.js**，里面通常导入了 Vue、VueRouter、iView 等库，通常也会导入一个入口组件 `app.vue` 作为根组件。一个简单的 app.vue 可能只有以下代码：

```vue
<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {

  }
</script>
```

使用 provider / inject 替代 Vuex，就是在这个 app.vue 文件上做文章。

我们把 app.vue 理解为一个最外层的根组件，用来存储所有需要的全局数据和状态，甚至是计算属性（computed）、方法（methods）等。因为你的项目中所有的组件（包含路由），它的父组件（或根组件）都是 app.vue，所以我们把整个 app.vue 实例通过 `provider` 对外提供。

app.vue

```vue
<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    provide () {
      return {
        app: this
      }
    }
  }
</script>
```

上面，我们把整个 app.vue 的实例 `this` 对外提供，命名为 **app**（这个名字可以自定义，推荐使用 app，使用这个名字后，子组件不能再使用它作为局部属性）。接下来，任何组件（或路由）只要通过 `inject` 注入 app.vue 的 app 的话，都可以直接通过 this.app.xxx 来访问 app.vue 的 `data`、`computed`、`methods`等内容。

app.vue 是整个项目第一个被渲染的组件，而且只会渲染一次（即使切换路由，app.vue 也不会被再次渲染），利用这个特性，很适合做一次性全局的状态数据管理，例如，我们将用户的登录信息保存起来：

app.vue，部分代码被省略：

```vue
<script>
  export default {
    provide () {
      return {
        app: this
      }
    },
    data () {
      return {
        userInfo: null
      }
    },
    methods: {
      getUserInfo () {
        // 这里通过 ajax 获取用户信息后，赋值给 this.userInfo，以下为伪代码
        $.ajax('/user/info', (data) => {
          this.userInfo = data;
        });
      }
    },
    mounted () {
      this.getUserInfo();
    }
  }
</script>
```

这样，任何页面或组件，只要通过 `inject` 注入 `app` 后，就可以直接访问 `userInfo` 的数据了，比如：

```vue
<template>
  <div>
    {{ app.userInfo }}
  </div>
</template>
<script>
  export default {
    inject: ['app']
  }
</script>
```

是不是很简单呢？除了直接使用数据，还可以调用方法。比如在某个页面里，修改了个人资料，这时一开始在 `app.vue` 里获取的 `userInfo` 已经不是最新的了，需要重新获取。可以这样使用：

某用户页面：

```vue
<template>
  <div>
    {{ app.userInfo }}
  </div>
</template>
<script>
  export default {
    inject: ['app'],
    methods: {
      changeUserInfo () {
        // 这里修改完用户数据后，通知 app.vue 更新，以下为伪代码
        $.ajax('/user/update', () => {
          // 直接通过 this.app 就可以调用 app.vue 里的方法
          this.app.getUserInfo();
        })
      }
    }
  }
</script>
```

同样非常简单，只要理解了 `this.app` 是直接获取整个 `app.vue` 的实例后，使用起来就得心应手了。想一想，配置复杂的 Vuex 的全部功能，现在是不是都可以通过 `provider / inject` 来实现了呢？

## 进阶技巧

如果你的项目足够复杂，或者需要多人协同开发时，在 `app.vue` 里会写非常多的代码，多到结构复杂难以维护。这时可以使用 Vue.js 的混合 `mixins`，将不同的逻辑分开到不同的 js 文件里。

比如上面的用户信息，就可以放到混合里：

user.js：

```js
export default {
  data () {
    return {
      userInfo: null
    }
  },
  methods: {
    getUserInfo () {
      // 这里通过 ajax 获取用户信息后，赋值给 this.userInfo，以下为伪代码
      $.ajax('/user/info', (data) => {
        this.userInfo = data;
      });
    }
  },
  mounted () {
    this.getUserInfo();
  }
}
```

 然后在 `app.vue` 中混合：

app.vue：

```vue
<script>
  import mixins_user from '../mixins/user.js';

  export default {
    mixins: [mixins_user],
    data () {
      return {

      }
    }
  }
</script>
```

这样，跟用户信息相关的逻辑，都可以在 `user.js` 里维护，或者由某个人来维护，`app.vue` 也就很容易维护了。

## 独立组件中使用

如果你顾忌 Vue.js 文档中所说，provider / inject 不推荐直接在应用程序中使用，那没关系，仍然使用你熟悉的 Vuex 或 Bus 来管理你的项目就好。我们介绍的这对 API，主要还是用在独立组件中发挥作用的。

只要一个组件使用了 `provider` 向下提供数据，那其下的所有子组件都可以通过 `inject` 来注入，不管中间隔了多少代，而且可以注入多个来自不同父级提供的数据。需要注意的是，一旦注入了某个数据，比如上面示例中的 `app`，那这个组件中就不能再声明 `app` 这个数据了，因为他已经被父组件占用了。

独立组件使用 provider / inject 的场景，主要是具有联动关系的组件，比如接下来很快就会介绍的第一个实战：具有数据校验功能的表单组件 Form。它其实是两个组件，一个是 Form，一个是 FormItem，FormItem 是 Form 的子组件，它会依赖 Form 组件上的一些特性（props），所以就需要得到父组件 Form，这在 Vue.js 2.2.0 版本以前，是没有 provider / inject 这对 API 的，而 Form 和 FormItem 不一定是父子关系，中间很可能间隔了其它组件，所以不能单纯使用 `$parent` 来向上获取实例。在 Vue.js 2.2.0 之前，一种比较可行的方案是用计算属性动态获取：

```js
computed: {
  form () {
    let parent = this.$parent;
    while (parent.$options.name !== 'Form') {
      parent = parent.$parent;
    }
    return parent;
  }
}
```

每个组件都可以设置 `name` 选项，作为组件名的标识，利用这个特点，通过向上遍历，直到找到需要的组件。这个方法可行，但相比一个 `inject` 来说，太费劲了，而且不那么优雅和 native。如果用 inject，可能只需要一行代码：

```js
export default {
  inject: ['form']
}
```

不过，这一切的前提是你使用 Vue.js 2.2.0 以上版本。

## 结语

如果这是你第一次听说 provide / inject 这对 API，一定觉得它太神奇了，至少笔者第一时间知晓时是这样的。它解决了独立组件间通信的问题，用好了还有出乎意料的效果。笔者在开发 [iView Developer](https://link.juejin.im/?target=https%3A%2F%2Fdev.iviewui.com) 时，全站就是使用这种方法来做全局数据的管理的，如果你有机会一个人做一个项目时，不妨试试这种方法。

下一节，将介绍另一种组件间通信的方法，不同于 provide / inject 的是，它们不是 Vue.js 内置的 API。



# 派发与广播——自行实现 dispatch 和 broadcast 方法

上一讲的 provider / inject API 主要解决了跨级组件间的通信问题，不过它的使用场景，主要是子组件获取上级组件的状态，跨级组件间建立了一种主动提供与依赖注入的关系。然后有两种场景它不能很好的解决：

- 父组件向子组件（支持跨级）传递数据；
- 子组件向父组件（支持跨级）传递数据。

这种父子（含跨级）传递数据的通信方式，Vue.js 并没有提供原生的 API 来支持，而是推荐使用大型数据状态管理工具 Vuex，而我们之前已经介绍过 Vuex 的场景与独立组件（或库）中使用的限制。本小节则介绍一种在父子组件间通信的方法 `dispatch` 和 `broadcast`。

## $on 与 $emit

如果您使用过较早的 Vue.js 1.x 版本，肯定对 *$dispatch* 和 *$broadcast* 这两个内置的方法很熟悉，不过它们都在 Vue.js 2.x 里废弃了。在正式介绍主角前，我们先看看 `$on` 与 `$emit` 这两个 API，因为它们是本节内容的基础。

`$emit` 会在当前组件实例上触发自定义事件，并传递一些参数给监听器的回调，一般来说，都是在父级调用这个组件时，使用 `@on` 的方式来监听自定义事件的，比如在子组件中触发事件：

```js
// child.vue，部分代码省略
export default {
  methods: {
    handleEmitEvent () {
      this.$emit('test', 'Hello Vue.js');
    }
  }
}
```

在父组件中监听由 child.vue 触发的自定义事件 **test**：

```js
<!-- parent.vue，部分代码省略-->
<template>
  <child-component @test="handleEvent">
</template>
<script>
  export default {
    methods: {
      handleEvent (text) {
      	console.log(text);  // Hello Vue.js
      }
    }
  }
</script>
```

这里看似是在父组件 parent.vue 中绑定的自定义事件 **test** 的处理句柄，然而事件 **test** 并不是在父组件上触发的，而是在子组件 child.vue 里触发的，只是通过 `v-on` 在父组件中监听。既然是子组件自己触发的，那它自己也可以监听到，这就要使用 `$on` 来监听实例上的事件，换言之，组件使用 `$emit` 在自己实例上触发事件，并用 `$on` 来监听它。

听起来这种神（sāo）操作有点多此一举，我们不妨先来看个示例：

（也可通过在线链接 [run.iviewui.com/ggsomfHM](https://link.juejin.im/?target=https%3A%2F%2Frun.iviewui.com%2FggsomfHM) 直接运行该示例）

```vue
<template>
  <div>
    <button @click="handleEmitEvent">触发自定义事件</button>
  </div>
</template>
<script>
  export default {
    methods: {
      handleEmitEvent () {
        // 在当前组件上触发自定义事件 test，并传值
        this.$emit('test', 'Hello Vue.js')
      }
    },
    mounted () {
      // 监听自定义事件 test
      this.$on('test', (text) => {
        window.alert(text);
      });
    }
  }
</script>
```

`$on` 监听了自己触发的自定义事件 test，因为有时不确定何时会触发事件，一般会在 `mounted` 或 `created` 钩子中来监听。

仅上面的示例，的确是多此一举的，因为大可在 handleEmitEvent 里直接写 windows.alert(text)，没必要绕一圈。

之所以多此一举，是因为 handleEmitEvent 是当前组件内的 `<button>` 调用的，如果这个方法不是它自己调用，而是其它组件调用的，那这个用法就大有可为了。

了解了 `$on` 和 `$emit` 的用法后，我们再来看两个“过时的” API。

## Vue.js 1.x 的 $dispatch 与 $broadcast

虽然 Vue.js 1.x 已经成为过去时，但为了充分理解本节通信方法的使用场景，还是有必要来了解一点它的历史。

在 Vue.js 1.x 中，提供了两个方法：`$dispatch` 和 `$broadcast` ，前者用于向上级派发事件，只要是它的父级（一级或多级以上），都可以在组件内通过 `$on` （或 events，2.x 已废弃）监听到，后者相反，是由上级向下级广播事件的。

来看一个简单的示例：

```
<!-- 注意：该示例为 Vue.js 1.x 版本 -->
<!-- 子组件 -->
<template>
  <button @click="handleDispatch">派发事件</button>
</template>
<script>
export default {
  methods: {
    handleDispatch () {
      this.$dispatch('test', 'Hello, Vue.js');
    }
  }
}
</script>
<!-- 父组件，部分代码省略 -->
<template>
  <child-component></child-component>
</template>
<script>
  export default {
    mounted () {
      this.$on('test', (text) => {
        console.log(text);  // Hello, Vue.js
      });
    }
  }
</script>
```

$broadcast 类似，只不过方向相反。这两种方法一旦发出事件后，任何组件都是可以接收到的，就近原则，而且会在第一次接收到后停止冒泡，除非返回 true。

这两个方法虽然看起来很好用，但是在 Vue.js 2.x 中都废弃了，官方给出的解释是：

> 因为基于组件树结构的事件流方式有时让人难以理解，并且在组件结构扩展的过程中会变得越来越脆弱。

虽然在业务开发中，它没有 Vuex 这样专门管理状态的插件清晰好用，但对独立组件（库）的开发，绝对是福音。因为独立组件一般层级并不会很复杂，并且剥离了业务，不会变的难以维护。

知道了 *$dispatch* 和 *$broadcast* 的前世今生，接下来我们就在 Vue.js 2.x 中自行实现这两个方法。

## 自行实现 dispatch 和 broadcast 方法

自行实现的 dispatch 和 broadcast 方法，不能保证跟 Vue.js 1.x 的*$dispatch* 和 *$broadcast* 具有完全相同的体验，但基本功能是一样的，都是解决父子组件（含跨级）间的通信问题。

通过目前已知的信息，我们要实现的 dispatch 和 broadcast 方法，将具有以下功能：

- 在子组件调用 dispatch 方法，向上级指定的组件实例（最近的）上触发自定义事件，并传递数据，且该上级组件已预先通过 `$on` 监听了这个事件；
- 相反，在父组件调用 broadcast 方法，向下级指定的组件实例（最近的）上触发自定义事件，并传递数据，且该下级组件已预先通过 `$on` 监听了这个事件。

实现这对方法的关键点在于，如何正确地向上或向下找到对应的组件实例，并在它上面触发方法。在设计一个新功能（features）时，可以先确定这个功能的 API 是什么，也就是说方法名、参数、使用样例，确定好 API，再来写具体的代码。

因为 Vue.js 内置的方法，才是以 `$` 开头的，比如 `$nextTick`、`$emit` 等，为了避免不必要的冲突并遵循规范，这里的 dispatch 和 broadcast 方法名前不加 `$`。并且该方法可能在很多组件中都会使用，复用起见，我们封装在混合（mixins）里。那它的使用样例可能是这样的：

```js
// 部分代码省略
import Emitter from '../mixins/emitter.js'

export default {
  mixins: [ Emitter ],
  methods: {
    handleDispatch () {
      this.dispatch();  // ①
    },
    handleBroadcast () {
      this.broadcast();  // ②
    }
  }
}
```

上例中行 ① 和行 ② 的两个方法就是在导入的混合 **emitter.js** 中定义的，这个稍后我们再讲，先来分析这两个方法应该传入什么参数。一般来说，为了跟 Vue.js 1.x 的方法一致，第一个参数应当是自定义事件名，比如 “test”，第二个参数是传递的数据，比如 “Hello, Vue.js”，但在这里，有什么问题呢？只通过这两个参数，我们没办法知道要在哪个组件上触发事件，因为自行实现的这对方法，与 Vue.js 1.x 的原生方法机理上是有区别的。上文说到，实现这对方法的关键点在于准确地**找到组件实例**。那在寻找组件实例上，我们的“惯用伎俩”就是通过遍历来匹配组件的 `name` 选项，在独立组件（库）里，每个组件的 `name` 值应当是唯一的，name 主要用于递归组件，在后面小节会单独介绍。

先来看下 **emitter.js** 的代码：

```js
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.name;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.name;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
```

因为是用作 mixins 导入，所以在 methods 里定义的 dispatch 和 broadcast 方法会被混合到组件里，自然就可以用 `this.dispatch` 和 `this.broadcast` 来使用。

这两个方法都接收了三个参数，第一个是组件的 `name` 值，用于向上或向下递归遍历来寻找对应的组件，第二个和第三个就是上文分析的自定义事件名称和要传递的数据。

可以看到，在 dispatch 里，通过 *while* 语句，不断向上遍历更新当前组件（即上下文为当前调用该方法的组件）的父组件实例（变量 parent 即为父组件实例），直到匹配到定义的 `componentName` 与某个上级组件的 `name` 选项一致时，结束循环，并在找到的组件实例上，调用 `$emit` 方法来触发自定义事件 `eventName`。broadcast 方法与之类似，只不过是向下遍历寻找。

来看一下具体的使用方法。有 **A.vue** 和 **B.vue** 两个组件，其中 B 是 A 的子组件，中间可能跨多级，在 A 中向 B 通信：

```vue
<!-- A.vue -->
<template>
	<button @click="handleClick">触发事件</button>
</template>
<script>
  import Emitter from '../mixins/emitter.js';
  
  export default {
    name: 'componentA',
    mixins: [ Emitter ],
    methods: {
      handleClick () {
        this.broadcast('componentB', 'on-message', 'Hello Vue.js');
      }
    }
  }
</script>
```

```js
// B.vue
export default {
  name: 'componentB',
  created () {
    this.$on('on-message', this.showMessage);
  },
  methods: {
    showMessage (text) {
      window.alert(text);
    }
  }
}
```

同理，如果是 B 向 A 通信，在 B 中调用 dispatch 方法，在 A 中使用 $on 监听事件即可。

以上就是自行实现的 dispatch 和 broadcast 方法，相比 Vue.js 1.x，有以下不同：

- 需要额外传入组件的 name 作为第一个参数；
- 无冒泡机制；
- 第三个参数传递的数据，只能是一个（较多时可以传入一个对象），而 Vue.js 1.x 可以传入多个参数，当然，你对 emitter.js 稍作修改，也能支持传入多个参数，只是一般场景传入一个对象足以。

## 结语

Vue.js 的组件通信到此还没完全结束，如果你想“趁热打铁”一口气看完，可以先阅读第 6 节组件的通信 3。亦或按顺序看下一节的实战，来进一步加深理解 provide / inject 和 dispatch / broadcast 这两对通信方法的使用场景。



# 具有数据校验功能的表单组件——Form

在第 3 节和第 4 节中，我们介绍了组件间的两种通信方法：provide / inject 和 dispatch / broadcast，前者是 Vue.js 内置的，主要用于子组件获取父组件（包括跨级）的状态；后者是自行实现的一种混合，用于父子组件（包括跨级）间通过自定义事件通信。本小节则基于这两种通信方法，来实现一个具有数据校验功能的表单组件——Form。

## Form 组件概览

表单类组件在项目中会大量使用，比如输入框（Input）、单选（Radio）、多选（Checkbox）、下拉选择器（Select）等。在使用表单类组件时，也会经常用到数据校验，如果每次都写校验程序来对每一个表单控件校验，会很低效，因此需要一个能够校验基础表单控件的组件，也就是本节要完成的 Form 组件。一般的组件库都提供了这个组件，比如 iView，它能够校验内置的 15 种控件，且支持校验自定义组件，如下图所示：

（也可以在线访问本示例体验：[run.iviewui.com/jwrqnFss](https://link.juejin.im/?target=https%3A%2F%2Frun.iviewui.com%2FjwrqnFss)）

Form 组件分为两个部分，一个是外层的 `Form` 表单域组件，一组表单控件只有一个 Form，而内部包含了多个 `FormItem` 组件，每一个表单控件都被一个 FormItem 包裹。基本的结构看起来像：

```html
<i-form>
  <i-form-item>
    <i-input v-model="form.name"></i-input>
  </i-form-item>
  <i-form-item>
    <i-input v-model="form.mail"></i-input>
  </i-form-item>
</i-form>
```

Form 要用到数据校验，并在对应的 FormItem 中给出校验失败的提示，校验我们会用到一个开源库：[async-validator](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fyiminghe%2Fasync-validator)，基本主流的组件库都是基于它做的校验。使用它很简单，只需按要求写好一个校验规则就好，比如：

```js
[
  { required: true, message: '邮箱不能为空', trigger: 'blur' },
  { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
]
```

这个代表要校验的数据先判断是否为空（required: true），如果为空，则提示“邮箱不能为空”，触发校验的事件为失焦（trigger: 'blur'），如果第一条满足要求，再进行第二条的验证，判断是否为邮箱格式（type: 'email'）等等，还支持自定义校验规则。更详细的用法可以参看它的文档。

## 接口设计

我们先使用最新的 Vue CLI 3 创建一个空白的项目（如果你还不清楚 Vue CLI 3 的用法，需要先补习一下了，可以阅读文末的扩展阅读 1），并使用 `vue-router` 插件，同时安装好 `async-validator` 库。

在 `src/components` 下新建一个 `form` 文件夹，并初始化两个组件 `form.vue` 和 `form-item.vue`，然后初始化项目，配置路由，创建一个页面能够被访问到。

> 本节所有代码可以在 [github.com/icarusion/v…](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Ficarusion%2Fvue-component-book) 中查看，你可以一边看源码，一边阅读本节；也可以边阅读，边动手实现一遍，遇到问题再参考完整的源码。

第 2 节我们介绍到，编写一个 Vue.js 组件，最重要的是设计好它的接口，一个 Vue.js 组件的接口来自三个部分：props、slots、events。而 Form 和 FormItem 两个组件主要做数据校验，用不到 events。Form 的 slot 就是一系列的 FormItem，FormItem 的 slot 就是具体的表单控件，比如输入框 `<i-input>` 。那主要设计的就是 props 了。

在 `Form` 组件中，定义两个 props：

- model：表单控件绑定的数据对象，在校验或重置时会访问该数据对象下对应的表单数据，类型为 Object。
- rules：表单验证规则，即上面介绍的 async-validator 所使用的校验规则，类型为 Object。

在 `FormItem` 组件中，也定义两个 props：

- label：单个表单组件的标签文本，类似原生的 `<label>` 元素，类型为 String。
- prop：对应表单域 Form 组件或 model 里的字段，用于在校验或重置时访问表单组件绑定的数据，类型为 String。

定义好 props，就可以写出大概的用例了：

```vue
<template>
	<div>
		<i-form :model="formValidator" :rules="ruleValidator">
			<i-form-item lable="用户名" prop="name">
				<i-input v-model="formValidate.name"></i-input>
			</i-form-item>
			<i-form-item lable="邮箱" prop="mail">
				<i-input v-model="formValidate.mail"></i-input>
			</i-form-item>
		</i-form>
	</div>
<template>

<script>
	import iForm from '../components/form/form.vue';
	import iFormItem from '../components/form/form-item.vue';
	import iInput from '../components/input/input.vue'
	
	export default {
    components: { iForm, iFormItem, iInput },
    data () {
      return {
        formValidate: {
          name: '',
          mail: ''
        },
        ruleValidate: {
          name: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          mail: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
          ],
        }
      }
    }
	}
</script>
```

有两点需要注意的是：

- 这里的 `<i-input>` 并不是原生的 `<input>` 输入框，而是一个特制的输入框组件，之后会讲解功能和代码。
- `<i-form-item>` 的属性 `prop` 是字符串，所以它前面没有冒号（即不是 `:prop="name"`）。

当前的两个组件只是个框框，还没有实现任何功能，不过万事开头难，定义好接口，剩下的就是补全组件的逻辑，而对于使用者，知道了 props、events、slots，就已经能写出上例的使用代码了。

到此，Form 和 FormItem 的代码如下：

```vue
<!-- form.vue -->
<template>
  <form>
    <slot></slot>
  </form>
</template>
<script>
  export default {
    name: 'iForm',
    props: {
      model: {
        type: Object
      },
      rules: {
        type: Object
      }
    }
  }
</script>
```

```vue
<!-- form-item.vue -->
<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'iFormItem',
    props: {
      label: {
        type: String,
        default: ''
      },
      prop: {
        type: String
      }
    }
  }
</script>
```

## 在 Form 中缓存 FormItem 实例

`Form` 组件的核心功能是数据校验，一个 Form 中包含了多个 FormItem，当点击提交按钮时，要逐一对每个 FormItem 内的表单组件校验，而校验是由使用者发起，并通过 `Form` 来调用每一个 `FormItem` 的验证方法，再将校验结果汇总后，通过 `Form` 返回出去。大致的流程如下图所示：

![img](/Users/xu/Code/Notes/Vue.js 组件精讲/05-实战 1：具有数据校验功能的表单组件 Form.assets/166c3b7f124cb84a)

因为要在 Form 中逐一调用 FormItem 的验证方法，而 Form 和 FormItem 是独立的，需要预先将 FormItem 的每个实例缓存在 Form 中，这个操作就需要用到第 4 节的组件通信方法。当每个 FormItem 渲染时，将其自身（this）作为参数通过 `dispatch` 派发到 Form 组件中，然后通过一个数组缓存起来；同理当 FormItem 销毁时，将其从 Form 缓存的数组中移除。相关代码如下：

```js
// form-item.vue 部分代码省略

import Emitter from '../../mixins/emitter.js'

export default {
	name: 'iFormItem',
	mixins: [ Emitter ],
  // 组件渲染时，将实例缓存在 Form 中
  mounted () {
    // 如果没有传入 prop，而无需校验，也就无需缓存
    if (this.prop) {
      this.dispatch('iForm', 'on-form-item-add', this);
    }
  },
  // 组件销毁前，将实例从 Form 的缓存中移除
  beforeDestroy () {
    this.dispatch('iForm', 'on-form-item-remove', this);
  }
}
```

注意，Vue.js 的组件渲染顺序是由内而外的，所以 FormItem 要先于 Form 渲染，在 FormItem 的 mounted 触发时，我们向 Form 派发了事件 `on-form-item-add`，并将当前 FormItem 的实例（this）传递给了 Form，而此时，Form 的 mounted 尚未触发，因为 Form 在最外层，如果在 Form 的 mounted 里监听事件，是不可能的，所以要在其 created 内监听自定义事件，Form 的 created 要先于 FormItem 的 mounted。所以 Form 的相关代码为：

```js
// form.vue，部分代码省略
export default {
  name: 'iForm',
  data () {
    return {
      fields: []
    };
  },
  created () {
    this.$on('on-form-item-add', (field) => {
      if (field) this.fields.push(field);
    });
    this.$on('on-form-item-remove', (field) => {
      if (field.prop) this.fields.splice(this.fields.indexOf(field), 1);
    });
  }
}
```

定义的数据 `fields` 就是用来缓存所有 FormItem 实例的。

## 触发校验

Form 支持两种事件来触发校验：

- **blur**：失去焦点时触发，常见的有输入框失去焦点时触发校验；
- **change**：实时输入时触发或选择时触发，常见的有输入框实时输入时触发校验、下拉选择器选择项目时触发校验等。

以上两个事件，都是有具体的表单组件来触发的，我们先来编写一个简单的输入框组件 `i-input`。在 `components` 下新建目录 `input`，并创建文件 `input.vue`：

```js
<!-- input.vue -->
<template>
  <input
		type="text"
		:vlaue="currentValue"
		@input="handleInput"
    @blur="handleBlur"
	/>
</template>

<script>
	import Emitter from '../../mixins/emitter.js';

  export default {
		name: 'iInput',
    mixins: [ Emitter ],
    props: {
      value: {
        type: String,
        default: ''
      },
    },
    data () {
      return {
        currentValue: this.value
      }
    },
    watch: {
      value (val) {
        this.currentValue = val;
      }
    },
    methods: {
      handleInput (event) {
        const value = event.target.value;
        this.currentValue = value;
        this.$emit('input', value);
        this.dispatch('iFormItem', 'on-form-change', value);
      },
      handleBlur () {
        this.dispatch('iFormItem', 'on-form-blur', this.currentValue);
      }
    }
  }
</script>
```

Input 组件中，绑定在 `<input>` 元素上的原生事件 `@input`，每当输入一个字符，都会调用句柄 `handleInput`，并通过 `dispatch` 方法向上级的 FormItem 组件派发自定义事件 `on-form-change`；同理，绑定的原生事件 `@blur` 会在 input 失焦时触发，并传递事件 `on-form-blur`。

基础组件有了，接下来要做的，是在 FormItem 中监听来自 Input 组件派发的自定义事件。这里可以在 mounted 中监听，因为你的手速远远赶不上组件渲染的速度，不过在 created 中监听也是没任何问题的。相关代码如下：

```js
// form-item.vue，部分代码省略
export default {
  methods: {
    setRules () {
      this.$on('on-form-blur', this.onFieldBlur);
      this.$on('on-form-change', this.onFieldChange);
    },
  },
  mounted () {
    if (this.prop) {
      this.dispatch('iForm', 'on-form-item-add', this);
      this.setRules();
    }
  }
}
```

通过调用 `setRules` 方法，监听比表单组件两个事件，并绑定了句柄函数 `onFieldBlur` 和 `onFieldChange`，分别对应 blur 和 change 两种事件类型。当 onFieldBlur 或 onFieldChange 函数触发时，就意味着 FormItem 要对当前的数据进行一次校验。当前的数据，指的就是通过表单域 Form 中定义的 props：model，结合当前 FormItem 定义的 props：prop 来确定的数据，可以回顾上文写过的用例。

因为 FormItem 中只定义了数据源的某个 key 名称（即属性 prop），要拿到 Form 中 model 里的数据，需要用到第三节的通信方法 provider / inject。所以在 Form 中，把整个实例（this）向下提供，并在 FormItem 中注入：

```js
// form.vue，部分代码省略
export default {
  provide() {
    return {
      form : this
    };
  }
}
```

```js
// form-item.vue，部分代码省略
export default {
  inject: ['form']
}
```

准备好这些，接着就是最核心的校验功能了，blur 和 change 事件都会触发校验，它们调用同一个方法，只是参数不同。相关代码如下：

```js
// form-item.vue，部分代码省略
import AsyncValidator from 'async-validator';

export default {
  inject: ['form'],
  props: {
    prop: {
      type: String
    },
  },
  data () {
    return {
      validateState: '',  // 校验状态
      validateMessage: '',  // 校验不通过时的提示信息
    }
  },
  computed: {
    // 从 Form 的 model 中动态得到当前表单组件的数据
    fieldValue () {
      return this.form.model[this.prop];
    }
  },
  methods: {
    // 从 Form 的 rules 属性中，获取当前 FormItem 的校验规则
    getRules () {
      let formRules = this.form.rules;

      formRules = formRules ? formRules[this.prop] : [];

      return [].concat(formRules || []);
    },
    // 只支持 blur 和 change，所以过滤出符合要求的 rule 规则
    getFilteredRule (trigger) {
      const rules = this.getRules();
      return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
    },
    /**
     * 校验数据
     * @param trigger 校验类型
     * @param callback 回调函数
     */
    validate(trigger, callback = function () {}) {
      let rules = this.getFilteredRule(trigger);

      if (!rules || rules.length === 0) {
        return true;
      }

      // 设置状态为校验中
      this.validateState = 'validating';

      // 以下为 async-validator 库的调用方法
      let descriptor = {};
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);
      let model = {};

      model[this.prop] = this.fieldValue;

      validator.validate(model, { firstFields: true }, errors => {
        this.validateState = !errors ? 'success' : 'error';
        this.validateMessage = errors ? errors[0].message : '';

        callback(this.validateMessage);
      });
    },
    onFieldBlur() {
      this.validate('blur');
    },
    onFieldChange() {
      this.validate('change');
    }
  }
}
```

在 FormItem 的 `validate()` 方法中，最终做了两件事：

1. 设置了当前的校验状态 `validateState` 和校验不通过提示信息 `validateMessage`（通过值为空）；
2. 将 validateMessage 通过回调 callback 传递给调用者，这里的调用者是 onFieldBlur 和 onFieldChange，它们只传入了第一个参数 `trigger`，callback 并未传入，因此也不会触发回调，而这个回调主要是给 Form 用的，因为 Form 中可以通过提交按钮一次性校验所有的 FormItem（后文会介绍）这里只是表单组件触发事件时，对当前 FormItem 做校验。

除了校验，还可以对当前数据进行重置。重置是指将表单组件的数据还原到最初绑定的值，而不是清空，因此需要预先缓存一份初始值。同时我们将校验信息也显示在模板中，并加一些样式。相关代码如下：

```vue
<!-- form-item.vue，部分代码省略 -->
<template>
	<div>
		<label v-if="label" :class="{ 'i-form-item-label-required': isRequired }">
			{{ label }}
		</label>
		<div>
			<slot></slot>
			<div v-if="validateState === 'error'" class="i-form-item-message">
				{{ validateMessage }}
			</div>
		</div>
	<div>
</template>
<script>
	export default {
    props: {
      label: {
        type: String,
        default: ''
      },
      prop: {
        type: String
      },
    },
    data () {
      return {
        isRequired: false,
        validateState: '',
        validateMessage: '',
      }
    },
    mounted () {
      // 如果没有传入 prop，则无需校验，也就无需缓存
      if (this.prop) {
        this.dispatch('iForm', 'on-form-item-add', this);
        
        // 设置初始值，以便在重置时恢复默认值
        this.initalValue = this.fieldValue;
        
        this.setRules();
      }
    },
    methods: {
      setRules () {
        let rules = this.getRules();
        if (rules.length) {
          rules.every((rule) => {
            // 如果当前校验规则中有必填项，则标记出来
            this.isRequired = rule.required;
          });
        }

        this.$on('on-form-blur', this.onFieldBlur);
        this.$on('on-form-change', this.onFieldChange);
      },
      // 从 Form 的 rules 属性中，获取当前 FormItem 的校验规则
      getRules () {
        let formRules = this.form.rules;

        formRules = formRules ? formRules[this.prop] : [];

        return [].concat(formRules || []);
      },
      // 重置数据
      resetField () {
        this.validateState = '';
        this.validateMessage = '';

        this.form.model[this.prop] = this.initialValue;
      },
    }
  }
</script>
<style>
  .i-form-item-label-required:before {
    content: '*';
    color: red;
  }
  .i-form-item-message {
    color: red;
  }
</style>
```

至此，FormItem 代码已经完成，不过它只具有单独校验的功能，也就是说，只能对自己的一个表单组件验证，不能对一个表单域里的所有组件一次性全部校验。而且实现全部校验和全部重置功能，要在 Form 中完成。

上文已经提到，在 `Form` 组件中，预先缓存了全部的 FormItem 实例，自然也就能在 Form 中调用它们。通过点击提交按钮全部校验，或点击重置按钮全部重置数据，只需要在 Form 中，逐一调用缓存的 FormItem 实例中的 `validate` 或 `resetField` 方法。相关代码如下：

```js
// form.vue，部分代码省略
export default {
  data () {
    return {
      fields: []
    };
  },
  methods: {
    // 公开方法：全部重置数据
    resetFields() {
      this.fields.forEach(field => {
        field.resetField();
      });
    },
    // 公开方法：全部校验数据，支持 Promise
    validate(callback) {
      return new Promise(resolve => {
        let valid = true;
        let count = 0;
        this.fields.forEach(field => {
          field.validate('', errors => {
            if (errors) {
              valid = false;
            }
            if (++count === this.fields.length) {
              // 全部完成
              resolve(valid);
              if (typeof callback === 'function') {
                callback(valid);
              }
            }
          });
        });
      });
    }
  },
}
```

虽然说 Vue.js 的 API 只来自 prop、event、slot 这三个部分，但一些场景下，需要通过 `ref` 来访问这个组件，调用它的一些内置方法，比如上面的 `validate` 和 `resetFields` 方法，就需要使用者来主动调用。

reserFields 很简单，就是通过循环逐一调用 FormItem 的 resetField 方法来重置数据。validate 稍显复杂，它支持两种使用方法，一种是普通的回调，比如：

```vue
<template>
  <div>
    <i-form ref="form"></i-form>
    <button @click="handleSubmit">提交</button>
  </div>
</template>
<script>
  export default {
    methods: {
      handleSubmit () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            window.alert('提交成功');
          } else {
            window.alert('表单校验失败');
          }
        })
      }
    }
  }
</script>
```

同时也支持 promise，例如：

```js
handleSubmit () {
  const validate = this.$refs.form.validate();
  
  validate.then((valid) => {
    if (valid) {
      window.alert('提交成功');
    } else {
      window.alert('表单校验失败');
    }
  })
}
```

在 Form 组件定义的 Promise 中，只调用了 resolve（valid），没有调用 reject()，因此不能直接使用 `.catch()`，不过聪明的你稍作修改，肯定能够支持到。

完整地用例如下：

```js
<template>
  <div>
    <h3>具有数据校验功能的表单组件——Form</h3>
    <i-form ref="form" :model="formValidate" :rules="ruleValidate">
      <i-form-item label="用户名" prop="name">
        <i-input v-model="formValidate.name"></i-input>
      </i-form-item>
      <i-form-item label="邮箱" prop="mail">
        <i-input v-model="formValidate.mail"></i-input>
      </i-form-item>
    </i-form>
    <button @click="handleSubmit">提交</button>
    <button @click="handleReset">重置</button>
  </div>
</template>
<script>
  import iForm from '../components/form/form.vue';
  import iFormItem from '../components/form/form-item.vue';
  import iInput from '../components/input/input.vue';

  export default {
    components: { iForm, iFormItem, iInput },
    data () {
      return {
        formValidate: {
          name: '',
          mail: ''
        },
        ruleValidate: {
          name: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          mail: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      handleSubmit () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            window.alert('提交成功');
          } else {
            window.alert('表单校验失败');
          }
        })
      },
      handleReset () {
        this.$refs.form.resetFields();
      }
    }
  }
</script>
```

运行效果：

![img](/Users/xu/Code/Notes/Vue.js 组件精讲/05-实战 1：具有数据校验功能的表单组件 Form.assets/166c3b8a77e382ec)

完整的示例源码可通过 GitHub 查看：

[github.com/icarusion/v…](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Ficarusion%2Fvue-component-book)

> 项目基于 Vue CLI 3 构建，下载安装依赖后，通过 npm run serve 可访问。

## 结语

组件最终的效果看起来有点 “low”，但它实现的功能却不简单。通过这个实战，你或许已经感受到本小册一开始说的，组件写到最后，都是在拼 JavaScript 功底。的确，Vue.js 组件为我们提供了一种新的代码组织形式，但归根到底，是离不开 JS 的。

这个实战，你应该对独立组件间的通信用法有进一步的认知了吧，不过，这还不是组件通信的终极方案，下一节，我们就来看看适用于任何场景的组件通信方案。

注：本节部分代码参考 [iView](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fiview%2Fiview%2Ftree%2F2.0%2Fsrc%2Fcomponents%2Fform)。



# 找到任意组件实例——findComponents 系列方法



## 概述

前面的小结我们已经介绍了两种组件间通信的方法： provider / inject 和 dispatch / broadcast。它们有各自的使用场景和局限，比如前者多用于子组件获取父组件的状态，后者常用于父子组件间通过自定义事件通信。

本节介绍第三种组件通信的方法，也就是 findComponents 系列方法，它并非 Vue.js 内置，而是需要自行实现，以工具函数的形式来使用，它是一系列的函数，可以说是组件通信得人终极方案。findComponents 系列方法最终都是返回组件的实例，进而可以读取或调用该组件的数据和方法。

它适用于以下场景：

- 由一个组件，向上找到最近的指定组件；
- 由一个组件，向上找到所有的指定组件；
- 由一个组件，向下找到最近的指定组件；
- 由一个组件，向下找到所有的指定组件；
- 由一个组件，找到指定组件的兄弟组件。

5 个不同的场景，对应 5 个不同的函数，实现原理也大同小异。 



```
<todo-item
      is="todo-item"
      v-for="(todo, index) in todos"
      v-bind:key="todo.id"
      v-bind:title="todo.title"
      v-on:remove="todos.splice(index, 1)"
    ></todo-item>
    
    
    <baba>
    	div
    	div
    	div
    		<todo-item>
    </baba>
```



## 实现

5 个函数的原理，都是通过递归、遍历，找到指定组件的 `name` 选项匹配的组件实例并返回。

> 本节以及后续章节，都是基于上一节的工程来完成，后续不再重复说明。
>
> 完整源码地址：[github.com/icarusion/v…](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Ficarusion%2Fvue-component-book)

在目录 `src` 下新建文件夹 `utils` 用来放置工具函数，并新建文件 `assist.js`，本节所有函数都在这个文件里完成，每个函数都通过 `export` 对外提供（如果你不了解 export，请查看扩展阅读1）。

### 向上找到最近的指定组件——findComponentUpward

先看代码：

```js
// assist.js
// 由一个组件，向上找到最近的指定组件
function findComponentUpward (context, componentName) {
  let parent = context.$parent;
  let name = parent.$options.name;
  
  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }
  return parent;
}
export { findComponentUpward }
```

findComponentUpward 接收两个参数，第一个是当前上下文，比如你要基于哪个组件向上寻找，一般都是基于当前的组件，也就是传入 `this`；第二个参数是要找的组件的 `name`。

findComponentUpward 方法会在 while 语句里不断向上覆盖当前的 `parent` 对象，通过判断组件（即 parent）的 name 与传入的 componentName 是否一致，直到最近的一个组件为止。

与 dispatch 不同的是，findComponentsUpward 是直接拿到组件的实例，而非通过事件通知组件。比如下面的示例，有组件 A 和 组件 B， A 是 B 的父组件，在 B 中获取和调用 A 中的数据和方法：

```vue
<!-- component-a.vue -->
<template>
  <div>
    组件 A
    <component-b></component-b>
  </div>
</template>
<script>
  import componentB from './component-b.vue';

  export default {
    name: 'componentA',
    components: { componentB },
    data () {
      return {
        name: 'Aresn'
      }
    },
    methods: {
      sayHello () {
        console.log('Hello, Vue.js');
      }
    }
  }
</script>
```

```vue
<!-- component-b.vue -->
<template>
  <div>
    组件 B
  </div>
</template>
<script>
  import { findComponentUpward } from '../utils/assist.js';

  export default {
    name: 'componentB',
    mounted () {
      const comA = findComponentUpward(this, 'componentA');
      
      if (comA) {
        console.log(comA.name);  // Aresn
        comA.sayHello();  // Hello, Vue.js
      }
    }
  }
</script>
```

使用起来很简单，只要在需要的地方调用 findComponentUpward 方法就行，第一个参数一般都是传入 this，即当前组件的上下文（实例）。

上例的 comA，保险起见，加了一层 `if (comA)` 来判断是否找到了组件 A，如果没有指定的组件而调用的话，是会报错的。

findComponentUpward 只会找到最近的一个组件实例，如果要找到全部符合要求的组件，就需要用到下面这个方法。

### 向上找到所有的指定组件——findComponentsUpward

代码如下：

```
// assist.js
// 由一个组件，向上找到所有的指定组件
function findComponentsUpward (context, componentName) {
  let parents = [];
  const parent = context.$parent;

  if (parent) {
    if (parent.$options.name === componentName) parents.push(parent);
    return parents.concat(findComponentsUpward(parent, componentName));
  } else {
    return [];
  }
}
export { findComponentsUpward };
```

与 findComponentUpward 不同的是，findComponentsUpward 返回的是一个数组，包含了所有找到的组件实例（注意函数名称中多了一个“s”）。

findComponentsUpward 的使用场景较少，一般只用在递归组件里面（后面小节会介绍），因为这个函数是一直向上寻找父级（parent）的，只有递归组件的父级才是自身。事实上，iView 在使用这个方法也都是用在递归组件的场景，比如菜单组件 Menu。由于递归组件在 Vue.js 组件里面并不常用，那自然 findComponentsUpward 也不常用了。

### 向下找到最近的指定组件——findComponentDownward

代码如下：

```js
// assist.js
// 由一个组件，向下找到最近的指定组件
function findComponentDownward (context, componentName) {
  const childrens = context.$children;
  let children = null;

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name;

      if (name === componentName) {
        children = child;
        break;
      } else {
        children = findComponentDownward(child, componentName);
        if (children) break;
      }
    }
  }
  return children;
}
export { findComponentDownward };
```

`context.$children` 得到的是当前组件的全部子组件，所以需要遍历一遍，找到有没有匹配到的组件 `name`，如果没找到，继续递归找每个 $children 的 $children，直到找到最近的一个为止。

来看个示例，仍然是 A、B 两个组件，A 是 B 的父组件，在 A 中找到 B：

```js
<!-- component-b.vue -->
<template>
  <div>
    组件 B
  </div>
</template>
<script>
  export default {
    name: 'componentB',
    data () {
      return {
        name: 'Aresn'
      }
    },
    methods: {
      sayHello () {
        console.log('Hello, Vue.js');
      }
    }
  }
</script>
```

```js
<!-- component-a.vue -->
<template>
  <div>
    组件 A
    <component-b></component-b>
  </div>
</template>
<script>
  import componentB from './component-b.vue';
  import { findComponentDownward } from '../utils/assist.js';

  export default {
    name: 'componentA',
    components: { componentB },
    mounted () {
      const comB = findComponentDownward(this, 'componentB');
      if (comB) {
        console.log(comB.name);  // Aresn
        comB.sayHello();  // Hello, Vue.js
      }
    }
  }
</script>
```

示例中的 A 和 B 是父子关系，因此也可以直接用 `ref` 来访问，但如果不是父子关系，中间间隔多代，用它就很方便了。

### 向下找到所有指定的组件——findComponentsDownward

如果要向下找到所有的指定组件，要用到 findComponentsDownward 函数，代码如下：

```js
// assist.js
// 由一个组件，向下找到所有指定的组件
function findComponentsDownward (context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child);
    const foundChilds = findComponentsDownward(child, componentName);
    return components.concat(foundChilds);
  }, []);
}
export { findComponentsDownward };
```

这个函数实现的方式有很多，这里巧妙使用 `reduce` 做累加器，并用递归将找到的组件合并为一个数组并返回，代码量较少，但理解起来稍困难。

用法与 findComponentDownward 大同小异，就不再写用例了。

### 找到指定组件的兄弟组件——findBrothersComponents

代码如下：

```js
// assist.js
// 由一个组件，找到指定组件的兄弟组件
function findBrothersComponents (context, componentName, exceptMe = true) {
  let res = context.$parent.$children.filter(item => {
    return item.$options.name === componentName;
  });
  let index = res.findIndex(item => item._uid === context._uid);
  if (exceptMe) res.splice(index, 1);
  return res;
}
export { findBrothersComponents };
```

相比其它 4 个函数，findBrothersComponents 多了一个参数 `exceptMe`，是否把本身除外，默认是 true。寻找兄弟组件的方法，是先获取 `context.$parent.$children`，也就是父组件的全部子组件，这里面当前包含了本身，所有也会有第三个参数 exceptMe。Vue.js 在渲染组件时，都会给每个组件加一个内置的属性 `_uid`，这个 _uid 是不会重复的，借此我们可以从一系列兄弟组件中把自己排除掉。

举个例子，组件 A 是组件 B 的父级，在 B 中找到所有在 A 中的兄弟组件（也就是所有在 A 中的 B 组件）：

```js
<!-- component-a.vue -->
<template>
  <div>
    组件 A
    <component-b></component-b>
  </div>
</template>
<script>
  import componentB from './component-b.vue';
  
  export default {
    name: 'componentA',
    components: { componentB }
  }
</script>
<!-- component-b.vue -->
<template>
  <div>
    组件 B
  </div>
</template>
<script>
  import { findBrothersComponents } from '../utils/assist.js';
  
  export default {
    name: 'componentB',
    mounted () {
      const comsB = findBrothersComponents(this, 'componentB');
      console.log(comsB);  // ① []，空数组
    }
  }
</script>
```

在 ① 的位置，打印出的内容为空数组，原因是当前 A 中只有一个 B，而 findBrothersComponents 的第三个参数默认是 true，也就是将自己除外。如果在 A 中再写一个 B：

```js
<!-- component-a.vue -->
<template>
  <div>
    组件 A
    <component-b></component-b>
    <component-b></component-b>
  </div>
</template>
```

这时就会打印出 `[VueComponent]`，有一个组件了，但要注意在控制台会打印两遍，因为在 A 中写了两个 B，而 `console.log` 是在 B 中定义的，所以两个都会执行到。如果你看懂了这里，那应该明白打印的两遍 `[VueComponent]`，分别是另一个 `<component-b>`（如果没有搞懂，要仔细琢磨琢磨哦）。

如果将 B 中 findBrothersComponents 的第三个参数设置为 false：

```js
// component-b.vue
export default {
  name: 'componentB',
  mounted () {
    const comsB = findBrothersComponents(this, 'componentB', false);
    console.log(comsB);
  }
}
```

此时就会打印出 `[VueComponent, VueComponent]`，也就是包含自身了。

以上就是 5 个函数的详细介绍，get 到这 5 个，以后就再也不用担心组件通信了。

## 结语

只有你认真开发过 Vue.js 独立组件，才会明白这 5 个函数的强大之处。



# Vue 的构造器—extend 与手动挂载—$mount

本节介绍两个 Vue.js 内置但却不常用的 API——extend 和 $mount，它们经常一起使用。不常用，是因为在业务开发中，基本没有它们的用武之地，但在独立组件开发时，在一些特定的场景它们是至关重要的。

所以，我们不关注他们。

### [Vue.extend( options )](https://cn.vuejs.org/v2/api/index.html#Vue-extend)

- **参数**：

  - `{Object} options`

- **用法**：

  使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。

  `data` 选项是特例，需要注意 - 在 `Vue.extend()` 中它必须是函数

  ```
  <div id="mount-point"></div>
  ```

  ```js
  // 创建构造器
  var Profile = Vue.extend({
    template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
    data: function () {
      return {
        firstName: 'Walter',
        lastName: 'White',
        alias: 'Heisenberg'
      }
    }
  })
  // 创建 Profile 实例，并挂载到一个元素上。
  new Profile().$mount('#mount-point')
  ```

  结果如下：

  ```
  <p>Walter White aka Heisenberg</p>
  ```



# Render 函数与 Functional Render

Vue.js 2.x 版本最大的区别就是使用了 Virtual DOM（虚拟 DOM）来更新 DOM节点，提升渲染。

一般来说，我们写 Vue.js 组件，模板都是写在 `<template>` 内的，但是它并不是最终呈现的内容，template 只是一种对开发者友好的语法，能够一眼看出 DOM 节点，容易维护，在 Vue.js 编译阶段，会解析为 Virtual DOM。

与 DOM 操作相比，Virtual DOM 是基于 JavaScript 计算的，所以开销会小很多。下图演示了 Virtual DOM 运行的过程：

![img](/Users/xu/Code/Notes/Vue.js 组件精讲/11-更灵活的组件：Render 函数与 Functional Render.assets/1670bc4c26b9c667)

正常的 DOM 节点在 HTML 中是这样的：

```html
<div id="main">
  <p>文本内容</p>
  <p>文本内容</p>
</div>
```

用 Virtual DOM 创建的 JavaScript 对象一般会是这样的：

```js
const vNode = {
  tag: 'div',
  attributes: {
    id: 'main'
  },
  children: [
    // p 节点
  ]
}
```

vNode 对象通过一些特定的选项描述了真实的 DOM 结构。

在 Vue.js 中，对于大部分场景，使用 template 足以应付，但是如果想完全发挥 JavaScript 的编程能力，或在一些特定场景下（后文介绍），需要使用 Vue.js 的 Render 函数。

## Render 函数

正如上文介绍的 Virtual DOM 示例一样，Vue.js 的 Render 函数也是类似的语法，需要使用一些特定的选项，将 template 的内容改写成一个 JavaScript 对象。

对于初级前端工程师，或想快速建站的需求，直接使用 Render 函数开发 Vue.js 组件是要比 template 困难的，原因在于 Render 函数返回的是一个 JS 对象，没有传统 DOM 的层级关系，配合上 if、else、for 等语句，将节点拆分成不同 JS 对象再组装，如果模板复杂，那一个 Render 函数是难读且难维护的。所以，绝大部分组件开发和业务开发，我们直接使用 template 语法就可以了，并不需要特意使用 Render 函数，那样只会增加负担，同时也放弃了 Vue.js 最大的优势（React 无 template 语法）。

很多学习 Vue.js 的开发者在遇到 Render 函数时都有点”躲避“，或直接放弃这部分，这并没有问题，因为不用 Render 函数，照样可以写出优秀的 Vue.js 程序。不过，Render 函数并没有想象中的那么复杂，只是配置项特别多，一时难以记住，但归根到底，Render 函数只有 3 个参数。

来看一组 template 和 Render 写法的对照：

```html
<template>
  <div id="main" class="container" style="color: red">
    <p v-if="show">内容 1</p>
    <p v-else>内容 2</p>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        show: false
      }
    }
  }
</script>
```

```js
export default {
  data () {
    return {
      show: false
    }
  },
  render: (h) => {
    let childNode;
    if (this.show) {
      childNode = h('p', '内容 1');
    } else {
      childNode = h('p', '内容 2');
    }
    
    return h('div', {
      attrs: {
        id: 'main'
      },
      class: {
        container: true
      },
      style: {
        color: 'red'
      }
    }, [childNode]);
  }
}
```

这里的 `h`，即 `createElement`，是 Render 函数的核心。可以看到，template 中的 **v-if / v-else**等指令，都被 JS 的 **if / else** 替代了，那 **v-for** 自然也会被 **for** 语句替代。

h 有 3 个参数，分别是：

1. 要渲染的元素或组件，可以是一个 html 标签、组件选项或一个函数（不常用），该参数为必填项。示例：

   ```
   // 1. html 标签
   h('div');
   // 2. 组件选项
   import DatePicker from '../component/date-picker.vue';
   h(DatePicker);
   ```

2. 对应属性的数据对象，比如组件的 props、元素的 class、绑定的事件、slot、自定义指令等，该参数是可选的，上文所说的 Render 配置项多，指的就是这个参数。该参数的完整配置和示例，可以到 Vue.js 的文档查看，没必要全部记住，用到时查阅就好：[createElement 参数](https://link.juejin.im/?target=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fguide%2Frender-function.html%23createElement-%25E5%258F%2582%25E6%2595%25B0)。

3. 子节点，可选，String 或 Array，它同样是一个 h。示例：

   ```js
   [
     '内容',
     h('p', '内容'),
     h(Component, {
       props: {
         someProp: 'foo'
       }
     })
   ]
   ```

### 约束

所有的组件树中，如果 vNode 是组件或含有组件的 slot，那么 vNode 必须唯一。以下两个示例都是**错误**的：

```js
// 局部声明组件
const Child = {
  render: (h) => {
    return h('p', 'text');
  }
}

export default {
  render: (h) => {
    // 创建一个子节点，使用组件 Child
    const ChildNode = h(Child);
    
    return h('div', [
      ChildNode,
      ChildNode
    ]);
  }
}


{
  render: (h) => {
    return h('div', [
      this.$slots.default,
      this.$slots.default
    ])
  }
}
```

重复渲染多个组件或元素，可以通过一个循环和工厂函数来解决：

```js
const Child = {
  render: (h) => {
    return h('p', 'text');
  }
}

export default {
  render: (h) => {
    const children = Array.apply(null, {
      length: 5
    }).map(() => {
      return h(Child);
    });
    return h('div', children);
  }
}
```

对于含有组件的 slot，复用比较复杂，需要将 slot 的每个子节点都克隆一份，例如：

```js
{
  render: (h) => {
    function cloneVNode (vnode) {
      // 递归遍历所有子节点，并克隆
      const clonedChildren = vnode.children && vnode.children.map(vnode => cloneVNode(vnode));
      const cloned = h(vnode.tag, vnode.data, clonedChildren);
      cloned.text = vnode.text;
      cloned.isComment = vnode.isComment;
      cloned.componentOptions = vnode.componentOptions;
      cloned.elm = vnode.elm;
      cloned.context = vnode.context;
      cloned.ns = vnode.ns;
      cloned.isStatic = vnode.isStatic;
      cloned.key = vnode.key;

      return cloned;
    }

    const vNodes = this.$slots.default === undefined ? [] : this.$slots.default;
    const clonedVNodes = this.$slots.default === undefined ? [] : vNodes.map(vnode => cloneVNode(vnode));
    
    return h('div', [
      vNodes,
      clonedVNodes
    ])
  }
}
```

在 Render 函数里创建了一个 cloneVNode 的工厂函数，通过递归将 slot 所有子节点都克隆了一份，并对 VNode 的关键属性也进行了复制。

深度克隆 slot 并非 Vue.js 内置方法，也没有得到推荐，属于黑科技，在一些特殊的场景才会使用到，正常业务几乎是用不到的。比如 iView 组件库的穿梭框组件 Transfer，就用到了这种方法：



![img](/Users/xu/Code/Notes/Vue.js 组件精讲/11-更灵活的组件：Render 函数与 Functional Render.assets/1670bc4f017b9bf6)

它的使用方法是：

```html
<Transfer
    :data="data"
    :target-keys="targetKeys"
    :render-format="renderFormat">
  <div :style="{float: 'right', margin: '5px'}">
    <Button size="small" @click="reloadMockData">Refresh</Button>
  </div>
</Transfer>
```

示例中的默认 slot 是一个 Refresh 按钮，使用者只写了一遍，但在 Transfer 组件中，是通过克隆 VNode 的方法，显示了两遍。如果不这样做，就要声明两个具名 slot，但是左右两个的逻辑可能是完全一样的，使用者就要写两个一模一样的 slot，这是不友好的。

> Render 函数的基本用法还有很多，比如 v-model 的用法、事件和修饰符、slot 等，读者可以到 Vue.js 文档阅读。[Vue.js 渲染函数](https://link.juejin.im/?target=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fguide%2Frender-function.html)

## Render 函数使用场景

上文说到，一般情况下是不推荐直接使用 Render 函数的，使用 template 足以，在 Vue.js 中，使用 Render 函数的场景，主要有以下 4 点：

1. 使用两个相同 slot。在 template 中，Vue.js 不允许使用两个相同的 slot，比如下面的示例是错误的：

   ```html
   <template>
     <div>
       <slot></slot>
       <slot></slot>
     </div>
   </template>
   ```

   解决方案就是上文中讲到的**约束**，使用一个深度克隆 VNode 节点的方法。

2. 在 SSR 环境（服务端渲染），如果不是常规的 template 写法，比如通过 Vue.extend 和 new Vue 构造来生成的组件实例，是编译不过的，在前面小节也有所介绍。回顾上一节的 `$Alert` 组件的 notification.js 文件，当时是使用 Render 函数来渲染 Alert 组件，如果改成另一种写法，在 SSR 中会报错，对比两种写法：

   ```js
   // 正确写法
   import Alert from './alert.vue';
   import Vue from 'vue';
   
   Alert.newInstance = properties => {
     const props = properties || {};
   
     const Instance = new Vue({
       data: props,
       render (h) {
         return h(Alert, {
           props: props
         });
       }
     });
   
     const component = Instance.$mount();
     document.body.appendChild(component.$el);
   
     const alert = Instance.$children[0];
   
     return {
       add (noticeProps) {
         alert.add(noticeProps);
       },
       remove (name) {
         alert.remove(name);
       }
     }
   };
   
   export default Alert;
   ```

   ```js
   // 在 SSR 下报错的写法
   import Alert from './alert.vue';
   import Vue from 'vue';
   
   Alert.newInstance = properties => {
     const props = properties || {};
   
     const div = document.createElement('div');
     div.innerHTML = `<Alert ${props}></Alert>`;
     document.body.appendChild(div);
     
     const Instance = new Vue({
       el: div,
       data: props,
       components: { Alert }
     });
   
     const alert = Instance.$children[0];
   
     return {
       add (noticeProps) {
         alert.add(noticeProps);
       },
       remove (name) {
         alert.remove(name);
       }
     }
   };
   
   export default Alert;
   ```

3. 在 runtime 版本的 Vue.js 中，如果使用 Vue.extend 手动构造一个实例，使用 template 选项是会报错的，在第 9 节中也有所介绍。解决方案也很简单，把 template 改写为 Render 就可以了。需要注意的是，在开发独立组件时，可以通过配置 Vue.js 版本来使 template 选项可用，但这是在自己的环境，无法保证使用者的 Vue.js 版本，所以对于提供给他人用的组件，是需要考虑兼容 runtime 版本和 SSR 环境的。

4. 这可能是使用 Render 函数最重要的一点。一个 Vue.js 组件，有一部分内容需要从父级传递来显示，如果是文本之类的，直接通过 `props` 就可以，如果这个内容带有样式或复杂一点的 html 结构，可以使用 `v-html` 指令来渲染，父级传递的仍然是一个 HTML Element 字符串，不过它仅仅是能解析正常的 html 节点且有 XSS 风险。当需要最大化程度自定义显示内容时，就需要 `Render` 函数，它可以渲染一个完整的 Vue.js 组件。你可能会说，用 slot 不就好了？的确，slot 的作用就是做内容分发的，但在一些特殊组件中，可能 slot 也不行。比如一个表格组件 `Table`，它只接收两个 props：列配置 columns 和行数据 data，不过某一列的单元格，不是只将数据显示出来那么简单，可能带有一些复杂的操作，这种场景只用 slot 是不行的，没办法确定是那一列的 slot。这种场景有两种解决方案，其一就是 Render 函数，下一节的实战就是开发这样一个 Table 组件；另一种是用作用域 slot（slot-scope），后面小节也会详细介绍。

## Functional Render

Vue.js 提供了一个 `functional` 的布尔值选项，设置为 true 可以使组件无状态和无实例，也就是没有 data 和 this 上下文。这样用 Render 函数返回虚拟节点可以更容易渲染，因为函数化组件（Functional Render）只是一个函数，渲染开销要小很多。

使用函数化组件，Render 函数提供了第二个参数 context 来提供临时上下文。组件需要的 data、props、slots、children、parent 都是通过这个上下文来传递的，比如 this.level 要改写为 context.props.level，this.$slots.default 改写为 context.children。

> 您可以阅读 [Vue.js 文档—函数式组件](https://link.juejin.im/?target=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fguide%2Frender-function.html%23%25E5%2587%25BD%25E6%2595%25B0%25E5%25BC%258F%25E7%25BB%2584%25E4%25BB%25B6) 来查看示例。

函数化组件在业务中并不是很常用，而且也有类似的方法来实现，比如某些场景可以用 is 特性来动态挂载组件。函数化组件主要适用于以下两个场景：

- 程序化地在多个组件中选择一个；
- 在将 children、props、data 传递给子组件之前操作它们。

比如上文说过的，某个组件需要使用 Render 函数来自定义，而不是通过传递普通文本或 v-html 指令，这时就可以用 Functional Render，来看下面的示例：

1. 首先创建一个函数化组件 **render.js**：

   ```js
   // render.js
   export default {
     functional: true,
     props: {
       render: Function
     },
     render: (h, ctx) => {
       return ctx.props.render(h);
     }
   };
   ```

   它只定义了一个 props：render，格式为 Function，因为是 functional，所以在 render 里使用了第二个参数 `ctx` 来获取 props。这是一个中间文件，并且可以复用，其它组件需要这个功能时，都可以引入它。

2. 创建组件：

   ```js
   <!-- my-component.vue -->
   <template>
     <div>
       <Render :render="render"></Render>
     </div>
   </template>
   <script>
     import Render form './render.js';
     
     export default {
       components: { Render },
       props: {
         render: Function
       }
     }
   </script>
   ```

3. 使用上面的 my-compoennt 组件：

   ```
   <!-- demo.vue -->
   <template>
     <div>
       <my-component :render="render"></my-component>
     </div>
   </template>
   <script>
     import myComponent from '../components/my-component.vue';
     
     export default {
       components: { myComponent },
       data () {
         return {
           render: (h) => {
             return h('div', {
               style: {
                 color: 'red'
               }
             }, '自定义内容');
           }
         }
       }
     }
   </script>
   ```

这里的 render.js 因为只是把 demo.vue 中的 Render 内容过继，并无其它用处，所以用了 Functional Render。

就此例来说，完全可以用 slot 取代 Functional Render，那是因为只有 `render` 这一个 prop。如果示例中的 `<Render>` 是用 `v-for` 生成的，也就是多个时，用 一个 slot 是实现不了的，那时用 Render 函数就很方便了，后面章节会专门介绍。

## 结语

如果想换一种思路写 Vue.js，就试试 Render 函数吧，它会让你“又爱又恨”！







# 递归组件和动态组件

## 递归组件

递归组件就是指组件在模板中调用自己，开启递归组件的必要条件，就是在组件中设置一个 `name` 选项。比如下面的示例：

```html
<template>
  <div>
    <my-component></my-component>
  </div>
</template>
<script>
  export default {
    name: 'my-component'
  }
</script>
```

在 Webpack 中导入一个 Vue.js 组件，一般是通过 `import myComponent from  'xxx'` 这样的语法，然后在当前组件（页面）的 `components: { myComponent }`  里注册组件。这种组件是不强制设置 `name` 字段的，组件的名字都是使用者在 import 进来后自定义的，但递归组件的使用者是组件自身，它得知道这个组件叫什么，因为没有用 `components` 注册，所以 `name` 字段就是必须的了。除了递归组件用 `name` ，我们之前的小结也介绍过，用一些特殊的方法，通过遍历匹配组件的 name 选项来寻找组件实例。

不过呢，上面的示例是有问题的，如果直接运行，会抛出 `max stack size exceeded` 的错误，因为组件会无限递归下去，死循环。解决这个问题，就要给递归组件一个限制条件，一般会在递归组件上用 `v-if` 在某个地方设置为 `false` 来终结。比如我们给上面的示例加一个属性 count，当大于 5 时就不再递归：

```html
<template>
  <div>
    <my-component :count="count + 1" v-if="count <= 5"></my-component>
  </div>
</template>
<script>
  export default {
    name: 'my-component',
    props: {
      count: {
        type: Number,
        default: 1
      }
    }
  }
</script>
```

所以，总结下来，实现一个递归组件的必要条件是：

- 要给组件设置 **name**；
- 要有一个明确的结束条件

递归组件常用来开发具有未知层级关系的独立组件，在业务开发中很少使用。比如常见的有级联选择器和树形控件：

![img](/Users/xu/Code/Notes/Vue.js 组件精讲/14-递归组件与动态组件.assets/167398b8f5a828b1)

这类组件一般都是数据驱动的，父级有一个字段 children，然后递归。

## 动态组件

有时候，我们希望根据一些条件，动态地切换某个组件，或动态地选择渲染某个组件。之前的小节介绍函数式组件 Functional Render 时，已经说过，它是一个没有上下文的函数，常用于程序化地在多个组件中选择一个。使用 Render 或 Functional Render 可以解决动态切换组件的需求，不过那是基于一个 JS 对象（Render 函数），而 Vue.js 提供了另外一个内置的组件 `<component>` 和 `is` 特性，可以更好地实现动态组件。

先来看一个 `<component>` 和 `is` 的基本示例，首先定义三个普通组件：

```html
<!-- a.vue -->
<template>
  <div>
    组件 A
  </div>
</template>
<script>
  export default {

  }
</script>
```

```html
<!-- b.vue -->
<template>
  <div>
    组件 B
  </div>
</template>
<script>
  export default {

  }
</script>
```

```html
<!-- c.vue -->
<template>
  <div>
    组件 C
  </div>
</template>
<script>
  export default {

  }
</script>
```

然后在父组件中导入这 3 个组件，并且动态切换：

```html
<template>
  <div>
    <button @click="handleChange('A')">显示 A 组件</button>
    <button @click="handleChange('B')">显示 B 组件</button>
    <button @click="handleChange('C')">显示 C 组件</button>

    <component :is="component"></component>
  </div>
</template>
<script>
  import componentA from '../components/a.vue';
  import componentB from '../components/b.vue';
  import componentC from '../components/c.vue';

  export default {
    data () {
      return {
        component: componentA
      }
    },
    methods: {
      handleChange (component) {
        if (component === 'A') {
          this.component = componentA;
        } else if (component === 'B') {
          this.component = componentB;
        } else if (component === 'C') {
          this.component = componentC;
        }
      }
    }
  }
</script>
```

这里的 `is` 动态绑定的是一个组件对象（object），它直接指向 a / b /c 三个组件中的一个。除了直接绑定一个 Object，还可以是一个 String，比如标签名、组件名。下面的这个组件，将原生的按钮 button 进行了封装，如果传入了 `prop: to` ，那它会渲染为一个 `<a>` 标签，用于打开这个链接地址，如果没有传入 `to`，就当普通的 button 使用。来看下面的示例：

```js
<!-- button.vue -->
<template>
  <component :is="tagName" v-bind="tagProps">
    <slot></slot>
  </component>
</template>
<script>
  export default {
    props: {
      // 链接地址
      to: {
        type: String,
        default: ''
      },
      // 链接打开方式，如 _blank
      target: {
        type: String,
        default: '_self'
      }
    },
    computed: {
      // 动态渲染不同的标签
      tagName () {
        return this.to === '' ? 'button' : 'a';
      },
      // 如果是链接，把这些属性都绑定在 component 上
      tagProps () {
        let props = {};

        if (this.to) {
          props = {
            target: this.target,
            href: this.to
          }
        }

        return props;
      }
    }
  }
</script>
```

使用组件：

```html
<template>
  <div>
    <i-button>普通按钮</i-button>
    <br>
    <i-button to="https://juejin.im">链接按钮</i-button>
    <br>
    <i-button to="https://juejin.im" target="_blank">新窗口打开链接按钮</i-button>
  </div>
</template>
<script>
  import iButton from '../components/a.vue';

  export default {
    components: { iButton }
  }
</script>
```

最终会渲染出一个原生的 `<button>` 按钮和两个原生的链接 `<a>`，且第二个点击会在新窗口中打开链接，如图：

![img](/Users/xu/Code/Notes/Vue.js 组件精讲/14-递归组件与动态组件.assets/167398c004dc0c60)

i-button 组件中的 `<component>` `is` 绑定的就是一个标签名称 button / a，并且通过 `v-bind` 将一些额外的属性全部绑定到 `<component>` 上。

 再回到第一个 a / b / c 组件切换的示例，如果这类的组件，频繁切换，事实上组件是会重新渲染的，比如我们在组件 A 里加两个生命周期：

```html
<!-- a.vue -->
<template>
  <div>
    组件 A
  </div>
</template>
<script>
  export default {
    mounted () {
      console.log('组件创建了');
    },
    beforeDestroy () {
      console.log('组件销毁了');
    }
  }
</script>
```

只要切换到 A 组件，`mounted` 就会触发一次，切换到其它组件，`beforeDestroy` 也会触发一次，说明组件再重新渲染，这样有可能导致性能问题。为了避免组件的重复渲染，可以在 `<component>`外层套一个 Vue.js 内置的 `<keep-alive>` 组件，这样，组件就会被缓存起来：

```
<keep-alive>
  <component :is="component"></component>
</keep-alive>
```

这时，只有 `mounted` 触发了，如果不离开当前页面，切换到其它组件，`beforeDestroy` 不会被触发，说明组件已经被缓存了。

keep-alive 还有一些额外的 props 可以配置：

- `include`：字符串或正则表达式。只有名称匹配的组件会被缓存。
- `exclude`：字符串或正则表达式。任何名称匹配的组件都不会被缓存。
- `max`：数字。最多可以缓存多少组件实例。

## 结语

还有一类是异步组件，Vue.js 文档已经介绍的很清楚了，可以阅读文末的扩展阅读 1。事实上异步组件我们用的很多，比如 router 的配置列表，一般都是用的异步组件形式：

```
{
  path: '/form',
  component: () => import('./views/form.vue')
}
```

这样每个页面才会在路由到时才加载对应的 JS 文件，否则入口文件会非常庞大。

递归组件、动态组件和异步组件是 Vue.js 中相对冷门的 3 种组件模式，不过在封装复杂的独立组件时，前两者会经常使用。







# 拓展：Vue.js 容易忽略的 API 详解

前面的小节已经覆盖了 Vue.js 组件的大部分内容，但还是有一些 API 容易忽略。本节则对 Vue.js 的一些重要且易忽略的 API 进行详细介绍。

## nextTick

nextTick 是 Vue.js 提供的一个函数，并非浏览器内置。nextTick 函数接收一个回调函数 `cb`，在下一个 DOM 更新循环之后执行。比如下面的示例：

```html
<template>
  <div>
    <p v-if="show" ref="node">内容</p>
    <button @click="handleShow">显示</button>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        show: false
      }
    },
    methods: {
      handleShow () {
        this.show = true;
        console.log(this.$refs.node);  // undefined
        this.$nextTick(() => {
          console.log(this.$refs.node);  // <p>内容</p>
        });
      }
    }
  }
</script>
```

当 `show` 被设置为 true 时，这时 p 节点还未被渲染，因此打印出的是 undefined，而在 nextTick 回调里，p 已经渲染好了，这时能正确打印出节点。

nextTick 的源码在 [github.com/vuejs/vue/b…](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue%2Fblob%2Fdev%2Fsrc%2Fcore%2Futil%2Fnext-tick.js)，可以看到，Vue.js 使用了 `Promise`、`setTimeout`和 `setImmediate` 三种方法来实现 nextTick，在不同环境会使用不同的方法。

## v-model 语法糖

`v-model` 常用于表单元素上进行数据的双向绑定，比如 `<input>`。除了原生的元素，它还能自定义在组件中使用。

`v-model` 是一个语法糖，可以拆解为 props: value 和 events: input。就是说组件必须提供一个名为 value 的 prop，以及名为 input 的自定义事件，满足这两个条件，使用者就能在自定义组件上使用 `v-model`。比如下面的示例，实现了一个数字选择器：

```html
<template>
  <div>
    <button @click="increase(-1)">减 1</button>
    <span style="color: red;padding: 6px">{{ currentValue }}</span>
    <button @click="increase(1)">加 1</button>
  </div>
</template>
<script>
  export default {
    name: 'InputNumber',
    props: {
      value: {
        type: Number
      }
    },
    data () {
      return {
        currentValue: this.value
      }
    },
    watch: {
      value (val) {
        this.currentValue = val;
      }
    },
    methods: {
      increase (val) {
        this.currentValue += val;
        this.$emit('input', this.currentValue);
      }
    }
  }
</script>
```

props 一般不能在组件内修改，它是通过父级修改的，因此实现 v-model 一般都会有一个 `currentValue` 的内部 data，初始时从 value 获取一次值，当 value 修改时，也通过 watch 监听到及时更新；组件不会修改 value 的值，而是修改 currentValue，同时将修改的值通过自定义事件 `input` 派发给父组件，父组件接收到后，由父组件修改 value。所以，上面的数字选择器组件可以有下面两种使用方式：

```html
<template>
  <InputNumber v-model="value" />
</template>
<script>
  import InputNumber from '../components/input-number/input-number.vue';

  export default {
    components: { InputNumber },
    data () {
      return {
        value: 1
      }
    }
  }
</script>
```

或者：

```html
<template>
  <InputNumber :value="value" @input="handleChange" />
</template>
<script>
  import InputNumber from '../components/input-number/input-number.vue';

  export default {
    components: { InputNumber },
    data () {
      return {
        value: 1
      }
    },
    methods: {
      handleChange (val) {
        this.value = val;
      }
    }
  }
</script>
```

在 model 选项里，就可以指定 prop 和 event 的名字了，而不一定非要用 value 和 input，因为这两个名字在一些原生表单元素里，有其它用处。

## .sync 修饰符

如果你使用过 Vue.js 1.x，一定对 `.sync` 不陌生。在 1.x 里，可以使用 .sync 双向绑定数据，也就是父组件或子组件都能修改这个数据，是双向响应的。在 Vue.js 2.x 里废弃了这种用法，目的是尽可能将父子组件解耦，避免子组件无意中修改了父组件的状态。

不过在 Vue.js 2.3.0 版本，又增加了 `.sync` 修饰符，但它的用法与 1.x 的不完全相同。2.x 的 .sync 不是真正的双向绑定，而是一个语法糖，修改数据还是在父组件完成的，并非在子组件。

仍然是数字选择器的示例，这次不用 v-model，而是用 .sync，可以这样改写：

```html
<template>
  <div>
    <button @click="increase(-1)">减 1</button>
    <span style="color: red;padding: 6px">{{ value }}</span>
    <button @click="increase(1)">加 1</button>
  </div>
</template>
<script>
  export default {
    name: 'InputNumber',
    props: {
      value: {
        type: Number
      }
    },
    methods: {
      increase (val) {
        this.$emit('update:value', this.value + val);
      }
    }
  }
</script>
```

用例：

```html
<template>
  <InputNumber :value.sync="value" />
</template>
<script>
  import InputNumber from '../components/input-number/input-number.vue';

  export default {
    components: { InputNumber },
    data () {
      return {
        value: 1
      }
    }
  }
</script>
```

看起来要比 v-model 的实现简单多，实现的效果是一样的。v-model 在一个组件中只能有一个，但 .sync 可以设置很多个。.sync 虽好，但也有限制，比如：

- **不能**和表达式一起使用（如 `v-bind:title.sync="doc.title + '!'"` 是无效的）；
- **不能**用在字面量对象上（如 `v-bind.sync="{ title: doc.title }"` 是无法正常工作的）。

## $set

在上一节已经介绍过 `$set`，有两种情况会用到它：

1. 由于 JavaScript 的限制，Vue 不能检测以下变动的数组：
   1. 当利用索引直接设置一个项时，例如：`this.items[index] = value`;
   2. 当修改数组的长度时，例如：`vm.items.length = newLength`。
2. 由于 JavaScript 的限制，**Vue 不能检测对象属性的添加或删除**。

举例来看，就是：

```js
// 数组
export default {
  data () {
    return {
      items: ['a', 'b', 'c']
    }
  },
  methods: {
    handler () {
      this.items[1] = 'x';  // 不是响应性的
    }
  }
}
```

使用 `$set`：

```js
// 数组
export default {
  data () {
    return {
      items: ['a', 'b', 'c']
    }
  },
  methods: {
    handler () {
      this.$set(this.items, 1, 'x');  // 是响应性的
    }
  }
}
```

以对象为例：

```js
// 对象
export default {
  data () {
    return {
      item: {
        a: 1
      }
    }
  },
  methods: {
    handler () {
      this.item.b = 2;  // 不是响应性的
    }
  }
}
```

使用 `$set`：

```js
// 对象
export default {
  data () {
    return {
      item: {
        a: 1
      }
    }
  },
  methods: {
    handler () {
      this.$set(this.item, 'b', 2);  // 是响应性的
    }
  }
}
```

另外，数组的以下方法，都是**可以**触发视图更新的，也就是响应性的：

`push()`、`pop()`、`shift()`、`unshift()`、`splice()`、`sort()`、`reverse()`。

还有一种小技巧，就是先 copy 一个数组，然后通过 index 修改后，再把原数组整个替换，比如：

```js
handler () {
  const data = [...this.items];
  data[1] = 'x';
  this.items = data;
}
```

## 计算属性的 set

计算属性（computed）很简单，而且也会大量使用，但大多数时候，我们只是用它默认的 get 方法，也就是平时的常规写法，通过 computed 获取一个依赖其它状态的数据。比如：

```js
computed: {
  fullName () {
    return `${this.firstName} ${this.lastName}`;
  }
}
```

这里的 fullName 事实上可以写为一个 Object，而非 Function，只是 Function 形式是我们默认使用它的 get 方法，当写为 Object 时，还能使用它的 set 方法：

```js
computed: {
  fullName: {
    get () {
      return `${this.firstName} ${this.lastName}`;
    },
    set (val) {
      const names = val.split(' ');
      this.firstName = names[0];
      this.lastName = names[names.length - 1];
    }
  }
}
```

计算属性大多时候只是读取用，使用了 set 后，就可以写入了，比如上面的示例，如果执行 `this.fullName = 'Aresn Liang'`，computed 的 set 就会调用，firstName 和 lastName 会被赋值为 Aresn 和 Liang。

## 剩余值得注意的 API

还有一些 API，可能不常用，也比较简单，只需知道就好，本册不详细展开介绍，可以通过指引到 Vue.js 文档查看。

### [delimiters](https://link.juejin.im/?target=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fapi%2F%23delimiters)

改变纯文本插入分隔符，Vue.js 默认的是 `{{ }}`，如果你使用其它一些后端模板，比如 Python 的 Tornado 框架，那 Vue.js 和 Tornado 的 `{{ }}` 就冲突了，这时用它可以修改为指定的分隔符。

### [v-once](https://link.juejin.im/?target=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fapi%2F%23v-once)

只渲染元素和组件**一次**。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。

### [vm.$isServer](https://link.juejin.im/?target=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fapi%2F%23vm-isServer)

当前 Vue 实例是否运行于服务器，如果你的组件要兼容 SSR，它会很有用。

### [inheritAttrs](https://link.juejin.im/?target=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fapi%2F%23inheritAttrs)

一些原生的 html 特性，比如 `id`，即使没有定义 props，也会被集成到组件根节点上，设置 inheritAttrs 为 false 可以关闭此特性。

### [errorHandler](https://link.juejin.im/?target=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fapi%2F%23errorHandler)

使用 `errorHandler` 可以进行异常信息的获取。

### [watch](https://link.juejin.im/?target=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fapi%2F%23watch)

监听状态的变化，用的也很多了，但它和 computed 一样，也有 Object 的写法，这样能配置更多的选项，比如：

- handler 执行的函数
- deep 是否深度
- immediate 是否立即执行

完整的配置可以阅读文档。

### [comments](https://link.juejin.im/?target=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fapi%2F%23comments)

开启会保留 html 注释。

### [transition](https://link.juejin.im/?target=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fapi%2F%23transition)

内置的组件，可做过渡效果，比如 CSS 的高度从 0 到 auto（使用纯 CSS 是无法实现动画的）。

## 结语

彻底掌握一门语言（框架），不需要阅读它所有的源码，但至少要阅读它所有的 [API](https://link.juejin.im/?target=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fapi%2F)。





# 拓展：Vue.js 面试、常见问题答疑

过去的面试中，我们经常会问面试者一些关于 Vue.js 的问题。这些问题从题面来看很简单，但仔细想又不是那么简单，不同的人，会答出不同的层次，从而展现对 VUe.js 的理解程度。

## 题目

### v-show 和 v-if 的区别

第一道题应该是最简单的，提这个问题，也是想让人不那么紧张，因为但凡用过 Vue.js 的，多少知道 `v-show` 和 `v-if` 的区别，不然也没得聊了。不过这是最简单的一题，有三个层次：

- `v-show` 只是 CSS 级别的 `display: none;` 和 `display: block;` 之间的切换，而 `v-if` 决定的是否选择代码块的内容（或组件）。

  回答到这些，已经可以得到 50 分了~

- 什么时候用 `v-show`，什么时候用 `v-if`？

  频繁操作的，使用 `v-show`，一次性渲染完的，使用 `v-if`，只要意思对就好。

  这样就可以拿到 80 分了~

- 那使用 `v-if` 在性能优化上有什么经验？这是个加分项目，要对 Vue.js 组件编译有一定的理解。

  因为当 `v-if="false"` 时，内部组件是不会渲染的，所以在特定条件下才渲染部分组件（或内容）时，可以将条件设置为 `false`，需要时（或异步，比如 $nextTick）再设置为 `true`，这样可以优化渲染重要的其他内容，合理利用，可以进行性能优化。

### 绑定 class 的数组用法

动态绑定 class 应该不陌生吧，这也是最基本的，但是这个问题却有点绕，什么叫**绑定 class 的数组用法？**我们来看一下，最常用的绑定 class 怎么写：

```html
<template>
	<div :class="{show: isShow}">内容</div>
</template>
<script>
	export default {
    data () {
      return {
        isShow: true
      }
    }
	}
</script>
```

绑定 class 的对象用法能满足大部分业务需求，不过，在复杂的场景下，会用到数组，来看示例：

```html
<template>
	<div :class="classes"></div>
</template>
<script>
  export default {
    computed: {
      classes () {
        return [
          `${prefixCls}`,
          `${prefixCls}-${this.type}`,
          {
            [`${prefixCls}-long`]: this.long,
            [`${prefixCls}-${this.shape}`]: !!this.shape,
            [`${prefixCls}-${this.size}`]: this.size !== 'default',
            [`${prefixCls}-loading`]: this.loading != null && this.loading,
            [`${prefixCls}-icon-only`]: !this.showSlot && (!!this.icon || !!this.customIcon || this.loading),
            [`${prefixCls}-ghost`]: this.ghost
          }
        ];
      }
    }
  }
</script>
```

示例来自 iView 的 Button 组件，可以看到，数组里，可以是固定的值，还有动态值（对象）的混合。

### 计算属性和 watch 的区别

回答该题前，一般都会思考一下。很多人会偏题，直接去答计算属性和 watch 怎么用，这是不得分的，因为题目是问区别，并不是用法。

 计算属性是自动监听依赖值的变化，从而动态返回内容，监听是一个过程，在监听的值变化时，可以触发一个回调，并做一些事情。

所以区别来源于用法，只是需要动态值，那就用计算属性；需要知道值的改变后执行业务逻辑，才用 watch，用反或混用虽然可行，但都是不正确的用法。

这个问题会延伸出几个问题：

1. computed 是一个对象时，它有哪些选项？
2. computed 和 methods 有什么区别？
3. computed 是否能依赖其它组件的数据？
4. watch 是一个对象时，它有哪些选项？

问题 1，已经在 16 小节介绍过，有 get 和 set 两个选项。

问题 2，methods 是一个方法，它可以接受参数，而 computed 不能；computed 是可以缓存的，methods 不会；一般在 `v-if` 中，需要根据当前项动态绑定值时，只能用 methods 不能用 computed，因为 computed 不能传参。

问题 3，computed 可以依赖其它 computed，甚至是其它组件的 data。

问题 4，第 16 小节也有提到，有以下常用的配置：

- handler 执行的函数
- deep 是否深度
- immediate 是否立即执行





# Vue 自定义指令实现点击元素外触发事件

> 前言 最近写项目需要实现一个场景，点击一块区域，弹出一个编辑区域，点击页面的其他地方的时候，这个编辑区域就隐藏，本想想之前写模态框一样写个方法是，觉得可以尝试用 vue 相关的东西优雅的解决这个问题。



## 1 - 前置知识

我们直接来看官方文档。

### 1.1 定义

出了核心功能默认内置的指令（`v-model` 和 `v-show`），Vue 也允许注册自定义指令。注意，在 Vue2.0 中，代码复用和抽象的主要形式是组件。然而，有的情况下，你仍然需要对普通的 DOM 元素进行底层操作，这时候就会用到自定义指令。

### 1.2 基础实现

这个分两种情况

- 如果你想定义一个全局的自定义组件的话，那么就在项目中的 `mian.js` 里面定义了，官网自动聚焦的例子：

  ```js
  // 注册一个全局自定义指令 `v-focus`
  Vue.directive(`focus` {
    // 当被绑定的元素插入到 DOM 中时
    inserted: function (el) {
      // 聚焦元素
      el.focus()
    }
  })
  ```

- 如果你只是想定义一个局部的指令在某个组件内部中使用的话，就要在相应的组件内定义了

  ```js
  // 跟 data (), methods: {} 那些同级写了
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
      }
    }
  }
  ```

定义完之后我们就可以立即食用了：

```vue
<input v-foucs>
```

### 1.3 钩子函数

当然这个自定义指令不会只有这么一点点东西，为了解决一些现实中的场景，Vue 给我们的一堆钩子函数用来实现我们的一些骚操作，具体如下（均为可选）：

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置