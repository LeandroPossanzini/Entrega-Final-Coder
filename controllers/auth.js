const {matchedData} = require("express-validator")
const { encryptar, comparar} = require("../utils/handlepassword")
const {usersModels} = require("../models")
const {tokenSing , verifytoken} = require("../utils/handleJwt")
const {handleHttpError} = require("../utils/handleError")
const { compare } = require("bcryptjs")

// con este controlador registro un usuarui
const registerControler = async(req,res) =>{
   try{
        req = matchedData(req)
        const password = await encryptar(req.password)
        // me creo un nuevo objeto body donde le sobreescribo el password
        const body = {...req, password}
        const dataUser = await usersModels.create(body)
        dataUser.set("password", undefined, {strict: false});

        const data = {
            token: await tokenSing(dataUser),
            user: dataUser,

        }
        res.send({data})
   } catch (e){
        handleHttpError(res, "ERROR_REGISTER_USER")
   }
}
//con este controlador lo que hago es verificar si el login es correcto
const loginControler = async (req, res) =>{
    try{
        req = matchedData(req);
        const user = await usersModels.findOne({email:req.email}).select("password name role email")
        if(!user){
            handleHttpError(res, "USER_NOT_EXIST" , 404)
            return
        }
        const hashPassword = user.get("password");
        // este check deberia retornar un true o un false
        const check = await comparar(req.password, hashPassword)
        if(!check){
            handleHttpError(res, "PASSWORD_INVALID" , 401)
            return
        }

        user.set("password", undefined, {strict: false})
        const data = {
            token: await tokenSing(user),
            user
        }
        res.send({data})
    }    
        catch (e){
        console.log(e)
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
}



module.exports = { registerControler , loginControler }