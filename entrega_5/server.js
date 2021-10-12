const express = require('express')

const app = express()

app.set('view engine', 'ejs');

const Contenedor = require('./contenedor');
const productosContenedor = new Contenedor('/data/productos.json')

app.use('/api/',express.static('public'))

/* app.get('/form', (req, res) =>{
    res.send
}) */


app.post('/productos', async (req, res) =>{
    const newProducto = req.body; 
    console.log(newProducto)
    const idProductoNuevo = await productosContenedor.save(newProducto);
    res.send({
        message : 'success',
        data: {
            ...newProducto,
            id: idProductoNuevo
    }
})
})

app.get('/lista-productos', async (req, res) =>{

})

const PORT = 8080;
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));