const funcasync = require('../async/async')

function randomCode() {
    let abc = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","u","v","w","x","y","z", "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","U","V","W","X","Y","Z"]
    let code = []
    for(let i=0; i<5; i++) {
        code.push(abc[Math.floor(Math.random()*abc.length)])
    }
    return code.join('')
}

class Contenedor {
    constructor(nameFile) {
      this.nameFile = nameFile
    }
  
    async save(product) {
      let fileExits = await funcasync.readFileAsync(this.nameFile); 
      if (fileExits && fileExits.length >= 0) {
        let dataFile = JSON.parse(fileExits);
        product.id = dataFile[dataFile.length - 1].id + 1;

        const rightnow = new Date();
        product.timeStamp = rightnow
        let codigo = randomCode()
        product.codigo = codigo
        dataFile.push(product);
        // this.productos = dataFile;
        funcasync.writeFileAsync(dataFile, this.nameFile);
        return product.id
      } else {
        let dataFile = []
        product.id = 1;
        dataFile.push(product);
        console.log(dataFile)
  
        funcasync.writeFileAsync(dataFile, this.nameFile);
        return product.id
      }
    }
  
    async getById(id) {
      let fileExits = await funcasync.readFileAsync(this.nameFile)
  
      if(fileExits) {
        let dataFile = JSON.parse(fileExits)
  
        for(let i=0; i<dataFile.length; i++) {
          if(dataFile[i].id == id) {
            return dataFile[i]
          }
        }
        return {error: "Producto no encontrado"}
      }
    }
  
    async getAll() {
      let datos = await funcasync.readFileAsync(this.nameFile)
  
      if(datos) {
        let dataFile = JSON.parse(datos)
        return dataFile
      } else {
        console.log('as')
        let vacio = []
        return vacio
      }
    }
  
    async deleteById(id) {
      let datos = await funcasync.readFileAsync(this.nameFile)
      
      if(datos) {
        let dataFile = JSON.parse(datos)
        for(let i=0; i<dataFile.length; i++) {
          if(dataFile[i].id == id) {
            dataFile.splice(i, 1)
            funcasync.truncateAsync(this.nameFile)
            funcasync.writeFileAsync(dataFile, this.nameFile)
          }
        }
      }
    }
  
    async deleteAll() {
        funcasync.truncateAsync(this.nameFile)
    }

  }

module.exports.Contenedor = Contenedor