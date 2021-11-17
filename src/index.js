const express = require('express')
const app = express()

const container = require('./contenedor/contend')
const containerCarrito  = require('./contenedor/carritocontend')

// settings
const port = process.env.PORT || 8080

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// rutas 
const productRoutes = require('./routes/productos')
app.use("/api/productos", productRoutes)

const carritoRoutes = require('./routes/carritos')
app.use("/api/carrito", carritoRoutes)

// init
let contenedorProductos = new container.Contenedor("./src/data/productos.txt")
let contenedorCarrito = new containerCarrito.Carrito("./src/data/carritos.txt")

// Prueba 
app.get('/', async(req, res) => {
    res.send("!Pruebe las rutas get! ¡No se olvide del Postman para los métodos get, post y delete")
})

module.exports.contenedorProductos = contenedorProductos
module.exports.contenedorCarrito = contenedorCarrito

app.listen(port, () => {
    console.log("Server running on port", port)
})