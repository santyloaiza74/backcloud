const role = require('../database/models/roles.model')

const createRoles = async () => {
    try {
        const count = await role.estimatedDocumentCount()
        if (count > 0) return
        const values = await Promise.all([
            new role({ name: 'aprendiz' }).save(),
            new role({ name: 'gestor' }).save(),
            new role({ name: 'admin' }).save(),
            new role({ name: 'superadmin' }).save(),
            new role({name: 'user'}).save()
        ])
        console.log(values)
    } catch (error) {
        console.log(error)
    }
}

module.exports= createRoles