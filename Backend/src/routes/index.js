const {Router} = require('express')
const loginRouter=require('./login.routes')
const fichaRouter=require('./ficha.routes')
const gestorRouter=require('./gestor.routes')
const proyectoRouter=require('./proyecto.routes')
const {validateToken}=require('../function/jwt/proteccionrutas')
function routerApi(app){
    const router = Router()

    app.use('/api/v1',router)
    router.use('/login',loginRouter)
    router.use('/ficha',fichaRouter)
    router.use('/gestor',gestorRouter)
    router.use('/proyecto',proyectoRouter)
    app.use('/login',loginRouter)
}

module.exports = routerApi