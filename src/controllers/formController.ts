import { NextFunction, Request, Response } from 'express';
import { IForm } from '../interfaces/formInterface';
import { formRepositories } from '../repositories/formRepositories';

class FormController {
    public async createForm(req: Request, res:Response, next: NextFunction): Promise<Response<IForm>> {
        try {
            const form = await formRepositories.createForm(req.body);
            return res.json(form);
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    public async getAllForms(req: Request, res: Response, next: NextFunction): Promise<Response<IForm[]>> {
        try {
            const forms = await formRepositories.getAllForms();
            return res.json({ forms });
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    public async getFormById(req: Request, res: Response, next: NextFunction): Promise<Response<IForm>> {
        try {
            const { id } = req.params;
            const form = await formRepositories.getFormById(+id);

            return res.json(form);
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    public async deleteById(req: Request, res: Response, next: NextFunction): Promise<Response<string>> {
        try {
            const { id } = req.params;
            await formRepositories.deleteById(+id);

            return res.json('form delete');
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    public async changeStatus(req: Request, res: Response, next: NextFunction): Promise<Response<IForm>> {
        const { id } = req.params;
        const { value } = req.body;

        const formFromDb = await formRepositories.changeStatus(+id, +value);

        return res.json(formFromDb);
    }
}

export const formController = new FormController();
