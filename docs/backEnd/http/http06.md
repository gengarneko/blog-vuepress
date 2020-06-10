---
title: HTTP 缓存控制原理
date: 2020-02-14
categories:
 - backEnd
tags:
 - http
---

## 阶段 1，无缓存

浏览器请求资源 

——> 服务器找到资源并返回 

——> 再次请求 

——> 再次查找返回

- 优点：简单明了
- 缺点：浪费资源带宽



## 阶段 2，有缓存，无更新

请求新的资源 

——> 发送完整文件 

——> 文件缓存到本地 

——> 再次请求 

——> 从本地获取

- 优点：节省带宽
- 缺点：目标资源如果变动，无法检测更新



## 阶段 3，缓存 + 更新机制 1.0

请求新的资源

 ——> 发送完整文件 + 额外信息（过期时间） Expires: **Mon,10 Dec 1990 02:25:22GMT**

——> 文件 + 信息保存到本地 

——> 再次请求 

——> 时间信息判断 

——> 本地获取/重新发送

- 优点：缓存可控制
- 缺点：控制功能太单一：格式事件容易写错



## 阶段 4，缓存 + 更新机制 2.0

请求新的资源的时候，服务器会发送完整的文件并附带额外信息：

```
Cache-Control: max-age=300;
```

再次请求时，如果是在 300 秒内发起的请求，直接使用缓存 ( 200, from xx cache )，否则重新发起网络请求 (200)。下面是Cache-Control常见的几个值：

- Public表示响应可被任何中间节点缓存，如 Browser <-- proxy1 <-- proxy2 <-- Server，中间的proxy可以缓存资源，比如下次再请求同一资源proxy1直接把自己缓存的东西给 Browser 而不再向proxy2要。
- Private表示中间节点不允许缓存，对于Browser <-- proxy1 <-- proxy2 <-- Server，proxy 会老老实实把Server 返回的数据发送给proxy1,自己不缓存任何数据。当下次Browser再次请求时proxy会做好请求转发而不是自作主张给自己缓存的数据。
- no-cache 表示不使用 Cache-Control 的缓存控制方式做前置验证，而是使用 Etag 或 Last-Modified字段来控制缓存
- no-store，真正的不缓存任何东西。浏览器会直接向服务器请求原始文件，并且请求中不附带 Etag 参数（服务器认为是新请求）。
- max-age，表示当前资源的有效时间，单位为秒。

总结：

- 优点：缓存控制功能更强大
- 缺点：假如超过了 max-age 但是文件并没有被修改，就会浪费带宽。



## 阶段 5，缓存 + 更新机制威力加强版

首次请求文件，返回的附带信息中 Etag 是对文件的编码，如果在服务器端此文件未被修改，此值就不会更改。

```http
Cache-Control: max-age=300；
ETag:W/"e-cbxLFQW5zapn79tQwb/g6Q"
```

浏览器将文件 + 额外信息保存到本地

——> / 300s 内再需要获取此资源，直接读取缓存

​           / 300s 后再次需要获取此资源，发送请求 + Etag

——> 服务器拿到 Etag 并进行比对，相等则返回短消息，不等则返回更新后的资源



和 Etag 类似功能的是 Last-Modified/If-Modified-Since。资源过期的时候，发现具有 Last-Modified 声明，则再次向服务器请求时带上头 If-Modified-Since，表示上次服务器告知的文件修改的时间。服务器收到请求后发现有头 If-Modified-Since 则与被请求资源的最后修改时间进行比对。若最后修改时间较新，说明资源又被改动过，则响应整片资源内容（200）；若最后修改时间较旧，说明资源无新修改，则响应HTTP 304 ，告知浏览器继续使用所保存的cache。



## 浏览器视角

浏览器在请求已经访问过的URL的时候，会判断是否使用缓存,。

判断是否使用缓存，主要通过判断缓存是否在**有效期**内, 通过两个字段来判断：

1. **Expires**，有效期，返回的是一个GMT时间，但是使用的是**客户端时间**，与服务器时间存在一定时间差。
2. **Cache-Control => max-age**，最大有效时间，单位是s，优先级比 expires 高，为了解决 expires 时间差的问题而出现的。

缓存过期后，浏览器不会直接去服务器上拿缓存，而是判断缓存是否有更新，能否继续使用，判断的方法有两种：

1. **Last-Modified / If-Modified-Since**：服务器会响应一个Last-Modified 字段，表示最近一次修改缓存的时间，当缓存过期后，浏览器就会把这个时间放在 If-Modified-Since 去请求服务器，判断缓存是否有更新。
2. **Etag / If-None-Match**：服务器会响应一个 Etag 字段，一个表示文件唯一的字符串, 一旦文件更新，Etag也会跟着更改；缓存过期后，浏览器会把这个字符串放在 If-None-Match 去请求服务器，判断是否有更新，Etag的优先级比Last-Modified 的更高, Etag 的出现, 是为了解决一个缓存文件在短时间内被多次修改的问题, 因为 Last-Modified 只能精确到秒。



## 强缓存和协商缓存

浏览器缓存控制分为强缓存和协商缓存，协商缓存必须配合强缓存使用。

首先浏览器第一次跟服务器请求一个资源，服务器在返回这个资源和response header的同时，会根据开发者要求或者浏览器默认，在response的header加上相关字段的http response header。

1. 当浏览器对某个资源的请求命中了强缓存时，利用[Expires]或者[Cache-Control]这两个http response header实现

   1.  [Expires]：描述的是一个绝对时间，根据的是客户端时间。用GMT格式的字符串表示，如：Expires:Thu, 31 Dec 2037 23:55:55 GMT 下次浏览器再次请求同一资源时。先从客户端缓存中寻找，找到这个资源后，拿出它的[Expires]跟当前的请求时间比较。如果请求时间在[Expires]指定的失效时间之前，就能命中缓存，这样就不用再次到服务器上去缓存一遍，节省了资源。但是正因为是绝对时间，如果客户端时间被随意更改下，这个机制就失效了。所以我们需要[Cache-Control]。
   2.  [Cache-Control]：描述的是一个相对时间，在进行缓存命中时，都是利用浏览器时间判断。

   > 这两个header可以只启用一个，也可以同时启用，当response header中，[Expires]和[Cache-Control]同时存在时，[Cache-Control]优先级高于[Expires]。

2. 当浏览器对某个资源的请求没有命中强缓存，就会发一个请求到服务器，验证协商缓存是否命中。如果命中，则还是从客户端缓存中加载。协商缓存利用的是[Last-Modified，If-Modified-Since]和[ETag、If-None-Match]这两对Header来管理的。

   1. [Last-Modified]：原理和上面的[expires]相同，区别是它是根据服务器时间返回的header来判断缓存是否存在。但是有时候也会服务器上资源其实有变化，但是最后修改时间却没有变化的情况（这种问题也不容易被定位），这时候我们需要[ETag、If-None-Match]。
   2. [ETag、If-None-Match]：原理与上相同，区别是浏览器跟服务器请求一个资源，服务器在返回这个资源的同时，在respone的header加上ETag的header，这个header是服务器根据当前请求的资源生成的一个唯一标识，这个唯一标识是一个字符串，只要资源有变化这个串就不同。

   > [ETag、If-None-Match]这么厉害我们为什么还需要[Last-Modified、If-Modified-Since]呢？有一个例子就是分布式系统尽量关闭掉ETag(每台机器生成的ETag都会不一样）

   > [Last-Modified，If-Modified-Since]和[ETag、If-None-Match]一般都是同时启用。