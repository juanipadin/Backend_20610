require('dotenv').config()

const ProductosDaoArchivos = require('./productos/ProductosDaoArchivos');
const ProductosDaoMongo = require( './productos/ProductosDaoMongo' );
const ProductosDaoMemoria = require( './productos/ProductosDaoMemoria' );
const ProductosDaoFirestore = require( './productos/ProductosDaoFirestore' );

const CarritoDaoArchivos = require('./carrito/CarritoDaoArchivos');
const CarritoDaoMongo = require( './carrito/CarritoDaoMongo' );
const CarritoDaoMemoria = require( './carrito/CarritoDaoMemoria' );
const CarritoDaoFirestore = require( './carrito/CarritoDaoFirestore' );

const daos = {}

/* ENV PRODUCTOS */
daos['ProductDao'] = ProductosDaoMongo

if (process.env.STORAGE === 'mongodb') {
    daos['ProductDao'] = ProductosDaoMongo;
}

if (process.env.STORAGE === 'memory') {
    daos['ProductDao'] = ProductosDaoMemoria;
}

if (process.env.STORAGE === 'firestore') {
    daos['ProductDao'] = ProductosDaoFirestore; 
}

if (process.env.STORAGE === 'file') {
    daos['ProductDao'] = ProductosDaoArchivos;
}



/* ENV CARRITO */
daos['CartDao'] = CarritoDaoMongo

if (process.env.STORAGE === 'mongodb') {
    daos['CatDao'] = CarritoDaoMongo;
}

if (process.env.STORAGE === 'memory') {
    daos['CatDao'] = CarritoDaoMemoria;
}

if (process.env.STORAGE === 'firestore') {
    daos['CatDao'] = CarritoDaoFirestore; 
}

if (process.env.STORAGE === 'file') {
    daos['CatDao'] = CarritoDaoArchivos;
}

module.exports = daos;