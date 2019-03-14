const express = require('express');
const read = require('../read.js');
const config = require('../config.json');
const router = express.Router();
const path = require('path'); 
const fs = require('fs');

router.get('/*', (req, res) => {

  if(req.path === '/'){
    let data = read.actualPathSync(config.pathToShare);
    res.render('index', {dt:data});
  }else{
    let pathDecoded = decodeURI(req.path)
    let pathToRead = path.join(config.pathToShare, pathDecoded)
    
    if(fs.lstatSync(pathToRead).isFile()){
      return res.download(pathToRead)
    }
    // Si la ruta especificada es un directorio, lee su contenido y lo renderiza
    let data = read.actualPathSync(pathToRead);
    res.render('index', {dt:data});
  }

});

module.exports = router;
