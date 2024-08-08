const { default: mongoose, mongo } = require("mongoose");
const { type } = require("os");

const RestaurantSchema = mongoose.Schema({
    restaurant_name: {
        type: String
    },
    city:{
        type: String
    },
    restaurant_category: {
        type: String
    },
    restaurant_info: {
        type: String
    },
    restaurant_image: {
        type: String
    },
    restaurant_logo:{
        type: String
    },
    locat:{
        type: String
    },
    timing: {
        type: String
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    items: {
        type: [mongoose.Schema.ObjectId],
        ref: "Item"
    }
})

module.exports = mongoose.model("Restaurant", RestaurantSchema)