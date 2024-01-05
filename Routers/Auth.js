const express = require("express");
const authController = require("../Controllers/auth");

const router = express.Router();

router.get("/login", authController.getLoginPage);

router.post("/login", authController.postLoginData);

router.post("/logout", authController.logOut);

module.exports = router;
