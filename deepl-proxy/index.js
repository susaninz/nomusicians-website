const http = require('http');
const https = require('https');

const PORT = process.env.PORT || 3334;
const DEEPL_API_KEY = process.env.DEEPL_API_KEY || '3e9634f6-0951-45a9-8469-65fb2a448c23:fx';

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
        const { text, targetLang } = JSON.parse(body);
        
        const postData = new URLSearchParams({
          auth_key: DEEPL_API_KEY,
          text: text,
          target_lang: targetLang.toUpperCase(),
          source_lang: 'RU'
        }).toString();

        const options = {
          hostname: 'api-free.deepl.com',
          port: 443,
          path: '/v2/translate',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
          }
        };

        const deeplReq = https.request(options, (deeplRes) => {
          let data = '';
          deeplRes.on('data', chunk => data += chunk);
          deeplRes.on('end', () => {
            try {
              const result = JSON.parse(data);
              if (result.translations && result.translations[0]) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ translatedText: result.translations[0].text }));
              } else {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Translation failed', details: result }));
              }
            } catch (e) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Parse error', details: data }));
            }
          });
        });

        deeplReq.on('error', (e) => {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: e.message }));
        });

        deeplReq.write(postData);
        deeplReq.end();
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('DeepL Proxy is running. POST to /translate');
  }
});

server.listen(PORT, () => {
  console.log(`🌍 DeepL Proxy running on port ${PORT}`);
});

