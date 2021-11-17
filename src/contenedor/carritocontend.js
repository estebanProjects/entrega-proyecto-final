const heredar = require('./contend')
const funcasync = require('../async/async')

class Carrito extends heredar.Contenedor {

    async saveCarrito(carrito) {
    let fileExits = await funcasync.readFileAsync(this.nameFile); 
      if (fileExits && fileExits.length >= 0) {
        let dataFile = JSON.parse(fileExits);
        carrito.id = dataFile[dataFile.length - 1].id + 1;

        const rightnow = new Date();
        carrito.timeStamp = rightnow
        carrito.producto = []
        dataFile.push(carrito);
        funcasync.writeFileAsync(dataFile, this.nameFile);
        return carrito.id
      } else {
        let dataFile = []
        carrito.id = 1;
        dataFile.push(carrito);
        // console.log(dataFile)
  
        funcasync.writeFileAsync(dataFile, this.nameFile);
        return carrito.id
      }
    }

    async updateCarrito(id, array) {
        let fileExits = await funcasync.readFileAsync(this.nameFile); 
        if(fileExits && fileExits.length >= 0) {
            let fileData = JSON.parse(fileExits)
            // console.log(fileData)
            let index = fileData.findIndex(element => element.id == id)
            fileData[index].producto.push(array)
            await funcasync.writeFileAsync(fileData, this.nameFile)
            return fileData
        }
    }

    async deleteByIdProductByIdCar(carritoId, productoId) {
        let fileExits = await funcasync.readFileAsync(this.nameFile); 
        if(fileExits && fileExits.length >= 0) {
            let fileData = JSON.parse(fileExits)
            let index = fileData.findIndex(element => element.id == carritoId)
            let indexProd = fileData[index].producto.findIndex(element => element.id == productoId)
            fileData[index].producto.splice(indexProd, 1)
            console.log(fileData[index])
            funcasync.truncateAsync(this.nameFile)
            funcasync.writeFileAsync(fileData, this.nameFile)
        }
    }
}

module.exports.Carrito = Carrito