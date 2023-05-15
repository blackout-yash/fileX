import nodemailer from "nodemailer";

export const sendMail = async ({ from, to, subject, text, html }) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: `fileX <${from}>`,
        to: to,
        subject: subject,
        text: text,
        html: html,
    }, (err) => {
        if (err) {
            console.log(err);
        }
    });
}