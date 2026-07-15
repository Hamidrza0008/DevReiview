const express = require("express");
const { getProjectByUsername } = require("../controllers/projectController.js");
const authMiddleware = require("../middleware/auth.middleware.js");
const router = express.Router();

router.get("/:username" , authMiddleware,getProjectByUsername);

module.exports = router