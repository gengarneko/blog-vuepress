---
title: JS - 初探
date: 2019-09-20
categories:
 - frontEnd
tags:
 - js
---

## 做一个导航页面

参考一个并不好看的网站：http://www.36start.com/

1. 选择数据结构
2. 使用 JS 创建 HTML
3. 添加 CSS
4. 添加事件监听
5. 打开网站

代码和预览：https://hentai-miao.github.io/jirengu-assignments/2-18-%E7%AC%AC%E4%B8%80%E4%B8%AAJS%E4%BD%9C%E5%93%81/keyboard.html

注意：
代码中的 `return JSON.parse(localStorage.getItem(name) || '')`
要改成 `return JSON.parse(localStorage.getItem(name) || 'null')`



## http-server 的使用方法

1. 安装 node
2. npm i -g http-server
3. 进入项目目录
4. 运行 `http-server . -c-1` （一个字都不能错）
5. 用浏览器打开 `http://127.0.0.1:xxxx` （xxxx 是对应的端口号）
6. 如果发现页面不存在，就在地址栏后面加 /index.html ，变成 `http://127.0.0.1:xxxx/index.html`
7. （可选）打开开发者工具的 Network，勾选 Disable Cache



![Disable Cache](https://static.xiedaimala.com/xdml/image/3ac7c224-c23d-491f-84b5-4fabfbeab9b8/2018-8-11-15-3-59.png)Disable Cache