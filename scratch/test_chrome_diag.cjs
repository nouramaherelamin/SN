const { spawn } = require('child_process');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const proc = spawn(chrome, [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--dump-dom',
  'data:text/html,<html><body><h1>Test</h1></body></html>'
]);

proc.stdout.on('data', d => console.log('stdout:', d.toString()));
proc.stderr.on('data', d => console.log('stderr:', d.toString()));
proc.on('close', code => console.log('exit code:', code));

