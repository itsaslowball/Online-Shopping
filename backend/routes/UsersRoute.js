const express = require("express");
const { authController,
    getUserProfile,
    registerUser,
    updateUserProfile
} = require("../controllers/usersController");
// const User = require("../models/UserModel");
// const asyncHandler = require("express-async-handler");
const {protect}  = require('../middlewares/authMiddleware')

const router = express.Router();

//User registration
router.route('/').post(registerUser);


router.route("/login").post(authController);

//get user profile Private Route
router.route('/profile').
    get(protect, getUserProfile).
    put(protect, updateUserProfile)


module.exports = router;
