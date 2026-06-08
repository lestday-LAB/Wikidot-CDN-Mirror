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
| wdfiles.mirror.lestday233.eu.org | ✅ 美国佛罗里达迈阿密 | 36.76ms | 151.81ms | 266.85ms |
| img.mirror.lestday233.eu.org | ✅ 美国 | 14.65ms | 162.40ms | 310.14ms |
| cdn.mirror.lestday233.eu.org | ✅ 美国佛罗里达迈阿密 | 16.17ms | 123.31ms | 230.44ms |
| wdfiles.mirror.backroomswiki.com | ✅ 美国 | 16.80ms | 42.40ms | 68.00ms |
| img.mirror.backroomswiki.com | ✅ 美国 | 17.03ms | 95.52ms | 174.01ms |
| cdn.mirror.backroomswiki.com | ✅ 美国佛罗里达迈阿密 | 14.87ms | 92.57ms | 170.26ms |

<sub>最后更新：2026-06-08 18:26:36 UTC | ✅ 良好 (<200ms) | ⚠️ 一般 (200-500ms) | ❌ 较差 (>500ms)</sub>

<!-- SPEEDTEST-END -->
