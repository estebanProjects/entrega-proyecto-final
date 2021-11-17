const express = require('express')
const router = express.Router()

const app = express()
app.use(express.json())

const index = require('../index')
const funcasync = require('../async/async')

// Post 1
router.post('/', async(req, res) => {
    await index.contenedorCarrito.save(req.body)
    res.send("El carrito se guardo correctamente!")
})

// Delete
router.delete('/:id', async(req, res) => {
    await index.contenedorCarrito.deleteById(req.params.id)
    res.send("Carrito removido correctamente!")
})

// Get
router.get('/:id/productos', async(req, res) => {
    let carrito = await index.contenedorCarrito.getById(req.params.id)
    res.send(carrito.producto)
})

// Post 2
router.post('/:id/productos', async(req, res) => {
    console.log(req.params.id)
    console.log(req.body)
    await index.contenedorCarrito.updateCarrito(req.params.id, req.body)
    res.send("Proceso realizado correctamente")
})

// Delete 2
router.delete('/:id/productos/:id_prod', async(req, res) => {
    console.log(req.params.id)
    console.log(req.params.id_prod)
    await index.contenedorCarrito.deleteByIdProductByIdCar(req.params.id, req.params.id_prod)
    res.send("Productos del carrito eleminados correctamente")
})

module.exports = router