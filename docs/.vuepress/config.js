module.exports = {
  title: '绅士喵呜的技术博客',
  description: 'Just playing around',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  // theme: 'vuepress-theme-koala',
  themeConfig: {
    lastUpdated: '最终更新于',
    repo: 'hentai-miao/blog-vuepress',
    editLinks: true,
    editLinkText: '编辑此页面',
    docsDir: 'docs',
    nav: [
      { text: '首页', link: '/' },
      { 
        text: '学习',
        items: [
          { 
            text: '前端',
            items: [
              { text: 'vue', link: '/vue/' },
              { text: 'react', link: '/react/' }
            ]
          },
          {
            text: '后端',
            items: [
              { text: 'php', link: '/php/' },
              { text: 'go', link: '/go/' }
            ]
          }
        ] 
      },
      { 
        text: '分享',
        items: [
          { text: '技术', link: '/jishu/' },
          { text: '每日分享', link: '/dailyShare/' }
        ] 
      },
      { text: '指南', link: '/guide/' },
      { text: 'GitHub', link: 'https://github.com/hentai-miao' },
      { text: '关于我', link: '/about/' }
    ],
    sidebar: {
      '//': [
        ''
      ],
      '/dailyShare/': [
        '',
        'daily1',
        'daily2'
      ],
      '/jishu/': [
        '',
        'jishu1',
        'jishu2'
      ]
    }
  },
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
      title: '绅士喵呜的 IT 博客',
      description: 'Vue 驱动的静态网站生成器'
    },
    '/en/': {
      lang: 'en-US',
      title: 'hentai-miao‘s blog',
      description: 'Vue-powered Static Site Generator'
    }
  },
  plugins: [
    '@vuepress/active-header-links',
    '@vuepress/back-to-top',
    '@vuepress/nprogress'
  ]
}