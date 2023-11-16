const express = require("express");
const authRoute = express.Router();
const authController = require("../controllers/auth.controller");

authRoute.post("/login", authController.login);
authRoute.post("/logout", authController.logout);

module.exports = authRoute;
