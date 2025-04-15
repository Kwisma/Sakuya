---
layout: post
date: 2025-04-15 13:43:16
title: 使用 Bash 脚本批量删除 GitHub Release 附件与标签
categories: 
 - 脚本
tags:
 - GitHub
 - Release管理
 - Bash脚本
 - 自动化
---

## 前言

在日常开发过程中，我们常常需要手动维护 GitHub 的 Release、附件资源、Tag 等内容，繁琐且容易出错。为了解决这个问题，我编写了一个脚本，用于自动删除指定的 GitHub Release 附件、对应的 Release 记录以及 Tag 标签，从而提高工作效率，降低误操作的风险。

<!-- more -->

## 使用说明

### 依赖项

- `curl`
- `jq`
- GitHub Personal Access Token（需要 `repo` 权限）

### 脚本功能

1. 根据指定的 tag 获取 release_id；
2. 查找 release 中名为 `${asset_name}` 的附件；
3. 如果找到了，删除该附件；
4. 删除对应的 release；
5. 删除 tag。

### 使用方式

将以下代码保存到 `delete_github_release.sh`

环境变量：

```bash
token="你的 GitHub Token"
repo="用户名/仓库名"
tag="release 的 tag 名"
asset_name="需要删除的附件名"
```

删除附件：

```bash
#!/bin/bash

echo "正在删除 Release 附件：$asset_name"

asset_id=$(curl -s -H "Authorization: token ${token}" \
  https://api.github.com/repos/${repo}/releases/${release_id}/assets \
  | jq -r ".[] | select(.name == \"${asset_name}\") | .id")

if [[ -n "$asset_id" ]]; then
  curl -s -X DELETE \
    -H "Authorization: token ${token}" \
    https://api.github.com/repos/${repo}/releases/assets/${asset_id}
  echo "✅ 已删除附件：$asset_name"
else
  echo "⚠️ 未找到附件：$asset_name"
fi
```

删除 `release` 和 `tags` 标签

```bash
#!/bin/bash

echo "正在删除 Release 附件：$asset_name"

release_id=$(curl -s -H "Authorization: token ${token}" \
  https://api.github.com/repos/${repo}/releases/tags/${tag} | jq -r .id)

# 删除 release
if [[ -n "$release_id" && "$release_id" != "null" ]]; then
  curl -s -X DELETE \
    -H "Authorization: token ${token}" \
    https://api.github.com/repos/${repo}/releases/${release_id}
  echo "🗑️ 已删除 Release：$tag"
else
  echo "⚠️ 未找到 Release：$asset_name"
fi

# 删除 tag
response_code=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE \
  -H "Authorization: token ${token}" \
  https://api.github.com/repos/${repo}/git/refs/tags/${tag})

if [[ "$response_code" == "204" ]]; then
  echo "🏷️ 已删除 Tag：$tag"
else
  echo "⚠️ 未找到 Tag：$asset_name"
fi
```

执行代码

```bash
bash delete_github_release.sh
```

## 注意事项

- 建议先备份 Release 内容，确认无误后再执行脚本；
- GitHub 的 API 请求有频率限制，Token 权限不足也会导致操作失败；
- `tag` 必须已存在，否则无法获取 `release_id`。

## 示例场景

你在自动化部署项目时，上传了多个 Release 文件，后续需要删除其中某一个旧版本资源，并清理无用的 Release 标签时可以使用本脚本。

## 结语

这个脚本可以集成到 CI/CD 流程中，也可以单独运行，灵活性高。如果你有更多想法或者改进建议，欢迎交流～
