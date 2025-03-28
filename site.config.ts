import { defineSiteConfig } from 'valaxy'

/**
 * 定义站点的配置
 * 此配置包括通用设置、作者信息、社交链接、
 * 搜索功能、主题选项以及其他高级功能
 */
export default defineSiteConfig({
  // 启用自动（亮/暗模式）
  mode: 'auto',
  //  默认语言
  lang: 'zh-CN',
  // 可选语言
  languages: ['zh-CN', 'en'],
  // 时区配置
  timezone: 'Asia/Shanghai',
  // 网站的完整 URL，用于生成 RSS 和静态站点
  url: 'https://www.mot.cloudns.biz',
  // 网站主标题
  title: '咲夜の个人博客',
  // 网站副标题
  subtitle: '如果生活还没能改变，那你已经失败了',
  // 网站的描述信息，用于 SEO
  description: '合抱之木，生于毫末；九层之台，起于累土；千里之行，始于足下',
  // 作者信息
  author: {
    // 作者的名字
    name: '咲夜',
    // 作者的邮箱
    email: 'd342jxc@gmail.com',
    // 作者的网站
    link: 'https://www.mot.cloudns.biz',
    // 作者的头像
    avatar: '/avatar/avatar.webp',
    // 个人状态
    status: {
      // 状态的 Emoji 表示
      emoji: '👨‍💻',
      // 当鼠标悬浮在图标上时显示
      message: '时光匆匆，珍惜当下',
    },
    // 作者的个人简介
    intro: '热爱生活，热爱代码',
  },
  // 是否在文章中显示最后更新时间
  lastUpdated: true,
  // 您网站的图标
  favicon: '/avatar/avatar.webp',
  // RSS源和图标
  feed: {
    // RSS 源的名称
    name: 'rss',
    // RSS 源的图标
    favicon: 'i-ri-rss-line',
  },
  // 社交链接
  social: [
    {
      // 社交链接的名称
      name: 'RSS',
      // 社交链接的 URL
      link: '/rss.xml',
      // 社交链接的图标
      icon: 'i-ri-rss-line',
      // 社交链接的颜色
      color: 'orange',
    },
    {
      // 社交链接的名称
      name: 'GitHub',
      // 社交链接的 URL
      link: 'https://github.com/Kwisma',
      // 社交链接的图标
      icon: 'i-ri-github-line',
      // 社交链接的颜色
      color: 'black',
    },

  ],
  // 搜索功能
  search: {
    /**
     * @zh 是否启用
     */
    enable: true,
    // 搜索引擎
    type: 'fuse',
  },
  // 本地搜索
  fuse: {
    // 索引路径
    dataPath: 'fuse-list.json',
    // 索引选项
    options: {
      // 搜索字段
      keys: ['title', 'tags', 'categories', 'excerpt', 'content'],
      // 是否包含匹配分数
      includeScore: true,
      // 是否包含匹配详情
      includeMatches: true,
      // 最小匹配字符长度
      minMatchCharLength: 1,
    },
  },
  // 定义文章的前置信息
  frontmatter: {
    // 是否显示前一篇、后一篇导航
    nav: true,
    //文章的主题
    type: 'bilibili',
    // 摘要的格式类型
    excerpt_type: 'md',
    // 是否启用 APlayer 音乐播放器
    aplayer: true,
  },
  // 开启评论
  comment: {
    enable: true
  },
  // cdn 配置
  cdn: {
    prefix: 'https://unpkg.com/'
  },
  // 文章底部版权信息
  license: {
    // 是否显示在文章底部
    enabled: true,
    // 版权信息的语言
    language: 'zh-CN',
    // 版权类型，例如 'by-nc-sa'
    type: 'by-nc-sa',
  },
  // 赞助 / 打赏
  sponsor: {
    enable: false,
    title: '我很可爱，请给我钱！',
    description: '如果你也想支持我，想让我有动力写更多的文章，请考虑赞助我！',
    methods: [
      {
        name: '支付宝',
        url: 'https://cdn.yunyoujun.cn/img/donate/alipay-qrcode.jpg',
        color: '#00A3EE',
        icon: 'i-ri-alipay-line',
      },
      {
        name: 'QQ 支付',
        url: 'https://cdn.yunyoujun.cn/img/donate/qqpay-qrcode.png',
        color: '#12B7F5',
        icon: 'i-ri-qq-line',
      },
      {
        name: '微信支付',
        url: 'https://cdn.yunyoujun.cn/img/donate/wechatpay-qrcode.jpg',
        color: '#2DC100',
        icon: 'i-ri-wechat-pay-line',
      },
    ],
  },
  // 主题配置
  mediumZoom: {
    // 启用图片预览
    enable: true,
    // 选择器，指定哪些图片可以预览
    selector: 'img',
    // 配置
    options: {
      // 图片预览的边距
      margin: 50,
      // 图片预览的背景颜色
      background: '#000',
      // 滚动偏移量
      scrollOffset: 40,
      // 图片预览的容器
      container: '#zoom-container',
      // 自定义模板
      template: '#zoom-container',
    },
  },
  // Vanilla LazyLoad 配置
  vanillaLazyload: {
    // 是否启用 LazyLoad 功能
    enable: false,
    options: {
      // 延迟加载的元素选择器
      elements_selector: 'img',
      // 滚动容器
      container: typeof document !== 'undefined' ? document.getElementById('my-container') as HTMLElement || undefined : undefined,
      // 触发加载的阈值
      threshold: 300,
      // 图片的 `src` 属性
      thresholds: '',
      // 图片的 `srcset` 属性
      data_src: 'src',
      // 加载时的 CSS 类
      data_srcset: 'srcset',
      // 加载完成时的 CSS 类
      data_sizes: 'sizes',
      data_bg: 'bg',
      data_bg_hidpi: 'bg-hidpi',
      data_bg_multi: 'bg-multi',
      data_bg_multi_hidpi: 'bg-multi-hidpi',
      data_bg_set: 'bg-sets',
      data_poster: 'poster',
      class_applied: 'applied',
      class_loading: 'loading',
      class_loaded: 'loaded',
      class_error: 'error',
      class_entered: 'entered',
      class_exited: 'exited',
      unobserve_completed: true,
      unobserve_entered: false,
      cancel_on_exit: false,
      // 元素进入视口时的回调
      callback_enter: () => { },
      // 元素离开视口时的回调
      callback_exit: () => { },
      callback_applied: () => { },
      callback_loading: () => { },
      callback_loaded: () => { },
      callback_error: () => { },
      callback_finish: () => { },
      callback_cancel: () => { },
      use_native: false,
      restore_on_error: true,
    },
  },
  // Floating Vue 配置
  floatingVue: {
    // 禁用 popper 组件
    disabled: false,
    // 默认主轴方向上的位置偏移量（像素）
    distance: 5,
    // 默认交叉轴方向上的位置偏移量（像素）
    skidding: 0,
    // 默认工具提示将附加到的容器
    container: 'body',
    // 用于计算位置和大小边界的元素
    boundary: undefined,
    // 当另一个 popper 显示时跳过延迟和 CSS 过渡，使 popper 看起来立即移动到新位置
    instantMove: false,
    // 自动销毁工具提示 DOM 节点的时间（毫秒）
    disposeTimeout: 5000,
    // 在 popper 本身上触发的事件
    popperTriggers: [],
    // 定位策略
    strategy: 'absolute',
    // 防止溢出
    preventOverflow: true,
    // 如果需要，翻转到相反的放置位置
    flip: true,
    // 在交叉轴上移动以防止 popper 溢出
    shift: true,
    // 溢出填充（像素）
    overflowPadding: 0,
    // 箭头填充（像素）
    arrowPadding: 0,
    // 计算箭头溢出（用于隐藏箭头）
    arrowOverflow: true,
    /**
     * 默认情况下，在 'click' 事件上计算自动隐藏
     */
    autoHideOnMousedown: false,
    // 主题配置
    themes: {
      tooltip: {
        // 工具提示相对于目标元素的默认位置
        placement: 'top',
        // 触发工具提示的默认事件
        triggers: ['hover', 'focus', 'touch'],
        // 点击工具提示目标时关闭工具提示
        hideTriggers: (events: string[]) => [...events, 'click'],
        // 延迟时间（毫秒）
        delay: {
          show: 200,
          hide: 0,
        },
        // 在内容大小调整时更新 popper
        handleResize: false,
        // 在指令中启用 HTML 内容
        html: false,
        // 当工具提示内容正在加载时显示的内容
        loadingContent: '...',
      },
      dropdown: {
        // 下拉菜单相对于目标元素的默认位置
        placement: 'bottom',
        // 触发下拉菜单的默认事件
        triggers: ['click'],
        // 延迟时间（毫秒）
        delay: 0,
        // 在内容大小调整时更新 popper
        handleResize: true,
        // 点击外部时隐藏
        autoHide: true,
      },
      menu: {
        // 继承自 dropdown 的配置
        $extend: 'dropdown',
        // 触发菜单的事件
        triggers: ['hover', 'focus'],
        // 在 popper 上触发的事件
        popperTriggers: ['hover', 'focus'],
        // 延迟时间（毫秒）
        delay: {
          show: 0,
          hide: 400,
        },
      },
    },
  },
  // 每页显示的文章数量
  pageSize: 10,
  //  开启阅读统计
  statistics: {
    enable: true,
    readTime: {
      // 阅读速度
      speed: {
        // 中文阅读速度（每分钟字符数）
        cn: 300,
        // 英文阅读速度（每分钟字符数）
        en: 200,
      },
    },
  },
  // 代码高亮
  encrypt: {
    // 开启加密，默认关闭
    enable: true,
    // 加密算法
    algorithm: 'aes-256-cbc',
    // 初始化向量,默认值为 16 字节的随机值
    iv: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]),
    // 盐值,默认值为 16 字节的随机值
    salt: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]),
  },
  // 代码块限高
  codeHeightLimit: 0,
  // 重定向
  redirects: {
    // 是否使用 Vue Router 进行重定向
    useVueRouter: false,
    // 重定向规则
    rules: [],
  },
})
