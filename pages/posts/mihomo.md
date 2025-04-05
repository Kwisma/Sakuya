---
layout: post
date: 2025-04-05 21:13:06
title: mihomo安装与配置指南
categories:
 - 教程
tags:
 - mihomo
 - Linux
 - 配置
 - 代理

---

## 前言

本文将详细介绍如何在Linux系统上安装和配置mihomo工具，包括设置服务、配置面板以及代理的使用方法，帮助您快速上手。

<!-- more -->

# mihomo Linux安装

下载[mihomo](https://github.com/MetaCubeX/mihomo/)

```text
wget https://github.com/MetaCubeX/mihomo/releases/download/v1.19.4/mihomo-linux-amd64-v1.19.4.gz
```

解压

```text
gzip -d mihomo-linux-amd64-v1.19.4.gz
```

移动到/usr/local/bin/mihomo并重命名

```text
mv mihomo-linux-amd64 /usr/local/bin/mihomo
```

给执行权限

```text
chmod +x /usr/local/bin/mihomo
```

设置成服务

```text
vim /etc/systemd/system/mihomo.service
```

```text
[Unit]
Description=mihomo service
After=network.target

[Service]
Type=simple
User=root
ExecStart=/usr/local/bin/mihomo
Restart=on-failure # or always, on-abort, etc

[Install]
WantedBy=multi-user.target
```

设置开机自启

```text
systemctl daemon-reload
systemctl enable mihomo
```

启动

```text
service mihomo start
```

## 配置面板

```text
cd ~/.config/mihomo
```

下载面板，解压，重命名

```text
wget https://github.com/haishanh/yacd/archive/gh-pages.zip
unzip gh-pages.zip
mv yacd-gh-pages/ dashboard/
```

配置面板

```text
external-ui: dashboard
```

secret: xxxx #设置访问密码

external-controller: 0.0.0.0:9090  #别忘记在服务器厂商开放端口号

external-ui: dashboard  #面板路径

## 修改系统代理

设置代理

```text
vim /etc/profile
```

全局代理(开关版)

```text
alias kmihomo="export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890"
alias gmihomo="unset  http_proxy  https_proxy  all_proxy"
```

开启代理

```text
kmihomo
```

关闭代理

```text
gmihomo
```

全局代理

```text
export http_proxy=127.0.0.1:9090
export https_proxy=127.0.0.1:9090
```

重载配置文件

```text
source /etc/profile
```

查看代理是否代理

```text
env|grep -i proxy
```

### 其他指令

查看服务状态

```text
service mihomo status
```

重启服务

```text
service mihomo restart
```

停止服务

```text
service mihomo stop
```
