const express = require('express');
const { Server : SocketServer } = require('socket.io');
const { Server : HttpServer} = require('http');
const { connected } = require( 'process' );
const { optionsMYSQL } = require( './options/databases' );
const { getMessages, saveMessages} = require('./models/messages')

/* CARGA DE PRODUCTOS */
const Contenedor = require('./models/contenedor');
const productosContenedor = new Contenedor(optionsMYSQL,'products')

const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

/* CREA RELACIÓN A CARPETA 'PUBLIC' */
app.use( express.static('public') );

/* HABILITA EL USO DE EJS */
app.set('view engine', 'ejs');

/* CREA EL WEBSOCKET */
io.on('connection', async (socket) => {
    console.log(`Nuevo cliente conectado ${socket.id}`)

    /* CARGA DE PRODUCTOS INGRESADOS */
    socket.on('new-product', async(producto) =>{
        await productosContenedor.save(producto);
        const productos = await productosContenedor.getAll()
        io.sockets.emit('productos', productos) 
    })
    /* CARGA EL CHAT */
    const messages = await getMessages();
    socket.emit('messages', messages);

    socket.on('new-message', async data => {
        data.fechaHora = new Date().toLocaleString();
        await saveMessages(data);
        io.sockets.emit('messages', messages);
    }) 
})

/* CREA EL /FORM */
app.get('/form', async (req, res) =>{
    res.render ('../views/pages/form')
})

/* CREA EL /POST PRODUCTOS */
app.post('/productos', async (req, res) =>{
    const newProducto = req.body; 
    console.log(newProducto)
    const idProductoNuevo = await productosContenedor.save(newProducto);
    res.redirect('/list-productos');
}) 

/* CREA LISTA DE PRODUCTOS */
app.get('/list-productos', async (req, res) =>{
    const productos = await productosContenedor.getAll()
    res.render('pages/vista_producto',{
        productos : productos,
    })})
    

    /* REALIZA LA CONECCIÓN Y VERIFICA ERRORES */
const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor en Http con Websocket escuchando en el puerto ${connectedServer.address().port}`)
})

connectedServer.on('error', error => console.log(`Eror en el servidor ${PORT}`))