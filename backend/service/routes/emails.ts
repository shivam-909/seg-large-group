import {createTransport} from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';


export default async function SendEmail(from: string, to: string, subject: string, html: string) {
    const transporter: Mail = createTransport({
        service: 'gmail',
        auth: {
            user: '',
            pass: '',
        },
    });

    await transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        html: html
    }).catch(() => {
        throw {
            message: 'Could not send email'
        };
    });
}