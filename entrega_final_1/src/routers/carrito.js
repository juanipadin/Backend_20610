const express = require('express');

const carritoRouter = express.Router();

const Contenedor = require('../../contenedor');
const carritoContenedor = new Contenedor('./data/carrito.json');

carritoRouter.post('/', async (req, res) =>{
    const newCarrito = req.body; 
    const idcarritoSaved = await carritoContenedor.save(newCarrito);

    res.send(`El carrtio se guardó de forma satisfactoria siendo su ID el: ${idcarritoSaved}`)
})

carritoRouter.delete('/:id', async (req, res) =>{
    idCarrito = Number(req.params.id)
    const carritoAEliminiar = await carritoContenedor.getById(idCarrito)
    if (carritoAEliminiar === null ){
        res.send('Carrito no Encontrado')
    }else {
        await carritoContenedor.deleteById(idCarrito);
        res.send('Carrito Eliminado de Forma Correcta' )
    }
})

carritoRouter.get('/:id/productos', async (req, res) =>{
    const listaDecarrito = await carritoContenedor.getAll()
    res.send({listaDecarrito})
})

carritoRouter.get('/:id', async (req, res) =>{
    //const lista = await carritoContenedor.getAll()
    const idCarrito = Number(req.params.id)
    const carritoeleccionado = await carritoContenedor.getById(idCarrito)
        if (!carritoeleccionado){
        res.send({ error : 'producto no encontrado' })
    }else{
        res.send({
            data: carritoeleccionado
        })
    }
    res.send({carritoeleccionado})
})


carritoRouter.put('/:id', async (req, res) =>{
    const datosNuevos = req.body
    const productoUpdate = await carritoContenedor.update(req.params.id,datosNuevos)

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


module.exports = carritoRouter;