---
layout: post
date: 2025-04-15 14:17:30
title: GitHub Release 自动上传脚本
categories: 
  - 脚本
tags: 
  - GitHub
  - GitHub API 
  - Bash
  - 自动化
---

## 前言

本项目提供了一个 Bash 脚本，用于将指定目录下的所有文件自动上传到 GitHub Release。它通过 GitHub API 自动创建以日期命名的 Release、删除已存在的同名附件，并上传最新的文件内容。

该脚本适用于日常任务自动发布、CI/CD 管道中的文件归档、版本记录和工具打包等场景，特别适合需要将每日构建结果或更新文件推送到 Release 的使用者。

<!-- more -->

## 功能介绍

- 自动检测当天的 GitHub Release 是否存在，不存在则创建；
- 自动遍历指定目录下的所有文件，逐个上传到 GitHub Release；
- 如已存在同名附件，自动删除旧附件再上传；
- 上传文件时自动保留原文件名作为 release 附件名。

## 使用说明

### 1. 准备工作

- 拥有一个 GitHub 仓库；
- 生成一个 GitHub Token（需要 `repo` 权限）；
- 安装 `jq`（用于处理 JSON 数据）：
  
```bash
sudo apt install jq
```

### 2. 设置上传目录

将你要上传的文件放入 `upload/` 文件夹（也可修改脚本中的路径）。

### 3. 代码保存

将如下代码保存至 `up.sh`

```bash
#!/bin/bash

token="你的 GitHub Token"
repo="你的用户名/你的仓库名"
upload_dir="upload"  # 可根据需要修改
tag=$(date +"%Y.%m.%d") #上传标签
upload_dir="upload" #上传目录
release_body="" #上传描述

echo "上传文件到 GitHub Release..."

# 获取 release 信息（如果不存在会返回 null）
release_info=$(curl -s -H "Authorization: token ${token}" \
  https://api.github.com/repos/${repo}/releases/tags/${tag})

release_id=$(echo "$release_info" | jq -r '.id')

# 如果 release 不存在，则创建一个
if [[ "$release_id" == "null" || -z "$release_id" ]]; then
  echo "Release 不存在，正在创建 Release..."
  release_info=$(curl -s -X POST \
    -H "Authorization: token ${token}" \
    -H "Content-Type: application/json" \
    -d "{
      \"tag_name\": \"${tag}\",
      \"name\": \"${tag}\",
      \"body\": \"${release_body}\",
      \"draft\": false,
      \"prerelease\": false
    }" \
    https://api.github.com/repos/${repo}/releases)

  release_id=$(echo "$release_info" | jq -r '.id')
  echo "已创建 Release：ID = $release_id"
else
  echo "Release 已存在：ID = $release_id"
fi

# 遍历目录下所有文件上传
for filepath in "$upload_dir"/*; do
  filename=$(basename "$filepath")
  echo "处理文件：$filename"

  # 检查是否已有同名附件
  echo "检查是否已有名为 ${filename} 的附件..."
  assets=$(curl -s -H "Authorization: token ${token}" \
    https://api.github.com/repos/${repo}/releases/${release_id}/assets)

  asset_id=$(echo "$assets" | jq -r ".[] | select(.name == \"${filename}\") | .id")

  if [[ -n "$asset_id" ]]; then
    echo "发现同名附件（ID: $asset_id），正在删除..."
    curl -s -X DELETE -H "Authorization: token ${token}" \
      https://api.github.com/repos/${repo}/releases/assets/${asset_id}
    echo "已删除旧附件"
  fi

  # 上传新的附件
  echo "上传新附件 ${filename}..."
  curl -s -X POST \
    -H "Authorization: token ${token}" \
    -H "Content-Type: application/octet-stream" \
    --data-binary @"${filepath}" \
    "https://uploads.github.com/repos/${repo}/releases/${release_id}/assets?name=${filename}"

  echo "上传完成 ✅"
done
```

### 4. 修改脚本配置项

编辑 `up.sh` 中以下内容：

```bash
token="你的 GitHub Token"
repo="你的用户名/你的仓库名"
upload_dir="upload"  # 可根据需要修改
tag=$(date +"%Y.%m.%d") #上传标签
upload_dir="upload" #上传目录
release_body="" #上传描述
```

### 5. 运行脚本

```bash
bash up.sh
```

执行后会自动：

- 检查或创建当天的 Release；
- 删除已存在的同名文件；
- 上传新文件至 Release。

## 示例输出

```bash
上传文件到 GitHub Release...
Release 不存在，正在创建 Release...
已创建 Release：ID = 12345678
处理文件：example.txt
检查是否已有名为 example.txt 的附件...
上传新附件 example.txt...
上传完成 ✅
```

## 常见用途

- 自动发布构建产物（如编译后的程序包）；
- 每日归档日志或数据文件；
- 备份 CI/CD 结果；
- 简化 Release 管理流程。

## 注意事项

- 默认以 `年.月.日` 形式自动生成 tag；
- GitHub Release 的单个附件大小限制为 2GB；
- 脚本不会递归子目录，仅处理指定目录下的一级文件。

## 授权协议

脚本部分基于 MIT License 开源发布，欢迎自由使用与修改。如需商业部署，请留意 GitHub API 使用条款。
