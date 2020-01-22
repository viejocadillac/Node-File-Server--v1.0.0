/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const process = require("process");
const argv = require("minimist")(process.argv.slice(2));

function actualPathSync(_path) {
  let files = [{}];
  try {
    let names = fs.readdirSync(_path);
    for (let i = 0; i < names.length; i++) {
      let absolutePathToFile = path.join(_path, names[i]);

      let ruta = absolutePathToFile.replace(argv.p.substr(2), ""); //.substr(1);
      /*

      console.log(`Absolute path: ${absolutePathToFile}`);
      console.log(
        `Absolute path replaced: ${absolutePathToFile.replace(argv.p, "")}`
      );
      console.log(`Argv.f: ${argv.p}`);
      console.log(`Argv.f substr: ${argv.p.substr(2)}`);
      console.log("_path: ", _path);
      console.log(`Name: ${names[i]}`);
      console.log(`Ruta: ${ruta}`);
      console.log("----------------------------------------");
      */

      let type = fs.lstatSync(absolutePathToFile).isDirectory()
        ? "directory"
        : "file";
      files.push({
        type,
        path: ruta,
        name: names[i],
        url: encodeURI(names[i])
      });
    }
    return files;
  } catch (e) {
    if (e.code === "EACCES") {
      console.log(
        "No se puede escanear el directorio (" + argv.f + "). Permiso denegado."
      );
      console.log(
        "Cambie el directorio compartido en el archivo de configuracion\ny reinicie el servidor."
      );
    } else if (e.code === "ENOENT") {
      console.log("No se encontro el directorio/archivo.");
    }
  }
}
module.exports.actualPathSync = actualPathSync;
