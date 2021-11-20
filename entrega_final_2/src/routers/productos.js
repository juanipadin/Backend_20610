const express = require('express');
const productosRouter = express.Router();

/* const { productDao } = require('../daos'); 
const productDao = new ProductDao();*/


const isAdmin = require( '../../middlewares/isAdmin' );

const ProductosDaoMongo = require( '../daos/productos/ProductosDaoMongo' );
const ProductosDaoArchivos = require( '../daos/productos/ProductosDaoArchivos' );

const productoDaoMongo = new ProductosDaoMongo();
const productoDaoArchivo = new ProductosDaoArchivos()

productosRouter.get('/', async (req, res) =>{
    console.log(productDao)
    const data = await productDao.getAll();
    //const data = await productoDaoArchivo.getAllProducts();
    //const data = await productoDaoMongo.getAll()
    
    res.send({data})
})

productosRouter.get('/:id', async (req, res) =>{
    const idProducto = req.params.id
    const data = await productoDaoArchivo.getByIdProducts(idProducto)
    //const data = await productoDaoMongo.getById(idProducto)
    res.send({data})
})

productosRouter.post('/', isAdmin, async (req, res) =>{
    const newProducto = req.body; 
    const idProductosSaved = await productoDaoArchivo.createProducts(newProducto)
    //const idProductosSaved = await productoDaoMongo.save(newProducto)
    res.send({
        message : 'Se registró con éxito el producto',
        data: { idProductosSaved }})
})

productosRouter.put('/:id', isAdmin, async (req, res) =>{
    const datosNuevos = req.body;
    const idProducto = req.params.id;
    const data = await productoDaoArchivo.updateProducts(idProducto,datosNuevos)
    //const data = await productoDaoMongo.update(idProducto,datosNuevos);
    res.send({data})
})

productosRouter.delete('/:id', isAdmin, async (req, res) =>{
    idProducto = req.params.id
    const data = await productoDaoArchivo.deleteProductById(idProducto)
    //const data = await productoDaoMongo.deleteById(idProducto)
    res.send({data})
})

module.exports = productosRouter;