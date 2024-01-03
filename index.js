const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const app = express();

const argv = require('yargs')
  .options({
    'port': {
      alias: 'p',
      describe: 'Le port à utiliser',
      demandOption: true,
      type: 'number'
    },
    'filepath': {
      alias: 'f',
      describe: 'Le chemin du fichier',
      demandOption: true,
      type: 'string'
    },
    'password': {
      alias: 'P',
      describe: 'Le mot de passe (optionnel)',
      type: 'string'
    }
  })
  .argv;


app.get('/', (req, res) => {
  if (argv.password){
    if (req.query.password !== argv.password){
      res.status(403).send('<h1>Accès interdit.</h1>')
      return;
    }
  }
  const videoPath = path.join(argv.filepath);
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

app.use((req,res)=>{
  res.redirect('/');
})

http.createServer(app).listen(argv.port, () => {
  console.log(`Server is running on http://localhost:${argv.port}`);
});
