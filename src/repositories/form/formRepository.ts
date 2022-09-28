import { DeleteResult, getManager, UpdateResult } from 'typeorm';
import {IForm} from "../../interfaces";
import {Forms} from "../../entity";

class FormRepositories {
    async createForm(form: IForm): Promise<IForm> {
        return getManager().getRepository(Forms).save(form);
    }

    async getAllForms(): Promise<IForm[]> {
        return getManager().getRepository(Forms)
            .createQueryBuilder('form')
            .where('form.deletedAt is NULL')
            .getMany();
    }

    async getFormById(id: number): Promise<IForm | undefined> {
        return getManager().getRepository(Forms)
            .createQueryBuilder('form')
            .where('form.id = :id', { id })
            .andWhere('form.deletedAt is NULL')
            .getOne();
    }

    async deleteById(id: number): Promise<DeleteResult> {
        return getManager().getRepository(Forms).delete(id);
    }

    async changeStatus(id: number, value: number): Promise<UpdateResult> {
        return getManager().getRepository(Forms).update(id, { status: value });
    }
}

export const formRepositories = new FormRepositories();
