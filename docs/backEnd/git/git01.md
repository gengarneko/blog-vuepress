---
title: Git 常用命令
date: 2020-07-19
categories:
 - backEnd
tags:
 - Git
sidebarDepth: 6
---
Git 是一个流行的文件版本管理工具。

基于 Git 本体还衍生了出很多相关工具，如：

图形化的 Git 管理界面
各种 Git Diff 编辑器
Git 规范提交工具
<!-- more -->
参考：

https://juejin.im/post/5a54386af265da3e3b7a6317#heading-9

## Git 流程图

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggwgqe1r43j30wk09gjsp.jpg)

- `Workspace`：工作区
- `Index / Stage`：暂存区
- `Repository`：仓库区（或本地仓库）
- `Remote`：远程仓库 

## 思维导图

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggx4zcan0aj30u02057wh.jpg)

## 流式模型

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggx50ma4ojj30fk0hymyu.jpg)

## 命令速查

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggx503hjscj316h0u0gve.jpg)



## 配置 Git

```bash
# 配置全局用户
$ git config --global user.name "用户名" 
$ git config --global user.email "git账号"
# 配置别名
$ git config --global alias.co checkout
$ git config --global alias.ss status
$ git config --global alias.cm commit
$ git config --global alias.br branch
$ git config --global alias.rg reflog
# 这里只是美化 log 的输出，实际使用时可以在 git lg 后面加命令参数，如： git lg -10 显示最近10条提交
$ git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
# 删除全局配置
$ git config --global --unset alias.xxx
$ git config --global --unset user.xxx
```

## 查看 Git 信息

```bash
# 查看系统配置
$ git config --list
# 查看用户配置
$ cat ~/.gitconfig 
# 查看当前项目的 git 配置
$ cat .git/config
# 查看暂存区的文件
$ git ls-files
# 查看本地 git 命令历史
$ git reflog
# 查看所有 git 命令
$ git --help -a 
# 查看当前 HEAD 指向
$ cat .git/HEAD

# git 中 D 向下翻一行  F 向下翻页  B 向上翻页  Q 退出
# 查看提交历史
$ git log --oneline  
          --grep="关键字"
          --graph 
          --all      
          --author "username"     
          --reverse 
          -num
          -p
          --before=  1  day/1  week/1  "2019-06-06" 
          --after= "2019-06-06"
          --stat 
          --abbrev-commit 
          --pretty=format:"xxx"
          
# oneline -> 将日志记录一行一行的显示
# grep="关键字" -> 查找日志记录中(commit提交时的注释)与关键字有关的记录
# graph -> 记录图形化显示 ！！！    
# all -> 将所有记录都详细的显示出来
# author "username" -> 查找这个作者提交的记录
# reverse -> commit 提交记录顺序翻转      
# before -> 查找规定的时间(如:1天/1周)之前的记录   
# num -> git log -10 显示最近10次提交 ！！！    
# stat -> 显示每次更新的文件修改统计信息，会列出具体文件列表 ！！！
# abbrev-commit -> 仅显示 SHA-1 的前几个字符，而非所有的 40 个字符 ！！！
# pretty=format:"xxx" ->  可以定制要显示的记录格式 ！！！
# p -> 显示每次提交所引入的差异（按 补丁 的格式输出）！！！
```

### git reflog

- **显示的是一个 `HEAD` 指向发生改变的时间列表**。在你切换分支、用 `git commit` 进行提交、以及用 `git reset` 撤销 commit 时，`HEAD` 指向会改变，但当你进行 `git checkout -- <filename>` 撤销或者 `git stash`  存储文件等操作时，`HEAD` 并不会改变，这些修改从来没有被提交过，因此 `reflog` 也无法帮助我们恢复它们。
- `git reflog` 不会永远保持，Git 会定期清理那些 “用不到的” 对象，不要指望几个月前的提交还一直在那里。

### git log 点线图

- **git 中一条分支就是一个指针，新建一条分支就是基于当前指针新建一个指针**
- **切换至某个分支 ，就是将 HEAD 指向某条分支（指针）**
- **切换至某个 commit ，就是将 HEAD 指向某个 commit**

符号解释：

```
*	表示一个 commit
|	表示分支前进
/	表示分叉
\	表示合入
|/	表示新分支
```

## Git 常用命令

```bash
# 查看工作区和暂存区的状态
$ git status 
# 将工作区的文件提交到暂存区
$ git add .  
# 提交到本地仓库
$ git commit -m "本次提交说明"
# add和commit的合并，便捷写法（未追踪的文件无法直接提交到暂存区/本地仓库）
$ git commit -am "本次提交说明"  
# 将本地分支和远程分支进行关联
$ git push -u origin branchName 
# 将本地仓库的文件推送到远程分支
$ git push
# 拉取远程分支的代码
$ git pull origin branchName 
# 合并分支
$ git merge branchName 
# 查看本地拥有哪些分支
$ git branch
# 查看所有分支（包括远程分支和本地分支）
$ git branch -a 
# 切换分支
$ git checkout branchName 
# 临时将工作区文件的修改保存至堆栈中
$ git stash
# 将之前保存至堆栈中的文件取出来
$ git stash pop
```

## 常用命令详解

### add

将工作区的文件添加到暂存区

```bash
# 添加指定文件到暂存区（追踪新增的指定文件）
$ git add [file1] [file2] ...
# 添加指定目录到暂存区，包括子目录
$ git add [dir]
# 添加当前目录的所有文件到暂存区（追踪所有新增的文件）
$ git add .
# 删除工作区/暂存区的文件
$ git rm [file1] [file2] ...
# 停止追踪指定文件，但该文件会保留在工作区
$ git rm --cached [file]
# 改名工作区/暂存区的文件
$ git mv [file-original] [file-renamed]

# Git 2.0 以下版本
#只作用于文件的新增和修改
$ git add .  
#只作用于文件的修改和删除
$ gti add -u
#作用于文件的增删改
$ git add -A 

# Git 2.0 版本
$ git add . 等价于 $ git add -A 
```

**`git add .`** ：**操作的对象是“当前目录”所有文件变更**，"."  表示当前目录。会监控工作区的状态树，使用它会把工作区的**所有变化提交**到暂存区，包括文件内容修改（`modified`）以及新文件（`new`），但**不包括被删除的文件**。

**`git add -u`** ：**操作的对象是整个工作区已经跟踪的文件变更，无论当前位于哪个目录下**。仅监控**已经被 add 的文件**（即 **`tracked file`**），它会将被修改的文件（包括文件删除）提交到暂存区。`git add -u` 不会提交新文件（**`untracked file`**）。（**`git add --update`** 的缩写）

**`git add -A`** ：**操作的对象是“整个工作区”所有文件的变更，无论当前位于哪个目录下**。是上面两个功能的合集（`git add --all` 的缩写）。

### status

```bash
# 查看工作区和暂存区的状态
$ git status 
```

### commit

```bash
# 将暂存区的文件提交到本地仓库并添加提交说明
$ git commit -m "本次提交的说明"   

# add 和 commit 的合并，便捷写法
# 和 git add -u 命令一样，未跟踪的文件是无法提交上去的
$ git commit -am "本次提交的说明"  

# 跳过验证继续提交
$ git commit --no-verify
$ git commit -n

# 编辑器会弹出上一次提交的信息，可以在这里修改提交信息
$ git commit --amend
# 修复提交，同时修改提交信息
$ git commit --amend -m "本次提交的说明"
# 加入 --no-edit 标记会修复提交但不修改提交信息，编辑器不会弹出上一次提交的信息
$ git commit --amend --no-edit
```

`git commit --amend` 既可以修改上次提交的文件内容，也可以修改上次提交的说明。会用一个新的 `commit` 更新并替换最近一次提交的 `commit` 。如果暂存区有内容，这个新的 `commit` 会把任何修改内容和上一个 `commit` 的内容结合起来。如果暂存区没有内容，那么这个操作就只会把上次的 `commit` 消息重写一遍。**永远不要修复一个已经推送到公共仓库中的提交，会拒绝推送到仓库**

### push & pull

分支推送顺序的写法是 **<来源地>:<目的地>**

```bash
# 将本地仓库的文件推送到远程分支
# 如果远程仓库没有这个分支，会新建一个同名的远程分支
# 如果省略远程分支名，则表示两者同名
$ git push <远程主机名> <本地分支名>:<远程分支名>
$ git push origin branchname  

# 如果省略本地分支名，则表示删除指定的远程分支
# 因为这等同于推送一个空的本地分支到远程分支。
$ git push origin :master
# 等同于
$ git push origin --delete master

# 建立当前分支和远程分支的追踪关系
$ git push -u origin master
# 如果当前分支与远程分支之间存在追踪关系
# 则可以省略分支和 -u 
$ git push

# 不管是否存在对应的远程分支，将本地的所有分支都推送到远程主机
$ git push --all origin

# 拉取所有远程分支到本地镜像仓库中
$ git pull
# 拉取并合并项目其他人员的一个分支 
$ git pull origin branchname  
# 等同于 fetch + merge
$ git fetch origin branchName
$ git merge origin/branchName

# 如果远程主机的版本比本地版本更新，推送时 Git 会报错，要求先在本地做 git pull 合并差异，
# 然后再推送到远程主机。这时，如果你一定要推送，可以使用 –-force 选项 
# （尽量避免使用）
$ git push --force origin | git push -f origin
```

### branch

```bash
# 查看本地分支
$ git branch | git branch -l 
# 查看远程分支
$ git branch -r 
# 查看所有分支（本地分支+远程分支）
$ git branch -a 
# 查看所有分支并带上最新的提交信息
$ git branch -av 
# 查看本地分支对应的远程分支
$ git branch -vv 

# 新建分支
# 在别的分支下新建一个分支，新分支会复制当前分支的内容
# 注意：如果当前分支有修改，但是没有提交到仓库，此时修改的内容是不会被复制到新分支的
$ git branch branchname 
# 切换分支(切换分支时，本地工作区，仓库都会相应切换到对应分支的内容)
$ git checkout branchname 
# 创建一个 aaa 分支，并切换到该分支 （新建分支和切换分支的简写）
$ git checkout -b aaa 
# 可以看做是基于 master 分支创建一个 aaa 分支，并切换到该分支
$ git checkout -b aaa master

# 新建一条空分支（详情请看问题列表）
$ git checkout --orphan emptyBranchName
$ git rm -rf . 

# 删除本地分支,会阻止删除包含未合并更改的分支
$ git brnach -d branchname 
# 强制删除一个本地分支，即使包含未合并更改的分支
$ git branch -D branchname  
# 删除远程分支
# 推送一个空分支到远程分支，其实就相当于删除远程分支
$ git push origin  :远程分支名
# 或者
$ git push origin --delete 远程分支名 

# 修改当前分支名
$ git branch -m branchname 
```

### merge 三种常用合并方法

```bash
# 默认 fast-forward ，HEAD 指针直接指向被合并的分支
$ git merge 

# 禁止快进式合并
$ git merge --no-ff 

$ git merge --squash 
```

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggwiywpl57j30m80bqjsi.jpg)

`fast-forward`：会在当前分支的提交历史中添加进被合并分支的提交历史（**得先理解什么时候会发生快速合并，并不是每次 merge 都会发生快速合并**）；

`--no-ff`：**会生成一个新的提交**，让当前分支的提交历史不会那么乱；

`--squash`：**不会生成新的提交**，会将被合并分支多次提交的内容直接存到工作区和暂存区，由开发者手动去提交，这样当前分支最终只会多出一条提交记录，不会掺杂被合并分支的提交历史

### rebase

> 不要通过 rebase 对任何已经提交到公共仓库中的 commit 进行修改（你自己玩的分支除外）

整合不同分支的修改有两种方法：`merge` 和 `rebase`

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggwjffeccaj30m80andg2.jpg)

整合分支最容易的就是 `merge` 命令，它会将以上提交合并成：

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggwjhb9s2qj30m808gmxb.jpg)

但是这样子并不美观，我们可以通过 `rebase` 来将提交到某一分支上的所有修改都移至另一分支上，就好像“重新播放”一样。

```bash
$ git checkout experiment
$ git rebase master
```

它的原理是首先找到这两个分支（即当前分支 `experiment`、变基操作的目标基底分支 `master`） 的最近共同祖先 `C2`，然后对比当前分支相对于该祖先的历次提交，提取相应的修改并存为临时文件， 然后将当前分支指向目标基底 `C3`, 最后以此将之前另存为临时文件的修改依序应用。 

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggwjjp4xq3j30m806ft8t.jpg)

现在回到 `master` 分支，进行一次快进合并。

```bash
$ git checkout master
$ git merge experiment
```

[https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%8F%98%E5%9F%BA](https://git-scm.com/book/zh/v2/Git-分支-变基)

#### 常用操作：

```bash
# 合并多个commit为一个完整commit
$ git rebase -i  [startpoint]  [endpoint]

# 查看到 log 日志后，运行以下命令
$ git rebase -i 36224db
#或者
$ git rebase -i HEAD~3 

# 将某一段 commit 粘贴到另一个分支上
$ git  rebase   90bc0045b^   5de0da9f2   --onto master
$ git checkout master
$ git reset --hard  0c72e64
```

### 变基 vs. 合并

至此，你已学习了变基和合并的用法，你一定会想问，到底哪种方式更好。 在回答这个问题之前，让我们退后一步，想讨论一下提交历史到底意味着什么。

有一种观点认为，仓库的提交历史即是 **记录实际发生过什么**。 它是针对历史的文档，本身就有价值，不能乱改。 从这个角度看来，改变提交历史是一种亵渎，你使用 *谎言* 掩盖了实际发生过的事情。 如果由合并产生的提交历史是一团糟怎么办？ 既然事实就是如此，那么这些痕迹就应该被保留下来，让后人能够查阅。

另一种观点则正好相反，他们认为提交历史是 **项目过程中发生的事**。 没人会出版一本书的第一版草稿，软件维护手册也是需要反复修订才能方便使用。 持这一观点的人会使用 `rebase` 及 `filter-branch` 等工具来编写故事，怎么方便后来的读者就怎么写。

现在，让我们回到之前的问题上来，到底合并还是变基好？希望你能明白，这并没有一个简单的答案。 Git 是一个非常强大的工具，它允许你对提交历史做许多事情，但每个团队、每个项目对此的需求并不相同。 既然你已经分别学习了两者的用法，相信你能够根据实际情况作出明智的选择。

总的原则是，只对尚未推送或分享给别人的本地修改执行变基操作清理历史， 从不对已推送至别处的提交执行变基操作，这样，你才能享受到两种方式带来的便利。

### stash

- 能够将所有未提交的修改保存至堆栈中，用于后续恢复当前工作区内容
- 如果文件没有提交到**暂存区（使用 git add . 追踪新的文件）**，使用该命令会提示 `No local changes to save` ，无法将修改保存到堆栈中

**使用场景：** 当你接到一个修复紧急 bug 的任务时候，一般都是先创建一个新的 bug 分支来修复它，然后合并，最后删除。但是，如果当前你正在开发功能中，短时间还无法完成，无法直接提交到仓库，这时候可以先把当前工作区的内容 `git stash` 一下，然后去修复 bug，修复后，再 `git stash pop`，恢复之前的工作内容。

```bash
# 将所有未提交的修改（提交到暂存区）保存至堆栈中
$ git stash 
# 给本次存储加个备注，以防时间久了忘了
$ git stash save "存储"
# 存储未追踪的文件
$ git stash -u

# 查看存储记录
$ git stash list

在 Windows 上和 PowerShell 中，需要加双引号
# 恢复后，stash 记录并不删除
$ git stash apply "stash@{index}"
# 恢复的同时把 stash 记录也删了
$ git stash pop "stash@{index}"
# 删除 stash 记录
$ git stash drop "stash@{index}"
# 删除所有存储的进度
$ git stash clear
# 查看当前记录中修改了哪些文件
$ git stash show "stash@{index}"
# 查看当前记录中修改了哪些文件的内容
$ git stash show -p "stash@{index}" 
```

### diff

```bash
# 查看工作区和暂存区单个文件的对比
$ git diff filename 
# 查看工作区和暂存区所有文件的对比
$ git diff 
# 查看工作区和暂存区所有文件的对比，并显示出所有有差异的文件列表
$ git diff --stat   
# 注意：
# 1.你修改了某个文件，但是没有提交到暂存区，这时候会有对比的内容
# 一旦提交到暂存区，就不会有对比的内容(因为暂存区已经更新)
# 2.如果你新建了一个文件，但是没有提交到暂存区，这时候 diff 是没有结果的	

# 查看暂存区与上次提交到本地仓库的快照（即最新提交到本地仓库的快照）的对比
$ git diff --cached/--staged
# 查看工作区与上次提交到本地仓库的快照（即最新提交到本地仓库的快照）的对比
$ git diff branchname
# 查看工作区与 HEAD 指向（默认当前分支最新的提交）的对比
$ git diff HEAD   

# 查看两个本地分支中某一个文件的对比
$ git diff branchname..branchname filename 
# 查看两个本地分支所有的对比
$ git diff branchname..branchname 
# 查看远程分支和本地分支的对比
$ git diff origin/branchname..branchname 
# 查看远程分支和远程分支的对比
$ git diff origin/branchname..origin/branchname 

# 查看两个 commit 的对比
$ git diff commit1..commit2  
```

一般借助 vscode 插件和可视化工具，会更加直观一些

### remote

```bash
# 查看所有远程主机
$ git remote
# 查看关联的远程仓库的详细信息
$ git remote -v 
# 删除远程仓库的 “关联”
$ git remote rm projectname 
# 设置远程仓库的 “关联”
$ git remote set-url origin <newurl>
```

### tag

常用于发布版本

```bash
# 默认在 HEAD 上创建一个标签 
$ git tag v1.0
# 指定一个 commit id 创建一个标签 
$ git tag v0.9 f52c633
# 创建带有说明的标签，用 -a 指定标签名，-m 指定说明文字
$ git tag -a v0.1 -m "version 0.1 released" 

# 查看所有标签
# 注意：标签不是按时间顺序列出，而是按字母排序的。
$ git tag

# 查看单个标签具体信息
$ git show <tagname>

# 推送一个本地标签
$ git push origin <tagname>
# 推送全部未推送过的本地标签
$ git push origin --tags

# 删除本地标签
# 因为创建的标签都只存储在本地，不会自动推送到远程。
# 所以，打错的标签可以在本地安全删除。
$ git tag -d v0.1
# 删除一个远程标签（先删除本地 tag ，然后再删除远程 tag）
$ git push origin :refs/tags/<tagname>
```

### 删除文件

```bash
# 删除暂存区和工作区的文件
$ git rm filename  
# 只删除暂存区的文件，不会删除工作区的文件
$ git rm --cached filename 
```

如果在配置 .gitignore 文件之前就把某个文件上传到远程仓库了，这时候想把远程仓库中的该文件删除，此时你配置 .gitignore 文件也没有用，因为该文件已经被追踪了，但又不想在本地删除该文件后再重新提交到远程仓库，这时候可以使用 `git rm --cached filename` 命令取消该文件的追踪，这样下次提交的时候，git 就不会再提交这个文件，从而远程仓库的该文件也会被删除

### 版本切换 & 重设 & 撤销

- **checkout 可以撤销工作区的文件，reset 可以撤销工作区/暂存区的文件**
- **reset 和 checkout 可以作用于 commit 或者文件，revert 只能作用于 commit**

### checkout 详解

```bash
# 恢复暂存区的指定文件到工作区
$ git checkout <filename>
# 恢复暂存区的所有文件到工作区
$ git checkout .

# 回滚到最近的一次提交
# 如果修改某些文件后，没有提交到暂存区，此时的回滚是回滚到上一次提交
# 如果是已经将修改的文件提交到仓库了，这时再用这个命令回滚无效
# 因为回滚到的是之前自己修改后提交的版本
$ git checkout HEAD 
$ git checkout HEAD -- filename
# 回滚到最近一次提交的上一个版本
$ git checkout HEAD^ 
# 回滚到最近一次提交的上2个版本
$ git checkout HEAD^^ 

# 切换分支，在这里也可以看做是回到项目「当前」状态的方式
$ git checkout <当前你正在使用的分支>
# 切换到某个指定的 commit 版本
$ git checkout <commit_id>
# 切换指定 tag 
$ git checkout <tag>
```

**在开发的正常阶段，`HEAD` 一般指向 master 或是其他的本地分支，但当你使用 `git checkout <commit id>` 切换到指定的某一次提交的时候，`HEAD` 就不再指向一个分支了——它直接指向一个提交，HEAD 就会处于 detached 状态（游离状态）**。

切换到某一次提交后，你可以查看文件，编译项目，运行测试，甚至编辑文件而不需要考虑是否会影响项目的当前状态，你所做的一切都不会被保存到主栈的仓库中。当你想要回到主线继续开发时，使用 `git checkout branchName` 回到项目初始的状态（**这时候会提示你是否需要新建一条分支用于保留刚才的修改**）。

**哪怕你切换到了某一版本的提交，并且对它做了修改后，不小心提交到了暂存区，只要你切换回分支的时候，依然会回到项目的初始状态。（\**\*\*注意：你所做的修改，如果 commit 了，会被保存到那个版本中。切换完分支后，会提示你是否要新建一个分支来保存刚才修改的内容。如果你刚才解决了一个 bug ，这时候可以新建一个临时分支，然后你本地自己的开发主分支去合并它，合并完后删除临时分支\*\**\*）。**

**一般都是用 checkout 回退版本，查看历史代码，测试 bug 在哪**

### reset 详解

`git reset [--hard|soft|mixed|merge|keep] [<commit>或HEAD]`：将当前的分支重设(`reset`)到指定的 `<commit>` 或者 `HEAD` (默认，如果不显示指定 `<commit>`，默认是 `HEAD` ，即最新的一次提交)，并且根据 `[mode]` 有可能更新索引和工作目录。`mode` 的取值可以是 `hard`、`soft`、`mixed`、`merged`、`keep` 。

```bash
# 从暂存区撤销特定文件，但不改变工作区。它会取消这个文件的暂存，而不覆盖任何更改
$ git reset <fileName>
# 重置暂存区最近的一次提交，但工作区的文件不变
$ git reset 
# 等价于 
$ git reset HEAD （默认）
# 重置暂存区与工作区，回退到最近一次提交的版本内容
$ git reset --hard 
# 重置暂存区与工作区，回退到最近一次提交的上一个版本
$ git reset --hard HEAD^ 

# 将当前分支的指针指向为指定 commit（该提交之后的提交都会被移除），同时重置暂存区，但工作区不变
$ git reset <commit>
# 等价于 
$ git reset --mixed  <commit>

# 将当前分支的指针指向为指定 commit（该提交之后的提交都会被移除），但保持暂存区和工作区不变
$ git reset --soft  <commit>
# 将当前分支的指针指向为指定 commit（该提交之后的提交都会被移除），同时重置暂存区、工作区
$ git reset --hard  <commit>
```

- `git reset` 有很多种用法。它可以被用来移除提交快照，尽管它通常被用来撤销暂存区和工作区的修改。不管是哪种情况，它应该只被用于本地修改——你永远不应该重设和其他开发者共享的快照。
- **当你用 reset 回滚到了某个版本后，那么在下一次 git 提交时，之前该版本后面的版本会被作为垃圾删掉。**
- **当我们回退到一个旧版本后，此时再用 git log 查看提交记录，会发现之前的新版本记录没有了。如果第二天，你又想恢复到新版本怎么办？找不到新版本的 commit_id 怎么办？**

**我们可以用 `git reflog` 查看历史命令，这样就可以看到之前新版本的 commit_id ，然后 `git reset --hard commit_id` 就可以回到之前的新版本代码**

- 虽然可以用 git reflog 查看本地历史，然后回复到之前的新版本代码，但是在别的电脑上是无法获取你的历史命令的，所以这种方法不安全。万一你的电脑突然坏了，这时候就无法回到未来的版本。

### revert 详解

```bash
# 生成一个撤销最近的一次提交的新提交
$ git revert HEAD 
# 生成一个撤销最近一次提交的上一次提交的新提交
$ git revert HEAD^ 
# 生成一个撤销最近一次提交的上两次提交的新提交
$ git revert HEAD^^ 
# 生成一个撤销最近一次提交的上n次提交的新提交
$ git revert HEAD~num 

# 生成一个撤销指定提交版本的新提交
$ git revert <commit_id>
# 生成一个撤销指定提交版本的新提交，执行时不打开默认编辑器，直接使用 Git 自动生成的提交信息
$ git revert <commit_id> --no-edit
```

`git revert`命令用来**撤销某个已经提交的快照（和 reset 重置到某个指定版本不一样）**。它是在提交记录最后面加上一个撤销了更改的新提交，而不是从项目历史中移除这个提交，这避免了 Git 丢失项目历史。

**撤销（revert）应该用在你想要在项目历史中移除某个提交的时候**。比如说，你在追踪一个 bug，然后你发现它是由一个提交造成的，这时候撤销就很有用。

**撤销（revert）被设计为撤销公共提交的安全方式，重设（reset）被设计为重设本地更改。**

因为两个命令的目的不同，它们的实现也不一样：重设完全地移除了一堆更改，而撤销保留了原来的更改，用一个新的提交来实现撤销。**千万不要用 `git reset` 回退已经被推送到公共仓库上的 提交，它只适用于回退本地修改（从未提交到公共仓库中）。如果你需要修复一个公共提交，最好使用 git revert**。

发布一个提交之后，你必须假设其他开发者会依赖于它。移除一个其他团队成员在上面继续开发的提交在协作时会引发严重的问题。当他们试着和你的仓库同步时，他们会发现项目历史的一部分突然消失了。一旦你在重设之后又增加了新的提交，Git 会认为你的本地历史已经和 origin/master 分叉了，同步你的仓库时的合并提交(merge commit)会使你的同事困惑。

### cherry-pick

http://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html

**将指定的提交 commit 应用于当前分支**（可以用于恢复不小心撤销（revert/reset）的提交）

```bash
$ git cherry-pick <commit_id>
$ git cherry-pick <commit_id> <commit_id>
$ git cherry-pick <commit_id>^..<commit_id>
```

### git submodule 子模块

[https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97](https://git-scm.com/book/zh/v2/Git-工具-子模块)

有种情况我们经常会遇到：某个工作中的项目需要包含并使用另一个项目。也许是第三方库，或者你独立开发的，用于多个父项目的库。 现在问题来了：你想要把它们当做两个独立的项目，同时又想在一个项目中使用另一个。如果将另外一个项目中的代码复制到自己的项目中，那么你做的任何自定义修改都会使合并上游的改动变得困难。**Git 通过子模块来解决这个问题，允许你将一个 Git 仓库作为另一个 Git 仓库的子目录。 它能让你将另一个仓库克隆到自己的项目中，同时还保持提交的独立。**

```bash
# 在主项目中添加子项目，URL 为子模块的路径，path 为该子模块存储的目录路径
git submodule add [URL] [Path]

# 克隆含有子项目的主项目
git clone [URL]
# 当你在克隆这样的项目时，默认会包含该子项目的目录，但该目录中还没有任何文件
# 初始化本地配置文件
git submodule init
# 从当前项目中抓取所有数据并检出父项目中列出的合适的提交
git submodule update
# 等价于 git submodule init && git submodule update
git submodule update --init

# 自动初始化并更新仓库中的每一个子模块， 包括可能存在的嵌套子模块
git clone --recurse-submodules [URL]
```

## 新建一个 Git 项目的两种方式

### 1.本地新建好 Git 项目，然后关联远程仓库

```bash
# 初始化一个Git仓库
$ git init 
# 关联远程仓库
$ git remote add <name> <git-repo-url>  
# 例如
$ git remote add origin https://github.com/xxxxxx
```

### 2.clone 远程仓库

```bash
# 新建好远程仓库，然后 clone 到本地
$ git clone <git-repo-url>

# 将远程仓库下载到（当前 git bash 启动位置下面的）指定文件中，如果没有会自动生成
$ git clone <git-repo-url> <project-name>
```

## Git 分支管理规范

https://juejin.im/post/5b4328bbf265da0fa21a6820

> git是现在市面上最流行的版本控制工具，书写良好的commit message能大大提高代码维护的效率。但是在日常开发中由于缺少对于commit message的约束，导致填写内容随意、质量参差不齐，可读性低亦难以维护。在项目中引入commit message规范已是迫在眉睫。

### 约定式提交

现在市面上比较流行的方案是`约定式提交规范`（`Conventional Commits`），它受到了`Angular提交准则`的启发，并在很大程度上以其为依据。`约定式提交规范`是一种基于提交消息的轻量级约定。 它提供了一组用于创建清晰的提交历史的简单规则；这使得编写基于规范的自动化工具变得更容易。这个约定与`SemVer`相吻合，在提交信息中描述新特性、bug 修复和破坏性变更。它的 message 格式如下:

```bash
<类型>[可选的作用域]: <描述>

[可选的正文]

[可选的脚注]
```

### 1.全局安装 commitizen & cz-conventional-changelog

`commitizen`是一个撰写合格`commit message`的工具，用于代替`git commit` 指令，而`cz-conventional-changelog`适配器提供[conventional-changelog](https://github.com/conventional-changelog/conventional-changelog)标准（约定式提交标准）。基于不同需求，也可以使用不同适配器。

```bash
npm install -g commitizen cz-conventional-changelog
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

安装完毕后，可直接使用`git cz`来取代`git commit`。

全局模式下，需要 `~/.czrc` 配置文件, 为`commitizen`指定`Adapter`。

### 2. 项目内安装commitlint & husky

`commitlint`负责用于对`commit message`进行格式校验，`husky`负责提供更易用的`git hook`。

```bash
# Use npm
npm i -D husky @commitlint/config-conventional @commitlint/cli

# Use yarn
yarn add husky @commitlint/config-conventional @commitlint/cli -D
```

`commitlint`只能做格式规范，无法触及内容。对于内容质量的把控只能靠我们自己。

### 3. 添加相应配置

创建`commitlint.config.js`

```bash
# In the same path as package.json

echo 'module.exports = {extends: ["@commitlint/config-conventional"]};' > ./commitlint.config.js
```

引入`husky`

```bash
# package.json

...,
"husky": {
    "hooks": {
      "commit-msg": "commitlint -e $GIT_PARAMS"
    }
}
```

### 4. 使用

执行`git cz`进入interactive模式，根据提示依次填写

```bash
1.Select the type of change that you're committing 选择改动类型 (<type>)

2.What is the scope of this change (e.g. component or file name)? 填写改动范围 (<scope>)

3.Write a short, imperative tense description of the change: 写一个精简的描述 (<subject>)

4.Provide a longer description of the change: (press enter to skip) 对于改动写一段长描述 (<body>)

5.Are there any breaking changes? (y/n) 是破坏性修改吗？默认n (<footer>)

6.Does this change affect any openreve issues? (y/n) 改动修复了哪个问题？默认n (<footer>)
```

生成的commit message格式如下：

```bash
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

填写完毕后，`husky`会调用`commitlint`对message进行格式校验，默认规定`type`及`subject`为必填项。

任何`git commit`指令的`option`都能用在 `git cz`指令上, 例如`git cz -a`

## 约定式提交落地

拟定了`commit message`每一部分的填写规则。

### 1. type

`type`为必填项，用于指定commit的类型，约定了`feat`、`fix`两个`主要type`，以及docs、style、build、refactor、revert五个`特殊type`，`其余type`暂不使用。

```
# 主要type
feat:     增加新功能
fix:      修复bug

# 特殊type
docs:     只改动了文档相关的内容
style:    不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
build:    构造工具的或者外部依赖的改动，例如webpack，npm
refactor: 代码重构时使用
revert:   执行git revert打印的message

# 暂不使用type
test:     添加测试或者修改现有测试
perf:     提高性能的改动
ci:       与CI（持续集成服务）有关的改动
chore:    不修改src或者test的其余修改，例如构建过程或辅助工具的变动
复制代码
```

当一次改动包括`主要type`与`特殊type`时，统一采用`主要type`。

### 2. scope

`scope`也为必填项，用于描述改动的范围，格式为项目名/模块名，例如： `node-pc/common` `rrd-h5/activity`，而`we-sdk`不需指定模块名。如果一次commit修改多个模块，建议拆分成多次commit，以便更好追踪和维护。

### 3. body

`body`填写详细描述，主要描述`改动之前的情况`及`修改动机`，对于小的修改不作要求，但是重大需求、更新等必须添加body来作说明。

### 4. break changes

`break changes`指明是否产生了破坏性修改，涉及break changes的改动必须指明该项，类似版本升级、接口参数减少、接口删除、迁移等。

### 5. affect issues

`affect issues`指明是否影响了某个问题。例如我们使用jira时，我们在`commit message`中可以填写其影响的`JIRA_ID`，若要开启该功能需要先打通`jira`与`gitlab`。参考文档：[docs.gitlab.com/ee/user/pro…](https://docs.gitlab.com/ee/user/project/integrations/jira.html)

填写方式例如：

```
re #JIRA_ID
fix #JIRA_ID
```

## 约定式提交示例

### 完整的 commit message 示例

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggwkk4qjqzj30zk0iq42n.jpg)

### 相应的 git log

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggwkkhfnruj30zk0acgnd.jpg)

## 规范流程

- 实际开发的时候，一人一条分支（

  个人见解：除非是大项目，参与的开发人员很多时，可以采用 feature 分支，否则一般的项目中，一个开发者一条分支够用了

  ）。除此之外还要有一条 develop 开发分支，一条 test 测试分支，一条 release 预发布分支。

  - **develop**：**开发分支**，开发人员每天都需要拉取/提交最新代码的分支；
  - **test**：**测试分支**，开发人员开发完并自测通过后，发布到测试环境的分支；
  - **release**：**预发布分支**，测试环境测试通过后，将测试分支的代码发布到预发环境的分支（**这个得看公司支不支持预发环境，没有的话就可以不采用这条分支**）；
  - **master**：**线上分支**，预发环境测试通过后，运营/测试会将此分支代码发布到线上环境；

- 大致流程：

  - 开发人员每天都需要拉取/提交最新的代码到 **develop 分支**；
  - 开发人员开发完毕，开始 **集成测试**，测试无误后提交到 **test 分支**并发布到测试环境，交由测试人员测试；
  - 测试环境通过后，发布到 **release 分支** 上，进行预发环境测试；
  - 预发环境通过后，发布到 **master 分支**上并打上标签（tag）；
  - 如果线上分支出了 bug ，这时候相关开发者应该基于预发布分支（**没有预发环境，就使用 master 分支**），新建一个 **bug 分支**用来临时解决 bug ，处理完后申请合并到 预发布 分支。这样做的好处就是：不会影响正在开发中的功能。

**预发布环境的作用：** 预发布环境是正式发布前最后一次测试。因为在少数情况下即使预发布通过了，都不能保证正式生产环境可以100%不出问题；预发布环境的配置，数据库等都是跟线上一样；有些公司的预发布环境数据库是连接线上环境，有些公司预发布环境是单独的数据库；如果不设预发布环境，如果开发合并代码有问题，会直接将问题发布到线上，增加维护的成本。

## Git 钩子

Git 基本已经成为项目开发中默认的版本管理软件，在使用 Git 的项目中，我们可以为项目设置 Git Hooks 来帮我们在提交代码的各个阶段做一些代码检查等工作

钩子（Hooks） 都被存储在 Git 目录下的 hooks 子目录中。 也就是绝大部分项目中的 .git/hook 目录

[钩子](https://git-scm.com/book/zh/v2/自定义-Git-Git-钩子)分为两大类，客户端的和服务器端的

- 客户端钩子主要被提交和合并这样的操作所调用
- 而服务器端钩子作用于接收被推送的提交这样的联网操作，这里主要介绍客户端钩子

### 4.1 pre-commit

- `pre-commit` 就是在代码提交之前做些东西，比如代码打包，代码检测，称之为钩子（hook）
- 在 commit 之前执行一个函数（callback）。这个函数成功执行完之后，再继续 commit，但是失败之后就阻止 commit
- 在 `.git->hooks->`下面有个 `pre-commit.sample*` ，这个里面就是默认的函数(脚本)样本



### 4.2 安装 pre-commit

```bash
npm install pre-commit --save-dev
```



### 4.3 配置脚本

**如果没有在 `.git->hooks` 目录下生成 `pre-commit` 文件的话，则要手工创建 `node ./node_modules/pre-commit/install.js`**

```bash
"scripts": {
    "build": "tsc",
    "eslint": "eslint src --ext .ts",
    "eslint:fix": "eslint src --ext .ts --fix"
  },
 //在提交代码之前，先执行 scripts 中的 eslint 命令 
  "pre-commit": [
    "eslint"
  ]
```



### 4.4 跳过 pre-commit 继续提交代码

```bash
# 跳过验证
$ git commit --no-verify
$ git commit -n
```

更多钩子：[git-scm.com/book/zh/v2/…](https://git-scm.com/book/zh/v2/自定义-Git-Git-钩子)



## 常见问题汇总

### 1、拉取别人的远程分支合并后，git 会存取这个拉取的记录，如果你不小心删了别人的上传的文件，这时候想要再拉取别人的分支是没用的，会显示 already-up

这时候可以回滚代码，重新拉取。

### 2、环境：前后端、客户端的代码都存放在一个 git 仓库中，在根目录下各自新建项目目录。

那么可以直接在自己的项目目录下使用 git 提交代码并且在各自的项目目录下配置 .gitignore 文件，不用在根目录下配置 .gitignore 文件，这样就互不影响了

### 3、fatal：refusing to merge unrelated histories 拒绝合并不相关的历史

在 git 2.9.2 之后，不可以合并没有相同结点的分支（分支之间自仓库建立后，从来没有过互相拉取合并）。如果需要合并两个不同结点的分支，如下：

```bash
$ git pull origin branchName --allow-unrelated-histories
$ git merge branchName --allow-unrelated-histories
```

这个功能是可以让大家不要把仓库上传错了，如果会加上这个代码，那么就是自己确定了上传。旧版本的 Git 很容易就把代码传错了，现在可以看到，如果上传的不是之前的，那么就需要加代码上传。 正常情况下，都是先建立仓库，然后切多个分支，分支先去拉取合并主分支的内容，然后再各自开发， 如果建立仓库后，各个分支没有区拉取主分支的代码，之后各个分支之间想要合并时就会报错。

### 4、合并分支时出现问题，想要解除合并状态

```bash
error: merge is not possible because you have unmerged files.
hint: Fix them up in the work tree, and then use 'git add/rm <file>'
hint: as appropriate to mark resolution and make a commit.
fatal: Exiting because of an unresolved conflict.
```

当远程分支和本地分支发生冲突后，git 保持合并状态，你如果没有去解决完所有的冲突，那么 git 会一直保持这个状态，你就无法再提交代码。只有先解除合并状态后，才能继续提交。执行命令前最好先备份一下，有可能本地做的修改会被远程分支覆盖掉。

```bash
# 解除合并状态
$ git merge --abort 
```

### 5、不小心把某些文件上传到远程 git 仓库/想要删除远程仓库中的文件

```bash
# 删除暂存区和工作区的文件
$ git rm filename  
# 只删除暂存区的文件，不会删除工作区的文件
$ git rm --cached filename 
```

如果在配置 .gitignore 文件之前就把某个文件上传到远程仓库了，这时候想把远程仓库中的该文件删除，此时你配置 .gitignore 文件也没有用，因为该文件已经被追踪了，但又不想在本地删除该文件后再重新提交到远程仓库，这时候可以使用 `git rm --cached filename` 命令取消该文件的追踪，这样下次提交的时候，git 就不会再提交这个文件，从而远程仓库的该文件也会被删除

### 6、将本地新建的项目上传到新建的远程仓库上

之前没有进行过关联，即没有通过 clone 远程项目到本地再开始做项目，而是先本地新建了一个项目，然后想传到远程仓库上。

```bash
# 将本地仓库和远程仓库关联起来
$ git remote add origin 远程仓库地址
# 将本地的 master 分支推送到 origin 主机，同时指定 origin 为默认主机
$ git push -u origin master
# 上面的命名执行后，下次再从本地库上传内容的时候只需下面这样就可以了
$ git push
```

### 7、HEAD 指针既可以指向分支（默认指向当前分支），也可以指向快照，当指向的是快照时，这个时候指针的状态称之为游离状态（detached）

### 8、创建与合并分支的原理

[www.liaoxuefeng.com/wiki/896043…](https://www.liaoxuefeng.com/wiki/896043488029600/900003767775424)

### 9、每次 git push 都要输入用户名、密码

- step 1：生成公钥

```bash
ssh-keygen -t rsa -C "xxxxx@xxxxx.com"  
# Generating public/private rsa key pair...
# 三次回车即可生成 ssh key
```

- step 2：查看已生成的公钥

```bash
cat ~/.ssh/id_rsa.pub
```

- step3：复制已生成的公钥添加到 git 服务器

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggwkt3f0fnj30uq0jlmz9.jpg)

测试 ssh 是否能够连接成功

```bash
$ ssh -T git@github.com
```

- step4：使用 ssh 协议 clone 远程仓库 或者 如果已经用 https 协议 clone 到本地了，那么就重新设置远程仓库

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggwktdqhs1j30e906tmxt.jpg)

**使用 ssh 协议**

```bash
$ git remote set-url origin git@xxx.com:xxx/xxx.git
```

- step5：创建文件存储用户名和密码

一般为 C:\users\Administrator，也可以是你自己创建的系统用户名目录，文件名为 .git-credentials。由于在 Windows 中不允许直接创建以 "." 开头的文件，所以用命令行创建该文件。

```bash
$ touch .git-credentials
$ echo "http://{username}:{password}@github.com" >> ~/.git-credentials 
$ git config --global credential.helper store
```

### 10、git 不允许提交空文件夹

可以在当前目录下，添加一个 .gitkeep 文件

### 11、有时候复制过来的文件，使用 `git add .` 无法进行文件追踪，可以使用 `git add -A` ，这也就是每次提交前都要 `git status` 的原因

### 12、[同一台电脑配置多个 git 账号](https://github.com/jawil/notes/issues/2#)

[github.com/jawil/notes…](https://github.com/jawil/notes/issues/2)

### 13、Another git process seems to be running in this repository, e.g.

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggwkuj93z2j30k403a756.jpg)

原因在于 Git 在使用过程中遭遇了奔溃，部分被上锁资源没有被释放导致的。

**解决方案：** 进入项目文件夹下的 .git 文件中（显示隐藏文件夹或 `rm .git/index.lock`）删除 index.lock 文件即可。

### 14、git commit -am "xxx" 有时候会失效，无法提交所有的修改

`git commit -am "xxx"` 只会将被 **tracked** 的文件添加到暂存区并提交，而将文件添加到 git 管理是要使用 git add 命令，将新的文件 **tracked** 。（新建了文件之后，idea 会提示你是否需要加到 git 管理中。选择记住后，之后 idea 默认都会把新建的文件 **tracked** 化）

### 15、git merge --no-ff 的作用

- **禁止快进式（fast-forward）合并，会生成一个新的提交**

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggwkw0m90jj30hg0mttdi.jpg)

从合并后的代码来看，结果都是一样的，区别就在于 `--no-ff` 会让 git 生成一个新的提交对象。为什么要这样？通常我们把 master 作为主分支，上面存放的都是比较稳定的代码，提交频率也很低，而 feature 是用来开发特性的，上面会存在许多零碎的提交，快进式合并会把 feature 的提交历史混入到 master 中，搅乱 master 的提交历史。所以如果你根本不在意提交历史，也不爱管 master 干不干净，那么 `--no-ff` 其实没什么用。

[segmentfault.com/q/101000000…](https://segmentfault.com/q/1010000002477106)

### 16、git merge 与 git rebase 的区别

[juejin.im/post/5a5438…](https://juejin.im/post/5a54386af265da3e3b7a6317#heading-9)

[blog.csdn.net/liuxiaoheng…](https://blog.csdn.net/liuxiaoheng1992/article/details/79108233)

[segmentfault.com/a/119000001…](https://segmentfault.com/a/1190000012897637?utm_source=tag-newest#articleHeader0)

[segmentfault.com/a/119000001…](https://segmentfault.com/a/1190000018580144?utm_source=tag-newest)

### 17、git log 无法正常显示中文

```bash
# 试试
$ git -c core.pager=more log
# 如果可以显示中文的话，把 pager 设置为 more
$ git config --global core.pager more
```

[www.zhihu.com/question/57…](https://www.zhihu.com/question/57162172)

[www.playpi.org/2019031901.…](https://www.playpi.org/2019031901.html)

### 18、git merge -m "xxx" 的时候可以附加信息

- 默认是 Merge branch branchName

**![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggwkx279zqj30g40atq52.jpg)**

### 19、git pull 会拉取所有远程分支的代码到本地镜像仓库中

想要 merge 别人的分支时：

- 如果你的本地仓库中已经有了他人的分支（直接切换到他人分支，就会在本地生成一条他人的分支），就可以使用 merge branchname；
- 如果你的本地仓库没有他人的分支，那么就得使用 merge origin/branchname 来合并

### 20、git branch -r/-a/-l 查看的都是本地镜像仓库中的分支，如果本地镜像仓库没有拉取远程仓库的代码，此时别人新推了一个分支到远程仓库，你这时候是查看不到这条新推的分支的

### 21、git stash 存储未追踪的文件

- 如果我们新建了文件，但是没有用 `git add .` 追踪文件，那么 `git stash` 是无法存储的

```bash
$ git stash -u
```

### 22、如何在 github 上 pr 项目

[segmentfault.com/a/119000002…](https://segmentfault.com/a/1190000020354906?utm_source=tag-newest)

### 23、git push 无法提交代码

**可能出现的报错：**

- **remote:** Permission to xxxxx.git denied to xxx. fatal: unable to access '[github.com/](https://github.com/) xxxxx.git/': The requested URL returned error: 403

- **remote:** You do not have permission to push to the repository via HTTPS

  **fatal:** Authentication failed for '[gitee.com/xxx.git/](https://gitee.com/xxx.git/)'

```bash
# 查看当前项目的 git 配置
$ cat .git/config
```

- 查看本地项目的 .git/config 设置的仓库 url 地址和 github 使用的链接地址是否一致。`git push` 的数据协议有两种方式：`ssh` 和 `https`。如果不一致就需要切换 `url` 地址。

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggwkyh84faj30ca05r74r.jpg)

### 24、git 输错用户名和密码，后续的 git 操作一直报错

```bash
remote: Coding 提示: Authentication failed.
remote: 认证失败，请确认您输入了正确的账号密码。
fatal: Authentication failed for 'https://e.coding.net/xxx.git/'
```

在控制面板里找到凭据管理器，选中 Windows 凭据，找到 git 的凭据，点击编辑，输入所用 github 的正确用户名和密码。

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggwl0824whj30v70hl76o.jpg)

### 25、lint-staged 失败


![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggwl0ndtpsj30s608habe.jpg)

可能你的项目名路径中包含了中文名，需要替换成英文名

### 26、查看 git 安装目录

- **Mac：** 在命令行中输入 `which git`，就会显示 git 的安装位置了
- **Windows：** 打开cmd，输入 `where git`，就会显示 git 的安装路径了

### 27、[Git中用vim打开、修改、保存文件](https://www.cnblogs.com/hezhiyao/p/9418468.html)

### 28、[windows10 无法编辑 vimrc](https://jingyan.baidu.com/article/a3a3f8111d9ffb8da2eb8aff.html)

### 29、[Windows下Git Bash中VIM打开文件中文乱码](https://www.cnblogs.com/MisterZZL/p/10783097.html)

### 30、如何修改旧的 commit 的 message/如何将多个 commit 合成一个 commit/如何将多个间隔的 commit 合成一个 commit/

```bash
git rebase -i
```

### 31、如果两个人都对某个文件进行了修改，一个是重命名文件，一个是修改文件内容，那么会起冲突吗？git 很智能，会自动合并这些修改

如果两个人都对同一个文件重命名，此时会起冲突，git 不会自动处理，需要开发者自身去解决冲突

### 32、git revert 失败：error: Commit faulty merge is a merge but no -m option was given、error: option `mainline' expects a number greater than zero

[segmentfault.com/a/119000001…](https://segmentfault.com/a/1190000015792394?utm_source=tag-newest#item-3)

[www.jianshu.com/p/3719dae37…](https://www.jianshu.com/p/3719dae37a92)

```
git revert -m 1 
```

### 33、[git 创建一个空的分支](https://www.jianshu.com/p/a18487d987ac)

在 Git 中创建分支，是必须有一个父节点的，也就是说必须在已有的分支上来创建新的分支，如果工程已经进行了一段时间，这个时候是无法创建空分支的。但是有时候就是需要创建一个空白的分支。

```bash
$ git checkout --orphan emptyBranchName
```

该命令会生成一个叫 `emptybranch` 的分支，该分支会包含父分支的所有文件。但新的分支不会指向任何以前的提交，就是它没有历史，如果你提交当前内容，那么这次提交就是这个分支的首次提交。

想要空分支，所以需要把当前内容全部删除，用 git 命令

```bash
$ git rm -rf . // 注意：最后的‘.’不能少。
```

### 34、如何清空一个分支的所有提交

先删除该分支，然后再新建一个空的分支（分支名就是删除的分支名）~~



## 参考

[**Git Book**](https://git-scm.com/book/zh/v2)

[**Pro Git（中文版）**](https://gitee.com/progit/index.html)

[**git-recipes**](https://github.com/geeeeeeeeek/git-recipes/wiki)

[**如何优雅地使用 Git**](https://juejin.im/post/5a54386af265da3e3b7a6317)

[**如何在大型项目中使用Git子模块开发**](https://juejin.im/post/5c1c5d305188256a272aa0ec)

**Github API 调用 (v3）**

[www.jianshu.com/p/a0c7d0482…](https://www.jianshu.com/p/a0c7d0482415)

[developer.github.com/v3/guides/g…](https://developer.github.com/v3/guides/getting-started/)