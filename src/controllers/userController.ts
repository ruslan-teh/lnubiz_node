import { NextFunction, Request, Response } from 'express';
import { IRequestExtended, IUser } from '../interfaces';
import { emailService, tokenService, userService } from '../services';
import { emailActionEnum, actionTokenEnum } from '../config';
import { actionTokenRepository } from '../repositories/token/actionTokenRepository';

class UserController {
    public async getUserById(req: Request, res: Response, next: NextFunction): Promise<Response<IUser>> {
        const { id } = req.params;

        const userFromDb = await userService.getUserById(+id);
        if (!userFromDb) {
            throw new Error('user not exist!!! userController');
        }
        return res.json(userFromDb);
    }

    public async forgotPassword(req: IRequestExtended, res: Response, next: NextFunction): Promise<any> {
        const { id, email } = req.user as IUser;

        const actionToken = tokenService.generateActionToken({ userId: id, userEmail: email });
        await actionTokenRepository.createActionToken({ actionToken, userId: id, type: actionTokenEnum.forgotPassword });

        await emailService.forgotPassword(`${email}`, emailActionEnum.FORGOTPASSWORD, { actionToken });

        return res.json('send');
    }

    public async setForgotPassword(req: IRequestExtended, res: Response, next: NextFunction): Promise<any> {
        const { id } = req.user as IUser;
        const { password } = req.body;
        const { token } = req.query;

        await userService.updateUser(id, { password });
        await actionTokenRepository.deleteTokenByParams({ actionToken: token as string });

        return res.json({
            status: 'success',
        });
    }
}

export const userController = new UserController();
