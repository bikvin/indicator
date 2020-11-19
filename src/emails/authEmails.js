const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'info@indicator.games',
        subject: 'Welcome to indicator games',
        text: `Hi, ${name}!
            Welcome to indicator.games,
            Hope you enjoy!`

    })
}
const sendResetEmail = (email, name, token, host) => {
    sgMail.send({
        to: email,
        from: 'info@indicator.games',
        subject: 'Password reset for indicator.games',
        text: `Hi, ${name}! \n You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            http://${host}/new_pass/${token}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`

    })
}




// const sendCancelEmail = (email, name) => {
//     sgMail.send({
//         to: email,
//         from: 'kukurua.tuni@gmail.com',
//         subject: 'Leaving already?',
//         text: 'Please never come back'
//     })
// }

module.exports = {
    sendWelcomeEmail,
    sendResetEmail
    //sendCancelEmail
}