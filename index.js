const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const port = process.argv[2];


app.get('/', (req, res) => {
  if (process.argv[4]){
    if (req.query.password !== process.argv[4]){
      res.status(403).send('Accès interdit.')
      return;
    }
  }
  const videoPath = path.join(process.argv[3]);
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunksize = end - start + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
});

http.createServer(app).listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
