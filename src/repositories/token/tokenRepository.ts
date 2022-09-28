import { getManager } from 'typeorm';
import { IToken } from '../../interfaces';
import { Token } from '../../entity';

class TokenRepository {
    public async saveTokenPair(token: {userId: number, accessToken: string, refreshToken: string}): Promise<IToken> {
        return getManager().getRepository(Token).save(token);
    }

    async deleteTokenPairByParams(filterObject: Partial<IToken>) {
        return getManager().getRepository(Token).delete(filterObject);
    }

    async findTokenByUserId(filterObject: Partial<IToken>): Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne(filterObject);
    }

    async findTokenByParams(filterObject: Partial<IToken>): Promise<IToken | undefined> {
        return getManager().getRepository(Token)
            .findOne(filterObject);
    }
}

export const tokenRepository = new TokenRepository();
