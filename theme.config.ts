import { defineThemeConfig } from "valaxy-theme-yun";

export default defineThemeConfig({
  // 主题类型
  type: "nimbo",
  // 目录标题
  outlineTitle: "悠梦君の个人博客",
  // 主题色配置
  colors: {
    primary: "#0078E7",
  },
  // 网站上显示的横幅配置
  banner: {
    // 是否启用
    enable: true,
    // 标题，默认每个字分割
    title: ["悠", "梦", "君", "の", "的", "小", "站"],
    // 首页下方的动态云
    cloud: {
      enable: true,
    },
    // 标题类
    siteNameClass: "text-white",
    // 动画持续时间
    duration: 500,
  },
  // 背景图片配置
  bg_image: {
    // 是否启用
    enable: true,
    // 图片地址
    url: "/img/back/back.webp",
    // 浅色模式
    dark: "/img/back/back-y.webp",
    // 图像不透明度
    opacity: 0.9,
  },
  // 短语配置
  say: {
    // 是否启用
    enable: true,
    // 指定用于获取短语的 API 链接。
    api: "https://el-bot-api.elpsy.cn/api/words/young",
    // 说说图标
    hitokoto: {
      // 是否启用
      enable: true,
      // 指定用于获取 hitokoto 短语的 API 链接。
      api: "https://v1.hitokoto.cn",
    },
  },
  // 网站公告配置
  notice: {
    // 是否启用
    enable: false,
    // 是否在页面中隐藏
    hideInPages: true,
    // 公告内容
    content: "本站内容仅供学习交流，不得用于商业用途，如有侵权请联系我删除。",
  },
  // 点击时的烟花效果
  fireworks: {
    // 是否启用
    enable: true,
    // 烟花颜色
    colors: [
      "#ff0000",
      "#ff7f00",
      "#ffff00",
      "#00ff00",
      "#0000ff",
      "#4b0082",
      "#8b00ff",
    ],
  },
  // 导航栏 位于页面右上角
  nav: [
    {
      icon: "i-ri-home-line",
      link: "/",
      text: "首页",
      active: "text-red-500",
    },
    {
      icon: "i-ri-group-line",
      link: "/links/",
      text: "伙伴",
      active: "text-red-400",
    },
  ],
  // 页面，显示在社交导航栏下方
  pages: [
    {
      name: "我的小伙伴们",
      url: "/links/",
      icon: "i-ri-account-circle-fill",
      color: "dodgerblue",
    },
    {
      name: "我的老婆",
      url: "/girls/",
      icon: "i-ri-women-line",
      color: "hotpink",
    },
    {
      name: "留言板",
      url: "/message/",
      icon: "i-ri-message-2-line",
      color: "dodgerblue",
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
      name: "i-ri-copyright-fill",
      // 图标是否可点击
      animated: true,
      // 图标颜色
      color: "aqua",
      // 文章链接
      url: "/privacy/",
      // 图标标题
      title: "隐私协议",
    },
    // 框架和主题来源信息显示
    powered: true,
    // ICP 备案信息的配置。
    beian: {
      enable: true,
      icp: "冀ICP备2222000777号",
      icpLink: "https://beian.miit.gov.cn/",
      police: "公安网备案号",
    },
  },
  // 自定义文章卡片类型
  types: {
    // 默认文章卡片
    default: {
      // 文章卡片的颜色
      color: "#ea4c89",
      // 文章卡片的图标
      icon: "i-ri-external-link-line",
    },
  },
  // 自定义菜单
  menu: {
    // 自定义菜单
    custom: {
      // 菜单标题
      title: "自定义菜单",
      // 菜单链接
      url: "/custom/",
      // 菜单图标
      icon: "i-ri-menu-2-line",
    },
  },
  // 用于「在 GitHub 中打开」等功能
  editLink: {
    pattern: "https://github.com/user/repo/edit/main/:path",
    text: "编辑此页面",
  },
});
