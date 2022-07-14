const fs = require ("fs")
const { matchedData } = require("express-validator");
const {storageModels} = require("../models");
const {handleHttpError} = require("../utils/handleError")

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

const getItems = async (req,res) =>{
    try{
        const data = await storageModels.find({})
        res.send({data})
    } catch(e) {
        handleHttpError(res, "ERROR_GET_ITEMS")
    }
};
const getItem = async (req,res) =>{
    try{
        const {id} = matchedData(req)
        const data = await storageModels.findById(id)
        res.send({data})
    } catch(e) {
        handleHttpError(res, "ERROR_GET_ITEM")
    }
};
const createItem = async (req,res) =>{
    try{
        const { body , file  } = req
        const filedata = {
        fileName : file.filename,
        url : `${PUBLIC_URL}/${file.filename}`
    }
    const data = await storageModels.create(filedata)
    res.send({data})

    } catch (e){
        handleHttpError(res, "ERROR_CREATE_ITEM")
    }
}
const deleteItem = async (req,res) =>{
    try{
        const {id} = matchedData(req)
        const dataFile = await storageModels.findById(id);
        await storageModels.deleteOne(id);
        const {fileName} = dataFile;
        const filePath = `${MEDIA_PATH}/${fileName}`
        fs.unlinkSync(filePath);
        const data = {
            filePath,
            deleted: 1,
        }
        res.send({data})
    } catch(e) {
        handleHttpError(res, "ERROR_DELETE_ITEM")
    }
};

module.exports = {getItems, getItem, createItem, deleteItem};