const ProductDaoMemory = require('./productos/ProductosDaoMemoria');
const ProductDaoFirestore = require('./productos/ProductosDaoFirestore');
const ProductosDaoArchivos = require('./productos/ProductosDaoArchivos');
const ProductosDaoMongo = require( './productos/ProductosDaoMongo' );

const daos = {}

if (process.env.storage === 'mongodb') {
    daos['productDao'] = ProductosDaoMongo;
}

if (process.env.storage === 'memory') {
    daos['productDao'] = ProductDaoMemory;
}

if (process.env.storage === 'firestore') {
    daos['productDao'] = ProductDaoFirestore; 
}

if (process.env.storage === 'file') {
    daos['productDao'] = ProductosDaoArchivos;
}

module.exports = daos;