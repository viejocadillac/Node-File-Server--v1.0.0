/* eslint-disable no-plusplus */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const process = require('process');
const argv = require('minimist')(process.argv.slice(2), { boolean: ['showHidden'] });

const { showHidden } = argv;

/**
 * Retorna un la lista de nombres de los archivos/directorios que contiene la ruta
 *  pasada como parametro
 * @param {string} _path Ruta al directorio al que se le quiere leer su contenido
 * @returns {string[]} Lista de los nombres de loas archivos en el directorio escaneado
 */
const readPathSync = (_path) => {
  let names = [];
  try {
    names = fs.readdirSync(_path);
  } catch (e) {
    if (e.code === 'EACCES') {
      console.log(`No se puede escanear el directorio (${argv.f}). Permiso denegado.`);
      console.log('Cambie el directorio compartido en el archivo de configuracion\ny reinicie el servidor.');
    } else if (e.code === 'ENOENT') {
      console.log('No se encontro el directorio/archivo.');
    }
  }
  return names;
};


/**
 * Genera la lista de archivos/directorios que van a ser pasados a la plantilla pug
 * @param {*} _path Ruta al directorio al que se le quiere leer su contenido
 * @returns {object[]} Lista de objetos con las propiedades type, path, name, url
 */
const generateFileList = (_path) => {
  const files = [{}];
  const names = readPathSync(_path);
  for (let i = 0; i < names.length; i++) {
    const absolutePathToFile = path.join(_path, names[i]);

    const ruta = absolutePathToFile.replace(argv.p.substr(2), '');

    /*
    Si el nombre no comienza con . o la variable showHidden = true,
    se agrega el archivo/directorio a la lista
    */
    if (names[i][0] !== '.' || showHidden) {
      const type = fs.lstatSync(absolutePathToFile).isDirectory() ? 'directory' : 'file';

      files.push({
        type,
        path: ruta,
        name: names[i],
        url: encodeURI(names[i]),
      });
    }
  }
  return files;
};


module.exports = { generateFileList };
