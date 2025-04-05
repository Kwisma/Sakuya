---
layout: post
date: 2025-04-05 21:38:16
title: 防止 DNS 和 WebRTC 泄露的配置指南
categories:
 - 教程
tags:
 - mihomo
 - DNS
 - WebRTC
 - 隐私保护
 - 配置指南
---

## 前言

在现代互联网中，隐私保护变得越来越重要。DNS 和 WebRTC 泄露是两个常见的隐私风险，它们可能会暴露您的真实 IP 地址和网络活动，即使您使用了代理或 VPN。本文将详细介绍如何通过配置 DNS 和 WebRTC 设置，防止这些泄露，保护您的隐私。

<!-- more -->

## 防止 DNS 泄露
全部dns路由国外,仅包含在`RULE-SET:CN,Private`的dns路由国内以防止 DNS 泄露，您可以通过以下配置启用增强的 DNS 模块。以下是配置项的简要说明：

- `enable`: 启用 DNS 模块。
- `prefer-h3`: 优先使用 HTTP/3 协议进行 DNS 查询。
- `use-hosts` 和 `use-system-hosts`: 使用自定义和系统的 hosts 文件条目。
- `respect-rules`: 确保 DNS 查询遵守路由规则。
- `listen`: 设置本地 DNS 服务监听的地址和端口。
- `ipv6`: 启用 IPv6 DNS 解析。
- `default-nameserver`: 配置默认的 DNS 服务器地址。
- `enhanced-mode`: 启用增强模式（`redir-host` 或 `fake-ip`）。
- `fake-ip-range`: 配置 fake-ip 地址池。
- `fake-ip-filter`: 配置 fake-ip 的过滤规则。
- `nameserver`: 配置用于 DNS 查询的服务器列表。
- `proxy-server-nameserver`: 配置用于代理节点域名解析的 DNS 服务器。
- `direct-nameserver`: 配置用于直连出口域名解析的 DNS 服务器。
- `nameserver-policy`: 根据规则集为特定域名指定 DNS 服务器。

以下是示例配置：

```yaml
dns:
  enable: true # 启用 DNS 模块
  prefer-h3: true # DOH 优先使用 http/3
  use-hosts: true # 使用配置中的 hosts 文件条目
  use-system-hosts: true # 使用系统的 hosts 文件条目
  respect-rules: true # dns 连接遵守路由规则，需配置 proxy-server-nameserver
  listen: 0.0.0.0:1053 # 本地 DNS 监听端口，默认是 1053 端口
  ipv6: true # 启用 IPv6 DNS 解析，避免 IPv6 地址的解析请求
  default-nameserver:
    - tls://223.5.5.5:853 # 阿里 DNS 解析 DNS 域名
    - tls://223.6.6.6:853 # 阿里 DNS 解析 DNS 域名
  enhanced-mode: fake-ip # 启用增强模式 redir-host or fake-ip
  fake-ip-range: 10.10.10.1/16 # fake-ip 池设置
  fake-ip-filter-mode: blacklist
  fake-ip-filter:
    - '*'
  nameserver:
    - "https://cloudflare-dns.com/dns-query" # Cloudflare DNS over H3
    - "https://dns.google/dns-query" # Google DNS over H3
    - "https://doh.dns.sb/dns-query" # SB DNS over H3
    - "https://public.dns.iij.jp/dns-query" # IIJ DNS over H3
  proxy-server-nameserver: # 用于节点域名解析 DNS 服务器
    - "https://dns.alidns.com/dns-query" # 阿里 DNS over H3
  direct-nameserver: #  用于直连出口域名解析的 DNS 服务器
    - "https://dns.alidns.com/dns-query" # 阿里 DNS over H3
  nameserver-policy:
    RULE-SET:CN,Private:
      - "https://dns.alidns.com/dns-query" # 阿里 DNS over H3
```

## 防止 WebRTC 泄露

WebRTC 泄露可能会暴露真实的 IP 地址，即使您使用了代理。为了防止 WebRTC 泄露，您需要启用 TUN 模式，确保所有流量都经过代理。以下是配置项的简要说明：

- `enable`: 启用 TUN 模式，用于透明代理。
- `stack`: 指定使用的网络栈，可选值为 `system`、`gvisor` 或 `mixed`。
- `auto-route`: 自动根据流量选择最佳路由。
- `auto-redirect`: 自动配置 iptables/nftables 以重定向 TCP 连接。
- `auto-detect-interface`: 自动检测并使用适当的网络接口。
- `dns-hijack`: 劫持指定端口的 DNS 请求，确保 DNS 查询通过代理。
- `device`: 指定 TUN 设备名称，默认为 `utun0`。
- `exclude-package`: 配置不经过代理的流量包。

以下是示例配置：

```yaml
tun:
  enable: true # 启用 TUN 模式，用于透明代理
  stack: gvisor # 使用空间网络栈处理流量，可用值： system/gvisor/mixed
  auto-route: true # 自动根据流量选择最佳路由
  auto-redirect: true # 自动配置 iptables/nftables 以重定向 TCP 连接
  auto-detect-interface: true # 自动检测并使用适当的网络接口
  dns-hijack:
    - any:53 # 劫持所有 53 端口的 DNS 请求
    - tcp://any:53 # 劫持所有 TCP 53 端口的 DNS 请求
  device: utun0 # 指定 TUN 设备名称，默认为 utun0
  exclude-package: [] # 配置不经过代理的流量包
```

通过上述配置，您可以有效防止 WebRTC 泄露，保护您的隐私。

## 完整配置

完整配置文件: [点击这里](https://jsd.onmicrosoft.cn/gh/Kwisma/MarketNest@main/vpn/mihomo/Mihomo.yaml)

