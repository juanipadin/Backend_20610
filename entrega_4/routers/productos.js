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

productosRouter.post('/:name/:precio', async (req, res) =>{
    const newProducto = {
        nombre : req.params.name,
        precio : Number(req.params.precio)
    }; 
    const idProductoNuevo = await productosContenedor.save(newProducto);

    res.send({
        message : 'success',
        data: {
            ...newProducto,
            id: idProductoNuevo
    }
})
})

productosRouter.put('/:id', async (req, res) =>{
    const productoAModificar = await productosContenedor.getById(Number(req.params.id))
    const datosNuevos = req.body
    const productoUpdate = await productosContenedor.update(productoAModificar,datosNuevos)
    res.send({"producto":productoUpdate})
})

productosRouter.delete('/:id', async (req, res) =>{
    idProducto = Number(req.params.id)
    console.log(idProducto)
    await productosContenedor.deleteById(idProducto);

    res.send({ message : 'Producto Eliminado de Forma Correcta' })
})

module.exports = productosRouter;