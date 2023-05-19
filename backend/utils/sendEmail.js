const nodemailer = require('nodemailer')

const sendEmail = async (options) => {
    
    const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        service:'gmail',
        auth:{
            user:"test@gmail.com",
            password:"abcd"
        }
    })

    
    const mailOptions = {
        from:"test@gmail.com",
        to:options.email,
        subject:options.subject,
        text:options.message
    }

}


module.exports = sendEmail;