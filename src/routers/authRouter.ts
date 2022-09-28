import { Router } from 'express';
import {authController} from "../controllers";
import {authMiddleware, userMiddleware} from "../middlewares";


const router = Router();

router.post('/signup', authController.registration);
router.post('/signIn', userMiddleware.checkIsUserExist, authController.login);
router.get('/logout', authMiddleware.checkAccessToken, authController.logout);
router.get('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);

export const authRouter = router;
