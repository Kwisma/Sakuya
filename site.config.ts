import { defineSiteConfig } from "valaxy";

/**
 * 定义站点的配置
 * 此配置包括通用设置、作者信息、社交链接、
 * 搜索功能、主题选项以及其他高级功能
 */
export default defineSiteConfig({
  // 启用自动（亮/暗模式）
  mode: "auto",
  //  默认语言
  lang: "zh-CN",
  // 可选语言
  languages: ["zh-CN", "en"],
  // 时区配置
  timezone: "Asia/Shanghai",
  // 网站的完整 URL，用于生成 RSS 和静态站点
  url: "https://www.mot.cloudns.biz",
  // 网站主标题
  title: "悠梦君の小站",
  // 网站副标题
  subtitle: "在技术与梦想之间，撒一点可爱的魔法",
  // 网站的描述信息，用于 SEO
  description:
    "悠梦君の个人博客网站，记录技术分享、生活点滴以及灵感创作。打造一个温馨且实用的个人空间。",
  // 作者信息
  author: {
    // 作者的名字
    name: "悠梦君",
    // 作者的邮箱
    email: "d342jxc@gmail.com",
    // 作者的网站
    link: "https://www.mot.cloudns.biz",
    // 作者的头像
    avatar: "/img/avatar/avatar.webp",
    // 个人状态
    status: {
      // 状态的 Emoji 表示
      emoji: "🤔",
      // 当鼠标悬浮在图标上时显示
      message: "思考",
    },
    // 作者的个人简介
    intro: "在这个安静的角落编织代码与梦境，记录每一个灵光一闪的日子。",
  },
  // 是否在文章中显示最后更新时间
  lastUpdated: true,
  // 您网站的图标
  favicon: "/img/avatar/6624140365a01.webp",
  // RSS源和图标
  feed: {
    // RSS 源的名称
    name: "rss",
    // RSS 源的图标
    favicon: "i-ri-rss-line",
  },
  // 社交链接
  social: [
    {
      // 社交链接的名称
      name: "RSS",
      // 社交链接的 URL
      link: "/rss.xml",
      // 社交链接的图标
      icon: "i-ri-rss-line",
      // 社交链接的颜色
      color: "orange",
    },
    {
      // 社交链接的名称
      name: "GitHub",
      // 社交链接的 URL
      link: "https://github.com/Kwisma",
      // 社交链接的图标
      icon: "i-ri-github-line",
      // 社交链接的颜色
      color: "black",
    },
    {
      // 社交链接的名称
      name: "telegram",
      // 社交链接的 URL
      link: "https://t.me/KDYgMJqHBwsi755auLZD6nN477C7hQXQ",
      // 社交链接的图标
      icon: "i-ri-telegram-line",
      // 社交链接的颜色
      color: "black",
    },
    {
      // 社交链接的名称
      name: "E-Mail",
      // 社交链接的 URL
      link: "mailto:admin@mot.cloudns.com",
      // 社交链接的图标
      icon: "i-ri-mail-line",
      // 社交链接的颜色
      color: "black",
    },
    {
      // 社交链接的名称
      name: "Marshmallow",
      // 社交链接的 URL
      link: "https://marshmallow-qa.com/f3cjeh1nxnui85v",
      // 社交链接的图标
      icon: "i-marketeq-marshmallow",
      // 社交链接的颜色
      color: "black",
    },
  ],
  // 搜索功能
  search: {
    /**
     * @zh 是否启用
     */
    enable: true,
    // 搜索引擎
    provider: "fuse",
  },
  // 本地搜索
  fuse: {
    // 索引路径
    dataPath: "fuse-list.json",
    // 索引选项
    options: {
      // 搜索字段
      keys: ["title", "tags", "categories", "excerpt", "content"],
    },
  },
  // 定义文章的前置信息
  frontmatter: {
    // 是否显示前一篇、后一篇导航
    nav: true,
    //文章的主题
    type: "bilibili",
    // 摘要的格式类型
    excerpt_type: "html",
  },
  // 开启评论
  comment: {
    enable: true,
  },
  // cdn 配置
  cdn: {
    prefix: "https://jsd.onmicrosoft.cn/npm/",
  },
  // 文章底部版权信息
  license: {
    // 是否显示在文章底部
    enabled: true,
    // 版权信息的语言
    language: "zh-CN",
    // 版权类型，例如 'by-nc-sa'
    type: "by-nc-sa",
  },
  // 赞助 / 打赏
  sponsor: {
    enable: true,
    title: "我很可爱，请给我钱！",
    description: "如果你也想支持我，想让我有动力写更多的文章，请考虑赞助我！",
    methods: [
      {
        name: "支付宝",
        url: "/img/qrcode/alipay.webp",
        color: "#00A3EE",
        icon: "i-ri-alipay-line",
      },
      {
        name: "QQ 支付",
        url: "/img/qrcode/qqpay.webp",
        color: "#12B7F5",
        icon: "i-ri-qq-line",
      },
      {
        name: "微信支付",
        url: "/img/qrcode/wechatpay.webp",
        color: "#2DC100",
        icon: "i-ri-wechat-pay-line",
      },
    ],
  },
  // 主题配置
  mediumZoom: {
    // 启用图片预览
    enable: true,
    // 选择器，指定哪些图片可以预览
    selector: "img",
    // 配置
    options: {
      // 图片预览的边距
      margin: 50,
      // 图片预览的背景颜色
      background: "#000",
      // 滚动偏移量
      scrollOffset: 40,
      // 图片预览的容器
      container: "#zoom-container",
      // 自定义模板
      template: "#zoom-container",
    },
  },
  // Vanilla LazyLoad 配置
  vanillaLazyload: {
    // 是否启用 LazyLoad 功能
    enable: false,
    options: {
      // =========================
      // 基础
      // =========================

      // 懒加载元素选择器
      elements_selector: ".lazy",

      // 提前多少 px 开始加载
      threshold: 300,

      // IntersectionObserver rootMargin
      // 会覆盖 threshold
      thresholds: "300px 0px",

      // =========================
      // data-* 属性名
      // =========================

      // data-src
      data_src: "src",

      // data-srcset
      data_srcset: "srcset",

      // data-sizes
      data_sizes: "sizes",

      // data-bg
      data_bg: "bg",

      // data-bg-hidpi
      data_bg_hidpi: "bg-hidpi",

      // data-bg-multi
      data_bg_multi: "bg-multi",

      // data-bg-multi-hidpi
      data_bg_multi_hidpi: "bg-multi-hidpi",

      // data-bg-set
      data_bg_set: "bg-set",

      // data-poster
      data_poster: "poster",

      // =========================
      // class
      // =========================

      class_applied: "applied",

      class_loading: "loading",

      class_loaded: "loaded",

      class_error: "error",

      class_entered: "entered",

      class_exited: "exited",

      // =========================
      // 行为
      // =========================

      // 加载完成后停止观察
      unobserve_completed: true,

      // 进入视口后停止观察
      unobserve_entered: false,

      // 离开视口时取消加载
      cancel_on_exit: true,

      // 使用浏览器原生 lazyload
      use_native: false,

      // 加载失败时恢复原始 src
      restore_on_error: false,

      // =========================
      // 回调
      // =========================

      callback_enter(el, entry, instance) {
        console.log("进入视口", el);
      },

      callback_exit(el, entry, instance) {
        console.log("离开视口", el);
      },

      callback_applied(el, instance) {
        console.log("背景图已应用", el);
      },

      callback_loading(el, instance) {
        console.log("开始加载", el);
      },

      callback_loaded(el, instance) {
        console.log("加载完成", el);
      },

      callback_error(el, instance) {
        console.log("加载失败", el);
      },

      callback_finish(instance) {
        console.log("全部加载完成");
      },

      callback_cancel(el, entry, instance) {
        console.log("取消加载", el);
      },
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
    container: "body",
    // 用于计算位置和大小边界的元素
    boundary: undefined,
    // 当另一个 popper 显示时跳过延迟和 CSS 过渡，使 popper 看起来立即移动到新位置
    instantMove: false,
    // 自动销毁工具提示 DOM 节点的时间（毫秒）
    disposeTimeout: 5000,
    // 在 popper 本身上触发的事件
    popperTriggers: [],
    // 定位策略
    strategy: "absolute",
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
        placement: "top",
        // 触发工具提示的默认事件
        triggers: ["hover", "focus", "touch"],
        // 点击工具提示目标时关闭工具提示
        hideTriggers: (events: string[]) => [...events, "click"],
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
        loadingContent: "...",
      },
      dropdown: {
        // 下拉菜单相对于目标元素的默认位置
        placement: "bottom",
        // 触发下拉菜单的默认事件
        triggers: ["click"],
        // 延迟时间（毫秒）
        delay: 0,
        // 在内容大小调整时更新 popper
        handleResize: true,
        // 点击外部时隐藏
        autoHide: true,
      },
      menu: {
        // 继承自 dropdown 的配置
        $extend: "dropdown",
        // 触发菜单的事件
        triggers: ["hover", "focus"],
        // 在 popper 上触发的事件
        popperTriggers: ["hover", "focus"],
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
    algorithm: "AES-CTR",
    // 初始化向量,默认值为 16 字节的随机值
    iv: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]),
    // 盐值,默认值为 16 字节的随机值
    salt: new Uint8Array([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
    ]),
  },
  // 代码块限高
  codeHeightLimit: 200,
  // 重定向
  redirects: {
    // 是否使用 Vue Router 进行重定向
    useVueRouter: false,
    // 重定向规则
    rules: [],
  },
});
