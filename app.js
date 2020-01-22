const express = require('express');
const path = require('path');
const app = express();
const server = require("http").createServer(app);
const index = require('./routes/index.js');


function ignoreFavicon(req, res, next) {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).json({nope: true});
  } else {
    next();
  }
}


// Configure
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(ignoreFavicon)
app.use('/scripts', express.static(path.join(__dirname, '/public/scripts')));
app.use('/styles', express.static(path.join(__dirname, '/public/stylesheets')));

app.use('/', index);

server.listen(3000, ()=>{
  let ip = server.address().address;

  if(ip == '::'){
    ip = '127.0.0.1'
  }
  console.log('Servidor Activo en la IP '+ip+' y el puerto '+server.address().port);


});

module.exports=app;
