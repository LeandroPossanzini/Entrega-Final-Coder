const customHeader = (req, res , next) =>{
    try{
        const apikey = req.headers.api_key
        if(apikey === "leandro01"){
            next()
        } else {
            res.status(403)
            res.send({error: "apiKey no es correcta"})
        }
    } catch (e) {
        res.status(403)
        res.send({error: "Algo ocurrio en el custom Header"})
    }
}

module.exports = customHeader