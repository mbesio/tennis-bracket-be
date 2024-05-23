import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export const sendEmailWhenDrawIsOut = async (
  emailFrom: string,
  users: Array<{ displayName: string; email: string }>,
  subject: string,
  textTemplate: string,
  htmlTemplate: string
) => {
  for (let i = 0; i < users.length; i++) {
    let user = users[i]
    console.log('user: ', user)
    if (!user.email) {
      console.log('no email for user: ', user.displayName)
      continue
    }
    let text = textTemplate.replace('{username}', user.displayName)
    let html = htmlTemplate.replace('{username}', user.displayName)
    setTimeout(async () => {
      try {
        // console.log('trnasporter before calling sendMail ', transporter)
        let info = await transporter.sendMail({
          from: emailFrom,
          to: user.email,
          subject,
          text,
          html,
        })
        console.log('info: ', info)
        console.log('Message sent: %s', info.messageId)
      } catch (error) {
        console.log('there was an error: ', error)
      }
    }, i * 1500)
  }
}
