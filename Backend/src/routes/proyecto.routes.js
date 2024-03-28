const router = require('express').Router()
const proyectoController = require('../controllers/proyecto.controller')
const proyectoSchema = require('../database/models/proyecto.model')
const multer = require('multer')
const fs = require('node:fs')
const path = require('path')
const controller = new proyectoController
const publicDir = path.resolve(__dirname, '../../public');

const storage = multer.diskStorage({
    destination:'./public',
    filename: (req, file, cb) => {
        const originalFilename = file.originalname;
        const extension = path.extname(originalFilename);
        const filename = `${Date.now()}${extension}`;
        cb(null, filename);
    }
});


const upload = multer({ storage })

router.get('/', async (req, res) => {
    const proyectos = await controller.index()
    res.json({ proyectos })
})

router.post('/', upload.array('files', 5), async (req, res) => {
    const { projectName, autores, ficha, fecha, descripcion } = req.body
    const qwe = []
    const asd = []
    const zxc = []
    const img = []
    const doc = []
    const video = []
    let a = ''
    let b = ''
    let c = ''
    let rut1 = ''
    let rut2 = ''
    let rut3 = ''
    const files = fs.readdirSync('./public/');

    // Recorrer cada archivo
    req.files.forEach(file => {
        // Obtener la extensión del archivo
        const ext = path.extname(file.originalname);

        // Mover el archivo a la carpeta según su extensión
        if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
            fs.renameSync(path.join(publicDir, file.filename), path.join(publicDir, '/Img', file.filename));
            a = `http://localhost:3300/Img/${file.filename}`
            rut1 = `${publicDir}/Img/${file.filename}`
            img.push(a)
            qwe.push(rut1)
        } else if (ext === '.mp4') {
            fs.renameSync(path.join(publicDir, file.filename), path.join(publicDir, '/Video', file.filename));
            b = `http://localhost:3300/Video/${file.filename}`
            rut2 = `${publicDir}/Video/${file.filename}`
            video.push(b)
            asd.push(rut2)
        } else if (ext === '.pdf' || ext === '.docx') {
            fs.renameSync(path.join(publicDir, file.filename), path.join(publicDir, '/Doc', file.filename));
            c = `http://localhost:3300/Doc/${file.filename}`
            rut3 = `${publicDir}/Doc/${file.filename}`
            doc.push(c)
            zxc.push(rut3)
        }
    });
    //Verificar si se subieron archivos
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No se subieron archivos.');
    }
    let nombredup = await proyectoSchema.findOne({ nombre: projectName.toUpperCase() });
    if (nombredup) {
        img.length = 0
        video.length = 0
        doc.length = 0
        qwe.forEach(element => {
            fs.unlink(element, errors => {
                if (errors) throw errors
                console.log('Archivos eliminados')
            })
        });
        asd.forEach(element => {
            fs.unlink(element, errors => {
                if (errors) throw errors
                console.log('Archivos eliminados')
            })
        });
        zxc.forEach(element => {
            fs.unlink(element, errors => {
                if (errors) throw errors
                console.log('Archivos eliminados')
            })
        });
        qwe.length=0
        asd.length=0
        zxc.length=0
        return res.status(400).json({ message: "El nombre ya se encuentra registrado" })
    }
    else {
    const fecha1 = new Date(fecha);

    const fechaInicioFormatoString = fecha1.toISOString().substring(0, 10);
        const proyecto = new proyectoSchema({
            nombre: projectName.toUpperCase(),
            autores: autores,
            ficha: [ficha],
            fecha: fechaInicioFormatoString,
            descripcion: descripcion,
            documentacion: doc,
            imagenes: img,
            video: video
        })
        await controller.create(proyecto)
        img.length = 0
        video.length = 0
        doc.length = 0
        res.status(201).json({ proyecto, message: "Archivos subidos exitosamente." })
    }
})
router.get('/:id', async (req, res) => {
    const { id } = req.params
    const proyecto = await controller.getById(id)
    res.json({ proyecto })
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { projectName, autores, ficha, fecha, descripcion } = req.body
    const values = {}
    const nombredup = await proyectoSchema.findOne({ nombre: projectName.toUpperCase() });
    if (nombredup) {
        return res.status(400).json({ message: "El nombre ya se encuentra registrado" })
    }
    if (projectName) values.projectName = projectName.toUpperCase()
    if (autores) values.autores = autores
    if (ficha) values.idficha = ficha
    if (fecha) values.fecha = fecha
    if (descripcion) values.descripcion = descripcion
    try {
        const proyecto = await controller.update(id, values)
        res.status(200).json({ proyecto })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const proyecto = await controller.remove(id)
        res.status(200).json({ proyecto })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})
module.exports = router