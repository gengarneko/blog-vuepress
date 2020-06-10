---
title: RESTful API
date: 2020-01-24
categories:
 - backEnd
tags:
 - http
---

> REST 是表现层状态装换 *REpresentational State Transfer* 的缩写，表示一种应用之间网络通信的架构风格，依赖于无状态的协议（通常是HTTP）进行交互。

API 设计规范，HTTP 方法与对应数据库增删改查对应。

- GET：读取（Read）
- POST：新建（Create）
- PUT：更新（Update）
- PATCH：更新（Update），通常是部分更新
- DELETE：删除（Delete）

范例

- GET /books , 列出所有的图书
- POST /books , 创建一本图书
- PUT /books, 批量更新图书信息
- DELETE /books, 删除所有图书
- GET /books/10， 获取10号图书详细信息
- PUT /books/10， 更新10号图书
- PATCH /books/10， 更新10号图书
- DELETE /books/10, 删除10号图书



## PUT 和 PATCH 有什么区别？

对于

```sql
{
    "username": "hunger"
    "email": "hunger@jirengu.com" 
}
```

 PUT修改参数，需包含全部参数

```sql
{
    "username": "hunger"
    "email": "hunger@vip.qq.com" 
}
```

PATCH修改传参，只需要传递需要修改的参数

```sql
{
    "email": "hunger@vip.qq.com" 
}
```

另外推荐在URL中强制加入版本号，如

```http
GET /v1/books
```



## Form 表单支持哪些方法？

form表单只支持 post 和get。但是可以通过变通的方法，让服务器知道你本意是想做什么。

```html
<form action="/books" method="POST">
    <input type="hidden" name="_method" value="PUT">
</form>
```

发 ajax 的时候，都可以使用~



## 参考

- [Learn REST: A RESTful Tutorial](