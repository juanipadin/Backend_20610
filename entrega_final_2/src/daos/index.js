require('dotenv').config()

const ProductosDaoArchivos = require('./productos/ProductosDaoArchivos');
const ProductosDaoMongo = require( './productos/ProductosDaoMongo' );
const ProductosDaoMemoria = require( './productos/ProductosDaoMemoria' );
const ProductosDaoFirestore = require( './productos/ProductosDaoFirestore' );

const daos = {}

if (process.env.storage === 'mongodb') {
    daos['productDao'] = ProductosDaoMongo;
}

if (process.env.storage === 'memory') {
    daos['productDao'] = ProductosDaoMemoria;
}

if (process.env.storage === 'firestore') {
    daos['productDao'] = ProductosDaoFirestore; 
}

if (process.env.storage === 'file') {
    daos['productDao'] = ProductosDaoArchivos;
}

module.exports = daos;