const express = require("express")
const cors = require("cors")
const { default: mongoose } = require("mongoose")
const router = require("./Routes/User.routes")
const routers = require("./Routes/Restaurant.routes")
const route = require("../Backend/Routes/Items.routes")
const rowte = require("../Backend/Routes/Order.routes")
const dotenv = require("dotenv")

const app = express()

dotenv.config({path: "./.env"})
app.use(cors())
app.use(express.json())
app.use("/", router)
app.use("/", routers)
app.use("/", route)
app.use("/", rowte)

mongoose.connect("mongodb+srv://ahmed:db3699@cluster0.64w6f0j.mongodb.net/Restaurant").
then(()=>{
    console.log("Db running");
})

app.get('/', (req, res) => {
    req.send("Server Running")
})


app.listen(3000, ()=>{
    console.log("Server Running");
})