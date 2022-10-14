import { emailActionEnum } from './enum';

export const emailInfo = {
    [emailActionEnum.WELCOME]: {
        subject: 'Welcome',
        templateName: 'welcome',
    },
    [emailActionEnum.FORGOTPASSWORD]: {
        subject: 'ForgotPassword',
        templateName: 'forgotPassword',
    },
};
