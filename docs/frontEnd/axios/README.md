---
title: Axios 参数传递格式
date: 2020-07-22
categories:
 - http
 - 建造中
tags:
 - axios
sidebarDepth: 6
---
axios 索引，便于查找 axios 代码块
<!-- more -->

- axios.request(config)
- axios.get(url[, config])
- axios.delete(url[, config])
- axios.head(url[, config])
- axios.post(url[, data[, config]])
- axios.put(url[, data[, config]])
- axios.patch(url[, data[, config]])

## `axios.request(config)`

```js
//原始的Axios请求方式
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  },
  timeout: 1000,
  ...//其他相关配置
});
```



## `axios.get(url[, config])`

```js
axios.get('demo/url', {
    params: {
        id: 123,
        name: 'Henry',
    },
   timeout: 1000,
  ...//其他相关配置
})
```



## `axios.delete(url[, config])`

```js
//如果服务端将参数作为java对象来封装接受
axios.delete('demo/url', {
    data: {
        id: 123,
        name: 'Henry',
    },
     timeout: 1000,
    ...//其他相关配置
})
//如果服务端将参数作为url参数来接受，则请求的url为:www.demo/url?a=1&b=2形式
axios.delete('demo/url', {
    params: {
        id: 123,
        name: 'Henry',
    },
     timeout: 1000,
    ...//其他相关配置
})
```



## `axios.post(url[, data[, config]])`

```js
axios.post('demo/url', {
    id: 123,
    name: 'Henry',
},{
   timeout: 1000,
    ...//其他相关配置
})
```



## `axios.put(url[, data[, config]])`

```js
axios.put('demo/url', {
    id: 123,
    name: 'Henry',
},{
   timeout: 1000,
    ...//其他相关配置
})
```



## `axios.patch(url[, data[, config]])`

```js
axios.patch('demo/url', {
    id: 123,
    name: 'Henry',
},{
   timeout: 1000,
    ...//其他相关配置
})
```





