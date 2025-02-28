const express = require("express");
const router = express.Router();
const { login, register } = require("./controllers");
const { validateRegister, validateLogin } = require("./validators");

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

module.exports = router;
