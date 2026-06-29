const express = require("express");
const router = express.Router();

const {signUp , verifyOTP , login} = require("../controllers/auth.controller");

router.post("/signup" , signUp);

router.post("/verify-otp" , verifyOTP);

router.post("/login" , login);

module.exports = router;