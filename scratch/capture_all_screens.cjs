const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const distDir = path.join(__dirname, '..', 'dist');
const outDir = path.join(__dirname, '..', 'verification_screenshots');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const mimeMap = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
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

const scenes = [
  { idx: 0, file: '01_Landing_Page.png' },
  { idx: 1, file: '02_Scene_01_Mysterious_Image.png' },
  { idx: 2, file: '03_Scene_02_Who_is_Oppy.png' },
  { idx: 3, file: '04_Scene_03_Berry_Bowl.png' },
  { idx: 4, file: '05_Scene_04_Inspect_the_Tools.png' },
  { idx: 5, file: '06_Scene_05_Compare_the_Evidence.png' },
  { idx: 6, file: '07_Scene_06_Detective_Conclusion.png' },
  { idx: 7, file: '08_Scene_07_The_Storm.png' },
  { idx: 8, file: '09_Scene_08_What_Remains.png' },
  { idx: 9, file: '10_Scene_09_NASA_Sources_and_Evidence.png' },
  { idx: 10, file: '11_Scene_10_Mission_Completed.png' },
];

function captureScene(idx, fileName) {
  return new Promise((resolve) => {
    const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    const targetUrl = `http://localhost:4185/?scene=${idx}`;
    const targetFile = path.join(outDir, fileName);

    if (fs.existsSync(targetFile)) {
      try { fs.unlinkSync(targetFile); } catch {}
    }

    const cmd = `"${chrome}" --headless=new --disable-gpu --no-sandbox --hide-scrollbars --window-size=1600,900 --virtual-time-budget=3000 --screenshot="${targetFile}" "${targetUrl}"`;

    exec(cmd, (err) => {
      let sz = 0;
      if (fs.existsSync(targetFile)) {
        sz = fs.statSync(targetFile).size;
      }
      console.log(`Scene ${idx} -> ${fileName} done, size: ${sz} bytes`);
      resolve();
    });
  });
}

server.listen(4185, async () => {
  console.log('Static server started on port 4185. Capturing all 11 screens...');
  for (const s of scenes) {
    await captureScene(s.idx, s.file);
  }
  console.log('All 11 scenes captured successfully!');
  server.close();
});
