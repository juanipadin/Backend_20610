import mongoose from 'mongoose';

const main = async() =>{
    try {
        const URL = 'mongodb://localhost:27017/ecommerce';
        await mongoose.connect(URL,{
            useNewUrlParser : true,
            useUnifiedTopology : true
        })
        console.log('Base de datos conectada')
    } catch (error) {
        console.error('DB Error')
    }
}

module.exports = main
