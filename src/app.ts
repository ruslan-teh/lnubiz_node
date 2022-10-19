import passport from 'passport';
import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import dotenv from "dotenv";
import cors from 'cors';
import { apiRouter } from './routers';
import { config } from './config';

// @ts-ignore
global.rootDir = __dirname;

const app = express();
dotenv.config()
app.use(cors({
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: '*',
    methods: '*',
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(apiRouter);

// @ts-ignore
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message,
            data: err.data,
        });
});

const { PORT } = config;

app.listen(PORT, async () => {
    console.log('server has started!!!');
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('database connected');
        }
    } catch (e) {
        console.log(e);
    }
});
