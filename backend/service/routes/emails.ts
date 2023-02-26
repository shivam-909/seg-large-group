import {createTransport} from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';


export default async function SendEmail(from: string, to: string, subject: string, html: string) {
    const transporter: Mail = createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: from,
            pass: 'cbpwsvhrijfnqhhx',
        },
    });

    return await transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        html: html
    }).catch(() => {
        throw {
            message: 'could not send email'
        };
    });
}