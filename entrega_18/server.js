const express = require('express');
const { Server : SocketServer } = require('socket.io');
const { Server : HttpServer, request} = require('http');
const { connected } = require( 'process' );
const MongoStore = require('connect-mongo')
const passport = require('passport')
const mongoose = require('mongoose')
const config = require('./config')

/* CARGA DE PRODUCTOS */
const Contenedor = require('./models/contenedor');
const productosContenedor = new Contenedor('/data/productos.json')

/* CARGA DE CHAT */
const Mensajes = require( './models/messages.js' );
const mensajes = new Mensajes('/data/messages.json')

const app = express()
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

/* CARGA DE SESION */
const session = require( 'express-session' );
const authWebRouter = require('./routers/web/auth')
const productosWebRouter = require('./routers/web/home');
const { getProducts, postProducts, deleteProduct, putProduct } = require('./test/axios');

/* HABILITA EL USO DEL JSON */
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: 'secreto',
    reseave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}))

/* CREA RELACIÓN A CARPETA 'PUBLIC' */
app.use( express.static('public') );

/* HABILITA EL USO DE EJS */
app.set('view engine', 'ejs');

app.use(authWebRouter)
app.use(productosWebRouter)

app.use(session({
    store: MongoStore.create({ mongoUrl: config.mongoLocal.cnxStr }),
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000
    }
}))

app.use(passport.initialize());
app.use(passport.session());


/* CREA EL WEBSOCKET */
io.on('connection', async (socket) => {

    /* CARGA DE PRODUCTOS INGRESADOS */
    socket.on('new-product', async(producto) =>{
        await productosContenedor.save(producto);
        const productos = await productosContenedor.getAll()
        io.sockets.emit('productos', productos) 
    })

    /* CARGA EL CHAT */
    const messages = await mensajes.getMessagess();
    socket.emit('messages', messages);

    socket.on('new-message', async data => {
        data.fechaHora = new Date().toLocaleString();
        await mensajes.saveMessages(data);
        const messages = await mensajes.getMessages();
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

app.delete('/productos/:id', async (req, res) =>{
    idProducto = Number(req.params.id)
    const productoAEliminiar = await productosContenedor.getById(idProducto)
    if (productoAEliminiar === null ){
        res.send({ error : 'Producto no Encontrado' })
    }else {
        await productosContenedor.deleteById(idProducto);
        res.send({ message : 'Producto Eliminado de Forma Correcta' })
    }
}) 

app.put('/productos/:id', async (req, res) =>{
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
        })}
})


/* CREA LISTA DE PRODUCTOS */
app.get('/list-productos', async (req, res) =>{
    const productos = await productosContenedor.getAll()
    res.render('pages/vista_producto',{
        productos : productos,
    })
})

/* REALIZA LA CONECCIÓN Y VERIFICA ERRORES */
const PORT = 8080;

mongoose.connect(config.mongoLocal.cnxStr, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if(err) {
      console.error('Error connection mongo');
    }

const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor en Http con Websocket escuchando en el puerto ${connectedServer.address().port}`)
})



/* Promise.all([getProducts(), postProducts(), deleteProduct(),putProduct()])
    .then(function(results){
        const getAxios = results[0];
        const postAxios = results[1];
        const deleteAxios = results[2];
        const putAxios = results[3]
    }) */

connectedServer.on('error', error => console.log(`Eror en el servidor ${PORT}`))})
