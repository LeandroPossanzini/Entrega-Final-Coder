const express = require("express");
require("dotenv").config()
const cors = require("cors")
const dbConnect = require("./config/mongo")
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("storage"))
const port = process.env.PORT || 3000

app.use("/api", require("./routes"))

app.listen(port, ()=>{
    console.log(`app lista en el ${port}`)
})

dbConnect()