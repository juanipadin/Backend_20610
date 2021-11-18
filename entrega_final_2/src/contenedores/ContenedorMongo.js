import mongoose from 'mongoose';
const main = require('../config')
const {Schema, model} = mongoose

const productsCollection = 'products';

const ProductosSchema = new Schema({
    name: {type: String, requiere: true, max: 100},
    description: {type: String, requiere: true, max: 100},
    price: {type: String, requiere: true, max: 100},
    img: {type: String, requiere: true},
    stock: {type: String, requiere: true, max: 100}
})

const ProductModel = model(productsCollection,ProductosSchema)

class ContenedorMongo {

/*     constructor (config, collection){
        this.collection = collection
        this.conexion = config
    } */

        async save(newProduct){
            try{
                const newProduct = {
                    name: "ahhsh",
                    description: "opeioeie",
                    price: "11",
                    img: "fadsfasdfadsfadsfd",
                    stock: "99"
                }
                const productSaved = new  ProductModel(newProduct);
                const response = await productSaved.main.save()
                console.log({response})

            } catch(error) {
                console.error('Error: ', error)
            }
        }

    async getById(id){
        try{
            //const userList = await ProductModel.find({});
                if (contenido.lenght === 0){
                    return null
                } else{
                    return contenido
                }
        } catch (error){
            console.error('Error de lectura',error)
        }
        
    }

    async getAll(){
        try {
            const list = await ProductModel.find({});
            console.log('hola')
            return console.log(list);
        }
        catch (error){
            console.error('Error de lectura',error)
        }
    }

    async deleteById(numero){
        try{
            const contenido = await fs.promises.readFile(`./${this.nombreArchivo}`,'utf-8');
            const listaDeProductos = JSON.parse(contenido)

            const resultadoId = listaDeProductos.find(number => number.id === numero)
            if (!resultadoId){
                return null
            } else{
                const index = listaDeProductos.filter(resultadoId => resultadoId.id != numero);
                const listaNew = JSON.stringify(index)
    
                await fs.promises.writeFile(`./${this.nombreArchivo}`,listaNew);
                console.log('El producto seleccionado se eliminó de forma correcta')
            }

        } catch (error){
            console.error('Error de lectura',error)
        }
    }



    async deleteAll(){
        try {
            const contenido = await fs.promises.writeFile(`./${this.nombreArchivo}`,'');
            console.log('Se eliminaron todos los productos de forma correcta')
        }
        catch (error){
            console.error('Error de lectura',error)
        }
    }

    async update(id, producto){
        try {
            const list = await this.getAll();
            const productoSaved = list.find((item) => item.id === parseInt(id))
            const indexProductoSaved = list.findIndex((item) => item.id === parseInt(id))
    
            if (!productoSaved){
                console.log(`Error con el Id: ${id} no fue encontrado`)
                return null
            }

            const productoUpdate = {
                ...productoSaved, 
                ...producto
            };
            list[indexProductoSaved] = productoUpdate


            const elementString = JSON.stringify(list, null, 2)
            await fs.promises.writeFile(`./${this.nombreArchivo}`, elementString);
    
            return productoUpdate
        }
        catch (error){
            console.error('Error de lectura',error)
        }
    }
}

ContenedorMongo.save
//ContenedorMongo.getAll

//module.exports = ContenedorMongo;

