const ENGINE_DB = process.env.ENGINE_DB;

const pathModels = (ENGINE_DB === "nosql") ? './nosql' : './mysql'


const models = {
    usersModels: require(`${pathModels}/users`),
    tracksModels: require(`${pathModels}/tracks`),
    storageModels: require(`${pathModels}/storage`),
}

module.exports = models