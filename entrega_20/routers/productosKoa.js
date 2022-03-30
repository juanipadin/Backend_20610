/* CARGA DE PRODUCTOS */
const Contenedor = require('../models/contenedor');
const productosContenedor = new Contenedor('/data/productos.json')

const Router = require('koa-router')

const productosKoa = new Router({
    prefix: '/koa'
});

productosKoa.get('/', async ctx =>{
    ctx.body= {
        status : 'success',
        messages :  await productosContenedor.getAll()
    }
})

productosKoa.get('/:id', async ctx =>{
    ctx.body= {
        status : 'success',
        messages :  await productosContenedor.getById(Number(ctx.params.id))
    }
})


productosKoa.post('/', async ctx => {
    console.log(ctx.request.body)
    await productosContenedor.save(ctx.request.body)
    ctx.response.status = 201
    ctx.body = {
        status: 'success'
    }
})

productosKoa.put('/:id', async ctx => {
        const id = Number(ctx.params.id)
        await productosContenedor.update(id, ctx.request.body)
        ctx.response.status = 201
        ctx.body = {
          status: 'success'}
})

productosKoa.delete('/:id', async ctx => {
    const id = Number(ctx.params.id)
    await productosContenedor.deleteById(id)
    ctx.response.status = 201
    ctx.body = {
      status: 'success'}
})

productosKoa.delete('/:id', async ctx => {
    const id = Number(ctx.params.id)
    await productosContenedor.deleteById(id)
    ctx.response.status = 201
    ctx.body = {
      status: 'success'}
})
module.exports = productosKoa