import { Router } from 'express';
import { userRouter } from './userRouter';
import { authRouter } from './authRouter';
import { formRouter } from './formRouter';
import { authMiddleware } from '../middlewares';
import { passwordRouter } from './passwordRouter';

const router = Router();

router.use('/User', authMiddleware.checkAccessToken, userRouter);
router.use('/Auth', authRouter); // Login/signin/google/?googleToken=${token}
router.use('/BusinessTripRequest', authMiddleware.checkAccessToken, formRouter);
router.use('/Password', passwordRouter);

export const apiRouter = router;
