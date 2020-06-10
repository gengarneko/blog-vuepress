---
title: 网络模型与TCP协议
date: 2020-01-03
categories:
 - backEnd
tags:
 - http
---

通过本章你能学到

1. 图解 HTTP第一章解读、URI 与 URL 的区别
2. OSI 的 7 层模型和 TCP/IP 4层模型是什么
3. 理解应用层协议是什么
4. 理解传输层协议是什么
5. 理解 TCP 协议的三步握手流程
6. 理解 TCP 协议的四步挥手流程



以图解 HTTP 导读做成一个系列，将这本书大致过一遍，难点单独挑出来。

面试文章：

​	https://xiedaimala.com/bbs/topics/74#/



## 什么是 web？

我们打开一个网站，一个是客户端，一个是服务器。客户端并不都是浏览器，还有 app、微信什么的。

我们输入一个 url，然后展现页面加载数据，这里面遵循了什么样的协议呢？就是 HTTP。



## HTTP 版本

最早的正式版本就是 1.0，主流的是 1.1，以后还有 2.0



## TCP / IP

> 重点，下一章



## URL 和 URI

URI（Uniform Resource Identifier）统一资源标志符

![1550289588835.png](https://i.loli.net/2020/06/10/AIeMf3Txt1bRGa8.png)

URL（Uniform Resource Locator）统一资源定位符

URI 相比于 URL 概念更加的宽泛，比如它可以定位到 FTP 上的资源、邮件资源、电话，已经超出了网页的范畴。





## TCP/IP 四层模型

- 什么是 OSI 七层模型
- 什么是 TCP/IP 四层模型
- 应用层和传输层有哪些协议？
- 如何理解 TCP/IP 四层模型？



## OSI 模型 

### [wiki](https://zh.wikipedia.org/wiki/OSI%E6%A8%A1%E5%9E%8B)

开放式系统互联通信参考模型（Open System Interconnection Reference Model，缩写 OSI），简称 OSI 模型。

由国际标准化组织于 1984 年提出。、

### 应用层

Application Layer，提供为应用软件而设的接口，以设置与另一应用软件之间的通信。

例如：HTTP、HTTPS、FTP、TELNET、SSH、SMTP、POP3 等。

### 表示层

Presentation Layer，把数据转换为能与接受者的系统格式兼容并适合传输的格式。

### 会话层

Session Layer，负责把在数据传输中设置和维护计算机网络中两台计算机之间的通信连接。

### 传输层

Transport Layer，把传输表头（TH）加至数据以形成数据包。传输表头包含了所使用的协议等发送信息。

例如：TCP、UDP 等。

### 网络层

Network Layer，决定数据的路径选择和转寄，将网络表头（NH）加至数据包，以形成分组。

网络表头包含了网络数据，例如：互联网协议（IP）等

### 数据链路层

Data Link Layer，负责网络寻址、错误侦测和改错。当表头和表尾被加至数据包时，会形成帧。

数据链表头（DLH）是包含了物理地址和错误侦测及改错的方法。

数据链表尾（DLT）是一串指示数据包末端的字符串。例如：以太网、无线局域网（Wi-Fi）和通用分组无线服务（GPRS）等

### 物理层

Physical Layer，在局部局域网上传送数据帧（data frame），它负责管理计算机通信设备和网络媒体之间的互通。

包括了针脚、电压、线缆规范、集线器、中继器、网卡、主机适配器等。



> 分成了这么多层，很多东西没什么用，分完了发现这一层的东西在另一层体现出来，比如表示层和会话层就被废弃了。



## TCP/IP 四层模型

> 一个故事：小白和小黑是两个家族的继承人，每年两家都会致信问候~
>
> **小白**
>
> 大家族规矩真多，开黑打个游戏写信还要写一堆敬语
>
> 尊敬的小黑：
>
> ​	代表我和我家向您和您的家族献上新年的问候。
>
> ​	春节来我家一起组队开黑。
>
> ​	......
>
> ​	您最诚挚的好友
>
> ​	小白
>
> **管家A**
>
> 大家族需要有大家族的规矩，我需要先给黑家的管家B通通气。
>
> A：我们家要给你们家发信了，收到请回答。
>
> B：收到，你发吧，收到请回答。
>
> A：收到
>
> 对了，黑家门牌号是多少，需要写在信封上。
>
> **邮差**
>
> 黑家的地址和小区名是多少？我写信封上。
>
> **邮筒**
>
> 信封的尺寸不能超过 7 存，大了放不进去，另外别忘了贴邮票。



从上面的故事中可以看到通信是很规范正式的，需要遵循一定的格式和规矩（尊敬的xxx........最诚挚的xxx）

当然对方收到信之后也会有正式的信回复过来。

之后，小白少爷只负责写信，表达他邀请的意思，后面的琐事（发信）交给管家。

管家不是直接发信的，需要先联系对方家族，万一对方没信了呢？是吧？（比如灭门了）所以需要发消息并收到回信。

然后对方门牌号什么的需要管家写到信封上，之后的事情交给邮差。

邮差就需要填写对方的详细地址比如小区名字什么的。

最后邮差塞信到邮筒，当然信要有合适的大小。

最后最后，别忘了交网费，没通网你联系个锤子。



### 应用层

> 写信人层，规范小白写信内容，只负责数据内容。

应用层是大多数普通与网络相关的程序为了通过网络与其他程序通信所使用的层。这个层的处理过程是应用特有的；

数据从网络相关的程序以这种应用内部使用的格式进行传送，然后被编码成标准协议的格式。

每一个应用层协议一般都会使用到传输层协议 TCP 和 UDP 协议之一：

运行在 TCP 协议上的协议：

1. HTTP（80 端口），主要用于普通浏览。
2. HTTPS（443 端口），HTTP 协议的安全版本。
3. FTP（20 和 21 端口），由名知义，用于文件传输。
4. POP3（110 端口），收邮件用。
5. SMTP（25 端口），用来发送电子邮件。
6. SSH（22 端口），用于加密安全登陆用。

运行在 UDP 协议上的协议：

1. DHCP（67 端口，动态主机配置协议），动态配置 IP 地址。

其他：

1. DNS（Domain Name Service，域名服务），用于完成地址查找，邮件转发等工作（运行在 TCP 和 UDP 协议上）。
2. SNMP（Simple Network Management Protocol，简单网络管理协议），用于网络信息的收集和网络管理。
3. ARP（Address Resolution Protocol，地址解析协议），用于动态解析以太网硬件的地址。



### 传输层

> 管家层，接收规范好的内容，确定能够可靠地抵达对方。添加门牌号（端口号）
>
> 继承人发给对方继承人的信，你不能发给佣人是吧，所以要确定端口号。

解决诸如端到端的可靠性（数据是否已经达到目的地？）保证数据按照正确的顺序到达这样的问题。TCP、UDP 都是传输层协议。



### 网络层

> 邮差，知道这封信发给谁，加上 IP 地址，就可以寄信了。

解决在一个单一网络上传输数据包的问题，IP 协议是网络层协议。



### 数据链路层

> 底层和网络发送数据相关的东西。0101010 这种数据流。

它是数据包从一个设备的网络层传输到另外一个设备的网络层的方法。这个过程能够在网卡的软件驱动程序中控制或者专用芯片中控制。这将完成如添加报头准备发送、通过实体介质实际发送这样一些数据链路功能。另一端，链路层将完成数据帧接收、去除报头并且将接收到的包传到网络层。



## 总结

为什么要分层？因为这样逻辑分层使得传输过程更加清晰了起来。

比如写一个应用的时候或者使用 HTTP 协议处理数据的时候，就不需要再去关注数据到底能不能发成功，发给谁。只需要将信的格式规范好，双方的管家是不需要作为家族继承人的你去关注的，这就是分层的好处~



## 简单理解应用层协议 HTTP

我们回顾上一个例子：小白写信需要遵循一定的规范格式，而这个规范就可以想象为 HTTP。

而实际传输中，我们可以刷新 [饥人谷](https://xiedaimala.com/tasks/b87728c0-58d8-40eb-aab8-f2c29961a2c8/text_tutorials/221e8b04-f4b6-4299-8aa2-7b9a17b54186) 拿取到以下一个简单的例子：

**request headers：**

```http
GET /tasks/b87728c0-58d8-40eb-aab8-f2c29961a2c8/text_tutorials/221e8b04-f4b6-4299-8aa2-7b9a17b54186 HTTP/1.1
Host: xiedaimala.com
Connection: keep-alive
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
Referer: https://xiedaimala.com/tasks/b87728c0-58d8-40eb-aab8-f2c29961a2c8/text_tutorials/60eff4b0-1d37-40c9-9a9e-c8a254bbaa0c
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cookie: UM_distinctid=168f3cb8745414-06892b2f62b01d-5d1f3b1c-1fa400-168f3cb874651c; CNZZDATA1271340636=980127574-1550278224-https%253A%252F%252Fwww.google.com%252F%7C1550311550; _task_center_session=RXVwWXpDMUFENzhsQjZqZTF0RC9kNmI2bW1DWnZ1MDMvRnFHVHQyQkd2Uk1OMkFzTWUvSzlkSFMybENBaWVYc0M5cHc0bWhRZUFQZ3dwRzFvUlI3eVJmcWpIbFFWR0FleXViTVErdmFEa2ppY3g4ajhEeGZlUWVmRDlKWkRPT3JRTTdnREZTRlpGQzdHZjRjTGZZSVdBPT0tLTB5ZzFodkY2U3hkWUhOUDdCT21TeHc9PQ%3D%3D--52762417707683076689780bae9661af28c6447b
```

**response headers：**

```http
HTTP/1.1 200 OK
Server: nginx/1.4.6 (Ubuntu)
Date: Sat, 16 Feb 2019 11:01:30 GMT
Content-Type: text/html; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
Cache-Control: max-age=0, private, must-revalidate
Set-Cookie: _task_center_session=b2srNjd3TzZTM01OeU9LS2R3R0hKUXNQemhmUjhHOXFMTWZqWkMxY3gwVUZVSWdzaWxmNHFLMDVLcHhQUUtzODlRZ1FEemZERVZOWVR6dGJjUWNSNnZmd2VYdHQrODF0R3Vvc0o1WUN2WGpwL041WTcxL3JNTjZzTCtuSE1BeDNzK2Q2dzUvcENJVEtDT2VQYTIyY3JnPT0tLXB6SXM1bXpkL3ZlajBRb2kxcjVBNlE9PQ%3D%3D--e2cb4f7d469e57199d2ff0bf2d229611a3a41fc0; path=/; secure; HttpOnly
X-Request-Id: ab98a47c-0800-4c2a-9ad2-cd2948d14ab5
X-Runtime: 0.085876
Strict-Transport-Security: max-age=15552000; includeSubDomains
Strict-Transport-Security: max-age=15768000
Content-Encoding: gzip
```

以上的内容就好像我们故事中的信一样，request 是发出去的信，response 是回复的信。

请求有请求的规矩，响应有响应的规矩，HTTP 就是请求与响应的规矩。

不遵循 HTTP 规矩的请求与响应就会处理报错。

不遵循规范的书信，emmmm，会被以为是假信扔掉，因为豪门子弟不会那么粗俗。



## TCP 三步握手和四步挥手

- 什么是 TCP 协议的三步握手？
- 什么是 TCP 协议多的四步挥手？
- 为什么握手要三步，挥手却是四步？



## 关于 TCP 协议

TCP（Transmission Control Protocol，传输控制协议）是一种面向连接的、**可靠的**、基于字节流的**传输层**通信协议。与之对应的是 UDP（User Datagram Protocol，用户数据报协议），是**不可靠**的传输协议。



## 三步握手

可以想象两人用对讲机交谈。

A：我准备好了你准备好了吗，收到请回答。
B：收到收到，我也准备好了，收到请回答。
A：收到收到

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfmi14oscqj30hf0bgaaw.jpg)

SYN 将每个询问加上一个序号，确保每次询问都能区别开来。

ACK 就是回答的序号。

1. 客户端发送 SYN报文给服务器端，序列号是n，进入 SYN_SEND 状态。
2. 服务器端收到 SYN 报文，回应一个ACK（序列号是n+1）同时发一个 SYN （序列号是m），进入 SYN_RECV 状态。
3. 客户端收到服务器端的 SYN 报文，回应一个 ACK(序列号是m+1）报文，进入 Established 状态。



## 四步挥手



![img](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfmi1yjkvuj30hr0djdh5.jpg)



1. 客户端发送一个 FIN ，告诉服务器想关闭连接。
2. 服务器收到这个 FIN ，发回一个 ACK。
3. 服务器通知应用程序关闭网络连接，应用程序关闭后通知服务器。服务器发送一个 FIN 给客户端 。
4. 客户端发回 ACK 报文确认。

## 为什么挥手要四步

这是因为服务端的 LISTEN 状态下的 SOCKET 当收到客户端建立连接请求的SYN 报文后，它可以把 ACK 和 SYN （ ACK 起应答作用，而 SYN 起同步作用）放在一个报文里来发送。但关闭连接时，当服务器收到客户端的 FIN 报文通知时，服务器只能发一个回应报文ACK：“哦，我知道了”，然后通知应用程序。应用程序完成全部数据发送并确定可以终止了，服务器才能发送FIN告诉客户端可以真正断开连接了。所以这一步ACK报文和FIN报文需要分开发送，因此多了一个步骤。



## TCP 报文格式

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfmi29wzlkj30il0cvt9w.jpg)

- ACK ： TCP协议规定，只有ACK=1时有效，也规定连接建立后所有发送的报文的ACK必须为1。
- SYN(SYNchronization) ： 在连接建立时用来同步序号。当SYN=1而ACK=0时，表明这是一个连接请求报文。对方若同意建立连接，则应在响应报文中使SYN=1和ACK=1. 因此, SYN置1就表示这是一个连接请求或连接接受报文。
- FIN （finis）即完，终结的意思， 用来释放一个连接。当 FIN = 1 时，表明此报文段的发送方的数据已经发送完毕，并要求释放连接。



## UDP

UDP 是不可靠的传输，没这么多花里花哨的，直接发送出去就行了。

