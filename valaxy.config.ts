import type { UserThemeConfig } from 'valaxy-theme-yun'
import { defineValaxyConfig } from 'valaxy'
import { addonWaline } from 'valaxy-addon-waline'
import { addonComponents, ValaxyThemesResolver } from 'valaxy-addon-components'
import { addonLive2d } from 'valaxy-addon-live2d'
// add icons what you will need
const safelist = [
  'i-ri-home-line',
]
/**
 * 定义使用特定主题及其设置的 Valaxy 博客配置。
 *
 * @template UserThemeConfig - 用户定义的主题配置的类型。
 *
 * @property theme - 指定要使用的主题名称。
 * @property themeConfig - 包含与所选主题相关的配置选项。
 * @property themeConfig.banner - 网站上显示的横幅配置。
 * @property themeConfig.banner.enable - 决定是否启用横幅。
 * @property themeConfig.banner.title - 横幅上显示的标题。
 * @property themeConfig.pages - 自定义页面及其相关配置的数组。
 * @property themeConfig.pages[].name - 自定义页面的名称。
 * @property themeConfig.pages[].url - 自定义页面的 URL 路径。
 * @property themeConfig.pages[].icon - 与自定义页面关联的图标。
 * @property themeConfig.pages[].color - 与自定义页面关联的颜色。
 * @property themeConfig.footer - 网站底部区域的配置。
 * @property themeConfig.footer.since - 网站自某年开始活跃。
 * @property themeConfig.footer.beian - ICP 备案信息的配置。
 * @property themeConfig.footer.beian.enable - 决定是否显示 ICP 备案信息。
 * @property themeConfig.footer.beian.icp - ICP 备案号。
 * @property markdown - Markdown 渲染器的配置。
 * @property markdown.theme - 指定 Markdown 渲染的浅色和深色模式的主题样式。
 * @property markdown.theme.light - 浅色模式使用的主题。
 * @property markdown.theme.dark - 深色模式使用的主题。
 * @property markdown.blocks - 自定义 Markdown 提示块（如提示、警告、危险等）的样式和内容。
 * @property markdown.blocks.tip - “提示”块的配置。
 * @property markdown.blocks.tip.icon - “提示”块显示的图标。
 * @property markdown.blocks.tip.text - “提示”块的默认文本。
 * @property markdown.blocks.tip.langs - “提示”块的语言特定文本。
 * @property markdown.blocks.warning - “警告”块的配置。
 * @property markdown.blocks.warning.icon - “警告”块显示的图标。
 * @property markdown.blocks.warning.text - “警告”块的默认文本。
 * @property markdown.blocks.danger - “危险”块的配置。
 * @property markdown.blocks.danger.icon - “危险”块显示的图标。
 * @property markdown.blocks.danger.text - “危险”块的默认文本。
 * @property markdown.blocks.info - “信息”块的配置。
 * @property markdown.blocks.info.text - “信息”块的默认文本。
 * @property markdown.codeTransformers - 用于处理代码块的代码转换器数组。
 * @property markdown.codeTransformers[].name - 代码转换器的名称。
 * @property markdown.codeTransformers[].preprocess - 在代码高亮处理之前预处理原始输入代码的函数。
 * @property markdown.codeTransformers[].tokens - 转换代码标记列表的函数。
 * @property markdown.codeTransformers[].root - 转换整个 HAST 树的函数。
 * @property markdown.codeTransformers[].pre - 转换 `<pre>` 元素的函数。
 * @property markdown.codeTransformers[].code - 转换 `<code>` 元素的函数。
 * @property markdown.codeTransformers[].line - 转换每个 `<span class="line">` 元素的函数。
 * @property markdown.codeTransformers[].span - 转换每个 `<span>` 元素的函数。
 * @property markdown.codeTransformers[].postprocess - 转换最终 HTML 字符串的函数。
 * @property markdown.config - 配置 Markdown 解析器的函数。
 * @property unocss - UnoCSS 的配置。
 * @property unocss.safelist - UnoCSS 的安全类名列表。
 * @property components - 自定义组件的配置。
 * @property vite - Vite 的配置。
 * @property addons - 用于扩展 Valaxy 功能的插件数组。
 * @property addons[].addonWaline - Waline 评论系统的配置。
 * @property addons[].addonWaline.serverURL - Waline 后端的服务器 URL。
 */
export default defineValaxyConfig<UserThemeConfig>({
  // 主题名称
  theme: 'yun',
  // 主题配置
  themeConfig: {
    // 主题类型
    type: 'nimbo',
    // 目录标题
    outlineTitle: '个人博客',
    // 主题色配置
    colors: {
      primary: '#ea4c89',
    },
    // 网站上显示的横幅配置
    banner: {
      // 是否启用
      enable: true,
      // 标题，默认每个字分割
      title: '咲夜Sakuyaの的小站',
      // 首页下方的动态云
      cloud: {
        enable: true,
      },
      // 标题类
      siteNameClass: 'text-2xl font-bold text-white',
    },
    // 背景图片配置
    bg_image: {
      // 是否启用
      enable: true,
      // 图片地址
      url: '/back/back.jpg',
      // 浅色模式
      dark: '/back/back.jpg',
      // 图像不透明度
      opacity: 0.9,
    },
    // 短语配置
    say: {
      // 是否启用
      enable: true,
      // 指定用于获取短语的 API 链接。
      api: 'https://el-bot-api.elpsy.cn/api/words/young',
      // 说说图标
      hitokoto: {
        // 是否启用
        enable: true,
        // 指定用于获取 hitokoto 短语的 API 链接。
        api: 'https://v1.hitokoto.cn',
      },
    },
    // 网站公告配置
    notice: {
      // 是否启用
      enable: true,
      // 是否在页面中隐藏
      hideInPages: true,
      // 公告内容
      content: '本站内容仅供学习交流，不得用于商业用途，如有侵权请联系我删除。',
    },
    // 点击时的烟花效果
    fireworks: {
      // 是否启用
      enable: true,
      // 烟花颜色
      colors: ['#ff0000', '#00ff00', '#0000ff'],
    },
    // 导航栏 位于页面右上角
    nav: [
      {
        icon: 'i-ri-home-line',
        link: '/',
        text: '首页',
        active: 'text-red-500',
      },
      {
        icon: 'i-ri-hq-fill',
        link: '/links/',
        text: '伙伴',
        active: 'text-red-500',
      },
    ],
    // 页面，显示在社交导航栏下方
    pages: [
      {
        name: '我的小伙伴们',
        url: '/links/',
        icon: 'i-ri-account-circle-fill',
        color: 'black',
      },
    ],
    // 侧边栏配置
    sidebar: {},
    // 网站底部区域的配置。
    footer: {
      // 页脚上部的动态云
      cloud: {
        enable: true,

      },
      // 建站于
      since: 2025,
      // 网站上显示的图标配置
      icon: {
        // 是否启用
        enable: true,
        // 图标名称
        name: 'i-ri-leaf-line',
        // 图标是否可点击
        animated: true,
        // 图标颜色
        color: 'aqua',
        // 文章链接
        url: '/archives',
        // 图标标题
        title: '档案',
      },
      // 框架和主题来源信息显示
      powered: false,
      // ICP 备案信息的配置。
      beian: {
        enable: true,
        icp: '冀ICP备2222000777号',
      },
    },
    // 自定义文章卡片类型
    types: {
      // 默认文章卡片
      default: {
        // 文章卡片的颜色
        color: '#ea4c89',
        // 文章卡片的图标
        icon: 'i-ri-external-link-line',
      },
    },
    // 自定义菜单
    menu: {
      // 自定义菜单
      custom: {
        // 菜单标题
        title: '自定义菜单',
        // 菜单链接
        url: '/custom/',
        // 菜单图标
        icon: 'i-ri-menu-2-line',
      }
    },
  },
  // Markdown 渲染器
  markdown: {
    // 属性定义了 Markdown 渲染的主题样式。它支持为浅色模式和深色模式分别指定不同的主题
    theme: {
      // 当用户使用浅色模式时，使用 github-light 主题。
      light: 'github-light',
      // 当用户使用深色模式时，使用 github-dark 主题。
      dark: 'github-dark',
    },
    // 属性用于自定义 Markdown 中的提示块（如提示、警告、危险等）的样式和内容。每种块类型都可以定义
    blocks: {
      // 用于提示信息，默认图标为“点赞”。
      tip: {
        icon: 'i-carbon-thumbs-up',
        text: 'ヒント',
        langs: {
          'zh-CN': '提示',
        },
      },
      // 用于警告信息，默认图标为“警告”。
      warning: {
        icon: 'i-carbon-warning-alt',
        text: '注意',
      },
      // 用于危险信息，默认图标为“危险”。
      danger: {
        icon: 'i-carbon-warning',
        text: '警告',
      },
      // 用于信息提示，默认图标为“信息”。
      info: {
        text: '信息',
      },
    },
    // 代码块的配置
    codeTransformers: [
      {
        // 转换器的名称
        name: 'default-name',
        // 在代码高亮处理之前对原始输入代码进行转换。
        preprocess: (code) => {
          return code.replace(/\[!!code/g, '[!code')
        },
        // 在将代码转换为 HAST（HTML 抽象语法树）之前，对完整的代码标记列表进行转换。
        tokens: (tokens) => { },
        // 转换整个生成的 HAST 树。
        root: (tree) => { },
        // 转换 `<pre>` 元素。
        pre: (pre) => { },
        //  转换 `<code>` 元素。
        code: (code) => { },
        // 转换每一行 `<span class="line">` 元素。
        line: (line) => { },
        // 转换每个标记 `<span>` 元素。
        span: (span) => { },
        // 在生成的 HTML 字符串返回之前对其进行转换。
        // 仅在使用 `codeToHtml` 方法时调用。
        postprocess: (html) => { },
      },
    ],
    // 配置 markdown-it
    config(md) {
      // You can configure the MarkdownItAsync instance here
      // Example: md.use(pluginName, options)
    },
  },
  unocss: {
    safelist
  },
  components: {
    // 实现引入第三方主题
    resolvers: [ValaxyThemesResolver({ themes: ['yun'] })],
  },
  // 不要因死链接而导致构建失败
  ignoreDeadLinks: true,
  // `valaxy build` 的选项
  build: {
    // 忽略死链
    ignoreDeadLinks: true,
    // 启用 SSG 分页，将单独构建分页页面
    ssgForPagination: true,
  },
  // 部署类型
  deploy: {
    type: 'gh-pages'
  },
  // 内部模块
  modules: {
    rss: {
      // 启用 RSS
      enable: true,
      // 全文输出
      fullText: true,
    }
  },
  // Markdown 功能
  features: {
    // 启用 KaTeX
    katex: true,
  },

  vite: {
    ssgOptions:{
      // ViteSSGOptions 配置项
      script: 'async', // 设置生成的脚本标签的类型，默认为 'async'
      format: 'esm', // 设置生成的 HTML 格式化方式，可选 'minify' 或 'none'
    }
  },
  vue:{
    isCustomElement:[]
  },
  // 设置 valaxy-addon-waline 配置项
  addons: [
    // 启用插件的通用组件
    addonComponents(),
    // 评论区
    addonWaline({
      // Waline 配置项，参考 https://waline.js.org/reference/client/props.html
      serverURL: 'https://boly-orpin.vercel.app/',
    }),
    // Live2d看板娘
    addonLive2d({
      global: true,
      live2DCollection: {
        XiaoYun: {
          message: '来自云游君的小云 ~',
          models: ['https://cdn.jsdelivr.net/npm/@yunyoujun/live2d@latest/小云.model3.json'],
        },
        // https://github.com/fghrsh/live2d_api
        Tia: {
          message: '来自 Potion Maker 的 Tia 酱 ~',
          models: 'https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/model/Potion-Maker/Tia/index.json',
          textures: 'https://api.github.com/repos/fghrsh/live2d_api/contents/model/Potion-Maker/Tia/textures',
        },
        Pio: {
          message: '来自 Potion Maker 的 Pio 酱 ~',
          models: 'https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/model/Potion-Maker/Pio/index.json',
          textures: 'https://api.github.com/repos/fghrsh/live2d_api/contents/model/Potion-Maker/Pio/textures',
        },
      },
      enableLive2D: 'all',
    })
  ],
})
