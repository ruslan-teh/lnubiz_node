import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT,

    MYSQL_DATABASE_NAME: process.env.MYSQL_DATABASE_NAME,

    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    SECRET_REFRESH_KEY: process.env.SECRET_REFRESH_KEY,
    SECRET_ACTION_KEY: process.env.SECRET_ACTION_KEY,

    EXPIRES_IN_ACCESS: process.env.EXPIRES_IN_ACCESS,
    EXPIRES_IN_REFRESH: process.env.EXPIRES_IN_REFRESH,
    EXPIRES_IN_ACTION: process.env.EXPIRES_IN_ACTION,

    USER_SALT_ROUNDS: process.env.USER_SALT_ROUNDS,

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};
