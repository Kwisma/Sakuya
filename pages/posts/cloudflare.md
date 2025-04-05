---
layout: post
date: 2025-04-05 17:25:39
title: cf worker 伪装nginx
excerpt: 基于 Cloudflare Workers 的 JavaScript 脚本，伪装成一个 Nginx 服务器
categories:
 - 教程
tags:
 - 代码
 - nginx
 - workers
cover: /posts/ssl.webp
---

## 令牌 和 区域ID 获取方法

CLOUDFLARE_API_TOKEN 获取方式: 右上角头像 > 配置文件 > api令牌 > 创建令牌 > 编辑区域 DNS > 使用模板 > 继续以显示摘要 > 创建令牌 > copy

ZONE_ID 获取方式：

## 批量删除dns记录

源码：[点击这里](/cloudflare/delete.js)

**修改参数如下即可**：

const CLOUDFLARE_API_TOKEN = '令牌'; // 你的 Cloudflare API 令牌

const ZONE_ID = '区域ID'; // 你的 Cloudflare 区域 ID

// 要删除的记录类型和子域名（完整）

const RECORD_TYPE = 'A'; // 比如 'A', 'CNAME', 'TXT'

const TARGET_NAME = 'sub.mot.ip-ddns.com'; // 要删除的完整子域名

## 批量日添加dns记录

源码：[点击这里](/cloudflare/add.js)

**修改参数如下即可**：

const CLOUDFLARE_API_TOKEN = '令牌'; // 你的 Cloudflare API 令牌

const ZONE_ID = '区域ID'; // 你的 Cloudflare 区域 ID

const RECORD_TYPE = 'A'; // 或 AAAA

const DOMAIN = 'sub.mot.ip-ddns.com'; // 要添加的完整子域名

const FILE_PATH = './dns.txt'; // 数据文件路径，格式为 IP 地址列表，每行一个 IP，支持注释（#开头）和端口（:后面）例如：ip1:port1#注释

