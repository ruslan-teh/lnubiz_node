import { Router } from 'express';
import { userRouter } from './userRouter';
import { authRouter } from './authRouter';
import { formRouter } from './formRouter';
import {authMiddleware} from "../middlewares";

const router = Router();

router.use('/User', authMiddleware.checkAccessToken, userRouter);
router.use('/Auth', authRouter);
router.use('/BusinessTripRequest', authMiddleware.checkAccessToken, formRouter);

export const apiRouter = router;
