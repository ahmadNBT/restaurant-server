const { default: mongoose, mongo } = require("mongoose");
const { type } = require("os");

const ItemsSchema = mongoose.Schema({
    item_name: {
        type: String
    },
    item_category: {
        type: String
    },
    item_detail: {
        type: String
    },
    item_image: {
        type: String
    },
    item_lessprice:{
        type: String
    },
    item_fullprice:{
        type: String
    },
    restaurantId:{
        type: mongoose.Schema.ObjectId,
        ref: "Restaurant"
    }
    
})

module.exports = mongoose.model("Item", ItemsSchema)