import jwt from 'jsonwebtoken';

import { DeleteResult } from 'typeorm';
import { IToken, ITokenPair, IUserPayload } from '../interfaces';
import { tokenRepository } from '../repositories/token/tokenRepository';

class TokenService {
    public createTokenPair(payload: IUserPayload): ITokenPair {
        const accessToken = jwt.sign(
            payload,
            'secret_word',
            { expiresIn: '10s' },
        );
        const refreshToken = jwt.sign(
            payload,
            'secret_word',
            { expiresIn: '12h' },
        );
        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveTokenPair(userId: number, accessToken: string, refreshToken:string): Promise<ITokenPair> {
        const tokenPairFromDB = await tokenRepository.findTokenByUserId({ userId });

        if (tokenPairFromDB) {
            tokenPairFromDB.accessToken = accessToken;
            tokenPairFromDB.refreshToken = refreshToken;
            return tokenRepository.saveTokenPair(tokenPairFromDB);
        }

        return tokenRepository.saveTokenPair({ userId, accessToken, refreshToken });
    }

    verifyToken(authToken:string, tokenType = 'access'): IUserPayload {
        let secretWord = 'secret_word';

        if (tokenType === 'refresh') {
            secretWord = 'secret_word';
        }

        return jwt.verify(authToken, secretWord) as IUserPayload;
    }

    public async deleteTokenPairByParams(findObject: Partial<IToken>): Promise<DeleteResult> {
        const tokenFromDB = await tokenRepository.findTokenByUserId(findObject);

        if (!tokenFromDB) {
            throw new Error('user is logout');
        }

        return tokenRepository.deleteTokenPairByParams({ });
    }
}

export const tokenService = new TokenService();
