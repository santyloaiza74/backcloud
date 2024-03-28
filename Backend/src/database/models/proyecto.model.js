const mongoose= require('mongoose')

const proyectoSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    autores:{
        type: String
    },
    ficha:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ficha'
    }],
    fecha:{
        type:String,
        required: true
    },
    documentacion:{
        type: Array,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    },
    imagenes:{
        type: Array,
        required: true
    },
    video:{
        type: Array
    }
  });
  
const Proyecto = mongoose.model('proyecto', proyectoSchema);

module.exports= Proyecto  