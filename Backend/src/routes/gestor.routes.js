const router = require('express').Router()
const gestorController = require('../controllers/gestor.controller')
const gestorSchema = require('../database/models/gestor.model')
const controller = new gestorController

router.get('/', async (req, res) => {
    const gestors = await controller.index()
    res.json({ gestors })
})

router.post('/', async (req, res) => {
    const {nombre,documento,celular,correo,ficha} = req.body
    const gestor = new gestorSchema({
        nombre:nombre,
        documento:documento,
        celular:celular,
        correo:correo,
        ficha:[ficha]
    })
    await controller.create(gestor)
    res.status(201).json({ gestor })
})
router.get('/:id', async (req, res) => {
    const { id } = req.params
    const gestor = await controller.getById(id)
    res.json({ gestor })
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const {nombre,documento,celular,correo} = req.body
    const values = {}
    if (nombre) values.nombre = nombre
    if (documento) values.documento = documento
    if (celular) values.celular = celular
    if(correo) values.correo=correo
    try {
        const gestor = await controller.update(id, values)
        res.status(200).json({ gestor })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const gestor = await controller.remove(id)
        res.status(200).json({ gestor })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})
module.exports = router