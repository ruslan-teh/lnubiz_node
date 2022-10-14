import EmailTemplate from 'email-templates';
import nodemailer, { SentMessageInfo } from 'nodemailer';
import path from 'path';

import { emailInfo, emailActionEnum, config } from '../config';

class EmailService {
    templateRender = new EmailTemplate({
        views: {
            root: path.join(__dirname, '../', 'emailTemplates'),
        },
    });

    async sendMail(userMail: string, action: emailActionEnum, context = {}): Promise<SentMessageInfo> {
        const { subject, templateName } = emailInfo[action];

        Object.assign(context, { frontEndURL: 'http://google.com' });

        const html = await this.templateRender.render(templateName, context);

        const emailTransporter = nodemailer.createTransport({
            from: config.NO_REPLY_EMAIL,
            service: 'gmail',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_EMAIL_PASSWORD,
            },
        });

        return emailTransporter.sendMail({
            to: userMail,
            subject,
            html,
        });
    }

    async forgotPassword(userMail: string, action: emailActionEnum, context = {}): Promise<SentMessageInfo> {
        const { subject, templateName } = emailInfo[action];

        Object.assign(context, { resetPasswordURL: 'localhost:3000/resetPassword'});

        const html = await this.templateRender.render(templateName, context);

        const emailTransporter = nodemailer.createTransport({
            from: config.NO_REPLY_EMAIL,
            service: 'gmail',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_EMAIL_PASSWORD,
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
