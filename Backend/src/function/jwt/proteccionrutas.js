const jwt=require('jsonwebtoken')
const {secretjwt}=require('../../config/config')
const loginSchema = require('../../database/models/login.model')
const rolSchema=require('../../database/models/roles.model')

const validateToken=async(req,res,next)=>{
    const accessToken=req.headers['authorization'] || req.query.accesstoken

    if (!accessToken) return res.status(404).json({ message: "No hay token" });
  
    try {
      const userverify = jwt.verify(accessToken, secretjwt);
      req.userId = userverify.id;
  
      const user = await loginSchema.findById(req.userId, { password: 0 });
      if (!user) return res.status(404).json({ message: "El usuario no se encuentro" });
  
      next();
    } catch (error) {
      return res.status(401).json({ message: "No tiene autorizacion!" });
    }
}
const verifyIsGestor=async(req,res,next)=>{
  console.log("si esta entrando")
    try {
        const user = await loginSchema.findById(req.userId);
        const roles = await rolSchema.find({ _id: { $in: user.rol } });
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "gestor") {
            next();
            return;
          }
        }
        return res.status(403).json({ message: "Debe tener permiso de Gestor" });
      } catch (error) {
        return res.status(500).send({ message: error });
      }
}
const verifyIsAdmin=async(req,res,next)=>{
    try {
        const user = await loginSchema.findById(req.userId);
        const roles = await rolSchema.find({ _id: { $in: user.rol } });
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
        return res.status(403).json({ message: "Debe tener permiso de admin" });
      } catch (error) {
        return res.status(500).send({ message: error });
      }
}
const verifyIsSuperAdmin=async(req,res,next)=>{
    try {
        const user = await loginSchema.findById(req.userId);
        const roles = await rolSchema.find({ _id: { $in: user.rol } });
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "superadmin") {
            next();
            return;
          }
        }
        return res.status(403).json({ message: "Debe tener permiso de SUPER ADMIN" });
      } catch (error) {
        return res.status(500).send({ message: error });
      }
}
const verifyIsAprendiz=async(req,res,next)=>{
    try {
        const user = await loginSchema.findById(req.userId);
        const roles = await rolSchema.find({ _id: { $in: user.rol } });
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "aprendiz") {
            next();
            return;
          }
        }
        return res.status(403).json({ message: "Debe tener permiso de Aprendiz" });
      } catch (error) {
        return res.status(500).send({ message: error });
      }
}
const verifyIsUser=async(req,res,next)=>{
  try {
      const user = await loginSchema.findById(req.userId);
      const roles = await rolSchema.find({ _id: { $in: user.rol } });
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "user") {
          next();
          return;
        }
      }
      return res.status(403).json({ message: "Debe estar registrado" });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
}
module.exports ={validateToken,verifyIsAdmin,verifyIsUser,verifyIsSuperAdmin,verifyIsGestor,verifyIsAprendiz}