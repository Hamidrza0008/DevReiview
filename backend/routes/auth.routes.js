const express = require("express");
const router = express.Router();

const { signUp, verifyOTP, login, forgotPassword, resetPassword } = require("../controllers/auth.controller");

router.post("/signup", signUp);

router.post("/verify-otp", verifyOTP);

router.post("/login", login);

router.post("/forgot-password" , forgotPassword);

router.post("/reset-password" , resetPassword);

module.exports = router;