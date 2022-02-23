const express = require('express')

//const authWebRouter = require('./routers/auth.js')
const carritoRouter = require('./routers/carrito.js')
const productosRouter = require('./routers/productos.js')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//app.use('/api/auth', authWebRouter)
app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritoRouter)

module.exports = app
