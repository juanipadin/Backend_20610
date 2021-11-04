const { options } = require ('../options/sqlite');

const knex = require('knex')(options);

knex.schema.createTable('messages', (table) =>{
    table.string('email');
    table.string('texto')
    table.string('fechaHora');
})

    .then(() => console.log('Table created'))
    .catch((error) => { console.error(error); throw error;})
    .finally (()=> knex.destroy())