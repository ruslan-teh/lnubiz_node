import { DeleteResult, getManager, Repository } from 'typeorm';

import { IUser } from '../../interfaces';
import { User } from '../../entity';

class UserRepository extends Repository<User> {
    createUser(data: IUser): Promise<IUser> {
        return getManager().getRepository(User).save(data);
    }

    deleteUserByParams(filterObject: IUser): Promise<DeleteResult> {
        return getManager().getRepository(User).delete(filterObject);
    }

    findUserByEmail(email: string): Promise<IUser | undefined> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.deletedAt is NULL')
            .getOne();
    }

    findUserById(id: number): Promise<IUser | undefined> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .andWhere('user.deletedAt is NULL')
            .getOne();
    }
}

export const userRepository = new UserRepository();
