import nodemailer from 'nodemailer'

export class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        });
    }

    async sendActivationMail(to, randomCode) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text: '',
            html: `
                <div>
                    <h1>Веддите данный код для активации своего аккаунта</h1>
                    <h2>${randomCode}</h2>
                </div>
            `
        })
    }
}