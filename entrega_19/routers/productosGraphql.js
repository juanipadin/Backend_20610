/* GRAPHQL */
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql')

/* CARGA DE PRODUCTOS */
const Contenedor = require('../models/contenedor');
const productosContenedor = new Contenedor('/data/productos.json')

const productSchema = buildSchema(`
  type Query {
    getProduct(id: Int): Product
    getProducts: [Product]
  }
  type Mutation {
    createProduct(
      nombre: String!
      precio: Int!
      foto: String!
    ): Product,
    updateProduct(
      id: Int!,
      nombre: String
      precio: Int
      foto: String
    ): Product,
    deleteProduct(
      id: Int!
    ): Product,                            
  },
  type Product {
    id: Int
    nombre: String
    precio: Int
    foto: String
  }    
`)

const productosRouterGraphQl = graphqlHTTP({
  schema: productSchema,
  rootValue: {
    getProduct: ({ id }) => productosContenedor.getById(id),
    getProducts: ()=> productosContenedor.getAll(),
    createProduct: (data) => productosContenedor.save(data),
    updateProduct: (data) => productosContenedor.update(data),
    deleteProduct: ({ id }) => productosContenedor.deleteById(id)
  },
  graphiql: true
})

module.exports = productosRouterGraphQl