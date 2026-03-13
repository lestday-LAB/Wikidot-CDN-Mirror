// api/proxy.js - 部署在 Vercel 的 api 目录下

// 域名映射配置
const DOMAIN_MAP = {
    'img.mirror.lestday233.eu.org': 'https://d2qhngyckgiutd.cloudfront.net',
    'cdn.mirror.lestday233.eu.org': 'https://d3g0gp89917ko0.cloudfront.net',
    'wdfiles.mirror.lestday233.eu.org': 'wdfiles.com'
  };
  
  // 安全配置
  const SECURITY_CONFIG = {
    blockMaliciousPaths: true,
    allowedMethods: ['GET', 'POST', 'HEAD', 'PUT', 'DELETE', 'OPTIONS'],
    maxBodySize: 10 * 1024 * 1024,
  };
  
  // 缓存配置（Vercel 使用不同的缓存机制）
  const CACHE_CONFIG = {
    enabled: true,
    ttl: 300, // 秒
  };
  
  // 恶意路径检测
  function isMaliciousPath(path) {
    if (!SECURITY_CONFIG.blockMaliciousPaths) return false;
    
    const patterns = [
      /\.\.\//,
      /%2e%2e/i,
      /etc\/passwd/i,
      /\.(php|asp|jsp|exe|sh)$/i,
    ];
    return patterns.some(p => p.test(path));
  }
  
  // Vercel Serverless Function 入口
  module.exports = async (req, res) => {
    try {
      // 构建完整 URL（Vercel 需要从 req 对象构建）
      const protocol = req.headers['x-forwarded-proto'] || 'https';
      const host = req.headers.host || '';
      const fullUrl = `${protocol}://${host}${req.url}`;
      const url = new URL(fullUrl);
      
      const method = req.method;
      
      // 安全检查
      if (host.includes('vercel.app')) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      
      if (!SECURITY_CONFIG.allowedMethods.includes(method)) {
        return res.status(405).json({ error: 'Method Not Allowed' });
      }
      
      if (isMaliciousPath(url.pathname)) {
        return res.status(400).json({ error: 'Bad Request' });
      }
      
      const contentLength = parseInt(req.headers['content-length'] || '0');
      if (contentLength > SECURITY_CONFIG.maxBodySize) {
        return res.status(413).json({ error: 'Payload Too Large' });
      }
      
      // 查找目标域名
      let target = DOMAIN_MAP[host] || DOMAIN_MAP[host.replace(/^www\./, '')];
      if (!target) {
        return res.status(404).json({ error: `Not Found: ${host}` });
      }
      
      // 构建目标URL
      let targetUrl;
      let targetHost;
      
      if (host === 'wdfiles.mirror.lestday233.eu.org') {
        const pathParts = url.pathname.split('/').filter(p => p);
        if (pathParts.length > 0) {
          const subdomain = pathParts[0];
          const remainingPath = '/' + pathParts.slice(1).join('/');
          
          targetHost = `${subdomain}.wdfiles.com`;
          targetUrl = `https://${targetHost}${remainingPath}${url.search}`;
        } else {
          targetHost = 'wdfiles.com';
          targetUrl = `https://${targetHost}${url.pathname}${url.search}`;
        }
      } else {
        const targetObj = new URL(target);
        targetObj.pathname = url.pathname;
        targetObj.search = url.search;
        targetUrl = targetObj.toString();
        targetHost = targetObj.host;
      }
      
      // 处理请求头
      const headers = new Headers();
      
      // 复制原始请求头（Vercel 中 req.headers 是普通对象）
      Object.entries(req.headers).forEach(([key, value]) => {
        if (value !== undefined) {
          headers.set(key, Array.isArray(value) ? value.join(', ') : value);
        }
      });
      
      // 设置正确的 Host 头
      headers.set('Host', targetHost);
      
      // 删除可能引起问题的头部
      headers.delete('cf-connecting-ip');
      headers.delete('x-forwarded-for');
      headers.delete('x-real-ip');
      headers.delete('x-vercel-id'); // Vercel 特有头
      
      // 添加必要的请求头
      headers.set('User-Agent', req.headers['user-agent'] || 'Vercel-Proxy');
      headers.set('Accept', req.headers['accept'] || '*/*');
      
      // 构建请求体
      let body = null;
      if (method !== 'GET' && method !== 'HEAD') {
        body = req;
      }
      
      // 发送请求（带超时）
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      let response;
      try {
        response = await fetch(targetUrl, {
          method: method,
          headers: headers,
          body: body,
          signal: controller.signal,
          redirect: 'follow'
        });
      } finally {
        clearTimeout(timeoutId);
      }
      
      // 设置 Vercel 缓存头
      if (CACHE_CONFIG.enabled && method === 'GET' && response.status === 200) {
        res.setHeader('Cache-Control', `public, max-age=${CACHE_CONFIG.ttl}, s-maxage=${CACHE_CONFIG.ttl}`);
      }
      
      // 设置响应状态
      res.status(response.status);
      
      // 复制响应头（排除某些头）
      const excludeHeaders = ['content-encoding', 'content-length', 'transfer-encoding', 'connection'];
      response.headers.forEach((value, key) => {
        if (!excludeHeaders.includes(key.toLowerCase())) {
          res.setHeader(key, value);
        }
      });
      
      // 添加安全头
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'SAMEORIGIN');
      res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
      
      // 如果有重定向，处理Location头
      const location = response.headers.get('location');
      if (location) {
        try {
          const locationUrl = new URL(location, targetUrl);
          if (locationUrl.hostname.endsWith('wdfiles.com')) {
            const newLocation = location.replace(locationUrl.hostname, host);
            res.setHeader('location', newLocation);
          }
        } catch (e) {}
      }
      
      // 发送响应体
      const responseBody = await response.arrayBuffer();
      res.send(Buffer.from(responseBody));
      
    } catch (error) {
      console.error('Proxy error:', error);
      
      if (error.name === 'AbortError') {
        return res.status(504).json({ error: 'Gateway Timeout' });
      }
      
      return res.status(500).json({ error: error.message });
    }
  };