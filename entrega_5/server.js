const express = require('express')

const app = express()

app.set('view engine', 'ejs');

const Contenedor = require('../entrega_3/contenedor');
const productosContenedor = new Contenedor('/data/productos.json')

/* app.get("/form", (req, res) => {
    res.render("pages/datos", {
        min : req.query.min,
        nivel : req.query.nivel,
        max : req.query.max,
        titulo : req.query.titulo,
    });}); */

    app.get('/form', (req,res) =>{
        res.render('pages/form',{
            nombre : req.query.nombre,
            precio : req.query.precio
        })
    })
    
app.post('/form', async (req, res) =>{
    const newProducto = req.query; 
    const idProductoNuevo = await productosContenedor.save(newProducto);
    res.send({
        message : 'success',
        data: {
            ...newProducto,
            id: idProductoNuevo
    }
})
})




const PORT = 8080;
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));