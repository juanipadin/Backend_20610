class PersistenceFactory{
    static async getPersist(pers){
        switch (pers) {
            case 'memoria':
                const {default : ProductosDaoMemoria} = require('./productos/ProductosDaoMemoria')
                const {default : CarritoDaoMemoria} = require('./carrito/CarritoDaoMemoria');

                return{
                    productosDao : new ProductosDaoMemoria(),
                    carritosDao  : new CarritoDaoMemoria()
                }
            case 'firebase':
                const {default : ProductosDaoFirestore} = require('./productos/ProductosDaoFirestore')
                const {default : CarritoDaoFirestore} = require('./carrito/CarritoDaoFirestore');

                return{
                    productosDao : new ProductosDaoFirestore(),
                    carritosDao  : new CarritoDaoFirestore()
                }

            case 'mongodb':
                const {default : ProductosDaoMongo} = require('./productos/ProductosDaoMongo')
                const {default : CarritoDaoMongo} = require('./carrito/CarritoDaoMongo');

                return{
                    productosDao : new ProductosDaoMongo(),
                    carritosDao  : new CarritoDaoMongo(),
                }
            
            default:
                const {default : ProductosDaoArchivos} =  require('./productos/ProductosDaoArchivos.js')
                const {default : CarritoDaoArchivos} = require('./carrito/CarritoDaoArchivos.js');

                return{
                    productosDao : new ProductosDaoArchivos(),
                    carritosDao : new CarritoDaoArchivos()
        }
    }
}}

module.exports = PersistenceFactory;