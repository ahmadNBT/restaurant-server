const express = require("express")
const { Register, GetRestaurant, GetPopularRestaurants, GetLogos, AllRestaurants, Single_popularRestaurant, Get_for_own_Restaurant, ForLocationDropdown, ReceiveLocation } = require("../Controllers/Restaurant.controllers")
const {isLoggedIn} = require("../Middlewares/IsLoggedIn")

const routers = express.Router()
routers.post("/register", isLoggedIn, Register)
routers.get("/get-restaurants", GetRestaurant)
routers.get("/get-logos", GetLogos)
routers.get("/popular-restaurants", GetPopularRestaurants)
routers.get("/all-restaurants", AllRestaurants)
routers.get("/single_popular_restaurant/:id", Single_popularRestaurant)
routers.get("/get-forown-restaurant", isLoggedIn, Get_for_own_Restaurant)
routers.get("/for-location-dropdown",  ForLocationDropdown)
// routers.get("/location/:city",  ForLocation)
routers.get("/get-location/:city",  ReceiveLocation)

module.exports = routers