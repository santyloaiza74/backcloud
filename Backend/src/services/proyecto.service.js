const proyectoSchema=require('../database/models/proyecto.model')

class proyectoService{
    constructor(){
        this.model=proyectoSchema
    }
    async get(){
        const proyectos=await this.model.find().populate("ficha")
        return proyectos
    }
    async post(proyecto){
        const proyectos=await this.model.create(proyecto)
        return proyectos
    }
    async getOne(id){
        const proyecto=await this.model.findById(id)
        return proyecto
    }
    async delete(id){
        const proyecto=await this.model.findByIdAndDelete(id)
        return proyecto
    }
    async update(id,values){
        const proyecto=await this.model.findByIdAndUpdate(id,values)
        return proyecto
    }
}
module.exports=proyectoService