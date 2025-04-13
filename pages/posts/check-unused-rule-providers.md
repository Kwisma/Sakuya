---
layout: post
date: 2025-04-13 18:27:09
title: YAML Rule Provider 检查工具
categories:
 - 脚本
tags:
  - Clash
  - Mihomo
  - YAML
  - Nodejs
  - Proxy-config
  - Rule-providers
  - Config-cleaner
  - automation
---

## 前言

在配置如 Clash 等代理工具的 YAML 文件时，经常会出现定义了许多 `rule-providers`，但在 `rules` 中实际并未使用的问题。这不仅会导致配置臃肿、维护成本增加，也可能降低配置文件的加载效率。

为了解决这个问题，本工具可自动读取并分析你的 YAML 配置文件，找出那些 **在 `rule-providers` 中定义了却没有在 `rules` 中被引用** 的部分，并输出详细的日志与统计信息，方便你快速清理无用规则。

<!-- more -->

## 🎯 功能简介

- ✅ 自动分析 `config.yaml` 中的 `rules` 和 `rule-providers`
- ✅ 精准识别 `RULE-SET` 类型的规则引用
- ✅ 找出未被引用的 `rule-providers`
- ✅ 输出详细日志信息与总计统计
- ✅ 帮助你优化配置文件，清理无效资源

---

## 📦 安装方法

你需要先确保本地有 Node.js 环境，然后安装 `js-yaml` 依赖：

```bash
npm install js-yaml
```

---

## 🚀 使用方法

将以下脚本保存为 `check-unused-rule-providers.js`：

```js
const fs = require('fs');
const yaml = require('js-yaml');

// 加载 YAML 文件
const filePath = 'Mihomo.yaml';
console.log(`📄 正在读取文件: ${filePath}`);

const fileContent = fs.readFileSync(filePath, 'utf8');
const config = yaml.load(fileContent);

// 获取 rule-providers
const ruleProviders = config['rule-providers'] || {};
const providerKeys = Object.keys(ruleProviders);
// console.log('🔍 发现的 rule-providers:');
providerKeys.forEach(key => {
  // console.log(`- ${key}`);
});
// console.log(`总数：${providerKeys.length}\n`);

// 读取并分析 rules
const rules = config.rules || [];
// console.log('📦 分析 rules 列表:');
rules.forEach((rule, index) => {
  // console.log(`${index + 1}. ${rule}`);
});
// console.log('');

// 提取 rules 中的 RULE-SET 使用情况
const usedProviders = new Set();
let ruleSetCount = 0;

rules.forEach(rule => {
  const parts = rule.split(',');
  if (parts[0] === 'RULE-SET' && parts.length >= 2) {
    const providerName = parts[1].trim().toLowerCase();
    usedProviders.add(providerName);
    ruleSetCount++;
    // console.log(`✅ 规则使用了 provider: ${providerName}`);
  }
});
// console.log('');

// 查找未被使用的 rule-providers
console.log('🧾 检查哪些 rule-providers 没有被使用...');
const unusedProviders = providerKeys.filter(p => !usedProviders.has(p.toLowerCase()));

// 输出结果
if (unusedProviders.length === 0) {
  console.log('✅ 所有 rule-providers 都已在 rules 中使用。');
} else {
  console.log('⚠️ 未在 rules 中使用的 rule-providers:');
  unusedProviders.forEach(p => console.log(`- ${p}`));
}

// 输出统计信息
console.log('📊 统计信息:');
console.log(`- rule-providers 总数: ${providerKeys.length}`);
console.log(`- rules 中 RULE-SET 规则数量: ${ruleSetCount}`);
console.log(`- 未使用的 rule-providers 数量: ${unusedProviders.length}`);
```

执行代码

```bash
node check-unused-rule-providers.js
```

默认会读取当前目录下的 `config.yaml` 文件。

如果你的配置文件不叫 `config.yaml`，可修改脚本中的：

```js
const filePath = 'config.yaml'; // 改为你的文件名
```

---

## 📄 示例 YAML 结构

```yaml
rules:
  - RULE-SET,lan,proxy
  - RULE-SET,ads,direct

rule-providers:
  Lan:
    <<: *classical
    url: url
    path: ./ruleset/Lan.yaml
  Ads:
    <<: *classical
    url: url
    path: ./ruleset/Ads.yaml
  NotUsed:
    <<: *classical
    url: url
    path: ./ruleset/NotUsed.yaml
```

---

## 📤 示例输出结果

```
📄 正在读取文件: config.yaml

🔍 发现的 rule-providers:
- Lan
- Ads
- NotUsed
总数：3

📦 分析 rules 列表:
1. RULE-SET,lan,proxy
2. RULE-SET,ads,direct

✅ 规则使用了 provider: lan
✅ 规则使用了 provider: ads

🧾 检查哪些 rule-providers 没有被使用...

⚠️ 未在 rules 中使用的 rule-providers:
- NotUsed

📊 统计信息:
- rule-providers 总数: 3
- rules 中 RULE-SET 规则数量: 2
- 未使用的 rule-providers 数量: 1
```
