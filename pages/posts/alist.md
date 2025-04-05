---
layout: post
date: 2025-03-24 19:33:33
title: alist自定义美化
excerpt: 用于美化 Alist 正文的模板，包含多个功能模块和脚本，增强页面的交互性和视觉效果
categories:
 - Alist
tags:
 - Alist
 - 美化
 - 前端
 - 教程
cover: /img/posts/alist.webp
---

## 功能

1. 延迟加载容器

代码的主要内容被包裹在一个 `div` 容器中，`id="customize"`，并通过 `style="display: none;"` 隐藏。

延迟加载的实现通过一个定时器脚本完成，当检测到页面中存在 `.footer` 元素时，将容器显示出来。这种方式可以优化页面加载性能，确保内容在特定条件下才加载。

2. 音乐播放器

使用了 `<meting-js>` 标签，这是一个基于 Meting 的音乐播放器组件。

它支持多种音乐平台（如网易云音乐），并通过属性配置播放器的外观和行为，例如 `autoplay="true"` 表示自动播放，`theme="#409EFF"` 设置播放器主题颜色。

3. 评论模块

代码中集成了 Valine 评论系统，这是一个基于 LeanCloud 的无后端评论系统。

通过 `new Valine()` 初始化评论模块，配置了评论的容器（`el: '#vcomments'`）、访客统计（`visitor: true`）以及其他选项（如头像样式和占位符文本）。

这种设计使得用户可以在页面下方直接留言互动。

4. 名言展示

代码中包含一个名为“一言”的模块，用于展示随机名言。

名言内容通过 `<span id="hitokoto_text">` 动态填充，并由 https://v1.hitokoto.cn 提供的 API 实现。

这种功能为页面增加了趣味性和文化氛围。

5. 社交链接和版权信息

页面底部包含多个社交链接和版权声明：

包括 QQ 群、邮箱、博客、留言板等链接，使用了 Font Awesome 图标库来美化链接的外观。

还包含备案信息（如“冀ICP备2222000777号”）和 Alist 项目的版权声明，表明页面的合法性和出处。

6. 访问量统计

代码中集成了 Busuanzi 服务，用于统计页面的访问量和访客数：

`<span id="busuanzi_value_page_pv">` 和 `<span id="busuanzi_value_site_uv">` 等元素会动态显示页面访问量、站点总访问量和访客数。

这种统计方式适合轻量级的页面分析需求。

7. 渐变背景

代码提供了一个可选的渐变背景效果，通过 Granim.js 实现：

渐变背景的配置包括多个颜色渐变组合（如 `['#a18cd1', '#fbc2eb']`），并通过 `direction: 'left-right'` 设置渐变方向。

这种动态背景可以提升页面的视觉吸引力。

8. 鼠标点击效果

通过引入 `maodian.js`，页面实现了鼠标点击时的特效，例如显示动态的点击动画。

这种交互设计可以增加用户的操作反馈，提升用户体验。

## alist 正文美化代码

```html
<!--延迟加载-->
<!--如果要写自定义内容建议都加到这个延迟加载的范围内-->
<div id="customize" style="display: none;">
    <div>
  <!--音乐播放器-->
        <meting-js fixed="true" autoplay="true" theme="#409EFF" list-folded="true" server="netease" type="playlist" id="2568697963"></meting-js>


  <!--评论模块还有下面的script也是-->
  <center>
   <div class="newValine" id="vcomments"></div>
  </center>
  <script>
   new Valine({
    visitor: true,
    el: '#vcomments',
    avatar: 'wavatar',
    appId: 'mqNCZUaZM1z4nPlpFSQBSGH7-gzGzoHsz',
    appKey: '2umMHA8W4tTcXG2kTqroZ6xS',
    MasterKey: 'sZBKcqA9XTFpQ7QMKB16UBIY',
    placeholder: "有什么问题欢迎评论区留言~么么哒"
   })
  </script>

        <br/>
        <center class="dibu">
            <div style=" line-height: 20px;font-size: 9pt;font-weight: bold;">
                <span>
                    "
                    <span style="color: rgb(13, 109, 252); font-weight: bold;" id="hitokoto">
                        <a href="#" id="hitokoto_text">
                            "人生最大的遗憾,就是在最无能为力的时候遇到一个想要保护一生的人."
                        </a>
                    </span> "
                </span>
                <p style="margin-left: 10rem;font-size: 8pt;">
                    <small>
                        —— Anwen's Cloud
                    </small>
                </p>
            </div>

            <div style="font-size: 13px; font-weight: bold;">
                <span class="nav-item">
                    <a class="nav-link" href="https://qm.qq.com/q/Sg5y2WlO00"
                        target="_blank">
                        <i class="fab fa-qq" style="color:#409EFF" aria-hidden="true">
                        </i>
                        QQ |
                    </a>
                </span>
                <span class="nav-item">
                    <a class="nav-link" href="mailto:d342jxc@gmail.com" target="_blank">
                        <i class="fa-duotone fa-envelope-open" style="color:#409EFF" aria-hidden="true">
                        </i>
                        邮箱 |
                    </a>
                </span>
                <span class="nav-item">
                    <a class="nav-link" href="#" target="_blank">
                        <i class="fas fa-edit" style="color:#409EFF" aria-hidden="true">
                        </i>
                        博客 |
                    </a>
                </span>
                <span class="nav-item">
                    <a class="nav-link" href="#" target="_blank">
                        <i class="fas fa-comment-lines" style="color:#409EFF;" aria-hidden="true">
                        </i>
                        留言 |
                    </a>
                </span>
                <!--后台入口-->
                <span class="nav-item">
                    <a class="nav-link" href="/@manage" target="_blank">
                        <i class="fa-solid fa-folder-gear" style="color:#409EFF;" aria-hidden="true">
                        </i>
                        管理 |
                    </a>
                </span>
                <!--版权，请尊重作者-->
                <span class="nav-item">
                    <a class="nav-link" href="https://github.com/Xhofe/alist" target="_blank">
                        <i class="fa-solid fa-copyright" style="color:#409EFF;" aria-hidden="true">
                        </i>
                        Alist
                    </a>
                </span>
    <br />
    <!--添加一个访问量-->
    <span>
                </span>
                <br />
    <!--添加备案信息-->
                <span class="nav-item">
                    <a class="nav-link" href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">
                        <i class="fa-solid fa-shield-check" style="color:#409EFF;" aria-hidden="true">
                        </i>
                        冀ICP备2222000777号
                    </a>
                </span>
            </div>
        </center>
        <br />
        <br />
    </div>



    <!--一言API-->
    <script src="https://v1.hitokoto.cn/?encode=js&select=%23hitokoto" defer></script>
<!--延迟加载范围到这里结束-->
</div>
<!--延迟加载配套使用JS-->
<script>
    let interval = setInterval(() => {
        if (document.querySelector(".footer")) {
            document.querySelector("#customize").style.display = "";
            clearInterval(interval);
        }
    }, 200);
</script>

<!-- 渐变背景初始化,如果要使用渐变背景把下面的那一行注释去掉即可-->
<!-- 下面的几行都是渐变的一套,自定义头部内还有一个关联的自定义CSS -->
<!--<canvas id="canvas-basic"></canvas> -->
<script src="https://npm.elemecdn.com/granim@2.0.0/dist/granim.min.js"></script>
<script>
var granimInstance = new Granim({
    element: '#canvas-basic',
    direction: 'left-right',
    isPausedWhenNotInView: true,
    states : {
        "default-state": {
            gradients: [
                ['#a18cd1', '#fbc2eb'],
                 ['#fff1eb', '#ace0f9'],
                 ['#d4fc79', '#96e6a1'],
                 ['#a1c4fd', '#c2e9fb'],
                 ['#a8edea', '#fed6e3'],
                 ['#9890e3', '#b1f4cf'],
                 ['#a1c4fd', '#c2e9fb'],
                 ['#fff1eb', '#ace0f9']

            ]
        }
    }
});
</script>

<!--鼠标点击效果-->
<script src="https://jsd.onmicrosoft.cn/gh/TRHX/CDN-for-itrhx.com@3.0.8/js/maodian.js"></script>

```

<CodePen class="h-300px" name="Margin Collapse" id="WqXGpo" user="YunYouJun" tab="html,result" />
