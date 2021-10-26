const express = require('express');

const carritoRouter = express.Router();

const Contenedor = require('../models/contenedor');
const carritoContenedor = new Contenedor('./data/productos.js');

carritoRouter.get('/', async (req, res) =>{
    const lista = await carritoContenedor.getAll()

    res.send({
        message : 'success',
        data: lista
    })
})

carritoRouter.post('/', async (req, res) =>{
    const newMascota = req.body; 
    const idMascotasSaved = await carritoContenedor.save(newMascota);

    res.send({
        message : 'success',
        data: {
            ...newMascota,
            id: idMascotasSaved
    }
})
})

module.exports = carritoRouter;