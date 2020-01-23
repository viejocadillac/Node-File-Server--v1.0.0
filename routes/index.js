const express = require('express');
const path = require('path');
const fs = require('fs');
const process = require('process');
const argv = require('minimist')(process.argv.slice(2));

const router = express.Router();
const { generateFileList } = require('../read.js');

// eslint-disable-next-line consistent-return
router.get('/*', (req, res) => {
  const base = `http://${req.headers.host}`;
  if (req.path === '/') {
    const data = generateFileList(argv.p);
    res.render('index', { files: data, base });
  } else {
    const pathDecoded = decodeURI(req.path);
    const pathToRead = `./${path.join(argv.p, pathDecoded)}`;

    if (fs.lstatSync(pathToRead).isFile()) {
      // Si es un archivo lo manda para su descarga
      return res.download(pathToRead);
    }
    // Si la ruta especificada es un directorio, lee su contenido y lo renderiza
    const data = generateFileList(pathToRead);
    res.render('index', { files: data, base });
  }
});

module.exports = router;
