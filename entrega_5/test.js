const fs = require('fs')

const Contenedor = require('./contenedor')

const miContenedor = new Contenedor('data/productos.json');

const misProductos = {
    'nombre' : 'Pera',
    'precio' : 11
}

const main = async () => {
    const id = await miContenedor.save(misProductos)

/*     await miContenedor.getById(id)

    await miContenedor.getAll();
    
    await miContenedor.deleteById(id)
    
    await miContenedor.deleteAll() */
}

main()