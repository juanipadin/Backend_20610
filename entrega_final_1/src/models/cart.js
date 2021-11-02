const Contenedor = require('../../Contenedor');

const cartContenedor = new Contenedor('./data/carrito.json');

const createCart = async(newCart)=>{
    const idCarritoSaved = await cartContenedor.save(newCart);
    return idCarritoSaved
    }

const getByIdCart = async (idCart) => {
    const carrito = await cartContenedor.getById(idCart);
    if (!carrito){
        return "Error, producto no encontrado"
    }else{
        return carrito
}}

const deleteCart = async (idCarrito) =>{
    const carritoAEleminiar = await cartContenedor.deleteById(idCarrito)
    
    return  'Producto Eliminado de Forma Correcta'
}

const addProductsToCart = async(idCarrito, productosNew)=>{
    const listNew = Object.entries(productosNew)
    const timestamp = Date.now().toLocaleString()
    listNew.push({"timestamp" : timestamp})

    cartContenedor.update(idCarrito, listNew);

    return 'El producto se agregó de forma correcta'
}

const deleteProductToCart = async(idCarrito, idProducto) => {
    const resultadoCart = await cartContenedor.getById(idCarrito);
    const carritoNew = resultadoCart.productos.filter(cart => cart.id != idProducto)

    resultadoCart.productos.splice(carritoNew,1);

    const cartUpdated = await cartContenedor.update(idCarrito,resultadoCart) 
    return cartUpdated
}

module.exports = {
    createCart,
    getByIdCart,
    deleteCart,
    addProductsToCart,
    deleteProductToCart
}