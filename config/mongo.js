const mongoose = require("mongoose");

const dbConnect = () =>{
    const DB_URI = process.env.DB_URI;
    mongoose.connect(DB_URI, {}, 
    (err,res) =>{
        if(!err){
            console.log('***** CONEXION CORRECTA MONGO *****')
        }else {
            console.log('***** ERROR DE CONEXION *****')
        }
    }
    );
}

module.exports = dbConnect