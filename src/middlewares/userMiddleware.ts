import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interfaces';
import { userRepository } from '../repositories';

class UserMiddleware {
    public async checkIsUserExist(req: IRequestExtended, res: Response, next: NextFunction) {
        console.log('UserMiddlewareUserMiddlewareUserMiddlewareUserMiddlewareUserMiddlewareUserMiddleware')
        console.log(req)
        console.log('UserMiddlewareUserMiddlewareUserMiddlewareUserMiddlewareUserMiddlewareUserMiddleware')
        try {
            const { email } = req.body;

            const userFromDB = await userRepository.findUserByEmail(email);

            if (!userFromDB) {
                next('User not exist!!!!');
            }

            req.user = userFromDB;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
