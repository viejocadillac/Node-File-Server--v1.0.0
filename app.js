const express = require('express');
const path = require('path');
const network = require('network');
const process = require('process');
const app = express();
const server = require("http").createServer(app);
const index = require('./routes/index.js');

console.log('Iniciando el servidor...')
const PORT = process.env.PORT || 3000
network.get_active_interface((err, ip)=>{
  server.listen(PORT, ()=>{
    console.log(`Servidor Activo en la IP ${ip.ip_address} y el puerto ${PORT}`);
  });
})


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



module.exports=app;
