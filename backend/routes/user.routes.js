const express = require("express");
const router = express.Router();

const {getUserProfile, getAllUsers, toggleFollow, getFollowers, getFollowing} = require("../controllers/userController");
const authMiddleware = require("../middleware/auth.middleware");
const { optionalAuth } = require("../middleware/auth.middleware");


router.get("/:username" , optionalAuth, getUserProfile);
router.get("/" ,authMiddleware, getAllUsers);

router.post("/:username/follow", authMiddleware, toggleFollow);
router.get("/:username/followers", getFollowers);
router.get("/:username/following", getFollowing);


module.exports = router;
