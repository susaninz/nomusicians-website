import http from 'http';
import https from 'https';

const DEEPL_API_KEY = '3e9634f6-0951-45a9-8469-65fb2a448c23:fx';
const PORT = 3334;

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/translate') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { text, target_lang, source_lang } = JSON.parse(body);
        
        const params = new URLSearchParams({
          auth_key: DEEPL_API_KEY,
          text: text,
          target_lang: target_lang,
          source_lang: source_lang || 'RU',
        });

        const options = {
          hostname: 'api-free.deepl.com',
          path: '/v2/translate',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(params.toString()),
          },
        };

        const proxyReq = https.request(options, (proxyRes) => {
          let data = '';
          proxyRes.on('data', chunk => data += chunk);
          proxyRes.on('end', () => {
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(proxyRes.statusCode);
            res.end(data);
          });
        });

        proxyReq.on('error', (e) => {
          res.writeHead(500);
          res.end(JSON.stringify({ error: e.message }));
        });

        proxyReq.write(params.toString());
        proxyReq.end();
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`🌍 DeepL Proxy running at http://localhost:${PORT}`);
});

