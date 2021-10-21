const express = require('express');
const { Server : SocketServer } = require('socket.io');
const { Server : HttpServer} = require('http');
const { connected } = require( 'process' );

const Contenedor = require('./contenedor');
const productosContenedor = new Contenedor('/data/productos.json')
/* const { getMessages, saveMessage } = require( './models/messages' ); */

const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}))



const sitio = app.get('/list-productos', async (req, res) =>{
    const productos = await productosContenedor.getAll()
    res.render('pages/index',{
        productos : productos,
    })
})

app.post('/productos', async (req, res) =>{
    const newProducto = req.body; 
    console.log(newProducto)
    const idProductoNuevo = await productosContenedor.save(newProducto);
    res.redirect('/list-productos');
}) 

io.on('connection', (socket) => {
    console.log(`Nuevo cliente conectado ${socket.id}`)

    socket.emit('sitio', sitio)
    socket.on('new-product', (sitio) =>{
        io.sockets.emit('sitio', sitio) 
    } )
    
/*     socket.on('new-message', (message) =>{
        saveMessage(message) 

        const messages = getMessages(); 
        io.sockets.emit('messages', messages) 

    })  */
})


const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor en Http con Websocket escuchando en el puerto ${connectedServer.address().port}`)
})

connectedServer.on('error', error => console.log(`Eror en el servidor ${PORT}`))