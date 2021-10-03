const express = require('express');
//const { Router } = express;
//router = express.Router()
const productosRouter = express.Router();

const Contenedor = require('../../entrega_3/contenedor');
const productosContenedor = new Contenedor('/data/productos.json')

productosRouter.get('/', async (req, res) =>{
    const lista = await productosContenedor.getAll()
    res.send({
        data: lista
    })
})

productosRouter.get('/:id', async (req, res) =>{
    idProducto = Number(req.params.id)
    const productoSeleccionado = await productosContenedor.getById(idProducto)
    res.send({
        data: productoSeleccionado
    })
})

productosRouter.post('/', async (req, res) =>{
    const newProducto = req.body; 
    const idProductoNuevo = await productosContenedor.save(newProducto);

    res.send({
        message : 'success',
        data: {
            ...newProducto,
            id: idProductoNuevo
    }
})
})

productosRouter.delete('/:id', async (req, res) =>{
    idProducto = Number(req.params.id)
    console.log(idProducto)
    await productosContenedor.deleteById(idProducto);

    res.send({ message : 'Producto Eliminado de Forma Correcta' })
})

module.exports = productosRouter;