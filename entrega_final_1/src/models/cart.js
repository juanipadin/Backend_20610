const Contenedor = require('../../Contenedor');

const cartContenedor = new Contenedor('./data/carrito.json');
const productoContenedor = new Contenedor('./data/productos.json')

const createCart = async(newCart)=>{
    newCart.productos = []
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
    const resultadoCart = await cartContenedor.getById(idCarrito); // SELECCIONA EL CARRITO EN DONDE SE AGREGARÁN LOS PRODUCTOS

    const listadoDeIds = productosNew.productos.map((element) =>(element.id)) // CREA UN ARRAY CON LOS IDs A AGREGAR
    
    let listadoDeProductos = [] //CREA UN ARRAY VACIO PARA INGRESAR LOS DATOS DE LOS PRODUCTOS

    for (const i of listadoDeIds) { // SE AGREGA EN EL ARRAY DE listadoDeProductos, LOS DATOS DE LOS PRODUCTOS A AGREGAR POR CADA ID
        datosDelProductoAIngresar = await productoContenedor.getById(i); 
        listadoDeProductos.push(datosDelProductoAIngresar)
    }

    resultadoCart.productos.push(listadoDeProductos) // ABREGA AL CARRITO LOS PRODUCTOS
    cartContenedor.update(idCarrito, resultadoCart);
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