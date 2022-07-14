const {handleHttpError} = require("../utils/handleError")
const {verifytoken} = require("../utils/handleJwt")
const {usersModels} = require ("../models")
const getProperties = require("./handlePropertiesEngine")
const propertiesKey = getProperties()

const authMiddleware = async (req, res, next) =>{
    try{
        if(!req.headers.authorization){
            handleHttpError(res, "NOT_JWT", 401)
            return
        } 
        const token = req.headers.authorization.split(" ").pop();
        const dataToken = await verifytoken(token);

        if(!dataToken){
            handleHttpError(res, "NOT_PAYLOAD_DATA", 401)
            return
        }
        
        const query = {
            [propertiesKey.id]: dataToken[propertiesKey.id]
        }

        // con esta parte verifico quien es el usuario que se esta conectando
        const user = await usersModels.findOne(query)
        req.user = user

        next()

    }catch (e){
        handleHttpError(res, "NOT_SESSION", 401)
    }
}

module.exports = { authMiddleware }