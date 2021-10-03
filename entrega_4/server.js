const express = require('express');

const productosRouter = require( './routers/productos' );

const server = express();

const PORT = 8080;

server.use(express.json());
server.use(express.urlencoded({extended: true}))

server.use('/static',express.static('public'))

server.get('/', (req, res) =>{
    console.log('ok');
    res.send({message : new Date().toDateString()})
})

server.use('/api/productos', productosRouter)

server.listen(PORT, () => console.log(`Servidor corriendo en ${PORT}`));

server.on('error', error => console.log('Error en servidor: ', error))