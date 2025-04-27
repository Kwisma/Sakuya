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
const resizedDir = path.resolve(__dirname, 'resized');     // 调整尺寸后的文件夹（可选）
const convertedDir = path.resolve(__dirname, 'converted'); // 格式转换后的文件夹

const resizeEnabled = true;   // 是否启用尺寸调整 true=开启 false=关闭
const targetWidth = 512;      // 目标宽度
const targetHeight = 512;     // 目标高度
const supportedFormats = ['.jpg', '.jpeg', '.png', '.webp']; // 支持的格式

// 确保输出目录存在
fs.ensureDirSync(convertedDir);

// 调整图片尺寸
async function resizeImages(inputDir, outputDir) {
  await fs.ensureDir(outputDir);
  const files = await fs.readdir(inputDir);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!supportedFormats.includes(ext)) {
      console.log(`跳过不支持的文件: ${file}`);
      continue;
    }

    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);

    console.log(`调整尺寸: ${file}`);

    await sharp(inputPath)
      .resize(targetWidth, targetHeight, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .toFile(outputPath);
  }
}

// PNG → WebP
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
      console.log(`✅ PNG → WebP: ${file} → ${outputFileName}`);
    } catch (err) {
      console.error(`❌ 转换失败: ${file}`, err);
    }
  }
}

// WebP → PNG
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
      console.log(`✅ WebP → PNG: ${file} → ${outputFileName}`);
    } catch (err) {
      console.error(`❌ 转换失败: ${file}`, err);
    }
  }
}

// JPEG → PNG
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
      console.log(`✅ JPEG → PNG: ${file} → ${outputFileName}`);
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
      console.log('🔧 开始调整图片尺寸...');
      await resizeImages(inputDir, resizedDir);
      workingDir = resizedDir; // 如果调整了尺寸，后续在 resized 里面处理
    } else {
      console.log('🚫 尺寸调整已关闭，直接使用原始 input 文件夹...');
    }

    console.log('🚀 开始执行格式转换（基于 ' + path.basename(workingDir) + ' 文件夹）...');
    await batchPngToWebp(workingDir, convertedDir);
    await batchWebpToPng(workingDir, convertedDir);
    await batchJpegToPng(workingDir, convertedDir);

    console.log('🎉 全部处理完成！');
  } catch (err) {
    console.error('处理出错:', err);
  }
})();

```
