const fs = require('fs')

const { options } = require('../options/sqlite');
const knex = require('knex')(options)

class Mensajes{
        constructor (nombreArchivo){
        this.nombreArchivo = nombreArchivo
    }

    async saveMessages(newMessage){
        const listaDeMensajes = []
        listaDeMensajes.push(newMessage)
        console.log(listaDeMensajes)

        await knex('messages').insert(listaDeMensajes)
        .then(() => console.log('data inserted'))
        .catch((error) => { console.error(error); throw error; })
        .finally(() => knex.destroy());
        
        /*
        const contenido = await fs.promises.readFile(`./${this.nombreArchivo}`,'utf-8')
        let mensajes = []
        const listaDeMensajes = JSON.parse(contenido);
        listaDeMensajes.push(newMessage);
        mensajes = listaDeMensajes
        const mensajeString = JSON.stringify(mensajes, null, 2)
        await fs.promises.writeFile(`./${this.nombreArchivo}`, mensajeString);  */
    }

    async getMessagess (){

        knex.from('messages').select('*')
        .then((rows) => {
            return rows})

        .catch((error) => { console.error(error); throw error; })
        .finally(() => knex.destroy());

/*
        const contenido = await fs.promises.readFile(`./${this.nombreArchivo}`,'utf-8');
        const listaDeMensajes = JSON.parse(contenido);
        console.log(listaDeMensajes)
        return listaDeMensajes 
    };*/
}}

module.exports = Mensajes