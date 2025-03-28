---
layout: post
date: 2025-03-27 19:18:39
title: Let’s Encrypt 免费申请泛域名 SSL 证书
excerpt: 使用 Let’s Encrypt 免费申请泛域名 SSL 证书，并实现自动续期的快速指令
categories:
 - 证书
tags:
 - 域名
 - 证书
cover: /posts/ssl.webp
---

## 使用 acme.sh 设置 SSL 证书

本指南提供了使用 `acme.sh` 脚本设置 SSL 证书的分步说明，其中 Let's Encrypt 为默认证书颁发机构 (CA)。它包括用于安装、配置和颁发根域和通配符域证书的命令。

## 步骤概述

1. **安装 acme.sh**：下载并安装 `acme.sh` 脚本。提供用于接收通知的电子邮件地址。

```bash
curl https://get.acme.sh | sh -s email=d342jxc@gmail.com
```

2. **设置默认 CA**：配置 `acme.sh` 使用 Let's Encrypt 作为默认 CA。

```bash
acme.sh --set-default-ca --server letsencrypt
```

3. **别名配置**：为`acme.sh`添加别名，以简化命令使用并重新加载shell配置。

```bash
echo 'alias acme.sh=~/.acme.sh/acme.sh' >> ~/.bashrc
source ~/.bashrc
```

4. **Cloudflare API 凭证**：添加 Cloudflare API 凭证（`CF_Key` 和 `CF_Email`）以启用基于 DNS 的域验证。

```bash
export CF_Key="xxx"
export CF_Email="xxx@gmail.com"
```

5. **颁发证书**：使用 `--issue` 命令通过 Cloudflare DNS 验证为根域和通配符子域生成 SSL 证书。

```bash
acme.sh --issue --dns dns_cf -d example.com -d *.example.com
```

6. **安装证书**：将生成的证书安装到指定路径，并为Nginx Web服务器配置重新加载命令。

```bash
acme.sh --install-cert -d 'example.com' \
--key-file       /etc/nginx/ssl/example.com/example.com.key  \
--fullchain-file /etc/nginx/ssl/example.com/example.com.crt \
--reloadcmd     "service nginx force-reload"
```

```bash
acme.sh --install-cert -d '*.example.com' \
--key-file       /etc/nginx/ssl/example.com/example.com.key  \
--fullchain-file /etc/nginx/ssl/example.com/example.com.crt \
--reloadcmd     "service nginx force-reload"
```

## 注意事项

- 将 `xxx` 和 `xxx@gmail.com` 替换为您的实际 Cloudflare API 密钥和电子邮件地址。
- 将 `example.com` 替换为您的实际域名。
- 确保密钥和证书文件的指定路径与您的 Nginx 配置相匹配。
- `--reloadcmd` 选项可确保在证书续订后自动重新加载 Nginx。

此设置可确保根域和所有子域的安全 HTTPS 连接。
