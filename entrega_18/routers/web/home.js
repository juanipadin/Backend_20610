const Router = require('express')
const path = require('path')

const productosWebRouter = new Router;

productosWebRouter.get('/home', (req, res) => {
    console.log(req.session.nombre)
    res.render(path.join(process.cwd(), '/views/pages/home.ejs'), { nombre: req.session.nombre })
})

productosWebRouter.get('/productos-vista-test', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/views/productos-vista-test.html'))
})

module.exports= productosWebRouter