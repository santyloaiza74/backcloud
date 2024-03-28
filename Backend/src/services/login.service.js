const loginSchema=require('../database/models/login.model')

class LoginService{
    constructor(){
        this.model = loginSchema
    }

    async get(){
        const users= await this.model.find().populate("rol").populate("ficha").populate("gestor")
        return users
    }

    async post(login){
        const user= await this.model.create(login)
        return user
    }

    async getOne(id){
        const user= await this.model.findById(id).populate("rol").populate("ficha").populate("gestor")
        return user
    }

    async delete(id){
        const user= await this.model.findByIdAndDelete(id)
        return user
    }

    async update(id,values){
        const user= await this.model.findOneAndUpdate(id,values)
        return user
    }
    async validateUser(email){
        const user= await this.model.findOne({email})
        return user
    }
}

module.exports= LoginService