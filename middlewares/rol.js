const { handleHttpError } = require("../utils/handleError");

// Array con los roles permitidos
const checkRol = (rol) =>(res, req, next) =>{
    try{
        const {user} = req;
        next()
    }catch (e){
        handleHttpError(res, "ROL_NO_PERMITIDO")
    }
}

module.exports = checkRol;