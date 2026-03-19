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
| wdfiles.mirror.lestday233.eu.org | ✅ 美国佛罗里达迈阿密 | 18.16ms | 171.00ms | 323.84ms |
| img.mirror.lestday233.eu.org | ✅ 美国 | 21.12ms | 45.05ms | 68.97ms |
| cdn.mirror.lestday233.eu.org | ✅ 美国佛罗里达迈阿密 | 18.59ms | 44.94ms | 71.28ms |
| wdfiles.mirror.backroomswiki.com | ✅ 美国 | 25.42ms | 53.55ms | 81.67ms |
| img.mirror.backroomswiki.com | ✅ 美国佛罗里达迈阿密 | 14.59ms | 43.69ms | 72.79ms |
| cdn.mirror.backroomswiki.com | ✅ 美国佛罗里达迈阿密 | 17.57ms | 62.72ms | 107.87ms |

<sub>最后更新：2026-03-19 02:26:11 UTC | ✅ 良好 (<200ms) | ⚠️ 一般 (200-500ms) | ❌ 较差 (>500ms)</sub>

<!-- SPEEDTEST-END -->
