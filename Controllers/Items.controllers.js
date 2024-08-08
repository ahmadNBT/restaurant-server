const { pipeline } = require("nodemailer/lib/xoauth2");
const ItemsSchema = require("../Model/Items.schema");
const RestaurantSchema = require("../Model/Restaurant.schema");
const stripe = require("stripe")("sk_test_51PiEnGRwH5w2JVZItl22sXxgYqWzV7g3Wszz1TXNU3FzqYKm6UIS04I3zMJIqmY7ALGIzbPYebtXTg6HwZGwlOKA00ZV1gtIoY")
const nodemailer = require('nodemailer')

const AddItems = async (req, res) => {
    var response = await ItemsSchema.create(req.body)

    var resps = await RestaurantSchema.findOne({ _id: req.body.restaurantId })
    resps.items.push(response._id)
    resps.save()

    res.send({ message: "Sucessfully Created", success: true })
}

const GetRestaurants = async (req, res) => {
    var response = await ItemsSchema.aggregate([

        {
            $lookup: {
                from: "restaurants",
                localField: "restaurantId",
                foreignField: "_id",
                as: "restaurantId"
            }
        },
        {
            $unwind: "$restaurantId"
        },

    ])

}

var array = []

const ForOurCategories = async (req, res) => {

    var AllItems = await ItemsSchema.find()

    var categories = AllItems.map((e, i) => {
        return (
            e.item_category
        )
    })

    var arr = []

    categories.map((e, i) => {
        if (arr.indexOf(e) < 0) {
            arr.push(e)
        }
    })

    var spliceItems = arr.splice(0, 8)

    // For Pizza Items and Restaurants

    var PizzaItems = await ItemsSchema.find({ item_category: spliceItems[0] })
    var PizzaRestaurants = PizzaItems.map((e, i) => e.restaurantId.toString())

    var arr1 = []
    PizzaRestaurants.map((e, i) => {
        if (arr1.indexOf(e) < 0) { arr1.push(e) }
    })

    // For Deals Items and Restaurants

    var DealsItems = await ItemsSchema.find({ item_category: spliceItems[1] })
    var DealsRestaurants = DealsItems.map((e, i) => e.restaurantId.toString())

    var arr2 = []
    DealsRestaurants.map((e, i) => {
        if (arr2.indexOf(e) < 0) { arr2.push(e) }
    })

    // For Sauces Items and Restaurants

    var SaucesItems = await ItemsSchema.find({ item_category: spliceItems[2] })
    var SaucesRestaurants = SaucesItems.map((e, i) => e.restaurantId.toString())

    var arr3 = []
    SaucesRestaurants.map((e, i) => {
        if (arr3.indexOf(e) < 0) { arr3.push(e) }
    })

    // For Specialities Items and Restaurants

    var SpecialitiesItems = await ItemsSchema.find({ item_category: spliceItems[3] })
    var SpecialitiesRestaurants = SpecialitiesItems.map((e, i) => e.restaurantId.toString())

    var arr4 = []
    SpecialitiesRestaurants.map((e, i) => {
        if (arr4.indexOf(e) < 0) { arr4.push(e) }
    })

    // For Calzone Items and Restaurants

    var CalzoneItems = await ItemsSchema.find({ item_category: spliceItems[4] })
    var CalzoneRestaurants = CalzoneItems.map((e, i) => e.restaurantId.toString())

    var arr5 = []
    CalzoneRestaurants.map((e, i) => {
        if (arr5.indexOf(e) < 0) { arr5.push(e) }
    })

    // For NewArrivals Items and Restaurants

    var NewArrivalsItems = await ItemsSchema.find({ item_category: spliceItems[5] })
    var NewArrivalsRestaurants = NewArrivalsItems.map((e, i) => e.restaurantId.toString())

    var arr6 = []
    NewArrivalsRestaurants.map((e, i) => {
        if (arr6.indexOf(e) < 0) { arr6.push(e) }
    })

    // For Pasta Items and Restaurants

    var PastaItems = await ItemsSchema.find({ item_category: spliceItems[6] })
    var PastaRestaurants = PastaItems.map((e, i) => e.restaurantId.toString())

    var arr7 = []
    PastaRestaurants.map((e, i) => {
        if (arr7.indexOf(e) < 0) { arr7.push(e) }
    })

    // For Beverages Items and Restaurants

    var BeveragesItems = await ItemsSchema.find({ item_category: spliceItems[7] })
    var BeveragesRestaurants = BeveragesItems.map((e, i) => e.restaurantId.toString())

    var arr8 = []
    BeveragesRestaurants.map((e, i) => {
        if (arr8.indexOf(e) < 0) { arr8.push(e) }
    })

    const OurCategories = [
        {
            Category_image: "https://png.pngtree.com/png-vector/20230331/ourmid/pngtree-gourmet-pizza-cartoon-png-image_6656160.png",
            Category_name: spliceItems[0],
            Restaurants_length: arr1.length
        },
        {
            Category_image: "https://redswanpizza.ca/img/home/menu-pizza.png",
            Category_name: spliceItems[1],
            Restaurants_length: arr2.length
        },
        {
            Category_image: "https://pngimg.com/d/sauce_PNG90.png",
            Category_name: spliceItems[2],
            Restaurants_length: arr3.length
        },
        {
            Category_image: "https://www.cicis.com/media/tlwfofny/spinach-alfredo-pizza.png",
            Category_name: spliceItems[3],
            Restaurants_length: arr4.length
        },
        {
            Category_image: "https://static.vecteezy.com/system/resources/thumbnails/027/144/451/small_2x/chicken-tikka-on-background-free-png.png",
            Category_name: spliceItems[4],
            Restaurants_length: arr5.length
        },
        {
            Category_image: "https://www.freeiconspng.com/uploads/fast-food-banner-png-0.png",
            Category_name: spliceItems[5],
            Restaurants_length: arr6.length
        },
        {
            Category_image: "https://png.pngtree.com/png-clipart/20210418/original/pngtree-cooking-gourmet-snack-pasta-png-image_6241443.jpg",
            Category_name: spliceItems[6],
            Restaurants_length: arr7.length
        },
        {
            Category_image: "https://wallpapers.com/images/hd/assorted-soft-drinks-collection-0bssdibxr7paa77c.png",
            Category_name: spliceItems[7],
            Restaurants_length: arr8.length
        },
    ]

    res.send(OurCategories)
}

const ForDeliciousDeals = async (req, res) => {

    var BurgersItems = await ItemsSchema.find({ item_category: "Burgers" })
    res.send(BurgersItems)
}

const ForPizzaDeal = async (req, res) => {

    var PizzaItems = await ItemsSchema.find({ item_category: "Pizza" })

    var spliceItems = PizzaItems.splice(0, 6)
    res.send(spliceItems)
}

const ForFoodCategories = async (req, res) => {
    var AllItems = await ItemsSchema.find()

    var categories = AllItems.map((e, i) => {
        return (
            e.item_category
        )
    })

    var arr = []

    categories.map((e, i) => {
        if (arr.indexOf(e) < 0) {
            arr.push(e)
        }
    })


    //  For Pizza Items and Restaurants

    var PizzaItems = await ItemsSchema.find({ item_category: arr[0] })
    var PizzaRestaurants = PizzaItems.map((e, i) => e.restaurantId.toString())

    var arr1 = []
    PizzaRestaurants.map((e, i) => {
        if (arr1.indexOf(e) < 0) { arr1.push(e) }
    })

    // For Deals Items and Restaurants

    var DealsItems = await ItemsSchema.find({ item_category: arr[1] })
    var DealsRestaurants = DealsItems.map((e, i) => e.restaurantId.toString())

    var arr2 = []
    DealsRestaurants.map((e, i) => {
        if (arr2.indexOf(e) < 0) { arr2.push(e) }
    })

    // For Sauces Items and Restaurants

    var SaucesItems = await ItemsSchema.find({ item_category: arr[2] })
    var SaucesRestaurants = SaucesItems.map((e, i) => e.restaurantId.toString())

    var arr3 = []
    SaucesRestaurants.map((e, i) => {
        if (arr3.indexOf(e) < 0) { arr3.push(e) }
    })

    // For Specialities Items and Restaurants

    var SpecialitiesItems = await ItemsSchema.find({ item_category: arr[3] })
    var SpecialitiesRestaurants = SpecialitiesItems.map((e, i) => e.restaurantId.toString())

    var arr4 = []
    SpecialitiesRestaurants.map((e, i) => {
        if (arr4.indexOf(e) < 0) { arr4.push(e) }
    })

    // For Calzone Items and Restaurants

    var CalzoneItems = await ItemsSchema.find({ item_category: arr[4] })
    var CalzoneRestaurants = CalzoneItems.map((e, i) => e.restaurantId.toString())

    var arr5 = []
    CalzoneRestaurants.map((e, i) => {
        if (arr5.indexOf(e) < 0) { arr5.push(e) }
    })

    // For NewArrivals Items and Restaurants

    var NewArrivalsItems = await ItemsSchema.find({ item_category: arr[5] })
    var NewArrivalsRestaurants = NewArrivalsItems.map((e, i) => e.restaurantId.toString())

    var arr6 = []
    NewArrivalsRestaurants.map((e, i) => {
        if (arr6.indexOf(e) < 0) { arr6.push(e) }
    })

    // For Pasta Items and Restaurants

    var PastaItems = await ItemsSchema.find({ item_category: arr[6] })
    var PastaRestaurants = PastaItems.map((e, i) => e.restaurantId.toString())

    var arr7 = []
    PastaRestaurants.map((e, i) => {
        if (arr7.indexOf(e) < 0) { arr7.push(e) }
    })

    // For Beverages Items and Restaurants

    var BeveragesItems = await ItemsSchema.find({ item_category: arr[7] })
    var BeveragesRestaurants = BeveragesItems.map((e, i) => e.restaurantId.toString())

    var arr8 = []
    BeveragesRestaurants.map((e, i) => {
        if (arr8.indexOf(e) < 0) { arr8.push(e) }
    })

    // For Rice Items and Restaurants

    var RiceItems = await ItemsSchema.find({ item_category: arr[8] })
    var RiceRestaurants = RiceItems.map((e, i) => e.restaurantId.toString())

    var arr9 = []
    RiceRestaurants.map((e, i) => {
        if (arr9.indexOf(e) < 0) { arr9.push(e) }
    })

    // For Vegeterian Dishes Items and Restaurants

    var VegeterianItems = await ItemsSchema.find({ item_category: arr[9] })
    var VegeterianRestaurants = VegeterianItems.map((e, i) => e.restaurantId.toString())

    var arr10 = []
    VegeterianRestaurants.map((e, i) => {
        if (arr10.indexOf(e) < 0) { arr10.push(e) }
    })

    // For Starters Items and Restaurants

    var StartersItems = await ItemsSchema.find({ item_category: arr[10] })
    var StartersRestaurants = StartersItems.map((e, i) => e.restaurantId.toString())

    var arr11 = []
    StartersRestaurants.map((e, i) => {
        if (arr11.indexOf(e) < 0) { arr11.push(e) }
    })

    // For Shakes Items and Restaurants

    var ShakesItems = await ItemsSchema.find({ item_category: arr[11] })
    var ShakesRestaurants = ShakesItems.map((e, i) => e.restaurantId.toString())

    var arr12 = []
    ShakesRestaurants.map((e, i) => {
        if (arr12.indexOf(e) < 0) { arr12.push(e) }
    })

    // For Nuggets Items and Restaurants

    var NuggetsItems = await ItemsSchema.find({ item_category: arr[12] })
    var NuggetsRestaurants = NuggetsItems.map((e, i) => e.restaurantId.toString())

    var arr13 = []
    NuggetsRestaurants.map((e, i) => {
        if (arr13.indexOf(e) < 0) { arr13.push(e) }
    })

    // For Pratha Items and Restaurants

    var PrathaItems = await ItemsSchema.find({ item_category: arr[13] })
    var PrathaRestaurants = PrathaItems.map((e, i) => e.restaurantId.toString())

    var arr14 = []
    PrathaRestaurants.map((e, i) => {
        if (arr14.indexOf(e) < 0) { arr14.push(e) }
    })

    // For Burgers Items and Restaurants

    var BurgersItems = await ItemsSchema.find({ item_category: arr[14] })
    var BurgersRestaurants = BurgersItems.map((e, i) => e.restaurantId.toString())

    var arr15 = []
    BurgersRestaurants.map((e, i) => {
        if (arr15.indexOf(e) < 0) { arr15.push(e) }
    })

    // For Bbq Items and Restaurants

    var BbqItems = await ItemsSchema.find({ item_category: arr[15] })
    var BbqRestaurants = BbqItems.map((e, i) => e.restaurantId.toString())

    var arr16 = []
    BbqRestaurants.map((e, i) => {
        if (arr16.indexOf(e) < 0) { arr16.push(e) }
    })

    // For Continental Items and Restaurants

    var ContinentalItems = await ItemsSchema.find({ item_category: arr[16] })
    var ContinentalRestaurants = ContinentalItems.map((e, i) => e.restaurantId.toString())

    var arr17 = []
    ContinentalRestaurants.map((e, i) => {
        if (arr17.indexOf(e) < 0) { arr17.push(e) }
    })

    // For Karahi Items and Restaurants

    var KarahiItems = await ItemsSchema.find({ item_category: arr[17] })
    var KarahiRestaurants = KarahiItems.map((e, i) => e.restaurantId.toString())

    var arr18 = []
    KarahiRestaurants.map((e, i) => {
        if (arr18.indexOf(e) < 0) { arr18.push(e) }
    })

    // For Appetizers Items and Restaurants

    var AppetizersItems = await ItemsSchema.find({ item_category: arr[18] })
    var AppetizersRestaurants = AppetizersItems.map((e, i) => e.restaurantId.toString())

    var arr19 = []
    AppetizersRestaurants.map((e, i) => {
        if (arr19.indexOf(e) < 0) { arr19.push(e) }
    })

    // For CasaDeals Items and Restaurants

    var CasaDealsItems = await ItemsSchema.find({ item_category: arr[19] })
    var CasaDealsRestaurants = CasaDealsItems.map((e, i) => e.restaurantId.toString())

    var arr20 = []
    CasaDealsRestaurants.map((e, i) => {
        if (arr20.indexOf(e) < 0) { arr20.push(e) }
    })

    // For Salads Items and Restaurants

    var SaladsItems = await ItemsSchema.find({ item_category: arr[20] })
    var SaladsRestaurants = SaladsItems.map((e, i) => e.restaurantId.toString())

    var arr21 = []
    SaladsRestaurants.map((e, i) => {
        if (arr21.indexOf(e) < 0) { arr21.push(e) }
    })

    // For Desserts Items and Restaurants

    var DessertsItems = await ItemsSchema.find({ item_category: arr[21] })
    var DessertsRestaurants = DessertsItems.map((e, i) => e.restaurantId.toString())

    var arr22 = []
    DessertsRestaurants.map((e, i) => {
        if (arr22.indexOf(e) < 0) { arr22.push(e) }
    })

    // For hotDrinks Items and Restaurants

    var hotDrinksItems = await ItemsSchema.find({ item_category: arr[22] })
    var hotDrinksRestaurants = hotDrinksItems.map((e, i) => e.restaurantId.toString())

    var arr23 = []
    hotDrinksRestaurants.map((e, i) => {
        if (arr23.indexOf(e) < 0) { arr23.push(e) }
    })

    // For happyMeal Items and Restaurants

    var happyMealItems = await ItemsSchema.find({ item_category: arr[23] })
    var happyMealRestaurants = happyMealItems.map((e, i) => e.restaurantId.toString())

    var arr24 = []
    happyMealRestaurants.map((e, i) => {
        if (arr24.indexOf(e) < 0) { arr24.push(e) }
    })

    // For Breakfast Items and Restaurants

    var BreakfastItems = await ItemsSchema.find({ item_category: arr[24] })
    var BreakfastRestaurants = BreakfastItems.map((e, i) => e.restaurantId.toString())

    var arr25 = []
    BreakfastRestaurants.map((e, i) => {
        if (arr25.indexOf(e) < 0) { arr25.push(e) }
    })

    /////////////////////////////////////

    const FoodCategories = [
        {
            Category_name: arr[0],
            Restaurants_length: arr1.length
        },
        {
            Category_name: arr[1],
            Restaurants_length: arr2.length
        },
        {
            Category_name: arr[2],
            Restaurants_length: arr3.length
        },
        {
            Category_name: arr[3],
            Restaurants_length: arr4.length
        },
        {
            Category_name: arr[5],
            Restaurants_length: arr6.length
        },
        {
            Category_name: arr[6],
            Restaurants_length: arr7.length
        },
        {
            Category_name: arr[7],
            Restaurants_length: arr8.length
        },
        {
            Category_name: arr[8],
            Restaurants_length: arr9.length
        },
        {
            Category_name: arr[9],
            Restaurants_length: arr10.length
        },
        {
            Category_name: arr[10],
            Restaurants_length: arr11.length
        },
        {
            Category_name: arr[11],
            Restaurants_length: arr12.length
        },
        {
            Category_name: arr[12],
            Restaurants_length: arr13.length
        },
        {
            Category_name: arr[13],
            Restaurants_length: arr14.length
        },
        {
            Category_name: arr[14],
            Restaurants_length: arr15.length
        },
        {
            Category_name: arr[15],
            Restaurants_length: arr16.length
        },
        {
            Category_name: arr[16],
            Restaurants_length: arr17.length
        },
        {
            Category_name: arr[17],
            Restaurants_length: arr18.length
        },
        {
            Category_name: arr[18],
            Restaurants_length: arr19.length
        },
        {
            Category_name: arr[19],
            Restaurants_length: arr20.length
        },
        {
            Category_name: arr[20],
            Restaurants_length: arr21.length
        },
        {
            Category_name: arr[21],
            Restaurants_length: arr22.length
        },
        {
            Category_name: arr[22],
            Restaurants_length: arr23.length
        },
        {
            Category_name: arr[23],
            Restaurants_length: arr24.length
        },
        {
            Category_name: arr[24],
            Restaurants_length: arr25.length
        },
    ]

    res.send(FoodCategories)
}

const ReceiveCategories = async (req, res) => {
    var response = await ItemsSchema.aggregate([
        {
            $match: { item_category: req.params.id }
        },
        {
            $lookup: {
                from: "restaurants",
                localField: "restaurantId",
                foreignField: "_id",
                as: "restaurantId",
                pipeline: [
                    {
                        $lookup: {
                            from: "items",
                            localField: "items",
                            foreignField: "_id",
                            as: "items"
                        }
                    }
                ]
            }
        },
        {
            $unwind: "$restaurantId"
        },
        {
            $project: {
                _id: 0, // exclude the _id field if you don't want it in the result
                restaurantId: "$restaurantId"
            },
        },

    ])

    var arr = []

    response.map((e, i) => {
        var exist = arr.find((ele, idx) => {
            return ele.restaurant_name == e.restaurantId.restaurant_name
        })

        if (!exist) {
            arr.push(e.restaurantId)
        }


    })

    res.send(arr)
}

const ForItemsSearching = async (req, res) => {

    var AllItems = await ItemsSchema.find()

    res.send(AllItems)
}


const checkOut = async (req, res) => {
    try {
        const { products } = req.body;

        const lineItems = products.map((product) => {

            const unitAmount = product.item_lessprice * 100;
            if (isNaN(unitAmount)) {
                throw new Error(`Invalid totalPrice for product: ${product.item_name}`);
            }
            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: product.item_name,
                        images: [product.item_image],
                    },
                    unit_amount: unitAmount,
                },
                quantity: product.qnty,
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error(error);
        res.status(400).send({ error: error.message });
    }
    ///////////////////////////////////////

   
};


module.exports = { AddItems, GetRestaurants, ForOurCategories, ForDeliciousDeals, ForPizzaDeal, ForFoodCategories, ReceiveCategories, ForItemsSearching, checkOut }