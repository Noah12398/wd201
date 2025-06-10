const http = require('http');
const fs = require('fs');
const minimist = require('minimist');
const path = require('path');

const args = minimist(process.argv.slice(2));
const port = args.port || 3000;

const server = http.createServer((req, res) => {
  console.log(`Request received for ${req.url}`);

  if (req.url === '/' || req.url === '/home') {
    serveFile('home.html', res);
  } else if (req.url === '/projects') {
    serveFile('project.html', res);
  } else if (req.url === '/registration') {
    serveFile('registration.html', res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
  }
});

function serveFile(fileName, res) {
  const filePath = path.join(__dirname, fileName);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>Internal Server Error</h1>');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
}

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
