const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  toggleSaveProject,
  getSavedProjects,
} = require("../controllers/save.controller");

router.post("/save/:projectId", authMiddleware, toggleSaveProject);

router.get("/saved", authMiddleware, getSavedProjects);

module.exports = router;