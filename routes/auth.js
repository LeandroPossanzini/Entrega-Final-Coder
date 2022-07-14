const express = require("express")
const router = express.Router()
const { validatorRegister, validatorLogin} = require("../validators/auth")
const { registerControler, loginControler } = require("../controllers/auth")

router.post("/register", validatorRegister , registerControler);
router.post("/login", validatorLogin , loginControler);

module.exports = router