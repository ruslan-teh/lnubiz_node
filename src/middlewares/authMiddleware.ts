import { NextFunction, Response } from 'express';
import { tokenService } from '../services/tokenService';
import { userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { ErrorHandler } from '../error';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const accessTokenFromHeader = req.get('Authorization');
            const { accessToken } = JSON.parse(accessTokenFromHeader?.split(' ')[1] as string);

            const { userEmail } = tokenService.verifyToken(accessToken as string);

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHandler('token not valid', 401));
            }

            req.user = userFromToken;
            next();
        } catch (e: any) {
            res.status(401)
                .json({
                    message: e.message,
                    status: 401,
                });
        }
    }

    public async checkRefreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const refreshTokenFromHeader = req.get('Authorization');
            const { refreshToken } = JSON.parse(refreshTokenFromHeader?.split(' ')[1] as string);

            const { userEmail } = tokenService.verifyToken(refreshToken as string);

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHandler('user from token not exist!!!', 404));
            }

            req.user = userFromToken;
            next();
        } catch (e: any) {
            res.status(401)
                .json({
                    message: e.message,
                    status: 401,
                });
        }
    }
}

export const authMiddleware = new AuthMiddleware();
