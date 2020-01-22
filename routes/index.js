const express = require("express");
const read = require("../read.js");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const process = require("process");
const argv = require("minimist")(process.argv.slice(2));

router.get("/*", (req, res) => {
  const base = `http://${req.headers.host}`;
  if (req.path === "/") {
    let data = read.actualPathSync(argv.p);
    res.render("index", { files: data, base });
  } else {
    let pathDecoded = decodeURI(req.path);
    console.log(`Path decoded: ${pathDecoded}`);
    let pathToRead = './' + path.join(argv.p, pathDecoded);
    console.log(`Path to read: ${pathToRead}`);

    if (fs.lstatSync(pathToRead).isFile()) {
      // Si es un archivo lo manda para su descarga
      return res.download(pathToRead);
    }
    // Si la ruta especificada es un directorio, lee su contenido y lo renderiza
    let data = read.actualPathSync(pathToRead);
    res.render("index", { files: data, base });
  }
});

module.exports = router;
