---
layout: post
date: 2025-03-24 19:33:39
title: alist头部美化
excerpt: alist 头部美化代码
categories:
 - alist
tags:
 - 美化
 - 模板
cover: /posts/alist.webp
---

## alist 头部美化代码

```html
<!--Alist V3建议添加的，已经默认添加了，如果你的没有建议加上-->
<script src="https://polyfill.io/v3/polyfill.min.js?features=String.prototype.replaceAll"></script>

<!--引入字体，全局字体使用-->
<link rel="stylesheet" href="https://npm.elemecdn.com/lxgw-wenkai-webfont@1.1.0/lxgwwenkai-regular.css" />

<!--评论系统使用的js-->
<script src='https://unpkg.com/valine/dist/Valine.min.js'></script>

<!--不蒜子计数器-->
<script async src="https://busuanzi.icodeq.com/busuanzi.pure.mini.js"></script>

<!-- Font6，自定义底部使用和看板娘使用的图标和字体文件-->
<link type='text/css' rel="stylesheet" href="https://npm.elemecdn.com/font6pro@6.3.0/css/fontawesome.min.css" media='all'>
<link href="https://npm.elemecdn.com/font6pro@6.3.0/css/all.min.css" rel="stylesheet">

<!--音乐播放器所用的文件-->
<!-- require APlayer -->
<link rel="stylesheet" href="https://npm.elemecdn.com/aplayer@1.10.1/dist/APlayer.min.css">
<script src="https://npm.elemecdn.com/aplayer@1.10.1/dist/APlayer.min.js"></script>
<!-- require MetingJS -->
<script src="https://npm.elemecdn.com/meting2@0.0.1/js/Meting.min.js"></script>

<style>
/* 去除通知栏 右上角 X */
 .notify-render .hope-close-button {
    display: none;
}

/* 此选项两处CSS 在v3.31.0中已优化 滚动显示 和 右下角设置网格模式尺寸大小 */
/* 文字超长自动换行 */
/*.name-box .name {
    white-space: unset !important;
    overflow: unset !important;
}*/
/* 缩略图图片变大 代码中的160px 自己改 现在是注释状态若需要自行解除注释 */
/*.obj-box > div {
grid-template-columns: repeat(auto-fill, minmax(160px, 1fr))
}
.obj-box > div .item-thumbnail{
  height: 100px;
}*/

/*
  图片API用法点进去都会有食用说明的,API来自网络不保证实效性稳定性自己测试
  樱花：https://www.dmoe.cc
  夏沫：https://cdn.seovx.com
  搏天：https://api.btstu.cn/doc/sjbz.php
  姬长信：https://github.com/insoxin/API
  小歪：https://api.ixiaowai.cn/
  保罗：https://api.paugram.com
  墨天逸：https://api.mtyqx.cn
  岁月小筑：https://img.xjh.me
  东方Project：https://img.paulzzh.com
  */

/*白天背景图*/
 .hope-ui-light {
    background-image: url("http://pic.rmb.bdstatic.com/bjh/7569b014a1abafd5481298763300ae1d.png") !important;
    background-repeat:no-repeat;
    background-size:cover;
    background-attachment:fixed;
    background-position-x:center;
}
/*夜间背景图*/
 .hope-ui-dark {
    background-image: url("http://pic.rmb.bdstatic.com/bjh/ebe942a9de49856f389c65f25a338335.png") !important;
    background-repeat:no-repeat;
    background-size:cover;
    background-attachment:fixed;
    background-position-x:center;
}
/*主列表白天模式透明*/
 .obj-box.hope-stack.hope-c-dhzjXW.hope-c-PJLV.hope-c-PJLV-igScBhH-css {
    background-color: rgba(255, 255, 255, 0.5) !important;
}
/*主列表夜间模式透明*/
 .obj-box.hope-stack.hope-c-dhzjXW.hope-c-PJLV.hope-c-PJLV-iigjoxS-css {
    background-color:rgb(0 0 0 / 50%) !important;
}
/*readme白天模式透明*/
 .hope-c-PJLV.hope-c-PJLV-ikSuVsl-css {
    background-color: rgba(255, 255, 255, 0.5) !important;
}
/*readme夜间模式透明*/
 .hope-c-PJLV.hope-c-PJLV-iiuDLME-css {
    background-color:rgb(0 0 0 / 50%) !important;
}

/*顶部右上角切换按钮透明*/
 .hope-ui-light .hope-c-ivMHWx-hZistB-cv.hope-icon-button {
    background-color: rgba(255, 255, 255, 0.5) !important;
}
.hope-ui-dark .hope-c-ivMHWx-hZistB-cv.hope-icon-button {
    background-color:rgb(0 0 0 / 50%) !important;
}

/*右下角侧边栏按钮透明 第一个是白天 第二个是夜间*/
 .hope-ui-light .hope-c-PJLV-ijgzmFG-css {
    background-color: rgba(255, 255, 255, 0.5) !important;
}
.hope-ui-dark .hope-c-PJLV-ijgzmFG-css {
    background-color:rgb(0 0 0 / 50%) !important;
}

/*白天模式代码块透明*/
 .hope-ui-light pre {
    background-color: rgba(255, 255, 255, 0.1)!important;
}
/*夜间模式代码块透明*/
 .hope-ui-dark pre {
    background-color: rgba(255, 255, 255, 0)!important;
}

/*左侧侧边栏目录*/
/*白天模式*/
 .hope-ui-light .hope-c-PJLV-ieGWMbI-css {
    background: rgba(255, 255, 255, 0.5) !important;
}
/*夜间模式*/
 .hope-ui-dark .hope-c-PJLV-ieGWMbI-css {
    background-color:rgb(0 0 0 / 50%) !important;
}

/* 返回顶部 */
 .hope-c-PJLV-ihVEsOa-css {
    background: rgba(255, 255, 255, 0.5) !important;
}
.hope-ui-dark .hope-c-PJLV-ihVEsOa-css {
    background-color:rgb(0 0 0 / 50%) !important;
}

/*正常情况未使用吸附功能*/
/*顶部*/
 .hope-c-PJLV-ikaMhsQ-css {
    background: rgba(255, 255, 255, 0) !important;
}
/*导航条*/
/*白天模式*/
 .hope-ui-light .hope-c-PJLV-idaeksS-css {
    background-color: rgba(255, 255, 255, 0.5) !important;
    border-radius: var(--hope-radii-xl) !important;
}
/*夜间模式*/
 .hope-ui-dark .hope-c-PJLV-idaeksS-css {
    background-color:rgb(0 0 0 / 50%) !important;
    border-radius: var(--hope-radii-xl) !important;
}
/* 吸附到页面顶部 */
/*顶部*/
 .hope-c-PJLV-icWrYmg-css {
    background: rgba(255, 255, 255, 0) !important;
}
/*导航条*/
 .hope-c-PJLV-icKsjdm-css::after {
    background: rgba(255, 255, 255, 0) !important;
}
/*白天模式*/
 .hope-ui-light .hope-c-PJLV-icKsjdm-css {
    background-color: rgba(255, 255, 255, 0.5) !important;
    border-radius: var(--hope-radii-xl) !important;
}
/*夜间模式*/
 .hope-ui-dark .hope-c-PJLV-icKsjdm-css {
    background-color:rgb(0 0 0 / 50%) !important;
    border-radius: var(--hope-radii-xl) !important;
}

/*仅吸附导航栏*/
/*导航条*/
 .hope-c-PJLV-ifdXShc-css::after {
    background: rgba(255, 255, 255, 0) !important;
}
/*白天模式*/
 .hope-ui-light .hope-c-hrsMRY {
    background-color: rgba(255, 255, 255, 0.5) !important;
    border-radius: var(--hope-radii-xl) !important;
}
/*夜间模式*/
 .hope-ui-dark .hope-c-hrsMRY {
    background-color:rgb(0 0 0 / 50%) !important;
    border-radius: var(--hope-radii-xl) !important;
}

/*底部CSS，.App .table这三个一起的*/
 dibu {
    border-top: 0px;
    position: absolute;
    bottom: 0;
    width: 100%;
    margin: 0px;
    padding: 0px;
}
.App {
    min-height: 85vh;
}
.table {
    margin: auto;
}
/*去掉底部*/
 .footer {
    display: none !important;
}
/*全局字体*/
 * {
    font-family:LXGW WenKai
}
* {
    font-weight:bold
}
body {
    font-family: LXGW WenKai;
}

/*以下为评论系统专用*/
/*适配大小契合度*/
 .newValine {
    width: min(96%, 940px);
    flex-direction: column;
    row-gap: var(--hope-space-2);
    border-radius: var(--hope-radii-xl);
    padding: var(--hope-space-2);
    box-shadow: var(--hope-shadows-lg);
}
/*评论区 - 白天模式透明度*/
 .hope-ui-light .newValine {
    background-color: rgba(255, 255, 255, 0.5) !important;
}
/*评论区 - 夜间模式透明度*/
 .hope-ui-dark .newValine {
    background-color:rgb(0 0 0 / 50%) !important;
}
/*输入栏里面跳舞的小人背景图*/
 .vedit {
    background-image:url("https://cdn.jsdelivr.net/gh/anwen-anyi/imgAnwen/images/OuNiJiang.gif");
    background-size:contain;
    background-repeat:no-repeat;
    background-position:right bottom;
    transition:all 0.25s ease-in-out 0s;
}
textarea#comment-textarea:focus {
    background-position-y:120px;
    transition:all 0.25s ease-in-out 0s;
}

/*渐变背景CSS*/
 #canvas-basic {
    position: fixed;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -999;
}

/*音乐播放器进一步进行隐藏*/
/* 需要就加不需要就不用加 */
 .aplayer.aplayer-fixed.aplayer-narrow .aplayer-body {
    left: -66px !important;
}
.aplayer.aplayer-fixed.aplayer-narrow .aplayer-body:hover {
    left: 0 !important;
}
</style>

<!--看板娘 -自定义大小，隐藏对话框和对话框高度-->
<style type="text/css">
  #waifu #live2d {
    height: 350px!important;
    width: 350px!important;
  }
  #waifu-tips {
    top: -60px;
    /*display:none !important;隐藏对话框*/
  }
</style>

<!--看板娘加载指定模型-->
<script>
  localStorage.setItem('modelId', '7');
  localStorage.setItem('modelTexturesId', '3');
</script>

<!--以下四个两个主用两个备用的,选一条使用即可-->
<!--自己选左右-->
<!--<script src="https://api.itggg.cn/live2dnew/left/index.js"></script>-->
<script src="https://api.itggg.cn/live2dnew/right/index.js"></script>

<!--备用的，自己选左右-->
<script src="https://luluossfile.lulufind.com/work/teacher_u20221017ce7b5991_1666420843832_19934968_file.js"></script>
<script src="https://luluossfile.lulufind.com/work/teacher_u20221017bb6d7454_1666420849979_19584065_file.js"></script>

<style>
/*白天模式 搜索主体+毛玻璃*/
.hope-ui-light .hope-c-PJLV-iiBaxsN-css{
   background-color: rgba(255,255,255,0.2)!important;
   backdrop-filter: blur(10px)!important;
}

/*白天模式 搜索栏输入框+毛玻璃*/
.hope-ui-light .hope-c-kvTTWD-hYRNAb-variant-filled{
   background-color: rgba(255,255,255,0.2)!important;
   backdrop-filter: blur(10px)!important;
}

/*白天模式 搜索按钮+毛玻璃*/
.hope-ui-light .hope-c-PJLV-ikEIIxw-css{
   background-color: rgba(255,255,255,0.2)!important;
   backdrop-filter: blur(10px)!important;
   padding: var(--hope-space-1)!important;
}

/*夜间模式搜索主体+毛玻璃*/
.hope-ui-dark .hope-c-PJLV-iiBaxsN-css{
    background-color: rgb(0 0 0 / 10%)!important;
    backdrop-filter: blur(10px)!important;
}

/*夜间模式搜索栏+毛玻璃*/
.hope-ui-dark .hope-c-kvTTWD-hYRNAb-variant-filled{
    background-color: rgb(0 0 0 / 10%)!important;
    backdrop-filter: blur(10px)!important;
}

/*夜间模式 搜索按钮+毛玻璃*/
.hope-ui-dark .hope-c-PJLV-ikEIIxw-css{
    background-color: rgb(0 0 0 / 10%)!important;
    backdrop-filter: blur(10px)!important;
    padding: var(--hope-space-1)!important;
}
</style>

<!--较为个性化的鼠标指针样式，可结合个人需要自行修改-->
<style>
  body {
    cursor: url(http://luluossfile.lulufind.com/work/teacher_u20221021b3a89013_1666841028833_10660845_file.cur), default;
  }
  select{
    cursor: url(http://luluossfile.lulufind.com/work/teacher_u2021090299b56677_1666842679271_10490748_file.cur), pointer;
  }
  button,a:hover{
    cursor: url(http://luluossfile.lulufind.com/work/teacher_u20221017ac9f1124_1666842626270_11086578_file.cur), pointer;
  }
  input{
    cursor:url(http://luluossfile.lulufind.com/work/teacher_u2021090299b56677_1666842633386_14976764_file.cur), text;
  }
  textarea,input:focus{
    cursor:url(http://luluossfile.lulufind.com/work/teacher_u202210176ba36766_1666842640146_15845280_file.cur), text;
  }
  code{
    cursor: url(http://luluossfile.lulufind.com/work/teacher_u20221021b3a89013_1666842646779_15864973_file.cur), default;
  }
  pre>code{
    cursor: url(http://luluossfile.lulufind.com/work/teacher_u202210176ba36766_1666842653500_10010236_file.cur), default;
  }
</style>
```

<CodePen class="h-300px" name="Margin Collapse" id="WqXGpo" user="YunYouJun" tab="html,result" />