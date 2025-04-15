---
layout: post
date: 2025-04-010 20:05:16
title: 随机域名
categories:
 - 脚本
tags:
 - 域名
 - Node.js
 - 脚本开发
 - 自动化
---

## 前言

在互联网时代，域名是网站的门牌号，一个好的域名不仅能提升品牌形象，还能增加用户的记忆度。然而，随着优质域名资源的逐渐减少，找到一个未被注册的理想域名变得越来越困难。为了简化这一过程，我们可以利用脚本自动生成随机域名并检查其可注册性，从而节省时间和精力。

本文将介绍如何使用 Node.js 编写一个脚本，生成随机的 5 位字母域名并检查其可注册性，同时将可用的域名动态保存到文件中。这种方法适合需要批量筛选域名的用户，帮助您快速找到心仪的域名。

<!-- more -->

生成随机的 5 位字母域名（例如，`abcde.com`），并在无限循环中检查其可注册性，将可注册的域名动态保存到文件中。以下是实现此功能的 Node.js 脚本：

1. **安装必要的依赖包**：

```bash
npm install whois fs
```

2. **创建并运行脚本**：

将以下代码保存为 `checkDomains.js`，然后在终端中运行：

```bash
node checkDomains.js
```

3. **代码实现**：

```javascript
const whois = require('whois');
const fs = require('fs');
const util = require('util');

const queryWhois = util.promisify(whois.lookup);
const checkedDomains = new Set();
const availableDomainsFile = 'available_domains.txt';

// 生成随机的5位字母字符串
function generateRandomDomain() {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let domain = '';
  for (let i = 0; i < 5; i++) {
    domain += chars[Math.floor(Math.random() * chars.length)];
  }
  return domain + '.com';
}

// 检查域名是否可注册
async function checkDomainAvailable(domain) {
  try {
    const data = await queryWhois(domain);
    if (data && (data.includes('No match') || data.includes('NOT FOUND'))) {
      console.log(`${domain} 可注册`);
      fs.appendFileSync(availableDomainsFile, domain + '\n');
    } else {
      console.log(`${domain} 已注册`);
    }
  } catch (err) {
    console.error(`查询 ${domain} 时出错: `, err);
  }
}

// 主函数：无限循环生成并检查域名
async function main() {
  while (true) {
    let domain;
    do {
      domain = generateRandomDomain();
    } while (checkedDomains.has(domain));

    checkedDomains.add(domain);
    await checkDomainAvailable(domain);
  }
}

main();
```

**注意事项**：

- **无限循环**：脚本中的 `while (true)` 实现了无限循环，持续生成并检查域名。

- **去重处理**：使用 `Set` 对象 `checkedDomains` 确保生成的域名不重复。

- **Whois 查询判断**：根据 Whois 查询结果中包含的 `'No match'` 或 `'NOT FOUND'` 字样判断域名是否可注册。不同顶级域名的 Whois 信息格式可能不同，需要根据实际情况调整判断逻辑。

- **保存可注册域名**：可注册的域名会被追加保存到 `available_domains.txt` 文件中。

- **错误处理**：在 Whois 查询过程中，可能会遇到网络问题或其他异常，建议增加错误处理和重试机制。

- **并发控制**：当前实现是串行查询，效率较低。可以使用并发控制库（如 `p-limit`）来提高查询效率，但需注意 Whois 服务器的访问频率限制，避免被封禁。

- **终止脚本**：由于是无限循环运行，若需要停止脚本，可在终端中使用 `Ctrl + C`。

希望这段代码和说明能帮助您实现批量查询 Whois 并判断可注册域名的功能。
