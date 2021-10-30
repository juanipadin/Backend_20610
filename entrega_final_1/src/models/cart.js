const Contenedor = require('../../Contenedor');

const cartContenedor = new Contenedor('./data/carrito.json');

const getAllProducts = async () =>{
    const list = await cartContenedor.getAll();
    return list
}

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

const updateProducts = async(idProduct,newData)=>{
    const productoUpdate = await cartContenedor.update(idProduct,newData)
        if (!productoUpdate){
        return 'Producto no encontrado'
        }else {
            return productoUpdate
    }}
 
const deleteCart = async (idCarrito) =>{
    const carritoAEleminiar = await cartContenedor.deleteById(idCarrito)
        return({ message : 'Producto Eliminado de Forma Correcta' })
}


const addProductsToCart = async(idCarrito, productosNew)=>{
    const cartNew = cartContenedor.update(idCarrito, productosNew);
    return {cartNew}
}

const deleteProductToCart = async(idCarrito, idProducto) => {
    const cart = await cartContenedor.getById(idCarrito);
    const { products } = cart;

    products.splice(idProducto,1);
    const newCart = {
        ...cart,
        products
    }
    const cartUpdated = await cartContenedor.update(idCarrito,newCart);
    return cartUpdated
}

module.exports = {
    getAllProducts,
    createCart,
    getByIdCart,
    updateProducts,
    deleteCart,
    addProductsToCart,
    deleteProductToCart
}