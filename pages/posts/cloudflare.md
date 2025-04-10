---
layout: post
date: 2025-04-05 17:25:39
title: cloudflare 批量脚本
categories:
 - Cloudflare
tags:
 - Cloudflare
 - DNS
 - 脚本
 - 自动化
---

## 前言

在使用 Cloudflare 管理域名时，批量操作 DNS 记录是一项常见需求。本文将介绍如何通过简单的脚本实现批量删除和添加 DNS 记录，帮助您更高效地管理域名解析。

<!-- more -->

## 令牌 和 区域ID 获取方法

CLOUDFLARE_API_TOKEN 获取方式: 右上角头像 > 配置文件 > api令牌 > 创建令牌 > 编辑区域 DNS > 使用模板 > 继续以显示摘要 > 创建令牌 > copy

![](/img/cloudflare/cf1.webp)
![](/img/cloudflare/cf2.webp)
![](/img/cloudflare/cf3.webp)
![](/img/cloudflare/cf4.webp)
![](/img/cloudflare/cf5.webp)
![](/img/cloudflare/cf6.webp)

ZONE_ID 获取方式：点击域名 > 描述 > API 区域 ID(往下滑动)

![](/img/cloudflare/dm1.webp)
![](/img/cloudflare/dm2.webp)

## 安装依赖

```bash
npm i node-fetch
```

## 批量删除dns记录


**修改参数如下即可**：

const CLOUDFLARE_API_TOKEN = '令牌'; // 你的 Cloudflare API 令牌

const ZONE_ID = '区域ID'; // 你的 Cloudflare 区域 ID

// 要删除的记录类型和子域名（完整）

const RECORD_TYPE = 'A'; // 比如 'A', 'CNAME', 'TXT'

const TARGET_NAME = 'sub.mot.ip-ddns.com'; // 要删除的完整子域名

### 完整代码

```js
const fetch = require('node-fetch')

// 替换以下常量为你的实际值
const CLOUDFLARE_API_TOKEN = '令牌'; // 你的 Cloudflare API 令牌
const ZONE_ID = '区域ID'; // 你的 Cloudflare 区域 ID

// 要删除的记录类型和子域名（完整）
const RECORD_TYPE = 'A'; // 比如 'A', 'CNAME', 'TXT'
const TARGET_NAME = '子域名'; // 要删除的完整子域名

// Cloudflare API 基础地址
const CLOUDFLARE_API_BASE = `https://api.cloudflare.com/client/v4`;

async function listAllDnsRecords(zoneId, type, name) {
  const allRecords = [];
  let page = 1;
  let totalPages = 1;

  do {
    const url = `${CLOUDFLARE_API_BASE}/zones/${zoneId}/dns_records?type=${type}&name=${name}&page=${page}&per_page=100`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    if (!data.success) {
      throw new Error(`Failed to list DNS records: ${JSON.stringify(data.errors)}`);
    }

    allRecords.push(...data.result);
    totalPages = data.result_info.total_pages;
    page++;
  } while (page <= totalPages);

  return allRecords;
}

async function main() {
  try {
    console.log(`查找 ${RECORD_TYPE} 类型的记录，名称为 ${TARGET_NAME}...`);
    const records = await listAllDnsRecords(ZONE_ID, RECORD_TYPE, TARGET_NAME);

    if (records.length === 0) {
      console.log('没有找到符合条件的 DNS 记录。');
      return;
    }

    console.log(`找到 ${records.length} 条记录，开始删除...`);
    for (const record of records) {
      console.log(`删除记录 ID: ${record.id}, 内容: ${record.content}`);
      await deleteDnsRecord(ZONE_ID, record.id);
    }

    console.log('删除完成 ✅');
  } catch (err) {
    console.error('出错啦 ❌', err.message);
  }
}

async function deleteDnsRecord(zoneId, recordId) {
  const url = `${CLOUDFLARE_API_BASE}/zones/${zoneId}/dns_records/${recordId}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  if (!data.success) {
    throw new Error(`Failed to delete DNS record: ${JSON.stringify(data.errors)}`);
  }

  return data;
}

main();
```

## 批量日添加dns记录

**修改参数如下即可**：

const CLOUDFLARE_API_TOKEN = '令牌'; // 你的 Cloudflare API 令牌

const ZONE_ID = '区域ID'; // 你的 Cloudflare 区域 ID

const RECORD_TYPE = 'A'; // 或 AAAA

const DOMAIN = 'sub.mot.ip-ddns.com'; // 要添加的完整子域名

const FILE_PATH = './dns.txt'; // 数据文件路径，格式为 IP 地址列表，每行一个 IP，支持注释（#开头）和端口（:后面）例如：ip1:port1#注释

### 完整代码

```js
const fs = require('fs/promises')
const fetch = require('node-fetch')

// 配置区：根据你的需求修改
const CLOUDFLARE_API_TOKEN = '令牌'; // 你的 Cloudflare API 令牌
const ZONE_ID = '区域ID'; // 你的 Cloudflare 区域 ID
const RECORD_TYPE = 'A'; // 或 AAAA
const DOMAIN = 'sub.mot.ip-ddns.com'; // 要添加的完整子域名
const FILE_PATH = './dns.txt'; // 数据文件路径，格式为 IP 地址列表，每行一个 IP，支持注释（#开头）和端口（:后面）
// 例如：ip1:port1#注释

// Cloudflare API base
const CF_API_BASE = 'https://api.cloudflare.com/client/v4';

// 读取并处理 IP 地址
async function readIPsFromFile(path) {
  const data = await fs.readFile(path, 'utf-8');
  const lines = data.split('\n').map(line => line.trim()).filter(Boolean);

  const ips = lines.map(line => {
    const [ipPort] = line.split('#');
    const [ip] = ipPort.split(':');
    return ip;
  });

  return [...new Set(ips)]; // 去重
}

// 添加 DNS 记录
async function addDNSRecord(ip) {
  const response = await fetch(`${CF_API_BASE}/zones/${ZONE_ID}/dns_records`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: RECORD_TYPE,
      name: DOMAIN,
      content: ip,
      ttl: 1, // 自动 TTL
      proxied: false // 如果你想用 CF 的代理，改成 true
    })
  });

  const result = await response.json();
  if (result.success) {
    console.log(`✅ 添加成功: ${ip}`);
  } else {
    console.error(`❌ 添加失败: ${ip}`, result.errors);
  }
}

// 主函数
async function main() {
  try {
    const ips = await readIPsFromFile(FILE_PATH);
    console.log(`共读取 ${ips.length} 个 IP，将添加到 ${DOMAIN}`);

    for (const ip of ips) {
      await addDNSRecord(ip);
    }

    console.log('🎉 所有记录处理完毕。');
  } catch (err) {
    console.error('🚨 发生错误:', err);
  }
}

main();
```
