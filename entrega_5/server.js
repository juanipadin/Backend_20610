const express = require('express')

const app = express()

app.set('view engine', 'ejs');

const Contenedor = require('./contenedor');
const productosContenedor = new Contenedor('/data/productos.json')

app.use('/productos',express.static('public'))

app.post('/productos', async (req, res) =>{
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

async function  hola (dato){
    await productosContenedor.save(dato)
}

hola('nombre: juan')

const PORT = 8080;
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));