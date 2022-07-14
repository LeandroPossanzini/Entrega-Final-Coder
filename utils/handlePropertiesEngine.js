const ENGINE_DB = process.env.ENGINE_DB;

const getProperties = () =>{
    const data = {
        nosql:{
            id:"_id"
        },
        mysql:{
            id:"id"
        }
    }
    // aca es desesctructurar lo que llega ["mysql"] o ["nosql"]
    return data[ENGINE_DB] 
}

module.exports = getProperties