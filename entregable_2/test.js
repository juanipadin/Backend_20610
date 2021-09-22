const fs = require('fs')

const Contenedor = require('./contenedor')

const miContenedor = new Contenedor('productos.json');

//miContenedor.deleteAll()
//miContenedor.save('producto1')

const misProductos = {
    'nombre' : 'Banana',
    'precio' : 22
}


const main = async () => {
    //const id = await miContenedor.save(misProductos)
    //console.log(id)

    //await miContenedor.getById(4)

    //const list = await miContenedor.getAll();
    //console.log(list)
    
    //await miContenedor.deleteById(2)
    
    //await miContenedor.deleteAll(1)

}

main()