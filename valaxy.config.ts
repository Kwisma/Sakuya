import { defineValaxyConfig } from "valaxy";
import { addonWaline } from "valaxy-addon-waline";
import { addonComponents } from "valaxy-addon-components";
import { addonLive2d } from "valaxy-addon-live2d";
// add icons what you will need
const safelist = [
    "i-ri-home-line",
    "i-ri-qq-line",
    "i-ri-wechat-pay-line",
    "i-ri-alipay-line",
    "i-marketeq-1st-place",
    "i-marketeq-bag-alt",
    "i-marketeq-cube",
    "i-marketeq-gallery",
    "i-marketeq-marshmallow",
];
const colors = ["purple", "green", "blue", "dark"];
colors.forEach((c) => {
    safelist.push(
        ...[
            `border-${c}-300`,
            `text-${c}-600`,
            `hover:bg-${c}-600`,
            `dark:text-${c}-300`,
            `focus:ring-${c}-300`,
        ],
    );
});

export default defineValaxyConfig({
    theme: 'yun',

    build: {
        ignoreDeadLinks: 'localhostLinks',
        ssgForPagination: true,
        ssg: {
            engine: 'valaxy'
        }
    },

    // deploy: {
    //   type: 'gh-pages',
    // },

    modules: {
      rss: {
        enable: true,
        fullText: true,
        extractImagePathsFromHTML: true,
      },
    },

    features: {
      katex: true,
      extractFirstImage: true,
    },

    math: false,

    // vite: {
    //     optimizeDeps: {
    //         exclude: [
    //             'valaxy',
    //         ],
    //     },
    // },

    vue: {
        isCustomElement: [
            (tag: string) => ['meting-js', 'a-player'].includes(tag),
        ],
    },

    components: {
      dts: true,
    },

    // layouts: {
    //   layoutsDirs: "src/layouts",
    //   pagesDirs: "src/pages",
    //   extensions: ["vue"],
    //   exclude: ["**/components/*.vue"],
    //   defaultLayout: "default",
    // },

    // router: {
    //   extensions: ['.vue'],
    // },

    unocss: {
        safelist,
    },

    // visualizer: {
    //   open: true,
    // },

    // groupIcons: {},

    // unocssPresets: {
    //   uno: {},
    //   attributify: {},
    //   icons: {},
    //   typography: {},
    // },

    // fuse: {
    //   extendKeys: ['title', 'tags', 'categories', 'author', 'excerpt', 'link'],
    // },

    /**
      * @experimental
      * Enable Vue Devtools & Valaxy Devtools
      * @see https://devtools-next.vuejs.org/
      */
    devtools: true,

    markdown: {
        // default material-theme-palenight
        // theme: 'material-theme-palenight',
        theme: {
            // light: 'material-theme-lighter',
            light: "github-light",
            // dark: 'material-theme-darker',
            dark: "github-dark",
        },

        blocks: {
            tip: {
                icon: "i-carbon-thumbs-up",
                text: "ヒント",
            },
            warning: {
                icon: "i-carbon-warning-alt",
                text: "注意",
            },
            danger: {
                icon: "i-carbon-warning",
                text: "警告",
            },
            info: {
                text: "información",
            },

            custom: {
                icon: "i-ri:info-i",
                text: "CUSTOM",
            },
        },

        codeTransformers: [
            // We use `[!!code` in demo to prevent transformation, here we revert it back.
            {
                postprocess(code) {
                    return code.replace(/\[!!code/g, "[!code");
                },
            },
        ],
    },

    // 设置 valaxy-addon-waline 配置项
    addons: [
        // 启用插件的通用组件
        addonComponents(),
        // 评论区
        addonWaline({
            // Waline 配置项，参考 https://waline.js.org/reference/client/props.html
            serverURL: "https://bloy.mot.cloudns.biz/",
            locale: {
                nick: "昵称",
                nickError: "昵称不能少于3个字符",
                mail: "邮箱",
                mailError: "请填写正确的邮件地址",
                link: "网址",
                optional: "可选",
                placeholder:
                    "填写qq邮箱或点击登录，可以展示个人头像~详情请见【留言板】板块",
                sofa: "来发评论吧~",
                submit: "提交",
                like: "喜欢",
                cancelLike: "取消喜欢",
                reply: "回复",
                cancelReply: "取消回复",
                comment: "评论",
                refresh: "刷新",
                more: "加载更多...",
                preview: "预览",
                emoji: "表情",
                uploadImage: "上传图片",
                seconds: "秒前",
                minutes: "分钟前",
                hours: "小时前",
                days: "天前",
                now: "刚刚",
                uploading: "正在上传",
                login: "登录",
                logout: "退出",
                admin: "博主",
                sticky: "置顶",
                word: "字",
                wordHint: "评论字数应在 $0 到 $1 字之间！\n当前字数：$2",
                anonymous: "匿名",
                level0: "潜水",
                level1: "冒泡",
                level2: "吐槽",
                level3: "活跃",
                level4: "话痨",
                level5: "传说",
                gif: "表情包",
                gifSearchPlaceholder: "搜索表情包",
                profile: "个人资料",
                approved: "通过",
                waiting: "待审核",
                spam: "垃圾",
                unsticky: "取消置顶",
                oldest: "按倒序",
                latest: "按正序",
                hottest: "按热度",
                reactionTitle: "你认为这篇文章怎么样？",
            },
            // 表情设置
            emoji: [
                "https://jsd.onmicrosoft.cn/npm/@waline/emojis@1.3.0/alus",
                "https://jsd.onmicrosoft.cn/npm/@waline/emojis@1.3.0/bilibili",
                "https://jsd.onmicrosoft.cn/npm/@waline/emojis@1.3.0/bmoji",
                "https://jsd.onmicrosoft.cn/npm/@waline/emojis@1.3.0/coolapk",
                "https://jsd.onmicrosoft.cn/npm/@waline/emojis@1.3.0/coolapk_coin",
                "https://jsd.onmicrosoft.cn/npm/@waline/emojis@1.3.0/qq",
                "https://jsd.onmicrosoft.cn/npm/@waline/emojis@1.3.0/soul-emoji",
                "https://jsd.onmicrosoft.cn/npm/@waline/emojis@1.3.0/tieba",
                "https://jsd.onmicrosoft.cn/npm/@waline/emojis@1.3.0/tw-body",
                "https://jsd.onmicrosoft.cn/npm/@waline/emojis@1.3.0/tw-emoji",
                "https://jsd.onmicrosoft.cn/npm/@waline/emojis@1.3.0/tw-flag",
                "https://jsd.onmicrosoft.cn/npm/@waline/emojis@1.3.0/tw-food",
                "https://jsd.onmicrosoft.cn/npm/@waline/emojis@1.3.0/tw-natural",
                "https://jsd.onmicrosoft.cn/npm/@waline/emojis@1.3.0/tw-object",
                "https://jsd.onmicrosoft.cn/npm/@waline/emojis@1.3.0/tw-people",
                "https://jsd.onmicrosoft.cn/npm/@waline/emojis@1.3.0/tw-sport",
                "https://jsd.onmicrosoft.cn/npm/@waline/emojis@1.3.0/tw-symbol",
                "https://jsd.onmicrosoft.cn/npm/@waline/emojis@1.3.0/tw-time",
                "https://jsd.onmicrosoft.cn/npm/@waline/emojis@1.3.0/tw-travel",
                "https://jsd.onmicrosoft.cn/npm/@waline/emojis@1.3.0/tw-weather",
                "https://jsd.onmicrosoft.cn/npm/@waline/emojis@1.3.0/tw",
                "https://jsd.onmicrosoft.cn/npm/@waline/emojis@1.3.0/weibo",
            ],
            types: [],
            // 浏览量
            pageview: true,
            // 评论数
            comment: true,
        }),
        // Live2d看板娘
        addonLive2d({
            global: true,
            live2DCollection: {
                XiaoYun: {
                    message: "来自云游君的小云 ~",
                    models: [
                        "https://jsd.onmicrosoft.cn/npm/@yunyoujun/live2d@latest/小云.model3.json",
                    ],
                },
                // https://github.com/fghrsh/live2d_api
                Tia: {
                    message: "来自 Potion Maker 的 Tia 酱 ~",
                    models:
                        "https://jsd.onmicrosoft.cn/gh/fghrsh/live2d_api/model/Potion-Maker/Tia/index.json",
                    textures:
                        "https://api.github.com/repos/fghrsh/live2d_api/contents/model/Potion-Maker/Tia/textures",
                },
                Pio: {
                    message: "来自 Potion Maker 的 Pio 酱 ~",
                    models:
                        "https://jsd.onmicrosoft.cn/gh/fghrsh/live2d_api/model/Potion-Maker/Pio/index.json",
                    textures:
                        "https://api.github.com/repos/fghrsh/live2d_api/contents/model/Potion-Maker/Pio/textures",
                },
            },
            enableLive2D: "all",
        }),
    ],

    // hooks: {
    //   'build:before': () => {
    //     console.log('build start')
    //   },
    // },

    // cdn: {
    //   modules: [
    //     {
    //       name: 'vue',
    //       global: 'Vue',
    //       url: 'https://cdn.jsdelivr.net/npm/vue@3.5.0/dist/vue.global.prod.js',
    //       css: undefined,
    //       exports: ['ref', 'computed', 'watch', 'createApp'],
    //     },
    //     {
    //       name: 'katex',
    //       global: 'katex',
    //       url: 'https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.js',
    //       css: 'https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css',
    //     },
    //     {
    //       name: 'dayjs',
    //       global: 'dayjs',
    //       url: 'https://cdn.jsdelivr.net/npm/dayjs@1.11.10/dayjs.min.js',
    //     },
    //   ]
    // },

    // loaders: []
});
