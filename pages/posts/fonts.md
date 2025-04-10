---
layout: post
date: 2025-04-05 19:09:48
title: Linux一键安装中文字体
categories:
 - 字体
tags:
 - Linux
 - 字体
 - 中文
 - 脚本
 - fonts
---

## 前言

在Linux系统中，默认情况下可能缺少一些常用的中文字体，这会导致在某些场景下显示中文字符时出现乱码或不美观的问题。本文将介绍一个简单的一键安装脚本，帮助您快速配置中文字体，提升系统的显示效果。

<!-- more -->

## 代码

复制保存到 `fonts.sh`

```bash
#!/bin/bash

# 搜索中文字体软件包描述
search_results=$(apt-cache search fonts | grep Chinese)

# 提取软件包名称
package_names=$(echo "$search_results" | awk '{print $1}')

# 检查当前用户是否为管理员
if [ $(id -u) -eq 0 ]; then
  apt_cmd="apt install"
else
  apt_cmd="sudo apt install"
fi

# 安装匹配的软件包
$apt_cmd -y $package_names
```

## 安装

```bash
bash fonts.sh
```
