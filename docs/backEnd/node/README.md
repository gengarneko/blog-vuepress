---
title: 超详细 Node.js 上手
date: 2020-06-20
categories:
 - frontEnd
tags:
 - Node.js
---
首次学习 Node.js，需要看着代码想问题，善用社区和文档，使用 CRM 学习法~
<!-- more -->
前置条件，比较少：
1. VSCode
2. Node.js
3. Node.js 文档 https://nodejs.org/zh-cn/
4. JS 相关知识不是必需的·

## 运行 node.js 

> 不要双击 Node.js 快捷方式

如何运行 Node.js：

### 在cmd 里运行 node

![image-20200620115409541](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfym6hyyytj30770330sr.jpg)

按 ctrl + D 退出



### node 接绝对路径

在一个目录下新建 1.js 文件并用 vscode 打开它

![image-20200620115949892](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfymccb4uqj30cn04xwex.jpg)

```js
// 1.js

console.log('1.js')
```

然后回到命令行用绝对路径去执行它

![image-20200620120126543](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyme0ms2tj309400zwee.jpg)



### node 接相对路径

直接在目录下执行 1.js 文件

![image-20200620120235455](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfymf7rs5xj304h012mx1.jpg)

不接文件名一样可以执行

![image-20200620120307474](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfymfrts5sj303f010glh.jpg)



### node -e 接字符串

不用文件直接执行代码

QWQ 有BUG，搜不到的那种

## 创建 todo 的实现过程

最终效果：

1. node todo add 任务内容
2. node todo list
3. node todo done 1
4. node todo delete 1
5. node todo edit 2

首先创建一个 `todo.js`

![image-20200620125558581](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfynys33cej30dx06mmxy.jpg)

然后编辑 `todo.js`：

```js
console.log('欢迎使用 todoList 小程序')
// vscode 命令行中 node 一下试试
```

现在想实现 `node todo add 做菜` 这样的命令，但是不知道怎么做，怎么办呢？

打开 `google`，搜索 `node get command line` 自动补全 `node get command line args`：

![image-20200620130152425](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyo4x4s5wj30ow0ihwi9.jpg)

可以在万能的 stackoverflow 上找到相关问题并得出答案：

![image-20200620130254157](/Users/xu/Library/Application Support/typora-user-images/image-20200620130254157.png)

现在我会 node 相关知识嘛？不会，我会实现这个功能吗？我会了：

```js
console.log('欢迎使用 todoList 小程序')

// 抄来的代码
// process.argv.forEach(function (val, index, array) {
//   console.log(index + ': ' + val);
// });

console.log(process.argv)
```

![image-20200620130632778](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyo9t1trcj30bp0373yo.jpg)

然后可以这么操作：

```js
const nodePath = process.argv[0]
const todoPath = process.argv[1]
const verb = process.argv[2]
const content = process.argv[3]

console.log('你想做的操作是' + verb)
console.log('你想操作的内容是' + content)
```

![image-20200620131024934](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyogzxtptj30bn03xdg4.jpg)

再然后创建一个任务列表：

```js
const list = []

console.log(process.argv)

const nodePath = process.argv[0]
const todoPath = process.argv[1]
const verb = process.argv[2]
const content = process.argv[3]

console.log('你想做的操作是' + verb)
console.log('你想操作的内容是' + content)

const task = content
list.push(task)

console.table(list)
```

![image-20200620131220856](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyogv7wpfj30bk05wjrs.jpg)

好了，现在遇到了第一个问题：

![image-20200620131314035](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyogr2x0lj30ch0bl75a.jpg)

数据并没有被保存，因为 `const list = []` 每次都把任务清空了。

那就把任务存在文件里好了，但是我还不会用 node 创建文件，很简单，搜索 `nodejs create file` 从谷歌继续抄：

![image-20200620131706112](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyokrghb1j30nx0h275s.jpg)

![image-20200620131729931](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyol6gipfj30oh0hh0u7.jpg)

 先来抄第一行：

```js
var fs = require('fs');
```

不理解啥意思对不对？看官网：

![image-20200620132121197](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyop9v37oj30y20pltbx.jpg)

好了现在知道这是个文件系统，但是对我来说英文好麻烦：

![image-20200620132525454](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyotergcyj30np0lrtc8.jpg)

这个就很棒了对不对？

![image-20200620132605082](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyovxndn0j30p30jjn14.jpg)

这两个 api 都不是操作文档的，那就搜 `write`：

![image-20200620132833060](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyownps9xj30q80moq7a.jpg)

这里面有个 `fs.writeFileSync(file, data[, options])` 异步写入文件，看起很棒对不对？点开它：

![image-20200620132950155](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyoxzw4h6j30kx0cctad.jpg)

好了，继续工程：

```js
var fs = require('fs')

// fs.writeFileSync('/Users/xu/Code/back-end/node/node-demo-todoList/db', '到此一游')
fs.writeFileSync('./db', '到此一游')
```

![image-20200620135908457](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfypshm9iuj30d10860tf.jpg)

![image-20200620135929030](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfypsu1sk5j308p02pt8n.jpg)

好了，现在会使用这个 API 了。

新的问题：`const list = []` 会覆盖 db 文件

```js
const task = content
list.push(task)

fs.writeFileSync('./db', list.toString()) //以字符串形式
```

![image-20200620140445093](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfypybalhoj30hx045mxc.jpg)

```js
var fs = require('fs')

const list = fs.readFileSync('./db').toString()
console.log('文件内容' + list)

// const list = []

const nodePath = process.argv[0]
const todoPath = process.argv[1]
const verb = process.argv[2]
const content = process.argv[3]

const task = content
list.push(task)

// fs.writeFileSync('./db', list.toString())

console.table(list)
```

![image-20200620140921826](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyq34iq93j30in06tmyc.jpg)

以字符串形式存取数据，就没法进行数据操作了对吧，也就是说存数据的时候就错了：

```js
// 测试
const task = content
list.push(task)

fs.writeFileSync('./db', list.toString())

console.log(list)
```

![image-20200620141427425](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyq8fh5hpj309j015aa1.jpg)

![image-20200620141441514](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyq8ntl8fj306901e3yd.jpg)

怎么解决这个问题呢？使用一个简单的 API，JSON 序列化：

```js
fs.writeFileSync('./db', JSON.stringify(list))
```

将数组以 JSON 格式存储在数据库中：

```js
const list = fs.readFileSync('./db').toString()
console.log('文件内容：' + list)
```

![image-20200620141836923](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyqcqxg98j30bu01x74d.jpg)

使用反序列化将拿到的数据再转化一下：

```js
var fs = require('fs')

const fileContent = fs.readFileSync('./db').toString()
const list = JSON.parse(fileContent)
console.log('文件内容：' + list)

const nodePath = process.argv[0]
const todoPath = process.argv[1]
const verb = process.argv[2]
const content = process.argv[3]

const task = content
list.push(task)

fs.writeFileSync('./db', JSON.stringify(list))

console.log(list)
```

![image-20200620142044083](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyqey0cdnj309y01oaa3.jpg)

现在可以烧两桶水了！

## 笨代码实现过程

### node todo add 任务

从之前的研究可以知道，序列化方法原理很简单：

```js
JSON.stringfy = function(array) {
	return '[' + array.toString().split(',').map(string => `'${string}'`).join() + ']'
}
```

存的时候序列化，取得时候反序列化。

新的问题：db 文件如果被删掉那就没法读取了！需要添加一个判断，怎么判断呢？依然是谷歌搜索：

![image-20200620143434893](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyqtdxztaj30lq0g177c.jpg)

![image-20200620143907344](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyqy3h45tj30lk0nqgoo.jpg)

别人怎么写你就怎么写，管他为什么：

```js
if(path.existsSync('./db')) {
  // doSomething
} else {
  // doSomething
}
```

```js
var fs = require('fs')
var path = require('path')

const verb = process.argv[2]
const content = process.argv[3]

if(path.existsSync('./db')) {
  const fileContent = fs.readFileSync('./db').toString()
  const list = JSON.parse(fileContent)

  const task = content
  list.push(task)
  fs.writeFileSync('./db', JSON.stringify(list))
  console.log(list)
} else {
  const fileContent = fs.writeFileSync('./db', '')
  const list = []

  const task = content
  list.push(task)
  fs.writeFileSync('./db', JSON.stringify(list))
  console.log(list)
}
```

然后就获得了一个有点蠢的代码，但是我就是不优化：

![image-20200620144840881](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyr81ju2aj30ho057jsc.jpg)

为啥报错了呢？

![image-20200620145011579](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyr9lcrmfj30l80k640w.jpg)

被弃用了你不早说？那换一个 API 就好了：

```js
var fs = require('fs')
var path = require('path')

const verb = process.argv[2]
const content = process.argv[3]

if(fs.existsSync('./db')) {
  const fileContent = fs.readFileSync('./db').toString()
  const list = JSON.parse(fileContent)

  const task = content // 获取任务
  list.push(task) // 加入队列
  fs.writeFileSync('./db', JSON.stringify(list)) // 写入数据
  console.log(list) // 打印数据
} else {
  const fileContent = fs.writeFileSync('./db', '')
  const list = []

  const task = content
  list.push(task)
  fs.writeFileSync('./db', JSON.stringify(list))
  console.log(list)
}
```

测试一下：

![image-20200620145231129](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyrc180lwj30ap047q3b.jpg)

好了，花了这么久，`node todo add 任务` 功能就实现了！

### node todo list

想列出所有任务，该怎么实现呢？先把 `verb` 给判断一下：

```js
if(verb === 'add') {
  if(fs.existsSync('./db')) {
    const fileContent = fs.readFileSync('./db').toString()
    const list = JSON.parse(fileContent)
  
    const task = content // 获取任务
    list.push(task) // 加入队列
    fs.writeFileSync('./db', JSON.stringify(list)) // 写入数据
    console.log(list) // 打印数据
  } else {
    const fileContent = fs.writeFileSync('./db', '')
    const list = []
  
    const task = content
    list.push(task)
    fs.writeFileSync('./db', JSON.stringify(list))
    console.log(list)
  }
} else if ...
```

然后再来实现 `todo list`：

```js
} else if(verb === 'list') {
  const fileContent = fs.readFileSync('./db').toString()
  const list = JSON.parse(fileContent)
  console.log(list)
} else {
  console.log('你的动作是：' + verb)
  console.log('不支持此动作')
}
```

![image-20200620145940413](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyrjgv6g7j308200v3yf.jpg)

但是有个 BUG，很明显无法操作空文件，后面优化的时候一起解决。

### node todo delete 1

我想从数组里删除匹配的字段，咋整？搜索谷歌：

![image-20200620150815383](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyrsernluj30rv0lan2s.jpg)

九种方法你敢信？找一个看起来舒服的：

```js
  list.splice(n-1, 1)
```

```js
} else if(verb === 'delete') {
  const fileContent = fs.readFileSync('./db').toString()
  const list = JSON.parse(fileContent)
  const n = content
  list.splice(n-1, 1)
  fs.writeFileSync('./db', JSON.stringify(list))
  console.log(list)
```

![image-20200620152327132](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfys87mfrcj308l01rt8r.jpg)

### node todo done 1

获取指定字符串再修改 好麻烦啊，来给每个任务接一个 `bool` 标识任务代表它没完成：

```js
list.push([task, false])
```

![image-20200620152727719](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyscdgfatj30c401qjri.jpg)

再来改 `done` 命令；

```js
} else if(verb === 'done') {
  const fileContent = fs.readFileSync('./db').toString()
  const list = JSON.parse(fileContent)
  const n = content
  list[n-1][1] = true
  fs.writeFileSync('./db', JSON.stringify(list))
  console.log(list)
```

### node todo edit 1

根据之前的经验很快写出 `edit`:

```
} else if(verb === 'edit') {
  const fileContent = fs.readFileSync('./db').toString()
  const list = JSON.parse(fileContent)
  const n = content
  list[n-1][0] = '???'
```

但是后面的编辑呢？很简单：

```js
const edit = process.argv[4]
...
  list[n-1][0] = edit
```

```js
} else if(verb === 'edit') {
  const fileContent = fs.readFileSync('./db').toString()
  const list = JSON.parse(fileContent)
  const n = content
  list[n-1][0] = edit
  fs.writeFileSync('./db', JSON.stringify(list))
  console.log(list)
```

![image-20200620153811305](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfysnjj2jxj309s01p74c.jpg)

## 代码极致优化

功能都实现完毕了，但是存在两大问题：

- 重复率太高
- 存在 BUG

先使用 `switch` 优化 `if else` 语句：

```js
var fs = require('fs')
var path = require('path')

const verb = process.argv[2]
const content = process.argv[3]
const edit = process.argv[4]

switch(verb) {
  case 'add':
    if(fs.existsSync('./db')) {
      const fileContent = fs.readFileSync('./db').toString()
      const list = JSON.parse(fileContent)
    
      const task = content // 获取任务
      list.push([task, false]) // 加入队列
      fs.writeFileSync('./db', JSON.stringify(list)) // 写入数据
      console.log(list) // 打印数据
    } else {
      const fileContent = fs.writeFileSync('./db', '')
      const list = []
    
      const task = content
      list.push([task, false])
      fs.writeFileSync('./db', JSON.stringify(list))
      console.log(list)
    }
    break;
  case 'list':
    const fileContent = fs.readFileSync('./db').toString()
    const list = JSON.parse(fileContent)
    console.log(list)
    break;
  case 'done':
    const fileContent = fs.readFileSync('./db').toString()
    const list = JSON.parse(fileContent)
    const n = content
    list[n-1][1] = true
    fs.writeFileSync('./db', JSON.stringify(list))
    console.log(list)
    break;
  case 'delete':
    const fileContent = fs.readFileSync('./db').toString()
    const list = JSON.parse(fileContent)
    const n = content
    list.splice(n-1, 1)
    fs.writeFileSync('./db', JSON.stringify(list))
    console.log(list)
    break;
  case 'edit':
    const fileContent = fs.readFileSync('./db').toString()
    const list = JSON.parse(fileContent)
    const n = content
    list[n-1][0] = edit
    fs.writeFileSync('./db', JSON.stringify(list))
    console.log(list)
    break;
  default:
    console.log('你的动作是：' + verb)
    console.log('不支持此动作')
    break;
}
```

以上是BUG的代码形式，解决重复：

1. vscode 快捷键将 './db' 替换 dbPath：

   ```js
   const dbPath = '/Users/xu/Code/back-end/node/node-demo-todoList/db'
   ```

2. 函数抽取公共方法：

   ```js
   function save(list) {
     fs.writeFileSync(dbPath, JSON.stringify(list))
   }
   
   function fetch() {
     const fileContent = fs.readFileSync(dbPath).toString()
     const list = JSON.parse(fileContent)
     return list
   }
   ```

3. 不写多与代码：

   ```js
   list.push([content, false])
   ```

可以让代码更语义化：

```js
var fs = require('fs')

const verb = process.argv[2]
const content = process.argv[3]
const edit = process.argv[4]
const dbPath = '/Users/xu/Code/back-end/node/node-demo-todoList/db'

function save(list) {
  fs.writeFileSync(dbPath, JSON.stringify(list))
}

function fetch() {
  const fileContent = fs.readFileSync(dbPath).toString()
  const list = JSON.parse(fileContent)
  return list
}

function display(list) {
  console.log(list)
}

function addTask(list, content) {
  list.push([content, false])
}

function removeTask(list, index) {
  list.splice(index-1, 1)
}

function markTaskAsDone(list, index) {
  list[index-1][1] = true
}

function editTask(list, index, newContent) {
  list[index-1][0] = newContent
}

switch(verb) {
  case 'add':
    if(fs.existsSync(dbPath)) {
      const list = fetch()
    
      addTask(list, content)
      save(list) // 写入数据
      display(list)
    } else {
      const list = fetch()
    
      addTask(list, content)
      save(list)
      display(list)
    }
    break;
  case 'list':
    const list = fetch()
    display(list)
    break;
  case 'done':
    const list = fetch()
    const n = content
    list[n-1][1] = true
    save(list)
    display(list)
    break;
  case 'delete':
    const list = fetch()
    removeTask(list, content)
    save(list)
    display(list)
    break;
  case 'edit':
    const list = fetch()
    editTask(list, content, edit)
    save(list)
    display(list)
    break;
  default:
    console.log('你的动作是：' + verb)
    console.log('不支持此动作')
    break;
}
```
更好地改代码，得从更高的纬度去看：

​	每一个方法都有存取文件的组成，而 `add` 方法太复杂了，因为它处理了一个异常情况，需要确保不存在异常情况，怎么解决呢？

​	在外部解决问题： `fs.statSync(dbPath)`：

```js
try{
  fs.statSync(dbPath)
}catch(error){
  fs.writeFileSync(dbPath, '')
}
```

通过观察是否报错来做判断，确保在方法调用前，db 文件必在：

```js
  case 'add':
    list = fetch()
    addTask(list, content)
    save(list) // 写入数据
    display(list)
    break;
```

### 改 BUG

要在 `fetch()` 中对 list 变量 做一个判断，判断是否存在，并给一个空数组兜底。

### 代码韩国行

整容之后：

```js
var fs = require('fs')

const verb = process.argv[2]
const content = process.argv[3]
const edit = process.argv[4]
const dbPath = '/Users/xu/Code/back-end/node/node-demo-todoList/db'


function save(list) {
  fs.writeFileSync(dbPath, JSON.stringify(list))
}

function fetch() {
  const fileContent = fs.readFileSync(dbPath).toString()
  const list = JSON.parse(fileContent) || []
  return list
}

function display(list) {
  console.log(list)
}

function addTask(list, content) {
  list.push([content, false])
}

function removeTask(list, index) {
  list.splice(index-1, 1)
}

function markTaskAsDone(list, index) {
  list[index-1][1] = true
}

function editTask(list, index, newContent) {
  list[index-1][0] = newContent
}

try{
  fs.statSync(dbPath)
}catch(error){
  fs.writeFileSync(dbPath, '')
}
const list = fetch()

switch(verb) {
  case 'add':
    addTask(list, content)
    save(list) // 写入数据
    display(list)
    break;
  case 'list':
    display(list)
    break;
  case 'done':
    markTaskAsDone(list, content)
    save(list)
    display(list)
    break;
  case 'delete':
    removeTask(list, content)
    save(list)
    display(list)
    break;
  case 'edit':
    editTask(list, content, edit)
    save(list)
    display(list)
    break;
  default:
    console.log('你的动作是：' + verb)
    console.log('不支持此动作')
    break;
}
```

看到 `save() display()` 还是在重复，继续整容：

```js
var fs = require('fs')

const verb = process.argv[2]
const content = process.argv[3]
const edit = process.argv[4]
const dbPath = '/Users/xu/Code/back-end/node/node-demo-todoList/db'

ensureDB()
const list = fetch()

switch(verb) {
  case 'add':
    addTask(list, content)
    break;
  case 'list':
    display(list)
    break;
  case 'done':
    markTaskAsDone(list, content)
    break;
  case 'delete':
    removeTask(list, content)
    break;
  case 'edit':
    editTask(list, content, edit)
    break;
  default:
    console.log('你的动作是：' + verb)
    console.log('不支持此动作')
    break;
}

display(list)
if(verb !== 'list') {
  save(list)
}

// 帮助函数
function ensureDB() {
  try{
    fs.statSync(dbPath)
  }catch(error){
    fs.writeFileSync(dbPath, '')
  }
}

function save(list) {
  fs.writeFileSync(dbPath, JSON.stringify(list))
}

function fetch() {
  const fileContent = fs.readFileSync(dbPath).toString()
  let list
  try{
    list = JSON.parse(fileContent) || []
  }catch(error){
    list = []
  }
  return list
}

function display(list) {
  console.log(list)
}

function addTask(list, content) {
  list.push([content, false])
}

function removeTask(list, index) {
  list.splice(index-1, 1)
}

function markTaskAsDone(list, index) {
  list[index-1][1] = true
}

function editTask(list, index, newContent) {
  list[index-1][0] = newContent
}
```

### 优化用户体验

使用系统变量优化代码：

```js
const dbPath = __dirname + '/db'
```

但是这样平台兼容性不好，使用一个函数：

```js
const dbPath = path.join(__dirname, 'db')
```

修改一下 `display()` 优化体验：

```js

function display(list) {
  for(let i=0; i<list.length; i++) {
    const flag = list[i][1] === true ? '[√]' : '[.]'
    console.log('任务内容：' + flag + ' ' + list[i][0])
  }
}
```

![image-20200620164521727](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyulffz4tj308f02jq2x.jpg)

在全局使用这个脚本文件：

```shell
vi ~/.bashrc

alias td='node /Users/xu/Code/back-end/node/node-demo-todoList/todo.js'

source ~/.bashrc
```

## 总结

虽然很短很简单，但是从这篇文章学到了：

1. 如何获取命令行参数
2. 如何创建文件
3. 如何改写文件
4. 如何使用 JSON 序列化
5. 如何使用循环或 map

### 重点

Node.js 不熟悉怎么办？

1. 真人求助
2. 文档查阅
3. Google搜索
4. copy-run-fmodify（CRM 学习大法）

console.log() 调试

1. 不管什么语言，都可以用 log 去调试

目的

1. Node.js 并不可怕
2. 了解命令行
3. 命令行很有趣

### 结论

如何学习 Node.js

1. 做一个小功能
2. 使用 Node.js 实现它
3. 不会就问
4. 完成并优化思考
5. 再想一个小功能

系统学习 Node.js

1. 通读官方文档
2. 了解 Node.js Web 框架
3. 学号 JS / TS