const { pipeline } = require("nodemailer/lib/xoauth2");
const ItemsSchema = require("../Model/Items.schema");
const RestaurantSchema = require("../Model/Restaurant.schema");
const UserSchema = require("../Model/User.schema");
const mongoose = require('mongoose');


const Register = async (req, res) => {

    req.body.userId = req.user._id
    var response = await RestaurantSchema.create(req.body)

    var resps = await UserSchema.findOne({ _id: req.user._id })
    // console.log(resps);
    resps.restaurant = response._id
    resps.save()

    res.send({ message: "Sucessfully Created!", success: true, response })
}

const GetRestaurant = async (req, res) => {
    var response = await RestaurantSchema.aggregate([

        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userId"
            }
        },
        {
            $unwind: "$userId"
        },

    ])
}

const GetLogos = async (req, res)=>{
    var response = await RestaurantSchema.find({restaurant_category: "Popular"})
    res.send(response)
}

const GetPopularRestaurants = async (req, res) => {
 
    var response = await RestaurantSchema.aggregate([
        { 
            $match: { restaurant_category: "Popular" }
        },
        {
            $lookup: {
                from: "items",
                localField: "items",
                foreignField: "_id",
                as: "items"
            }
        }
    ]);
    res.send(response)
}

const AllRestaurants = async(req, res)=>{

    var response = await RestaurantSchema.aggregate([
        { 
            $match: { }
        },
        {
            $lookup: {
                from: "items",
                localField: "items",
                foreignField: "_id",
                as: "items"
            }
        }
    ]);
    res.send(response)
}

const Single_popularRestaurant = async (req, res)=>{
    var response = await RestaurantSchema.aggregate([
        { 
            $match: { _id: new mongoose.Types.ObjectId(req.params.id) }
        },
        {
            $lookup: {
                from: "items",
                localField: "items",
                foreignField: "_id",
                as: "items"
            }
        },
        {
            $limit: 1
        },

    ]);

    res.send(response[0])
}

const Get_for_own_Restaurant = async (req, res)=>{
    var response = await UserSchema.findOne({ _id: req.user._id })

    var response2 = await RestaurantSchema.aggregate([
        { 
            $match: {userId: response._id }
        },
        {
            $lookup: {
                from: "items",
                localField: "items",
                foreignField: "_id",
                as: "items"
            }
        }
    ]);
    res.send(response2[0])
}

const ForLocationDropdown = async (req, res)=>{
    var response = await RestaurantSchema.find()
    res.send(response)
}

const ReceiveLocation = async (req, res) => {

    var response = await RestaurantSchema.aggregate([
        {
            $match: {city : req.params.city }
        },
        {
            $lookup: {
                from: "items",
                localField: "items",
                foreignField: "_id",
                as: "items",
            }
        },
        
    ])

    res.send(response)
}

module.exports = { Register, GetRestaurant, GetLogos, GetPopularRestaurants, AllRestaurants, Single_popularRestaurant, Get_for_own_Restaurant, ForLocationDropdown, ReceiveLocation }