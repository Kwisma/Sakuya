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
npm install sharp
```

执行代码

```bash
node webp.js 输入图片目录
```

## 源码
```js
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// 批量 PNG → WebP
async function batchPngToWebp(inputDir, outputDir) {
  const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.png'));

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputFileName = file.replace(/\.png$/i, '.webp');
    const outputPath = path.join(outputDir, outputFileName);

    try {
      await sharp(inputPath)
        .webp({ quality: 100 })
        .toFile(outputPath);
      console.log(`✅ 转换成功: ${file} → ${outputFileName}`);
    } catch (err) {
      console.error(`❌ 转换失败: ${file}`, err);
    }
  }
}

// 批量 WebP → PNG
async function batchWebpToPng(inputDir, outputDir) {
  const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.webp'));

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputFileName = file.replace(/\.webp$/i, '.png');
    const outputPath = path.join(outputDir, outputFileName);

    try {
      await sharp(inputPath)
        .png()
        .toFile(outputPath);
      console.log(`✅ 转换成功: ${file} → ${outputFileName}`);
    } catch (err) {
      console.error(`❌ 转换失败: ${file}`, err);
    }
  }
}
// 批量 JPEG → PNG
async function batchJpegToPng(inputDir, outputDir) {
  const files = fs.readdirSync(inputDir).filter(file =>
    file.endsWith('.jpg') || file.endsWith('.jpeg')
  );

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputFileName = file.replace(/\.(jpg|jpeg)$/i, '.png');
    const outputPath = path.join(outputDir, outputFileName);

    try {
      await sharp(inputPath)
        .png()
        .toFile(outputPath);
      console.log(`✅ 转换成功: ${file} → ${outputFileName}`);
    } catch (err) {
      console.error(`❌ 转换失败: ${file}`, err);
    }
  }
}
// 示例用法（你可以改成自己想要的目录）
const inputDir = path.resolve(__dirname, 'input');
const outputDir = path.resolve(__dirname, 'output');

fs.mkdirSync(outputDir, { recursive: true });

// 执行 PNG → WebP
batchPngToWebp(inputDir, outputDir);

// 执行 WebP → PNG
batchWebpToPng(inputDir, outputDir);
// 执行 JEPG → PNG
batchJpegToPng(inputDir, outputDir);
```
