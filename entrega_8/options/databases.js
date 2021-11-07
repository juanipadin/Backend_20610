const optionsMYSQL = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '*',
        database: 'ecommerce'
    },
    pool: { min: 0, max: 7 }
}

const optionsSQLite = {
    client: 'sqlite3',
    connection: { filename: './DB/ecommerce.sqlite' },
    useNullAsDefault : true
}

module.exports = {
    optionsMYSQL,
    optionsSQLite
}