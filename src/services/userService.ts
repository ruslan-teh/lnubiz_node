import bcrypt from 'bcrypt';

import { UpdateResult } from 'typeorm';
import { IUser } from '../interfaces';
import { userRepository } from '../repositories';
import { config } from '../config';

class UserService {
    public async createUser(body: any): Promise<IUser> {
        const { password } = body;

        const hashedPassword = await this._hashPassword(password);
        const userToSave = { ...body, password: hashedPassword };

        return userRepository.createUser(userToSave);
    }

    public async getUserById(userId: number): Promise<IUser | undefined> {
        return userRepository.findUserById(userId);
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return userRepository.findUserByEmail(email);
    }

    public async updateUser(id: number, obj: Partial<IUser>): Promise<UpdateResult | undefined> {
        if (obj.password) {
            obj.password = await this._hashPassword(obj.password);
        }
        return userRepository.updateUserByParams(id, obj);
    }

    public async compareUserPassword(password: string, hash: string): Promise<void | string> {
        const isPasswordUnique = bcrypt.compare(password, hash);

        if (!isPasswordUnique) {
            throw new Error('user nor exist');
        }
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, Number(config.USER_SALT_ROUNDS));
    }
}

export const userService = new UserService();
