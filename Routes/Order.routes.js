const express = require("express")
const { isLoggedIn } = require("../Middlewares/IsLoggedIn")
const { orderApi } = require("../Controllers/Order.controller")

const rowte = express.Router()
rowte.post("/order-api",isLoggedIn, orderApi)


module.exports = rowte