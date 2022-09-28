import { NextFunction, Request, Response } from 'express';
import { IUser } from '../interfaces';
import { userService } from '../services';

class UserController {
    public async getUserById(req: Request, res: Response, next: NextFunction): Promise<Response<IUser>> {
        const { id } = req.params;

        const userFromDb = await userService.getUserById(+id);
        if (!userFromDb) {
            throw new Error('user not exist!!! userController');
        }
        return res.json(userFromDb);
    }
}

export const userController = new UserController();
