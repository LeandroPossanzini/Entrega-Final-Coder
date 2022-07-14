const express = require("express");
const router = express.Router();
const fs = require("fs")

const PATH_ROUTES = __dirname; // aca obtengo la ruta absoluta

const removeExtension = (fileName) =>{
    return fileName.split(".").shift() 
    //loque hace shift es agarrar el primer valor
}

fs.readdirSync(PATH_ROUTES).filter((file) =>{
    const name = removeExtension(file)
    if (name !== "index"){
        router.use(`/${name}`, require(`./${file}`))
    }
})

module.exports = router