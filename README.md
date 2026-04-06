# Wikidot-CDN-Mirror
Wikidot的CDN反向代理，专为特殊网络环境使用。

浅薄AI之力，希望各位能喜欢！

## 📑 使用方法

### 【站点】作为CDN代理域名使用
使用[域名测速](#-域名测速)所列出的域名，替换原本的Wikidot链接地址。例如：

**Cloudfront CDN存储的头像**
```
原链接
https://d2qhngyckgiutd.cloudfront.net/636505035d1cb12bb05ae80cf3859f5b

替换为
https://img.mirror.lestday233.eu.org/636505035d1cb12bb05ae80cf3859f5b
```

**Cloudfront CDN存储的JS文件**
```
原链接
https://d3g0gp89917ko0.cloudfront.net/v--7690939296dc/common--javascript/init.combined.js

替换为
https://cdn.mirror.lestday233.eu.org/v--7690939296dc/common--javascript/init.combined.js
```

但是这两种方法用途非常有限，基本上不适合在网站内通过``[[image]]``等方式直接链接使用，或者说这样根本用不上。

特别的，也是最实用的是，对上传到**wdfiles的图片文件**，应该使用如下格式：
```
原链接
https://[网站UNIX名称].wdfiles.com/[资源具体地址]

替换为
https://wdfiles.mirror.lestday233.eu.org/[网站UNIX名称]/[资源具体地址]
```

### 【本地】使用Header Editor

<!-- SPEEDTEST-START -->

## 🌐 域名测速

此处列出了本项目所有支持的域名，并对其定期测速，供大家选择参考。

部分域名可能套用了Cloudflare等域名服务，可能导致数据不准确。

建议您自行访问和测试下列域名，此处测试不代表您的实际使用效果。

| 域名 | 位置 | 最小延迟 | 平均延迟 | 最大延迟 |
|:------|:-----------|:----------|:----------|:----------|
| wdfiles.mirror.lestday233.eu.org | ✅ 美国佛罗里达迈阿密 | 14.82ms | 95.21ms | 175.59ms |
| img.mirror.lestday233.eu.org | ✅ 美国 | 31.19ms | 170.91ms | 310.63ms |
| cdn.mirror.lestday233.eu.org | ✅ 美国佛罗里达迈阿密 | 20.81ms | 64.48ms | 108.14ms |
| wdfiles.mirror.backroomswiki.com | ✅ 美国佛罗里达迈阿密 | 9.41ms | 66.10ms | 122.78ms |
| img.mirror.backroomswiki.com | ✅ 美国 | 64.49ms | 116.21ms | 167.93ms |
| cdn.mirror.backroomswiki.com | ✅ 美国 | 40.10ms | 137.99ms | 235.87ms |

<sub>最后更新：2026-04-06 02:39:07 UTC | ✅ 良好 (<200ms) | ⚠️ 一般 (200-500ms) | ❌ 较差 (>500ms)</sub>

<!-- SPEEDTEST-END -->
