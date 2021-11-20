const { Schema } = require('mongoose');

const MongoContainer = require("../../contenedores/ContenedorMongo");

class ProductosDaoMongo extends MongoContainer {
    constructor() {
    super('products', new Schema({
        name: { type: String, required: true },
        description: { type: String, required: true },
        code: { type: String, required: true },
        price: { type: String, required: true },
        stock: { type: String, required: true },
        photo: { type: String, required: true }
        }))
    }
};

module.exports = ProductosDaoMongo;