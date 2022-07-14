const express = require("express");
require("dotenv").config()
const cors = require("cors")
const morganBody = require("morgan-body")
const loggerStream = require("./utils/handleLogger")
const dbConnect = require("./config/mongo")
const {dbConnectMysql} = require("./config/mysql")
const app = express()

const ENGINE_DB = process.env.ENGINE_DB;

app.use(cors())
app.use(express.json())
app.use(express.static("storage"))
const port = process.env.PORT || 3000


morganBody(app, {
    noColors: true,
    stream: loggerStream,
    skip: function(req, res){
        return res.statusCode < 400 // si es menor a 400 lo va a omitir
    }
})




app.use("/api", require("./routes"))

app.listen(port, ()=>{
    console.log(`app lista en el ${port}`)
});

(ENGINE_DB === "nosql") ? dbConnect() : dbConnectMysql();

