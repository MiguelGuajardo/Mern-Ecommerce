const nodeMailer = require('nodemailer')

const sendEmail = async (options) =>{
    
    const transporter = nodeMailer.createTransport({
        host: process.env.HOST_NODEMAILER,
        port: process.env.PORT_NODEMAILER,
        service: process.env.SERVICE,
        auth:{
            user: process.env.EMAIL_DEVELOPER,
            pass: process.env.PASSWORD_DEVELOPER
        }
    })

    const mailOptions = {
        from: process.env.EMAIL_DEVELOPER,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(mailOptions)

}
module.exports = sendEmail