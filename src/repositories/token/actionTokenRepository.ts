import { getManager } from 'typeorm';
import { IActionToken, IActionTokenForSave } from '../../interfaces';
import { ActionTokenEntity } from '../../entity/actionTokenEntity';

class ActionTokenRepository {
    public async createActionToken(actionToken: IActionTokenForSave): Promise<IActionToken> {
        return getManager().getRepository(ActionTokenEntity).save(actionToken);
    }

    public async getTokenByParams(filterObject: Partial<IActionToken>): Promise<IActionToken | undefined> {
        return getManager().getRepository(ActionTokenEntity).findOne(filterObject);
    }

    async deleteTokenByParams(filterObject: Partial<IActionToken>) {
        console.log(filterObject);
        return getManager().getRepository(ActionTokenEntity).delete(filterObject);
    }
}

export const actionTokenRepository = new ActionTokenRepository();
