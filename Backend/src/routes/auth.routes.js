const express = require("express");
const authControllers = require("../controllers/auth.controllers");
const router = express.Router();
const practiceModel = require("../models/practice");

router.post("/register", authControllers.registerUser);

router.post("/login", authControllers.loginUser);

router.get("/user", authControllers.currentUser);

router.post("/logout", authControllers.logoutUser);

module.exports = router;
