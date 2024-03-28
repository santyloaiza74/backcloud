const router = require('express').Router()
const LoginController = require('../controllers/login.controller')
const loginSchema = require('../database/models/login.model')
const rolSchema=require('../database/models/roles.model')
const bcrypt=require('bcrypt')
const controller = new LoginController

router.get('/', async (req, res) => {
    const users = await controller.index()
    res.json({ users })
})

router.post('/register', async (req, res) => {
    const { email, password, nombre,documento,ficha,gestor} = req.body
    const emaildup= await loginSchema.findOne({email: email })
    if(emaildup)return res.status(201).json({message: "El email ya se encuentra registrado"})
    const documentodup = await loginSchema.findOne({documento: documento})
    if(documentodup)return res.status(201).json({message: "El documento ya se encuentra registrado"})
    const role = await rolSchema.findOne({ name: "user" })
    const rolid = [role._id]
    const passwordhash=await bcrypt.hash(password,8)
    const user = new loginSchema({
        email: email,
        password: passwordhash,
        nombre: nombre,
        documento: documento,
        ficha: [ficha],
        gestor: [gestor],
        rol: rolid
    })
    await controller.create(user)
    res.status(201).json({ user })
})
router.get('/:id', async (req, res) => {
    const { id } = req.params
    const user = await controller.getById(id)
    res.json({ user })
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { email, password, nombre, documento, ficha, gestor,rol} = req.body
    const emaildup= await loginSchema.findOne({email: email })
    if(emaildup)return res.status(201).json({message: "El email ya se encuentra registrado"})
    const documentodup = await loginSchema.findOne({documento: documento})
    if(documentodup)return res.status(201).json({message: "El documento ya se encuentra registrado"})
    const values = {}
    if (email) values.email = email
    if (password) values.password = await bcrypt.hash(password,8)
    if (nombre) values.nombre = nombre
    if (documento) values.documento =documento
    if (ficha)values.ficha=[ficha]
    if(gestor)values.gestor=[gestor]
    if(rol){
        const foundRoles = await rolSchema.find({ name: { $in: rol } });
        rol = foundRoles.map((role) => role._id);
        values.rol=rol
    }
    try {
        const user = await controller.update(id, values)
        res.status(200).json({ user })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await controller.remove(id)
        res.status(200).json({ user })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body
        const { accessToken } = await controller.validateUser(email, password)
        res.header('authorization', accessToken).json({ message: 'Usuario autenticado', token: accessToken })
    }
    catch (error) {
        res.status(404).json({message: error.message})
    }
})
module.exports = router