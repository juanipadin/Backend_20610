const express = require('express');

const productosRouter = express.Router();

const Contenedor = require('../models/contenedor');
const productosContenedor = new Contenedor('./data/productos.json');

productosRouter.get('/', async (req, res) =>{
    const listaDeProductos = await productosContenedor.getAll()
    res.send({listaDeProductos})
})

productosRouter.get('/:id', async (req, res) =>{
    //const lista = await productosContenedor.getAll()
    const idProducto = Number(req.params.id)
    const productoSeleccionado = await productosContenedor.getById(idProducto)
        if (!productoSeleccionado){
        res.send({ error : 'producto no encontrado' })
    }else{
        res.send({
            data: productoSeleccionado
        })
    }
    res.send({productoSeleccionado})
})

productosRouter.post('/', async (req, res) =>{
    const newProducto = req.body; 
    const idProductosSaved = await productosContenedor.save(newProducto);

    res.send({
        message : 'success',
        data: {
            ...newProducto,
            id: idProductosSaved
    }
})
})

productosRouter.put('/:id', async (req, res) =>{
    const datosNuevos = req.body
    const productoUpdate = await productosContenedor.update(req.params.id,datosNuevos)

    if (!productoUpdate){
        res.send({
            error : 'Producto no encontrado',
            data : productoUpdate
        })

    } else{
        res.send({
            message :'Operación Exitosa',
            data : productoUpdate
        })
    }
})

productosRouter.delete('/:id', async (req, res) =>{
    idProducto = Number(req.params.id)
    const productoAEliminiar = await productosContenedor.getById(idProducto)
    if (productoAEliminiar === null ){
        res.send({ error : 'Producto no Encontrado' })
    }else {
        await productosContenedor.deleteById(idProducto);
        res.send({ message : 'Producto Eliminado de Forma Correcta' })
    }
})

module.exports = productosRouter;