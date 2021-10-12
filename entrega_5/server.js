const express = require('express')

const app = express()

app.set('view engine', 'ejs');

const Contenedor = require('./contenedor');
const productosContenedor = new Contenedor('/data/productos.json')

app.use('/api/',express.static('public'))

/* app.get('/form', (req, res) =>{
    res.send
}) */


app.post('/api/productos', async (req, res) =>{
    const newProducto = req.body; 
    const idProductoNuevo = await productosContenedor.save(newProducto);
    res.send({
        message : 'success',
        data: {
            ...newProducto,
            id: idProductoNuevo
    }
})
})

app.get('/api/list-productos', async (req, res) =>{
    const productos = await productosContenedor.getAll()
    res.render('pages/vista_productos',{
        productos : productos,
    })
})

const PORT = 8080;
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));