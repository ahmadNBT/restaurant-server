const express = require("express")
const { SignUp, LogIn, ChangePassWord, forgetPassword, UpdatePassWord} = require("../Controllers/User.controllers")
const { isLoggedIn } = require("../Middlewares/IsLoggedIn")

const router = express.Router()
router.post("/signup", SignUp)
router.post("/login", LogIn)
router.post("/change-password",isLoggedIn, ChangePassWord)
router.post("/forget-password", forgetPassword)
router.post("/update-password", isLoggedIn, UpdatePassWord)


module.exports = router