const nodemailer = require('nodemailer')

const orderApi = async (req, res) => {




    console.log(req.body);
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Outlook SMTP server
            port: 587, // Outlook SMTP port
            secure: false, // false for TLS - as a boolean not string - if you don't have a certificate
            auth: {
                user: 'codingwithahmed008@gmail.com',
                pass: 'aabi ycqx jhvv rzqg'
            }
        });

    var totalPrice = req.body.reduce((total, items) => {
        return total + (items.item_lessprice * items.qnty)
    },0)

    var html = `
        <div style="height: max-content; width: max-content">
        ${req.body.map(e => `
            <div>
                <div style='height: 100px; width: 100px'>
                    <img src="${e.item_image}" style='width: 100%'></img>
                </div>
                <div>
                    <p>${e.item_name}</p>
                </div>
            </div>
        `).join('')}
        <p>Total Price: ${totalPrice}</p>
        <button style='height: 25px; width:120px background-color: yellow'>Order more...</button>
    </div>`

    try {
        await transporter.sendMail({
            from: "codingwithahmed008@gmail.com",
            to: req.user.email,
            subject: "Order Confirmed!",
            // text: "Hello!",
            html: html
        });
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email');
    }
}

module.exports = { orderApi }