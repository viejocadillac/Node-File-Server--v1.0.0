/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const config = require('./config.json');

function actualPathSync(_path){
  let files = [{}];
  try {
    let names = fs.readdirSync(_path);
    for (let i = 0; i < names.length; i++) {

      let absolutePathToFile = path.join(_path, names[i])
      let ruta = absolutePathToFile.replace(config.pathToShare, '').substr(1)
    
      if (fs.lstatSync(absolutePathToFile).isDirectory()) {
        files.push({type:"directory", path:ruta, name:names[i], url:encodeURI(names[i])});
      }else{

        //Evita que se compartan los archivos ocultos (comienzan con .)
        if(names[i].substr(0,1) !== "."){
            files.push({type:"file", path:ruta, name:names[i], url:encodeURI(names[i])});
        }
      }
    }
    return files;

  } catch (e) {
      if(e.code === 'EACCES'){
        console.log('No se puede escanear el directorio ('+config.pathToShare+'). Permiso denegado.');
        console.log('Cambie el directorio compartido en el archivo de configuracion\ny reinicie el servidor.');
      }else{
        console.log(e.code);
      }
  }
}
module.exports.actualPathSync = actualPathSync;
