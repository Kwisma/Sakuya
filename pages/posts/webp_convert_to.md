---
layout: post
date: 2025-04-05 22:16:20
title: 图片格式转换为 WebP
categories:
 - 教程
tags:
 - Node.js
 - Sharp
 - WebP
 - 图片优化
 - PNG 
 - JPEG 
---

## 前言

本文介绍如何使用 Node.js 和 Sharp 库将常见图片格式（如 .jpg、.png、.webp 等）相互转换，以减少图片体积并提升加载速度。

<!-- more -->

## 图片转换脚本

将（如 .jpg、.png、.webp等）图片格式相互转换

## 使用

将[源码](#源码)保存为 webp.js

安装依赖

```bash
npm install sharp fs-extra
```

执行代码

```bash
node webp.js 输入图片目录
```

## 源码
```js
const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');

// === 配置区域 ===
const inputDir = path.resolve(__dirname, 'input');         // 输入文件夹
const outputDir = path.resolve(__dirname, 'output');       // 输出文件夹（调整尺寸和转换格式后的文件都会在这里）

const resizeEnabled = true;   // 是否启用尺寸调整 true=开启 false=关闭
const targetWidth = 512;      // 目标宽度
const targetHeight = 512;     // 目标高度
const supportedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.svg']; // 支持的格式

// 确保输出目录存在
fs.ensureDirSync(outputDir);

// 调整图片尺寸并同时转换为多种格式
async function resizeAndConvertImages(inputDir, outputDir) {
  await fs.ensureDir(outputDir);
  const files = await fs.readdir(inputDir);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!supportedFormats.includes(ext)) {
      console.log(`跳过不支持的文件: ${file}`);
      continue;
    }

    const inputPath = path.join(inputDir, file);
    const baseFileName = path.basename(file, ext);

    console.log(`调整尺寸并转换格式: ${file}`);

    try {
      // 先调整大小
      const resizedImage = sharp(inputPath)
        .resize(targetWidth, targetHeight, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        });

      // 转换为 PNG
      await resizedImage.clone().png().toFile(path.join(outputDir, `${baseFileName}.png`));
      console.log(`✅ 转换为 PNG: ${file}`);

      // 转换为 WebP
      await resizedImage.clone().webp({ quality: 100 }).toFile(path.join(outputDir, `${baseFileName}.webp`));
      console.log(`✅ 转换为 WebP: ${file}`);

      // 转换为 JPEG
      await resizedImage.clone().jpeg({ quality: 100 }).toFile(path.join(outputDir, `${baseFileName}.jpeg`));
      console.log(`✅ 转换为 JPEG: ${file}`);

      // 如果是 SVG 格式，保留原始 SVG 文件（可选）
      if (ext === '.svg') {
        await resizedImage.clone().toFile(path.join(outputDir, `${baseFileName}.svg`));
        console.log(`✅ 转换为 SVG: ${file}`);
      }

    } catch (err) {
      console.error(`❌ 转换失败: ${file}`, err);
    }
  }
}

// 主程序
(async () => {
  try {
    let workingDir = inputDir; // 默认使用 inputDir

    if (resizeEnabled) {
      console.log('🔧 开始调整图片尺寸并转换为多种格式...');
      await resizeAndConvertImages(inputDir, outputDir);
    } else {
      console.log('🚫 尺寸调整已关闭，直接处理文件...');
    }

    console.log('🎉 所有操作完成！');
  } catch (err) {
    console.error('处理出错:', err);
  }
})();

```
