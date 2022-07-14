const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage")
const {createItem, getItem, getItems, deleteItem} = require("../controllers/storage")

// el validator me valida todo lo que tenga un id como parametro
const {validatorGetItem} = require("../validators/storage")


router.get("/:id", validatorGetItem ,getItem)
router.get("/", getItems)
router.delete("/:id", validatorGetItem , deleteItem)
router.post("/", uploadMiddleware.single("myfile"), createItem)

module.exports = router