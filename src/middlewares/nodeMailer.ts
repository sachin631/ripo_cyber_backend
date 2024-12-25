import nodemailer from 'nodemailer';
import { showResponse } from '../utils/response.utils';
import statusCodes from '../constant/statusCodes';

export const nodemailer_email = async (to: any, subject: any, text: any) => {


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.nodemailer_from,
            pass: process.env.nodemailer_pass_key
        }
    });

    var mailOptions = {
        from: process.env.nodemailer_from,
        to: to,
        subject:subject,
        text: text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return showResponse(false, error.message, null, statusCodes.API_ERROR);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}
