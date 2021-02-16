import nodemailer, { SendMailOptions } from 'nodemailer'
import { emailHost, emailPassword, emailPort, emailUser } from 'config'

const transporter = nodemailer.createTransport({
  host: emailHost,
  port: emailPort,
  auth: {
    user: emailUser,
    pass: emailPassword
  }
} as any)

export const SendEmail = (Options: SendMailOptions): void => {
  const optionsEmail: SendMailOptions = Object.assign(Options, { from: 'api <noreplay@api.com>' })

  transporter.sendMail(optionsEmail, (error, info) => {
    if (error !== null) {
      console.log('Error occurred')
      console.log(error.message)
      return process.exit(1)
    }

    console.log('Message sent successfully!')

    transporter.close()
  })
}
