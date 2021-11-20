const express = require('express');
const CarritoDaoArchivos = require( '../daos/carrito/CarritoDaoArchivos' );

const carritoRouter = express.Router();

const carritoDaoArchivos = new CarritoDaoArchivos()

carritoRouter.post('/', async (req, res) =>{
    let cart = req.body;
    const idCartSaved = await carritoDaoArchivos.createCart(cart);
    res.send(`Se registró con éxito el carrito bajo el Id: ${idCartSaved}`)
    })
    
carritoRouter.delete('/:id', async (req, res) =>{
    idCarrito = Number(req.params.id)

    const carritoAEliminiar = await carritoDaoArchivos.deleteCart(idCarrito)
    res.send({carritoAEliminiar})
})

carritoRouter.get('/:id/productos', async (req, res) =>{
    const idCarrito = Number(req.params.id)

    const carritoSeleccionado = await carritoDaoArchivos.getByIdCart(idCarrito)
    res.send({carritoSeleccionado})
}) 

carritoRouter.post('/:id/productos', async (req, res) =>{
    const idCarrito = Number(req.params.id)
    const cartNew  = req.body

    const carritoUpdated = await carritoDaoArchivos.addProductsToCart(idCarrito, cartNew)
    res.send({carritoUpdated})
}) 

carritoRouter.delete('/:id/productos/:id_prod', async (req, res) =>{
    idCarrito = Number(req.params.id);
    idProducto = Number(req.params.id_prod)

    const productoAEliminiarPorCarrito = await carritoDaoArchivos.deleteProductToCart(idCarrito,idProducto)
    res.send({productoAEliminiarPorCarrito})
})

module.exports = carritoRouter;