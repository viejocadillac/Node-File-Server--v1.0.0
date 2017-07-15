const fs =require("fs");
const path = require("path");
const config = require('./config.json');

function actualPathSync(_path){
  var files = [{}];
  try {
    var names = fs.readdirSync(_path);
    for (var i = 0; i < names.length; i++) {

      var pathFile = path.join(_path, names[i])
      if (fs.lstatSync(pathFile).isDirectory()) {
        files.push({type:"directory", path:pathFile, name:names[i]});
      }else{
        //Evita que se compartan los archivos ocultos (comienzan con .)
        if(names[i].substr(0,1) != "."){
            files.push({type:"file", path:pathFile, name:names[i], url:encodeURI(names[i])});
        }
      }
    }
    return files;

  } catch (e) {
      if(e.code == 'EACCES'){
        console.log('No se puede escanear el directorio ('+config.pathToShare+'). Permiso denegado.');
        console.log('Cambie el directorio compartido en el archivo de configuracion\ny reinicie el servidor.');
      }else{
        console.log(e.code);
      }
  }
}
module.exports.actualPathSync = actualPathSync;
