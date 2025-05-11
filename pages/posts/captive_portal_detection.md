---
layout: post
date: 2025-05-11 19:58:00
title: 类原生 Android 去除 WiFi 网络感叹号/叉号
categories: 教程
tags: 
 - Android
 - WiFi
 - 连接问题
 - captive portal
---

## 前言

当 Android 设备连接到 WiFi 网络时，系统会进行“网络连通性检测”（captive portal detection），通过向特定 URL 发送 HTTP 请求并检查返回的状态码来判断是否能够正常访问互联网。如果检测失败，系统会在 WiFi 图标上叠加感叹号或叉号，影响使用体验。本文介绍如何自定义或关闭该检测，移除网络图标上的感叹号/叉号。

<!-- more -->

## 什么是 `generate_204`

`generate_204` 是 HTTP Status Code **204 No Content** 的空白响应代码服务接口，用于检测网络连通性。当设备向此接口发送请求并收到 204 状态码时，判定网络可用；否则认为需要登录或网络不可用。

## 公共 `generate_204` 服务接口列表

下表列出了常见厂商和服务提供商的 `generate_204` 接口（以及部分非 204 返回的测试接口）：

| 服务提供商      | 链接                                                                                                                                  | HTTP/HTTPS | IP Version  |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------- | ----------- |
| 华为         | [http://connectivitycheck.platform.hicloud.com/generate\_204](http://connectivitycheck.platform.hicloud.com/generate_204)           | 204 / 204  | IPv4        |
| 荣耀         | [http://connectivitycheck.platform.hihonorcloud.com/generate\_204](http://connectivitycheck.platform.hihonorcloud.com/generate_204) | 204 / 204  | IPv4 & IPv6 |
| 小米         | [http://connect.rom.miui.com/generate\_204](http://connect.rom.miui.com/generate_204)                                               | 204 / 204  | IPv4        |
| Cloudflare | [https://cp.cloudflare.com/generate\_204](https://cp.cloudflare.com/generate_204)                                                   | 204 / 204  | IPv4 & IPv6 |
| Firefox    | [http://detectportal.firefox.com/success.txt](http://detectportal.firefox.com/success.txt)                                          | 200 / 200  | IPv4 & IPv6 |
| Google     | [https://clients1.google.com/generate\_204](https://clients1.google.com/generate_204)                                               | 204 / 204  | IPv4 & IPv6 |
| Google     | [https://clients2.google.com/generate\_204](https://clients2.google.com/generate_204)                                               | 204 / 204  | IPv4 & IPv6 |
| Google     | [https://googleapis.com/generate\_204](https://googleapis.com/generate_204)                                                         | 204 / 204  | IPv4 & IPv6 |
| Google     | [https://goo.gl/generate\_204](https://goo.gl/generate_204)                                                                         | 204 / 204  | IPv4 & IPv6 |
| Google     | [http://google.cn/generate\_204](http://google.cn/generate_204)                                                                     | 204 / 204  | IPv4 & IPv6 |
| Google     | [http://google.com.hk/generate\_204](http://google.com.hk/generate_204)                                                             | 204 / 204  | IPv4 & IPv6 |
| Google     | [http://google.com.tw/generate\_204](http://google.com.tw/generate_204)                                                             | 204 / 204  | IPv4 & IPv6 |
| Google     | [http://google.com/generate\_204](http://google.com/generate_204)                                                                   | 204 / 204  | IPv4 & IPv6 |
| Google     | [http://www.gstatic.com/generate\_204](http://www.gstatic.com/generate_204)                                                         | 204 / 204  | IPv4 & IPv6 |
| Google     | [http://www.youtube.com/generate\_204](http://www.youtube.com/generate_204)                                                         | 204 / 204  | IPv4 & IPv6 |
| Google     | [http://yt.be/generate\_204](http://yt.be/generate_204)                                                                             | 204 / 204  | IPv4 & IPv6 |
| Microsoft  | [http://www.msftconnecttest.com/connecttest.txt](http://www.msftconnecttest.com/connecttest.txt)                                    | 200 / err  | IPv4        |
| OPPO       | [http://conn1.oppomobile.com/generate\_204](http://conn1.oppomobile.com/generate_204)                                               | 204 / 204  | IPv4 & IPv6 |
| OPPO       | [http://conn2.oppomobile.com/generate\_204](http://conn2.oppomobile.com/generate_204)                                               | 204 / 204  | IPv4 & IPv6 |
| Qualcomm   | [http://www.qualcomm.cn/generate\_204](http://www.qualcomm.cn/generate_204)                                                         | 204 / 204  | IPv4 & IPv6 |
| vivo       | [http://wifi.vivo.com.cn/generate\_204](http://wifi.vivo.com.cn/generate_204)                                                       | 204 / 204  | IPv4        |

> **说明**：表中 Google 相关多个域名接口仅列出常见示例，实际厂商和服务域名更多。

## 使用方法

建议根据设备所在地选择延迟最低、支持 **HTTP/HTTPS** 双协议栈、且返回 **204** 状态码的接口；部分 Android 版本对协议栈或状态码有严格要求。

- Android 6.x 及以下
```bash
adb shell "settings put global captive_portal_server connect.rom.miui.com"
```
- Android 7.x 及以上（需分别设置 HTTP/HTTPS）
```bash
adb shell settings put global captive_portal_http_url http://connect.rom.miui.com/generate_204
```
```bash
adb shell settings put global captive_portal_https_url https://connect.rom.miui.com/generate_204
```

- 禁用网络连通性检测（移除感叹号/叉号）
```bash
adb shell settings put global captive_portal_detection_enabled 0
```
- 启用网络连通性检测
```bash
adb shell settings put global captive_portal_detection_enabled 1
```
- （可选）设置 NTP 校时服务器地址
```bash
adb shell settings put global ntp_server ntp.ntsc.ac.cn
```
- 查看所有可配置项
```bash
adb shell settings list global
```
```bash
adb shell getprop
```

> **注意**：禁用检测后，WiFi 图标不再显示感叹号/叉号，但无法自动发现需要登录的门户页面。

## 参考资料

1. Android Captive Portal 原理与设置详解：[https://www.noisyfox.io/android-captive-portal.html](https://www.noisyfox.io/android-captive-portal.html)
