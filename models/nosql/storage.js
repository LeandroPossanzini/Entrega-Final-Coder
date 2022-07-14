const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete")
const StoregeSchema = new mongoose.Schema(
    {
        url:{
            type: String
        },
        fileName:{
            type:String
        },
    },
    {
        timestamps: true, //TODO createdAt, updatedAT
        versionKey:false
    }
)
StoregeSchema.plugin(mongooseDelete, {overrideMethods: "all"});
module.exports = mongoose.model("storage", StoregeSchema)