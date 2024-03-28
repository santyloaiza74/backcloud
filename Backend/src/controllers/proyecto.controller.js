const proyectoService=require('../services/proyecto.service')
class proyectoController{
    constructor(){
        this.service=new proyectoService
    }
    async index(){
        const proyecto= await this.service.get()
        return proyecto
    }
    async create(proyecto){
        const proyectos=await this.service.post(proyecto)
        return proyectos
    }
    async getById(id){
        const proyecto=await this.service.getOne(id)
        return proyecto
    }
    async remove(id){
        const proyecto=await this.service.delete(id)
        return proyecto
    }
    async update(id,values){
        const proyecto=await this.service.update(id,values)
        return proyecto
    }
}
module.exports=proyectoController