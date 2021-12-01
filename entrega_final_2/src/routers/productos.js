const express = require('express');
const productosRouter = express.Router();

const { ProductDao } = require('../daos'); 
const productDao = new ProductDao();


const isAdmin = require( '../../middlewares/isAdmin' );


productosRouter.get('/', async (req, res) =>{
    console.log(productDao)
    const data = await productDao.getAll();
    
    res.send({data})
})

productosRouter.get('/:id', async (req, res) =>{
    const idProducto = req.params.id
    const data = await productDao.getById(idProducto)

    res.send({data})
})

productosRouter.post('/', isAdmin, async (req, res) =>{
    const newProducto = req.body; 
    const idProductosSaved = await productDao.save(newProducto)

    res.send({
        message : 'Se registró con éxito el producto',
        data: { idProductosSaved }})
})

productosRouter.put('/:id', isAdmin, async (req, res) =>{
    const datosNuevos = req.body;
    const idProducto = req.params.id;
    const data = await productDao.update(idProducto,datosNuevos)

    res.send({data})
})

productosRouter.delete('/:id', isAdmin, async (req, res) =>{
    idProducto = req.params.id
    const data = await productDao.deleteById(idProducto)
    
    res.send({data})
})

module.exports = productosRouter;