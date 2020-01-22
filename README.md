# :file_folder: Node-File-Server
## Crea un servidor NodeJS para compartir los archivos en la ruta especificada.
* Ignora archivos que comienzan con . (Opcional)
* Comparte los archivos y directorios recursivamente que se encuentren en la ruta especificada con el flag -p

### Pre-requisitos 📋
```
node
```


### Instalacion 🔧
```shell
$ git clone https://github.com/viejocadillac/Node-File-Server.git
$ cd ./Node-File-Server
$ npm install
```
### Compartiendo archivos 🚀
```shell
$ node app.js -p <ruta a compartir> [--showHidden] 
```
  *Si no se utiliza el flag **--showHidden** los archivos/directorios que comienzen con **.** se omiten.*




**TODO**🛠️
  - [x] Compartir archivos recursivamente.
  - [ ] Manejar errores (ej. 404).
  
