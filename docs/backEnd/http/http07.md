---
title: Node.js 实现静态服务器
date: 2020-02-21
categories:
 - backEnd
tags:
 - http
---

我们来写一个最简单的静态服务器：

```js
/* 一个最简单的静态服务器 */
/* 访问 http://localhost:8080/picture.jpg */

const http = require('http')
const fs = require('fs')
const path = require('path')


http.createServer((req, res) => {
  fs.readFile(path.join(__dirname, req.url), (err, data) => {
  	if (err) {
  		res.writeHead(404, 'not found')
  		res.end('Oh, Not Found')
  	} else {
      res.writeHead(200, 'OK')
			res.end(data)
			// res.end(req.url)
  	}
  })
}).listen(8000)
console.log('Visit http://localhost:8000' )

```

想要实现的功能：当用户输入地址时，读取当前文件夹的 index.html 文件。

使用 fs.readFile 方法读取文件

使用绝对路径 + req.url 构造最完整路径

​	如果不存在，写一个响应报文 404，返回一个错误提示信息字符串

​	如果存在，写一个响应报文 200，返回相应数据

我们使用 `node index.js` 进行启动之后，可以在浏览器中访问到对应的页面内容。



## Expires 和 pragma

```js
/*
  缓存的第一种方案，Http1.0时的产物，Expires字段表示过期截止日期,Pragma表示不用缓存
  范例：
  Expires: Wed, 23 Jan 2019 07:33:51 GMT
  Pragma: no-cache

  如果同时设置，Pragma的优先级高于Expires

  访问 http://localhost:8080/picture.jpg */

const http = require('http')
const fs = require('fs')
const path = require('path')


http.createServer((req, res) => {
	let filePath = path.join(__dirname, req.url)
  fs.readFile(filePath, (err, data) => {
  	if (err) {
  		res.writeHead(404, 'not found')
  		res.end('Oh, Not Found')
  	} else {

  		// example1
  		res.setHeader('Expires', 'Wed, 23 Jan 2019 07:40:51 GMT')


  		// example2
			//res.setHeader('Pragma', 'no-cache')

			// example3
			//res.setHeader('Expires', 'Wed, 23 Jan 2019 07:40:51 GMT')
			//res.setHeader('Pragma', 'no-cache')

			// example4
			let date = new Date(Date.now() + 1000*5).toGMTString()
			res.setHeader('Expires', date)

      res.writeHead(200, 'OK')
  		res.end(data)
  	}
  })
}).listen(8080)
console.log('Visit http://localhost:8080' )

```

我们可以看到响应的图片文件：

```http
Connection: keep-alive
Date: Wed, 20 Feb 2019 05:15:26 GMT
Expires: Wed, 20 Feb 2019 05:15:31 GMT
Transfer-Encoding: chunked
```

设置 Expires 之后我们可以在浏览器检查的 Network Size 中看到资源的来源是 memory cache 或者 disk cache



如果我们不走 Expires 而是 Pragma：

告诉浏览器不要走本地的缓存，而是走服务器。



## Cache Control 字段

```js
/*
  缓存的第二种方案,浏览器把文件和附带信息保存起来。当再次需要a.jpg 时，如果是在300秒以内发起的请求则直接使用缓存(200, from memory cache)，否则重新发起网络请求(200)。


  请求报文
    - Cache-Control: max-age=10 //hi,(代理)服务器我想要
    - Cache-Control: no-cache // hi,(代理)服务器，不要给我缓存的东西，我要新鲜完整的内容
    - Cache-Control: no-store // hi,(代理)服务器, 这是机密请求，别缓存数据，给我最新的
  响应报文
    - Cache-Control: max-age=10 //hi,浏览器，把这个文件信息保存起来。当再次需要它时，如果是在10秒以内发起的请求则直接使用缓存(200, from memory cache)，否则重新发起网络请求找我要(200)
    - Cache-Control: no-cache // hi,浏览器(代理服务器)，你可以缓存，但每次需要向我确认一下
    - Cache-Control: no-store // hi,浏览器（代理服务器），这是机密信息，别缓存

  访问 http://localhost:8080/index.html */

const http = require('http')
const fs = require('fs')
const path = require('path')


http.createServer((req, res) => {
	let filePath = path.join(__dirname, req.url)
  fs.readFile(filePath, (err, data) => {
  	if (err) {
  		res.writeHead(404, 'not found')
  		res.end('Oh, Not Found')
  	} else {

  		// example1
  		//res.setHeader('Cache-Control', 'max-age=10')

  		// example2
			//res.setHeader('Cache-Control', 'no-cache')

			// example3
			res.setHeader('Cache-Control', 'no-store')


      res.writeHead(200, 'OK')
  		res.end(data)
  	}
  })
}).listen(8080)
console.log('Visit http://localhost:8080' )

```



## Last-Modified 字段对缓存的控制

```js
const http = require('http')
const fs = require('fs')
const path = require('path')


http.createServer((req, res) => {
	let filePath = path.join(__dirname, req.url)
  fs.readFile(filePath, (err, data) => {
  	if (err) {
  		res.writeHead(404, 'not found')
  		res.end('Oh, Not Found')
  	} else {
      // example1
      // let stat = fs.statSync(filePath)
      // console.log(stat.mtime)
      // let modifyDate = new Date(Date.parse(stat.mtime)).toGMTString()
      // console.log(modifyDate)
      // res.setHeader('Last-Modified', modifyDate)
      // res.writeHead(200, 'OK')
      // res.end(data)


      //example2
      // console.log(req.headers)
      // let mtime = Date.parse(fs.statSync(filePath).mtime)
      // if(!req.headers['if-modified-since']) {
      //   res.setHeader('Last-Modified', new Date(mtime).toGMTString())
      //   res.writeHead(200, 'OK')
      //   res.end(data)        
      // }else {
      //   let oldMtime = Date.parse(req.headers['if-modified-since'])
      //   if(mtime > oldMtime) {
      //     res.setHeader('Last-Modified', new Date(mtime).toGMTString())
      //     res.writeHead(200, 'OK')
      //     res.end(data)            
      //   }else {
      //     res.writeHead(304)
      //     res.end()
      //   }
      // }

      //example3
      let mtime = Date.parse(fs.statSync(filePath).mtime)
      //10秒内，浏览器直接从自己本地拿，10秒后找服务器要。如果没修改，告诉浏览器没修改就行，如果修改了，给浏览器最新的
      res.setHeader('Cache-Control', 'max-age=10')

      if(!req.headers['if-modified-since']) {
        res.setHeader('Last-Modified', new Date(mtime).toGMTString())
        res.writeHead(200, 'OK')
        res.end(data)        
      }else {
        let oldMtime = Date.parse(req.headers['if-modified-since'])
        if(mtime > oldMtime) {
          res.setHeader('Last-Modified', new Date(mtime).toGMTString())
          res.writeHead(200, 'OK')
          res.end(data)            
        }else {
          res.writeHead(304)
          res.end()
        }
      }

  	}
  })
}).listen(8080)
console.log('Visit http://localhost:8080' )

```

当我们的请求到达之后，我们使用 stat 获取文件的很多基本信息。

其中有一个 mtime 也就是文件的修改时间，我们来获取他，接着解析出这个时间，将它转换为 GMT 格式的事件对象。



## Etag 字段Etag 字段

```

const http = require('http')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')




http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url)
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, 'not found')
      res.end('Oh, Not Found')
    } else {
      // example1
      // let md5 = crypto.createHash('md5')
      // res.setHeader('Etag', md5.update(data).digest('base64'))
      // res.writeHead(200, 'OK')
      // res.end(data)

      // example2
      console.log(req.headers['if-none-match'])
      let oldEtag = req.headers['if-none-match']
      if(!oldEtag) {
        let md5 = crypto.createHash('md5')
        res.setHeader('Etag', md5.update(data).digest('base64'))
        res.writeHead(200, 'OK')
        res.end(data)       
      } else {
        let newEtag = crypto.createHash('md5').update(data).digest('base64')
        if(oldEtag !== newEtag) {
          res.setHeader('Etag', newEtag)
          res.writeHead(200, 'OK')
          res.end(data)          
        }else {
          res.writeHead(304)
          res.end()
        }
      }



      //example2
      // console.log(req.headers)
      // let mtime = Date.parse(fs.statSync(filePath).mtime)
      // if(!req.headers['if-modified-since']) {
      //   res.setHeader('Last-Modified', new Date(mtime).toGMTString())
      //   res.writeHead(200, 'OK')
      //   res.end(data)        
      // }else {
      //   let oldMtime = Date.parse(req.headers['if-modified-since'])
      //   if(mtime > oldMtime) {
      //     res.setHeader('Last-Modified', new Date(mtime).toGMTString())
      //     res.writeHead(200, 'OK')
      //     res.end(data)            
      //   }else {
      //     res.writeHead(304)
      //     res.end()
      //   }
      // }

      //example3
      // let mtime = Date.parse(fs.statSync(filePath).mtime)
      // //10秒内，浏览器直接从自己本地拿，10秒后找服务器要。如果没修改，告诉浏览器没修改就行，如果修改了，给浏览器最新的
      // res.setHeader('Cache-Control', 'max-age=10')

      // if(!req.headers['if-modified-since']) {
      //   res.setHeader('Last-Modified', new Date(mtime).toGMTString())
      //   res.writeHead(200, 'OK')
      //   res.end(data)        
      // }else {
      //   let oldMtime = Date.parse(req.headers['if-modified-since'])
      //   if(mtime > oldMtime) {
      //     res.setHeader('Last-Modified', new Date(mtime).toGMTString())
      //     res.writeHead(200, 'OK')
      //     res.end(data)            
      //   }else {
      //     res.writeHead(304)
      //     res.end()
      //   }
      // }

    }
  })
}).listen(8080)
console.log('Visit http://localhost:8080' )

```

```js
const http = require('http')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')




http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url)
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, 'not found')
      res.end('Oh, Not Found')
    } else {
      // example1
      // let md5 = crypto.createHash('md5')
      // res.setHeader('Etag', md5.update(data).digest('base64'))
      // res.writeHead(200, 'OK')
      // res.end(data)

      // example2
      console.log(req.headers['if-none-match'])
      let oldEtag = req.headers['if-none-match']
      if(!oldEtag) {
        let md5 = crypto.createHash('md5')
        res.setHeader('Etag', md5.update(data).digest('base64'))
        res.writeHead(200, 'OK')
        res.end(data)       
      } else {
        let newEtag = crypto.createHash('md5').update(data).digest('base64')
        if(oldEtag !== newEtag) {
          res.setHeader('Etag', newEtag)
          res.writeHead(200, 'OK')
          res.end(data)          
        }else {
          res.writeHead(304)
          res.end()
        }
      }



      //example2
      // console.log(req.headers)
      // let mtime = Date.parse(fs.statSync(filePath).mtime)
      // if(!req.headers['if-modified-since']) {
      //   res.setHeader('Last-Modified', new Date(mtime).toGMTString())
      //   res.writeHead(200, 'OK')
      //   res.end(data)        
      // }else {
      //   let oldMtime = Date.parse(req.headers['if-modified-since'])
      //   if(mtime > oldMtime) {
      //     res.setHeader('Last-Modified', new Date(mtime).toGMTString())
      //     res.writeHead(200, 'OK')
      //     res.end(data)            
      //   }else {
      //     res.writeHead(304)
      //     res.end()
      //   }
      // }

      //example3
      // let mtime = Date.parse(fs.statSync(filePath).mtime)
      // //10秒内，浏览器直接从自己本地拿，10秒后找服务器要。如果没修改，告诉浏览器没修改就行，如果修改了，给浏览器最新的
      // res.setHeader('Cache-Control', 'max-age=10')

      // if(!req.headers['if-modified-since']) {
      //   res.setHeader('Last-Modified', new Date(mtime).toGMTString())
      //   res.writeHead(200, 'OK')
      //   res.end(data)        
      // }else {
      //   let oldMtime = Date.parse(req.headers['if-modified-since'])
      //   if(mtime > oldMtime) {
      //     res.setHeader('Last-Modified', new Date(mtime).toGMTString())
      //     res.writeHead(200, 'OK')
      //     res.end(data)            
      //   }else {
      //     res.writeHead(304)
      //     res.end()
      //   }
      // }

    }
  })
}).listen(8080)
console.log('Visit http://localhost:8080' )

```

