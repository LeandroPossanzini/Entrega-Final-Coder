const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middlewares/session")
const checkRol = require("../middlewares/rol")
const {validatorCreateItem, validatorGetItem } = require("../validators/tracks")
const { getItem, getItems, createItem, updateItem, deleteItem } = require("../controllers/tracks");


router.get("/", authMiddleware, getItems);
router.get("/:id", authMiddleware, validatorGetItem, getItem);
router.post("/", authMiddleware, checkRol(["user","admin"]) ,validatorCreateItem, createItem);
router.put("/:id", authMiddleware, validatorGetItem, validatorCreateItem, updateItem);
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem);

module.exports = router