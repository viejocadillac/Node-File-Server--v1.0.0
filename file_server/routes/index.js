const express = require('express');
const read = require('../read.js');
const config = require('../config.json');
const router = express.Router();

router.get('/', function(req, res, next){

  var data = read.actualPathSync(config.pathToShare);
  res.render('index', {dt:data});

});

module.exports = router;
