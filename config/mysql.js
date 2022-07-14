const {Sequelize} = require("sequelize");

const database = process.env.MYSQL_DATEBASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host,
        dialect:"mysql"
    }
)


const dbConnectMysql = async() =>{
    try {
        await sequelize.authenticate();
        console.log("***** CONEXION CORRECTA MYSQL *****")
    } catch (e) {
        console.log("MYSQL ERROR DE CONEXION", e)
    }
};

module.exports = { sequelize, dbConnectMysql }