import bcrypt from 'bcrypt';

import { IUser } from '../interfaces';
import { userRepository } from '../repositories';

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

    public async compareUserPassword(password: string, hash: string): Promise<void | string> {
        const isPasswordUnique = bcrypt.compare(password, hash);

        if (!isPasswordUnique) {
            throw new Error('user nor exist');
        }
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();
