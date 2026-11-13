const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const distDir = path.join(__dirname, '..', 'dist');

const mimeMap = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0].replace(/^\//, '');
  let filePath = path.join(distDir, reqPath || 'index.html');
  if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }
  const ext = path.extname(filePath);
  res.writeHead(200, { 'Content-Type': mimeMap[ext] || 'application/octet-stream' });
  res.end(fs.readFileSync(filePath));
});

server.listen(4173, () => {
  console.log('Server started on 4173');
  const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const outPath = path.join(__dirname, '..', 'verification_screenshots', 'test_script.png');
  const userProfile = path.join(__dirname, 'chrome-profile');
  const cmd = `"${chrome}" --headless --disable-gpu --user-data-dir="${userProfile}" --screenshot="${outPath}" --window-size=1600,900 http://localhost:4173/?scene=0`;
  
  try {
    execSync(cmd, { stdio: 'pipe' });
    console.log('Success! Output file size:', fs.statSync(outPath).size);
  } catch (err) {
    console.log('err:', err.message);
  } finally {
    server.close();
  }
});
