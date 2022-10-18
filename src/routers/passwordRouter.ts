import { Router } from 'express';
import { userController } from '../controllers';
import { authMiddleware, userMiddleware } from '../middlewares';

const router = Router();

router.post('/forgotPassword', userMiddleware.checkIsUserExist, userController.forgotPassword);
router.post('/resetPassword', authMiddleware.checkActionToken, userMiddleware.checkIsUserExist, userController.setForgotPassword);

export const passwordRouter = router;
