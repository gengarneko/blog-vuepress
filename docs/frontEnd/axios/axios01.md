---
title: React 中封装 axios
date: 2020-08-13
categories:
 - http
 - react
tags:
 - axios
sidebarDepth: 6
---
react 中封装 axios 的实践方式，供参考（直接抄）
后续可能转向 react swr 的研究，但是不妨碍 axios 是运用最广泛的 promise 库之一
<!-- more -->
## axios

Promise based HTTP client for the browser and node.js

github：https://github.com/axios/axios

## 常用场景

1. 对特定的状态码，进行特殊处理（如 4xx 状态码，统一重定向到 404 页面）；
2. get 请求封装；
3. post 请求封装；
4. 返回数据 json 中的特定 code，作统一处理（如后端接口定义 220 - 300的状态码，对返回文案需要统一进行弹框提示）；
5. 单页面的多接口的并发请求（await 导致的多余等待）；

## 封装方案

### 预备工作

1. 能够实现全局的开始 loading、结束 loading、文案弹框的基本组件或方案（可以使用 redux 实现全局通用组件的控制和页面缓存的使用）
2. ES6 语法，支持 Promise、async、await 基本异步操作

### 方法说明

1. `proxyUtil` 该对象提供一系列操作 redux 中 store 的数据方法，用来做全局组件的控制
2. `proxyUtil.startLoading()` 显示「加载中」图标
3. `proxyUtil.endLoading()` 关闭「加载中」图标
4. `proxyUtil.alertMessage(message: string)` 全局文字提示弹框

## 请求之前

一般接口都会携带鉴权认证（token）之类的，因此在接口的请求头里面，我们需要带上 token 值以通过服务器的鉴权认证。但是如果每次请求的时候再去添加，不仅会大大地加大工作量，而且容易出错。我们可以通过 axios 的请求拦截机制，在每次请求的拦截器中添加 token

```js
// 请求拦截
axios.interceptors.request.use((config) => {
  //....省略代码
  config.headers.x_access_token = token
  return config
}, function (err) {
  return Promise.reject(err)
})
```

请求拦截器中，除了处理添加token以外，还可以进行一些其他的处理，具体的根据实际需求进行处理

## 响应之后

请求接口，并不是每一次请求都会成功，我们可以选择每次请求的时候处理，也可以封装 axios 统一处理（有时间有追求就选择后者吧）

```js
// 响应拦截
axios.interceptors.response.use(function (response) {
  if (response.data.code === 401 ) {//用户token失效
    //清空用户信息
    sessionStorage.user = ''
    sessionStorage.token = ''
    window.location.href = '/';//返回登录页
    return Promise.reject(msg)//接口Promise返回错误状态，错误信息msg可有后端返回，也可以我们自己定义一个码--信息的关系。
  }
  if(response.status!==200||response.data.code!==200){//接口请求失败，具体根据实际情况判断
    message.error(msg);//提示错误信息
    return Promise.reject(msg)//接口Promise返回错误状态
  }
  return response
}, function (error) {
  if (axios.isCancel(error)) {
    requestList.length = 0
    // store.dispatch('changeGlobalState', {loading: false})
    throw new axios.Cancel('cancel request')
  } else {
    message.error('网络请求失败,请重试')
  }
  return Promise.reject(error)
})
```

## 使用 axios

```js
# 执行get请求

axios.get('url',{
  params:{},//接口参数
}).then(function(res){
  console.log(res);//处理成功的函数 相当于success
}).catch(function(error){
  console.log(error)//错误处理 相当于error
})
```

```js
# 执行post请求

axios.post('url',{
  data:xxx//参数
  },{
  headers:xxxx,//请求头信息
}).then(function(res){
  console.log(res);//处理成功的函数 相当于success
}).catch(function(error){
  console.log(error)//错误处理 相当于error
})
```

```js
# axios API 通过相关配置传递给axios完成请求

axios({
  method:'delete',
  url:'xxx',
  cache:false,
  params:{id:123},
  headers:xxx,
})
//------------------------------------------//
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'monkey',
    lastName: 'soft'
  }
});
```

直接使用api的方式虽然简单，但是不同请求参数的名字不一样，在实际开发过程中很容易写错或者忽略，容易为开发造成不必要的时间损失。前面两种方式虽然没有参数不一致的问题，但是使用时候过于麻烦，该怎么解决呢？

我们可以根据前两者的相似之处进行封装：

```js
/*
*url:请求的url
*params:请求的参数
*config:请求时的header信息
*method:请求方法
*/
const request = function ({ url, params, config, method }) {
  // 如果是get请求 需要拼接参数
  let str = ''
  if (method === 'get' && params) {
    Object.keys(params).forEach(item => {
      str += `${item}=${params[item]}&`
    })
  }
  return new Promise((resolve, reject) => {
    axios[method](str ? (url + '?' + str.substring(0, str.length - 1)) : url, params, Object.assign({}, config)).then(response => {
      resolve(response.data)
    }, err => {
      if (err.Cancel) {
      } else {
        reject(err)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
```

这样我们需要接口请求的时候，直接调用该函数就好了。不管什么方式请求，传参方式都一样。

## 详细代码

### 特定请求码，进行特殊处理

```js
import * as axios from 'axios'
// 全局设定请求类型
axios.default.headers.post['Content-Type'] = 'application/json'
// 根据 axios api，对请求返回做拦截处理
axios.interceptors.response.use((res) => {
  if(response.status >= 400 && response.status < 500) {
    // 对返回状态码为 4xx 的请求同意处理
    // 此处同意跳转 404 页面
    window.location.href = decodeURI(`${window.location.protocol}//${window.location.host}/404.html`)
  } else {
    return response
  }
}, (error) => {
  proxyUtil.alertMessage(error)
})
```

### get 请求封装

```js
export const pget = (url, params = ()) => {
  // 开始 loading
  proxyUtil.startLoading()
  return axios.get(url, {
    params: params,
    validateStatus: function (status) {
      // 只有返回 code 为 2xx 才被正常返回（resolve），非 2xx 全部当做异常（reject）
      return status >= 200 && status < 300
    }
  }).then((res) => {
    // 结束 loading
    proxyUtil.endLoading()
    // 返回后端数据
    return res.data
  }).catch((error) => {
    proxyUtil.endLoading()
    proxyUtil.alertMessage(error)
  })
}
```

### post 请求封装

```js
export const ppot = (url, params = ()) => {
  // 开始 loading
  proxyUtil.startLoading()
  return axios
    .post(url, params)
    .then((res) => {
    	// 结束 loading
    	proxyUtil.endLoading()
    	return res.data
  	})
  	.catch((err) => {
    	// 异常处理
    	proxyUtil.endLoading()
    	proxyUtil.alertMessage(err)
  	})
}
```

### 返回数据 JSON 中的 code 作统一处理

只需要在 `pget` 或者 `ppost` 总处理即可，以 pget 为例：

```js
export const pget = (url, params = ()) => {
  // 开始 loading
  proxyUtil.startLoading()
  return axios.get(url, {
    params: params,
    validateStatus: function (status) {
      // 只有返回 code 为 2xx 才被正常返回（resolve），非 2xx 全部当做异常（reject）
      return status >= 200 && status < 300
    }
  }).then((res) => {
    // 结束 loading
    proxyUtil.endLoading()
    // TODO 假定接口返回数据格式为 { code: 200, msg: "这是信息" }
    // 获取接口自定义 code
    let code = res.data.code
    // 获取接口返回 message，也可能是一个 object，一个数组
    let message = res.data.msg
    // 对于接口定义的特殊范围的 code，统一对返回的 message 作弹框处理
    if (code > 220 || code < 200) {
      proxyUtil.alertMessage(message.toString())
    }
    // 返回后端返回数据
    return res.data
  }).catch((err) => {
    // 异常处理
    proxyUtil.endLoading()
    proxyUtil.alertMessage(err)
  })
}
```

### 单页面的多接口并发请求（await 导致多余等待）

> 使用 `promise.all()` 处理多个请求

```js
export asyncAll = (requests = []) => {
  // 开始 loading
  proxyUtil.startLoading()
  // 使用 axios 的 all 方法
  return axios.all(requests).then(resultArr => {
    // 结束 loading
    proxyUtil.endLoading()
    // 对结果做特殊化处理，此处是对返回接口 code 在一定范围内作信息弹框
    for (let result of resultArr) {
      let code = result.code
      if (code > 220 || code < 200) {
        proxyUtil.alertMessage(result.msg)
      }
    }
    //  返回每个方法返回的接口数据
    return resultArr
  }).catch(error => {
    // 异常处理
    proxyUtil.endLoading()
    proxyUtil.alertMessage(error)
  })
}
```

#### 使用范例

假设存在两个接口请求 `getUserName()` 和 `getUserAge`，现在一个页面需要同时请求两个接口的数据，`await` 逐步等待明显浪费时间，所以我们可以采用以下写法：

```js
// 处理用户信息
async loadUserData() {
    let [nameObj, ageObj] = await asyncAll([getUserName(), getUserAge()])
    this.userInfo.name = nameObj.msg
    this.userInfo.age = ageObj.msg
    // react 此处更多是应该在得到数据处理完之后，setState({userName: nameObj.msg, userAge: ageObj.msg})
}
```

