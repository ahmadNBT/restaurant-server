const { pipeline } = require("nodemailer/lib/xoauth2");
const UserSchema = require("../Model/User.schema");
const { CreatePassword } = require("../utilis/CreatePassword");
const { CreateToken } = require("../utilis/CreateToken");
const { HashPassword } = require("../utilis/HashPassword");

const nodemailer = require('nodemailer');
const RestaurantSchema = require("../Model/Restaurant.schema");


const SignUp = async (req, res) => {
    var response = await UserSchema.findOne(
        { name: req.body.name, email: req.body.email }
    )
    if (response) {
        return res.send({ message: "The user already exist!", success: false })

    } else {
        const newPass = await HashPassword(req.body.password)
        console.log(newPass);
        req.body.password = newPass
        var resp = await UserSchema.create(req.body)
        console.log(response, "response");
        res.send({ message: "Successfully SignUp", success: true })

    }
}

const LogIn = async (req, res) => {

    var response = await UserSchema.findOne(
        { email: req.body.email }
    )
    if (response) {
        if (await CreatePassword(response.password, req.body.password)) {
            var token = CreateToken(response._id)

            var resp = await RestaurantSchema.findOne({ _id: response.restaurant })

            return res.send({ message: "Successfully LogIn!", success: true, token, response, resp })
        }
        else {
            return res.send({ message: "Password does'nt match!", success: false })
        }

    } else {
        res.send({ message: "The user does'nt match", success: false })
    }
}
const ChangePassWord = async (req, res) => {

    var response = await UserSchema.findOne({ email: req.user.email })
    console.log(response);
    if (response) {
        if (await CreatePassword(response.password, req.body.prevPass)) {

            var resp = await UserSchema.findOneAndUpdate(
                { _id: response._id },
                {
                    $set: { password: await HashPassword(req.body.newPass) }
                },
                { new: true }
            )

            return res.send({ message: "Successfully changed!", success: true })
        }
        else {
            return res.send({ message: "Your previuos password is not matched!", success: false })

        }


    }
}


const forgetPassword = async (req, res) => {

    var response = await UserSchema.findOne({ email: req.body.email })
    console.log(response);
    if (!response) {
        return res.send({ message: "User Not Found!", success: false })
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // Outlook SMTP server
        port: 587, // Outlook SMTP port
        secure: false, // false for TLS - as a boolean not string - if you don't have a certificate
        auth: {
            user: 'codingwithahmed008@gmail.com',
            pass: 'aabi ycqx jhvv rzqg'
        }
    });

    var token = CreateToken(response._id)

    var text = `click here to set a new password http://localhost:3000/redirect/${token}`

    try {
        await transporter.sendMail({
            from: "codingwithahmed008@gmail.com",
            to: req.body.email,
            subject: "Forget Password",
            text
        });
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email');
    }

}

const UpdatePassWord = async (req, res) => {

    var response = await UserSchema.findOne({ email: req.user.email })
    console.log(response);
    if (response) {
        var resp = await UserSchema.findOneAndUpdate(
            { _id: response._id },
            {
                $set: { password: await HashPassword(req.body.pass) }
            },
            { new: true }
        )
        return res.send({ message: "Successfully changed!", success: true })
    }
    
}

module.exports = { SignUp, LogIn, ChangePassWord, forgetPassword, UpdatePassWord }