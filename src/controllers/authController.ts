import { NextFunction, Request, Response } from 'express';
import { IRequestExtended, ITokenPair, IUser } from '../interfaces';
import { emailService, tokenService, userService } from '../services';
import { emailActionEnum } from '../config';
import { tokenRepository } from '../repositories';

class AuthController {
    public async registration(req: Request, res: Response, next: NextFunction): Promise<Response<IUser>> {
        try {
            const createdUser = await userService.createUser(req.body);
            return res.json(createdUser);
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    public async login(req: IRequestExtended, res: Response, next: NextFunction): Promise<Response<ITokenPair>> {
        console.log('loginloginloginloginloginloginloginloginloginloginloginlogin');
        console.log(req.user);
        console.log('loginloginloginloginloginloginloginloginloginloginloginlogin');
        try {
            const { id, password: hashPassword } = req.user as IUser;
            const { password, email } = req.body;

            await emailService.sendMail(email, emailActionEnum.WELCOME, { userName: 'Ruslan' });
            await userService.compareUserPassword(password, hashPassword);

            const { accessToken, refreshToken } = await tokenService.createTokenPair({
                userId: id,
                userEmail: email,
            });

            await tokenService.saveTokenPair(id, accessToken, refreshToken);

            return res.json({
                accessToken,
                refreshToken,
            });
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    public async logout(req: IRequestExtended, res: Response, next: NextFunction): Promise<Response<string>> {
        try {
            const { id } = req.user as IUser;

            await tokenService.deleteTokenPairByParams({ userId: id });

            return res.json('user is logout');
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    public async refreshToken(req: IRequestExtended, res: Response, next: NextFunction): Promise<Response<ITokenPair>> {
        try {
            const { id, email } = req.user as IUser;
            const refreshTokenFromUser = req.get('Authorization');

            const refreshTokenToDelete = JSON.parse(refreshTokenFromUser?.split(' ')[1] as string);

            await tokenRepository.deleteTokenPairByParams({ refreshToken: refreshTokenToDelete.refreshToken });

            const { accessToken, refreshToken } = tokenService.createTokenPair({ userId: id, userEmail: email });

            await tokenService.saveTokenPair(id, accessToken, refreshToken);

            return res.json({
                tokens: {
                    accessToken,
                    refreshToken,
                },
                user: req.user,
            });
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    public async googleClientId(req: Request, res: Response, next: NextFunction): Promise<any> {
        console.log(req);
    }
}

export const authController = new AuthController();
