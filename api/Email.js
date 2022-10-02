const nodemailer = require("nodemailer")

async function main(body) {
    let transporter = nodemailer.createTransport({
        host: "smtp.elasticemail.com",
        port: 2525,
        secure: false,
        auth: {
            user: "development.1xsid@gmail.com",
            pass: process.env.SMTPPASS,
        },
    })

    let info = await transporter.sendMail({
        from: "development.s1xd@gmail.com",
        to: "31.siddhant.sharma@gmail.com",
        subject: body.subject,
        text: body.message,
        attachments: body.attachments,
    })

    return "Message sent: %s", info.messageId
}

export default async function handler(req, res) {
    const { body } = req
    let resp = await main(body)
    res.status(200).json({ response: resp })
}
