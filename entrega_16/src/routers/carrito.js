const express = require('express');

const carritoRouter = express.Router();

const { CartDao } = require('../daos'); 
const cartDao = new CartDao();

carritoRouter.post('/', async (req, res) =>{
    let cart = req.body;
    const idCartSaved = await cartDao.createCart(cart);

    res.send(`Se registró con éxito el carrito bajo el Id: ${idCartSaved}`)
    })
    
carritoRouter.delete('/:id', async (req, res) =>{
    idCarrito = req.params.id
    const carritoAEliminiar = await cartDao.deleteCart(idCarrito);

    res.send({carritoAEliminiar})
})

carritoRouter.get('/:id/productos', async (req, res) =>{
    const idCarrito = req.params.id
    const carritoSeleccionado = await cartDao.getByIdCart(idCarrito);

    res.send({carritoSeleccionado})
}) 

carritoRouter.post('/:id/productos', async (req, res) =>{
    const idCarrito = req.params.id
    const cartNew  = req.body
    const carritoUpdated = await cartDao.addProductsToCart(idCarrito, cartNew);

    res.send({carritoUpdated})
}) 

carritoRouter.delete('/:id/productos/:id_prod', async (req, res) =>{
    idCarrito = req.params.id;
    idProducto = req.params.id_prod;
    const productoAEliminiarPorCarrito = await cartDao.deleteProductToCart(idCarrito,idProducto);

    res.send({productoAEliminiarPorCarrito})
})

module.exports = carritoRouter;