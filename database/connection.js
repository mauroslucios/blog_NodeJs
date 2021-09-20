const mongoose = require('mongoose')
mongoose.connect('mongodb://172.17.0.2:27017/blogapp').then(()=>{
    console.log("Mongodb conectado...")
}).catch((err)=>{
    console.log("Houve um erro ao conectar: "+ err)
})
mongoose.Promise = global.Promise;
module.exports = mongoose