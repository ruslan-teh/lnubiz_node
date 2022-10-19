import { Router } from 'express';
// import passport from '../config/passport';
import { authController } from '../controllers';
import { authMiddleware, userMiddleware } from '../middlewares';

const router = Router();

router.post('/signup', authController.registration);
router.post('/signIn', userMiddleware.checkIsUserExist, authController.login);
router.get('/logout', authMiddleware.checkAccessToken, authController.logout);
router.get('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);
// router.get('/Login/GoogleClientId', passport.authenticate('google', {scope: ['email', 'profile']}), authController.googleClientId)
// router.get('/Login/GoogleClientId'/*, passport.authenticate('google', { scope: ['email', 'profile'] })*/, authController.googleClientId);
// router.post('/Login/signin/google/?googleToken=:token', )

export const authRouter = router;
