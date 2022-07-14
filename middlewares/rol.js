const { handleHttpError } = require("../utils/handleError");

// Array con los roles permitidos ["user", "admin", "manager"] 3 tipos
const checkRol = (roles) =>(req, res, next) =>{
    try{
        const { user } = req;
        const rolesByUser = user.role;  // todo usuario que se registra obtiene ["user"]
        
        // ME responde con un true o false y comparo si dentro del array tengo los permisos
        const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle))
        if(!checkValueRol){
            handleHttpError(res, "USER_NOT_PERMISSIONS", 403)
            return 
        }
        next()
    }catch (e){
        handleHttpError(res, "ERROR_PERMISSIONS", 403)
    }
}

module.exports = checkRol;