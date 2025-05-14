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
npm install sharp fs-extra inquirer@8
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
const inquirer = require('inquirer');

// === 配置区域 ===
const inputDir = path.resolve(__dirname, 'input');         // 输入文件夹
const outputDir = path.resolve(__dirname, 'output');       // 输出文件夹

const supportedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.svg']; // 支持的格式

fs.ensureDirSync(outputDir);

// ✅ 仅转换格式（不调整尺寸）
async function convertFormatsOnly(inputDir, outputDir) {
  const files = await fs.readdir(inputDir);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!supportedFormats.includes(ext)) {
      console.log(`跳过不支持的文件: ${file}`);
      continue;
    }

    const inputPath = path.join(inputDir, file);
    const baseFileName = path.basename(file, ext);

    console.log(`仅转换格式: ${file}`);

    try {
      const image = sharp(inputPath);
      await image.clone().png().toFile(path.join(outputDir, `${baseFileName}_only.png`));
      await image.clone().webp({ quality: 100 }).toFile(path.join(outputDir, `${baseFileName}_only.webp`));
      await image.clone().jpeg({ quality: 100 }).toFile(path.join(outputDir, `${baseFileName}_only.jpeg`));

      if (ext === '.svg') {
        await fs.copyFile(inputPath, path.join(outputDir, `${baseFileName}_only.svg`));
      }

      console.log(`✅ 完成: ${file}`);
    } catch (err) {
      console.error(`❌ 格式转换失败: ${file}`, err);
    }
  }
}

// ✅ 调整尺寸 + 转换格式
async function resizeAndConvertImages(inputDir, outputDir, targetSize) {
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
      const resizedImage = sharp(inputPath)
        .resize(targetSize, targetSize, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        });

      await resizedImage.clone().png().toFile(path.join(outputDir, `${baseFileName}.png`));
      await resizedImage.clone().webp({ quality: 100 }).toFile(path.join(outputDir, `${baseFileName}.webp`));
      await resizedImage.clone().jpeg({ quality: 100 }).toFile(path.join(outputDir, `${baseFileName}.jpeg`));

      if (ext === '.svg') {
        await resizedImage.clone().toFile(path.join(outputDir, `${baseFileName}.svg`));
      }

      console.log(`✅ 完成: ${file}`);
    } catch (err) {
      console.error(`❌ 转换失败: ${file}`, err);
    }
  }
}

// ✅ 获取用户输入的尺寸
async function askSize() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'size',
      message: '请输入目标宽高（一个整数，代表宽高都为此值）：',
      default: 48, // ✅ 默认值
      validate: value => {
        const valid = !isNaN(parseInt(value)) && parseInt(value) > 0;
        return valid || '请输入一个正整数';
      }
    }
  ]);
  return parseInt(answers.size);
}

// === 主程序 ===
(async () => {
  try {
    console.log('🔁 开始执行【仅格式转换】...');
    await convertFormatsOnly(inputDir, outputDir);

    const targetSize = await askSize();
    console.log(`🔧 设置目标尺寸为 ${targetSize} x ${targetSize}`);
    await resizeAndConvertImages(inputDir, outputDir, targetSize);

    console.log('🎉 所有操作完成！');
  } catch (err) {
    console.error('处理出错:', err);
  }
})();

```
