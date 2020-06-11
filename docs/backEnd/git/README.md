---
title: Git 基本操作
sidebar: auto
date: 2020-05-15
categories:
 - backEnd
tags:
 - tools
---

## 1. git简介

在实际开发中，会使用git作为版本控制工具来完成团队协作。因此，对基本的git操作指令进行总结是十分有必要的，本文对一些术语或者理论基础，不重新码字，可以[参考廖雪峰老师的博文](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)，本文只对命令做归纳总结。

git的通用操作流程如下图（来源于网络）



![git操作通用流程](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfnbahh0dlj30wk09gjss.jpg)



主要涉及到四个关键点：

1. 工作区：本地电脑存放项目文件的地方，比如learnGitProject文件夹；
2. 暂存区（Index/Stage）：在使用git管理项目文件的时候，其本地的项目文件会多出一个.git的文件夹，将这个.git文件夹称之为版本库。其中.git文件夹中包含了两个部分，一个是暂存区（Index或者Stage）,顾名思义就是暂时存放文件的地方，通常使用add命令将工作区的文件添加到暂存区里；
3. 本地仓库：.git文件夹里还包括git自动创建的master分支，并且将HEAD指针指向master分支。使用commit命令可以将暂存区中的文件添加到本地仓库中；
4. 远程仓库：不是在本地仓库中，项目代码在远程git服务器上，比如项目放在github上，就是一个远程仓库，通常使用clone命令将远程仓库拷贝到本地仓库中，开发后推送到远程仓库中即可；

更细节的来看：



![git几个核心区域间的关系](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfnbav8kitj30lj0ar75l.jpg)



日常开发时代码实际上放置在工作区中，也就是本地的XXX.java这些文件，通过add等这些命令将代码文教提交给暂存区（Index/Stage），也就意味着代码全权交给了git进行管理，之后通过commit等命令将暂存区提交给master分支上，也就是意味打了一个版本，也可以说代码提交到了本地仓库中。另外，团队协作过程中自然而然还涉及到与远程仓库的交互。

因此，经过这样的分析，git命令可以分为这样的逻辑进行理解和记忆：

1. git管理配置的命令；

   **几个核心存储区的交互命令：**

2. 工作区与暂存区的交互；

3. 暂存区与本地仓库（分支）上的交互；

4. 本地仓库与远程仓库的交互。

## 2. git配置命令

> 查询配置信息

1. 列出当前配置：`git config --list`;
2. 列出repository配置：`git config --local --list`;
3. 列出全局配置：`git config --global --list`;
4. 列出系统配置：`git config --system --list`;

> 第一次使用git，配置用户信息

1. 配置用户名：`git config --global user.name "your name"`;
2. 配置用户邮箱：`git config --global user.email "youremail@github.com"`;

> 其他配置

1. 配置解决冲突时使用哪种差异分析工具，比如要使用vimdiff：`git config --global merge.tool vimdiff`;
2. 配置git命令输出为彩色的：`git config --global color.ui auto`;
3. 配置git使用的文本编辑器：`git config --global core.editor vi`;

## 3. 工作区上的操作命令

> 新建仓库

1. 将工作区中的项目文件使用git进行管理，即创建一个新的本地仓库：`git init`；
2. 从远程git仓库复制项目：`git clone <url>`，如：git clone git://github.com/wasd/example.git;克隆项目时如果想定义新的项目名，可以在clone命令后指定新的项目名：`git clone git://github.com/wasd/example.git mygit`；

> 提交

1. 提交工作区所有文件到暂存区：`git add .`
2. 提交工作区中指定文件到暂存区：`git add <file1> <file2> ...`;
3. 提交工作区中某个文件夹中所有文件到暂存区：`git add [dir]`;

> 撤销

1. 删除工作区文件，并且也从暂存区删除对应文件的记录：`git rm <file1> <file2>`;
2. 从暂存区中删除文件，但是工作区依然还有该文件:`git rm --cached <file>`;
3. 取消暂存区已经暂存的文件：`git reset HEAD <file>...`;
4. 撤销上一次对文件的操作：`git checkout --<file>`。要确定上一次对文件的修改不再需要，如果想保留上一次的修改以备以后继续工作，可以使用stashing和分支来处理；
5. 隐藏当前变更，以便能够切换分支：`git stash`；
6. 查看当前所有的储藏：`git stash list`；
7. 应用最新的储藏：`git stash apply`，如果想应用更早的储藏：`git stash apply stash@{2}`；重新应用被暂存的变更，需要加上`--index`参数：`git stash apply --index`;
8. 使用apply命令只是应用储藏，而内容仍然还在栈上，需要移除指定的储藏：`git stash drop stash{0}`；如果使用pop命令不仅可以重新应用储藏，还可以立刻从堆栈中清除：`git stash pop`;
9. 在某些情况下，你可能想应用储藏的修改，在进行了一些其他的修改后，又要取消之前所应用储藏的修改。Git没有提供类似于 stash unapply 的命令，但是可以通过取消该储藏的补丁达到同样的效果：`git stash show -p stash@{0} | git apply -R`；同样的，如果你沒有指定具体的某个储藏，Git 会选择最近的储藏：`git stash show -p | git apply -R`；

> 更新文件

1. 重命名文件，并将已改名文件提交到暂存区：`git mv [file-original] [file-renamed]`;

> 查新信息

1. 查询当前工作区所有文件的状态：`git status`;
2. 比较工作区中当前文件和暂存区之间的差异，也就是修改之后还没有暂存的内容：git diff；指定文件在工作区和暂存区上差异比较：`git diff <file-name>`;

## 4. 暂存区上的操作命令

> 提交文件到版本库

1. 将暂存区中的文件提交到本地仓库中，即打上新版本：`git commit -m "commit_info"`;
2. 将所有已经使用git管理过的文件暂存后一并提交，跳过add到暂存区的过程：`git commit -a -m "commit_info"`;
3. 提交文件时，发现漏掉几个文件，或者注释写错了，可以撤销上一次提交：`git commit --amend`;

> 查看信息

1. 比较暂存区与上一版本的差异：`git diff --cached`;
2. 指定文件在暂存区和本地仓库的不同：`git diff <file-name> --cached`;
3. 查看提交历史：git log；参数`-p`展开每次提交的内容差异，用`-2`显示最近的两次更新，如`git log -p -2`;

> 打标签

Git 使用的标签有两种类型：**轻量级的（lightweight）和含附注的（annotated）**。轻量级标签就像是个不会变化的分支，实际上它就是个指向特定提交对象的引用。而含附注标签，实际上是存储在仓库中的一个独立对象，它有自身的校验和信息，包含着标签的名字，电子邮件地址和日期，以及标签说明，标签本身也允许使用 GNU Privacy Guard (GPG) 来签署或验证。一般我们都建议使用含附注型的标签，以便保留相关信息；当然，如果只是临时性加注标签，或者不需要旁注额外信息，用轻量级标签也没问题。

1. 列出现在所有的标签：`git tag`;
2. 使用特定的搜索模式列出符合条件的标签，例如只对1.4.2系列的版本感兴趣：`git tag -l "v1.4.2.*"`;
3. 创建一个含附注类型的标签，需要加`-a`参数，如`git tag -a v1.4 -m "my version 1.4"`;
4. 使用git show命令查看相应标签的版本信息，并连同显示打标签时的提交对象：`git show v1.4`;
5. 如果有自己的私钥，可以使用GPG来签署标签，只需要在命令中使用`-s`参数：`git tag -s v1.5 -m "my signed 1.5 tag"`;
6. 验证已签署的标签：git tag -v ，如`git tag -v v1.5`;
7. 创建一个轻量级标签的话，就直接使用git tag命令即可，连`-a`,`-s`以及`-m`选项都不需要，直接给出标签名字即可，如`git tag v1.5`;
8. 将标签推送到远程仓库中：git push origin ，如`git push origin v1.5`；
9. 将本地所有的标签全部推送到远程仓库中：`git push origin --tags`;

> 分支管理

1. 创建分支：`git branch <branch-name>`，如`git branch testing`；
2. 从当前所处的分支切换到其他分支：`git checkout <branch-name>`，如`git checkout testing`；
3. 新建并切换到新建分支上：`git checkout -b <branch-name>`;
4. 删除分支：`git branch -d <branch-name>`；
5. 将当前分支与指定分支进行合并：`git merge <branch-name>`;
6. 显示本地仓库的所有分支：`git branch`;
7. 查看各个分支最后一个提交对象的信息：`git branch -v`;
8. 查看哪些分支已经合并到当前分支：`git branch --merged`;
9. 查看当前哪些分支还没有合并到当前分支：`git branch --no-merged`;
10. 把远程分支合并到当前分支：`git merge <remote-name>/<branch-name>`，如`git merge origin/serverfix`；如果是单线的历史分支不存在任何需要解决的分歧，只是简单的将HEAD指针前移，所以这种合并过程可以称为快进（Fast forward），而如果是历史分支是分叉的，会以当前分叉的两个分支作为两个祖先，创建新的提交对象；如果在合并分支时，遇到合并冲突需要人工解决后，再才能提交；
11. 在远程分支的基础上创建新的本地分支`：git checkout -b <branch-name> <remote-name>/<branch-name>`，如`git checkout -b serverfix origin/serverfix`;
12. 从远程分支checkout出来的本地分支，称之为跟踪分支。在跟踪分支上向远程分支上推送内容：`git push`。该命令会自动判断应该向远程仓库中的哪个分支推送数据；在跟踪分支上合并远程分支：`git pull`；
13. 将一个分支里提交的改变移到基底分支上重放一遍：`git rebase <rebase-branch> <branch-name>`，如`git rebase master server`，将特性分支server提交的改变在基底分支master上重演一遍；使用rebase操作最大的好处是像在单个分支上操作的，提交的修改历史也是一根线；如果想把基于一个特性分支上的另一个特性分支变基到其他分支上，可以使用`--onto`操作：`git rebase --onto <rebase-branch> <feature branch> <sub-feature-branch>`，如`git rebase --onto master server client`；使用rebase操作应该遵循的原则是：**一旦分支中的提交对象发布到公共仓库，就千万不要对该分支进行rebase操作**；

## 5.本地仓库上的操作

1. 查看本地仓库关联的远程仓库：`git remote`；在克隆完每个远程仓库后，远程仓库默认为`origin`;加上`-v`的参数后，会显示远程仓库的`url`地址；
2. 添加远程仓库，一般会取一个简短的别名：`git remote add [remote-name] [url]`，比如：`git remote add example git://github.com/example/example.git`;
3. 从远程仓库中抓取本地仓库中没有的更新：`git fetch [remote-name]`，如`git fetch origin`;使用fetch只是将远端数据拉到本地仓库，并不自动合并到当前工作分支，只能人工合并。如果设置了某个分支关联到远程仓库的某个分支的话，可以使用`git pull`来拉去远程分支的数据，然后将远端分支自动合并到本地仓库中的当前分支；
4. 将本地仓库某分支推送到远程仓库上：`git push [remote-name] [branch-name]`，如`git push origin master`；如果想将本地分支推送到远程仓库的不同名分支：`git push <remote-name> <local-branch>:<remote-branch>`，如`git push origin serverfix:awesomebranch`;如果想删除远程分支：`git push [romote-name] :<remote-branch>`，如`git push origin :serverfix`。这里省略了本地分支，也就相当于将空白内容推送给远程分支，就等于删掉了远程分支。
5. 查看远程仓库的详细信息：`git remote show origin`；
6. 修改某个远程仓库在本地的简称：`git remote rename [old-name] [new-name]`，如`git remote rename origin org`；
7. 移除远程仓库：`git remote rm [remote-name]`；

## 6. 忽略文件.gitignore

一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。我们可以创建一个名为 .gitignore 的文件，列出要忽略的文件模式。如下例：

```
# 此为注释 – 将被 Git 忽略
# 忽略所有 .a 结尾的文件
*.a
# 但 lib.a 除外
!lib.a
# 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
/TODO
# 忽略 build/ 目录下的所有文件
build/
# 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
doc/*.txt
# 忽略 doc/ 目录下所有扩展名为 txt 的文件
doc/**/*.txt
复制代码
```

> 参考资料

[非常详细准确的git学习资料](https://git-scm.com/book/zh/v1/起步-关于版本控制)；

[git-cheat-sheet中文版](https://github.com/flyhigher139/Git-Cheat-Sheet#配置)

[命令总结，资料一般，不够详细，作参考](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)

[常用命令很全](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)



## Git 操作手册

用 git 三个月，你就自然理解 git 了。不要试图一开始就理解 git！


## 配置 GitHub

1. 进入 <https://github.com/settings/keys>
2. 如果页面里已经有一些 key，就点「delete」按钮把这些 key 全删掉。如果没有，就往下看
3. 点击 New SSH key，你需要输入 Title 和 Key，但是你现在没有 key，往下看
4. 打开 Git Bash
5. 复制并运行 `rm -rf ~/.ssh/*` 把现有的 ssh key 都删掉，这句命令行如果你多打一个空格，可能就要重装系统了，建议复制运行。
6. 运行 `ssh-keygen -t rsa -b 4096 -C "你的邮箱"`，注意填写你的邮箱！
7. 按回车三次
8. 运行 `cat ~/.ssh/id_rsa.pub`，得到一串东西，完整的复制这串东西
9. 回到上面第 3 步的页面，在 Title 输入「我的第一个 key」
10. 在 Key 里粘贴刚刚你你复制的那串东西
11. 点击 Add SSH key
12. 回到 Git Bash
13. 运行 `ssh -T git@github.com`，你可能会看到这样的提示：![å¾ç](https://video.jirengu.com/FtfPAJz5jxIhUopvXPmHMAbsolXM)输入 yes 回车……问你话你就答，别傻在那
14. 然后如果你看到 `Permission denied (publickey).` 就说明你失败了，请回到第 1 步重来，是的，回到第 1 步重来；如果你看到 `Hi FrankFang! You've successfully authenticated, but GitHub does not provide shell access.` 就说明你成功了！

好了，终于 TMD 添加了一个无聊的 SSH key，不要问我这个有什么用，因为一会儿你就会用到它，你想了解原理就看这篇 [文章](http://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html)

如果要讲清楚，太浪费时间了，我们只是想用用 GitHub 而已。

- 一台电脑只需要一个 SSH key
- 一个 SSH key 可以访问你的所有仓库，即使你有 1000000 个仓库，都没问题
- 如果你新买了电脑，就在新电脑上重新生成一个 SSH key，把这个 key 也上传到 GitHub，它可以和之前的 key 共存在 GitHub 上
- 如果你把 key 从电脑上删除了，重新生成一个 key 即可，替换之前的 key



## 配置 Git

```bash
// 英文名，不需要跟 GitHub 保持一致
git config --global user.name
// 邮箱，不需要跟 GitHub 保持一致
git config --global user.email
git config --global push.default matching
git config --global core.quotepath false
git config --global core.editor "vim"
```

五句话，依次在命令行中运行（其中前两句要把中文改成对应的内容）。
一定要执行这五行！！！
一定要执行这五行！！！
一定要执行这五行！！！



## 使用 Git

使用 git 有三种方式，请按照你的需求选择

1. 只在本地使用
2. 将本地仓库上传到 GitHub
3. 下载 GitHub 上的仓库

## 1 只在本地使用

### 1.1 初始化

1. 创建目录作为我们的项目目录：`mkdir git-demo-1`

2. 进入目录 `cd git-demo-1`

3. `git init`，这句命令会在 git-demo-1 里创建一个 .git 目录

4. `ls -la` 你就会看到 .git 目录，它就是一个「仓库」，不要进去看，这仓库里面有毒，别进去！

5. 在 git-demo-1 目录里面添加任意文件，假设我们添加了两个文件，分别是 index.html 和 css/style.css

   1. `touch index.html`
   2. `mkdir css`
   3. `touch css/style.css`

6. 运行

     

   ```
   git status -sb
   ```

    

   可以看到文件前面有 ?? 号

   ```
    ## Initial commit on master
    ?? css/
    ?? index.html
   ```

   这个 ?? 表示 git 一脸懵逼，不知道你要怎么对待这些变动。

7. 使用 git add 将文件添加到「暂存区」

   1. 你可以一个一个地 add
      1. `git add index.html`
      2. `git add css/style.css`
   2. 你也可以一次性 add
      1. `git add .` 意思是把当前目录（.表示当前目录）里面的变动都加到「暂存区」

8. 再次运行

     

   ```
   git status -sb
   ```

   ，可以看到 ?? 变成了 A

   ```
    ## Initial commit on master
    A  css/style.css
    A  index.html
   ```

   A 的意思就是添加，也就是说你告诉 git，这些文件我要加到仓库里

9. 使用 git commit -m "信息" 将你 add 过的内容「正式提交」到本地仓库（.git就是本地仓库），并添加一些注释信息，方便日后查阅

   1. 你可以一个一个地 commit
      1. `git commit index.html -m '添加index.html'`
      2. `git commit css/style.css -m "添加 css/style.css"`
   2. 你也可以一次性 commit
      1. `git commit . -m "添加了几个文件"`

10. 再再次运行 `git status -sb`，发现没有文件变动了，这是因为文件的变动已经记录在仓库里了。

11. 这时你使用 git log 就可以看到历史上的变动：

    ```
     commit f0d95058cd32a332b98967f6c0a701c64a00810a
     Author: frankfang <frankfang1990@gmail.com>
     Date:   Thu Sep 28 22:30:43 2017 +0800
    
         添加几个文件
    ```

12. 以上就是 git add / git commit 的一次完整过程，可以看到，挺复杂的。原则上，你错了任何一步，就给我从头来一遍，做到你不会再手抖为止。

### 1.2 文件变动

如果我想继续改文件，应该怎么做呢？

1. `start css/style.css` 会使用默认的编辑器打开 css/style.css（macOS 上对应的命令是 `open css/style.css`）

2. 然后我们在 css/style.css 里写入 `body {background: red}`，保存退出

3. 运行

   ```
   git status -sb
   ```

   发现提示中有一个 M

   ```
    ## master
    M css/style.css
   ```

   这个 M 的意思就是 Modified，表示这个文件被修改了

4. 此时你如果想让改动保存到仓库里，你需要先 `git add css/style.css` 或者也可以 `git add .`
   注意，由于这个 css/style.css 以前被我们 add 过，你往文章上面看，我们是 add 过 css/style.css 的，所以此处的 git add 操作可以省略，但我建议你使用 git 的前一个月，不要省略 git add。
   换句话说，每一次改动，都要经过 git add 和 git commit 两个命令，才能被添加到 .git 本地仓库里。

5. 再次运行 `git status -sb` 发现 M 有红色变成了绿色，红色和绿色有啥区别呢？别管它们的区别，记住我说的，先 add，再 commit，等你熟练之后再去理解区别。
   先形成肌肉记忆，在去形成大脑记忆！

6. 运行 `git commit -m "更新 css/style.css"`，这个改动就被提交到 .git 本地仓库了。再说一次，不要去 .git 目录里面，那里的东西你一无所知。

7. 再再次运行 `git status -sb`，会发现没有变更了，这说明所有变动都被本地仓库记录在案了。
   这里来透露一下 `git status -sb` 是什么意思：git status 是用来显示当前的文件状态的，哪个文件变动了，方便你进行 git add 操作。-sb 选项的意思就是，SB都能看懂，哈，这是开玩笑，-s 的意思是显示总结（summary），-b 的意思是显示分支（branch），所以 -sb 的意思是显示总结和分支。

### 1.3 总结

至此，我们来总结一下用到的命令

1. git init，初始化本地仓库 .git
2. git status -sb，显示当前所有文件的状态
3. git add 文件路径，用来将变动加到暂存区
4. git commit -m "信息"，用来正式提交变动，提交至 .git 仓库
5. 如果有新的变动，我们只需要依次执行 git add xxx 和 git commit -m 'xxx' 两个命令即可。别看本教程废话那么多，其实就这一句有用！先 add 再 commit，行了，你学会 git 了。
6. git log 查看变更历史



## 2 将本地仓库上传到 GitHub

如何将我们这个 git-demo-1 上传到 GitHub 呢？

1. 在 GitHub 上新建一个空仓库，名称随意，一般可以跟本地目录名一致，也叫做 git-demo-1

   ![图片](https://video.jirengu.com/FqewHjBnXJH9_TAeV_JaC3gGVFsT)图片

   按照截图所示，除了仓库名，其他的什么都别改，其他的什么都别改，其他的什么都别改，其他的什么都别改，这样你才能创建一个空仓库

2. 点击创建按钮之后，GitHub 就会把后续的操作全告诉你，如图

   ![请点击一下 ssh](https://video.jirengu.com/FgSx1eQUaegh4mZBfyz5h9SrlBkZ)请点击一下 ssh

   ![图片](https://video.jirengu.com/Fta476rO6oPJIgxbIec8vINTZV3E)图片

3. 看图，点击 SSH 按钮，点击 SSH 按钮，点击 SSH 按钮，我想你现在肯定不会忘了点击 SSH 按钮了吧~~~~如果不点击这个按钮，你就会使用默认的 HTTPS 地址。但是千万不要使用 HTTPS 地址，因为 HTTPS 地址使用起来特别麻烦，每次都要输入密码，而 SSH 不用输入用户名密码。
   为什么 SSH 不用密码呢，因为你已经上传了 SSH public key。还记得吗？如果不记得，翻到本文第一部分「配置 GitHub」章节。

4. 由于我们已经有本地仓库了，所以看图，图中下面半部分就是你需要的命令，我们一行一行拷贝过来执行

   1. 找到图中的「…or push an existing repository from the command line」这一行，你会看到 `git remote add origin https://github.com/xxxxxxxxxx/git-demo-1.git`， 如果你发现这个地址是 https 开头的，那你就做错了，还记得吗，我们要使用 SSH 地址，GitHub 的 SSH 地址是以 [git@github.com](mailto:git@github.com) 开头的。
   2. 再次点击 SSH 按钮，不管我强调多少遍，总会有人忘记点击 SSH 按钮，为什么呢？我也不知道，为了防止你忘了点击 SSH 按钮，我最后再说一遍，「点击 SSH按钮」，点击之后，整个世界就会变得美好起来。
   3. 得到新的命令 `git remote add origin git@github.com:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/git-demo-1.git`，复制并运行它
   4. 复制第二行 `git push -u origin master`，运行它
   5. 刷新当前页面，你的仓库就上传到 GitHub 了！是不是特别简单？只要你按照我说的做，一丝不苟，即可。

## 3 直接在 GitHub 创建一个仓库，然后下载到本地

上面两步讲了

1. 在本地创建仓库
2. 将本地仓库上传到 GitHub

这里将第三种用法，那就是直接在 GitHub 创建一个仓库，然后下载到本地。

1. 在GitHub 上新建一个仓库 git-demo-2，这次就不创建空仓库了，而是自带 README 和 Lisence 的仓库，创建截图如下：

   ![图片](https://video.jirengu.com/FkftOFnWOoe3W6SKetIjskFZun1p)图片

   请按图中所示，填写一模一样的内容，然后点击创建按钮。

2. 这样一来，这个仓库就会自动拥有三个文件：

   ![图片](https://video.jirengu.com/Fu9RkaJOnFfck51jJRwZyL-ImVxC)图片

3. 这三个文件的作用请自行了解：[.gitignore 的作用](http://gitbook.liuhui998.com/4_1.html)、[README.md 的作用](http://www.jianshu.com/p/94406f5d9b46) 以及 [LISENCE 的作用](http://www.ruanyifeng.com/blog/2011/05/how_to_choose_free_software_licenses.html)

4. 好了，现在远程仓库已经创建好了，怎么下载到我们的本地（也就是我们的电脑上）呢？答案是使用 git clone 命令

5. 点击页面中唯一的绿色按钮「clone or download」，会看到一个弹出层

   ![图片](https://video.jirengu.com/Fh5OogA65vQk3_r78zxMNhb7pWYW)图片

6. 请确保弹出层里的地址是 SSH 地址，也就是 [git@github.com](mailto:git@github.com) 开头的地址，如果不是，就点击 Use SSH 按钮，就点击 Use SSH 按钮，就点击 Use SSH 按钮。然后复制这个地址。

7. 打开 Git Bash，找一个安全的目录，比如 ~/Desktop 桌面目录就很安全：`cd ~/Desktop`。运行。

8. 运行 `git clone 你刚才得到的以git@github.com开头的地址`，运行完了你就会发现，桌面上多出一个 git-demo-2 目录。我再说一遍，桌面上多出一个 git-demo-2 目录。我再说一遍，桌面上多出一个 git-demo-2 目录。这个细节很重要，很多小白发现不了这个细节，我也不知道他们是眼瞎还是怎么了……

9. 进入这个多出来的目录，对的，你肯定会忽略这一步。

10. 进入这个多出来的目录，对的，你肯定会忽略这一步。

11. 进入这个多出来的目录，对的，你肯定会忽略这一步。

12. 好了你进入了这个目录了，如果没有，我就要吐血了，因为我的提示很明显。

13. 运行 `ls -la` 你会看到，远程目录的所有文件都在这里出现了，另外你还看到了 .git 本地仓库。这是你就可以添加文件，git add，然后 git commit 了。

三种方式都说完了，它们分别是：

1. 在本地创建仓库
2. 将本地仓库上传到 GitHub
3. 下载 GitHub 上的仓库到本地

其实呢，我还可以说很多种不同的方式，但是，你记住这几种就行了，够你用的了。我们并不想要了解 git 的所有高级用法，我们的目的很明确：能通过 Git 命令使用 GitHub 就行。

我们再回顾一遍已经学到的命令：（这次只多了一个 git clone 命令）

1. git clone [git@github.com](mailto:git@github.com):xxxx，下载仓库
2. git init，初始化本地仓库 .git
3. git status -sb，显示当前所有文件的状态
4. git add 文件路径，用来将变动加到暂存区
5. git commit -m "信息"，用来正式提交变动，提交至 .git 仓库
6. 如果有新的变动，我们只需要依次执行 git add xxx 和 git commit -m 'xxx' 两个命令即可。别看本教程废话那么多，其实就这一句有用！先 add 再 commit，行了，你学会 git 了。
7. git log 查看变更历史

## 如何上传更新

你在本地目录有任何变动，只需按照以下顺序就能上传：

1. git add 文件路径
2. git commit -m "信息"
3. git pull （相信我，你一定会忘记这一个命令）
4. git push

下面是例子

1. `cd git-demo-1`
2. `touch index2.html`
3. `git add index2.html`
4. `git commit -m "新建 index2.html"`
5. `git pull`
6. `git push`

然后你去 git-demo-1 的 GitHub 页面，就能看到 index2.html 出现在里面了。是不是很……简……单……呢……

## git ignore

在项目目录创建 .gitignore 文件就可以指定「哪些文件不上传到远程仓库」，比如

.gitignroe

```
/node_modules/
/.vscode/
```

这样就可以避免 node_modules/ 和 .vscode/ 目录被上传到 github 了。

## 记住一句话：永远都不要上传 node_modules 到 github。

如果你想防止自己手贱上传 node_modules 到 github ，可以：

1. 在项目根目录 touch .gitignore
2. 在 .gitignore 里添加一行 `/node_modules/`
3. git add .gitignore; git commit -m 'ignore'

## 其他

还有一些有用的命令

- `git remote add origin git@github.com:xxxxxxx.git` 将本地仓库与远程仓库关联
- `git remote set-url origin git@github.com:xxxxx.git` 上一步手抖了，可以用这个命令来挽回
- `git branch` 新建分支
- `git merge` 合并分支
- `git stash` 通灵术
- `git stash pop` 反转通灵术
- `git revert` 后悔了
- `git reset` 另一种后悔了
- `git diff` 查看详细变化

学 git 命令都够你们学一周的，所以别妄想现在就掌握它，切记。

## 如果你发现 git 下载速度很慢

你可以看这篇教程 <https://jscode.me/t/topic/789>

## 资源

- [常用 Git 命令清单](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)
- [读懂 diff - 阮一峰](http://www.ruanyifeng.com/blog/2012/08/how_to_read_diff.html)
- [搭建一个免费的，无限流量的Blog----github Pages和Jekyll入门](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html)
- [Git 菜鸟教程](http://www.runoob.com/git/git-install-setup.html)
- [廖雪峰的 Git 教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013743256916071d599b3aed534aaab22a0db6c4e07fd0000)

