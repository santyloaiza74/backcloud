const mongoose= require('mongoose')

const gestorSchema = new mongoose.Schema({
    nombre:{
        type: String
    },
    documento:{
        type: String
    },
    celular:{
        type: String
    },
    correo:{
        type: String
    },
    ficha:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ficha'
    }]
  });
  
const Gestor = mongoose.model('gestor', gestorSchema);

module.exports= Gestor