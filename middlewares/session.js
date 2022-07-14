const {handleHttpError} = require("../utils/handleError")
const {verifytoken} = require("../utils/handleJwt")
const {usersModels} = require ("../models")

const authMiddleware = async (req, res, next) =>{
    try{
        if(!req.headers.authorization){
            handleHttpError(res, "NOT_JWT", 401)
            return
        } 
        const token = req.headers.authorization.split(" ").pop();
        const dataToken = await verifytoken(token);

        if(!dataToken._id){
            handleHttpError(res, "ERROR_ID_TOKEN", 401)
            return
        }
        // con esta parte verifico quien es el usuario que se esta conectando
        const user = await usersModels.findById(dataToken._id)
        req.user = user

        next()

    }catch (e){
        handleHttpError(res, "NOT_SESSION", 401)
    }
}

module.exports = { authMiddleware }