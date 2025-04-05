---
layout: post
date: 2025-04-05 17:18:39
title: Linux 添加代理
categories:
 - 网络配置
tags:
 - Linux
 - 代理
 - 网络配置
---

## 前言

本文介绍了如何在 Linux 系统中添加和管理代理，包括设置系统代理和快速切换代理的操作方法。

<!-- more -->

## 系统代理

1.编辑文件

```text
vim  /etc/profile
```

2.在文件最下面写入

```text
alias kclash="export ALL_PROXY=127.0.0.1:7890"
alias gclash="unset ALL_PROXY"
```

3.重载配置

```text
source /etc/profile
```

4.开启kclash，关闭gclash

```text
kclash
```

```text
gclash
```
