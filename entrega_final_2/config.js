const options = {
    mongodb: {
        host: 'mongodb://localhost:27017/ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    file: {
        path: './data'
    },
    firestore:{

    }
}

module.exports = options;

