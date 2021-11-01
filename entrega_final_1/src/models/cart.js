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
    
    return({ message : 'Producto Eliminado de Forma Correcta' })
}

const addProductsToCart = async(idCarrito, productosNew)=>{
    productosNew.timestamp = Date.now().toLocaleString()
    const cartNew = cartContenedor.update(idCarrito, productosNew);

    return {cartNew}
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