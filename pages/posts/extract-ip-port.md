---
layout: post
date: 2025-04-011 17:59:36
title: 提取 IP 和端口的 Node.js 脚本
categories:
 - 脚本
tags:
 - Node.js
 - JSON
 - 数据处理
 - 去重

---

## 前言

在日常开发中，我们经常需要从大量数据中提取有用的信息，例如从日志或数据文件中提取 IP 和端口。手动处理这些数据既耗时又容易出错，因此编写一个自动化脚本来完成这项任务显得尤为重要。

本文将介绍一个使用 Node.js 编写的脚本，能够从 JSON 格式的数据文件中提取 IP 和端口，并自动去重，帮助开发者快速整理和分析数据。

<!-- more -->

---

假设你有一个文本文件（例如 data.json），每一行是一条 JSON 数据：

```json
{"host": "https://112.170.255.67:50001", "ip": "112.170.255.67", "port": "50001", "server": "cloudflare", "country": "KR"}
{"host": "https://152.70.90.42", "ip": "152.70.90.42", "port": "443", "server": "cloudflare", "country": "KR"}
```

### Node.js 脚本：`extract-ip-port.js`（含去重）

```js
const fs = require('fs');
const readline = require('readline');

const inputFile = 'data.json';
const outputFile = 'ip.txt';

async function extractUniqueIPPort(input, output) {
  const fileStream = fs.createReadStream(input);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const uniqueSet = new Set();

  for await (const line of rl) {
    try {
      const json = JSON.parse(line);
      if (json.ip && json.port) {
        const combo = `${json.ip} ${json.port}`;
        uniqueSet.add(combo);
      }
    } catch (err) {
      console.error(`解析失败的行: ${line}`);
    }
  }

  // 写入去重后的结果
  fs.writeFileSync(output, Array.from(uniqueSet).join('\n'), 'utf8');
  console.log(`去重后的 IP 和端口已保存到 ${output}`);
}

extractUniqueIPPort(inputFile, outputFile);
```

---

### 🛠 使用说明：

1. 将上面的代码保存为 `extract-ip-port.js`。
2. 确保 `data.txt` 文件存在，且每行为一条合法的 JSON。
3. 执行脚本：
```bash
node extract-ip-port.js
```

---

输出的 `ip.txt` 中只会包含唯一的 `ip port` 组合，例如：

```txt
112.170.255.67 50001
152.70.90.42 443
```
