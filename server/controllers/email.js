import { File } from "../models/file.js";
import { emailTemplate } from "../services/emailTemplate.js";
import { sendMail } from "../services/mailService.js";

export const email = async (req, res) => {
    const { uuid, emailTo, emailFrom } = req.body;
    if (!uuid || !emailTo || !emailFrom) {
        return res.status(422).send({ message: 'All fields are required.' });
    }

    try {
        const file = await File.findOne({ uuid: uuid });
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Link has been expired."
            });
        } else if (file.receiver == emailTo) {
            return res.status(422).send({
                success: false,
                message: 'Email already sent once.'
            });
        }
        file.sender = emailFrom;
        file.receiver = emailTo;
        const response = await file.save();

        sendMail({
            from: emailFrom,
            to: emailTo,
            subject: 'fileX file sharing',
            text: `${emailFrom} shared a file with you.`,
            html: emailTemplate({
                emailFrom,
                downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
                size: parseInt(file.size / 1000) + ' KB',
                expires: '24 hours'
            })
        }).then(() => {
            return res.status(200).json({
                success: true,
                message: "Email sent successfully"
            });
        }).catch(err => {
            return res.status(500).json({ message: 'Error in email sending.' });
        });
    } catch (err) {
        return res.status(500).send({ message: 'Something went wrong.' });
    }
};