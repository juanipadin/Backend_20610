const options = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'martelli',
        database: 'ecommerce'
    },
    pool: { min: 0, max: 7 }
}

module.exports = {
    options
}