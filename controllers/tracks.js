const {tracksModels} = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator")

const getItems = async (req,res) =>{
    try{
        const user = req.user
        const data = await tracksModels.find({})
        res.send({data, user})
    }catch (e){
        handleHttpError(res, "ERROR_GET_ITEMS")
    }

};
const getItem = async (req,res) =>{
    try{
        req = matchedData(req)
        const { id } = req;
        const data = await tracksModels.findById(id)
        res.send({data})
    }catch (e){
        handleHttpError(res, "ERROR_GET_ITEM")
    }
};
const createItem = async (req,res) =>{
    try{
        const body = matchedData(req);
        const data = await tracksModels.create(body)
        res.send({data}); 
    }catch (e){
        handleHttpError(res, "ERROR_CREATE_ITEM", 504)
    }
}
const updateItem = async (req,res) =>{
    try{
        const { id , ...body } = matchedData(req);
        const data = await tracksModels.findOneAndUpdate(
            id, body
        );
        res.send({data}); 
    }catch (e){
        handleHttpError(res, "ERROR_UPDATE_ITEM", 504)
    }
};
const deleteItem = async (req,res) =>{
    try{
        req = matchedData(req);
        const { id } = req;
        // delete o deleteOne si uso moongose solo
        const data = await tracksModels.delete({_id:id});
        res.send({data});
    }catch(e){
        handleHttpError(res, "ERROR_DELETE_ITEM")
    }
};

module.exports = {getItems, getItem, createItem, updateItem, deleteItem};