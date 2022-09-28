import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interfaces';
import { userRepository } from '../repositories';

class UserMiddleware {
    public async checkIsUserExist(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;

            const userFromDB = await userRepository.findUserByEmail(email);

            if (!userFromDB) {
                throw new Error('User not exist!!!!');
            }

            req.user = userFromDB;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
