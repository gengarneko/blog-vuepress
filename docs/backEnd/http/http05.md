---
title: HTTP 状态码
date: 2020-02-07
categories:
 - backEnd
tags:
 - http
---

HTTP 状态码负责表示客户端 HTTP 请求的返回结果、标记服务器端 的处理是否正常、通知出现的错误等工作。

![1550479949910](/Users/xu/Code/Notes/0写代码啦笔记/深入浅出-HTTP/3-报文、抓包、状态码/3-HTTP 状态码.assets/1550479949910.png)

### 200 OK

表示从客户端发来的请求在服务器端被正常处理了。

### 204 No Content

该状态码代表服务器接收的请求已成功处理，但在返回的响应报文中 不含实体的主体部分。另外，也不允许返回任何实体的主体。比如， 当从浏览器发出请求处理后，返回 204 响应，那么浏览器显示的页面 不发生更新。

### 206 Partial Content

该状态码表示客户端进行了范围请求，而服务器成功执行了这部分的 GET 请求。响应报文中包含由 Content-Range 指定范围的实体内容。

### 3XX

3XX 响应结果表明浏览器需要执行某些特殊的处理以正确处理请 求。

### 301 Moved Permanently

永久性重定向。该状态码表示请求的资源已被分配了新的 URI，以后 应使用资源现在所指的 URI。

比如我们换了个域名，访问旧的 url 就知道会重定向到新的地址。

### 302 Found

临时性重定向。该状态码表示请求的资源已被分配了新的 URI，希望 用户（本次）能使用新的 URI 访问。

浏览器会永远记得 301 但是不会记得 302.

### 303 See Other

该状态码表示由于请求对应的资源存在着另一个 URI，应使用 GET 方法定向获取请求的资源。

用的比较少。

### 304 Not Modified

缓存，我们以后讲。

### 307 Temporary Redirect

临时重定向。该状态码与 302 Found 有着相同的含义。尽管 302 标准禁止 POST 变换成 GET，但实际使用时大家并不遵守。

307 会遵照浏览器标准，不会从 POST 变成 GET。但是，对于处理响 应时的行为，每种浏览器有可能出现不同的情况。

### 400 Bad Request

该状态码表示请求报文中存在语法错误。当错误发生时，需修改请求 的内容后再次发送请求。另外，浏览器会像 200 OK 一样对待该状态 码。

### 401 Unauthorized

未授权的，没有相应的权限服务器会报相关错误。

### 403 Forbidden

该状态码表明对请求资源的访问被服务器拒绝了。

### 404 Not Found

该状态码表明服务器上无法找到请求的资源。除此之外，也可以在服 务器端拒绝请求且不想说明理由时使用。

### 500 Internal Server Error

该状态码表明服务器端在执行请求时发生了错误。也有可能是 Web 应用存在的 bug 或某些临时的故障。

### 503 Service Unavailable

该状态码表明服务器暂时处于超负载或正在进行停机维护，现在无法 处理请求。如果事先得知解除以上状况需要的时间，最好写入 RetryAfter 首部字段再返回给客户端。



## 使用 Node.js 体验 HTTP

我们新建一个 `server.js` 并在其中输入：

```js
let http = require('http')

let server = http.createServer(function(req, res) {
  console.log(req)
  res.end('hello')
})
server.listen(3000)

```

在 git 中输入：

```bash
node server.js
```

我们输入 `url`：

```http
localhost:3000
```

相当于发送到当前机器的 3000 端口上，在页面中看到：

```html
hello
```



### 我们设置响应体验 200：

```js
let http = require('http')

let server = http.createServer(function(req, res) {
  console.log(req)
  console.log(req.header)
  console.log(req.url)
  res.statusCode = 200
  res.statusMessage = 'jirengu'
  res.setHeader('name', 'jirengu')
  res.end('hello')
})
server.listen(3000)

```

我们可以看到响应报文：

```http
HTTP/1.1 200 jirengu
name: jirengu
Date: Wed, 20 Feb 2019 00:46:53 GMT
Connection: keep-alive
Content-Length: 5
```

如果我们不写原因，就会返回 200 OK。



### 现在我们要体验 204：

```js
let http = require('http')

let server = http.createServer(function(req, res) {
  // console.log(req)
  // console.log(req.header)
  // console.log(req.url)
  res.statusCode = 204
  // res.statusMessage = 'jirengu'
  res.setHeader('name', 'jirengu')
  res.end('hello')
})
server.listen(3000)

```

我们在浏览器中查看：

```http
HTTP/1.1 204 No Content
name: jirengu
Date: Wed, 20 Feb 2019 00:51:25 GMT
Connection: keep-alive
```

这个响应本身就是不发送内容的，服务器接受请求后进行处理就完毕了。



### 我们来体验 302：

```js
let http = require('http')

let server = http.createServer(function(req, res) {
  res.statusCode = 302
  res.setHeader('location', 'https://jirengu.com')
  res.end('hello')
})
server.listen(3000)

```

然后我们重启 bash 进行 `node server.js`，我们会重定向到指定页面。

```http
HTTP/1.1 302 Found
location: https://jirengu.com
Date: Wed, 20 Feb 2019 01:20:17 GMT
Connection: keep-alive
Content-Length: 5
```

浏览器拿到 location 之后会立即跳转~



### 体验 301：

大致过程和 302 相似，但是即使 ctrl + c 断开服务器，仍然会跳转到目标页面。



### 体验 404：

```http
HTTP/1.1 404 Not Found
Date: Wed, 20 Feb 2019 02:08:24 GMT
Connection: keep-alive
Content-Length: 5
```

我们发现是 not found，但是依然可以看到内容，这是为什么呢？

因为连接服务器后，状态码是 404，但是服务器已经接收到请求并渲染到页面，只不过告诉用户没找到而已。



### 体验 500 等等：

同上~



### 附加：

```js
let http = require('http')

let server = http.createServer(function(req, res) {
  res.statusCode = 500
  // res.setHeader('location', 'https://jirengu.com')
  res.end('<h1>hello</h1>')
})
server.listen(3000)

```

我们会在浏览器上看到渲染后的标题页面，而不是我们想要的字符串。

 request 中有这么一行代码，会让浏览器按照 html 的格式渲染：

```http
Content-Type: text/html; charset=utf-8
```

我们换一下：

```js
let http = require('http')

let server = http.createServer(function(req, res) {
  res.statusCode = 500
  // res.setHeader('location', 'https://jirengu.com')
  res.setHeader('Content-type', 'text/plain; charset=utf-8')
  res.end('<h1>hello</h1>')
})
server.listen(3000)

```

这样子就会得到我们想要的：

```html
<h1>hello</h1>
```

这句话意思就是告诉浏览器将响应当作字符串去处理。



然后编码类型：

```http
Content-type: application-x-www-frorm-urlencoded
```

服务器得到这个格式就能进行相应的格式进行解析。