const express = require('express');
const { appendFile } = require( 'fs' );
const carritoRouter = require( '../entrega_final_1/routers/carrito' );
const productosRouter = require( '../entrega_final_1/routers/productos' );

const server = express();

const PORT = 8080;

server.use(express.json());
server.use(express.urlencoded({extended: true}))

server.use('/api',express.static('public'))

server.use('/api/productos', productosRouter)
server.use('/api/carrito', carritoRouter)

server.listen(PORT, () => console.log(`Servidor corriendo en ${PORT}`));

server.on('error', error => console.log('Error en servidor: ', error))