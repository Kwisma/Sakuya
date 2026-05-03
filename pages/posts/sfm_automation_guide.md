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

```sfm
name "灌注机自动化"  -- 定义机器的名称

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

```sfm
name "蜜蜂资源"  -- 定义机器的名称

every 1 ticks do  -- 每1个刻（tick）执行以下操作
    input forge_energy:: from "能量" top side  -- 从顶部立方体输入锻造能量
    output forge_energy:: to each "机器"  -- 将能量输出到机器
end

every 20 ticks do  -- 每20个刻（tick）执行以下操作
-- 基因提取
    input from "me接口"
    output *glass_bottle to "蜂箱" slots 0
    output *glass_bottle to "装瓶机" slots 0
    output *rose_bush to "繁殖箱"
    output *honey_treat to "孵化机" slots 1
    output *bee_cage to "繁殖箱" slots 0
    forget  -- 清除状态，确保后续操作不受之前步骤影响
    input from "繁殖箱"slots 5
    output to "孵化机" slots 0
    forget  -- 清除状态，确保后续操作不受之前步骤影响
    input from "离心机" slots 2-10
    output *gene to "基因检索器"
    output to "me接口"
    forget  -- 清除状态，确保后续操作不受之前步骤影响
    input from "装瓶机" slots 11
    output to "me接口"
    forget  -- 清除状态，确保后续操作不受之前步骤影响
-- 养蜜蜂
    input from "蜂箱" slots 2-10
    output
        *configurable_comb,
        *configurable_honeycomb,
    to "热力离心机" slots 1
    output *gene to "基因检索器"
    output EXCEPT
        *configurable_comb,
        *configurable_honeycomb,
        *gene,
    to "me接口"
    forget  -- 清除状态，确保后续操作不受之前步骤影响
-- 离心机输出
    input from "热力离心机" slots 2-10
    output to "me接口"
    forget  -- 清除状态，确保后续操作不受之前步骤影响
    input fluid:: from "热力离心机"
    output fluid:: to "me接口"
end
```

## 裂变燃料 

```sfm
-- 摆放循序：电解分离器 >  化学灌注器a > 化学氧化机a > 回旋式气液转换机 > 化学灌注器b > 化学溶解室 > 化学灌注器c > 化学氧化机b > 同位素离心机
name "裂变燃料"  -- 定义机器的名称

every 1 ticks do  -- 每1个刻（tick）执行以下操作
    input forge_energy:: from "能量" top side  -- 从顶部立方体输入锻造能量
    output forge_energy:: to each "机器" bottom side -- 将能量输出到机器
end

every 20 ticks do  -- 每20个刻（tick）执行以下操作
    input fluid:: from "水槽" top side
    output fluid:: to each "电解分离器" bottom side
    output fluid:: to each "回旋式气液转换机" bottom side
    output fluid:: to each "加压反应室" bottom side
    forget
    input from "me接口"
    output *fluorite to "化学溶解室" bottom side
    output *sulfur to "化学氧化机a" bottom side
    output *yellow_cake_uranium to "化学氧化机b" bottom side
    output *fluorite_dust to "加压反应室" top side
    forget
    input gas:mekanism:sulfur_trioxide from "化学灌注器a" bottom side
    output gas:mekanism:sulfur_trioxide to "化学灌注器b" bottom side
    forget
    input gas:mekanism:uranium_hexafluoride from "化学灌注器c" bottom side
    output gas:mekanism:uranium_hexafluoride to "同位数离心机" bottom side
    forget
    input gas:mekanism:fissile_fuel from "同位数离心机" front side
    output gas:mekanism:fissile_fuel to "化学储罐" bottom side
    forget
    input pellet_plutonium from "加压反应室" bottom side
    output to "me接口"
end
```

## 四级矿产

```sfm
-- 机器可无序摆放
name "4级矿产"  -- 定义机器的名称

every 1 ticks do  -- 每1个刻（tick）执行以下操作
    input forge_energy:: from "能量" top side  -- 从顶部立方体输入锻造能量
    output forge_energy:: to each "机器" bottom side -- 将能量输出到机器
end

every 20 ticks do  -- 每20个刻（tick）执行以下操作
    input 999999999 fluid:: from "水槽" top side
    output fluid:: to each "电解分离器" top side
    output fluid:: to each "回旋式气液转换机" top side
    output fluid:: to each "化学清洗机" top side
    output fluid:: to each "电解分离器2" top side
    output fluid:: to each "电解分离器3" top side
    forget
    input from "me接口" top side
    output alltheores:sulfur to "化学氧化机" top side -- 输入硫磺
    forget
    -- 从右侧抽取氧
    input slurry:mekanism:oxygen from each  "电解分离器" west side
    output slurry:mekanism:oxygen to "化学灌注室a" west side
    forget
    -- 从右侧抽取二氧化硫
    input slurry:mekanism:sulfur_dioxide from each "化学氧化机" west side
    output slurry:mekanism:sulfur_dioxide to "化学灌注室a" east side
    forget
    input chemical:mekanism:sulfur_trioxide  from each "化学灌注室a" north side
    output chemical:mekanism:sulfur_trioxide to "化学灌注室b" east side
    forget
    input slurry:mekanism:water_vapor from each "回旋式气液转换机" west side
    output slurry:mekanism:water_vapor to "化学灌注室b" west side
    forget
    input slurry:mekanism:sulfuric_acid from each "化学灌注室b" north side
    output slurry:mekanism:sulfuric_acid to "化学溶解室" east side
    forget
    input infusion:: from each "化学溶解室" west side
    output infusion:: to "化学清洗机" east side
    forget
    input infusion:: from each "化学清洗机" west side
    output infusion:: to "化学结晶室" east side
    forget
    input from each "化学结晶室" west side
    output to "化学压射室" east side
    forget
    input fluid:: from each "盐水" top side
    output fluid:: to "电解分离器1" top side
    forget
    input slurry:mekanism:chlorine from each "电解分离器1" west side
    output slurry:mekanism:chlorine to "化学灌注室1" west side
    forget
    input slurry:mekanism:hydrogen from  each "电解分离器2" east side
    output slurry:mekanism:hydrogen to "化学灌注室1" east side
    forget
    input slurry:mekanism:hydrogen_chloride  from each "化学灌注室1" north side
    output slurry:mekanism:hydrogen_chloride to "化学压射室" top side
    forget
    input from each "化学压射室" west side
    output to "提纯工厂" east side
    forget
    input slurry:mekanism:oxygen from each "电解分离器3" west side
    output slurry:mekanism:oxygen to "提纯工厂" top side
    forget
    input from each "提纯工厂" west side
    output to "粉碎机" east side
    forget
    input from each "粉碎机" west side
    output to "富集工厂" east side
    forget
    input from each "富集工厂" west side
    output to "熔炼工厂" east side
    forget
    input from each "熔炼工厂" west side
    output to "me接口" east side
end
```
