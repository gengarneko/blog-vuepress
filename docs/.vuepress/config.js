module.exports = {
  title: '绅士喵呜的技术博客',
  description: 'Just playing around',
  themeConfig: {
    lastUpdated: 'Last Updated', // string | boolean
    nav: [
      { text: 'Home', link: '/' },
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
  plugins: [
    '@vuepress/active-header-links',
    '@vuepress/back-to-top',
    // '@vuepress/nprogress'
  ]
}