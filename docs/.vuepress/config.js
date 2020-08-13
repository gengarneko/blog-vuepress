// const nav = require('./utils/nav.js')
// var { cssSidebar,webpackSidebar } = nav

// webpack目录结构
// const webpackSidebar = {
//   title: 'Webpack',
//   collapsable: false,
//   children: [
//     '/webpack/',
//     '/webpack/source.md',
//     '/webpack/install.md',
//     '/webpack/start.md',
//     '/webpack/static.md',
//     '/webpack/core.md',
//     '/webpack/advanced.md',
//     '/webpack/case.md',
//     '/webpack/optimization.md',
//     '/webpack/loader.md',
//     '/webpack/plugin.md'
//   ]
// }


module.exports = {
  title: '绅士喵呜的技术博客',
  description: '  ',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  // theme: 'vuepress-theme-koala',
  theme: 'reco',
  themeConfig: {
    // author
    author: 'hentaimiao',
    // theme-reco 配置
    sidebar: 'auto', //在所有页面中启用自动生成侧栏
    sidebarDepth: 6,
    authorAvatar: '/avatar.jpg',
    type: 'blog',
    blogConfig: {
      category: {
        location: 1,     // 在导航栏菜单中所占的位置，默认2
        text: '分类' // 默认文案 “分类”
      },
      tag: {
        location: 2,     // 在导航栏菜单中所占的位置，默认3
        text: '标签'      // 默认文案 “标签”
      }
    },
    noFoundPageByTencent: false,
    // 官方配置
    lastUpdated: '最终更新于',
    repo: 'hentai-miao/blog-vuepress',
    editLinks: true,
    editLinkText: '编辑此页面',
    docsDir: 'docs',
    nav: [
      { 
        text: '前端学习',
        items: [
          { 
            text: '基础',
            items: [
              { text: 'HTML', link: '/frontEnd/html/' },
              { text: 'CSS', link: '/frontEnd/css/' },
              { text: 'JS', link: '/frontEnd/js/' },
              { text: 'ES6', link: '/frontEnd/es6/' },
            ]
          },
          { 
            text: '动画',
            items: [
              { text: 'GreenSock', link: '/frontEnd/greensock/' },
            ]
          },
          { 
            text: '框架',
            items: [
              { text: 'Vue', link: '/frontEnd/vue/' },
              { text: 'React', link: '/frontEnd/react/' }
            ]
          },
          { 
            text: '其他',
            items: [
              { text: 'Axios', link: '/frontEnd/axios/' },
              { text: 'TypeScript', link: '/frontEnd/TypeScript/' },
              { text: 'Webpack', link: '/webpack/' }
            ]
          },
          
        ] 
      },
      { 
        text: '后端探索',
        items: [
          { text: 'http', link: '/backEnd/http/' },
          { text: 'node', link: '/backEnd/node/' },
          { text: '其他', link: '/other/' }
        ] 
      },
      { 
        text: '软件开发',
        items: [
          { text: 'Git版本控制', link: '/backEnd/git/' },
          { text: '敏捷开发', link: '/development/agile/' },
        ] 
      },
      // { text: 'GitHub地址', link: 'https://github.com/hentai-miao' },
      // { text: '求职简历', link: 'http://hentaimiao.me/static-resume/' }
    ],
    sidebar: {
      '/frontEnd/axios/': [
        '', 'axios01'
      ],
      '/frontEnd/html/': [
        '','html01'
      ],
      '/frontEnd/css/': [
        '','css01','css02','css03','css04','css05','css06','css07','css08','css09','css10','css11',
      ],
      '/frontEnd/js/': [
        '','js01','js02','js03','js04','js05','js06','js07','js08','js09','js10','js11','js12','js13','js14','js15','js16','js17','js18','js19','js20','js21','js22',
      ],
      '/frontEnd/es6/': [
        '','es601','es602','es603','es604',
      ],
      '/frontEnd/TypeScript/': [
        '','ts01',
      ],
      '/frontEnd/react/': [
        '','react01',
      ],
      '/backEnd/git/': [
        '', 'git01',
      ],
      '/backEnd/http/': [
        '','http01','http02','http03','http04','http05','http06','http07',
      ],
      '/backEnd/node/': [
        '',
      ],
      '/webpack/': [{
        title: 'Webpack',
        collapsable: false,
        children: [
          '/webpack/',
          '/webpack/source.md',
          '/webpack/install.md',
          '/webpack/start.md',
          '/webpack/static.md',
          '/webpack/core.md',
          '/webpack/advanced.md',
          '/webpack/case.md',
          '/webpack/optimization.md',
          '/webpack/loader.md',
          '/webpack/plugin.md'
        ]
      }],
    }
  },
  // locales: {
  //   // 键名是该语言所属的子路径
  //   // 作为特例，默认语言可以使用 '/' 作为其路径。
  //   '/': {
  //     lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
  //     title: '绅士喵呜的 IT 博客',
  //     description: 'Vue 驱动的静态网站生成器'
  //   },
  //   '/en/': {
  //     lang: 'en-US',
  //     title: 'hentai-miao‘s blog',
  //     description: 'Vue-powered Static Site Generator'
  //   }
  // },
  plugins: [
    '@vuepress/active-header-links',
    '@vuepress/back-to-top',
    '@vuepress/nprogress'
  ]
}