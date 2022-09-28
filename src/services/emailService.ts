import EmailTemplate from 'email-templates';
import nodemailer, { SentMessageInfo } from 'nodemailer';
import path from 'path';

import { emailInfo } from '../config/emailInfo';
import {emailActionEnum} from "../config/enum";

class EmailService {
    // templateRender = new EmailTemplate({
    //     views: {
    //         root: path.join(__dirname, '../', 'emailTemplates')
    //     }
    // });

    async sendMail(userMail: string, action: emailActionEnum, context = {}): Promise<SentMessageInfo> {
        const templateRender = new EmailTemplate({
            views: {
                // @ts-ignore
                root: path.join(global.rootDir, './src', 'email-templates'),
            },
        });

        const { subject, templateName } = emailInfo[action];

        Object.assign(context, { frontEndURL: 'https://google.com' });

        const html = await templateRender.render(templateName, context);

        const emailTransporter = nodemailer.createTransport({
            from: 'user',
            service: 'gmail',
            auth: {
                user: '',
                pass: '',
            },
        });

        return emailTransporter.sendMail({
            to: userMail,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();
