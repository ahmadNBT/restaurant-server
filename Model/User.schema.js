const { default: mongoose, mongo } = require("mongoose");
const { type } = require("os");

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    restaurant: {
        type: mongoose.Schema.ObjectId,
        ref: "Restaurant"
    }
})

module.exports = mongoose.model("User", UserSchema)