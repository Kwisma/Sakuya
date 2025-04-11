---
layout: post
date: 2025-04-05 19:28:46
title: SFM 自动化代码
categories:
 - 脚本
tags:
 - Minecraft
 - SFM
 - 自动化
 - 模组
---

## 前言

超级工厂管理（Super Factory Manager，简称 SFM）是一款强大的 Minecraft 模组，能够通过简单的代码实现复杂的自动化操作。本教程将分享一些常用的自动化代码模板，帮助玩家更高效地管理资源和机器。

<!-- more -->

## 灌注机

批量燃烧物品，全自动熔炼

```lua
name "insolator"  -- 定义机器的名称

every 1 ticks do  -- 每1个刻（tick）执行以下操作
    input forge_energy:: from "能量" top side  -- 从顶部立方体输入锻造能量
    output forge_energy:: to "机器"  -- 将能量输出到机器
end

every 20 ticks do  -- 每20个刻（tick）执行以下操作
    input fluid:: from "水槽"  -- 从水槽输入液体
    output fluid:: to each "机器"  -- 将液体输出到每台机器
    forget  -- 清除状态，确保后续操作不受之前步骤影响
    input *phyto* from "肥料箱"  -- 从肥料箱输入“*phyto*”资源
    output to each "机器"  -- 将其输出到每台机器
    forget  -- 清除状态，确保后续操作不受之前步骤影响
    if insolator has <1 *seeds* then  -- 如果机器中少于1个“*seeds*”
        input *seeds* from "种子箱"  -- 从主箱子输入“*seeds*”
        output 1 to each "机器"  -- 每台机器输出1个“*seeds*”
    end
    forget  -- 清除状态，确保后续操作不受之前步骤影响
    input from "机器" slots 2-5  -- 从机器的第2到第5槽位输入物品
    output *seeds* to "种子箱"  -- 将“*seeds*”输出到主箱子
    output to "箱子"  -- 将其余物品输出到chest
end
```

## 蜂蜜收集

全自动收集

```lua
name "insolator"  -- 定义机器的名称

every 1 ticks do  -- 每1个刻（tick）执行以下操作
    input forge_energy:: from "能量" top side  -- 从顶部立方体输入锻造能量
    output forge_energy:: to each "机器"  -- 将能量输出到机器
end

every 20 ticks do  -- 每20个刻（tick）执行以下操作
    input *glass_bottle from "水瓶箱"
    output to each "蜂箱" slots 0
    output to each "装瓶机" slots 0
    forget  -- 清除状态，确保后续操作不受之前步骤影响
    input from "蜂箱" slots 2-10
    output *configurable* to each "离心机"
    output *gene to each "基因检索器"
    output *honey* to each "箱子"
    forget  -- 清除状态，确保后续操作不受之前步骤影响
    input from "离心机" slots 2-10
    output *gene to each "基因检索器"
    output to each "箱子"
    forget  -- 清除状态，确保后续操作不受之前步骤影响
    input from "装瓶机" slots 11
    output to each "箱子"
    forget  -- 清除状态，确保后续操作不受之前步骤影响
    input *honey_treat from "蜂蜜小食箱"
    output to each "孵化机" slots 1
end
```
