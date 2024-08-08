const express = require("express")
const { isLoggedIn } = require("../Middlewares/IsLoggedIn")
const { AddItems, GetRestaurants, ForOurCategories, ForDeliciousDeals, ForPizzaDeal, ForFoodCategories, ReceiveCategories, ForItemsSearching, checkOut } = require("../Controllers/Items.controllers")

const route = express.Router()
route.post("/add-items", isLoggedIn, AddItems)
route.get("/get-restaurants", GetRestaurants)
route.get("/get-items", ForOurCategories)
route.get("/get-burgerDeals", ForDeliciousDeals)
route.get("/get-pizzaDeals", ForPizzaDeal)
route.get("/get-foodCategories", ForFoodCategories)
route.get("/category/:id", ReceiveCategories)
route.get("/search-items", ForItemsSearching)
route.post("/api/create-checkout-session", isLoggedIn,  checkOut)

module.exports = route